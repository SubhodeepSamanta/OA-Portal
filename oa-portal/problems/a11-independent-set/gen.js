'use strict';
// Test generator - a11 / Q99 Independent Set (AtCoder EDPC P)
// Small cases keep N <= 20 so the brute can enumerate all 2^N colourings.
// The maximum-size PATH is the important one: it is the shape that overflows
// the stack of a recursive depth-first traversal.
module.exports = function (R) {
  const T = [];

  // Renders a parent array (parent[v] for v = 2..n) as an edge list, with the
  // endpoints written in a random order and the lines shuffled, so nothing can
  // quietly rely on seeing parents before children.
  const render = (n, parent) => {
    const edges = [];
    for (let v = 2; v <= n; v++) {
      edges.push(R.int(2) ? [parent[v], v] : [v, parent[v]]);
    }
    for (let i = edges.length - 1; i > 0; i--) {
      const j = R.int(i + 1);
      [edges[i], edges[j]] = [edges[j], edges[i]];
    }
    return `${n}\n` + edges.map((e) => e[0] + ' ' + e[1]).join('\n') + (n > 1 ? '\n' : '');
  };

  const randomTree = (n) => {
    const p = [];
    for (let v = 2; v <= n; v++) p[v] = 1 + R.int(v - 1);
    return p;
  };
  const path = (n) => { const p = []; for (let v = 2; v <= n; v++) p[v] = v - 1; return p; };
  const star = (n) => { const p = []; for (let v = 2; v <= n; v++) p[v] = 1; return p; };
  const binary = (n) => { const p = []; for (let v = 2; v <= n; v++) p[v] = v >> 1; return p; };
  // a spine with a leaf hanging off every spine vertex
  const caterpillar = (n) => {
    const p = [];
    for (let v = 2; v <= n; v++) p[v] = v % 2 === 0 ? Math.max(1, v - 2) : v - 1;
    return p;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: '3\n1 2\n2 3\n' });
  T.push({ name: 'e02_edpc_sample2', input: '4\n1 2\n1 3\n1 4\n' });
  T.push({ name: 'e03_edpc_sample3_single', input: '1\n' });
  T.push({
    name: 'e04_edpc_sample4',
    input: '10\n8 5\n10 8\n6 5\n1 5\n4 8\n2 10\n3 6\n9 2\n1 7\n',
  });
  T.push({ name: 'e05_two_vertices', input: '2\n1 2\n' });
  T.push({ name: 'e06_path_five', input: render(5, path(5)) });
  T.push({ name: 'e07_star_eight', input: render(8, star(8)) });
  T.push({ name: 'e08_binary_seven', input: render(7, binary(7)) });
  T.push({ name: 'e09_caterpillar_ten', input: render(10, caterpillar(10)) });
  T.push({ name: 'e10_path_twenty', input: render(20, path(20)) });

  // --- small randoms (brute enumerates all 2^N colourings) ------------
  for (let i = 0; i < 22; i++) {
    const n = 1 + R.int(20);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: render(n, randomTree(n)),
    });
  }
  // deliberately deep and deliberately flat at small sizes
  for (let i = 0; i < 6; i++) {
    const n = 2 + R.int(19);
    T.push({ name: 'p' + String(i + 1).padStart(2, '0') + '_path_small', input: render(n, path(n)) });
  }
  for (let i = 0; i < 6; i++) {
    const n = 2 + R.int(19);
    T.push({ name: 's' + String(i + 1).padStart(2, '0') + '_star_small', input: render(n, star(n)) });
  }
  // mid-sized: past the brute's exponential bound, still inside the stress
  // size cap, so these compare the two traversals against each other
  for (let i = 0; i < 6; i++) {
    const n = 30 + R.int(250);
    T.push({ name: 'm' + String(i + 1).padStart(2, '0') + '_mid', input: render(n, randomTree(n)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({
    // THE case: a single path 100000 deep. A recursive traversal dies here.
    name: 'x01_max_path',
    input: render(N, path(N)),
  });
  T.push({ name: 'x02_max_star', input: render(N, star(N)) });
  T.push({ name: 'x03_max_random_tree', input: render(N, randomTree(N)) });
  T.push({ name: 'x04_max_binary', input: render(N, binary(N)) });
  T.push({ name: 'x05_max_caterpillar', input: render(N, caterpillar(N)) });

  return T;
};
