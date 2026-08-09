'use strict';
// Test generator - m23 / Q45 Kitchen Order Queue
//
// Two small families on purpose:
//   tiny_*  keeps n<=5, a<=8, c<=5 so brute.cpp runs its EXHAUSTIVE mode and
//           actually proves the scheduling rule rather than re-checking it
//   small_* stays inside the minute-by-minute simulation's budget
module.exports = function (R) {
  const T = [];
  const build = (jobs) => `${jobs.length}\n` + jobs.map((j) => j[0] + ' ' + j[1]).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single', input: build([[5, 3]]) });
  T.push({ name: 'e02_sample1', input: build([[1, 2], [2, 4], [3, 1]]) });
  T.push({ name: 'e03_sample3', input: build([[1, 5], [2, 1], [3, 1], [4, 1]]) });
  T.push({ name: 'e04_preempt_pays', input: build([[1, 10], [2, 1]]) });
  T.push({ name: 'e05_all_same_minute', input: build([[1, 4], [1, 3], [1, 2], [1, 1]]) });
  T.push({ name: 'e06_far_apart', input: build([[1, 1], [5, 1], [8, 1]]) });
  T.push({ name: 'e07_unsorted_input', input: build([[8, 2], [1, 3], [4, 1], [2, 5]]) });
  T.push({ name: 'e08_long_first', input: build([[1, 5], [2, 5], [3, 5]]) });
  T.push({ name: 'e09_idle_gaps', input: build([[1, 1], [7, 1], [8, 4], [8, 1]]) });

  // --- tiny randoms: brute runs the exhaustive optimum ---------------
  for (let t = 0; t < 26; t++) {
    const n = 1 + R.int(5);
    const jobs = Array.from({ length: n }, () => [1 + R.int(8), 1 + R.int(5)]);
    T.push({ name: 'y' + String(t + 1).padStart(2, '0') + '_tiny_exhaustive', input: build(jobs) });
  }
  // tiny with heavy ties in arrival time
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(4);
    const jobs = Array.from({ length: n }, () => [1 + R.int(3), 1 + R.int(5)]);
    T.push({ name: 'u' + String(t + 1).padStart(2, '0') + '_tiny_ties', input: build(jobs) });
  }

  // --- small randoms: simulation mode --------------------------------
  for (let t = 0; t < 14; t++) {
    const n = 6 + R.int(10);
    const jobs = Array.from({ length: n }, () => [1 + R.int(60), 1 + R.int(20)]);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_small_random', input: build(jobs) });
  }
  // bursty: everything lands in a narrow window
  for (let t = 0; t < 6; t++) {
    const n = 8 + R.int(8);
    const jobs = Array.from({ length: n }, () => [1 + R.int(4), 1 + R.int(25)]);
    T.push({ name: 'b' + String(t + 1).padStart(2, '0') + '_small_burst', input: build(jobs) });
  }
  // sparse: long idle stretches between orders
  for (let t = 0; t < 6; t++) {
    const n = 6 + R.int(8);
    const jobs = Array.from({ length: n }, (_, i) => [1 + i * (5 + R.int(10)), 1 + R.int(6)]);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_small_sparse', input: build(jobs) });
  }

  // --- medium --------------------------------------------------------
  {
    const jobs = Array.from({ length: 3000 }, () => [1 + R.int(100000), 1 + R.int(500)]);
    T.push({ name: 'm01_medium', input: build(jobs) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  {
    const jobs = Array.from({ length: N }, () => [1 + R.int(1000000000), 1 + R.int(1000000)]);
    T.push({ name: 'x01_max_random_sparse', input: build(jobs) });
  }
  {
    // everything arrives at minute 1: one long queue, pure shortest-first
    const jobs = Array.from({ length: N }, () => [1, 1 + R.int(1000000)]);
    T.push({ name: 'x02_max_all_at_once', input: build(jobs) });
  }
  {
    // one arrival per minute, each 1 minute long: chef never falls behind
    const jobs = Array.from({ length: N }, (_, i) => [i + 1, 1]);
    T.push({ name: 'x03_max_perfectly_paced', input: build(jobs) });
  }
  {
    // one arrival per minute, each long: a permanently growing backlog
    const jobs = Array.from({ length: N }, (_, i) => [i + 1, 1000000]);
    T.push({ name: 'x04_max_saturated', input: build(jobs) });
  }
  {
    // one giant order first, then a flood of tiny ones preempting it forever
    const jobs = [[1, 1000000]];
    for (let i = 1; i < N; i++) jobs.push([i + 1, 1]);
    T.push({ name: 'x05_max_giant_then_flood', input: build(jobs) });
  }
  {
    // strictly decreasing cook times as they arrive: every arrival preempts
    const jobs = Array.from({ length: N }, (_, i) => [i + 1, N - i]);
    T.push({ name: 'x06_max_each_arrival_preempts', input: build(jobs) });
  }
  {
    // identical orders, identical arrivals - heavy ties everywhere
    const jobs = Array.from({ length: N }, () => [1000000000, 1000000]);
    T.push({ name: 'x07_max_all_identical_late', input: build(jobs) });
  }

  return T;
};
