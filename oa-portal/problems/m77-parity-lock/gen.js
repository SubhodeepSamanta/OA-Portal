'use strict';
// Test generator - m77 / Q176 Parity Lock
// Small cases keep values small so the brute's target search stays bounded.
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_three_works', input: build([1, 2, 3]) });
  T.push({ name: 'e02_two_unequal', input: build([1, 2]) });
  T.push({ name: 'e03_even_odd_total', input: build([1, 1, 1, 2]) });
  T.push({ name: 'e04_single', input: build([7]) });
  T.push({ name: 'e05_two_equal', input: build([5, 5]) });
  T.push({ name: 'e06_even_even_total', input: build([1, 1, 1, 1]) });
  T.push({ name: 'e07_all_equal_odd_n', input: build([4, 4, 4]) });
  T.push({ name: 'e08_all_zero', input: build([0, 0, 0, 0]) });
  T.push({ name: 'e09_single_zero', input: build([0]) });
  T.push({ name: 'e10_two_zeros', input: build([0, 0]) });
  T.push({ name: 'e11_odd_n_odd_total', input: build([0, 0, 1]) });
  T.push({ name: 'e12_even_n_big_gap', input: build([0, 0, 0, 10]) });
  T.push({ name: 'e13_max_values', input: build([1000000000, 1000000000, 999999999]) });

  // --- small randoms (target-search brute) ---------------------------
  for (let t = 0; t < 24; t++) {
    const n = 1 + R.int(8);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => R.int(12))),
    });
  }
  // exactly two counters, where the frozen difference decides everything
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_pairs',
      input: build([R.int(10), R.int(10)]),
    });
  }
  // even n, so the total's parity decides
  for (let t = 0; t < 12; t++) {
    const n = 2 * (2 + R.int(4));
    T.push({
      name: 'v' + String(t + 1).padStart(2, '0') + '_even_n',
      input: build(Array.from({ length: n }, () => R.int(9))),
    });
  }
  // odd n, which should always succeed
  for (let t = 0; t < 10; t++) {
    const n = 2 * (1 + R.int(4)) + 1;
    T.push({
      name: 'o' + String(t + 1).padStart(2, '0') + '_odd_n',
      input: build(Array.from({ length: n }, () => R.int(9))),
    });
  }
  // one counter far above the rest, where the "half the total" bound matters
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(5);
    const a = Array.from({ length: n - 1 }, () => R.int(3));
    a.push(20 + R.int(20));
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_one_tall', input: build(a) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(Array.from({ length: 4000 }, () => R.int(1000000))) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => R.int(1000000001))) });
  T.push({ name: 'x02_max_all_equal', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_zero', input: build(Array(N).fill(0)) });
  T.push({
    // even count with an odd total: the parity obstruction at full size
    name: 'x04_max_even_odd_total',
    input: build(Array.from({ length: N }, (_, i) => (i === 0 ? 1 : 0))),
  });
  T.push({
    // odd count with an odd total: always possible
    name: 'x05_max_odd_n',
    input: build(Array.from({ length: N - 1 }, (_, i) => (i === 0 ? 1 : 0))),
  });
  T.push({
    // maximum values everywhere, even count - the 64-bit total case
    name: 'x06_max_overflow_bait',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1000000000 : 999999999))),
  });
  T.push({
    // one counter enormously above the rest
    name: 'x07_max_one_tall',
    input: build(Array.from({ length: N }, (_, i) => (i === 0 ? 1000000000 : 0))),
  });

  return T;
};
