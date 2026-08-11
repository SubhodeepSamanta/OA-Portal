'use strict';
// Test generator - c12 / Q82 Course Schedule (CSES 1679)
// Both solutions are linear, so "small" just means small on disk. The mix
// that matters is: solvable DAGs, graphs with a cycle somewhere, and the
// awkward shapes (self-requirements, duplicates, no requirements at all).
module.exports = function (R) {
  const T = [];
  const build = (n, reqs) =>
    `${n} ${reqs.length}\n` + reqs.map(([a, b]) => `${a} ${b}`).join('\n') + (reqs.length ? '\n' : '');

  // a DAG: every requirement points from a lower position to a higher one in
  // a random permutation, so a valid order always exists
  const randomDag = (n, cnt) => {
    const perm = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = n - 1; i > 0; i--) { const j = R.int(i + 1); const t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    const reqs = [];
    for (let i = 0; i < cnt; i++) {
      let x = R.int(n), y = R.int(n);
      if (x === y) continue;
      if (x > y) { const t = x; x = y; y = t; }
      reqs.push([perm[x], perm[y]]);
    }
    return reqs;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 3\n1 2\n3 1\n4 5\n' });
  T.push({ name: 'e02_single_course', input: '1 1\n1 1\n' });          // self-requirement
  T.push({ name: 'e03_two_courses', input: '2 1\n1 2\n' });
  T.push({ name: 'e04_reverse_order', input: '2 1\n2 1\n' });
  T.push({ name: 'e05_two_cycle', input: '2 2\n1 2\n2 1\n' });
  T.push({ name: 'e06_three_cycle', input: '3 3\n1 2\n2 3\n3 1\n' });
  T.push({ name: 'e07_chain', input: '5 4\n1 2\n2 3\n3 4\n4 5\n' });
  T.push({ name: 'e08_reverse_chain', input: '5 4\n5 4\n4 3\n3 2\n2 1\n' });
  T.push({ name: 'e09_duplicates', input: '3 5\n1 2\n1 2\n1 2\n2 3\n2 3\n' });
  T.push({ name: 'e10_cycle_far_from_start', input: '6 5\n1 2\n2 3\n4 5\n5 6\n6 4\n' });
  T.push({ name: 'e11_self_loop_late', input: '4 3\n1 2\n2 3\n4 4\n' });
  T.push({ name: 'e12_diamond', input: '4 4\n1 2\n1 3\n2 4\n3 4\n' });

  // --- small randoms: solvable DAGs ----------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(50);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_dag_small',
      input: build(n, randomDag(n, 1 + R.int(n * 2))),
    });
  }
  // random graphs with no acyclicity guarantee - many are IMPOSSIBLE
  for (let i = 0; i < 14; i++) {
    const n = 2 + R.int(40);
    const cnt = 1 + R.int(n * 2);
    T.push({
      name: 'c' + String(i + 1).padStart(2, '0') + '_maybe_cyclic',
      input: build(n, Array.from({ length: cnt }, () => [1 + R.int(n), 1 + R.int(n)])),
    });
  }
  // a DAG with exactly one extra back edge forced in - always IMPOSSIBLE
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(30);
    const reqs = [];
    for (let v = 1; v < n; v++) reqs.push([v, v + 1]);
    reqs.push([n, 1 + R.int(n - 1)]);
    T.push({ name: 'k' + String(i + 1).padStart(2, '0') + '_forced_cycle', input: build(n, reqs) });
  }
  // wide DAGs: many independent courses, few requirements
  for (let i = 0; i < 8; i++) {
    const n = 5 + R.int(50);
    T.push({ name: 'w' + String(i + 1).padStart(2, '0') + '_wide', input: build(n, randomDag(n, 1 + R.int(4))) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({ name: 'x01_max_dag_random', input: build(N, randomDag(N, M)) });
  T.push({
    // one 100000-long chain: the shape that kills a recursive DFS
    name: 'x02_max_chain',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2])),
  });
  T.push({
    // the same chain closed into a cycle - IMPOSSIBLE at full size
    name: 'x03_max_chain_cycle',
    input: build(N, Array.from({ length: N }, (_, i) => (i === N - 1 ? [N, 1] : [i + 1, i + 2]))),
  });
  T.push({
    // one course everything depends on, then one everything feeds into
    name: 'x04_max_hourglass',
    input: build(N, (() => {
      const r = [];
      for (let v = 3; v <= N; v++) { r.push([1, v]); r.push([v, 2]); }
      return r.slice(0, M);
    })()),
  });
  T.push({
    name: 'x05_max_no_constraints',
    input: build(N, [[1, 2]]),
  });
  T.push({
    // maximum requirements, all duplicates of a handful of real ones
    name: 'x06_max_duplicates',
    input: build(N, Array.from({ length: M }, (_, i) => [1 + (i % 10), 11 + (i % 10)])),
  });

  return T;
};
