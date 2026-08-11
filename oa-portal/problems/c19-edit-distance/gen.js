'use strict';
// Test generator - c19 / Q103 Edit Distance (CSES 1639)
// Small cases keep both strings at 11 characters or fewer so the brute can
// recurse without memoisation. Asymmetric lengths are deliberate: swapping
// the insert and delete moves survives equal-length tests.
module.exports = function (R) {
  const T = [];
  const build = (a, b) => `${a}\n${b}\n`;
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const word = (len, alpha) =>
    Array.from({ length: len }, () => A[R.int(alpha)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build('LOVE', 'MOVIE') });
  T.push({ name: 'e02_identical', input: build('ABC', 'ABC') });
  T.push({ name: 'e03_single_same', input: build('A', 'A') });
  T.push({ name: 'e04_single_diff', input: build('A', 'B') });
  T.push({ name: 'e05_one_vs_long', input: build('A', 'AAAAAAAAAA') });
  T.push({ name: 'e06_long_vs_one', input: build('AAAAAAAAAA', 'A') });
  T.push({ name: 'e07_disjoint', input: build('AAAA', 'BBBB') });
  T.push({ name: 'e08_prefix', input: build('ABCDE', 'ABC') });
  T.push({ name: 'e09_suffix', input: build('CDE', 'ABCDE') });
  T.push({ name: 'e10_reversed', input: build('ABCDE', 'EDCBA') });
  T.push({ name: 'e11_one_insert', input: build('ABCDE', 'ABXCDE') });
  T.push({ name: 'e12_one_delete', input: build('ABXCDE', 'ABCDE') });

  // --- small randoms (brute recurses) --------------------------------
  for (let i = 0; i < 22; i++) {
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(word(1 + R.int(11), 26), word(1 + R.int(11), 26)),
    });
  }
  // tiny alphabet - many coincidental matches
  for (let i = 0; i < 12; i++) {
    T.push({
      name: 'a' + String(i + 1).padStart(2, '0') + '_small_alphabet',
      input: build(word(1 + R.int(11), 2), word(1 + R.int(11), 2)),
    });
  }
  // very lopsided lengths - insert and delete are not interchangeable here
  for (let i = 0; i < 10; i++) {
    T.push({
      name: 'l' + String(i + 1).padStart(2, '0') + '_lopsided',
      input: build(word(1 + R.int(3), 4), word(8 + R.int(4), 4)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 5000;
  T.push({ name: 'x01_max_random', input: build(word(N, 26), word(N, 26)) });
  T.push({ name: 'x02_max_identical', input: build('A'.repeat(N), 'A'.repeat(N)) });
  T.push({ name: 'x03_max_disjoint', input: build('A'.repeat(N), 'B'.repeat(N)) });
  T.push({ name: 'x04_max_lopsided', input: build('A', word(N, 26)) });
  T.push({ name: 'x05_max_lopsided_other', input: build(word(N, 26), 'Z') });
  T.push({ name: 'x06_max_small_alphabet', input: build(word(N, 2), word(N, 2)) });
  T.push({
    // same string reversed at full size
    name: 'x07_max_reversed',
    input: (() => { const w = word(N, 4); return build(w, w.split('').reverse().join('')); })(),
  });

  return T;
};
