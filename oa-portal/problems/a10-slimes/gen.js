'use strict';
// Test generator - a10 / Q98 Slimes (AtCoder EDPC N)
// N is never 1 - the constraints start at 2. Small cases keep N <= 9 so the
// brute can try every order of fusions outright.
module.exports = function (R) {
  const T = [];
  const BIG = 1000000000;
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build([10, 20, 30, 40]) });
  T.push({ name: 'e02_edpc_sample2', input: build([10, 10, 10, 10, 10]) });
  T.push({ name: 'e03_edpc_sample3', input: build([BIG, BIG, BIG]) });
  T.push({ name: 'e04_edpc_sample4', input: build([7, 6, 8, 6, 1, 1]) });
  T.push({ name: 'e05_smallest', input: build([1, 1]) });
  T.push({ name: 'e06_two_max', input: build([BIG, BIG]) });
  T.push({ name: 'e07_ascending', input: build([1, 2, 3, 4, 5, 6, 7, 8]) });
  T.push({ name: 'e08_descending', input: build([8, 7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e09_one_huge', input: build([BIG, 1, 1, 1]) });
  T.push({ name: 'e10_huge_at_both_ends', input: build([BIG, 1, 1, BIG]) });
  T.push({ name: 'e11_all_equal', input: build(Array(9).fill(4)) });
  T.push({ name: 'e12_valley', input: build([9, 5, 1, 5, 9]) });

  // --- small randoms (brute tries every order of fusions) -------------
  for (let i = 0; i < 22; i++) {
    const n = 2 + R.int(8);                       // 2..9
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // full-range values at small n - the running total leaves 32 bits early
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(8);
    T.push({
      name: 'v' + String(i + 1).padStart(2, '0') + '_max_values_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(BIG))),
    });
  }
  // mid-sized: past the brute's factorial bound, still inside the stress size
  // cap, so these compare the two tables against each other
  for (let i = 0; i < 8; i++) {
    const n = 10 + R.int(180);
    T.push({
      name: 'm' + String(i + 1).padStart(2, '0') + '_mid',
      input: build(Array.from({ length: n }, () => 1 + R.int(BIG))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 400;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(BIG))) });
  T.push({
    // every slime at the maximum: the total is 400 * 1e9 summed over ~9 levels,
    // far outside 32 bits
    name: 'x02_max_all_max',
    input: build(Array(N).fill(BIG)),
  });
  T.push({ name: 'x03_max_all_one', input: build(Array(N).fill(1)) });
  T.push({ name: 'x04_max_ascending', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({
    name: 'x05_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1 : BIG))),
  });
  T.push({
    name: 'x06_max_one_huge',
    input: build(Array.from({ length: N }, (_, i) => (i === N >> 1 ? BIG : 1))),
  });

  return T;
};
