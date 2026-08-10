'use strict';
// Test generator - m32 / Q75 Network Rollback
// Event lists are always a set of DISTINCT cable numbers.
module.exports = function (R) {
  const T = [];
  const build = (n, edges, events) =>
    `${n} ${edges.length} ${events.length}\n` +
    edges.map((e) => e.join(' ')).join('\n') + '\n' +
    events.join('\n') + '\n';

  // pick k distinct cable numbers from 1..m
  const pick = (m, k) => {
    const idx = Array.from({ length: m }, (_, i) => i + 1);
    for (let i = m - 1; i > 0; i--) { const j = R.int(i + 1); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    return idx.slice(0, k);
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1_ring', input: build(4, [[1, 2], [2, 3], [3, 4], [4, 1]], [1, 2]) });
  T.push({ name: 'e02_sample2_chain', input: build(3, [[1, 2], [2, 3]], [2, 1]) });
  T.push({ name: 'e03_sample3_parallel', input: build(3, [[1, 2], [1, 2], [2, 3]], [1, 3]) });
  T.push({ name: 'e04_single_cable', input: build(2, [[1, 2]], [1]) });
  T.push({ name: 'e05_remove_everything', input: build(4, [[1, 2], [2, 3], [3, 4]], [1, 2, 3]) });
  T.push({ name: 'e06_remove_in_reverse', input: build(4, [[1, 2], [2, 3], [3, 4]], [3, 2, 1]) });
  T.push({ name: 'e07_isolated_servers', input: build(6, [[1, 2]], [1]) });
  T.push({ name: 'e08_all_parallel_same_pair', input: build(2, [[1, 2], [1, 2], [1, 2]], [1, 2, 3]) });
  T.push({ name: 'e09_star_centre', input: build(5, [[1, 2], [1, 3], [1, 4], [1, 5]], [1, 3, 2, 4]) });
  T.push({ name: 'e10_only_one_event', input: build(5, [[1, 2], [2, 3], [3, 4], [4, 5], [5, 1]], [3]) });
  T.push({ name: 'e11_untouched_cables_stay', input: build(6, [[1, 2], [3, 4], [5, 6], [2, 3]], [4]) });

  // --- small randoms (stress-compared against brute) -----------------
  const randGraph = (n, m) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v]);
    }
    return e;
  };
  for (let t = 0; t < 20; t++) {
    const n = 2 + R.int(10);
    const m = 1 + R.int(14);
    const q = 1 + R.int(m);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, randGraph(n, m), pick(m, q)),
    });
  }
  // remove every cable, so the count walks all the way up to n
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(8);
    const m = 1 + R.int(12);
    T.push({
      name: 'a' + String(t + 1).padStart(2, '0') + '_remove_all',
      input: build(n, randGraph(n, m), pick(m, m)),
    });
  }
  // dense: most removals change nothing
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(5);
    const m = 10 + R.int(10);
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_dense_small',
      input: build(n, randGraph(n, m), pick(m, 1 + R.int(m))),
    });
  }
  // trees: every removal splits exactly one cluster
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(10);
    const e = Array.from({ length: n - 1 }, (_, i) => [1 + R.int(i + 1), i + 2]);
    T.push({
      name: 't' + String(t + 1).padStart(2, '0') + '_tree_small',
      input: build(n, e, pick(n - 1, 1 + R.int(n - 1))),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 500, m = 1500;
    T.push({ name: 'm01_medium', input: build(n, randGraph(n, m), pick(m, 800)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, M = 200000;
  {
    const e = [];
    for (let i = 2; i <= N; i++) e.push([1 + R.int(i - 1), i]);
    while (e.length < M) {
      const u = 1 + R.int(N), v = 1 + R.int(N);
      if (u !== v) e.push([u, v]);
    }
    T.push({ name: 'x01_max_connected', input: build(N, e, pick(e.length, e.length)) });
  }
  {
    // a single path: every removal splits, count climbs by exactly one
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2]);
    T.push({ name: 'x02_max_path_remove_all', input: build(N, e, pick(e.length, e.length)) });
  }
  {
    // a star: removing a spoke always isolates one leaf
    const e = Array.from({ length: N - 1 }, (_, i) => [1, i + 2]);
    T.push({ name: 'x03_max_star', input: build(N, e, pick(e.length, e.length)) });
  }
  {
    // every cable duplicated: half the removals change nothing at all
    const e = [];
    for (let i = 1; i < N / 2; i++) { e.push([i, i + 1]); e.push([i, i + 1]); }
    while (e.length < M) e.push([1, 2]);
    T.push({ name: 'x04_max_all_duplicated', input: build(N, e.slice(0, M), pick(M, M)) });
  }
  {
    // one big ring: the first removal changes nothing, the rest all split
    const e = Array.from({ length: N }, (_, i) => [i + 1, (i % N) + 1 === N ? 1 : i + 2]);
    T.push({ name: 'x05_max_ring', input: build(N, e.slice(0, M), pick(Math.min(N, M), Math.min(N, M))) });
  }
  {
    // only one event at full size: the reverse pass must still be cheap
    const e = [];
    for (let i = 2; i <= N; i++) e.push([1 + R.int(i - 1), i]);
    T.push({ name: 'x06_max_single_event', input: build(N, e, [1 + R.int(e.length)]) });
  }
  {
    // dense random with half the cables pulled
    const e = [];
    for (let i = 0; i < M; i++) {
      const u = 1 + R.int(N), v = 1 + R.int(N);
      e.push(u === v ? [u, (u % N) + 1] : [u, v]);
    }
    T.push({ name: 'x07_max_random_half', input: build(N, e, pick(M, M >> 1)) });
  }

  return T;
};
