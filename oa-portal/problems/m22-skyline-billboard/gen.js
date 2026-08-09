'use strict';
// Test generator - m22 / Q41 Skyline Billboard
module.exports = function (R) {
  const T = [];
  const build = (arr) => `${arr.length}\n${arr.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single', input: build([7]) });
  T.push({ name: 'e02_single_zero', input: build([0]) });
  T.push({ name: 'e03_single_max', input: build([1000000000]) });
  T.push({ name: 'e04_sample', input: build([2, 1, 5, 6, 2, 3]) });
  T.push({ name: 'e05_all_zero', input: build([0, 0, 0, 0, 0]) });
  T.push({ name: 'e06_flat', input: build([4, 4, 4, 4]) });
  T.push({ name: 'e07_ascending', input: build([1, 2, 3, 4, 5, 6, 7, 8]) });
  T.push({ name: 'e08_descending', input: build([8, 7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e09_valley', input: build([9, 8, 1, 8, 9]) });
  T.push({ name: 'e10_peak', input: build([1, 2, 9, 2, 1]) });
  T.push({ name: 'e11_zeros_between', input: build([5, 0, 5, 0, 5]) });
  T.push({ name: 'e12_zero_at_ends', input: build([0, 3, 3, 3, 0]) });
  T.push({ name: 'e13_two_max', input: build([1000000000, 1000000000]) });
  T.push({ name: 'e14_equal_with_dip', input: build([6, 6, 6, 5, 6, 6, 6]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => R.int(30))),
    });
  }
  // lots of equal heights and zeros - the strict/non-strict comparison trap
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(25);
    T.push({
      name: 'z' + String(t + 1).padStart(2, '0') + '_ties_and_zeros',
      input: build(Array.from({ length: n }, () => (R.next() < 0.3 ? 0 : 1 + R.int(3)))),
    });
  }
  // sawtooth: alternating tall/short
  for (let t = 0; t < 6; t++) {
    const n = 3 + R.int(25);
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_sawtooth',
      input: build(Array.from({ length: n }, (_, i) => (i % 2 ? 1 : 5 + R.int(5)))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(Array.from({ length: 5000 }, () => R.int(1000000))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => R.int(1000000000))) });
  T.push({ name: 'x02_max_all_max', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_zero', input: build(Array(N).fill(0)) });
  T.push({
    // strictly increasing: the stack never pops until the sentinel
    name: 'x04_max_ascending',
    input: build(Array.from({ length: N }, (_, i) => i + 1)),
  });
  T.push({
    // strictly decreasing: the stack pops on every single step
    name: 'x05_max_descending',
    input: build(Array.from({ length: N }, (_, i) => N - i)),
  });
  T.push({
    name: 'x06_max_sawtooth',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 0 : 1000000000))),
  });
  T.push({
    // one deep notch splitting an otherwise flat maximum block
    name: 'x07_max_flat_with_notch',
    input: build(Array.from({ length: N }, (_, i) => (i === N >> 1 ? 1 : 1000000000))),
  });
  T.push({
    // pyramid up then down
    name: 'x08_max_pyramid',
    input: build(Array.from({ length: N }, (_, i) => (i < N / 2 ? i + 1 : N - i))),
  });

  return T;
};
