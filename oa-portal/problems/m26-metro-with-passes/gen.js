'use strict';
// Test generator - m26 / Q69 Metro with Passes
module.exports = function (R) {
  const T = [];
  const build = (n, k, edges) =>
    `${n} ${edges.length} ${k}\n` + edges.map((e) => e.join(' ')).join('\n') + (edges.length ? '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(4, 1, [[1, 2, 10], [2, 4, 10], [1, 3, 1], [3, 4, 100]]) });
  T.push({ name: 'e02_sample4_no_passes', input: build(4, 0, [[1, 2, 10], [2, 4, 10], [1, 3, 1], [3, 4, 100]]) });
  T.push({ name: 'e03_unreachable', input: build(3, 0, [[1, 2, 5]]) });
  T.push({ name: 'e04_more_passes_than_links', input: build(2, 5, [[1, 2, 7]]) });
  T.push({ name: 'e05_single_station', input: build(1, 3, [[1, 1, 1]].slice(0, 0)) });
  T.push({ name: 'e06_parallel_links', input: build(2, 0, [[1, 2, 9], [1, 2, 3], [1, 2, 5]]) });
  T.push({ name: 'e07_max_cost_links', input: build(3, 1, [[1, 2, 1000000000], [2, 3, 1000000000]]) });
  T.push({
    // long chain: with k passes you skip the k dearest hops
    name: 'e08_chain_of_ten',
    input: build(11, 3, Array.from({ length: 10 }, (_, i) => [i + 1, i + 2, (i + 1) * 100])),
  });
  T.push({
    name: 'e09_pass_beats_short_route',
    input: build(5, 1, [[1, 2, 1], [2, 5, 1], [1, 3, 1], [3, 4, 1], [4, 5, 1000000000]]),
  });
  T.push({ name: 'e10_disconnected_halves', input: build(6, 4, [[1, 2, 1], [2, 3, 1], [4, 5, 1], [5, 6, 1]]) });

  // --- small randoms (stress-compared against brute) -----------------
  const randGraph = (n, m, maxC) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, 1 + R.int(maxC)]);
    }
    return e;
  };
  for (let t = 0; t < 20; t++) {
    const n = 2 + R.int(9);
    const m = 1 + R.int(16);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, R.int(4), randGraph(n, m, 40)),
    });
  }
  // sparse: disconnection is common, so -1 gets exercised
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(8);
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_sparse_small',
      input: build(n, R.int(3), randGraph(n, 1 + R.int(5), 100)),
    });
  }
  // wildly uneven costs, where spending a pass well matters
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(7);
    const m = 3 + R.int(10);
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, R.next() < 0.3 ? 900 + R.int(100) : 1 + R.int(3)]);
    }
    T.push({ name: 'w' + String(t + 1).padStart(2, '0') + '_skewed_small', input: build(n, 1 + R.int(3), e) });
  }
  // k = 0 only: plain shortest path, a good regression on the layering
  for (let t = 0; t < 6; t++) {
    const n = 3 + R.int(8);
    T.push({
      name: 'z' + String(t + 1).padStart(2, '0') + '_no_pass_small',
      input: build(n, 0, randGraph(n, 2 + R.int(12), 50)),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 400, m = 1200;
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(1000000)]);
    while (e.length < m) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, 1 + R.int(1000000)]);
    }
    T.push({ name: 'm01_medium', input: build(n, 4, e) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  const connected = (n, m, maxC) => {
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(maxC)]);
    while (e.length < m) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, 1 + R.int(maxC)]);
    }
    return e;
  };
  T.push({ name: 'x01_max_random_k10', input: build(N, 10, connected(N, M, 1000000000)) });
  T.push({ name: 'x02_max_random_k0', input: build(N, 0, connected(N, M, 1000000000)) });
  T.push({ name: 'x03_max_random_k1', input: build(N, 1, connected(N, M, 1000000000)) });
  {
    // one long chain of maximum-cost links: the answer approaches 10^14
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 1000000000]);
    T.push({ name: 'x04_max_chain_overflow_bait', input: build(N, 10, e) });
  }
  {
    // dense star-of-chains, worst case for the priority queue
    const e = [];
    for (let i = 2; i <= N; i++) e.push([1, i, 1 + R.int(1000000000)]);
    while (e.length < M) {
      let u = 2 + R.int(N - 1), v = 2 + R.int(N - 1);
      if (u !== v) e.push([u, v, 1 + R.int(1000000000)]);
    }
    T.push({ name: 'x05_max_star', input: build(N, 10, e) });
  }
  {
    // destination provably unreachable at full size
    const e = [];
    for (let i = 2; i <= N - 1; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(1000)]);
    T.push({ name: 'x06_max_unreachable', input: build(N, 10, e) });
  }
  {
    // grid-like ladder: many equal-cost routes, ties everywhere
    const e = [];
    const half = N >> 1;
    for (let i = 1; i < half; i++) { e.push([i, i + 1, 1]); e.push([half + i, half + i + 1, 1]); }
    for (let i = 1; i <= half && e.length < M; i++) e.push([i, half + i, 2]);
    T.push({ name: 'x07_max_ladder_ties', input: build(N, 5, e) });
  }

  return T;
};
