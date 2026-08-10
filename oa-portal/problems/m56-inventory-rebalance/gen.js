'use strict';
// Test generator - m56 / Q151 Inventory Rebalance
// Small cases keep the TOTAL stock tiny: brute.cpp runs a DP whose width is
// total - n*m, not the array length.
module.exports = function (R) {
  const T = [];
  const build = (m, s) => `${s.length} ${m}\n${s.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_isotonic_matters', input: build(2, [5, 1, 10]) });
  T.push({ name: 'e02_exact_total', input: build(1, [3, 0, 0]) });
  T.push({ name: 'e03_impossible', input: build(5, [1, 1]) });
  T.push({ name: 'e04_all_at_front', input: build(1, [4, 0, 0, 0]) });
  T.push({ name: 'e05_all_at_back', input: build(1, [0, 0, 0, 4]) });
  T.push({ name: 'e06_zero_requirement', input: build(0, [5, 0, 9]) });
  T.push({ name: 'e07_already_satisfied', input: build(2, [3, 4, 5]) });
  T.push({ name: 'e08_single_warehouse_ok', input: build(3, [7]) });
  T.push({ name: 'e09_single_warehouse_short', input: build(9, [7]) });
  T.push({ name: 'e10_exactly_enough_everywhere', input: build(2, [2, 2, 2]) });
  T.push({ name: 'e11_surplus_stays_put', input: build(1, [1, 1, 100]) });
  T.push({ name: 'e12_zero_everywhere', input: build(0, [0, 0, 0]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(7);
    const m = R.int(4);
    const s = Array.from({ length: n }, () => R.int(9));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(m, s) });
  }
  // deliberately infeasible
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(6);
    const s = Array.from({ length: n }, () => R.int(3));
    T.push({ name: 'i' + String(t + 1).padStart(2, '0') + '_infeasible', input: build(20 + R.int(20), s) });
  }
  // stock piled at one end, so long journeys are forced
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(5);
    const m = 1 + R.int(2);
    const s = Array(n).fill(0);
    s[R.next() < 0.5 ? 0 : n - 1] = n * m + R.int(5);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_piled', input: build(m, s) });
  }
  // plenty of slack, so the box rarely binds and the isotonic step decides
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(5);
    const m = 1;
    const s = Array.from({ length: n }, () => R.int(8));
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_slack', input: build(m, s) });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(500, Array.from({ length: 3000 }, () => R.int(1500))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(500000000, Array.from({ length: N }, () => R.int(1000000000))),
  });
  T.push({
    // worst arrangement: first half full, second half empty, tight requirement
    name: 'x02_max_overflow_bait',
    input: build(500000000, Array.from({ length: N }, (_, i) => (i < N / 2 ? 1000000000 : 0))),
  });
  T.push({
    // every unit at the very first warehouse
    name: 'x03_max_all_at_front',
    input: build(1000, Array.from({ length: N }, (_, i) => (i === 0 ? 1000000000 : 0))),
  });
  T.push({
    // requirement of zero: nothing needs to move at all
    name: 'x04_max_zero_requirement',
    input: build(0, Array.from({ length: N }, () => R.int(1000000000))),
  });
  T.push({
    // exactly enough stock everywhere already
    name: 'x05_max_already_satisfied',
    input: build(1000, Array(N).fill(1000)),
  });
  T.push({
    // infeasible at full size
    name: 'x06_max_infeasible',
    input: build(1000000000, Array.from({ length: N }, () => R.int(1000))),
  });
  T.push({
    // alternating empty and full, so every boundary carries traffic
    name: 'x07_max_alternating',
    input: build(400000000, Array.from({ length: N }, (_, i) => (i % 2 ? 0 : 1000000000))),
  });
  T.push({
    // huge slack: the box never binds and the isotonic step does all the work
    name: 'x08_max_slack',
    input: build(1, Array.from({ length: N }, () => R.int(1000000000))),
  });

  return T;
};
