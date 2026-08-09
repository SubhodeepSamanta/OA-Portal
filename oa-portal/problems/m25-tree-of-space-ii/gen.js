'use strict';
// Test generator - m25 / Q65 Tree of Space II
// Same shapes as m24 with count operations mixed in; count lines always carry
// a third token of 0.
module.exports = function (R) {
  const T = [];
  const build = (n, parents, ops) =>
    `${n} ${ops.length}\n${parents.join(' ')}\n` + ops.map((o) => o.join(' ')).join('\n') + '\n';

  const SAMPLE_PAR = [1, 1, 2, 2, 3, 3];

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single_node', input: build(1, [], [[4, 1, 0], [1, 1, 5], [4, 1, 0], [3, 1, 5], [4, 1, 0]]) });
  T.push({
    name: 'e02_sample1',
    input: build(7, SAMPLE_PAR, [[1, 4, 5], [1, 5, 5], [4, 2, 0], [3, 2, 5], [4, 2, 0], [4, 1, 0]]),
  });
  T.push({ name: 'e03_sample2', input: build(3, [1, 1], [[4, 1, 0], [1, 2, 3], [4, 1, 0], [4, 3, 0]]) });
  T.push({
    name: 'e04_count_includes_self',
    input: build(7, SAMPLE_PAR, [[1, 2, 1], [4, 2, 0], [4, 1, 0], [4, 4, 0], [2, 2, 1], [4, 2, 0]]),
  });
  T.push({
    name: 'e05_count_after_failed_ops',
    input: build(7, SAMPLE_PAR, [[1, 4, 1], [1, 2, 1], [4, 2, 0], [3, 2, 2], [4, 2, 0], [3, 2, 1], [4, 2, 0]]),
  });
  {
    const n = 20;
    const par = Array.from({ length: n - 1 }, (_, i) => i + 1);
    T.push({
      name: 'e06_chain_counts',
      input: build(n, par, [[1, 20, 1], [4, 1, 0], [4, 10, 0], [4, 20, 0], [3, 1, 1], [4, 1, 0], [4, 20, 0]]),
    });
  }
  T.push({
    name: 'e07_all_leaves_then_count',
    input: build(7, SAMPLE_PAR, [[1, 4, 2], [1, 5, 2], [1, 6, 2], [1, 7, 2], [4, 1, 0], [4, 2, 0], [4, 3, 0], [3, 1, 2], [4, 1, 0]]),
  });

  // --- small randoms (stress-compared against brute) -----------------
  const randOps = (n, q, uids) =>
    Array.from({ length: q }, () => {
      const type = 1 + R.int(4);
      return type === 4 ? [4, 1 + R.int(n), 0] : [type, 1 + R.int(n), 1 + R.int(uids)];
    });

  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(25);
    const par = Array.from({ length: Math.max(0, n - 1) }, (_, i) => 1 + R.int(i + 1));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, par, randOps(n, 6 + R.int(30), 3)),
    });
  }
  // count-heavy streams
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(20);
    const par = Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
    const ops = Array.from({ length: 12 + R.int(25) }, () =>
      R.next() < 0.6 ? [4, 1 + R.int(n), 0] : [1 + R.int(3), 1 + R.int(n), 1 + R.int(2)]);
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_count_heavy', input: build(n, par, ops) });
  }
  for (let t = 0; t < 8; t++) {
    const n = 5 + R.int(20);
    const par = Array.from({ length: n - 1 }, (_, i) => (R.next() < 0.85 ? i + 1 : 1 + R.int(i + 1)));
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_deep_small',
      input: build(n, par, randOps(n, 10 + R.int(25), 2)),
    });
  }
  for (let t = 0; t < 5; t++) {
    const n = 5 + R.int(15);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_star_small',
      input: build(n, Array(n - 1).fill(1), randOps(n, 12 + R.int(20), 2)),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000, q = 3000;
    const par = Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
    T.push({ name: 'm01_medium', input: build(n, par, randOps(n, q, 4)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, Q = 100000;
  {
    const par = Array.from({ length: N - 1 }, (_, i) => 1 + R.int(i + 1));
    T.push({ name: 'x01_max_random_tree', input: build(N, par, randOps(N, Q, 5)) });
  }
  {
    const par = Array.from({ length: N - 1 }, (_, i) => i + 1);
    T.push({ name: 'x02_max_chain', input: build(N, par, randOps(N, Q, 3)) });
  }
  {
    // every operation is a count at the root of a 100000-node chain
    const par = Array.from({ length: N - 1 }, (_, i) => i + 1);
    const ops = [[1, N, 1]];
    while (ops.length < Q) ops.push([4, 1, 0]);
    T.push({ name: 'x03_max_all_counts', input: build(N, par, ops) });
  }
  {
    // lock every leaf of a star, counting the root as we go
    const par = Array(N - 1).fill(1);
    const ops = [];
    for (let i = 2; i <= N && ops.length < Q - 2; i++) {
      ops.push([1, i, 7]);
      if (i % 3 === 0) ops.push([4, 1, 0]);
    }
    ops.push([3, 1, 7]);
    ops.push([4, 1, 0]);
    T.push({ name: 'x04_max_star_count_growth', input: build(N, par, ops.slice(0, Q)) });
  }
  {
    const par = Array.from({ length: N - 1 }, (_, i) => ((i + 2) >> 1));
    T.push({ name: 'x05_max_binary_tree', input: build(N, par, randOps(N, Q, 6)) });
  }
  {
    const par = Array.from({ length: N - 1 }, (_, i) => (i % 2 === 0 ? Math.max(1, i) : i + 1));
    T.push({ name: 'x06_max_caterpillar', input: build(N, par, randOps(N, Q, 4)) });
  }

  return T;
};
