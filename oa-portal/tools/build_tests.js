'use strict';
/**
 * Builds test data for every problem.
 *
 *   1. compile solutions/ref.cpp and solutions/brute.cpp
 *   2. STRESS: many random small cases, brute vs ref - must agree on every one
 *   3. write samples/*.in + .out  (samples are fixed and must match statement.md)
 *   4. write tests/*.in + .out    (hidden)
 *   5. time the reference on every test and warn if it is close to the limit
 *
 * Usage:  node tools/build_tests.js  [problemId ...]  [--fast]
 *
 * --fast skips step 2. Use it only to REGENERATE data that was already
 * validated once (a fresh clone, say) - the generators are seeded, so the
 * files come out byte-identical. Never use it when authoring a problem.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { compileCpp } = require('../server/compile');

const ROOT = path.resolve(__dirname, '..');
const PROBLEMS = path.join(ROOT, 'problems');
const BUILD = path.join(ROOT, '.build');
const MAXBUF = 512 * 1024 * 1024;

fs.mkdirSync(BUILD, { recursive: true });

// ---- seeded RNG ---------------------------------------------------------
function makeRng(seed) {
  let s = seed >>> 0;
  const next = () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { next, int: (n) => Math.floor(next() * n) };
}

// ---- samples: must be byte-identical to the statements ------------------
const SAMPLES = {
  m1: ['3 0\n1 -1 0\n', '5 3\n3 0 -1 4 -3\n'],
  m2: ['8 3\n1 3 0 2 5 3 6 7\n', '5 1\n4 2 9 1 7\n'],
  m3: ['5 3\n1 3 2\n2 5 3\n4 4 1\n', '3 1\n1 3 7\n'],
  m4: ['6\n100 4 200 1 3 2\n', '7\n5 5 5 6 7 1 2\n'],
  m5: ['3 0\n1 -1 0\n', '5 3\n3 0 -1 4 -3\n', '4 100\n1 2 3 4\n'],
  m6: ['3\n0 30\n5 10\n15 20\n', '3\n1 5\n5 9\n9 12\n', '5\n1 10\n2 6\n3 8\n9 11\n20 21\n'],
  m7: ['5\n1 -2 0 3 -1\n', '2\n-5 -3\n', '6\n-1 -2 -3 -4 -5 -6\n'],
  m8: ['4\n1 2 3 4\n', '3\n5 1 5\n', '1\n-7\n'],
  m9: ['4\n2 7 4 1\n', '3\n3 2 5\n', '5\n-3 -4 6 -9 8\n'],
  m10: ['5\n1 -4 2 -1 3\n', '3\n-1 -2 -3\n', '4\n2 3 1 4\n'],
  m11: ['bab\n', 'aabbb\n', 'ba\n', 'abab\n'],
  m12: ['bab\n5 1 1\n', 'abab\n10 10 1\n', 'ba\n1 1 1\n', 'bbaabb\n1 1 100\n'],
  m13: ['5 5\n1 9 8 2 7\n', '5 6\n1 9 8 2 7\n', '3 10\n1 2 3\n', '4 5\n4 6 4 6\n'],
  m14: ['7 4\n1 1 2 2 3 3\n4 5\n4 6\n4 2\n5 5\n', '1 1\n\n1 1\n'],
  m15: ['4\n1 9 8 1\n', '5\n5 1 1 1 5\n', '1\n7\n', '2\n3 4\n'],
  m16: ['7 1\n1 1 2 2 3 3\n', '7 2\n1 1 2 2 3 3\n', '1 1\n\n', '5 2\n1 2 3 4\n'],
  m17: ['3 1\n10 5 1\n', '3 2\n10 5 1\n', '4 2\n1 1 1 1\n', '1 1\n7\n'],
  m18: ['6 3\n3 1 4 1 5 9\n', '5 1\n2 2 2 2 2\n', '4 4\n7 3 9 1\n'],
  m19: ['4 2\n10 20 30 40\n', '3 2\n5 5 5\n', '1 1\n7\n', '5 3\n1 2 3 4 100\n'],
  m20: ['5\n0 30\n5 10\n15 20\n25 40\n35 50\n', '3\n1 5\n5 9\n9 12\n',
        '4\n0 10\n0 10\n0 10\n0 10\n'],
  m21: ['4\n1 2 3 4\n', '1\n5\n', '5\n1 1 1 1 1\n'],
  m22: ['6\n2 1 5 6 2 3\n', '5\n0 0 0 0 0\n', '4\n4 4 4 4\n', '1\n7\n'],
  m23: ['3\n1 2\n2 4\n3 1\n', '1\n5 3\n', '4\n1 5\n2 1\n3 1\n4 1\n', '2\n1 10\n2 1\n'],
  m24: ['7 5\n1 1 2 2 3 3\n1 4 9\n1 2 9\n2 4 8\n2 4 9\n3 2 9\n',
        '7 4\n1 1 2 2 3 3\n1 4 5\n1 5 5\n3 2 5\n1 1 7\n',
        '7 3\n1 1 2 2 3 3\n1 4 1\n1 5 2\n3 2 1\n'],
  m25: ['7 6\n1 1 2 2 3 3\n1 4 5\n1 5 5\n4 2 0\n3 2 5\n4 2 0\n4 1 0\n',
        '3 4\n1 1\n4 1 0\n1 2 3\n4 1 0\n4 3 0\n'],
  m26: ['4 4 1\n1 2 10\n2 4 10\n1 3 1\n3 4 100\n', '3 1 0\n1 2 5\n', '2 1 5\n1 2 7\n',
        '4 4 0\n1 2 10\n2 4 10\n1 3 1\n3 4 100\n'],
  m27: ['1 7\nS.a.A.X\n', '2 5\nS.#.X\n..aA.\n', '2 3\nS#X\n###\n', '1 2\nSX\n'],
  m28: ['4 4\n1 2 0\n2 3 0\n3 4 1\n1 4 1\n', '3 1\n1 2 0\n', '1 0\n',
        '5 5\n1 3 0\n3 4 0\n4 5 0\n1 2 1\n2 5 1\n'],
  m29: ['5 4\n3 2 4 1 5\n1 3\n2 3\n3 4\n3 5\n', '3 3\n1 1 1\n1 2\n2 3\n3 1\n',
        '1 0\n7\n', '4 0\n5 3 9 1\n'],
  m30: ['3 3\n1 2 3 2\n2 3 3 2\n3 1 3 2\n', '2 2\n1 2 1 2\n2 1 1 2\n',
        '2 2\n1 2 3 2\n2 1 2 3\n', '3 3\n1 2 1 1\n2 3 5 1\n3 2 5 1\n'],
};

// expected sample answers, straight from the statements - a second check
const SAMPLE_EXPECT = {
  m1: ['3', '5'],
  m2: ['3 3 5 5 6 7', '4 2 9 1 7'],
  m3: ['2 5', '1 7'],
  m4: ['4', '3'],
  m5: ['3', '5', '0'],
  m6: ['2', '1', '3'],
  m7: ['4', '-3', '-1'],
  m8: ['7', '10', '-7'],
  m9: ['7', '8', '0'],
  m10: ['5', '0', '10'],
  m11: ['1', '0', '-1', '1'],
  m12: ['5', '1', '-1', '2'],
  m13: ['5', '4', '0', '4'],
  m14: ['2 1 2 5', '1'],
  m15: ['17', '11', '7', '7'],
  m16: ['2 2 2 0 0 0 0', '6 2 2 0 0 0 0', '0', '2 2 2 1 0'],
  m17: ['10', '15', '4', '7'],
  m18: ['9', '10', '9'],
  m19: ['50', '10', '7', '100'],
  m20: ['2\n2 1 5', '1\n3 1 2 3', '4\n1 1'],
  m21: ['19', '0', '12'],
  m22: ['10', '0', '16', '7'],
  m23: ['15', '8', '21', '15'],
  m24: ['true false false true false', 'true true true false', 'true true false'],
  m25: ['true true 2 true 1 1', '0 true 1 0'],
  m26: ['1', '-1', '0', '20'],
  m27: ['6', '6', '-1', '1'],
  m28: ['1', '-1', '0', '0'],
  m29: ['12', '-1', '7', '9'],
  m30: ['YES', 'NO', 'NO', 'NO'],
};

function compile(src, out) {
  const r = compileCpp(src, out, path.basename(src));
  if (!r.ok) {
    console.error('COMPILE FAILED: ' + src);
    console.error(r.stderr);
    process.exit(1);
  }
  return r.standard;
}

function runFile(exe, inFile) {
  const fd = fs.openSync(inFile, 'r');
  const t0 = process.hrtime.bigint();
  const r = spawnSync(exe, [], { stdio: [fd, 'pipe', 'pipe'], maxBuffer: MAXBUF, windowsHide: true });
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  fs.closeSync(fd);
  if (r.status !== 0) {
    return { ok: false, ms, err: `exit ${r.status}: ${(r.stderr || '').toString().slice(0, 400)}` };
  }
  return { ok: true, ms, out: r.stdout.toString() };
}

function runString(exe, input) {
  const r = spawnSync(exe, [], { input, maxBuffer: MAXBUF, windowsHide: true });
  if (r.status !== 0) return { ok: false, err: `exit ${r.status}` };
  return { ok: true, out: r.stdout.toString() };
}

const norm = (s) => s.trim().split(/\s+/).filter(Boolean).join(' ');

// ---- main ---------------------------------------------------------------
const argv = process.argv.slice(2);
const FAST = argv.includes('--fast');
const only = argv.filter((a) => !a.startsWith('--'));
const dirs = fs.readdirSync(PROBLEMS).filter((d) =>
  fs.existsSync(path.join(PROBLEMS, d, 'problem.json'))
);

let grandFail = 0;

for (const d of dirs) {
  const dir = path.join(PROBLEMS, d);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'problem.json'), 'utf8'));
  if (only.length && !only.includes(meta.id)) continue;

  console.log('\n' + '='.repeat(72));
  console.log(`${meta.id}  (${meta.docId})  ${meta.title}   [TL ${meta.timeLimitMs} ms]`);
  console.log('='.repeat(72));

  const refExe = path.join(BUILD, meta.id + '_ref.exe');
  const brtExe = path.join(BUILD, meta.id + '_brute.exe');
  compile(path.join(dir, 'solutions', 'ref.cpp'), refExe);
  compile(path.join(dir, 'solutions', 'brute.cpp'), brtExe);
  console.log('compiled ref + brute');

  const gen = require(path.join(dir, 'gen.js'));

  // ---- 1. sample answers must match the statements ---------------------
  const samples = SAMPLES[meta.id];
  const expects = SAMPLE_EXPECT[meta.id];
  let sampleFail = 0;
  samples.forEach((inp, i) => {
    const r = runString(refExe, inp);
    if (!r.ok) { console.log(`  SAMPLE ${i + 1}: ref crashed`); sampleFail++; return; }
    const got = norm(r.out), want = norm(expects[i]);
    if (got !== want) {
      console.log(`  SAMPLE ${i + 1} MISMATCH  ref="${got}"  statement="${want}"`);
      sampleFail++;
    }
  });
  console.log(`samples vs statement: ${samples.length - sampleFail}/${samples.length} match`);
  if (sampleFail) grandFail += sampleFail;

  // ---- 2. stress: brute vs ref over many random small cases ------------
  let stressRun = 0, stressBad = 0;
  for (let seed = 1; seed <= (FAST ? 0 : 25); seed++) {
    const cases = gen(makeRng(seed * 7919 + 13));
    for (const c of cases) {
      if (c.input.length > 4000) continue;      // small cases only
      const a = runString(refExe, c.input);
      const b = runString(brtExe, c.input);
      stressRun++;
      if (!a.ok || !b.ok || norm(a.out) !== norm(b.out)) {
        stressBad++;
        if (stressBad <= 3) {
          console.log(`  STRESS MISMATCH (seed ${seed}, ${c.name})`);
          console.log(`    input: ${JSON.stringify(c.input.slice(0, 160))}`);
          console.log(`    ref:   ${a.ok ? norm(a.out).slice(0, 120) : a.err}`);
          console.log(`    brute: ${b.ok ? norm(b.out).slice(0, 120) : b.err}`);
        }
      }
    }
  }
  console.log(FAST ? 'stress brute-vs-ref: SKIPPED (--fast)'
                   : `stress brute-vs-ref: ${stressRun - stressBad}/${stressRun} agree` +
              (stressBad ? '   *** FAILURES ***' : '   OK'));
  grandFail += stressBad;

  // ---- 3. write samples -------------------------------------------------
  const sDir = path.join(dir, 'samples');
  fs.rmSync(sDir, { recursive: true, force: true });
  fs.mkdirSync(sDir, { recursive: true });
  samples.forEach((inp, i) => {
    const nm = String(i + 1).padStart(2, '0');
    fs.writeFileSync(path.join(sDir, nm + '.in'), inp);
    const r = runString(refExe, inp);
    fs.writeFileSync(path.join(sDir, nm + '.out'), r.out);
  });
  console.log(`samples written: ${samples.length}`);

  // ---- 4. write hidden tests -------------------------------------------
  const tDir = path.join(dir, 'tests');
  fs.rmSync(tDir, { recursive: true, force: true });
  fs.mkdirSync(tDir, { recursive: true });

  const cases = gen(makeRng(20260809));
  let slowest = 0, slowestName = '';
  let idx = 0;
  for (const c of cases) {
    idx++;
    const base = String(idx).padStart(2, '0') + '_' + c.name;
    const inF = path.join(tDir, base + '.in');
    fs.writeFileSync(inF, c.input);
    const r = runFile(refExe, inF);
    if (!r.ok) {
      console.log(`  REF FAILED on ${base}: ${r.err}`);
      grandFail++;
      continue;
    }
    fs.writeFileSync(path.join(tDir, base + '.out'), r.out);
    if (r.ms > slowest) { slowest = r.ms; slowestName = base; }
  }
  console.log(`hidden tests written: ${idx}`);

  const pct = Math.round((slowest / meta.timeLimitMs) * 100);
  console.log(`slowest reference run: ${slowest.toFixed(0)} ms on ${slowestName}  (${pct}% of TL)`);
  if (pct > 40) {
    console.log(`  WARNING: reference uses ${pct}% of the limit - raise timeLimitMs`);
  }
}

console.log('\n' + '='.repeat(72));
if (grandFail === 0) {
  console.log('ALL PROBLEMS BUILT AND VALIDATED - 0 failures');
} else {
  console.log(`BUILD COMPLETED WITH ${grandFail} FAILURE(S) - fix before using`);
  process.exitCode = 1;
}
