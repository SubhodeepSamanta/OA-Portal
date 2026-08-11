'use strict';
/**
 * OA Portal - local API + judge.  Zero runtime dependencies.
 *
 *   node server/index.js        -> http://localhost:4321
 *
 * Code storage model
 * ------------------
 * The file in  workspace/  is the SOURCE OF TRUTH, so editing in VS Code keeps
 * working exactly as before. The database mirrors every save and every
 * submission for history and progress - it never silently overwrites the file.
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const { judge, runCustom } = require('./judge');
const { CATALOG } = require('./catalog');
const { getStore, verifyPassword, defaultLangFor } = require('./storage');
const roundzero = require('./roundzero');

const ROOT = path.resolve(__dirname, '..');
const PROBLEMS_DIR = path.join(ROOT, 'problems');
const WORKSPACE_DIR = path.join(ROOT, 'workspace');
const DIST_DIR = path.join(ROOT, 'frontend', 'dist');
const PORT = Number(process.env.PORT || 4321);

fs.mkdirSync(WORKSPACE_DIR, { recursive: true });

// ------------------------------------------------------------- problems
function loadProblems() {
  if (!fs.existsSync(PROBLEMS_DIR)) return [];
  return fs.readdirSync(PROBLEMS_DIR)
    .filter((d) => fs.existsSync(path.join(PROBLEMS_DIR, d, 'problem.json')))
    .map((d) => {
      const m = JSON.parse(fs.readFileSync(path.join(PROBLEMS_DIR, d, 'problem.json'), 'utf8'));
      m.dir = path.join(PROBLEMS_DIR, d);
      m.slug = d;
      return m;
    })
    .sort((a, b) => a.order - b.order);
}
const getProblem = (id) => loadProblems().find((p) => p.id === id);

const LANGS = ['cpp', 'java'];
const normLang = (l) => (LANGS.includes(l) ? l : 'cpp');

const STARTER = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // your code here

    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();

        // your code here

        System.out.print(sb);
    }
}
`,
};

/**
 * The automated suites run as `_selftest` and must never touch the files you
 * are editing - otherwise a test run mid-session overwrites your work.
 * They get their own sandbox directory.
 */
function workspaceDirFor(username) {
  if (username === '_selftest') {
    const d = path.join(WORKSPACE_DIR, '.selftest');
    fs.mkdirSync(d, { recursive: true });
    return d;
  }
  return WORKSPACE_DIR;
}

function workspaceFile(p, lang, username) {
  const ext = normLang(lang) === 'java' ? '.java' : '.cpp';
  return path.join(workspaceDirFor(username), `${p.id}_${p.docId.toLowerCase()}${ext}`);
}

/**
 * A problem may ship a tailored starter with the I/O harness already written
 * and a single function to fill in (problems/<slug>/starters/main.<ext>).
 * Fall back to the bare template when it doesn't.
 */
/** Just the code. Title, limits and instructions all live in the statement. */
function starterFor(p, lang) {
  const file = path.join(p.dir, 'starters', lang === 'java' ? 'main.java' : 'main.cpp');
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : STARTER[lang];
}

function ensureWorkspaceFile(p, lang, username) {
  lang = normLang(lang);
  const f = workspaceFile(p, lang, username);
  if (!fs.existsSync(f)) fs.writeFileSync(f, starterFor(p, lang), 'utf8');
  return f;
}

// ------------------------------------------------------------- sessions
// Persisted through the storage layer, so restarting the server does NOT
// sign anyone out. One year, refreshed on every use - effectively "stay
// signed in on this machine until you press Sign out".
const TOKEN_TTL = 1000 * 60 * 60 * 24 * 365;

async function issueToken(store, username) {
  const t = crypto.randomBytes(24).toString('hex');
  await store.putSession(t, username, Date.now() + TOKEN_TTL);
  return t;
}

function tokenFrom(req) {
  const h = req.headers.authorization || '';
  return h.startsWith('Bearer ') ? h.slice(7) : null;
}

async function userFor(store, req) {
  const t = tokenFrom(req);
  if (!t) return null;
  const s = await store.getSession(t);
  if (!s) return null;
  // sliding expiry: any activity extends the session
  if (s.expiresAt - Date.now() < TOKEN_TTL / 2) {
    await store.putSession(t, s.username, Date.now() + TOKEN_TTL);
  }
  return s.username;
}

// ------------------------------------------------------------- http utils
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });
  res.end(body);
}
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

function sendStatic(res, file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
  const body = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
    'Content-Length': body.length,
    // Local dev tool: never let a cached index.html point at a stale bundle.
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let d = '';
    req.on('data', (c) => { d += c; if (d.length > 5e6) { reject(new Error('body too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(d ? JSON.parse(d) : {}); } catch (_) { reject(new Error('invalid JSON')); } });
    req.on('error', reject);
  });
}

// ------------------------------------------------------------- server
(async () => {
  const store = await getStore();

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const p = url.pathname;

    if (req.method === 'OPTIONS') return sendJson(res, 204, {});

    try {
      // ---- auth ------------------------------------------------------
      if (p === '/api/login' && req.method === 'POST') {
        const { username, password } = await readBody(req);
        const u = await store.findUser(username || '');
        if (!verifyPassword(u, password || '')) {
          return sendJson(res, 401, { error: 'Wrong username or password' });
        }
        const token = await issueToken(store, u.username);
        return sendJson(res, 200, {
          token, username: u.username,
          defaultLang: u.defaultLang || defaultLangFor(u.username),
        });
      }

      if (p === '/api/me' && req.method === 'GET') {
        const me = await userFor(store, req);
        if (!me) return sendJson(res, 401, { error: 'Not signed in' });
        const u = await store.findUser(me);
        return sendJson(res, 200, {
          username: me,
          defaultLang: (u && u.defaultLang) || defaultLangFor(me),
        });
      }

      // ---- which build is current (used to self-heal a stale tab) --------
      if (p === '/api/version' && req.method === 'GET') {
        let asset = null;
        try {
          const html = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
          const mm = html.match(/\/assets\/[\w.-]+\.js/);
          asset = mm ? mm[0] : null;
        } catch (_) {}
        return sendJson(res, 200, { asset });
      }

      if (p === '/api/logout' && req.method === 'POST') {
        const t = tokenFrom(req);
        if (t) await store.dropSession(t);
        return sendJson(res, 200, { ok: true });
      }

      // everything below needs a session
      const who = await userFor(store, req);
      if (p.startsWith('/api/') && !who) return sendJson(res, 401, { error: 'Not signed in' });

      // ---- Round Zero --------------------------------------------------
      // Aptitude / reasoning / verbal / CS fundamentals. Entirely separate
      // from the problem catalogue: own module, own content dir, own URLs.
      if (p.startsWith('/api/rz')) {
        return roundzero.handle({
          pathname: p, method: req.method, url,
          body: req.method === 'POST' ? await readBody(req) : null,
          store, who, sendJson, res,
        });
      }

      // ---- catalogue with progress ------------------------------------
      if (p === '/api/catalog' && req.method === 'GET') {
        const progress = await store.progress(who);
        const ticks = await store.getPlatformStatus(who);
        const problems = loadProblems();

        const items = CATALOG.map((c) => {
          const out = {
            docId: c.docId, n: c.n, series: c.series, kind: c.kind,
            title: c.title, difficulty: c.difficulty, diffCode: c.diffCode,
            source: c.source, url: c.url, urlExact: c.urlExact, note: c.note,
            section: c.section, provenance: c.provenance,
            hasStatement: !!(c.statement && c.statement.length > 40),
            reserved: c.reserved || null,
          };

          if (c.playable) {
            const meta = problems.find((x) => x.id === c.id);
            const pr = progress[c.id] || { attempts: 0, solved: false, bestMs: null };
            const nTests = meta && fs.existsSync(path.join(meta.dir, 'tests'))
              ? fs.readdirSync(path.join(meta.dir, 'tests')).filter((f) => f.endsWith('.in')).length : 0;
            return {
              ...out, id: c.id, playable: !!meta, timeLimitMs: meta ? meta.timeLimitMs : null,
              tests: nTests, solved: pr.solved, attempts: pr.attempts, bestMs: pr.bestMs,
            };
          }
          // everything else is tracked with a manual tick
          return { ...out, playable: false, status: ticks[c.docId] || 'todo' };
        });

        const playable = items.filter((x) => x.playable);
        const external = items.filter((x) => x.kind === 'platform');
        const done = (x) => (x.playable ? !!x.solved : x.status === 'done');
        const count = (pred) => items.filter(pred).length;

        return sendJson(res, 200, {
          items,
          summary: {
            total: items.length,
            done: count(done),
            playable: playable.length,
            playableSolved: playable.filter((x) => x.solved).length,
            external: external.length,
            externalDone: external.filter((x) => x.status === 'done').length,
            catalogued: items.length - playable.length - external.length,
            coding: count((x) => x.series === 'Q'),
            codingDone: count((x) => x.series === 'Q' && done(x)),
            reported: count((x) => x.series === 'R'),
            reportedDone: count((x) => x.series === 'R' && done(x)),
            aptitude: count((x) => x.series === 'Z'),
            aptitudeDone: count((x) => x.series === 'Z' && done(x)),
          },
        });
      }

      // ---- statement for a catalogued (non-playable) question -------------
      // NOTE: own variable - `m` is declared with `let` further down, so
      // touching it here would hit the temporal dead zone and throw.
      const entryMatch = p.match(/^\/api\/entry\/([QRZ]\d+)$/);
      if (entryMatch && req.method === 'GET') {
        const c = CATALOG.find((x) => x.docId === entryMatch[1]);
        if (!c) return sendJson(res, 404, { error: 'No such entry' });
        return sendJson(res, 200, c);
      }

      // ---- one problem -------------------------------------------------
      let m = p.match(/^\/api\/problem\/([\w-]+)$/);
      if (m && req.method === 'GET') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const cat = CATALOG.find((c) => c.id === prob.id);
        const nHidden = fs.existsSync(path.join(prob.dir, 'tests'))
          ? fs.readdirSync(path.join(prob.dir, 'tests')).filter((f) => f.endsWith('.in')).length : 0;
        const sDir = path.join(prob.dir, 'samples');
        const samples = fs.existsSync(sDir)
          ? fs.readdirSync(sDir).filter((f) => f.endsWith('.in')).sort().map((f) => ({
              input: fs.readFileSync(path.join(sDir, f), 'utf8'),
              output: fs.readFileSync(path.join(sDir, f.replace(/\.in$/, '.out')), 'utf8'),
            })) : [];
        return sendJson(res, 200, {
          id: prob.id, docId: prob.docId, title: prob.title, difficulty: prob.difficulty,
          timeLimitMs: prob.timeLimitMs, memoryNote: prob.memoryNote || '',
          statement: fs.readFileSync(path.join(prob.dir, 'statement.md'), 'utf8'),
          hiddenTests: nHidden, samples, order: cat ? cat.q : prob.order,
        });
      }

      // ---- code load / save --------------------------------------------
      m = p.match(/^\/api\/code\/([\w-]+)$/);
      if (m && req.method === 'GET') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const lang = normLang(url.searchParams.get('lang'));
        const f = ensureWorkspaceFile(prob, lang, who);
        return sendJson(res, 200, {
          code: fs.readFileSync(f, 'utf8'),
          file: path.relative(ROOT, f).replace(/\\/g, '/'),
          lang,
        });
      }
      if (m && req.method === 'POST') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const body = await readBody(req);
        const lang = normLang(body.lang);
        const f = workspaceFile(prob, lang, who);
        fs.writeFileSync(f, String(body.code ?? ''), 'utf8');
        await store.saveCode(who, prob.id, String(body.code ?? ''), lang);
        return sendJson(res, 200, { ok: true, file: path.relative(ROOT, f).replace(/\\/g, '/') });
      }

      // ---- judge --------------------------------------------------------
      m = p.match(/^\/api\/judge\/([\w-]+)$/);
      if (m && req.method === 'POST') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const body = await readBody(req);
        const lang = normLang(body.lang);
        const mode = body.mode === 'submit' ? 'submit' : 'run';
        const f = workspaceFile(prob, lang, who);

        if (typeof body.code === 'string') {
          fs.writeFileSync(f, body.code, 'utf8');
          await store.saveCode(who, prob.id, body.code, lang);
        } else if (!fs.existsSync(f)) ensureWorkspaceFile(prob, lang, who);

        const t0 = Date.now();
        const result = await judge({
          sourcePath: f, lang, problemDir: prob.dir,
          timeLimitMs: prob.timeLimitMs, mode,
          displayName: path.basename(f),
        });
        result.mode = mode;
        result.wallMs = Date.now() - t0;
        result.file = path.relative(ROOT, f).replace(/\\/g, '/');

        await store.addSubmission({
          username: who, problemId: prob.id, docId: prob.docId, mode, lang,
          verdict: result.verdict, passed: result.passed || 0, total: result.total || 0,
          maxTimeMs: result.maxTimeMs || 0, at: new Date().toISOString(),
          code: mode === 'submit' ? fs.readFileSync(f, 'utf8').slice(0, 50000) : undefined,
        });

        return sendJson(res, 200, result);
      }

      // ---- reset code back to the starter ---------------------------------
      m = p.match(/^\/api\/reset\/([\w-]+)$/);
      if (m && req.method === 'POST') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const body = await readBody(req);
        const lang = normLang(body.lang);
        const f = workspaceFile(prob, lang, who);

        // keep a copy first - a misclick should never destroy work
        if (fs.existsSync(f)) {
          const cur = fs.readFileSync(f, 'utf8');
          if (cur.trim()) {
            const bdir = path.join(workspaceDirFor(who), '.backup');
            fs.mkdirSync(bdir, { recursive: true });
            const stamp = new Date().toISOString().replace(/[:.]/g, '-');
            fs.writeFileSync(path.join(bdir, `${prob.id}_${stamp}.${lang}`), cur, 'utf8');
          }
        }

        const code = starterFor(prob, lang);
        fs.writeFileSync(f, code, 'utf8');
        await store.saveCode(who, prob.id, code, lang);
        return sendJson(res, 200, { code, file: path.relative(ROOT, f).replace(/\\/g, '/') });
      }

      // ---- run against custom input ---------------------------------------
      m = p.match(/^\/api\/custom\/([\w-]+)$/);
      if (m && req.method === 'POST') {
        const prob = getProblem(m[1]);
        if (!prob) return sendJson(res, 404, { error: 'No such problem' });
        const body = await readBody(req);
        const lang = normLang(body.lang);
        const f = workspaceFile(prob, lang, who);

        if (typeof body.code === 'string') {
          fs.writeFileSync(f, body.code, 'utf8');
          await store.saveCode(who, prob.id, body.code, lang);
        } else if (!fs.existsSync(f)) ensureWorkspaceFile(prob, lang, who);

        const result = await runCustom({
          sourcePath: f, lang, input: body.input || '',
          timeLimitMs: prob.timeLimitMs, displayName: path.basename(f),
        });
        return sendJson(res, 200, result);
      }

      // ---- submissions history -------------------------------------------
      m = p.match(/^\/api\/submissions\/([\w-]+)$/);
      if (m && req.method === 'GET') {
        return sendJson(res, 200, await store.listSubmissions(who, m[1], 25));
      }

      // ---- platform checkbox ---------------------------------------------
      m = p.match(/^\/api\/platform\/(Q\d+)$/);
      if (m && req.method === 'POST') {
        const { status } = await readBody(req);
        await store.setPlatformStatus(who, m[1], status === 'done' ? 'done' : 'todo');
        return sendJson(res, 200, { ok: true });
      }

      if (p.startsWith('/api/')) return sendJson(res, 404, { error: 'No such endpoint' });

      // ---- static (built frontend) ----------------------------------------
      if (!fs.existsSync(DIST_DIR)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(
          `<html><body style="font-family:system-ui;max-width:640px;margin:60px auto;line-height:1.6">
           <h2>API is running on port ${PORT}</h2>
           <p>The frontend has not been built yet. From <code>oa-portal/frontend</code>:</p>
           <pre style="background:#f4f4f6;padding:12px;border-radius:6px">npm install
npm run dev</pre>
           <p>then open the URL Vite prints (usually <code>http://localhost:5173</code>).</p>
           <p>Or use the CLI: <code>node tools/solve.js</code></p>
           </body></html>`);
      }
      const safe = path.normalize(p).replace(/^([/\\])+/, '');
      let file = path.join(DIST_DIR, safe);
      if (!file.startsWith(DIST_DIR)) { res.writeHead(403); return res.end('Forbidden'); }

      // A hashed asset that no longer exists means the caller is running a
      // stale index.html. Fail loudly with 404 - falling back to index.html
      // would serve HTML as JavaScript and hide the real problem.
      const isAsset = /^assets\//.test(safe.replace(/\\/g, '/'));
      if (isAsset && !fs.existsSync(file)) {
        res.writeHead(404, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' });
        return res.end('Stale asset - reload the page');
      }

      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST_DIR, 'index.html');
      return sendStatic(res, file);

    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  });

  server.listen(PORT, () => {
    const probs = loadProblems();
    console.log('');
    console.log('  OA Portal API   http://localhost:' + PORT);
    console.log('  storage         ' + store.kind + '  (' + store.location + ')');
    console.log('  problems        ' + probs.length + ' modelled, ' + CATALOG.length + ' in catalogue');
    console.log('  accounts        Subhodeep / kashish');
    console.log('');
    if (!fs.existsSync(DIST_DIR)) {
      console.log('  frontend not built yet:  cd frontend && npm install && npm run dev');
      console.log('');
    }
  });
})().catch((e) => { console.error('\n  Startup failed: ' + e.message + '\n'); process.exit(1); });
