'use strict';
// Test generator - m62 / Q157 Deployment Windows
// Small cases stay small: brute.cpp is O(n^3) over endpoint pairs.
module.exports = function (R) {
  const T = [];
  const build = (jobs) => `${jobs.length}\n` + jobs.map((j) => j.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_overloaded', input: build([[0, 5, 3], [0, 5, 3]]) });
  T.push({ name: 'e02_fits', input: build([[0, 10, 3], [0, 10, 3]]) });
  T.push({ name: 'e03_exact_fit', input: build([[5, 7, 2]]) });
  T.push({ name: 'e04_needs_pausing', input: build([[0, 10, 5], [4, 6, 2]]) });
  T.push({ name: 'e05_too_big_for_window', input: build([[5, 6, 2]]) });
  T.push({ name: 'e06_disjoint_windows', input: build([[0, 5, 5], [5, 10, 5], [10, 15, 5]]) });
  T.push({ name: 'e07_nested_tight', input: build([[0, 10, 4], [2, 5, 3], [3, 4, 1]]) });
  T.push({ name: 'e08_single_max', input: build([[0, 1000000000, 1000000000]]) });
  T.push({ name: 'e09_single_one_over', input: build([[0, 999999999, 1000000000]]) });
  T.push({ name: 'e10_many_tiny_one_window', input: build([[0, 4, 1], [0, 4, 1], [0, 4, 1], [0, 4, 1]]) });
  T.push({ name: 'e11_one_too_many', input: build([[0, 4, 1], [0, 4, 1], [0, 4, 1], [0, 4, 1], [0, 4, 1]]) });
  T.push({ name: 'e12_staggered', input: build([[0, 3, 2], [1, 4, 2], [2, 5, 1]]) });

  // --- small randoms (stress-compared against brute) -----------------
  const randJobs = (n, span, maxT) =>
    Array.from({ length: n }, () => {
      const l = R.int(span);
      const r = l + 1 + R.int(span);
      return [l, r, 1 + R.int(Math.min(maxT, r - l))];
    });

  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(randJobs(1 + R.int(9), 12, 8)),
    });
  }
  // deliberately tight, so NO is common
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(7);
    const jobs = Array.from({ length: n }, () => {
      const l = R.int(5);
      const r = l + 1 + R.int(4);
      return [l, r, r - l];                        // each fills its own window
    });
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_tight', input: build(jobs) });
  }
  // roomy, so YES is common
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(7);
    const jobs = Array.from({ length: n }, () => {
      const l = R.int(6);
      return [l, l + 30 + R.int(20), 1 + R.int(3)];
    });
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_roomy', input: build(jobs) });
  }
  // nested windows, where a pinned short job splits a long one
  for (let t = 0; t < 10; t++) {
    const outer = [0, 12 + R.int(8), 4 + R.int(4)];
    const jobs = [outer];
    for (let i = 0; i < 1 + R.int(3); i++) {
      const l = 1 + R.int(8);
      const w = 1 + R.int(3);
      jobs.push([l, l + w, w]);
    }
    T.push({ name: 'n' + String(t + 1).padStart(2, '0') + '_nested', input: build(jobs) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium_yes', input: build(randJobs(3000, 1000000, 100)) });
  {
    const jobs = Array.from({ length: 3000 }, () => [0, 1000, 1]);
    T.push({ name: 'z02_medium_no', input: build(jobs) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(randJobs(N, 1000000000, 1000)) });
  {
    // every window is the whole timeline and the total just fits
    const jobs = Array.from({ length: N }, () => [0, 1000000000, 5000]);
    T.push({ name: 'x02_max_exactly_fits', input: build(jobs) });
  }
  {
    // the same but one minute over
    const jobs = Array.from({ length: N }, (_, i) => [0, 1000000000, i === 0 ? 5001 : 5000]);
    T.push({ name: 'x03_max_one_over', input: build(jobs) });
  }
  {
    // perfectly packed back-to-back windows
    const jobs = Array.from({ length: N }, (_, i) => [i, i + 1, 1]);
    T.push({ name: 'x04_max_back_to_back', input: build(jobs) });
  }
  {
    // one long job repeatedly interrupted by pinned short ones
    const jobs = [[0, 1000000000, 100000]];
    for (let i = 1; i < N; i++) jobs.push([i * 2, i * 2 + 1, 1]);
    T.push({ name: 'x05_max_interrupted', input: build(jobs) });
  }
  {
    // deeply nested windows
    const jobs = Array.from({ length: N }, (_, i) => [i, 2 * N - i, 1]);
    T.push({ name: 'x06_max_nested', input: build(jobs) });
  }
  {
    // a single service, at maximum size
    T.push({ name: 'x07_max_single', input: build([[0, 1000000000, 1000000000]]) });
  }

  return T;
};
