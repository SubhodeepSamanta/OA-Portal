'use strict';
// Test generator - m89 / Q210 Split the Load
// Small cases keep n <= 18: the brute enumerates all 2^n subsets, and these
// inputs are tiny in bytes so the stress harness runs every one of them.
module.exports = function (R) {
  const T = [];
  const build = (w) => `${w.length}\n${w.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_odd_total', input: build([1, 6, 11, 5]) });
  T.push({ name: 'e02_single_job', input: build([5]) });
  T.push({ name: 'e03_perfect_split', input: build([1, 1, 1, 1]) });
  T.push({ name: 'e04_two_extremes', input: build([1, 1000000000]) });
  T.push({ name: 'e05_all_max_even_count', input: build([1000000000, 1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e06_all_max_odd_count', input: build([1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e07_powers_of_two', input: build([1, 2, 4, 8, 16, 32]) });
  T.push({ name: 'e08_one_dominant', input: build([1000000000, 1, 1, 1, 1]) });
  T.push({ name: 'e09_all_ones_odd', input: build([1, 1, 1, 1, 1]) });
  T.push({ name: 'e10_two_equal', input: build([7, 7]) });
  T.push({ name: 'e11_greedy_trap', input: build([8, 7, 6, 5, 4]) });

  // --- small randoms (2^n brute) ------------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(17);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000000000))),
    });
  }
  // small values, so exact splits are common
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(15);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_small_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(8))),
    });
  }
  // constructed to split exactly
  for (let t = 0; t < 8; t++) {
    const half = Array.from({ length: 2 + R.int(7) }, () => 1 + R.int(1000000));
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_exact_half', input: build(half.concat(half)) });
  }

  // --- maximum size (meet in the middle territory) -------------------
  const N = 40;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_all_max', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_ones', input: build(Array(N).fill(1)) });
  T.push({ name: 'x04_max_odd_count', input: build(Array.from({ length: 39 }, () => 1 + R.int(1000000000))) });
  T.push({
    // one job outweighs everything else put together
    name: 'x05_max_unbalanceable',
    input: build(Array.from({ length: N }, (_, i) => (i === 0 ? 1000000000 : 1))),
  });
  T.push({
    // powers of two: every total up to the sum is reachable
    name: 'x06_max_powers',
    input: build(Array.from({ length: N }, (_, i) => Math.min(1000000000, 1 << (i % 30)))),
  });
  T.push({
    // exactly splittable by construction at full size
    name: 'x07_max_exact_half',
    input: build((() => { const h = Array.from({ length: 20 }, () => 1 + R.int(1000000000)); return h.concat(h); })()),
  });
  T.push({
    // every weight identical and odd, so the parity floor is 1 or 0
    name: 'x08_max_identical_odd',
    input: build(Array(39).fill(999999999)),
  });

  return T;
};
