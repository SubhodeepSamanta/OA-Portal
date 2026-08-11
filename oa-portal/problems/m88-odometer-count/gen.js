'use strict';
// Test generator - m88 / Q209 Odometer Count
module.exports = function (R) {
  const T = [];
  const build = (l, r) => `${l} ${r}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_one_to_hundred', input: build(1, 100) });
  T.push({ name: 'e02_single_dirty', input: build(11, 11) });
  T.push({ name: 'e03_one_to_ten', input: build(1, 10) });
  T.push({ name: 'e04_hundred_range', input: build(100, 110) });
  T.push({ name: 'e05_single_clean', input: build(121, 121) });
  T.push({ name: 'e06_single_digit', input: build(7, 7) });
  T.push({ name: 'e07_full_range', input: build(1, '1000000000000000000') });
  T.push({ name: 'e08_max_point', input: build('1000000000000000000', '1000000000000000000') });
  T.push({ name: 'e09_all_nines', input: build(1, 999999999) });
  T.push({ name: 'e10_repdigit_bound', input: build(1, 111111111) });
  T.push({ name: 'e11_alternating_bound', input: build(1, 121212121) });
  T.push({ name: 'e12_boundary_pair', input: build(99, 101) });
  T.push({ name: 'e13_leading_zero_trap', input: build(1000, 1010) });

  // --- small randoms (per-value brute) ------------------------------
  for (let t = 0; t < 22; t++) {
    const l = 1 + R.int(50000);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(l, l + R.int(20000)),
    });
  }
  // narrow ranges high up
  for (let t = 0; t < 10; t++) {
    const l = 100000000 + R.int(90000000);
    T.push({ name: 'h' + String(t + 1).padStart(2, '0') + '_high_narrow', input: build(l, l + R.int(500)) });
  }
  // single points
  for (let t = 0; t < 10; t++) {
    const v = 1 + R.int(1000000);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_point', input: build(v, v) });
  }

  // --- larger (construction brute) -----------------------------------
  for (let t = 0; t < 12; t++) {
    let a = '', b = '';
    const len = 10 + R.int(9);
    a += 1 + R.int(9); b += 1 + R.int(9);
    for (let i = 1; i < len; i++) { a += R.int(10); b += R.int(10); }
    const lo = BigInt(a) < BigInt(b) ? a : b;
    const hi = BigInt(a) < BigInt(b) ? b : a;
    T.push({ name: 'y' + String(t + 1).padStart(2, '0') + '_large_range', input: build(lo, hi) });
  }
  {
    const MAXV = '1000000000000000000';
    T.push({ name: 'x01_max_full', input: build(1, MAXV) });
    T.push({ name: 'x02_max_upper_half', input: build('500000000000000000', MAXV) });
    T.push({ name: 'x03_max_repdigits', input: build('111111111111111111', '999999999999999999') });
    T.push({ name: 'x04_max_alternating', input: build('101010101010101010', '121212121212121212') });
    T.push({ name: 'x05_max_narrow_top', input: build('999999999999999000', '999999999999999999') });
    T.push({ name: 'x06_max_single_point', input: build('123456789123456789', '123456789123456789') });
    T.push({ name: 'x07_max_all_nines', input: build(1, '999999999999999999') });
  }

  return T;
};
