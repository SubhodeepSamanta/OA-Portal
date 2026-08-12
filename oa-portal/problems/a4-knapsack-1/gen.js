'use strict';
// Test generator - a4 / Q92 Knapsack 1 (AtCoder EDPC D)
// Small cases keep N <= 18 so the brute enumerates subsets. Cheap items with
// a generous capacity appear often: that is where an upward inner loop
// (unbounded knapsack) inflates the answer.
module.exports = function (R) {
  const T = [];
  const build = (W, items) => `${items.length} ${W}\n` + items.map(([w, v]) => `${w} ${v}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build(8, [[3, 30], [4, 50], [5, 60]]) });
  T.push({ name: 'e02_edpc_sample2', input: build(5, Array(5).fill([1, 1000000000])) });
  T.push({
    name: 'e03_edpc_sample3',
    input: build(15, [[6, 5], [5, 6], [6, 4], [6, 6], [3, 5], [7, 2]]),
  });
  T.push({ name: 'e04_single_item_fits', input: build(5, [[5, 1000000000]]) });
  T.push({ name: 'e05_capacity_one', input: build(1, [[1, 7]]) });
  // one cheap high-value item: an upward loop would take it many times
  T.push({ name: 'e06_repeat_trap', input: build(100, [[1, 1000000000], [50, 1]]) });
  T.push({ name: 'e07_all_same', input: build(10, [[3, 5], [3, 5], [3, 5], [3, 5]]) });
  T.push({ name: 'e08_exact_fit', input: build(8, [[3, 30], [5, 60]]) });
  T.push({ name: 'e09_max_values', input: build(100, Array(4).fill([25, 1000000000])) });

  // --- small randoms (subset enumeration) ----------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(18);
    const W = 1 + R.int(200);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(W, Array.from({ length: n }, () => [1 + R.int(W), 1 + R.int(1000000000)])),
    });
  }
  // cheap items, generous capacity - the unbounded-knapsack trap
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(15);
    const W = 500 + R.int(500);
    T.push({
      name: 't' + String(i + 1).padStart(2, '0') + '_cheap_items',
      input: build(W, Array.from({ length: n }, () => [1 + R.int(5), 1 + R.int(1000000000)])),
    });
  }
  // heavy items, tight capacity - most subsets are unaffordable
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(15);
    const W = 20 + R.int(40);
    T.push({
      name: 'h' + String(i + 1).padStart(2, '0') + '_heavy',
      input: build(W, Array.from({ length: n }, () => [1 + R.int(W), 1 + R.int(1000)])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100, W = 100000;
  const rnd = () => Array.from({ length: N }, () => [1 + R.int(W), 1 + R.int(1000000000)]);
  T.push({ name: 'x01_max_random', input: build(W, rnd()) });
  T.push({
    // 100 items each worth 1e9 and weighing 1: the total is 1e11, far past
    // what a 32-bit accumulator holds
    name: 'x02_max_overflow',
    input: build(W, Array(N).fill([1, 1000000000])),
  });
  T.push({ name: 'x03_max_all_heavy', input: build(W, Array(N).fill([W, 1000000000])) });
  T.push({ name: 'x04_max_tight_capacity', input: build(100, Array.from({ length: N }, () => [1 + R.int(100), 1 + R.int(1000000000)])) });
  T.push({ name: 'x05_max_all_identical', input: build(W, Array(N).fill([997, 1000000000])) });
  T.push({
    // everything fits: the answer is every item
    name: 'x06_max_everything_fits',
    input: build(W, Array.from({ length: N }, () => [1 + R.int(1000), 1 + R.int(1000000000)])),
  });

  return T;
};
