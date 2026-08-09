'use strict';
/**
 * One-command health check for the whole portal.
 *
 *   node tools/verify_all.js        (server must be running)
 *
 * Runs every suite, then checks data integrity that the suites do not cover:
 * catalogue completeness, storage round-trip, served bundle, workspace safety.
 */
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BASE = process.env.BASE || 'http://localhost:4321';

const C = {
  g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`,
  y: (s) => `\x1b[33m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`, c: (s) => `\x1b[36m${s}\x1b[0m`,
};

const results = [];
function record(group, name, ok, detail = '') {
  results.push({ group, name, ok, detail });
  console.log(`  ${ok ? C.g('PASS') : C.r('FAIL')}  ${name.padEnd(44)} ${C.d(detail)}`);
}

function runSuite(label, file) {
  const r = spawnSync('node', [path.join('tools', file)], {
    cwd: ROOT, encoding: 'utf8', windowsHide: true, timeout: 15 * 60 * 1000,
  });
  const out = (r.stdout || '') + (r.stderr || '');
  const line = out.split(/\r?\n/).reverse().find((l) => /ALL .*(PASSED|CORRECT|COMPILE|JUDGE)|FAILED|BROKEN|WRONG/.test(l)) || '';
  record('suites', label, r.status === 0, line.trim());
}

let token = null;
async function call(p, opts = {}) {
  const r = await fetch(BASE + p, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

(async () => {
  console.log('\n' + C.b('  OA PORTAL — FULL VERIFICATION') + '\n');

  // ---------------------------------------------------------------- suites
  console.log(C.c('  Test suites'));
  console.log('  ' + '-'.repeat(66));
  runSuite('judge verdict paths (AC/WA/TLE/RE/CE)', 'test_judge.js');
  runSuite('every problem: C++ reference + wrong soln', 'check_all.js');
  runSuite('Java toolchain end to end', 'test_java.js');
  runSuite('starter templates compile', 'test_starters.js');
  runSuite('HTTP API', 'test_api.js');
  runSuite('session survives a restart', 'test_session.js');

  // ---------------------------------------------------------------- catalogue
  console.log('\n' + C.c('  Catalogue integrity'));
  console.log('  ' + '-'.repeat(66));
  const gen = path.join(ROOT, 'server', 'catalog.generated.json');
  if (!fs.existsSync(gen)) {
    record('catalog', 'catalog.generated.json exists', false, 'run tools/build_catalog.js');
  } else {
    const cat = JSON.parse(fs.readFileSync(gen, 'utf8'));
    const series = (s) => cat.filter((x) => x.series === s);
    const gaps = (s, max) => {
      const have = new Set(series(s).map((x) => x.n));
      const miss = [];
      for (let i = 1; i <= max; i++) if (!have.has(i)) miss.push(i);
      return miss;
    };
    record('catalog', 'total entries = 396', cat.length === 396, `${cat.length}`);
    for (const [s, max] of [['Q', 320], ['R', 34], ['Z', 42]]) {
      const miss = gaps(s, max);
      record('catalog', `${s}1–${s}${max} complete`, miss.length === 0,
             miss.length ? `missing ${miss.slice(0, 6).join(',')}` : `${series(s).length} entries`);
    }
    record('catalog', 'every entry has title + difficulty',
           cat.every((x) => x.title && x.difficulty), '');
    const plat = cat.filter((x) => x.kind === 'platform');
    record('catalog', 'every platform entry has a link',
           plat.every((x) => /^https?:\/\//.test(x.url || '')), `${plat.length} platform`);
    const built = fs.readdirSync(path.join(ROOT, 'problems'))
      .filter((d) => fs.existsSync(path.join(ROOT, 'problems', d, 'problem.json'))).length;
    record('catalog', `${built} marked playable`,
           cat.filter((x) => x.playable).length === built,
           cat.filter((x) => x.playable).map((x) => x.id).join(','));
  }

  // ---------------------------------------------------------------- test data
  console.log('\n' + C.c('  Problem data'));
  console.log('  ' + '-'.repeat(66));
  const pdir = path.join(ROOT, 'problems');
  const probs = fs.readdirSync(pdir).filter((d) => fs.existsSync(path.join(pdir, d, 'problem.json')));
  let totalTests = 0, ok = true;
  for (const d of probs) {
    const t = path.join(pdir, d, 'tests');
    const s = path.join(pdir, d, 'samples');
    const nT = fs.existsSync(t) ? fs.readdirSync(t).filter((f) => f.endsWith('.in')).length : 0;
    const nS = fs.existsSync(s) ? fs.readdirSync(s).filter((f) => f.endsWith('.in')).length : 0;
    // every .in must have a matching .out
    const orphan = fs.existsSync(t) && fs.readdirSync(t).filter((f) => f.endsWith('.in'))
      .some((f) => !fs.existsSync(path.join(t, f.replace(/\.in$/, '.out'))));
    if (nT === 0 || nS === 0 || orphan) ok = false;
    totalTests += nT;
  }
  record('data', `${probs.length} problems have samples + tests`, ok, `${totalTests} hidden tests`);
  const starters = probs.every((d) =>
    fs.existsSync(path.join(pdir, d, 'starters', 'main.cpp')) &&
    fs.existsSync(path.join(pdir, d, 'starters', 'main.java')));
  record('data', 'starters exist for C++ and Java', starters, `${probs.length * 2} files`);

  // ---------------------------------------------------------------- live server
  console.log('\n' + C.c('  Live server'));
  console.log('  ' + '-'.repeat(66));
  let up = false;
  try { const r = await fetch(BASE + '/api/version'); up = r.ok; } catch (_) {}
  if (!up) {
    record('server', 'server reachable', false, `nothing at ${BASE} — run .\\run.ps1`);
  } else {
    const v = await call('/api/version');
    let servedAsset = null;
    try {
      const html = await (await fetch(BASE + '/')).text();
      servedAsset = (html.match(/\/assets\/[\w.-]+\.js/) || [])[0];
    } catch (_) {}
    record('server', 'served HTML matches current build',
           servedAsset && servedAsset === v.body.asset, servedAsset || '');

    const login = await call('/api/login', {
      method: 'POST', body: JSON.stringify({ username: '_selftest', password: 'selftest' }),
    });
    token = login.body.token;
    record('server', 'login works', login.status === 200 && !!token);

    const cat = await call('/api/catalog');
    const sum = cat.body.summary || {};
    const numeric = ['total', 'done', 'playable', 'playableSolved', 'coding', 'codingDone', 'aptitude', 'aptitudeDone'];
    record('server', 'catalog summary is all numbers (no NaN)',
           numeric.every((k) => Number.isFinite(sum[k])),
           numeric.map((k) => `${k}=${sum[k]}`).slice(0, 4).join(' '));
    record('server', 'catalog serves 396 items', (cat.body.items || []).length === 396);

    // storage round trip
    const marker = `// verify ${Date.now()}\n`;
    await call('/api/code/m1', { method: 'POST', body: JSON.stringify({ code: marker, lang: 'cpp' }) });
    const back = await call('/api/code/m1');
    record('server', 'code round-trips through storage', back.body.code === marker);
    await call('/api/reset/m1', { method: 'POST', body: JSON.stringify({ lang: 'cpp' }) });

    // default languages
    const a = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'Subhodeep', password: '123456' }) });
    const b = await call('/api/login', { method: 'POST', body: JSON.stringify({ username: 'kashish', password: '123456' }) });
    record('server', 'per-account default language',
           a.body.defaultLang === 'cpp' && b.body.defaultLang === 'java',
           `Subhodeep=${a.body.defaultLang} kashish=${b.body.defaultLang}`);
  }

  // ---------------------------------------------------------------- workspace
  console.log('\n' + C.c('  Your workspace'));
  console.log('  ' + '-'.repeat(66));
  const ws = path.join(ROOT, 'workspace');
  const files = fs.existsSync(ws) ? fs.readdirSync(ws).filter((f) => fs.statSync(path.join(ws, f)).isFile()) : [];
  const touched = files.filter((f) => {
    const c = fs.readFileSync(path.join(ws, f), 'utf8');
    return !c.includes('write your code here');
  });
  record('workspace', 'test runs left your files alone',
         touched.length === 0,
         touched.length ? `modified: ${touched.join(', ')}` : `${files.length} files, all starter`);
  record('workspace', 'test sandbox is separate',
         fs.existsSync(path.join(ws, '.selftest')), 'workspace/.selftest');

  // ---------------------------------------------------------------- summary
  const bad = results.filter((x) => !x.ok);
  console.log('\n  ' + '='.repeat(66));
  console.log(`  ${results.length - bad.length}/${results.length} checks passed`);
  if (bad.length) {
    console.log('  ' + C.r('FAILURES:'));
    bad.forEach((x) => console.log(`    ${x.group} · ${x.name} ${x.detail ? '— ' + x.detail : ''}`));
    process.exitCode = 1;
  } else {
    console.log('  ' + C.g(C.b('EVERYTHING PASSES')));
  }
  console.log('');
})().catch((e) => { console.error('\n  ' + e.message + '\n'); process.exitCode = 1; });
