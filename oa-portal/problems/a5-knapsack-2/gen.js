'use strict';
// Test generator - a5 / Q93 Knapsack 2 (AtCoder EDPC E)
// Small cases keep N <= 18 for the subset brute. Huge W appears throughout:
// that is precisely what makes the weight-indexed state impossible.
module.exports = function (R) {
  const T = [];
  const BIGW = 1000000000;
  const build = (W, items) => `${items.length} ${W}\n` + items.map(([w, v]) => `${w} ${v}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build(8, [[3, 30], [4, 50], [5, 60]]) });
  T.push({ name: 'e02_edpc_sample2', input: build(BIGW, [[BIGW, 10]]) });
  T.push({
    name: 'e03_edpc_sample3',
    input: build(15, [[6, 5], [5, 6], [6, 4], [6, 6], [3, 5], [7, 2]]),
  });
  T.push({ name: 'e04_single_fits_exactly', input: build(5, [[5, 1000]]) });
  T.push({ name: 'e05_capacity_one', input: build(1, [[1, 1000]]) });
  T.push({ name: 'e06_all_heavy_one_fits', input: build(BIGW, [[BIGW, 1], [BIGW, 1000]]) });
  T.push({ name: 'e07_repeat_trap', input: build(BIGW, [[1, 1000], [BIGW, 1]]) });
  T.push({ name: 'e08_all_same', input: build(12, [[3, 5], [3, 5], [3, 5], [3, 5]]) });
  T.push({ name: 'e09_max_values', input: build(BIGW, Array(4).fill([250000000, 1000])) });
  T.push({ name: 'e10_nothing_fits_but_one', input: build(3, [[10, 1000], [3, 1]]) });

  // --- small randoms (subset enumeration) ----------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(18);
    const W = 1 + R.int(300);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(W, Array.from({ length: n }, () => [1 + R.int(W), 1 + R.int(1000)])),
    });
  }
  // enormous capacity - everything fits, the answer is the total value
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(15);
    T.push({
      name: 'w' + String(i + 1).padStart(2, '0') + '_huge_capacity',
      input: build(BIGW, Array.from({ length: n }, () => [1 + R.int(1000000), 1 + R.int(1000)])),
    });
  }
  // weights near the capacity - at most one or two items fit
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(14);
    T.push({
      name: 'h' + String(i + 1).padStart(2, '0') + '_heavy',
      input: build(BIGW, Array.from({ length: n }, () => [500000000 + R.int(500000000), 1 + R.int(1000)])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100;
  T.push({
    name: 'x01_max_random',
    input: build(BIGW, Array.from({ length: N }, () => [1 + R.int(BIGW), 1 + R.int(1000)])),
  });
  T.push({
    // every item at maximum value and weight 1: the answer is 100000
    name: 'x02_max_all_fit',
    input: build(BIGW, Array(N).fill([1, 1000])),
  });
  T.push({
    // every item weighs the whole capacity: only one can be taken
    name: 'x03_max_only_one_fits',
    input: build(BIGW, Array(N).fill([BIGW, 1000])),
  });
  T.push({
    name: 'x04_max_tight',
    input: build(1000, Array.from({ length: N }, () => [1 + R.int(1000), 1 + R.int(1000)])),
  });
  T.push({
    name: 'x05_max_all_identical',
    input: build(BIGW, Array(N).fill([12345678, 997])),
  });
  T.push({
    // value 1 each, so the value axis stays small while weights are enormous
    name: 'x06_max_low_values',
    input: build(BIGW, Array.from({ length: N }, () => [1 + R.int(BIGW), 1])),
  });

  return T;
};
