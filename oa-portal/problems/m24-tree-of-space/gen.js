'use strict';
// Test generator - m24 / Q64 Tree of Space
module.exports = function (R) {
  const T = [];
  const build = (n, parents, ops) =>
    `${n} ${ops.length}\n${parents.join(' ')}\n` + ops.map((o) => o.join(' ')).join('\n') + '\n';

  const SAMPLE_PAR = [1, 1, 2, 2, 3, 3];

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single_node', input: build(1, [], [[1, 1, 5], [1, 1, 5], [2, 1, 4], [2, 1, 5], [3, 1, 5]]) });
  T.push({ name: 'e02_sample1', input: build(7, SAMPLE_PAR, [[1, 4, 9], [1, 2, 9], [2, 4, 8], [2, 4, 9], [3, 2, 9]]) });
  T.push({ name: 'e03_sample2', input: build(7, SAMPLE_PAR, [[1, 4, 5], [1, 5, 5], [3, 2, 5], [1, 1, 7]]) });
  T.push({ name: 'e04_sample3', input: build(7, SAMPLE_PAR, [[1, 4, 1], [1, 5, 2], [3, 2, 1]]) });
  T.push({
    name: 'e05_upgrade_to_root',
    input: build(7, SAMPLE_PAR, [[1, 4, 3], [1, 5, 3], [1, 6, 3], [1, 7, 3], [3, 1, 3], [1, 4, 3], [2, 1, 3], [1, 4, 3]]),
  });
  T.push({
    name: 'e06_upgrade_needs_all_same_uid',
    input: build(7, SAMPLE_PAR, [[1, 4, 1], [1, 5, 1], [1, 6, 2], [3, 1, 1], [3, 1, 2], [2, 6, 2], [3, 1, 1]]),
  });
  T.push({
    name: 'e07_ancestor_blocks',
    input: build(7, SAMPLE_PAR, [[1, 1, 4], [1, 2, 4], [1, 4, 4], [3, 2, 4], [2, 1, 4], [1, 4, 4]]),
  });
  {
    // a straight chain: ancestor checks matter at every depth
    const n = 20;
    const par = Array.from({ length: n - 1 }, (_, i) => i + 1);
    T.push({
      name: 'e08_chain',
      input: build(n, par, [[1, 10, 2], [1, 5, 2], [1, 15, 2], [2, 10, 2], [1, 5, 2], [3, 1, 2]]),
    });
  }
  T.push({
    name: 'e09_unlock_wrong_user_repeatedly',
    input: build(7, SAMPLE_PAR, [[1, 3, 8], [2, 3, 1], [2, 3, 2], [2, 3, 8], [2, 3, 8]]),
  });

  // --- small randoms (stress-compared against brute) -----------------
  const randOps = (n, q, uids) =>
    Array.from({ length: q }, () => [1 + R.int(3), 1 + R.int(n), 1 + R.int(uids)]);

  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(25);
    const par = Array.from({ length: Math.max(0, n - 1) }, (_, i) => 1 + R.int(i + 1));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, par, randOps(n, 5 + R.int(30), 3)),
    });
  }
  // one user only: upgrades succeed far more often, exercising the unlock loop
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(20);
    const par = Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
    T.push({
      name: 'u' + String(t + 1).padStart(2, '0') + '_single_user',
      input: build(n, par, randOps(n, 10 + R.int(25), 1)),
    });
  }
  // deep chains, where ancestor scanning is the whole cost
  for (let t = 0; t < 8; t++) {
    const n = 5 + R.int(20);
    const par = Array.from({ length: n - 1 }, (_, i) => (R.next() < 0.85 ? i + 1 : 1 + R.int(i + 1)));
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_deep_small',
      input: build(n, par, randOps(n, 10 + R.int(25), 2)),
    });
  }
  // star: every lock competes with every other
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
    // worst case for walking up: a single chain of 100000 nodes
    const par = Array.from({ length: N - 1 }, (_, i) => i + 1);
    T.push({ name: 'x02_max_chain', input: build(N, par, randOps(N, Q, 3)) });
  }
  {
    // chain, one user, mostly locks then one upgrade at the root
    const par = Array.from({ length: N - 1 }, (_, i) => i + 1);
    const ops = Array.from({ length: Q - 1 }, () => [1, 1 + R.int(N), 1]);
    ops.push([3, 1, 1]);
    T.push({ name: 'x03_max_chain_single_user', input: build(N, par, ops) });
  }
  {
    // star with 100000 leaves: lock them all, then upgrade the root once
    const par = Array(N - 1).fill(1);
    const ops = [];
    for (let i = 2; i <= N && ops.length < Q - 1; i++) ops.push([1, i, 7]);
    ops.push([3, 1, 7]);
    T.push({ name: 'x04_max_star_then_upgrade', input: build(N, par, ops) });
  }
  {
    // same star but the last leaf belongs to someone else: upgrade must fail
    // WITHOUT walking every locked child
    const par = Array(N - 1).fill(1);
    const ops = [];
    for (let i = 2; i < N && ops.length < Q - 200; i++) ops.push([1, i, 7]);
    ops.push([1, N, 8]);
    while (ops.length < Q) ops.push([3, 1, 7]);
    T.push({ name: 'x05_max_failing_upgrades', input: build(N, par, ops) });
  }
  {
    // perfect binary tree, heavy churn
    const par = Array.from({ length: N - 1 }, (_, i) => ((i + 2) >> 1));
    T.push({ name: 'x06_max_binary_tree', input: build(N, par, randOps(N, Q, 6)) });
  }
  {
    // deep caterpillar
    const par = Array.from({ length: N - 1 }, (_, i) => (i % 2 === 0 ? Math.max(1, i) : i + 1));
    T.push({ name: 'x07_max_caterpillar', input: build(N, par, randOps(N, Q, 4)) });
  }

  return T;
};
