'use strict';
// Test generator - m8 / Q46 One Swap Sum
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: line([-7]) });
  T.push({ name: 'e02_single_positive', input: line([1000000000]) });
  T.push({ name: 'e03_two', input: line([1, 2]) });
  T.push({ name: 'e04_two_swap_hurts', input: line([9, 1]) });
  T.push({ name: 'e05_no_swap_helps', input: line([5, 1, 5]) });
  T.push({ name: 'e06_all_equal', input: line(Array(40).fill(7)) });
  T.push({ name: 'e07_all_negative', input: line([-1, -2, -3, -4, -5]) });
  T.push({ name: 'e08_extremes', input: line([-1000000000, 1000000000, -1000000000, 1000000000]) });
  T.push({ name: 'e09_zeros', input: line(Array(30).fill(0)) });
  T.push({ name: 'e10_best_at_ends', input: line([1, 1, 1, 1, 1, 1000000000]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 16; t++) {
    const n = 1 + R.int(40);
    const lim = [1, 3, 20, 1000000000][t % 4];
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
  T.push({ name: 'x02_max_all_max', input: line(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_min', input: line(Array(N).fill(-1000000000)) });
  T.push({ name: 'x04_max_alternating', input: line(Array.from({ length: N }, (_, i) => (i % 2 ? 1000000000 : -1000000000))) });
  T.push({ name: 'x05_max_narrow', input: line(Array.from({ length: N }, () => R.int(3) - 1)) });
  {
    // one huge value parked in an even slot near the end
    const a = Array(N).fill(1);
    a[N - 1] = 1000000000;
    T.push({ name: 'x06_max_single_gem', input: line(a) });
  }

  return T;
};
