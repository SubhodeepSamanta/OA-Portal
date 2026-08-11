'use strict';
// Test generator - m87 / Q208 Population Model
// Small cases keep T small: the brute iterates every term.
module.exports = function (R) {
  const T = [];
  const build = (p0, p1, a, b, t) => `${p0} ${p1} ${a} ${b} ${t}\n`;
  const MOD = 1000000007;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_fibonacci', input: build(0, 1, 1, 1, 10) });
  T.push({ name: 'e02_copy_forward', input: build(1, 1, 1, 0, 5) });
  T.push({ name: 'e03_t_zero', input: build(0, 1, 1, 1, 0) });
  T.push({ name: 'e04_worked_example', input: build(2, 3, 2, 3, 4) });
  T.push({ name: 'e05_t_one', input: build(7, 9, 5, 5, 1) });
  T.push({ name: 'e06_all_zero', input: build(0, 0, 0, 0, '1000000000000000000') });
  T.push({ name: 'e07_zero_coefficients', input: build(5, 7, 0, 0, 2) });
  T.push({ name: 'e08_max_values', input: build(MOD - 1, MOD - 1, MOD - 1, MOD - 1, '1000000000000000000') });
  T.push({ name: 'e09_fib_huge_t', input: build(0, 1, 1, 1, '1000000000000000000') });
  T.push({ name: 'e10_negative_like_b', input: build(1, 1, 1, MOD - 1, 20) });
  T.push({ name: 'e11_geometric', input: build(1, 2, 2, 0, 30) });
  T.push({ name: 'e12_t_two', input: build(3, 4, 5, 6, 2) });

  // --- small randoms (iterating brute) ------------------------------
  for (let t = 0; t < 24; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(R.int(MOD), R.int(MOD), R.int(MOD), R.int(MOD), R.int(3000)),
    });
  }
  // tiny coefficients, so the sequence stays small and readable
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_small_coeffs',
      input: build(R.int(5), R.int(5), R.int(4), R.int(4), R.int(2000)),
    });
  }
  // T right at the boundaries
  for (let t = 0; t < 8; t++) {
    T.push({
      name: 'b' + String(t + 1).padStart(2, '0') + '_boundary_t',
      input: build(R.int(100), R.int(100), R.int(100), R.int(100), R.int(4)),
    });
  }

  // --- maximum size --------------------------------------------------
  const BIG = '1000000000000000000';
  T.push({ name: 'x01_max_random', input: build(123456789, 987654321, 555555555, 444444444, BIG) });
  T.push({ name: 'x02_max_fib', input: build(0, 1, 1, 1, BIG) });
  T.push({ name: 'x03_max_all_max', input: build(MOD - 1, MOD - 1, MOD - 1, MOD - 1, BIG) });
  T.push({ name: 'x04_max_zero_start', input: build(0, 0, 999999999, 999999999, BIG) });
  T.push({ name: 'x05_max_b_zero', input: build(1, 3, 7, 0, BIG) });
  T.push({ name: 'x06_max_a_zero', input: build(1, 3, 0, 7, BIG) });
  T.push({ name: 'x07_max_t_odd', input: build(5, 8, 13, 21, '999999999999999999') });
  T.push({ name: 'x08_max_t_power_of_two', input: build(1, 1, 1, 1, '576460752303423488') });

  return T;
};
