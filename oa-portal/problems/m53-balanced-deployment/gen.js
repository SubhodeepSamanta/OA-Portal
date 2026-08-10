'use strict';
// Test generator - m53 / Q140 Balanced Deployment
module.exports = function (R) {
  const T = [];
  const build = (s) => `${s}\n`;
  const rand = (k, oneProb) =>
    Array.from({ length: k }, () => (R.next() < oneProb ? '1' : '0')).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build('0011') });
  T.push({ name: 'e02_pair', input: build('01') });
  T.push({ name: 'e03_all_zero_short', input: build('000') });
  T.push({ name: 'e04_alternating', input: build('010101') });
  T.push({ name: 'e05_single_zero', input: build('0') });
  T.push({ name: 'e06_single_one', input: build('1') });
  T.push({ name: 'e07_reverse_pair', input: build('10') });
  T.push({ name: 'e08_all_ones', input: build('1111') });
  T.push({ name: 'e09_blocks', input: build('000111') });
  T.push({ name: 'e10_nested_balanced', input: build('00110011') });
  T.push({ name: 'e11_unbalanced_tail', input: build('0101000') });
  T.push({ name: 'e12_long_alternating', input: build('01'.repeat(20)) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(rand(1 + R.int(60), 0.5)),
    });
  }
  // skewed towards zeros, then towards ones
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'z' + String(t + 1).padStart(2, '0') + '_zero_heavy',
      input: build(rand(5 + R.int(50), 0.2)),
    });
  }
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'o' + String(t + 1).padStart(2, '0') + '_one_heavy',
      input: build(rand(5 + R.int(50), 0.8)),
    });
  }
  // built from balanced blocks, so the answer is large for the length
  for (let t = 0; t < 8; t++) {
    let s = '';
    while (s.length < 20 + R.int(40)) s += R.next() < 0.5 ? '01' : '10';
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_balanced_blocks', input: build(s) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(rand(5000, 0.5)) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(rand(N, 0.5)) });
  T.push({
    // alternating gives the largest possible answer, around 10^10 - this is
    // the test a 32-bit accumulator fails
    name: 'x02_max_overflow_bait',
    input: build('01'.repeat(N / 2)),
  });
  T.push({ name: 'x03_max_all_zero', input: build('0'.repeat(N)) });
  T.push({ name: 'x04_max_all_one', input: build('1'.repeat(N)) });
  T.push({
    // one huge block of zeros then one of ones: totals never repeat much
    name: 'x05_max_two_blocks',
    input: build('0'.repeat(N / 2) + '1'.repeat(N / 2)),
  });
  T.push({
    // pairs of 01 blocks, also very large
    name: 'x06_max_paired_blocks',
    input: build('0011'.repeat(N / 4)),
  });
  T.push({ name: 'x07_max_zero_heavy', input: build(rand(N, 0.1)) });
  T.push({
    // a long drift down then back up: the running total sweeps a wide range
    name: 'x08_max_wide_drift',
    input: build('0'.repeat(N / 2) + '1'.repeat(N / 2 - 1) + '0'),
  });

  return T;
};
