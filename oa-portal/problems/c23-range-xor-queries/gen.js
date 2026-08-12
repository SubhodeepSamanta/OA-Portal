'use strict';
// Test generator - c23 / Q120 Range Xor Queries (CSES 1650)
// Small cases keep n*q modest for the O(n) per query brute. Ranges that start
// at 1 are included on purpose: that is where p[a-1] indexes p[0], and an
// off-by-one there survives every other test.
module.exports = function (R) {
  const T = [];
  const MAXV = 1000000000;
  const build = (x, qs) =>
    `${x.length} ${qs.length}\n${x.join(' ')}\n` + qs.map(([a, b]) => `${a} ${b}`).join('\n') + '\n';

  const ranges = (n, cnt) => Array.from({ length: cnt }, () => {
    let a = 1 + R.int(n), b = 1 + R.int(n);
    if (a > b) { const t = a; a = b; b = t; }
    return [a, b];
  });

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '8 4\n3 2 4 5 1 1 5 3\n2 4\n5 6\n1 8\n3 3\n' });
  T.push({ name: 'e02_single_element', input: '1 1\n7\n1 1\n' });
  T.push({ name: 'e03_prefix_ranges', input: '5 5\n1 2 3 4 5\n1 1\n1 2\n1 3\n1 4\n1 5\n' });
  T.push({ name: 'e04_suffix_ranges', input: '5 5\n1 2 3 4 5\n5 5\n4 5\n3 5\n2 5\n1 5\n' });
  T.push({ name: 'e05_all_same_value', input: '6 3\n9 9 9 9 9 9\n1 2\n1 3\n1 6\n' });
  T.push({ name: 'e06_pairs_cancel', input: '4 3\n5 5 7 7\n1 2\n3 4\n1 4\n' });
  T.push({ name: 'e07_max_values', input: '4 3\n1000000000 1000000000 999999999 1\n1 4\n1 2\n3 4\n' });
  T.push({ name: 'e08_powers_of_two', input: '5 3\n1 2 4 8 16\n1 5\n2 4\n1 1\n' });
  T.push({ name: 'e09_single_cells', input: '4 4\n11 22 33 44\n1 1\n2 2\n3 3\n4 4\n' });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 22; i++) {
    const n = 1 + R.int(80), q = 1 + R.int(80);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), ranges(n, q)),
    });
  }
  // narrow values, so cancellation happens often
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(60), q = 2 + R.int(60);
    T.push({
      name: 'n' + String(i + 1).padStart(2, '0') + '_narrow',
      input: build(Array.from({ length: n }, () => 1 + R.int(4)), ranges(n, q)),
    });
  }
  // every query anchored at 1 - the p[0] boundary
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(50);
    T.push({
      name: 'p' + String(i + 1).padStart(2, '0') + '_from_start',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)),
                   Array.from({ length: n }, (_, j) => [1, j + 1])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  const maxArr = () => Array.from({ length: N }, () => 1 + R.int(MAXV));
  T.push({ name: 'x01_max_random', input: build(maxArr(), ranges(N, Q)) });
  T.push({
    name: 'x02_max_full_range',
    input: build(maxArr(), Array.from({ length: Q }, () => [1, N])),
  });
  T.push({
    name: 'x03_max_single_cells',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => [1 + (i % N), 1 + (i % N)])),
  });
  T.push({
    // every value identical: even-length ranges xor to 0, odd to the value
    name: 'x04_max_all_same',
    input: build(Array(N).fill(MAXV), ranges(N, Q)),
  });
  T.push({
    name: 'x05_max_from_start',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => [1, 1 + (i % N)])),
  });

  return T;
};
