'use strict';
// Test generator - c30 / Q235 Road Construction (CSES 1676)
// Small cases keep m*(n+m) modest for the rebuild-everything brute. Repeated
// and already-connected roads appear often: those must leave both answers
// unchanged rather than double-count.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b]) => `${a} ${b}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 3\n1 2\n1 3\n4 5\n' });
  T.push({ name: 'e02_single_city', input: '1 1\n1 1\n' });
  T.push({ name: 'e03_self_loops', input: '3 3\n1 1\n2 2\n3 3\n' });
  T.push({ name: 'e04_repeated_road', input: '3 4\n1 2\n1 2\n1 2\n2 3\n' });
  T.push({ name: 'e05_already_connected', input: '3 3\n1 2\n2 3\n1 3\n' });
  T.push({ name: 'e06_chain', input: '5 4\n1 2\n2 3\n3 4\n4 5\n' });
  T.push({ name: 'e07_star', input: '5 4\n1 2\n1 3\n1 4\n1 5\n' });
  // two halves grow separately, then merge on the last road
  T.push({ name: 'e08_late_merge', input: '6 5\n1 2\n2 3\n4 5\n5 6\n3 4\n' });
  T.push({ name: 'e09_never_connects', input: '6 2\n1 2\n4 5\n' });
  T.push({ name: 'e10_two_cities', input: '2 1\n1 2\n' });

  const randomEdges = (n, cnt) => Array.from({ length: cnt }, () => [1 + R.int(n), 1 + R.int(n)]);

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(40);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(n, randomEdges(n, 1 + R.int(50))),
    });
  }
  // dense over few cities - most roads are already-connected no-ops
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(8);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_dense_small',
      input: build(n, randomEdges(n, 20 + R.int(40))),
    });
  }
  // strictly growing chain - components fall by one every single road
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(40);
    T.push({
      name: 'c' + String(i + 1).padStart(2, '0') + '_chain',
      input: build(n, Array.from({ length: n - 1 }, (_, j) => [j + 1, j + 2])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({ name: 'x01_max_random', input: build(N, randomEdges(N, M)) });
  T.push({
    // a 100000-long chain then extra no-op roads: the union-by-size stress
    name: 'x02_max_chain',
    input: build(N, (() => {
      const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2]);
      while (e.length < M) e.push([1 + R.int(N), 1 + R.int(N)]);
      return e;
    })()),
  });
  T.push({
    // every road inside one small clique - components barely move
    name: 'x03_max_all_noop',
    input: build(N, Array.from({ length: M }, () => [1 + R.int(3), 1 + R.int(3)])),
  });
  T.push({
    // star from city 1: largest grows by one every road
    name: 'x04_max_star',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [1, i + 2])),
  });
  T.push({
    // pairs first, then merge the pairs - largest doubles in stages
    name: 'x05_max_pairs_then_merge',
    input: build(N, (() => {
      const e = [];
      for (let i = 0; i + 1 < N; i += 2) e.push([i + 1, i + 2]);
      for (let i = 0; i + 3 < N; i += 4) e.push([i + 1, i + 3]);
      while (e.length < M) e.push([1 + R.int(N), 1 + R.int(N)]);
      return e;
    })()),
  });

  return T;
};
