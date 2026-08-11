'use strict';
/** API smoke test - login, catalogue, problem, code save, run, submit. */
const BASE = process.env.BASE || 'http://localhost:4321';

let token = null;
async function call(pathname, opts = {}) {
  const r = await fetch(BASE + pathname, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(opts.headers || {}),
    },
  });
  const body = await r.json().catch(() => ({}));
  return { status: r.status, body };
}

const fsx = require('node:fs');
const pathx = require('node:path');
const WSX = pathx.join(__dirname, '..', 'workspace');

function snapshotWorkspace() {
  if (!fsx.existsSync(WSX)) return {};
  const s = {};
  for (const f of fsx.readdirSync(WSX)) {
    const p = pathx.join(WSX, f);
    if (fsx.statSync(p).isFile()) s[p] = fsx.readFileSync(p, 'utf8');
  }
  return s;
}
function restoreWorkspace(s) {
  // only rewrite what actually differs - see the note in check_all.js
  for (const [p, c] of Object.entries(s)) {
    let cur = null;
    try { cur = fsx.readFileSync(p, 'utf8'); } catch (_) {}
    if (cur !== c) fsx.writeFileSync(p, c, 'utf8');
  }
  for (const f of fsx.readdirSync(WSX)) {
    const p = pathx.join(WSX, f);
    if (fsx.statSync(p).isFile() && !s[p]) fsx.unlinkSync(p);
  }
}
const snapshot = snapshotWorkspace();
process.on('exit', () => { try { restoreWorkspace(snapshot); } catch (_) {} });

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(38)} ${detail}`);
};

(async () => {
  console.log('\nAPI smoke test  ' + BASE + '\n');

  // auth
  let r = await call('/api/catalog');
  check('catalog blocked when signed out', r.status === 401);

  r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'Subhodeep', password: 'wrong' }) });
  check('login rejects wrong password', r.status === 401);

  r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'Subhodeep', password: '123456' }) });
  check('login Subhodeep / 123456', r.status === 200 && !!r.body.token, r.body.username || r.body.error);

  // Everything after this runs as the throwaway test account so that real
  // progress is never polluted by the suite.
  r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: '_selftest', password: 'selftest' }) });
  check('login _selftest (isolated account)', r.status === 200 && !!r.body.token);
  token = r.body.token;

  r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'kashish', password: '123456' }) });
  check('login kashish / 123456', r.status === 200 && !!r.body.token);

  r = await call('/api/me');
  check('session recognised', r.status === 200 && r.body.username === '_selftest', r.body.username);

  // catalogue - the whole plan, not just week 1
  r = await call('/api/catalog');
  const items = r.body.items || [];
  const playable = items.filter((x) => x.playable);
  const platform = items.filter((x) => x.kind === 'platform');
  check('catalogue has all 396 questions', items.length === 396, `${items.length} items`);
  check('Q320 / R34 / Z42 all present',
        items.filter((x) => x.series === 'Q').length === 320 &&
        items.filter((x) => x.series === 'R').length === 34 &&
        items.filter((x) => x.series === 'Z').length === 42);
  {
    // derive from disk so this never goes stale as batches are added
    const built = fsx.readdirSync(pathx.join(__dirname, '..', 'problems'))
      .filter((d) => fsx.existsSync(pathx.join(__dirname, '..', 'problems', d, 'problem.json'))).length;
    check(`${built} are playable here`, playable.length === built,
          playable.map((x) => x.id).join(','));
  }
  check('playable entries carry tests', playable.every((x) => x.tests > 0),
        playable.map((x) => x.tests).join(','));
  {
    const noLink = platform.filter((x) => !/^https?:\/\//.test(x.url || ''));
    check('every platform entry has a link', noLink.length === 0,
          noLink.length ? `${noLink.length} without: ${noLink.slice(0, 5).map((x) => x.docId).join(',')}`
                        : `${platform.length} platform entries`);
  }
  check('modelled entries carry statements',
        items.filter((x) => x.hasStatement).length > 150,
        `${items.filter((x) => x.hasStatement).length} with statements`);

  // per-account default language.
  // Logging in as a real user would swap our token and make every later
  // check run against THEIR workspace, so put the test token back after.
  {
    const testToken = token;
    r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'Subhodeep', password: '123456' }) });
    check('Subhodeep defaults to C++', r.body.defaultLang === 'cpp', r.body.defaultLang);
    r = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'kashish', password: '123456' }) });
    check('kashish defaults to Java', r.body.defaultLang === 'java', r.body.defaultLang);
    token = testToken;
  }

  // statement lookup for a catalogued (non-playable) entry
  r = await call('/api/entry/Q46');
  check('catalogued statement readable', r.status === 200 && r.body.statement.length > 40,
        `Q46 "${(r.body.title || '').slice(0, 28)}"`);

  // problem
  r = await call('/api/problem/m1');
  check('problem m1 loads', r.status === 200 && r.body.statement.includes('Refund Reconciliation'),
        `${r.body.hiddenTests} hidden, ${(r.body.samples || []).length} samples`);

  // code round trip
  r = await call('/api/code/m1');
  check('starter code created', r.status === 200 && r.body.code.length > 10, r.body.file);

  const REF = require('node:fs').readFileSync(
    require('node:path').join(__dirname, '..', 'problems', 'm1-refund-reconciliation', 'solutions', 'ref.cpp'), 'utf8');

  r = await call('/api/code/m1', { method: 'POST', body: JSON.stringify({ code: REF, lang: 'cpp' }) });
  check('code saves to workspace file', r.status === 200 && r.body.ok);

  r = await call('/api/code/m1');
  check('code reads back identical', r.body.code === REF);

  // run
  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'run', lang: 'cpp' }) });
  check('RUN on samples -> AC', r.body.verdict === 'AC', `${r.body.passed}/${r.body.total}`);

  // submit
  r = await call('/api/judge/m1', { method: 'POST', body: JSON.stringify({ mode: 'submit', lang: 'cpp' }) });
  check('SUBMIT full suite -> AC', r.body.verdict === 'AC', `${r.body.passed}/${r.body.total}, ${r.body.maxTimeMs} ms`);

  // compile error surfaces line numbers
  r = await call('/api/judge/m1', {
    method: 'POST',
    body: JSON.stringify({ mode: 'run', lang: 'cpp', code: '#include <bits/stdc++.h>\nint main(){\n  int x = ;\n}\n' }),
  });
  const d = (r.body.diagnostics || [])[0];
  check('compile error reports line', r.body.verdict === 'CE' && d && d.line === 3,
        d ? `line ${d.line}:${d.column} ${d.message.slice(0, 30)}` : 'no diagnostics');

  // progress recorded
  r = await call('/api/catalog');
  const m1 = (r.body.items || []).find((x) => x.id === 'm1');
  check('progress marks m1 solved', m1 && m1.solved === true, `attempts ${m1 && m1.attempts}`);

  r = await call('/api/submissions/m1');
  check('submission history stored', Array.isArray(r.body) && r.body.length >= 2, `${(r.body || []).length} rows`);

  // reset back to starter
  r = await call('/api/code/m1', { method: 'POST', body: JSON.stringify({ code: '// scribble\nint main(){}\n', lang: 'cpp' }) });
  r = await call('/api/reset/m1', { method: 'POST', body: JSON.stringify({ lang: 'cpp' }) });
  check('reset returns the starter', r.status === 200 && r.body.code.includes('write your code here'));
  r = await call('/api/code/m1');
  check('reset persisted to the file', r.body.code.includes('write your code here') && !r.body.code.includes('scribble'));
  {
    const bdir = pathx.join(WSX, '.selftest', '.backup');
    const backed = fsx.existsSync(bdir) && fsx.readdirSync(bdir).some((f) => f.startsWith('m1_'));
    check('reset backed up the old code', backed);
  }
  r = await call('/api/reset/m1', { method: 'POST', body: JSON.stringify({ lang: 'java' }) });
  check('reset works for Java too', r.status === 200 && r.body.code.includes('class Main'));

  // custom input runner
  r = await call('/api/custom/m1', {
    method: 'POST',
    body: JSON.stringify({ lang: 'cpp', code: REF, input: '3 0\n1 -1 0\n' }),
  });
  check('custom input runs', r.body.verdict === 'OK' && r.body.stdout.trim() === '3',
        `stdout "${(r.body.stdout || '').trim()}" in ${r.body.timeMs} ms`);

  r = await call('/api/custom/m1', {
    method: 'POST',
    body: JSON.stringify({ lang: 'cpp', code: REF, input: '5 3\n3 0 -1 4 -3\n' }),
  });
  check('custom input, second case', r.body.stdout.trim() === '5', (r.body.stdout || '').trim());

  r = await call('/api/custom/m1', {
    method: 'POST',
    body: JSON.stringify({ lang: 'cpp', code: '#include <bits/stdc++.h>\nint main(){ int x = ; }', input: '1 1\n1\n' }),
  });
  check('custom input surfaces CE', r.body.verdict === 'CE' && (r.body.diagnostics || []).length > 0,
        (r.body.diagnostics || [])[0] ? `line ${r.body.diagnostics[0].line}` : '');

  // platform checkbox
  r = await call('/api/platform/Q1', { method: 'POST', body: JSON.stringify({ status: 'done' }) });
  check('platform tick saves', r.status === 200);
  r = await call('/api/catalog');
  const q1 = (r.body.items || []).find((x) => x.docId === 'Q1');
  check('platform tick persists', q1 && q1.status === 'done');

  // Restore the workspace byte-for-byte. Never hardcode a starter here - it
  // goes stale the moment the templates change.
  restoreWorkspace(snapshot);

  const bad = results.filter((x) => !x.ok).length;
  console.log('');
  console.log(bad === 0 ? `  ALL ${results.length} API CHECKS PASSED\n` : `  ${bad} of ${results.length} CHECKS FAILED\n`);
  if (bad) process.exitCode = 1;
})().catch((e) => { console.error('\n  ' + e.message + '\n'); process.exitCode = 1; });
