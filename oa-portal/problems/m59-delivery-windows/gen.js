'use strict';
// Test generator - m59 / Q154 Delivery Windows
// Small cases keep the hour span under 200 so brute.cpp runs its matching
// mode, which is the genuinely independent check.
module.exports = function (R) {
  const T = [];
  const build = (iv) => `${iv.length}\n` + iv.map((p) => p[0] + ' ' + p[1]).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_contention', input: build([[1, 2], [1, 1], [2, 2]]) });
  T.push({ name: 'e02_single', input: build([[5, 5]]) });
  T.push({ name: 'e03_plenty_of_room', input: build([[1, 10], [1, 10], [1, 10]]) });
  T.push({ name: 'e04_one_lost', input: build([[1, 1], [1, 1], [2, 2], [3, 3]]) });
  T.push({ name: 'e05_start_order_trap', input: build([[1, 2], [1, 1]]) });
  T.push({ name: 'e06_all_identical', input: build([[3, 3], [3, 3], [3, 3]]) });
  T.push({ name: 'e07_disjoint_windows', input: build([[1, 1], [5, 5], [9, 9]]) });
  T.push({ name: 'e08_nested_windows', input: build([[1, 10], [2, 9], [3, 8], [4, 7]]) });
  T.push({ name: 'e09_staircase', input: build([[1, 3], [2, 4], [3, 5], [4, 6]]) });
  T.push({ name: 'e10_max_coords', input: build([[1000000000, 1000000000], [999999999, 1000000000]]) });
  T.push({ name: 'e11_one_wide_many_narrow', input: build([[1, 100], [1, 1], [2, 2], [3, 3]]) });

  // --- small randoms (matching brute) --------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(12);
    const iv = Array.from({ length: n }, () => { const s = 1 + R.int(15); return [s, s + R.int(6)]; });
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(iv) });
  }
  // very tight hour range: heavy contention, answers well below n
  for (let t = 0; t < 12; t++) {
    const n = 4 + R.int(14);
    const iv = Array.from({ length: n }, () => { const s = 1 + R.int(4); return [s, s + R.int(3)]; });
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_tight', input: build(iv) });
  }
  // single-hour windows only: pure distinctness counting
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(14);
    const iv = Array.from({ length: n }, () => { const s = 1 + R.int(8); return [s, s]; });
    T.push({ name: 'u' + String(t + 1).padStart(2, '0') + '_unit_windows', input: build(iv) });
  }
  // wide windows: nearly everything fits
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(14);
    const iv = Array.from({ length: n }, () => { const s = 1 + R.int(5); return [s, s + 20 + R.int(30)]; });
    T.push({ name: 'w' + String(t + 1).padStart(2, '0') + '_wide', input: build(iv) });
  }

  // --- medium --------------------------------------------------------
  {
    const iv = Array.from({ length: 5000 }, () => { const s = 1 + R.int(3000); return [s, s + R.int(200)]; });
    T.push({ name: 'm01_medium', input: build(iv) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const iv = Array.from({ length: N }, () => { const s = 1 + R.int(1000000000); return [s, s + R.int(1000)]; });
    T.push({ name: 'x01_max_random', input: build(iv) });
  }
  {
    // every parcel wants the same single hour: only one can go
    const iv = Array.from({ length: N }, () => [500000000, 500000000]);
    T.push({ name: 'x02_max_all_one_hour', input: build(iv) });
  }
  {
    // every parcel has the whole timeline: all of them fit
    const iv = Array.from({ length: N }, () => [1, 1000000000]);
    T.push({ name: 'x03_max_all_wide', input: build(iv) });
  }
  {
    // one hour each, all distinct: everything fits with no searching
    const iv = Array.from({ length: N }, (_, i) => [i + 1, i + 1]);
    T.push({ name: 'x04_max_distinct_hours', input: build(iv) });
  }
  {
    // worst case for the free-hour chain: everyone starts at hour 1 with a
    // deadline far away, so the chain grows to 200000 long
    const iv = Array.from({ length: N }, () => [1, 1000000000]);
    T.push({ name: 'x05_max_long_chain', input: build(iv) });
  }
  {
    // nested windows shrinking towards the middle
    const iv = Array.from({ length: N }, (_, i) => [i + 1, 2 * N - i]);
    T.push({ name: 'x06_max_nested', input: build(iv) });
  }
  {
    // half fit exactly, half are hopeless
    const iv = [];
    for (let i = 0; i < N / 2; i++) iv.push([i + 1, i + 1]);
    for (let i = 0; i < N / 2; i++) iv.push([1, 1]);
    T.push({ name: 'x07_max_half_hopeless', input: build(iv) });
  }

  return T;
};
