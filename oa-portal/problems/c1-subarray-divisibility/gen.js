'use strict';
// Test generator - c1 / Q10 Subarray Divisibility (CSES 1662)
// Small cases stay under a few hundred elements so the O(n^2) brute is quick.
// Negatives are everywhere on purpose: the sign of % is the trap in this one.
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([3, 1, 2, 7, 4]) });
  T.push({ name: 'e02_single_zero', input: build([0]) });
  T.push({ name: 'e03_single_nonzero', input: build([7]) });
  T.push({ name: 'e04_single_negative', input: build([-1000000000]) });
  T.push({ name: 'e05_all_zero', input: build([0, 0, 0, 0, 0]) });
  T.push({ name: 'e06_all_negative', input: build([-1, -2, -3, -4, -5]) });
  T.push({ name: 'e07_alternating_sign', input: build([5, -5, 5, -5, 5, -5]) });
  T.push({ name: 'e08_all_equal_n', input: build([4, 4, 4, 4]) });
  T.push({ name: 'e09_extremes', input: build([1000000000, -1000000000, 1000000000]) });
  T.push({ name: 'e10_two_elements', input: build([-3, 3]) });
  T.push({ name: 'e11_prefix_zero_only', input: build([1, 1, 1, 1, 1]) });
  T.push({ name: 'e12_negative_residues', input: build([-7, -7, -7, -7, -7]) });

  // --- small randoms -------------------------------------------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(120);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => R.int(2000000001) - 1000000000)),
    });
  }
  // narrow value range - lots of collisions, so the count gets large
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(150);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_narrow_values',
      input: build(Array.from({ length: n }, () => R.int(11) - 5)),
    });
  }
  // multiples of n only, so every prefix shares residue 0
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(100);
    T.push({
      name: 'm' + String(t + 1).padStart(2, '0') + '_all_multiples',
      input: build(Array.from({ length: n }, () => n * (R.int(21) - 10))),
    });
  }
  // negatives only - the % sign trap, at every size
  for (let t = 0; t < 8; t++) {
    const n = 1 + R.int(100);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_negatives_only',
      input: build(Array.from({ length: n }, () => -(1 + R.int(1000000000)))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => R.int(2000000001) - 1000000000)),
  });
  T.push({
    // every prefix is a multiple of n: the answer is the maximum possible,
    // n(n+1)/2 = 20000100000, which overflows a 32-bit counter
    name: 'x02_max_all_multiples',
    input: build(Array(N).fill(N)),
  });
  T.push({
    name: 'x03_max_all_zero',
    input: build(Array(N).fill(0)),
  });
  T.push({
    // prefix sums run to -2e14
    name: 'x04_max_all_min',
    input: build(Array(N).fill(-1000000000)),
  });
  T.push({
    name: 'x05_max_all_max',
    input: build(Array(N).fill(1000000000)),
  });
  T.push({
    name: 'x06_max_negatives_only',
    input: build(Array.from({ length: N }, () => -(1 + R.int(1000000000)))),
  });
  T.push({
    // narrow band around zero at full size - many residue collisions
    name: 'x07_max_narrow',
    input: build(Array.from({ length: N }, () => R.int(7) - 3)),
  });

  return T;
};
