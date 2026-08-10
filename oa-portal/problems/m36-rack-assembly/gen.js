'use strict';
// Test generator - m36 / Q109 Rack Assembly
// Small cases keep n <= 8 because brute.cpp walks every permutation.
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length}\n` + rows.map((r) => r.join(' ')).join('\n') + '\n';
  const grid = (n, f) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => f(i, j)));

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1_greedy_trap', input: build([[1, 2, 3], [1, 5, 6], [1, 8, 9]]) });
  T.push({ name: 'e02_two_by_two', input: build([[1, 100], [2, 3]]) });
  T.push({ name: 'e03_single', input: build([[7]]) });
  T.push({ name: 'e04_all_zero', input: build(grid(4, () => 0)) });
  T.push({ name: 'e05_all_max', input: build(grid(5, () => 1000000)) });
  T.push({ name: 'e06_identity_cheap', input: build(grid(6, (i, j) => (i === j ? 0 : 1000000))) });
  T.push({ name: 'e07_anti_diagonal_cheap', input: build(grid(6, (i, j) => (i + j === 5 ? 0 : 999999))) });
  T.push({ name: 'e08_one_column_free', input: build(grid(5, (i, j) => (j === 2 ? 0 : 1 + i * j))) });
  T.push({ name: 'e09_row_equal', input: build(grid(5, (i) => i * 100)) });
  T.push({ name: 'e10_col_equal', input: build(grid(5, (i, j) => j * 100)) });
  T.push({ name: 'e11_zero_row_zero_col', input: build(grid(4, (i, j) => (i === 0 || j === 0 ? 0 : 5))) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(8);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(grid(n, () => R.int(60))),
    });
  }
  // heavy ties: many equally good assignments
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_ties_small',
      input: build(grid(n, () => R.int(3))),
    });
  }
  // one cheap cell per row, all in the same column: greedy always loses
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(5);
    const col = R.int(n);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_greedy_trap_small',
      input: build(grid(n, (i, j) => (j === col ? 1 : 50 + R.int(50)))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium_n12', input: build(grid(12, () => R.int(1000000))) });
  T.push({ name: 'm02_medium_n14', input: build(grid(14, () => R.int(1000))) });

  // --- maximum size --------------------------------------------------
  const N = 18;
  T.push({ name: 'x01_max_random', input: build(grid(N, () => R.int(1000000))) });
  T.push({ name: 'x02_max_all_zero', input: build(grid(N, () => 0)) });
  T.push({ name: 'x03_max_all_same', input: build(grid(N, () => 1000000)) });
  T.push({ name: 'x04_max_identity_cheap', input: build(grid(N, (i, j) => (i === j ? 0 : 1000000))) });
  T.push({ name: 'x05_max_anti_diagonal', input: build(grid(N, (i, j) => (i + j === N - 1 ? 0 : 1000000))) });
  T.push({
    // every row cheapest in the same column - maximal greedy pressure
    name: 'x06_max_greedy_trap',
    input: build(grid(N, (i, j) => (j === 0 ? 0 : 500000 + R.int(500000)))),
  });
  T.push({
    // a smooth cost surface, so many near-optimal assignments exist
    name: 'x07_max_smooth',
    input: build(grid(N, (i, j) => Math.abs(i - j) * 1000 + R.int(50))),
  });
  T.push({ name: 'x08_max_binary_costs', input: build(grid(N, () => R.int(2))) });

  return T;
};
