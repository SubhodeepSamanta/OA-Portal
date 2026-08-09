'use strict';
// Test generator - m13 / Q54 Trim the Broadcast
module.exports = function (R) {
  const T = [];
  const line = (t, a) => `${a.length} ${t}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_ok', input: line(5, [5]) });         // 1
  T.push({ name: 'e02_single_low', input: line(5, [4]) });        // 0
  T.push({ name: 'e03_t_zero', input: line(0, [0, 0, 0, 0]) });   // all qualify -> 4
  T.push({ name: 'e04_none_qualify', input: line(10, [1, 2, 3]) });
  T.push({ name: 'e05_all_qualify', input: line(1, [5, 5, 5, 5, 5]) });
  T.push({ name: 'e06_exact_average', input: line(5, [4, 6, 4, 6]) });
  T.push({ name: 'e07_middle_run', input: line(6, [1, 9, 8, 2, 7]) });
  T.push({ name: 'e08_front_heavy', input: line(5, [9, 9, 1, 1, 1]) });
  T.push({ name: 'e09_back_heavy', input: line(5, [1, 1, 1, 9, 9]) });
  T.push({ name: 'e10_max_values', input: line(1000000000, Array(20).fill(1000000000)) });
  T.push({ name: 'e11_all_zero', input: line(0, Array(30).fill(0)) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(45);
    const lim = [3, 10, 100, 1000000000][t % 4];
    const a = Array.from({ length: n }, () => R.int(lim + 1));
    const thr = R.int(lim + 1);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(thr, a) });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(500, Array.from({ length: 5000 }, () => R.int(1001))) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(500000000, Array.from({ length: N }, () => R.int(1000000001))) });
  T.push({ name: 'x02_max_all_qualify', input: line(0, Array.from({ length: N }, () => R.int(1000000001))) });
  T.push({ name: 'x03_max_none_qualify', input: line(1000000000, Array.from({ length: N }, () => R.int(1000000000))) });
  T.push({ name: 'x04_max_all_equal_t', input: line(7, Array(N).fill(7)) });
  {
    // qualifying run buried in the middle
    const a = Array(N).fill(1);
    for (let i = N / 4; i < (3 * N) / 4; i++) a[i] = 1000;
    T.push({ name: 'x05_max_central_run', input: line(500, a) });
  }
  T.push({ name: 'x06_max_decreasing', input: line(500000000, Array.from({ length: N }, (_, i) => 1000000000 - i * 5000)) });
  T.push({ name: 'x07_max_alternating', input: line(500000000, Array.from({ length: N }, (_, i) => (i % 2 ? 1000000000 : 0))) });

  return T;
};
