'use strict';
// Test generator - c25 / Q171 Exponentiation (CSES 1095)
// Small exponents let the brute multiply one factor at a time; a handful of
// tiny cases carry b = 1e9 deliberately, which is exactly the shape that used
// to hang builds before the brute grew its bounded fallback.
module.exports = function (R) {
  const T = [];
  const MAXV = 1000000000;
  const build = (pairs) => `${pairs.length}\n` + pairs.map(([a, b]) => `${a} ${b}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([[3, 4], [2, 8], [123, 123]]) });
  T.push({ name: 'e02_zero_zero', input: build([[0, 0]]) });          // defined as 1
  T.push({ name: 'e03_zero_base', input: build([[0, 1], [0, 5], [0, MAXV]]) });
  T.push({ name: 'e04_zero_exponent', input: build([[1, 0], [7, 0], [MAXV, 0]]) });
  T.push({ name: 'e05_base_one', input: build([[1, MAXV], [1, 0], [1, 1]]) });
  T.push({ name: 'e06_max_both', input: build([[MAXV, MAXV]]) });
  T.push({ name: 'e07_mod_boundary', input: build([[1000000007, 2], [1000000006, 2], [1000000008, 3]]) });
  T.push({ name: 'e08_small_powers', input: build([[2, 1], [2, 2], [2, 3], [2, 31], [2, 32], [2, 63]]) });
  T.push({ name: 'e09_exponent_one', input: build([[MAXV, 1], [12345, 1]]) });

  // --- small randoms (brute multiplies one at a time) ----------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => [R.int(MAXV + 1), R.int(2000)])),
    });
  }
  // huge exponents on tiny inputs - the bounded fallback in the brute
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(20);
    T.push({
      name: 'h' + String(i + 1).padStart(2, '0') + '_huge_exponent',
      input: build(Array.from({ length: n }, () => [R.int(MAXV + 1), R.int(MAXV + 1)])),
    });
  }
  // bases near the modulus, where a 32-bit product wraps immediately
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(20);
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_big_bases',
      input: build(Array.from({ length: n }, () => [999000000 + R.int(1000000), R.int(1000)])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => [R.int(MAXV + 1), R.int(MAXV + 1)])),
  });
  T.push({
    // every query at the maximum: 30 squarings each, all products near 1e18
    name: 'x02_max_all_max',
    input: build(Array.from({ length: N }, () => [MAXV, MAXV])),
  });
  T.push({
    name: 'x03_max_zero_exponents',
    input: build(Array.from({ length: N }, (_, i) => [i % (MAXV + 1), 0])),
  });
  T.push({
    name: 'x04_max_zero_bases',
    input: build(Array.from({ length: N }, (_, i) => [0, i])),
  });
  T.push({
    name: 'x05_max_powers_of_two',
    input: build(Array.from({ length: N }, (_, i) => [2, i % (MAXV + 1)])),
  });

  return T;
};
