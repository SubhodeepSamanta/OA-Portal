'use strict';
// Test generator - m28 / Q71 Toll Roads
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + (edges.length ? edges.map((e) => e.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(4, [[1, 2, 0], [2, 3, 0], [3, 4, 1], [1, 4, 1]]) });
  T.push({ name: 'e02_unreachable', input: build(3, [[1, 2, 0]]) });
  T.push({ name: 'e03_single_city', input: build(1, []) });
  T.push({ name: 'e04_free_route_exists', input: build(5, [[1, 3, 0], [3, 4, 0], [4, 5, 0], [1, 2, 1], [2, 5, 1]]) });
  T.push({ name: 'e05_all_toll_chain', input: build(6, [[1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 6, 1]]) });
  T.push({ name: 'e06_all_free_chain', input: build(6, [[1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 5, 0], [5, 6, 0]]) });
  T.push({ name: 'e07_parallel_roads', input: build(2, [[1, 2, 1], [1, 2, 0], [1, 2, 1]]) });
  T.push({ name: 'e08_two_cities_toll_only', input: build(2, [[1, 2, 1]]) });
  T.push({ name: 'e09_free_detour_beats_toll', input: build(4, [[1, 4, 1], [1, 2, 0], [2, 3, 0], [3, 4, 0]]) });
  T.push({ name: 'e10_no_roads_at_all', input: build(4, []) });

  // --- small randoms (stress-compared against brute) -----------------
  const randGraph = (n, m, freeP) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, R.next() < freeP ? 0 : 1]);
    }
    return e;
  };
  for (let t = 0; t < 20; t++) {
    const n = 2 + R.int(10);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, randGraph(n, 1 + R.int(18), 0.5)),
    });
  }
  // mostly free: answers cluster at 0, which is where a wrong -1 test shows up
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(9);
    T.push({
      name: 'f' + String(t + 1).padStart(2, '0') + '_mostly_free',
      input: build(n, randGraph(n, 2 + R.int(14), 0.9)),
    });
  }
  // mostly toll: answers grow, exercising the back of the deque
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(9);
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_mostly_toll',
      input: build(n, randGraph(n, 2 + R.int(14), 0.1)),
    });
  }
  // sparse: disconnection common
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(10);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_sparse_small',
      input: build(n, randGraph(n, 1 + R.int(4), 0.5)),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 2000;
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, R.next() < 0.5 ? 0 : 1]);
    while (e.length < 6000) {
      const u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, R.next() < 0.5 ? 0 : 1]);
    }
    T.push({ name: 'm01_medium', input: build(n, e) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 500000;
  const connected = (n, m, freeP) => {
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, R.next() < freeP ? 0 : 1]);
    while (e.length < m) {
      const u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, R.next() < freeP ? 0 : 1]);
    }
    return e;
  };
  T.push({ name: 'x01_max_balanced', input: build(N, connected(N, M, 0.5)) });
  T.push({ name: 'x02_max_mostly_free', input: build(N, connected(N, M, 0.95)) });
  T.push({ name: 'x03_max_mostly_toll', input: build(N, connected(N, M, 0.05)) });
  {
    // one long chain of toll roads: the answer is n-1, the deque is longest
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 1]);
    T.push({ name: 'x04_max_toll_chain', input: build(N, e) });
  }
  {
    // one long chain of free roads: everything goes on the FRONT of the deque
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 0]);
    T.push({ name: 'x05_max_free_chain', input: build(N, e) });
  }
  {
    // alternating: forces both ends of the deque on every other step
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, i % 2]);
    T.push({ name: 'x06_max_alternating_chain', input: build(N, e) });
  }
  {
    // a cheap free path hidden behind a wall of toll roads
    const e = [];
    for (let i = 1; i < N; i++) e.push([i, i + 1, 1]);
    for (let i = 1; i < N; i += 2) e.push([i, Math.min(N, i + 2), 0]);
    T.push({ name: 'x07_max_hidden_free_path', input: build(N, e) });
  }
  {
    // dense star: half a million roads all touching city 1
    const e = [];
    for (let i = 2; i <= N; i++) e.push([1, i, R.next() < 0.5 ? 0 : 1]);
    while (e.length < M) {
      const u = 2 + R.int(N - 1), v = 2 + R.int(N - 1);
      if (u !== v) e.push([u, v, R.next() < 0.5 ? 0 : 1]);
    }
    T.push({ name: 'x08_max_dense_star', input: build(N, e) });
  }
  {
    // destination unreachable at full size
    const e = [];
    for (let i = 2; i <= N - 1; i++) e.push([1 + R.int(i - 1), i, R.next() < 0.5 ? 0 : 1]);
    T.push({ name: 'x09_max_unreachable', input: build(N, e) });
  }

  return T;
};
