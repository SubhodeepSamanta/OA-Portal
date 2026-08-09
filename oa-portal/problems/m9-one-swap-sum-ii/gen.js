'use strict';
// Test generator - m9 / Q47 One Swap Sum II
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_odd', input: line([7]) });
  T.push({ name: 'e02_single_even', input: line([8]) });
  T.push({ name: 'e03_single_negative_odd', input: line([-9]) });
  T.push({ name: 'e04_all_even_values', input: line([2, 4, 6, 8, 10]) });
  T.push({ name: 'e05_all_odd_values', input: line([1, 3, 5, 7, 9]) });
  T.push({ name: 'e06_negative_odds', input: line([-3, -4, 6, -9, 8]) });
  T.push({ name: 'e07_swap_helps', input: line([2, 7, 4, 1]) });
  T.push({ name: 'e08_swap_hurts', input: line([3, 2, 5]) });
  T.push({ name: 'e09_two', input: line([4, 9]) });
  T.push({ name: 'e10_zeros', input: line(Array(30).fill(0)) });
  T.push({ name: 'e11_extremes', input: line([-999999999, 999999999, -1000000000, 1000000000]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 18; t++) {
    const n = 1 + R.int(36);
    const lim = [1, 2, 5, 30, 1000000000][t % 5];
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: line(Array.from({ length: n }, () => R.int(2 * lim + 1) - lim)),
    });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(Array.from({ length: 5000 }, () => R.int(2001) - 1000)) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(Array.from({ length: N }, () => R.int(2000000001) - 1000000000)) });
  T.push({ name: 'x02_max_all_even_values', input: line(Array.from({ length: N }, () => 2 * (R.int(500000000) + 1))) });
  T.push({ name: 'x03_max_all_odd_values', input: line(Array.from({ length: N }, () => 2 * R.int(500000000) + 1)) });
  T.push({ name: 'x04_max_all_negative_odd', input: line(Array.from({ length: N }, () => -(2 * R.int(500000000) + 1))) });
  T.push({ name: 'x05_max_alternating_parity', input: line(Array.from({ length: N }, (_, i) => (i % 2 ? 999999999 : 1000000000))) });
  {
    const a = Array(N).fill(2);      // every value even -> base 0
    a[1] = 999999999;                // one odd value in an even-numbered slot
    T.push({ name: 'x06_max_single_odd_gem', input: line(a) });
  }

  return T;
};
