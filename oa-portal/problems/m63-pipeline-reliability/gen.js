'use strict';
// Test generator - m63 / Q158 Pipeline Reliability
// Edges always run from a lower-numbered stage to a higher-numbered one, so
// the graph is acyclic by construction.
module.exports = function (R) {
  const T = [];
  const build = (w, edges) =>
    `${w.length} ${edges.length}\n${w.join(' ')}\n` +
    (edges.length ? edges.map((e) => e.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_two_routes', input: build([1, 5, 2, 3], [[1, 2], [1, 3], [2, 4], [3, 4]]) });
  T.push({ name: 'e02_single_isolated', input: build([7], []) });
  T.push({ name: 'e03_chain', input: build([1, 1, 1], [[1, 2], [2, 3]]) });
  T.push({ name: 'e04_many_starts_and_ends', input: build([10, 1, 1, 1, 100], [[1, 3], [2, 3], [3, 4]]) });
  T.push({ name: 'e05_all_isolated', input: build([5, 3, 9], []) });
  T.push({ name: 'e06_zero_risks', input: build([0, 0, 0], [[1, 2], [2, 3]]) });
  T.push({ name: 'e07_parallel_edges', input: build([1, 2], [[1, 2], [1, 2], [1, 2]]) });
  T.push({ name: 'e08_diamond', input: build([1, 100, 1, 1], [[1, 2], [1, 3], [2, 4], [3, 4]]) });
  T.push({ name: 'e09_long_cheap_vs_short_dear', input: build([0, 0, 0, 0, 50], [[1, 2], [2, 3], [3, 4], [1, 5], [5, 4]]) });
  T.push({ name: 'e10_max_risk', input: build([1000000000, 1000000000], [[1, 2]]) });
  T.push({ name: 'e11_isolated_beats_path', input: build([1, 100, 100], [[2, 3]]) });

  // --- small randoms (exponential brute, so keep them tiny) ---------
  const randDag = (n, m) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      const a = 1 + R.int(n - 1);
      const b = a + 1 + R.int(n - a);
      e.push([a, b]);
    }
    return e;
  };
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(9);
    const w = Array.from({ length: n }, () => R.int(30));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(w, n > 1 ? randDag(n, R.int(10)) : []),
    });
  }
  // dense little DAGs, so many paths exist
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(5);
    const w = Array.from({ length: n }, () => R.int(20));
    const e = [];
    for (let a = 1; a <= n; a++)
      for (let b = a + 1; b <= n; b++) if (R.next() < 0.6) e.push([a, b]);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dense_small', input: build(w, e) });
  }
  // several disconnected components
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(5);
    const w = Array.from({ length: n }, () => R.int(40));
    const e = [];
    for (let a = 1; a < n; a++) if (R.next() < 0.4) e.push([a, a + 1]);
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_components', input: build(w, e) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000;
    const w = Array.from({ length: n }, () => R.int(1000000));
    T.push({ name: 'z01_medium', input: build(w, randDag(n, 9000)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, M = 500000;
  {
    const w = Array.from({ length: N }, () => R.int(1000000000));
    T.push({ name: 'x01_max_random', input: build(w, randDag(N, M)) });
  }
  {
    // one chain of maximum risk: the answer approaches 2*10^14
    const w = Array(N).fill(1000000000);
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2]);
    T.push({ name: 'x02_max_chain_overflow_bait', input: build(w, e) });
  }
  {
    // no edges at all: the answer is the single cheapest stage
    const w = Array.from({ length: N }, (_, i) => (i === N >> 1 ? 0 : 1000000000));
    T.push({ name: 'x03_max_no_edges', input: build(w, []) });
  }
  {
    // a wide layered graph: many equally short routes
    const w = Array.from({ length: N }, () => 1 + R.int(1000));
    const e = [];
    const W = 500;
    for (let layer = 0; (layer + 2) * W <= N && e.length < M; layer++)
      for (let i = 0; i < W && e.length < M; i++)
        e.push([layer * W + i + 1, (layer + 1) * W + ((i * 7) % W) + 1]);
    T.push({ name: 'x04_max_layered', input: build(w, e) });
  }
  {
    // enormous fan-in to one end stage
    const w = Array.from({ length: N }, () => 1 + R.int(1000000000));
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, N]);
    T.push({ name: 'x05_max_fan_in', input: build(w, e) });
  }
  {
    // enormous fan-out from one start stage
    const w = Array.from({ length: N }, () => 1 + R.int(1000000000));
    const e = Array.from({ length: N - 1 }, (_, i) => [1, i + 2]);
    T.push({ name: 'x06_max_fan_out', input: build(w, e) });
  }
  {
    // the cheapest route starts nowhere near stage 1
    const w = Array.from({ length: N }, (_, i) => (i === N - 2 ? 0 : 1000000));
    const e = [[N - 1, N]];
    for (let i = 1; i < N - 2; i++) e.push([i, i + 1]);
    T.push({ name: 'x07_max_start_is_not_one', input: build(w, e) });
  }

  return T;
};
