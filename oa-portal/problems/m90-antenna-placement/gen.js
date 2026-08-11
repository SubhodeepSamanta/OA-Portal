'use strict';
// Test generator - m90 / Q211 Antenna Placement
// Small cases stay well inside the brute's n * span budget so the stress
// comparison really does sweep every candidate position.
module.exports = function (R) {
  const T = [];
  const build = (x) => `${x.length}\n${x.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_three_consecutive', input: build([1, 2, 3]) });
  T.push({ name: 'e02_single_house', input: build([5]) });
  T.push({ name: 'e03_mean_is_half', input: build([0, 3]) });
  T.push({ name: 'e04_skewed', input: build([0, 0, 0, 4]) });
  T.push({ name: 'e05_all_same', input: build([7, 7, 7, 7, 7]) });
  T.push({ name: 'e06_at_zero', input: build([0]) });
  T.push({ name: 'e07_at_max', input: build([1000000]) });
  T.push({ name: 'e08_two_extremes', input: build([0, 1000000]) });
  T.push({ name: 'e09_mean_exact', input: build([2, 4, 6]) });
  T.push({ name: 'e10_ceil_wins', input: build([0, 3, 3]) });
  T.push({ name: 'e11_floor_wins', input: build([0, 0, 3]) });
  T.push({ name: 'e12_all_zero', input: build([0, 0, 0, 0]) });

  // --- small randoms (full sweep in the brute) ----------------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(30);
    const hi = 1 + R.int(200);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => R.int(hi + 1))),
    });
  }
  // clustered with one far outlier - drags the mean off the crowd
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(20);
    const arr = Array.from({ length: n - 1 }, () => R.int(20));
    arr.push(500 + R.int(500));
    T.push({ name: 'o' + String(t + 1).padStart(2, '0') + '_outlier', input: build(arr) });
  }
  // two tight clusters at opposite ends
  for (let t = 0; t < 8; t++) {
    const k = 2 + R.int(10);
    const arr = [];
    for (let i = 0; i < k; i++) arr.push(R.int(10));
    for (let i = 0; i < k; i++) arr.push(990 + R.int(11));
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_two_clusters', input: build(arr) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => R.int(1000001))),
  });
  T.push({
    // every house at the far right - Q hits 2e17, the overflow case
    name: 'x02_max_all_max',
    input: build(Array(N).fill(1000000)),
  });
  T.push({
    // half at each end: the mean lands at 500000 and the cost is enormous
    name: 'x03_max_split_ends',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1000000 : 0))),
  });
  T.push({
    // mean falls exactly between two integers
    name: 'x04_max_half_mean',
    input: build(Array.from({ length: N }, (_, i) => (i < N / 2 ? 0 : 3))),
  });
  T.push({
    name: 'x05_max_all_zero',
    input: build(Array(N).fill(0)),
  });
  T.push({
    // heavily skewed: nearly everything at 0, a few at the far end
    name: 'x06_max_skewed',
    input: build(Array.from({ length: N }, (_, i) => (i < 10 ? 1000000 : 0))),
  });
  T.push({
    name: 'x07_max_narrow_band',
    input: build(Array.from({ length: N }, () => 999990 + R.int(11))),
  });
  T.push({
    name: 'x08_single_max_value',
    input: build([1000000]),
  });

  return T;
};
