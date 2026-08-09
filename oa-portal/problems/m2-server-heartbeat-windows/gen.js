'use strict';
// Test generator - m2 / Q3 Server Heartbeat Windows
module.exports = function (R) {
  const T = [];
  const line = (n, w, a) => `${n} ${w}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_n1_w1', input: line(1, 1, [0]) });
  T.push({ name: 'e02_w_equals_n', input: line(5, 5, [3, 1, 4, 1, 5]) });
  T.push({ name: 'e03_w1', input: line(6, 1, [9, 8, 7, 6, 5, 4]) });
  T.push({ name: 'e04_all_equal', input: line(50, 7, Array(50).fill(1000000000)) });
  T.push({ name: 'e05_strict_increase', input: line(50, 10, Array.from({ length: 50 }, (_, i) => i)) });
  T.push({ name: 'e06_strict_decrease', input: line(50, 10, Array.from({ length: 50 }, (_, i) => 50 - i)) });
  T.push({ name: 'e07_max_value', input: line(4, 2, [0, 1000000000, 0, 1000000000]) });
  T.push({ name: 'e08_all_zero', input: line(30, 4, Array(30).fill(0)) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 12; t++) {
    const n = 1 + R.int(80);
    const w = 1 + R.int(n);
    const lim = [2, 10, 1000, 1000000000][t % 4];
    const a = Array.from({ length: n }, () => R.int(lim + 1));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(n, w, a) });
  }

  // --- medium ------------------------------------------------------
  {
    const n = 20000, w = 137;
    const a = Array.from({ length: n }, () => R.int(1000000001));
    T.push({ name: 'm01_medium', input: line(n, w, a) });
  }

  // --- maximum size (these are what defeat an O(n*w) scan) ---------
  const N = 1000000;
  {
    const a = Array.from({ length: N }, () => R.int(1000000001));
    T.push({ name: 'x01_max_w_half', input: line(N, N / 2, a) });
  }
  {
    // decreasing stream keeps the deque long - worst case for sloppy pops
    const a = Array.from({ length: N }, (_, i) => N - i);
    T.push({ name: 'x02_max_decreasing', input: line(N, 100000, a) });
  }
  {
    // increasing stream - deque stays length 1, but output is huge
    const a = Array.from({ length: N }, (_, i) => i);
    T.push({ name: 'x03_max_increasing', input: line(N, 2, a) });
  }
  {
    const a = Array(N).fill(7);
    T.push({ name: 'x04_max_all_equal', input: line(N, 1000, a) });
  }
  {
    const a = Array.from({ length: N }, () => R.int(2));
    T.push({ name: 'x05_max_binary_w1', input: line(N, 1, a) });
  }

  return T;
};
