'use strict';
// Test generator - a9 / Q97 Deque (AtCoder EDPC L)
// Small cases keep N <= 20 so the brute can play every line of the game out.
// Mid-sized cases sit under the stress size cap so the brute's memoised
// fallback still gets exercised against the reference.
module.exports = function (R) {
  const T = [];
  const BIG = 1000000000;
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build([10, 80, 90, 30]) });
  T.push({ name: 'e02_edpc_sample2', input: build([10, 100, 10]) });
  T.push({ name: 'e03_edpc_sample3', input: build([10]) });
  T.push({
    name: 'e04_edpc_sample4',
    input: build([BIG, 1, BIG, 1, BIG, 1, BIG, 1, BIG, 1]),
  });
  T.push({ name: 'e05_edpc_sample5', input: build([4, 2, 9, 7, 1, 5]) });
  T.push({ name: 'e06_two_equal', input: build([7, 7]) });
  T.push({ name: 'e07_two_unequal', input: build([1, 1000]) });
  T.push({ name: 'e08_all_equal', input: build(Array(8).fill(5)) });
  T.push({ name: 'e09_ascending', input: build([1, 2, 3, 4, 5, 6, 7]) });
  T.push({ name: 'e10_descending', input: build([7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e11_single_max', input: build([BIG]) });
  T.push({ name: 'e12_bait_in_the_middle', input: build([1, 1, BIG, 1, 1]) });
  T.push({ name: 'e13_even_all_max', input: build(Array(6).fill(BIG)) });

  // --- small randoms (brute plays every line out) ---------------------
  for (let i = 0; i < 22; i++) {
    const n = 1 + R.int(20);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // small values, so many lines of play tie and the tie-break has to be right
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(18);
    T.push({
      name: 't' + String(i + 1).padStart(2, '0') + '_tiny_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // full-range values at small n
  for (let i = 0; i < 6; i++) {
    const n = 1 + R.int(16);
    T.push({
      name: 'v' + String(i + 1).padStart(2, '0') + '_max_values_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(BIG))),
    });
  }
  // mid-sized: past the brute's exponential bound, still inside the stress
  // size cap, so these compare the two tables against each other
  for (let i = 0; i < 6; i++) {
    const n = 40 + R.int(260);
    T.push({
      name: 'm' + String(i + 1).padStart(2, '0') + '_mid',
      input: build(Array.from({ length: n }, () => 1 + R.int(BIG))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 3000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(BIG))) });
  T.push({ name: 'x02_max_all_equal', input: build(Array(N).fill(BIG)) });
  T.push({ name: 'x03_max_ascending', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({
    name: 'x04_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1 : BIG))),
  });
  T.push({
    name: 'x05_max_tiny_values',
    input: build(Array.from({ length: N }, () => 1 + R.int(3))),
  });
  T.push({
    // odd length at full size: the first player takes one more element
    name: 'x06_max_odd',
    input: build(Array.from({ length: N - 1 }, () => 1 + R.int(BIG))),
  });

  return T;
};
