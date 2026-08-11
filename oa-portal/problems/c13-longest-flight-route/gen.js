'use strict';
// Test generator - c13 / Q83 Longest Flight Route (CSES 1680)
// Every graph must be a DAG, so edges are always drawn from an earlier to a
// later position in a random permutation. Both solutions are linear, so
// "small" here just means small on disk.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b]) => `${a} ${b}`).join('\n') + (edges.length ? '\n' : '');

  // A DAG on n cities. City 1 is pinned to the front of the order and city n
  // to the back, so a route between them is at least plausible.
  const randomDag = (n, cnt) => {
    const mid = [];
    for (let v = 2; v < n; v++) mid.push(v);
    for (let i = mid.length - 1; i > 0; i--) { const j = R.int(i + 1); const t = mid[i]; mid[i] = mid[j]; mid[j] = t; }
    const order = [1, ...mid, n];
    const pos = new Map(order.map((v, i) => [v, i]));
    const seen = new Set();
    const edges = [];
    for (let i = 0; i < cnt; i++) {
      let x = R.int(n), y = R.int(n);
      if (x === y) continue;
      if (x > y) { const t = x; x = y; y = t; }
      const a = order[x], b = order[y];
      const key = a * 1000000 + b;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b]);
    }
    void pos;
    return edges;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 5\n1 2\n2 5\n1 3\n3 4\n4 5\n' });
  T.push({ name: 'e02_direct_only', input: '2 1\n1 2\n' });
  T.push({ name: 'e03_unreachable', input: '3 1\n2 3\n' });
  T.push({ name: 'e04_wrong_direction', input: '2 1\n2 1\n' });
  T.push({ name: 'e05_straight_chain', input: '5 4\n1 2\n2 3\n3 4\n4 5\n' });
  T.push({ name: 'e06_shortcut_vs_chain', input: '4 4\n1 4\n1 2\n2 3\n3 4\n' });
  T.push({ name: 'e07_two_equal_routes', input: '4 4\n1 2\n2 4\n1 3\n3 4\n' });
  T.push({ name: 'e08_dead_ends', input: '6 5\n1 2\n2 6\n1 3\n3 4\n4 5\n' });
  T.push({ name: 'e09_isolated_target', input: '4 2\n1 2\n2 3\n' });
  T.push({ name: 'e10_parallel_edges', input: '3 4\n1 2\n1 2\n2 3\n2 3\n' });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 22; i++) {
    const n = 2 + R.int(40);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_dag_small',
      input: build(n, randomDag(n, 1 + R.int(n * 2))),
    });
  }
  // very sparse - n is often unreachable
  for (let i = 0; i < 12; i++) {
    const n = 3 + R.int(30);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_sparse',
      input: build(n, randomDag(n, 1 + R.int(3))),
    });
  }
  // dense - long routes, many ties
  for (let i = 0; i < 10; i++) {
    const n = 3 + R.int(20);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_dense',
      input: build(n, randomDag(n, n * n)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({ name: 'x01_max_dag_random', input: build(N, randomDag(N, M)) });
  T.push({
    // one 100000-city chain: the answer is every city, and the route is the
    // longest the output can get
    name: 'x02_max_chain',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2])),
  });
  T.push({
    // a chain plus a direct 1 -> n shortcut, which must NOT be preferred
    name: 'x03_max_chain_plus_shortcut',
    input: build(N, (() => {
      const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2]);
      e.push([1, N]);
      return e;
    })()),
  });
  T.push({
    // n unreachable at full size
    name: 'x04_max_impossible',
    input: build(N, Array.from({ length: N - 2 }, (_, i) => [i + 1, i + 2])),
  });
  T.push({
    // two parallel chains of equal length - a tie the checker must accept
    name: 'x05_max_tied_routes',
    input: build(N, (() => {
      const e = [];
      const half = (N - 2) >> 1;
      for (let i = 0; i < half - 1; i++) e.push([2 + i, 3 + i]);
      for (let i = 0; i < half - 1; i++) e.push([2 + half + i, 3 + half + i]);
      e.push([1, 2]); e.push([1, 2 + half]);
      e.push([1 + half, N]); e.push([1 + 2 * half, N]);
      return e;
    })()),
  });

  return T;
};
