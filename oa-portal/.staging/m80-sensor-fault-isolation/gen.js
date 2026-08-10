'use strict';
// Test generator - m80 / Q183 Sensor Fault Isolation
// Every case has exactly two singletons and all other IDs doubled.
module.exports = function (R) {
  const T = [];
  const build = (arr) => `${arr.length}\n${arr.join(' ')}\n`;

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) { const j = R.int(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  // pairs distinct IDs plus two distinct singletons, all distinct overall
  const make = (pairs, maxId) => {
    const used = new Set();
    const pick = () => { let v; do { v = 1 + R.int(maxId); } while (used.has(v)); used.add(v); return v; };
    const out = [];
    for (let i = 0; i < pairs; i++) { const v = pick(); out.push(v, v); }
    out.push(pick(), pick());
    return shuffle(out);
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([1, 2, 1, 3, 2, 5]) });
  T.push({ name: 'e02_only_two', input: build([7, 9]) });
  T.push({ name: 'e03_order_matters', input: build([1000000000, 5, 5, 1]) });
  T.push({ name: 'e04_singletons_adjacent_values', input: build([4, 4, 1, 2]) });
  T.push({ name: 'e05_singletons_at_ends', input: build([3, 8, 8, 9, 9, 7]) });
  T.push({ name: 'e06_max_ids', input: build([1000000000, 999999999]) });
  T.push({ name: 'e07_differ_in_low_bit', input: build([2, 3]) });
  T.push({ name: 'e08_differ_in_high_bit', input: build([1, 536870912]) });
  T.push({ name: 'e09_many_pairs_one_singleton_pair', input: build([5, 5, 6, 6, 7, 7, 1, 2]) });
  T.push({ name: 'e10_singletons_are_one_and_two', input: build([9, 9, 1, 2]) });
  T.push({ name: 'e11_powers_of_two', input: build([1, 1, 2, 2, 4, 8]) });

  // --- small randoms (map-counting brute) ---------------------------
  for (let t = 0; t < 24; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(make(R.int(20), 60)),
    });
  }
  // IDs drawn from a narrow band, so the distinguishing bit is low
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'n' + String(t + 1).padStart(2, '0') + '_narrow_ids',
      input: build(make(2 + R.int(12), 20)),
    });
  }
  // IDs near the maximum, so the distinguishing bit is high
  for (let t = 0; t < 10; t++) {
    const used = new Set();
    const pick = () => { let v; do { v = 999999000 + R.int(1000); } while (used.has(v)); used.add(v); return v; };
    const out = [];
    for (let i = 0; i < 2 + R.int(10); i++) { const v = pick(); out.push(v, v); }
    out.push(pick(), pick());
    T.push({ name: 'h' + String(t + 1).padStart(2, '0') + '_high_ids', input: build(shuffle(out)) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(make(4000, 1000000)) });

  // --- maximum size --------------------------------------------------
  const PAIRS = 99999;
  T.push({ name: 'x01_max_random', input: build(make(PAIRS, 1000000000)) });
  {
    // singletons are 1 and 2, differing only in the lowest bits
    const out = [];
    for (let i = 3; i < 3 + PAIRS; i++) out.push(i, i);
    out.push(1, 2);
    T.push({ name: 'x02_max_low_bit', input: build(shuffle(out)) });
  }
  {
    // singletons differ only in the highest bit
    const out = [];
    for (let i = 2; i < 2 + PAIRS; i++) out.push(i, i);
    out.push(1, 536870913);
    T.push({ name: 'x03_max_high_bit', input: build(shuffle(out)) });
  }
  {
    // singletons at the very top of the ID range
    const out = [];
    for (let i = 1; i <= PAIRS; i++) out.push(i, i);
    out.push(999999999, 1000000000);
    T.push({ name: 'x04_max_top_ids', input: build(shuffle(out)) });
  }
  {
    // already sorted input, singletons buried in the middle
    const out = [];
    for (let i = 1; i <= PAIRS; i++) out.push(i, i);
    out.push(500000123, 500000456);
    out.sort((a, b) => a - b);
    T.push({ name: 'x05_max_sorted', input: build(out) });
  }
  {
    // paired IDs spread across the whole bit range, all distinct, with the
    // two singletons differing only in bit 3
    const out = [];
    for (let i = 0; i < PAIRS; i++) { const v = 1000 + i * 9973 % 999000000; out.push(v, v); }
    out.push(7, 15);
    T.push({ name: 'x06_max_bit_patterns', input: build(shuffle(out)) });
  }

  return T;
};
