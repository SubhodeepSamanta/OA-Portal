'use strict';
// Test generator - m64 / Q159 Client Panel Scheduling
// Small cases keep n <= 14 so brute.cpp runs its exhaustive subset mode.
module.exports = function (R) {
  const T = [];
  const build = (jobs) => `${jobs.length}\n` + jobs.map((j) => j.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([[1, 3, 5], [2, 5, 6], [4, 6, 5], [7, 8, 4]]) });
  T.push({ name: 'e02_single', input: build([[1, 10, 100]]) });
  T.push({ name: 'e03_touching_allowed', input: build([[1, 5, 10], [5, 9, 20]]) });
  T.push({ name: 'e04_decline_the_long_one', input: build([[1, 10, 1], [2, 3, 5], [4, 5, 5]]) });
  T.push({ name: 'e05_all_overlap', input: build([[1, 10, 5], [2, 9, 6], [3, 8, 7]]) });
  T.push({ name: 'e06_all_disjoint', input: build([[1, 2, 1], [3, 4, 2], [5, 6, 3]]) });
  T.push({ name: 'e07_identical_meetings', input: build([[1, 5, 7], [1, 5, 7], [1, 5, 7]]) });
  T.push({ name: 'e08_one_dominant', input: build([[1, 100, 1000000000], [2, 3, 1], [4, 5, 1]]) });
  T.push({ name: 'e09_chain_of_touching', input: build([[1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1]]) });
  T.push({ name: 'e10_max_values', input: build([[1, 2, 1000000000], [2, 3, 1000000000]]) });
  T.push({ name: 'e11_nested', input: build([[1, 100, 5], [10, 20, 4], [30, 40, 4]]) });

  // --- small randoms (exhaustive brute) ------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(13);
    const jobs = Array.from({ length: n }, () => {
      const s = 1 + R.int(20);
      return [s, s + 1 + R.int(8), 1 + R.int(100)];
    });
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(jobs) });
  }
  // tight coordinates, so touching endpoints happen constantly
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(11);
    const jobs = Array.from({ length: n }, () => {
      const s = 1 + R.int(5);
      return [s, s + 1 + R.int(3), 1 + R.int(20)];
    });
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_tight', input: build(jobs) });
  }
  // one long high-value meeting against many short ones
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(10);
    const jobs = [[1, 50, 50 + R.int(150)]];
    for (let i = 1; i < n; i++) {
      const s = 1 + R.int(45);
      jobs.push([s, s + 1 + R.int(3), 1 + R.int(40)]);
    }
    T.push({ name: 'l' + String(t + 1).padStart(2, '0') + '_long_vs_short', input: build(jobs) });
  }

  // --- medium --------------------------------------------------------
  {
    const jobs = Array.from({ length: 4000 }, () => {
      const s = 1 + R.int(100000);
      return [s, s + 1 + R.int(500), 1 + R.int(1000000)];
    });
    T.push({ name: 'z01_medium', input: build(jobs) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const jobs = Array.from({ length: N }, () => {
      const s = 1 + R.int(999000000);
      return [s, s + 1 + R.int(1000000), 1 + R.int(1000000000)];
    });
    T.push({ name: 'x01_max_random', input: build(jobs) });
  }
  {
    // every meeting spans the whole timeline: take exactly one
    const jobs = Array.from({ length: N }, () => [1, 1000000000, 1 + R.int(1000000000)]);
    T.push({ name: 'x02_max_all_overlap', input: build(jobs) });
  }
  {
    // perfectly disjoint at maximum value: take everything, total 2*10^14
    const jobs = Array.from({ length: N }, (_, i) => [2 * i + 1, 2 * i + 2, 1000000000]);
    T.push({ name: 'x03_max_overflow_bait', input: build(jobs) });
  }
  {
    // every meeting touches the next: all can be taken
    const jobs = Array.from({ length: N }, (_, i) => [i + 1, i + 2, 1 + R.int(1000000000)]);
    T.push({ name: 'x04_max_touching_chain', input: build(jobs) });
  }
  {
    // deeply nested, so the predecessor search walks far back
    const jobs = Array.from({ length: N }, (_, i) => [i + 1, 2 * N - i, 1 + R.int(1000)]);
    T.push({ name: 'x05_max_nested', input: build(jobs) });
  }
  {
    // one giant meeting against a full schedule of small ones
    const jobs = [[1, 1000000000, 1000000000]];
    for (let i = 1; i < N; i++) jobs.push([2 * i, 2 * i + 1, 1000000]);
    T.push({ name: 'x06_max_giant_vs_many', input: build(jobs) });
  }
  {
    // all meetings identical
    const jobs = Array.from({ length: N }, () => [5, 10, 1000000000]);
    T.push({ name: 'x07_max_identical', input: build(jobs) });
  }

  return T;
};
