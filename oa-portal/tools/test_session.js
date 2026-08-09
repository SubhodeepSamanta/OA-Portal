'use strict';
/**
 * Proves a login survives a full server restart.
 * Run with the server ALREADY running; it restarts it itself.
 */
const { spawn, spawnSync, execSync } = require('node:child_process');
const path = require('node:path');

const BASE = 'http://localhost:4321';
const ROOT = path.resolve(__dirname, '..');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function post(p, body, token) {
  const r = await fetch(BASE + p, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: JSON.stringify(body || {}),
  });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}
async function get(p, token) {
  const r = await fetch(BASE + p, { headers: token ? { Authorization: 'Bearer ' + token } : {} });
  return { status: r.status, body: await r.json().catch(() => ({})) };
}

function killServer() {
  try {
    execSync(
      'powershell -NoProfile -Command "(Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }"',
      { stdio: 'ignore', windowsHide: true }
    );
  } catch (_) {}
}

function startServer() {
  // detached WITHOUT windowsHide opens a visible console window on Windows.
  const child = spawn('node', ['server/index.js'], {
    cwd: ROOT, detached: true, stdio: 'ignore', windowsHide: true,
  });
  child.unref();
}

async function waitUp(timeoutMs = 15000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try { const r = await fetch(BASE + '/api/me'); if (r.status === 401 || r.status === 200) return true; }
    catch (_) {}
    await sleep(400);
  }
  return false;
}

(async () => {
  console.log('\nSession persistence test\n');
  const results = [];
  const check = (n, ok, d = '') => { results.push(ok); console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${n.padEnd(42)} ${d}`); };

  let r = await post('/api/login', { username: '_selftest', password: 'selftest' });
  check('sign in', r.status === 200 && !!r.body.token);
  const token = r.body.token;

  r = await get('/api/me', token);
  check('token works before restart', r.status === 200 && r.body.username === '_selftest');

  console.log('\n  restarting server…\n');
  killServer();
  await sleep(1500);
  startServer();
  const up = await waitUp();
  check('server came back up', up);

  r = await get('/api/me', token);
  check('SAME token still valid after restart', r.status === 200 && r.body.username === '_selftest',
        r.body.username || r.body.error);

  r = await get('/api/catalog', token);
  check('authorised routes work after restart', r.status === 200 && (r.body.items || []).length === 396,
        `${(r.body.items || []).length} catalogue items`);

  r = await get('/api/me', 'deadbeef'.repeat(6));
  check('bogus token rejected', r.status === 401);

  r = await post('/api/logout', {}, token);
  check('logout succeeds', r.status === 200);
  r = await get('/api/me', token);
  check('token dead after logout', r.status === 401);

  const bad = results.filter((x) => !x).length;
  console.log('');
  console.log(bad === 0 ? `  ALL ${results.length} SESSION CHECKS PASSED\n` : `  ${bad} FAILED\n`);
  if (bad) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
