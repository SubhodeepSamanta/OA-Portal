'use strict';
// Test generator - a1 / Q89 Frog 1 (AtCoder EDPC A)
// Small cases keep N <= 25 so the brute can enumerate every jump sequence.
// Shapes where greedy loses are included deliberately.
module.exports = function (R) {
  const T = [];
  const build = (h) => `${h.length}\n${h.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build([10, 30, 40, 20]) });
  T.push({ name: 'e02_edpc_sample2', input: build([10, 10]) });
  T.push({ name: 'e03_edpc_sample3', input: build([30, 10, 60, 10, 60, 50]) });
  T.push({ name: 'e04_two_stones', input: build([1, 10000]) });
  T.push({ name: 'e05_three_stones', input: build([10, 1, 10]) });     // skip the dip
  T.push({ name: 'e06_all_equal', input: build([7, 7, 7, 7, 7, 7]) });
  T.push({ name: 'e07_increasing', input: build([1, 2, 3, 4, 5, 6, 7]) });
  T.push({ name: 'e08_decreasing', input: build([7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e09_alternating', input: build([1, 10000, 1, 10000, 1, 10000]) });
  T.push({ name: 'e10_greedy_trap', input: build([10, 9, 100, 8, 100, 7]) });
  T.push({ name: 'e11_max_heights', input: build([10000, 1, 10000, 1]) });

  // --- small randoms (brute enumerates) ------------------------------
  for (let i = 0; i < 22; i++) {
    const n = 2 + R.int(24);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(10000))),
    });
  }
  // narrow heights - many ties
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(20);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_narrow',
      input: build(Array.from({ length: n }, () => 1 + R.int(4))),
    });
  }
  // spiky, where the two-step jump usually wins
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(20);
    T.push({
      name: 'p' + String(i + 1).padStart(2, '0') + '_spiky',
      input: build(Array.from({ length: n }, (_, j) => (j % 2 === 0 ? 1 + R.int(50) : 9000 + R.int(1000)))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(10000))) });
  T.push({ name: 'x02_max_all_equal', input: build(Array(N).fill(5000)) });
  T.push({
    // maximum swing every step: the largest possible total
    name: 'x03_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 === 0 ? 1 : 10000))),
  });
  T.push({ name: 'x04_max_increasing', input: build(Array.from({ length: N }, (_, i) => 1 + (i % 10000))) });
  T.push({ name: 'x05_max_two_stones_maxdiff', input: build([1, 10000]) });
  T.push({
    name: 'x06_max_spiky',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 === 0 ? 1 + R.int(20) : 9980 + R.int(20)))),
  });

  return T;
};
