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
  m31: ['3 3\nR..\n.#.\n...\n', '2 3\nR#.\n.#.\n', '1 1\nR\n', '2 2\n..\n..\n'],
  m32: ['4 4 2\n1 2\n2 3\n3 4\n4 1\n1\n2\n', '3 2 2\n1 2\n2 3\n2\n1\n',
        '3 3 2\n1 2\n1 2\n2 3\n1\n3\n'],
  m33: ['5\n2 3 1 3 4\n', '3\n1 2 3\n', '1\n1\n', '6\n2 1 2 3 6 5\n'],
  m34: ['4 5\n1 2 3\n2 4 5\n1 3 2\n3 4 6\n1 4 20\n', '3 1\n1 2 5\n', '1 0\n', '2 1\n1 2 7\n'],
  m35: ['3 3 4\n1 1\n1 2\n2 2\n3 3\n', '2 3 3\n1 1\n1 2\n2 3\n',
        '3 3 4\n1 1\n2 1\n2 2\n3 3\n', '3 2 2\n1 1\n2 1\n'],
  m36: ['3\n1 2 3\n1 5 6\n1 8 9\n', '2\n1 100\n2 3\n', '1\n7\n', '3\n0 0 0\n0 0 0\n0 0 0\n'],
  m37: ['3 3\n1 2 3\n4 5 6\n7 8 9\n', '2 3\n1 2 3\n100 4 5\n', '1 1\n5\n', '1 4\n1 10 11 12\n'],
  // built with padEnd so the 32-character addresses cannot be miscounted
  m38: [`3 2\n1\n10\n1011\n${'1011'.padEnd(32, '0')}\n${'0111'.padEnd(32, '0')}\n`,
        `1 1\n0\n${'0'.repeat(32)}\n`,
        `2 1\n11\n1\n${'1'.padEnd(32, '0')}\n`],
  m39: ['3 5\nRANK 1\nUPDATE 1 10\nRANK 2\nRANK 1\nUPDATE 2 20\n',
        '2 3\nUPDATE 1 5\nUPDATE 2 5\nRANK 1\n',
        '4 4\nUPDATE 1 100\nUPDATE 2 50\nUPDATE 3 100\nRANK 2\n',
        '1 1\nRANK 1\n'],
  m40: ['5 4\n1 2 3 4 5\nMAX 1 5\nADD 2 3 10\nMAX 1 3\nMAX 4 5\n',
        '3 3\n-5 -5 -5\nMAX 1 3\nADD 1 3 -10\nMAX 2 2\n',
        '1 3\n7\nMAX 1 1\nADD 1 1 1000000000\nMAX 1 1\n'],
  m41: ['aba\nabababa\n', 'aa\naaaa\n', 'abc\ndefgh\n', 'a\na\n'],
  m42: ['aabaa\n', 'abc\n', 'aaaa\n', 'a\n'],
  m43: ['3\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0\n', '1\n0 7\n7 0\n',
        '2\n0 1 100\n100 0 1\n1 100 0\n'],
  m44: ['3 1\n1 5\n2 3\n5 8\n', '3 2\n1 10\n2 3\n2 4\n', '2 2\n1 100\n1 100\n',
        '4 1\n1 100\n2 3\n3 4\n4 5\n'],
  m45: ['4\n1 6 11 5\n', '2\n1 1\n', '1\n5\n', '3\n1 2 3\n'],
  m46: ['abacaba\n2\na b\n', 'abc\n1\nz\n', 'aaaa\n1\na\n', 'xyzzy\n3\nx y z\n'],
  m47: ['3 5\n1 3\n2 3\n10 5\n', '2 2\n1 3\n5 2\n', '4 3\n1 3\n2 3\n3 3\n10 3\n',
        '1 1000000000\n1 1000000000\n'],
  m48: ['3\n1 5\n2 6\n7 8\n', '3\n1 10\n1 10\n1 10\n', '1\n5 5\n',
        '4\n1 2\n1 2\n3 4\n3 4\n'],
  m49: ['3\n1 2 3\n', '2\n1 2\n', '1\n5\n', '4\n0 0 0 4\n'],
  m50: ['3 2\n100 200 300\n50 10\n', '2 0\n10 20\n', '1 3\n100\n100 1 1\n',
        '2 3\n10 100\n30 70 5\n'],
  m51: ['5\nEDIT 0 a\nEDIT 1 b\nQUERY 2 1\nQUERY 2 2\nEDIT 1 c\n',
        '6\nEDIT 0 x\nEDIT 1 y\nEDIT 1 z\nQUERY 2 2\nQUERY 3 2\nQUERY 3 1\n',
        '7\nEDIT 0 a\nEDIT 1 b\nEDIT 2 c\nEDIT 3 d\nQUERY 4 1\nQUERY 4 4\nQUERY 4 2\n'],
  m52: ['5\n1 2 3 4 5\n', '5\n5 4 3 2 1\n', '1\n7\n', '6\n1 5 2 4 3 6\n'],
  m53: ['0011\n', '01\n', '000\n', '010101\n'],
  m54: ['5 1 3\n1 1 3\n2 3 1\n10 1 5\n', '10 2 3\n1 1 5\n1 10 2\n1 3 4\n', '3 1 1\n5 2 2\n'],
  m55: ['3 4\n90 50\n95 80\n99 200\nROUTE 90\nROUTE 96\nROUTE 100\nREMOVE 1\n',
        '2 5\n80 10\n90 100\nROUTE 85\nREMOVE 2\nROUTE 85\nADD 95 20\nROUTE 85\n',
        '3 2\n99 500\n95 10\n90 1\nROUTE 92\nROUTE 90\n'],
  m56: ['3 2\n5 1 10\n', '3 1\n3 0 0\n', '2 5\n1 1\n', '4 1\n4 0 0 0\n'],
  m57: ['3\n5 3 9\n', '4\n2 2 2 2\n', '1\n7\n', '5\n1 2 3 4 5\n'],
  m58: ['2 3 5\n0 0\n10 0\n0 0\n1 1\n10 1\n', '1 1 0\n5 5\n5 5\n', '1 1 1\n0 0\n10 10\n',
        '3 2 100\n0 0\n50 50\n100 100\n1 1\n2 2\n'],
  m59: ['3\n1 2\n1 1\n2 2\n', '1\n5 5\n', '3\n1 10\n1 10\n1 10\n', '4\n1 1\n1 1\n2 2\n3 3\n'],
  m60: ['3\nListen!\nSilent\nenlist\n', '2\nhello\nworld\n',
        '4\nDormitory\nDirty Room!!\nabc\ncab\n', '3\n!!!\n...\n123\n'],
  m61: ['7\n1 2 1 3 2 1 3\n', '1\n5\n', '4\n7 7 7 7\n', '5\n1 2 3 4 5\n'],
  m62: ['2\n0 5 3\n0 5 3\n', '2\n0 10 3\n0 10 3\n', '1\n5 7 2\n', '2\n0 10 5\n4 6 2\n'],
  m63: ['4 4\n1 5 2 3\n1 2\n1 3\n2 4\n3 4\n', '1 0\n7\n', '3 2\n1 1 1\n1 2\n2 3\n',
        '5 3\n10 1 1 1 100\n1 3\n2 3\n3 4\n'],
  m64: ['4\n1 3 5\n2 5 6\n4 6 5\n7 8 4\n', '1\n1 10 100\n', '2\n1 5 10\n5 9 20\n',
        '3\n1 10 1\n2 3 5\n4 5 5\n'],
  m65: ['6 2\n1 1 2 3 3 3\n', '4 1\n1 2 3 4\n', '5 5\n7 7 7 7 7\n', '6 3\n1 2 3 4 5 6\n'],
  m66: ['3\n1 2 3\n', '1\n5\n', '2\n4 7\n', '4\n1 1 1 1\n'],
  m67: ['2 5\n0 10\n0 10\n', '1 0\n5 10\n', '2 100\n0 1\n0 1000000000\n',
        '3 6\n1 4\n2 4\n0 4\n'],
  m68: ['3 2\n1 2 10\n2 3 10\n', '4 2\n1 2 5\n3 4 7\n', '2 0\n',
        '3 3\n1 2 5\n2 3 5\n3 1 5\n'],
  m69: ['3\n10 0 1\n5 10 1\n5 10 1\n', '2\n10 0 5\n0 10 3\n', '2\n5 5 100\n7 7 100\n',
        '2\n1 2 1\n3 3 1\n'],
  m70: ['2\n0 0 10 10\n5 5 15 15\n', '1\n0 0 4 5\n', '2\n0 0 10 10\n0 0 10 10\n',
        '3\n0 0 2 2\n5 5 7 7\n0 0 10 10\n'],
  m71: ['3\n0 100 ALLOW\n50 60 DENY\n0 200 ALLOW\n', '2\n0 10 ALLOW\n11 20 DENY\n',
        '4\n0 10 ALLOW\n20 30 DENY\n5 25 ALLOW\n0 30 DENY\n',
        '3\n0 10 ALLOW\n11 20 ALLOW\n5 15 DENY\n'],
  m72: ['5 2\n1 3 6 10 11\n', '4 1\n1 2 3 10\n', '3 3\n5 1 9\n', '6 3\n1 2 3 100 101 200\n'],
  m73: ['5\n1 4 3 2 5\n', '4\n1 2 3 4\n', '4\n1 3 2 4\n', '5\n1 5 3 4 2\n'],
  m74: ['4 6\n', '1 1\n', '12 8\n', '1000000000000000000 999999999999999999\n'],
  m75: ['4\n5 2\n5 0\n5 5\n6 3\n', '2\n3 5\n0 0\n', '1\n10 5\n'],
  m76: ['3\n1 10\n2 2\n1 1\n', '1\n1 1000000\n', '2\n999983 1000000\n4 4\n'],
  m77: ['3\n1 2 3\n', '2\n1 2\n', '4\n1 1 1 2\n', '1\n7\n'],
  m78: ['20 2\n', '9 9\n', '100 1\n', '1000000000000000000 1\n'],
  m79: ['3 10\n', '4 8\n', '5 3\n', '1 1000000000000000000\n'],
  m80: ['6\n1 2 1 3 2 5\n', '2\n7 9\n', '4\n1000000000 5 5 1\n'],
  m81: ['3 3\n3 5 6\n', '2 2\n1 1\n', '4 2\n3 3 0 1\n', '1 5\n31\n'],
  m82: ['5 2 10\n1 1\n1 2\n1 3\n1 11\n2 3\n', '3 1 5\n1 1\n1 5\n1 6\n',
        '4 1 100\n1 1\n2 1\n1 2\n2 2\n'],
  m83: ['6\nAPPEND abc\nPRINT 2\nDELETE 1\nPRINT 2\nUNDO\nPRINT 3\n',
        '7\nAPPEND xy\nAPPEND z\nUNDO\nPRINT 2\nREDO\nPRINT 3\nUNDO\n',
        '5\nUNDO\nAPPEND ab\nUNDO\nREDO\nPRINT 1\n'],
  m84: ['3 2\n1 2 1\n2 3 1\n', '3 3\n1 2 1\n2 3 1\n1 3 1\n', '3 0\n', '2 1\n1 2 0\n'],
  m85: ['4\n1 2 9 3\n', '1\n5\n', '2\n3 7\n', '4\n1 1 1 1\n'],
  m86: ['3 0 5\n1 2 0\n', '1 0 1000000000000000000\n0\n', '5 0 1000000000000000000\n1 2 3 4 2\n'],
  m87: ['0 1 1 1 10\n', '1 1 1 0 5\n', '0 1 1 1 0\n', '2 3 2 3 4\n'],
  m88: ['1 100\n', '11 11\n', '1 10\n', '100 110\n'],
  m89: ['4\n1 6 11 5\n', '1\n5\n', '4\n1 1 1 1\n', '2\n1 1000000000\n'],
  m90: ['3\n1 2 3\n', '1\n5\n', '2\n0 3\n', '4\n0 0 0 4\n'],
  m91: ['4\n1 3 4 2 2\n', '1\n1 1\n', '3\n3 1 3 3\n', '5\n1 2 3 4 5 3\n'],

  // CSES mirrors - the samples are the ones cses.fi prints
  c1: ['5\n3 1 2 7 4\n'],
  c2: ['3\n1 2\n2 4\n4 4\n'],
  c3: ['3 7\n3 2 5\n'],
  c4: ['5 3\n2 4 7 3 5\n'],
  c5: ['5 3\n5 3 7 8 5\n4 8 3\n'],
  c6: ['5\n1 1 2 3\n'],
  c7: ['5\n1 2\n1 3\n3 4\n3 5\n'],
  c8: ['5 3\n1 1 3 3\n4 5\n2 5\n1 4\n'],
  c9: ['5 8\n########\n#.A#...#\n#.##.#B#\n#......#\n########\n'],
  c10: ['4 2\n1 2\n3 4\n'],
  c11: ['3 4\n1 2 3\n2 3 1\n1 3 7\n2 1 5\n'],
  c12: ['5 3\n1 2\n3 1\n4 5\n'],
  c13: ['5 5\n1 2\n2 5\n1 3\n3 4\n4 5\n'],
  c15: ['4 3\n2 1 1 4\n1 2\n3 4\n4 1\n'],
  c16: ['3\n'],
  c17: ['27\n'],
  c18: ['4 10\n4 8 5 3\n5 12 8 1\n'],
  c19: ['LOVE\nMOVIE\n'],
  c20: ['8 4\n3 2 4 5 1 1 5 3\n2 1 4\n2 5 6\n1 3 1\n2 1 4\n'],
  c21: ['8 4\n3 2 4 5 1 1 5 3\n2 1 4\n2 5 6\n1 2 3\n2 1 4\n'],
  c22: ['8 3\n3 2 4 5 1 1 5 3\n2 4\n1 2 5 1\n2 4\n'],
  c23: ['8 4\n3 2 4 5 1 1 5 3\n2 4\n5 6\n1 8\n3 3\n'],
  c24: ['3\n16\n17\n18\n'],
  c25: ['3\n3 4\n2 8\n123 123\n'],
  c26: ['saippuakauppias\npp\n'],
  c27: ['abcababcab\n'],
  c28: ['5\n3 14 15 7 9\n'],
  c29: ['5 6\n1 2 3\n2 3 5\n2 4 2\n3 4 8\n5 1 7\n5 4 4\n'],
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
  m31: ['4', '-1', '0', '-1'],
  m32: ['1 2', '2 3', '1 2'],
  m33: ['3 3 3 4 5', '1 1 1', '1', '2 2 3 4 2 2'],
  m34: ['5', '-1', '0', '3'],
  m35: ['YES', 'NO', 'YES', 'NO'],
  m36: ['9', '4', '7', '0'],
  m37: ['3', '2', '0', '9'],
  m38: ['4 -1', '1', '1'],
  m39: ['0 1 0', '0', '2', '0'],
  m40: ['5 13 5', '-5 -15', '7 1000000007'],
  m41: ['3 1 3 5', '3 1 2 3', '0', '1 1'],
  m42: ['5', '3', '4', '1'],
  m43: ['80', '14', '3'],
  m44: ['7', '10', '198', '99'],
  m45: ['1', '0', '-1', '0'],
  m46: ['3', '0', '4', '5'],
  m47: ['3', '1', '2', '1'],
  m48: ['1', '2', '0', '2'],
  m49: ['2', '-1', '0', '6'],
  m50: ['43000', '3000', '0', '3700'],
  m51: ['a b', 'y z x', 'a d b'],
  m52: ['0', '4', '0', '3'],
  m53: ['2', '1', '0', '9'],
  m54: ['3 5 14', '5 18 4', '6'],
  m55: ['50 200 -1', '100 -1 20', '10 1'],
  m56: ['1', '3', '-1', '6'],
  m57: ['3 1 2', '1 2 3 4', '1', '5 4 3 2 1'],
  m58: ['2', '1', '-1', '1'],
  m59: ['2', '1', '3', '3'],
  m60: ['1', '2', '2', '1'],
  m61: ['3', '1', '1', '5'],
  m62: ['NO', 'YES', 'YES', 'YES'],
  m63: ['6', '7', '3', '3'],
  m64: ['14', '100', '30', '10'],
  m65: ['3', '4', '5', '2'],
  m66: ['12', '0', '12', '13'],
  m67: ['200000', '500000', '0', '750000'],
  m68: ['1 1 2 10', '2 1 2 5 3 2 7', '2 1 0 0 2 0 0', '1 1 0 0'],
  m69: ['10', '50', '0', '-1'],
  m70: ['75', '20', '0', '92'],
  m71: ['1', '0', '1', '1'],
  m72: ['6', '9', '0', '3'],
  m73: ['2 4', '1 1', '2 3', '-1'],
  m74: ['3', '1', '2', '999999999999999999'],
  m75: ['10 1 1 20', '0 1', '252'],
  m76: ['4 1 0', '78498', '1 0'],
  m77: ['YES', 'NO', 'NO', 'YES'],
  m78: ['3', '1', '3', '19'],
  m79: ['3 3 4', '2 2 2 2', '0 0 1 1 1', '1000000000000000000'],
  m80: ['3 5', '7 9', '1 1000000000'],
  m81: ['3', '0', '5', '0'],
  m82: ['11011', '101', '1100'],
  m83: ['b b c', 'y z', 'a'],
  m84: ['2', '0', '8', '2'],
  m85: ['10', '5', '7', '2'],
  m86: ['2', '0', '4'],
  m87: ['55', '1', '0', '102'],
  m88: ['90', '0', '10', '9'],
  m89: ['1', '5', '0', '999999999'],
  m90: ['2', '0', '5', '12'],
  m91: ['2', '1', '3', '3'],

  c1: ['1'],
  c2: ['2\n1 2 1'],
  c3: ['8'],
  c4: ['8'],
  c5: ['3\n8\n-1'],
  c6: ['4 1 1 0 0'],
  c7: ['2 3 2 3 3'],
  c8: ['3\n1\n1'],
  c9: ['YES\n9\nLDDRRRRRU'],
  c10: ['1\n2 3'],
  c11: ['2'],
  c12: ['3 4 1 5 2'],
  c13: ['4\n1 3 4 5'],
  c15: ['1\n2\n4'],
  c16: ['4'],
  c17: ['5'],
  c18: ['13'],
  c19: ['2'],
  c20: ['14\n2\n11'],
  c21: ['2\n1\n3'],
  c22: ['5\n6'],
  c23: ['3\n0\n6\n4'],
  c24: ['5\n2\n6'],
  c25: ['81\n256\n921450052'],
  c26: ['2'],
  c27: ['2 5'],
  c28: ['7'],
  c29: ['14'],
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

/**
 * The stress loop only skips cases over 4 KB, which is a proxy for "small"
 * that fails badly on combinatorial and coordinate-heavy inputs: an 18x18
 * cost table is 2.6 KB but 18! permutations, and two rectangles spanning the
 * plane is 60 bytes but a 2e9 x 2e9 pixel grid.
 *
 * Without a timeout such a case hangs the whole build with no output, or
 * crashes and looks exactly like a wrong answer. A bounded run turns both
 * into an immediate, specific diagnostic pointing at the real culprit -
 * the generator or the brute, not the reference.
 */
const BRUTE_TIMEOUT_MS = 20000;

function runString(exe, input, timeoutMs) {
  const opts = { input, maxBuffer: MAXBUF, windowsHide: true };
  if (timeoutMs) opts.timeout = timeoutMs;
  const r = spawnSync(exe, [], opts);
  if (r.error && r.error.code === 'ETIMEDOUT') {
    return { ok: false, timedOut: true, err: `no result within ${timeoutMs / 1000}s` };
  }
  if (r.status !== 0) return { ok: false, err: `exit ${r.status}` };
  return { ok: true, out: r.stdout.toString() };
}

const norm = (s) => s.trim().split(/\s+/).filter(Boolean).join(' ');

/**
 * Problems where several different outputs are all correct (any allocation
 * using the minimum number of rooms, any valid ordering) ship a checker.cpp.
 * Both the sample check and the brute-vs-ref stress have to go through it -
 * comparing tokens would flag a correct brute for numbering things its own way.
 *
 * Problems with no `checker` field keep the plain token comparison.
 */
function makeComparator(meta, dir) {
  if (!meta.checker) {
    return {
      checked: false,
      compare: (input, want, got) =>
        (norm(want) === norm(got)
          ? { ok: true }
          : { ok: false, why: `ref="${norm(want).slice(0, 120)}"  other="${norm(got).slice(0, 120)}"` }),
    };
  }

  const exe = path.join(BUILD, meta.id + '_checker.exe');
  compile(path.join(dir, meta.checker), exe);
  const inF = path.join(BUILD, meta.id + '_chk.in');
  const expF = path.join(BUILD, meta.id + '_chk.exp');
  const gotF = path.join(BUILD, meta.id + '_chk.got');

  return {
    checked: true,
    compare: (input, want, got) => {
      fs.writeFileSync(inF, input);
      fs.writeFileSync(expF, want);
      fs.writeFileSync(gotF, got);
      const r = spawnSync(exe, [inF, expF, gotF], { maxBuffer: MAXBUF, windowsHide: true });
      if (r.error) return { ok: false, why: 'checker could not run: ' + r.error.message };
      const note = (r.stdout || '').toString().trim();
      if (r.status === 0) return { ok: true };
      return { ok: false, why: note || `checker exited ${r.status}` };
    },
  };
}

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
  const cmp = makeComparator(meta, dir);
  if (cmp.checked) console.log(`compiled ${meta.checker} - this problem is graded by a checker`);

  // ---- 1. sample answers must match the statements ---------------------
  const samples = SAMPLES[meta.id];
  const expects = SAMPLE_EXPECT[meta.id];
  let sampleFail = 0;
  samples.forEach((inp, i) => {
    const r = runString(refExe, inp);
    if (!r.ok) { console.log(`  SAMPLE ${i + 1}: ref crashed`); sampleFail++; return; }
    const v = cmp.compare(inp, expects[i], r.out);
    if (!v.ok) {
      console.log(`  SAMPLE ${i + 1} MISMATCH  ${v.why}`);
      sampleFail++;
    }
  });
  console.log(`samples vs statement: ${samples.length - sampleFail}/${samples.length} match`);
  if (sampleFail) grandFail += sampleFail;

  // ---- 2. stress: brute vs ref over many random small cases ------------
  let stressRun = 0, stressBad = 0, bruteUnusable = 0;
  const unusableSeen = new Set();
  for (let seed = 1; seed <= (FAST ? 0 : 25); seed++) {
    const cases = gen(makeRng(seed * 7919 + 13));
    for (const c of cases) {
      if (c.input.length > 4000) continue;      // small cases only, by BYTES
      const a = runString(refExe, c.input, meta.timeLimitMs * 4);
      const b = runString(brtExe, c.input, BRUTE_TIMEOUT_MS);
      stressRun++;

      // Separate "the brute could not cope" from "they disagree". The first
      // means this case is too big for the brute even though it is small on
      // disk - a generator or brute problem, never a wrong reference.
      if (!b.ok) {
        bruteUnusable++;
        if (!unusableSeen.has(c.name)) {
          unusableSeen.add(c.name);
          console.log(`  BRUTE CANNOT HANDLE ${c.name}: ${b.err}`);
          console.log(`    input: ${JSON.stringify(c.input.slice(0, 120))}`);
          console.log('    This case is under 4 KB but too big for the brute.');
          console.log('    Bound the brute\'s exhaustive mode, or shrink the case.');
        }
        continue;
      }
      const v = a.ok ? cmp.compare(c.input, a.out, b.out) : { ok: false, why: 'ref failed: ' + a.err };
      if (!v.ok) {
        stressBad++;
        if (stressBad <= 3) {
          console.log(`  STRESS MISMATCH (seed ${seed}, ${c.name})`);
          console.log(`    input: ${JSON.stringify(c.input.slice(0, 160))}`);
          console.log(`    ${v.why}`);
          if (cmp.checked && a.ok) {
            console.log(`    ref:   ${norm(a.out).slice(0, 120)}`);
            console.log(`    brute: ${norm(b.out).slice(0, 120)}`);
          }
        }
      }
    }
  }
  const compared = stressRun - bruteUnusable;
  console.log(FAST ? 'stress brute-vs-ref: SKIPPED (--fast)'
                   : `stress brute-vs-ref: ${compared - stressBad}/${compared} agree` +
              (stressBad ? '   *** FAILURES ***' : '   OK') +
              (bruteUnusable ? `   (${bruteUnusable} case(s) the brute could not run)` : ''));
  grandFail += stressBad + bruteUnusable;

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
