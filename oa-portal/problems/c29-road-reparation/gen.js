'use strict';
// Test generator - c29 / Q234 Road Reparation (CSES 1675)
// Both solutions are near-linearithmic, so "small" only means small on disk.
// Disconnected graphs appear often - IMPOSSIBLE is half the problem.
module.exports = function (R) {
  const T = [];
  const MAXC = 1000000000;
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b, c]) => `${a} ${b} ${c}`).join('\n') + (edges.length ? '\n' : '');

  // a connected graph: spanning path first, then extra random roads
  const connected = (n, extra, maxC) => {
    const e = [];
    for (let v = 2; v <= n; v++) e.push([1 + R.int(v - 1), v, 1 + R.int(maxC)]);
    for (let i = 0; i < extra; i++) e.push([1 + R.int(n), 1 + R.int(n), 1 + R.int(maxC)]);
    return e;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 6\n1 2 3\n2 3 5\n2 4 2\n3 4 8\n5 1 7\n5 4 4\n' });
  T.push({ name: 'e02_single_city', input: '1 1\n1 1 5\n' });            // answer 0
  T.push({ name: 'e03_two_cities', input: '2 1\n1 2 7\n' });
  T.push({ name: 'e04_disconnected', input: '3 1\n1 2 5\n' });           // IMPOSSIBLE
  T.push({ name: 'e05_self_loops_only', input: '2 2\n1 1 5\n2 2 5\n' }); // IMPOSSIBLE
  T.push({ name: 'e06_parallel_edges', input: '2 3\n1 2 9\n1 2 4\n1 2 7\n' });
  T.push({ name: 'e07_max_cost', input: '2 1\n1 2 1000000000\n' });
  T.push({ name: 'e08_already_tree', input: '4 3\n1 2 1\n2 3 1\n3 4 1\n' });
  T.push({ name: 'e09_cycle_drop_heaviest', input: '3 3\n1 2 1\n2 3 2\n1 3 100\n' });
  T.push({ name: 'e10_two_components', input: '4 2\n1 2 3\n3 4 3\n' });  // IMPOSSIBLE

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(50);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_connected_small',
      input: build(n, connected(n, R.int(30), MAXC)),
    });
  }
  // possibly disconnected: fully random edges
  for (let i = 0; i < 14; i++) {
    const n = 2 + R.int(40);
    const cnt = 1 + R.int(n);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_maybe_disconnected',
      input: build(n, Array.from({ length: cnt }, () => [1 + R.int(n), 1 + R.int(n), 1 + R.int(MAXC)])),
    });
  }
  // ties everywhere - equal costs must still give one correct total
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(40);
    T.push({
      name: 't' + String(i + 1).padStart(2, '0') + '_equal_costs',
      input: build(n, connected(n, R.int(20), 1).map(([a, b]) => [a, b, 7])),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({
    name: 'x01_max_connected',
    input: build(N, connected(N, M - (N - 1), MAXC)),
  });
  T.push({
    // a path of 100000 cities all at maximum cost: the total is ~1e14
    name: 'x02_max_overflow',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, MAXC])),
  });
  T.push({
    // disconnected at full size
    name: 'x03_max_impossible',
    input: build(N, Array.from({ length: N - 2 }, (_, i) => [i + 1, i + 2, 1 + R.int(MAXC)])),
  });
  T.push({
    name: 'x04_max_all_equal_costs',
    input: build(N, connected(N, M - (N - 1), 1).map(([a, b]) => [a, b, 1000000000])),
  });
  T.push({
    // a dense-ish random graph over a smaller city set
    name: 'x05_max_dense_random',
    input: build(N, (() => {
      const e = [];
      for (let v = 2; v <= N; v++) e.push([1 + R.int(v - 1), v, 1 + R.int(MAXC)]);
      while (e.length < M) e.push([1 + R.int(N), 1 + R.int(N), 1 + R.int(MAXC)]);
      return e;
    })()),
  });

  return T;
};
