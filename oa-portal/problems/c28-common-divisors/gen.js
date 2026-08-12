'use strict';
// Test generator - c28 / Q169 Common Divisors (CSES 1081)
// Small cases keep n modest for the O(n^2) pairwise brute. Duplicates appear
// often on purpose: counting distinct values instead of occurrences misses
// every pair made of two equal numbers.
module.exports = function (R) {
  const T = [];
  const MAXX = 1000000;
  const build = (xs) => `${xs.length}\n${xs.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([3, 14, 15, 7, 9]) });
  T.push({ name: 'e02_two_values', input: build([6, 9]) });
  T.push({ name: 'e03_identical_pair', input: build([1000000, 1000000]) });   // answer 1e6
  T.push({ name: 'e04_all_ones', input: build([1, 1, 1, 1]) });
  T.push({ name: 'e05_coprime_pair', input: build([7, 11]) });
  T.push({ name: 'e06_duplicates_win', input: build([999983, 2, 3, 999983]) });
  T.push({ name: 'e07_all_same', input: build([12, 12, 12, 12]) });
  T.push({ name: 'e08_powers_of_two', input: build([2, 4, 8, 16, 32]) });
  T.push({ name: 'e09_one_is_multiple', input: build([5, 1000000]) });
  T.push({ name: 'e10_max_and_one', input: build([1000000, 1]) });
  T.push({ name: 'e11_primes_only', input: build([2, 3, 5, 7, 11, 13]) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 2 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXX))),
    });
  }
  // narrow range, so duplicates and shared factors are common
  for (let i = 0; i < 12; i++) {
    const n = 2 + R.int(60);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_duplicates',
      input: build(Array.from({ length: n }, () => 1 + R.int(20))),
    });
  }
  // all multiples of a hidden base
  for (let i = 0; i < 10; i++) {
    const base = 1 + R.int(1000);
    const n = 2 + R.int(40);
    T.push({
      name: 'm' + String(i + 1).padStart(2, '0') + '_shared_base',
      input: build(Array.from({ length: n }, () => base * (1 + R.int(Math.max(1, Math.floor(MAXX / base)))))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => 1 + R.int(MAXX))),
  });
  T.push({
    // every value the maximum: the answer is 1e6 and the downward sweep hits
    // it on the very first d
    name: 'x02_max_all_max',
    input: build(Array(N).fill(MAXX)),
  });
  T.push({
    // all distinct primes-ish: forces the sweep a long way down
    name: 'x03_max_all_ones',
    input: build(Array(N).fill(1)),
  });
  T.push({
    name: 'x04_max_all_even',
    input: build(Array.from({ length: N }, () => 2 * (1 + R.int(MAXX / 2)))),
  });
  T.push({
    // one duplicated large prime among noise - only the duplicate pair wins
    name: 'x05_max_duplicate_prime',
    input: build(Array.from({ length: N }, (_, i) => (i < 2 ? 999983 : 1 + R.int(1000)))),
  });
  T.push({
    name: 'x06_max_distinct_sequence',
    input: build(Array.from({ length: N }, (_, i) => 1 + (i % MAXX))),
  });

  return T;
};
