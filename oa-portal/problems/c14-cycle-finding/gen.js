'use strict';
// Test generator - c14 / Q84 Cycle Finding (CSES 1197)
//
// The brute enumerates every SIMPLE cycle by DFS, which is exponential, so
// every stress case is kept to at most 8 nodes and 16 edges. That is small,
// but it is enough: what this problem gets wrong is the DECISION and the
// reconstruction, both of which show up on tiny graphs.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b, c]) => `${a} ${b} ${c}`).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '4 5\n1 2 1\n2 4 1\n3 1 1\n4 1 -3\n4 3 -2\n' });
  T.push({ name: 'e02_negative_self_loop', input: '1 1\n1 1 -5\n' });
  T.push({ name: 'e03_positive_self_loop', input: '1 1\n1 1 5\n' });
  T.push({ name: 'e04_single_edge', input: '2 1\n1 2 -1000000000\n' });     // no cycle
  T.push({ name: 'e05_two_cycle_negative', input: '2 2\n1 2 -5\n2 1 1\n' });
  T.push({ name: 'e06_two_cycle_zero', input: '2 2\n1 2 -5\n2 1 5\n' });    // zero, not negative
  T.push({ name: 'e07_two_cycle_positive', input: '2 2\n1 2 5\n2 1 5\n' });
  T.push({ name: 'e08_all_positive', input: '4 4\n1 2 1\n2 3 1\n3 4 1\n4 1 1\n' });
  // the negative cycle sits in a component unreachable from node 1
  T.push({ name: 'e09_unreachable_cycle', input: '5 4\n1 2 1\n3 4 -5\n4 5 -5\n5 3 -5\n' });
  T.push({ name: 'e10_negative_edges_no_cycle', input: '4 3\n1 2 -5\n2 3 -5\n3 4 -5\n' });
  T.push({ name: 'e11_parallel_edges', input: '2 3\n1 2 10\n1 2 -10\n2 1 1\n' });
  T.push({ name: 'e12_max_weights', input: '2 2\n1 2 -1000000000\n2 1 999999999\n' });
  T.push({ name: 'e13_long_negative_cycle', input: '6 6\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n5 6 1\n6 1 -10\n' });

  // random graphs on at most 8 nodes, weights drawn to make both answers common
  const randomGraph = (n, cnt, lo, hi) =>
    Array.from({ length: cnt }, () => [1 + R.int(n), 1 + R.int(n), lo + R.int(hi - lo + 1)]);

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 24; i++) {
    const n = 1 + R.int(8);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(n, randomGraph(n, 1 + R.int(16), -10, 10)),
    });
  }
  // mostly positive weights - NO is the common answer
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(7);
    T.push({
      name: 'p' + String(i + 1).padStart(2, '0') + '_mostly_positive',
      input: build(n, randomGraph(n, 1 + R.int(14), -2, 20)),
    });
  }
  // mostly negative - YES is the common answer
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(7);
    T.push({
      name: 'g' + String(i + 1).padStart(2, '0') + '_mostly_negative',
      input: build(n, randomGraph(n, 2 + R.int(14), -20, 2)),
    });
  }
  // large magnitudes on tiny graphs - the clamping matters
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(5);
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_big_weights',
      input: build(n, randomGraph(n, 2 + R.int(10), -1000000000, 1000000000)),
    });
  }

  // --- maximum size (far too large for the brute; skipped by stress) --
  const N = 2500, M = 5000;
  T.push({
    name: 'x01_max_random',
    input: build(N, randomGraph(N, M, -1000000000, 1000000000)),
  });
  T.push({
    // a 2500-node cycle whose weights sum to exactly -1
    name: 'x02_max_one_long_cycle',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v < N; v++) e.push([v, v + 1, 1]);
      e.push([N, 1, -N]);
      return e;
    })()),
  });
  T.push({
    // the same cycle summing to exactly 0 - the answer is NO
    name: 'x03_max_zero_cycle',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v < N; v++) e.push([v, v + 1, 1]);
      e.push([N, 1, -(N - 1)]);
      return e;
    })()),
  });
  T.push({
    // a chain of large negative edges but no cycle at all
    name: 'x04_max_no_cycle',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, -1000000000])),
  });
  T.push({
    // negative cycle hidden at the far end, unreachable from node 1
    name: 'x05_max_unreachable_cycle',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v + 1 < N; v++) e.push([v, v + 1, 1]);
      e.push([N, N - 1, -5]);
      e.push([N - 1, N, 1]);
      return e;
    })()),
  });
  T.push({
    // every edge at the most negative weight - distances plunge fastest here
    input: build(N, Array.from({ length: M }, () => [1 + R.int(N), 1 + R.int(N), -1000000000])),
    name: 'x06_max_all_min_weight',
  });

  return T;
};
