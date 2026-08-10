'use strict';
// Test generator - m82 / Q198 Rate Limiter
// Timestamps are ALWAYS emitted in non-decreasing order.
module.exports = function (R) {
  const T = [];
  const build = (k, w, reqs) =>
    `${reqs.length} ${k} ${w}\n` + reqs.map((r) => r.join(' ')).join('\n') + '\n';

  const stream = (count, users, maxGap) => {
    let t = 0;
    return Array.from({ length: count }, () => {
      t += R.int(maxGap + 1);
      return [1 + R.int(users), Math.max(1, t)];
    });
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(2, 10, [[1, 1], [1, 2], [1, 3], [1, 11], [2, 3]]) });
  T.push({ name: 'e02_boundary', input: build(1, 5, [[1, 1], [1, 5], [1, 6]]) });
  T.push({ name: 'e03_two_users', input: build(1, 100, [[1, 1], [2, 1], [1, 2], [2, 2]]) });
  T.push({ name: 'e04_single_request', input: build(1, 1, [[5, 100]]) });
  T.push({ name: 'e05_all_same_instant', input: build(2, 10, [[1, 5], [1, 5], [1, 5], [1, 5]]) });
  T.push({ name: 'e06_rejected_not_recorded', input: build(1, 10, [[1, 1], [1, 2], [1, 3], [1, 11]]) });
  T.push({ name: 'e07_window_one', input: build(1, 1, [[1, 1], [1, 2], [1, 3]]) });
  T.push({ name: 'e08_huge_window', input: build(2, 1000000000, [[1, 1], [1, 2], [1, 3], [1, 1000000000]]) });
  T.push({ name: 'e09_large_k', input: build(100000, 10, [[1, 1], [1, 1], [1, 1]]) });
  T.push({ name: 'e10_distinct_users', input: build(1, 100, [[1, 1], [2, 1], [3, 1], [4, 1]]) });
  T.push({ name: 'e11_exact_boundary_equal', input: build(1, 3, [[1, 1], [1, 4], [1, 7]]) });

  // --- small randoms (rescan brute) ---------------------------------
  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(4), 1 + R.int(20), stream(2 + R.int(30), 1 + R.int(3), 4)),
    });
  }
  // one user hammering, so rejections dominate
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'h' + String(t + 1).padStart(2, '0') + '_single_user_burst',
      input: build(1 + R.int(3), 10 + R.int(20), stream(5 + R.int(30), 1, 2)),
    });
  }
  // wide gaps, so almost everything is accepted
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_wide_gaps',
      input: build(1 + R.int(3), 5, stream(4 + R.int(25), 2 + R.int(4), 20)),
    });
  }
  // many users, one request each
  for (let t = 0; t < 8; t++) {
    T.push({
      name: 'u' + String(t + 1).padStart(2, '0') + '_many_users',
      input: build(1, 10, stream(5 + R.int(25), 30, 3)),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(5, 1000, stream(20000, 500, 50)) });

  // --- maximum size --------------------------------------------------
  // Only ONE case runs at the full 10^6 requests. Each such file is about
  // 16 MB on disk and this data is committed, so the rest exercise the same
  // shapes at 200000 - big enough to break anything quadratic.
  const Q = 1000000, QS = 200000;
  T.push({ name: 'x01_max_random', input: build(100, 10000, stream(Q, 1000000, 3)) });
  {
    // one user, every request at the same instant: only k are ever accepted
    const reqs = Array.from({ length: QS }, () => [1, 1]);
    T.push({ name: 'x02_max_single_instant', input: build(100000, 1000000000, reqs) });
  }
  {
    // one user paced exactly at the window, so every request is accepted
    const reqs = Array.from({ length: QS }, (_, i) => [1, i + 1]);
    T.push({ name: 'x03_max_paced', input: build(1, 1, reqs) });
  }
  {
    // one user, k = 1 and a wide window: only the first is ever accepted
    const reqs = Array.from({ length: QS }, (_, i) => [1, 1 + (i % 1000)]);
    T.push({ name: 'x04_max_mostly_rejected', input: build(1, 1000000000, reqs) });
  }
  {
    // every request from a different user
    const reqs = Array.from({ length: QS }, (_, i) => [i + 1, 1 + (i % 1000)]);
    T.push({ name: 'x05_max_distinct_users', input: build(1, 1000, reqs) });
  }
  {
    // heavy churn: the queue fills and drains constantly
    const reqs = [];
    let t = 1;
    for (let i = 0; i < QS; i++) { if (i % 7 === 0) t++; reqs.push([1 + (i % 100), t]); }
    T.push({ name: 'x06_max_churn', input: build(5, 20, reqs) });
  }

  return T;
};
