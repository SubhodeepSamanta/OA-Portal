'use strict';
// Test generator - m66 / Q161 Query Plan Cost
// Small cases keep n modest because brute.cpp is O(n^3).
module.exports = function (R) {
  const T = [];
  const build = (c) => `${c.length}\n${c.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_three', input: build([1, 2, 3]) });
  T.push({ name: 'e02_single_leaf', input: build([5]) });
  T.push({ name: 'e03_two_leaves', input: build([4, 7]) });
  T.push({ name: 'e04_balanced_wins', input: build([1, 1, 1, 1]) });
  T.push({ name: 'e05_all_zero', input: build([0, 0, 0, 0, 0]) });
  T.push({ name: 'e06_one_huge_first', input: build([1000000, 1, 1, 1]) });
  T.push({ name: 'e07_one_huge_last', input: build([1, 1, 1, 1000000]) });
  T.push({ name: 'e08_one_huge_middle', input: build([1, 1, 1000000, 1, 1]) });
  T.push({ name: 'e09_ascending', input: build([1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e10_descending', input: build([6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e11_all_max', input: build([1000000, 1000000, 1000000, 1000000]) });
  T.push({ name: 'e12_single_zero', input: build([0]) });
  T.push({ name: 'e13_alternating', input: build([1000000, 1, 1000000, 1, 1000000, 1]) });

  // --- small randoms (O(n^3) brute) ---------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => R.int(1000))),
    });
  }
  // heavy ties, where many split points are equally good
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(25);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_ties',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // wildly uneven, where the shape really matters
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(24);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_skewed',
      input: build(Array.from({ length: n }, () => (R.next() < 0.2 ? 900000 + R.int(100000) : R.int(5)))),
    });
  }
  // zeros throughout, so only the join counts drive the answer
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(26);
    T.push({ name: 'z' + String(t + 1).padStart(2, '0') + '_all_zero', input: build(Array(n).fill(0)) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'y01_medium', input: build(Array.from({ length: 400 }, () => R.int(1000000))) });
  T.push({ name: 'y02_medium_zero', input: build(Array(600).fill(0)) });

  // --- maximum size --------------------------------------------------
  const N = 3000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => R.int(1000000))) });
  T.push({ name: 'x02_max_all_max', input: build(Array(N).fill(1000000)) });
  T.push({ name: 'x03_max_all_zero', input: build(Array(N).fill(0)) });
  T.push({ name: 'x04_max_ascending', input: build(Array.from({ length: N }, (_, i) => i)) });
  T.push({ name: 'x05_max_descending', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({
    // one enormous leaf pulls the optimal split hard to one side
    name: 'x06_max_one_giant',
    input: build(Array.from({ length: N }, (_, i) => (i === 0 ? 1000000 : 0))),
  });
  T.push({
    // giant in the middle
    name: 'x07_max_giant_middle',
    input: build(Array.from({ length: N }, (_, i) => (i === N >> 1 ? 1000000 : 1))),
  });
  T.push({
    // alternating extremes
    name: 'x08_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 0 : 1000000))),
  });

  return T;
};
