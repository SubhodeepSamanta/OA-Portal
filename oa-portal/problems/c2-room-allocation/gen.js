'use strict';
// Test generator - c2 / Q16 Room Allocation (CSES 1164)
// Small cases stay under ~150 bookings so the O(n*k) brute is quick; the
// full-size cases are far too big for the stress loop and only exercise the
// reference's time limit.
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length}\n` + rows.map(([a, b]) => `${a} ${b}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([[1, 2], [2, 4], [4, 4]]) });
  T.push({ name: 'e02_single', input: build([[1, 1]]) });
  T.push({ name: 'e03_single_max', input: build([[1000000000, 1000000000]]) });
  T.push({ name: 'e04_all_identical', input: build([[5, 5], [5, 5], [5, 5], [5, 5]]) });
  T.push({ name: 'e05_chain_shareable', input: build([[1, 1], [2, 2], [3, 3], [4, 4]]) });
  T.push({ name: 'e06_touching', input: build([[1, 2], [2, 3], [3, 4], [4, 5]]) });
  T.push({ name: 'e07_nested', input: build([[1, 100], [2, 3], [4, 5], [10, 90]]) });
  T.push({ name: 'e08_full_span_plus_point', input: build([[1, 1000000000], [1000000000, 1000000000]]) });
  T.push({ name: 'e09_same_point_max', input: build([[1000000000, 1000000000], [1000000000, 1000000000], [1000000000, 1000000000]]) });
  T.push({ name: 'e10_reverse_order', input: build([[9, 10], [7, 8], [5, 6], [3, 4], [1, 2]]) });
  T.push({ name: 'e11_gap_of_one', input: build([[1, 5], [6, 10], [11, 15]]) });
  T.push({ name: 'e12_all_overlap_one_day', input: build([[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]]) });
  T.push({ name: 'e13_same_arrival_diff_departure', input: build([[3, 3], [3, 9], [3, 5]]) });

  // --- small randoms -------------------------------------------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(120);
    const rows = [];
    for (let i = 0; i < n; i++) {
      const a = 1 + R.int(60);
      rows.push([a, a + R.int(15)]);
    }
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(rows) });
  }
  // tight day range - heavy overlap, k grows towards n
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(100);
    const rows = [];
    for (let i = 0; i < n; i++) {
      const a = 1 + R.int(6);
      rows.push([a, a + R.int(6)]);
    }
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dense', input: build(rows) });
  }
  // point bookings only - the strictness of "departs before arrives" decides everything
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(100);
    const rows = [];
    for (let i = 0; i < n; i++) { const a = 1 + R.int(20); rows.push([a, a]); }
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_points', input: build(rows) });
  }
  // wide coordinates, mostly disjoint
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(80);
    const rows = [];
    for (let i = 0; i < n; i++) {
      const a = 1 + R.int(1000000000);
      rows.push([a, Math.min(1000000000, a + R.int(1000))]);
    }
    T.push({ name: 'w' + String(t + 1).padStart(2, '0') + '_wide', input: build(rows) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => {
      const a = 1 + R.int(1000000000);
      return [a, Math.min(1000000000, a + R.int(100000))];
    })),
  });
  T.push({
    // every booking spans the whole calendar: k = n, the heap holds everything
    name: 'x02_max_all_overlap',
    input: build(Array.from({ length: N }, () => [1, 1000000000])),
  });
  T.push({
    // strictly separated by one day: k = 1, one room reused n times
    name: 'x03_max_chain',
    input: build(Array.from({ length: N }, (_, i) => [2 * i + 1, 2 * i + 1])),
  });
  T.push({
    // touching end to end: neighbours clash, every other one shares - k = 2
    name: 'x04_max_touching',
    input: build(Array.from({ length: N }, (_, i) => [i + 1, i + 2])),
  });
  T.push({
    // sliding window of width 1000 - k settles around 1001
    name: 'x05_max_window',
    input: build(Array.from({ length: N }, (_, i) => [i + 1, i + 1001])),
  });

  return T;
};
