'use strict';
// Test generator - c17 / Q101 Removing Digits (CSES 1637)
// Both solutions are O(7n), so "small" only means small on disk. What varies
// is digit shape: repdigits, numbers full of zeros, and powers of ten.
module.exports = function (R) {
  const T = [];
  const build = (n) => `${n}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build(27) });
  T.push({ name: 'e02_one', input: build(1) });
  T.push({ name: 'e03_nine', input: build(9) });
  T.push({ name: 'e04_ten', input: build(10) });
  T.push({ name: 'e05_hundred', input: build(100) });
  T.push({ name: 'e06_all_nines', input: build(999999) });
  T.push({ name: 'e07_repdigit_ones', input: build(111111) });
  T.push({ name: 'e08_many_zeros', input: build(100001) });
  T.push({ name: 'e09_power_of_ten', input: build(1000000) });
  T.push({ name: 'e10_leading_one_rest_zero', input: build(100000) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    T.push({ name: 'r' + String(i + 1).padStart(2, '0') + '_random_small', input: build(1 + R.int(200)) });
  }
  // numbers whose digits are all small - fewer, weaker moves available
  for (let i = 0; i < 10; i++) {
    let s = '';
    const len = 4 + R.int(3);
    for (let j = 0; j < len; j++) s += String(j === 0 ? 1 + R.int(2) : R.int(3));
    T.push({ name: 'l' + String(i + 1).padStart(2, '0') + '_small_digits', input: build(parseInt(s, 10)) });
  }
  // mid-range randoms
  for (let i = 0; i < 10; i++) {
    T.push({ name: 'm' + String(i + 1).padStart(2, '0') + '_mid', input: build(1000 + R.int(200000)) });
  }

  // --- maximum size --------------------------------------------------
  T.push({ name: 'x01_max', input: build(1000000) });
  T.push({ name: 'x02_max_minus_one', input: build(999999) });
  T.push({ name: 'x03_large_random', input: build(700000 + R.int(299999)) });
  T.push({ name: 'x04_large_small_digits', input: build(1000001 - 1) });
  T.push({ name: 'x05_half_max', input: build(500000) });

  return T;
};
