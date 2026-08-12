'use strict';
// Test generator - c24 / Q170 Counting Divisors (CSES 1713)
// The brute is O(sqrt x) per query, so even the largest cases are affordable
// for it; what varies is the number shape - primes, squares, and the
// highly-composite values that maximise the answer.
module.exports = function (R) {
  const T = [];
  const MAXX = 1000000;
  const build = (xs) => `${xs.length}\n${xs.join('\n')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([16, 17, 18]) });
  T.push({ name: 'e02_one', input: build([1]) });
  T.push({ name: 'e03_max', input: build([1000000]) });
  T.push({ name: 'e04_primes', input: build([2, 3, 5, 7, 999983]) });
  T.push({ name: 'e05_perfect_squares', input: build([4, 9, 16, 25, 100, 998001]) });
  T.push({ name: 'e06_powers_of_two', input: build([2, 4, 8, 16, 32, 64, 524288]) });
  // 720720 and 831600 are highly composite - the largest divisor counts here
  T.push({ name: 'e07_highly_composite', input: build([720720, 831600, 942480, 963900]) });
  T.push({ name: 'e08_all_same', input: build([12, 12, 12, 12, 12]) });
  T.push({ name: 'e09_consecutive', input: build([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(40);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXX))),
    });
  }
  // small values, where the answer is easy to check by hand
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(40);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_small_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(100))),
    });
  }
  // squares only - the perfect-square double-count trap in trial division
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(30);
    T.push({
      name: 'q' + String(i + 1).padStart(2, '0') + '_squares',
      input: build(Array.from({ length: n }, () => { const r = 1 + R.int(1000); return r * r; })),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => 1 + R.int(MAXX))),
  });
  T.push({
    // every query the largest value: worst case for trial division
    name: 'x02_max_all_max',
    input: build(Array(N).fill(MAXX)),
  });
  T.push({
    // all the same large prime - trial division runs the full sqrt each time
    name: 'x03_max_all_prime',
    input: build(Array(N).fill(999983)),
  });
  T.push({
    name: 'x04_max_all_ones',
    input: build(Array(N).fill(1)),
  });
  T.push({
    // highly composite repeated - the largest answers
    name: 'x05_max_highly_composite',
    input: build(Array.from({ length: N }, (_, i) => [720720, 831600, 942480, 982800][i % 4])),
  });
  T.push({
    name: 'x06_max_squares',
    input: build(Array.from({ length: N }, (_, i) => { const r = 1 + (i % 1000); return r * r; })),
  });

  return T;
};
