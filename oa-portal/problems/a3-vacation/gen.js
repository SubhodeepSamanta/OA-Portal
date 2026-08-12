'use strict';
// Test generator - a3 / Q91 Vacation (AtCoder EDPC C)
// Small cases keep N <= 18 so the brute can try every legal sequence.
// Columns where one activity dominates are the point: that is where taking
// the daily maximum becomes illegal two days running.
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length}\n` + rows.map((r) => r.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build([[10, 40, 70], [20, 50, 80], [30, 60, 90]]) });
  T.push({ name: 'e02_edpc_sample2', input: build([[100, 10, 1]]) });
  T.push({
    name: 'e03_edpc_sample3',
    input: build([[6, 7, 8], [8, 8, 3], [2, 5, 2], [7, 8, 6], [4, 6, 8], [2, 3, 4], [7, 5, 1]]),
  });
  T.push({ name: 'e04_single_day', input: build([[1, 10000, 5000]]) });
  T.push({ name: 'e05_all_equal', input: build([[5, 5, 5], [5, 5, 5], [5, 5, 5]]) });
  // one column dominates every day - greedy is illegal on day 2
  T.push({ name: 'e06_one_column_dominates', input: build([[1, 1, 10000], [1, 1, 10000], [1, 1, 10000]]) });
  T.push({ name: 'e07_two_days', input: build([[10000, 1, 1], [10000, 1, 1]]) });
  T.push({ name: 'e08_max_values', input: build([[10000, 10000, 10000], [10000, 10000, 10000]]) });
  T.push({ name: 'e09_alternating_best', input: build([[9, 1, 1], [1, 9, 1], [9, 1, 1], [1, 9, 1]]) });

  const day = (hi) => [1 + R.int(hi), 1 + R.int(hi), 1 + R.int(hi)];

  // --- small randoms (brute enumerates) ------------------------------
  for (let i = 0; i < 22; i++) {
    const n = 1 + R.int(18);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => day(10000))),
    });
  }
  // narrow values - lots of ties
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(16);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_narrow',
      input: build(Array.from({ length: n }, () => day(3))),
    });
  }
  // one column consistently largest, forcing alternation
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(15);
    const col = R.int(3);
    T.push({
      name: 'c' + String(i + 1).padStart(2, '0') + '_dominant_column',
      input: build(Array.from({ length: n }, () => {
        const d = [1 + R.int(50), 1 + R.int(50), 1 + R.int(50)];
        d[col] = 9000 + R.int(1000);
        return d;
      })),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => day(10000))) });
  T.push({
    // every value at the maximum: the answer is 1e9, right at the 32-bit edge
    name: 'x02_max_all_max',
    input: build(Array(N).fill([10000, 10000, 10000])),
  });
  T.push({
    name: 'x03_max_dominant_column',
    input: build(Array.from({ length: N }, () => [1, 1, 10000])),
  });
  T.push({ name: 'x04_max_narrow', input: build(Array.from({ length: N }, () => day(3))) });
  T.push({
    name: 'x05_max_alternating',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 === 0 ? [10000, 1, 1] : [1, 10000, 1]))),
  });

  return T;
};
