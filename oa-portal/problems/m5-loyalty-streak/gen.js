'use strict';
// Test generator - m5 / Q12 Loyalty Streak
module.exports = function (R) {
  const T = [];
  const line = (n, k, a) => `${n} ${k}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_hit', input: line(1, 5, [5]) });
  T.push({ name: 'e02_single_miss', input: line(1, 5, [4]) });
  T.push({ name: 'e03_no_match', input: line(4, 100, [1, 2, 3, 4]) });
  T.push({ name: 'e04_whole_array', input: line(5, 3, [3, 0, -1, 4, -3]) });
  T.push({ name: 'e05_zeros_extend', input: line(7, 1, [0, 0, 0, 1, 0, 0, 0]) });
  T.push({ name: 'e06_all_zero_k0', input: line(50, 0, Array(50).fill(0)) });
  T.push({ name: 'e07_negative_k', input: line(6, -3, [1, -2, -1, 5, -5, 0]) });
  T.push({ name: 'e08_overflow_probe', input: line(5, 5000000000, Array(5).fill(1000000000)) });
  // first-occurrence matters: a later duplicate prefix must not shorten the answer
  T.push({ name: 'e09_first_occurrence', input: line(6, 0, [1, -1, 1, -1, 1, -1]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 14; t++) {
    const n = 1 + R.int(60);
    const lim = [1, 2, 5, 1000000000][t % 4];
    const a = Array.from({ length: n }, () => R.int(2 * lim + 1) - lim);
    const k = t % 3 === 0 ? 0 : R.int(2 * lim + 1) - lim;
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(n, k, a) });
  }

  // --- medium ------------------------------------------------------
  {
    const n = 5000;
    const a = Array.from({ length: n }, () => R.int(5) - 2);
    T.push({ name: 'm01_medium', input: line(n, 0, a) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000;
  {
    // answer is the whole array
    T.push({ name: 'x01_max_all_zero', input: line(N, 0, Array(N).fill(0)) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(3) - 1);
    T.push({ name: 'x02_max_narrow', input: line(N, 0, a) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(2000000001) - 1000000000);
    T.push({ name: 'x03_max_wide_k0', input: line(N, 0, a) });
  }
  {
    // no block matches - forces the full sweep, answer 0
    const a = Array.from({ length: N }, () => 2);
    T.push({ name: 'x04_max_no_match', input: line(N, 1, a) });
  }
  {
    // alternating +-1 with many repeated prefixes: only the FIRST index gives the longest span
    const a = Array.from({ length: N }, (_, i) => (i % 2 ? -1 : 1));
    T.push({ name: 'x05_max_first_occurrence', input: line(N, 0, a) });
  }
  {
    const a = Array.from({ length: N }, () => 1000000000);
    T.push({ name: 'x06_max_overflow', input: line(N, 100000000000, a) });
  }

  return T;
};
