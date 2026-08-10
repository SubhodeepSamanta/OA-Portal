'use strict';
// Test generator - m37 / Q110 Terrain Crossing
module.exports = function (R) {
  const T = [];
  const build = (g) => `${g.length} ${g[0].length}\n` + g.map((r) => r.join(' ')).join('\n') + '\n';
  const grid = (r, c, f) => Array.from({ length: r }, (_, i) => Array.from({ length: c }, (_, j) => f(i, j)));

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) });
  T.push({ name: 'e02_sample2_total_is_a_trap', input: build([[1, 2, 3], [100, 4, 5]]) });
  T.push({ name: 'e03_single_cell', input: build([[5]]) });
  T.push({ name: 'e04_single_row', input: build([[1, 10, 11, 12]]) });
  T.push({ name: 'e05_single_column', input: build([[1], [10], [11], [12]]) });
  T.push({ name: 'e06_flat', input: build(grid(5, 5, () => 42)) });
  T.push({ name: 'e07_two_by_two', input: build([[0, 1000000000], [1000000000, 0]]) });
  T.push({ name: 'e08_extremes', input: build([[0, 1000000000], [1, 1000000000]]) });
  T.push({ name: 'e09_cheap_row_expensive_col', input: build(grid(4, 4, (i, j) => j + i * 1000)) });
  T.push({ name: 'e10_cheap_col_expensive_row', input: build(grid(4, 4, (i, j) => i + j * 1000)) });
  T.push({ name: 'e11_wall_of_cliffs', input: build([[0, 0, 0], [500, 500, 0], [0, 0, 0]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 20; t++) {
    const r = 1 + R.int(6), c = 1 + R.int(6);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(grid(r, c, () => R.int(40))),
    });
  }
  // heavy ties, so many routes share the optimum
  for (let t = 0; t < 10; t++) {
    const r = 2 + R.int(5), c = 2 + R.int(5);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_few_levels',
      input: build(grid(r, c, () => R.int(3))),
    });
  }
  // occasional cliffs among flat ground
  for (let t = 0; t < 10; t++) {
    const r = 2 + R.int(6), c = 2 + R.int(6);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_cliffs',
      input: build(grid(r, c, () => (R.next() < 0.2 ? 500 + R.int(500) : R.int(5)))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(grid(120, 120, () => R.int(1000000))) });
  T.push({ name: 'm02_medium_smooth', input: build(grid(150, 150, (i, j) => (i + j) * 7)) });

  // --- maximum size --------------------------------------------------
  const N = 500;
  T.push({ name: 'x01_max_random', input: build(grid(N, N, () => R.int(1000000000))) });
  T.push({ name: 'x02_max_flat', input: build(grid(N, N, () => 1000000000)) });
  T.push({ name: 'x03_max_smooth_diagonal', input: build(grid(N, N, (i, j) => (i + j) * 1000)) });
  T.push({
    // rows are cheap to walk, columns are cliffs: forces a long right-first run
    name: 'x04_max_row_cheap',
    input: build(grid(N, N, (i, j) => j + i * 1000000)),
  });
  T.push({
    name: 'x05_max_col_cheap',
    input: build(grid(N, N, (i, j) => i + j * 1000000)),
  });
  T.push({
    // one narrow gentle corridor through otherwise wild terrain
    name: 'x06_max_narrow_corridor',
    input: build(grid(N, N, (i, j) => (i === j || i === j + 1 ? 0 : 1000000000))),
  });
  T.push({
    // alternating extremes: every single step is a cliff
    name: 'x07_max_checkerboard',
    input: build(grid(N, N, (i, j) => ((i + j) % 2 ? 0 : 1000000000))),
  });
  T.push({ name: 'x08_max_single_row', input: build(grid(1, N, () => R.int(1000000000))) });
  T.push({ name: 'x09_max_single_column', input: build(grid(N, 1, () => R.int(1000000000))) });

  return T;
};
