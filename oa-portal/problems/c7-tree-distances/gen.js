'use strict';
// Test generator - c7 / Q60 Tree Distances I (CSES 1132)
// Small cases stay under ~120 nodes for the O(n^2) brute. Tree SHAPE is what
// this problem tests, so paths, stars and caterpillars matter more than size.
module.exports = function (R) {
  const T = [];
  // edges given as [a, b] pairs, shuffled and relabelled so node 1 is not
  // always at one end - a solution that assumes node 1 is special must fail
  const build = (n, edges) => `${n}\n` + edges.map(([a, b]) => `${a} ${b}`).join('\n') + (edges.length ? '\n' : '\n');

  const relabel = (n, edges) => {
    const perm = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = n; i > 1; i--) { const j = 1 + R.int(i); const t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    return edges.map(([a, b]) => (R.int(2) ? [perm[a], perm[b]] : [perm[b], perm[a]]));
  };

  const path = (n) => Array.from({ length: n - 1 }, (_, i) => [i + 1, i + 2]);
  const star = (n) => Array.from({ length: n - 1 }, (_, i) => [1, i + 2]);
  const balanced = (n) => Array.from({ length: n - 1 }, (_, i) => [Math.floor(i / 2) + 1, i + 2]);
  const randomTree = (n) => Array.from({ length: n - 1 }, (_, i) => [1 + R.int(i + 1), i + 2]);
  // a spine with one leaf hanging off every spine node
  const caterpillar = (n) => {
    const e = [];
    const spine = Math.max(1, Math.floor(n / 2));
    for (let i = 2; i <= spine; i++) e.push([i - 1, i]);
    for (let i = spine + 1; i <= n; i++) e.push([1 + ((i - spine - 1) % spine), i]);
    return e;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5\n1 2\n1 3\n3 4\n3 5\n' });
  T.push({ name: 'e02_single_node', input: '1\n' });
  T.push({ name: 'e03_two_nodes', input: '2\n1 2\n' });
  T.push({ name: 'e04_path_6', input: build(6, path(6)) });
  T.push({ name: 'e05_star_6', input: build(6, star(6)) });
  T.push({ name: 'e06_balanced_7', input: build(7, balanced(7)) });
  T.push({ name: 'e07_caterpillar_10', input: build(10, caterpillar(10)) });
  T.push({ name: 'e08_path_relabelled', input: build(9, relabel(9, path(9))) });
  T.push({ name: 'e09_two_stars', input: '7\n1 2\n1 3\n1 4\n4 5\n4 6\n4 7\n' });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(80);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: n === 1 ? '1\n' : build(n, relabel(n, randomTree(n))),
    });
  }
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(60);
    T.push({ name: 'p' + String(i + 1).padStart(2, '0') + '_path', input: build(n, relabel(n, path(n))) });
  }
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(60);
    T.push({ name: 'c' + String(i + 1).padStart(2, '0') + '_caterpillar', input: build(n, relabel(n, caterpillar(n))) });
  }
  for (let i = 0; i < 6; i++) {
    const n = 2 + R.int(60);
    T.push({ name: 'b' + String(i + 1).padStart(2, '0') + '_balanced', input: build(n, relabel(n, balanced(n))) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(N, relabel(N, randomTree(N))) });
  T.push({
    // a 200000-node path: the diameter is the whole tree and a recursive
    // traversal blows the stack here
    name: 'x02_max_path',
    input: build(N, relabel(N, path(N))),
  });
  T.push({ name: 'x03_max_star', input: build(N, star(N)) });
  T.push({ name: 'x04_max_balanced', input: build(N, balanced(N)) });
  T.push({ name: 'x05_max_caterpillar', input: build(N, relabel(N, caterpillar(N))) });

  return T;
};
