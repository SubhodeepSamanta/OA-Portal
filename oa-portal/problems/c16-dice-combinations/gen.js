'use strict';
// Test generator - c16 / Q100 Dice Combinations (CSES 1633)
// Small cases stay at n <= 22 so the brute can enumerate sequences outright.
module.exports = function (R) {
  const T = [];
  const build = (n) => `${n}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build(3) });
  T.push({ name: 'e02_one', input: build(1) });
  T.push({ name: 'e03_two', input: build(2) });
  T.push({ name: 'e04_six', input: build(6) });
  T.push({ name: 'e05_seven', input: build(7) });      // first sum past one throw
  T.push({ name: 'e06_ten', input: build(10) });
  T.push({ name: 'e07_twenty', input: build(20) });
  T.push({ name: 'e08_twentytwo', input: build(22) });

  // --- small randoms (brute enumerates) ------------------------------
  for (let i = 0; i < 22; i++) {
    T.push({ name: 'r' + String(i + 1).padStart(2, '0') + '_random_small', input: build(1 + R.int(22)) });
  }

  // --- mid sizes, where the answer has wrapped the modulus many times -
  for (let i = 0; i < 10; i++) {
    T.push({ name: 'm' + String(i + 1).padStart(2, '0') + '_mid', input: build(100 + R.int(50000)) });
  }

  // --- maximum size --------------------------------------------------
  T.push({ name: 'x01_max', input: build(1000000) });
  T.push({ name: 'x02_max_minus_one', input: build(999999) });
  T.push({ name: 'x03_half_max', input: build(500000) });
  T.push({ name: 'x04_large_random', input: build(700000 + R.int(299999)) });

  return T;
};
