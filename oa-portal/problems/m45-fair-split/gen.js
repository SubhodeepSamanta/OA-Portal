'use strict';
// Test generator - m45 / Q132 Fair Split
// Small cases keep n <= 18 because brute.cpp enumerates all 2^n assignments.
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_odd_total', input: build([1, 6, 11, 5]) });
  T.push({ name: 'e02_two_equal', input: build([1, 1]) });
  T.push({ name: 'e03_single_item', input: build([5]) });
  T.push({ name: 'e04_perfect_split', input: build([1, 2, 3]) });
  T.push({ name: 'e05_greedy_trap', input: build([8, 7, 6, 5, 4]) });
  T.push({ name: 'e06_two_wildly_different', input: build([1, 1000]) });
  T.push({ name: 'e07_all_same', input: build([7, 7, 7, 7, 7, 7]) });
  T.push({ name: 'e08_all_same_odd_count', input: build([7, 7, 7]) });
  T.push({ name: 'e09_all_ones', input: build(Array(9).fill(1)) });
  T.push({ name: 'e10_powers_of_two', input: build([1, 2, 4, 8, 16, 32]) });
  T.push({ name: 'e11_one_giant', input: build([1000, 1, 1, 1, 1]) });
  T.push({ name: 'e12_max_values_small', input: build([1000, 1000, 1000, 1000]) });

  // --- small randoms (exhaustive brute) ------------------------------
  // brute walks all 2^n assignments, and these cases are tiny in BYTES, so the
  // stress harness runs every one of them. n stays <= 12 deliberately.
  for (let t = 0; t < 22; t++) {
    const n = 2 + R.int(11);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // small values: exact halves are common
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(10);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_small_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(6))),
    });
  }
  // one dominant item that can never be balanced
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(9);
    const a = Array.from({ length: n - 1 }, () => 1 + R.int(5));
    a.push(1000);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dominant', input: build(a) });
  }
  // constructed to split exactly
  for (let t = 0; t < 8; t++) {
    const half = Array.from({ length: 2 + R.int(4) }, () => 1 + R.int(200));
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_exact_half', input: build(half.concat(half)) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(Array.from({ length: 50 }, () => 1 + R.int(1000))) });

  // --- maximum size --------------------------------------------------
  const N = 100;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000))) });
  T.push({ name: 'x02_max_all_max', input: build(Array(N).fill(1000)) });
  T.push({ name: 'x03_max_all_ones', input: build(Array(N).fill(1)) });
  T.push({ name: 'x04_max_odd_count_all_same', input: build(Array(99).fill(1000)) });
  {
    // every value odd: the parity of the total decides the floor
    T.push({ name: 'x05_max_all_odd', input: build(Array.from({ length: N }, () => 1 + 2 * R.int(500))) });
  }
  {
    // one item outweighs everything else put together
    const a = Array.from({ length: N - 1 }, () => 1);
    a.push(1000);
    T.push({ name: 'x06_max_unbalanceable', input: build(a) });
  }
  {
    // exactly splittable by construction
    const half = Array.from({ length: N / 2 }, () => 1 + R.int(1000));
    T.push({ name: 'x07_max_exact_half', input: build(half.concat(half)) });
  }
  {
    // powers of two: reachable totals are every value up to the sum
    const a = Array.from({ length: N }, (_, i) => Math.min(1000, 1 << (i % 10)));
    T.push({ name: 'x08_max_powers', input: build(a) });
  }

  return T;
};
