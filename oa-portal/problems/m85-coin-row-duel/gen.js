'use strict';
// Test generator - m85 / Q206 Coin Row Duel
// Small cases keep n <= 16 so the brute runs its unmemoised recursion.
module.exports = function (R) {
  const T = [];
  const build = (v) => `${v.length}\n${v.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_greedy_trap', input: build([1, 2, 9, 3]) });
  T.push({ name: 'e02_single', input: build([5]) });
  T.push({ name: 'e03_two', input: build([3, 7]) });
  T.push({ name: 'e04_all_equal_even', input: build([1, 1, 1, 1]) });
  T.push({ name: 'e05_all_equal_odd', input: build([1, 1, 1]) });
  T.push({ name: 'e06_increasing', input: build([1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e07_decreasing', input: build([6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e08_one_giant_middle', input: build([1, 1, 1000000000, 1, 1]) });
  T.push({ name: 'e09_one_giant_end', input: build([1000000000, 1, 1, 1]) });
  T.push({ name: 'e10_alternating', input: build([1, 100, 1, 100, 1, 100]) });
  T.push({ name: 'e11_max_values', input: build([1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e12_two_giants', input: build([1000000000, 1, 1, 1000000000]) });

  // --- small randoms (unmemoised recursion) -------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(14);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // heavy ties
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(12);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_ties',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // one dominant coin, position varying
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(11);
    const v = Array.from({ length: n }, () => 1 + R.int(5));
    v[R.int(n)] = 1000000;
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dominant', input: build(v) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(Array.from({ length: 400 }, () => 1 + R.int(1000000))) });
  T.push({ name: 'z02_medium_ties', input: build(Array.from({ length: 600 }, () => 1 + R.int(2))) });

  // --- maximum size --------------------------------------------------
  const N = 2000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_all_equal', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_increasing', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x04_max_decreasing', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({
    name: 'x05_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1000000000 : 1))),
  });
  T.push({
    name: 'x06_max_giant_middle',
    input: build(Array.from({ length: N }, (_, i) => (i === N / 2 ? 1000000000 : 1))),
  });
  T.push({
    // a V shape, so the ends are cheap and the middle is valuable
    name: 'x07_max_valley',
    input: build(Array.from({ length: N }, (_, i) => 1 + Math.abs(N / 2 - i) * 1000)),
  });
  T.push({ name: 'x08_max_odd_length', input: build(Array.from({ length: N - 1 }, () => 1 + R.int(1000000000))) });

  return T;
};
