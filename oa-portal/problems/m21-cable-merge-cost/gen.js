'use strict';
// Test generator - m21 / Q37 Cable Merge Cost
module.exports = function (R) {
  const T = [];
  const build = (arr) => `${arr.length}\n${arr.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single', input: build([5]) });
  T.push({ name: 'e02_single_max', input: build([1000000000]) });
  T.push({ name: 'e03_two', input: build([3, 9]) });
  T.push({ name: 'e04_sample', input: build([1, 2, 3, 4]) });
  T.push({ name: 'e05_all_ones', input: build([1, 1, 1, 1, 1]) });
  T.push({ name: 'e06_powers', input: build([1, 2, 4, 8, 16, 32]) });
  T.push({ name: 'e07_one_giant', input: build([1000000000, 1, 1, 1]) });
  T.push({ name: 'e08_all_max_small_n', input: build([1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e09_fibonacci', input: build([1, 1, 2, 3, 5, 8, 13]) });

  // --- small randoms (exhaustive brute, n <= 8) ---------------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(7);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: build(Array.from({ length: n }, () => 1 + R.int(60))),
    });
  }
  // slightly larger randoms - brute switches to its linear-scan mode
  for (let t = 0; t < 12; t++) {
    const n = 8 + R.int(30);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // heavy ties, where a wobbly comparator shows up
  for (let t = 0; t < 6; t++) {
    const n = 4 + R.int(20);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_many_ties',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(Array.from({ length: 4000 }, () => 1 + R.int(100000))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_all_max', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_ones', input: build(Array(N).fill(1)) });
  T.push({ name: 'x04_max_sorted_asc', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x05_max_sorted_desc', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({
    // extreme spread: the greedy order matters most here
    name: 'x06_max_spread',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1 : 1000000000))),
  });
  T.push({
    // near-doubling sequence capped at the limit - deep merge tree
    name: 'x07_max_doubling',
    input: build(Array.from({ length: N }, (_, i) => Math.min(1000000000, 1 << (i % 30)))),
  });

  return T;
};
