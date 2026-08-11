'use strict';
// Test generator - c10 / Q80 Building Roads (CSES 1666)
// Both solutions are near-linear, so "small" here just means small on disk.
// What varies is the component structure: one big blob, many singletons,
// long chains, and already-connected graphs.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b]) => `${a} ${b}`).join('\n') + (edges.length ? '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '4 2\n1 2\n3 4\n' });
  T.push({ name: 'e02_single_city', input: '1 1\n1 1\n' });
  T.push({ name: 'e03_already_connected', input: '3 2\n1 2\n2 3\n' });
  T.push({ name: 'e04_self_loops_only', input: '4 3\n1 1\n2 2\n3 3\n' });
  T.push({ name: 'e05_all_isolated', input: '5 1\n3 3\n' });
  T.push({ name: 'e06_duplicate_edges', input: '3 4\n1 2\n1 2\n1 2\n2 1\n' });
  T.push({ name: 'e07_two_chains', input: '6 4\n1 2\n2 3\n4 5\n5 6\n' });
  T.push({ name: 'e08_star_plus_loner', input: '5 3\n1 2\n1 3\n1 4\n' });
  T.push({ name: 'e09_full_cycle', input: '4 4\n1 2\n2 3\n3 4\n4 1\n' });

  // random graph with the given number of edges
  const randomEdges = (n, cnt) =>
    Array.from({ length: cnt }, () => [1 + R.int(n), 1 + R.int(n)]);

  // --- small randoms at several densities ----------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(n, randomEdges(n, 1 + R.int(n * 2))),
    });
  }
  // very sparse: lots of components
  for (let i = 0; i < 10; i++) {
    const n = 5 + R.int(60);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_sparse',
      input: build(n, randomEdges(n, 1 + R.int(3))),
    });
  }
  // dense: usually already connected
  for (let i = 0; i < 10; i++) {
    const n = 3 + R.int(40);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_dense',
      input: build(n, randomEdges(n, n * 3)),
    });
  }
  // exactly two components of random sizes
  for (let i = 0; i < 8; i++) {
    const a = 2 + R.int(25), b = 2 + R.int(25);
    const edges = [];
    for (let v = 2; v <= a; v++) edges.push([v - 1, v]);
    for (let v = a + 2; v <= a + b; v++) edges.push([v - 1, v]);
    T.push({ name: 'p' + String(i + 1).padStart(2, '0') + '_two_blocks', input: build(a + b, edges) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({ name: 'x01_max_random', input: build(N, randomEdges(N, M)) });
  T.push({
    // every city isolated but for self-loops: needs n-1 roads, the largest
    // possible answer
    name: 'x02_max_all_isolated',
    input: build(N, Array.from({ length: 1000 }, (_, i) => [i + 1, i + 1])),
  });
  T.push({
    // one long path: already connected, answer 0
    name: 'x03_max_path_connected',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2])),
  });
  T.push({
    // 50000 disjoint pairs
    name: 'x04_max_pairs',
    input: build(N, Array.from({ length: N / 2 }, (_, i) => [2 * i + 1, 2 * i + 2])),
  });
  T.push({
    // a big connected blob plus many singletons
    name: 'x05_max_blob_plus_singletons',
    input: build(N, Array.from({ length: N / 2 }, (_, i) => [1 + (i % (N / 2)), 1 + ((i + 1) % (N / 2))])),
  });
  T.push({
    // maximum edges, all inside one half - the other half is all singletons
    name: 'x06_max_half_dense',
    input: build(N, Array.from({ length: M }, () => [1 + R.int(N / 2), 1 + R.int(N / 2)])),
  });

  return T;
};
