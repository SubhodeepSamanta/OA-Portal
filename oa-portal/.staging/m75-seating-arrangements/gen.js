'use strict';
// Test generator - m75 / Q174 Seating Arrangements
// Small cases keep n small: brute.cpp builds Pascal's triangle to max n,
// which is O(n^2) in both time and memory.
module.exports = function (R) {
  const T = [];
  const build = (qs) => `${qs.length}\n` + qs.map((q) => q.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([[5, 2], [5, 0], [5, 5], [6, 3]]) });
  T.push({ name: 'e02_r_exceeds_n', input: build([[3, 5], [0, 0]]) });
  T.push({ name: 'e03_ten_choose_five', input: build([[10, 5]]) });
  T.push({ name: 'e04_zero_students', input: build([[0, 0], [0, 1], [0, 5]]) });
  T.push({ name: 'e05_r_zero_always_one', input: build([[1, 0], [50, 0], [200, 0]]) });
  T.push({ name: 'e06_r_equals_n', input: build([[1, 1], [50, 50], [200, 200]]) });
  T.push({ name: 'e07_symmetry', input: build([[20, 3], [20, 17], [20, 10]]) });
  T.push({ name: 'e08_off_by_one', input: build([[7, 6], [7, 7], [7, 8]]) });
  T.push({ name: 'e09_single_query', input: build([[100, 50]]) });
  T.push({ name: 'e10_repeated_query', input: build([[9, 4], [9, 4], [9, 4], [9, 4]]) });

  // --- small randoms (Pascal brute) ---------------------------------
  for (let t = 0; t < 22; t++) {
    const k = 1 + R.int(12);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: k }, () => { const n = R.int(60); return [n, R.int(65)]; })),
    });
  }
  // r deliberately near n, where the off-by-one bites
  for (let t = 0; t < 10; t++) {
    const k = 2 + R.int(10);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_r_near_n',
      input: build(Array.from({ length: k }, () => { const n = 1 + R.int(40); return [n, Math.max(0, n - R.int(3))]; })),
    });
  }
  // many queries against a small n
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'm' + String(t + 1).padStart(2, '0') + '_small_n_many_q',
      input: build(Array.from({ length: 10 + R.int(20) }, () => [R.int(12), R.int(14)])),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'z01_medium',
    input: build(Array.from({ length: 3000 }, () => { const n = R.int(3000); return [n, R.int(3100)]; })),
  });

  // --- maximum size --------------------------------------------------
  const Q = 200000, N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: Q }, () => { const n = R.int(N + 1); return [n, R.int(N + 1)]; })),
  });
  T.push({
    // every query at the largest n and the middle r - the heaviest values
    name: 'x02_max_all_central',
    input: build(Array.from({ length: Q }, () => [N, N / 2])),
  });
  T.push({
    // every query has r > n, so every answer is zero
    name: 'x03_max_all_zero',
    input: build(Array.from({ length: Q }, (_, i) => [i % 1000, 200000])),
  });
  T.push({
    // r = 0 or r = n throughout: every answer is one
    name: 'x04_max_all_one',
    input: build(Array.from({ length: Q }, (_, i) => (i % 2 ? [i % N, 0] : [i % N, i % N]))),
  });
  T.push({
    // sweeping r across a fixed large n
    name: 'x05_max_sweep',
    input: build(Array.from({ length: Q }, (_, i) => [N, i % (N + 1)])),
  });
  T.push({
    // n = 0 everywhere
    name: 'x06_max_zero_n',
    input: build(Array.from({ length: Q }, (_, i) => [0, i % 3])),
  });
  T.push({
    // n sweeping upward with r just below it
    name: 'x07_max_diagonal',
    input: build(Array.from({ length: Q }, (_, i) => { const n = i % (N + 1); return [n, Math.max(0, n - 1)]; })),
  });

  return T;
};
