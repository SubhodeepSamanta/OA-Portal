'use strict';
// Test generator - m7 / Q18 Splice Cost
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_n2_both_negative', input: line([-5, -3]) });
  T.push({ name: 'e02_n2_both_positive', input: line([7, 2]) });
  T.push({ name: 'e03_n2_mixed', input: line([-10000, 10000]) });
  T.push({ name: 'e04_all_negative', input: line([-1, -2, -3, -4, -5, -6]) });
  T.push({ name: 'e05_all_positive', input: line([1, 2, 3, 4, 5]) });            // forced to cut one
  T.push({ name: 'e06_all_zero', input: line(Array(50).fill(0)) });
  T.push({ name: 'e07_single_dip', input: line([5, 5, -1, 5, 5]) });             // cut the dip
  T.push({ name: 'e08_dip_too_deep', input: line([5, 5, -100, 5, 5]) });         // cutting it is not enough
  T.push({ name: 'e09_max_magnitude', input: line([10000, -10000, 10000, -10000, 10000]) });
  T.push({ name: 'e10_best_is_whole_array', input: line([3, 1, 4, 1, 5]) });     // must break it
  T.push({ name: 'e11_negative_at_ends', input: line([-9, 4, 4, 4, -9]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 16; t++) {
    const n = 2 + R.int(60);
    const lim = [1, 3, 20, 10000][t % 4];
    const a = Array.from({ length: n }, () => R.int(2 * lim + 1) - lim);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(a) });
  }
  // all-negative randoms, where the mandatory-cut rule bites hardest
  for (let t = 0; t < 6; t++) {
    const n = 2 + R.int(40);
    const a = Array.from({ length: n }, () => -(1 + R.int(10000)));
    T.push({ name: 'n' + String(t + 1).padStart(2, '0') + '_random_all_negative', input: line(a) });
  }

  // --- medium ------------------------------------------------------
  {
    const a = Array.from({ length: 5000 }, () => R.int(21) - 10);
    T.push({ name: 'm01_medium', input: line(a) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000;
  {
    // sum reaches 2e9 - the edge of 32-bit
    T.push({ name: 'x01_max_all_max_positive', input: line(Array(N).fill(10000)) });
  }
  {
    T.push({ name: 'x02_max_all_max_negative', input: line(Array(N).fill(-10000)) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(20001) - 10000);
    T.push({ name: 'x03_max_random_wide', input: line(a) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(3) - 1);
    T.push({ name: 'x04_max_narrow', input: line(a) });
  }
  {
    // one deep dip in the middle of a strong run
    const a = Array(N).fill(9000);
    a[N >> 1] = -10000;
    T.push({ name: 'x05_max_single_dip', input: line(a) });
  }
  {
    // alternating extremes
    const a = Array.from({ length: N }, (_, i) => (i % 2 ? -10000 : 10000));
    T.push({ name: 'x06_max_alternating', input: line(a) });
  }

  return T;
};
