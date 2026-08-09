'use strict';
// Test generator - m1 / Q2 Refund Reconciliation
module.exports = function (R) {
  const T = [];
  const line = (n, k, a) => `${n} ${k}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_hit', input: line(1, 0, [0]) });
  T.push({ name: 'e02_single_miss', input: line(1, 5, [3]) });
  T.push({ name: 'e03_single_extreme', input: line(1, 1000000000, [1000000000]) });
  T.push({ name: 'e04_all_zero_k0_small', input: line(10, 0, Array(10).fill(0)) });
  T.push({ name: 'e05_no_match', input: line(6, 1000000000000, [1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e06_negative_k', input: line(5, -6, [-1, -2, -3, 4, -5]) });
  T.push({ name: 'e07_overflow_probe', input: line(5, 5000000000, Array(5).fill(1000000000)) });
  T.push({ name: 'e08_alternating', input: line(20, 0, Array.from({ length: 20 }, (_, i) => (i % 2 ? -1000000000 : 1000000000))) });

  // --- small randoms (also stress-compared against brute) ---------
  for (let t = 0; t < 12; t++) {
    const n = 1 + R.int(60);
    const lim = [1, 3, 10, 1000000000][t % 4];
    const a = Array.from({ length: n }, () => R.int(2 * lim + 1) - lim);
    const k = t % 3 === 0 ? 0 : R.int(2 * lim + 1) - lim;
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(n, k, a) });
  }

  // --- medium ------------------------------------------------------
  {
    const n = 5000;
    const a = Array.from({ length: n }, () => R.int(21) - 10);
    T.push({ name: 'm01_medium_narrow', input: line(n, 0, a) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000;
  {
    // heavy answer: every prefix equal -> answer = n(n+1)/2 = 20000100000 (needs 64-bit)
    T.push({ name: 'x01_max_all_zero_k0', input: line(N, 0, Array(N).fill(0)) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(3) - 1); // -1,0,1
    T.push({ name: 'x02_max_narrow', input: line(N, 0, a) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(2000000001) - 1000000000);
    T.push({ name: 'x03_max_wide', input: line(N, 0, a) });
  }
  {
    // many hits with a non-zero target
    const a = Array.from({ length: N }, (_, i) => (i % 2 === 0 ? 7 : -7));
    T.push({ name: 'x04_max_pattern', input: line(N, 7, a) });
  }
  {
    // large positive target, forces 64-bit prefix arithmetic
    const a = Array.from({ length: N }, () => 1000000000);
    T.push({ name: 'x05_max_overflow', input: line(N, 100000000000, a) });
  }

  return T;
};
