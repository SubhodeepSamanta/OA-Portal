'use strict';
// Test generator - a2 / Q90 Frog 2 (AtCoder EDPC B)
// Small cases keep N <= 18 for the exhaustive brute. K is pushed to both
// extremes on purpose: K = 1 (only one route exists) and K >= N (the frog can
// jump straight to the end), which are the two places the loop bounds break.
module.exports = function (R) {
  const T = [];
  const build = (k, h) => `${h.length} ${k}\n${h.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build(3, [10, 30, 40, 50, 20]) });
  T.push({ name: 'e02_edpc_sample2', input: build(1, [10, 20, 10]) });
  T.push({ name: 'e03_edpc_sample3', input: build(100, [10, 10]) });
  T.push({ name: 'e04_edpc_sample4', input: build(4, [40, 10, 20, 70, 80, 10, 20, 70, 80, 60]) });
  T.push({ name: 'e05_k_one_forced', input: build(1, [1, 10000, 1, 10000]) });
  T.push({ name: 'e06_k_covers_all', input: build(100, [1, 9999, 9998, 2]) });
  T.push({ name: 'e07_k_equals_n', input: build(5, [5, 4, 3, 2, 1]) });
  T.push({ name: 'e08_two_stones', input: build(1, [1, 10000]) });
  T.push({ name: 'e09_all_equal', input: build(3, [7, 7, 7, 7, 7]) });
  T.push({ name: 'e10_greedy_trap', input: build(2, [10, 9, 100, 8, 100, 7]) });

  const heights = (n, hi) => Array.from({ length: n }, () => 1 + R.int(hi));

  // --- small randoms (brute enumerates) ------------------------------
  for (let i = 0; i < 22; i++) {
    const n = 2 + R.int(17);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(Math.min(100, n)), heights(n, 10000)),
    });
  }
  // K deliberately larger than N
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(12);
    T.push({
      name: 'k' + String(i + 1).padStart(2, '0') + '_k_over_n',
      input: build(n + 1 + R.int(50), heights(n, 10000)),
    });
  }
  // narrow heights - lots of ties
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(16);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_narrow',
      input: build(1 + R.int(4), heights(n, 4)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({ name: 'x01_max_random_k100', input: build(100, heights(N, 10000)) });
  T.push({ name: 'x02_max_k_one', input: build(1, heights(N, 10000)) });
  T.push({ name: 'x03_max_all_equal', input: build(100, Array(N).fill(5000)) });
  T.push({
    name: 'x04_max_alternating',
    input: build(100, Array.from({ length: N }, (_, i) => (i % 2 === 0 ? 1 : 10000))),
  });
  T.push({ name: 'x05_max_increasing_k100', input: build(100, Array.from({ length: N }, (_, i) => 1 + (i % 10000))) });
  T.push({ name: 'x06_max_k_two', input: build(2, heights(N, 10000)) });

  return T;
};
