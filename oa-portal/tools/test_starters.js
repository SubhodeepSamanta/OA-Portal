'use strict';
/**
 * Every starter must COMPILE cleanly in both languages.
 * A stub that fails to compile would greet you with CE before you write a line.
 * It should fail with WA (wrong answer), never CE.
 */
const fs = require('node:fs');
const path = require('node:path');

const BASE = process.env.BASE || 'http://localhost:4321';
const ROOT = path.resolve(__dirname, '..');
const PROBLEMS = path.join(ROOT, 'problems');
const WS = path.join(ROOT, 'workspace');

let token = null;
async function call(p, opts = {}) {
  const r = await fetch(BASE + p, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

(async () => {
  console.log('\nStarter template check  (must compile; WA is fine, CE is not)\n');

  let r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: '_selftest', password: 'selftest' }) });
  if (r.status !== 200) { console.log('  server not running\n'); process.exit(1); }
  token = r.body.token;

  const snap = {};
  for (const f of fs.existsSync(WS) ? fs.readdirSync(WS) : []) {
    const p = path.join(WS, f);
    if (fs.statSync(p).isFile()) snap[p] = fs.readFileSync(p, 'utf8');
  }

  const metas = fs.readdirSync(PROBLEMS)
    .filter((d) => fs.existsSync(path.join(PROBLEMS, d, 'problem.json')))
    .map((d) => {
      const m = JSON.parse(fs.readFileSync(path.join(PROBLEMS, d, 'problem.json'), 'utf8'));
      m.dir = path.join(PROBLEMS, d);
      return m;
    })
    .sort((a, b) => a.order - b.order);

  console.log('  ' + 'id'.padEnd(5) + 'lang'.padEnd(7) + 'verdict'.padEnd(9) + 'note');
  console.log('  ' + '-'.repeat(64));

  let fails = 0;
  for (const m of metas) {
    for (const lang of ['cpp', 'java']) {
      const file = path.join(m.dir, 'starters', lang === 'java' ? 'main.java' : 'main.cpp');
      if (!fs.existsSync(file)) { console.log(`  ${m.id.padEnd(5)}${lang.padEnd(7)}--       no starter`); continue; }

      const code = fs.readFileSync(file, 'utf8');
      const res = await call(`/api/judge/${m.id}`, {
        method: 'POST', body: JSON.stringify({ mode: 'run', lang, code }),
      });

      const v = res.body.verdict;
      const compiled = v !== 'CE';
      if (!compiled) fails++;

      let note = '';
      if (v === 'CE') {
        const d = (res.body.diagnostics || [])[0];
        note = d ? `line ${d.line}: ${d.message.slice(0, 34)}` : (res.body.compileError || '').slice(0, 40);
      } else {
        note = 'compiles - stub returns placeholder';
      }
      console.log(`  ${m.id.padEnd(5)}${lang.padEnd(7)}${(compiled ? v : 'CE').padEnd(9)}${note}`);
    }
  }

  // restore workspace exactly
  for (const [p, c] of Object.entries(snap)) fs.writeFileSync(p, c, 'utf8');
  for (const f of fs.readdirSync(WS)) {
    const p = path.join(WS, f);
    if (fs.statSync(p).isFile() && !snap[p]) fs.unlinkSync(p);
  }

  console.log('');
  console.log(fails === 0 ? '  ALL STARTERS COMPILE IN BOTH LANGUAGES\n' : `  ${fails} STARTER(S) FAIL TO COMPILE\n`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
