'use strict';
// Test generator - m30 / Q72 Currency Desk
// Small cases stay tiny because brute.cpp enumerates every simple cycle.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + (edges.length ? edges.map((e) => e.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1_profit', input: build(3, [[1, 2, 3, 2], [2, 3, 3, 2], [3, 1, 3, 2]]) });
  T.push({ name: 'e02_sample2_loss', input: build(2, [[1, 2, 1, 2], [2, 1, 1, 2]]) });
  T.push({ name: 'e03_sample3_exactly_one', input: build(2, [[1, 2, 3, 2], [2, 1, 2, 3]]) });
  T.push({ name: 'e04_sample4_stranded', input: build(3, [[1, 2, 1, 1], [2, 3, 5, 1], [3, 2, 5, 1]]) });
  T.push({ name: 'e05_no_offers', input: build(4, []) });
  T.push({ name: 'e06_single_currency', input: build(1, []) });
  T.push({ name: 'e07_self_loop_profit', input: build(2, [[1, 1, 3, 2]]) });
  T.push({ name: 'e08_self_loop_break_even', input: build(2, [[1, 1, 5, 5]]) });
  T.push({ name: 'e09_self_loop_loss', input: build(2, [[1, 1, 2, 3]]) });
  T.push({ name: 'e10_profit_loop_unreachable', input: build(4, [[1, 2, 1, 1], [3, 4, 5, 1], [4, 3, 5, 1]]) });
  T.push({
    name: 'e11_profit_only_via_long_route',
    input: build(5, [[1, 2, 1, 1], [2, 3, 1, 1], [3, 4, 1, 1], [4, 5, 1, 1], [5, 1, 3, 2]]),
  });
  T.push({ name: 'e12_two_loops_one_good', input: build(5, [[1, 2, 1, 2], [2, 1, 1, 2], [1, 3, 2, 1], [3, 1, 2, 1]]) });
  T.push({ name: 'e13_parallel_offers', input: build(2, [[1, 2, 1, 3], [1, 2, 3, 1], [2, 1, 1, 2]]) });
  T.push({ name: 'e14_max_ratios', input: build(2, [[1, 2, 100, 1], [2, 1, 1, 100]]) });
  T.push({ name: 'e15_max_ratios_profit', input: build(2, [[1, 2, 100, 1], [2, 1, 1, 99]]) });

  // --- tiny randoms (exact simple-cycle brute) -----------------------
  // ratios come from a small pool so exactly-1 cycles happen often, which is
  // the case the epsilon has to get right
  const POOL = [[1, 1], [1, 2], [2, 1], [2, 3], [3, 2], [1, 3], [3, 1], [4, 3], [3, 4], [5, 4], [4, 5]];
  const randEdges = (n, m) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      const pr = POOL[R.int(POOL.length)];
      e.push([1 + R.int(n), 1 + R.int(n), pr[0], pr[1]]);
    }
    return e;
  };
  for (let t = 0; t < 24; t++) {
    const n = 2 + R.int(5);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: build(n, randEdges(n, 1 + R.int(9))),
    });
  }
  // reciprocal-heavy: lots of cycles landing on exactly 1
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(4);
    const e = [];
    const k = 1 + R.int(4);
    for (let i = 0; i < k; i++) {
      const pr = POOL[R.int(POOL.length)];
      const u = 1 + R.int(n);
      let v = 1 + R.int(n);
      e.push([u, v, pr[0], pr[1]]);
      e.push([v, u, pr[1], pr[0]]);
    }
    T.push({ name: 'q' + String(t + 1).padStart(2, '0') + '_reciprocal_tiny', input: build(n, e) });
  }
  // guaranteed-profitable little rings hanging off currency 1
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(4);
    const e = [];
    for (let i = 1; i < n; i++) e.push([i, i + 1, 3, 2]);
    e.push([n, 1, 3, 2]);
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_profitable_ring', input: build(n, e) });
  }
  // one-way only: never any way back to currency 1
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(5);
    const e = [];
    for (let i = 1; i < n; i++) e.push([i, i + 1, 5, 1]);
    T.push({ name: 'o' + String(t + 1).padStart(2, '0') + '_one_way_chain', input: build(n, e) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 60;
    const e = [];
    for (let i = 0; i < 200; i++) {
      const pr = POOL[R.int(POOL.length)];
      e.push([1 + R.int(n), 1 + R.int(n), pr[0], pr[1]]);
    }
    T.push({ name: 'm01_medium_random', input: build(n, e) });
  }
  {
    // a strongly connected mesh where every cycle is exactly 1: hidden NO
    const n = 60;
    const val = Array.from({ length: n + 1 }, (_, i) => 1 + (i % 20));
    const e = [];
    for (let i = 0; i < 400; i++) {
      const u = 1 + R.int(n), v = 1 + R.int(n);
      e.push([u, v, val[v], val[u]]);
      e.push([v, u, val[u], val[v]]);
    }
    T.push({ name: 'm02_medium_all_exactly_one', input: build(n, e.slice(0, 800)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 500, M = 5000;
  {
    const e = [];
    for (let i = 0; i < M; i++) {
      const pr = POOL[R.int(POOL.length)];
      e.push([1 + R.int(N), 1 + R.int(N), pr[0], pr[1]]);
    }
    T.push({ name: 'x01_max_random', input: build(N, e) });
  }
  {
    // consistent hidden valuation everywhere: every cycle is exactly 1 -> NO,
    // and a sloppy epsilon says YES
    const val = Array.from({ length: N + 1 }, (_, i) => 1 + (i % 100));
    const e = [];
    for (let i = 0; i < M && e.length < M; i++) {
      const u = 1 + R.int(N), v = 1 + R.int(N);
      e.push([u, v, val[v], val[u]]);
    }
    T.push({ name: 'x02_max_all_exactly_one', input: build(N, e) });
  }
  {
    // same, plus ONE slightly profitable offer inside the reachable core
    const val = Array.from({ length: N + 1 }, (_, i) => 1 + (i % 100));
    const e = [];
    for (let i = 1; i <= N; i++) {
      const v = 1 + (i % N);
      e.push([i, v, val[v], val[i]]);
      e.push([v, i, val[i], val[v]]);
    }
    while (e.length < M - 1) {
      const u = 1 + R.int(N), v = 1 + R.int(N);
      e.push([u, v, val[v], val[u]]);
    }
    e.push([1, 2, val[2] * 2, val[1]]);
    T.push({ name: 'x03_max_one_profit_offer', input: build(N, e.slice(0, M)) });
  }
  {
    // one enormous profitable loop that can never reach currency 1 back
    const e = [];
    for (let i = 2; i < N; i++) e.push([i, i + 1, 3, 2]);
    e.push([N, 2, 3, 2]);
    e.push([1, 2, 1, 1]);
    while (e.length < M) {
      const u = 2 + R.int(N - 1), v = 2 + R.int(N - 1);
      e.push([u, v, 1, 1]);
    }
    T.push({ name: 'x04_max_stranded_profit', input: build(N, e.slice(0, M)) });
  }
  {
    // longest possible profitable cycle: all 500 currencies in one ring
    const e = Array.from({ length: N }, (_, i) => [i + 1, (i + 1) % N + 1, 51, 50]);
    T.push({ name: 'x05_max_long_ring_profit', input: build(N, e) });
  }
  {
    // the same ring but exactly break-even in both directions
    const e = [];
    for (let i = 0; i < N; i++) { e.push([i + 1, (i + 1) % N + 1, 3, 2]); e.push([(i + 1) % N + 1, i + 1, 2, 3]); }
    T.push({ name: 'x06_max_long_ring_break_even', input: build(N, e) });
  }
  {
    // dense but strictly lossy: every offer shrinks your holding
    const e = [];
    for (let i = 0; i < M; i++) e.push([1 + R.int(N), 1 + R.int(N), 1, 2]);
    T.push({ name: 'x07_max_all_lossy', input: build(N, e) });
  }

  return T;
};
