'use strict';
// Test generator - m51 / Q138 Version Rollback Tree
// Every QUERY must name an existing version and a k within its length, so the
// generator tracks version lengths as it emits operations.
module.exports = function (R) {
  const T = [];
  const build = (ops) => `${ops.length}\n${ops.join('\n')}\n`;
  const LET = 'abcdefghijklmnopqrstuvwxyz';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_branch', input: build(['EDIT 0 a', 'EDIT 1 b', 'QUERY 2 1', 'QUERY 2 2', 'EDIT 1 c']) });
  T.push({
    name: 'e02_two_branches',
    input: build(['EDIT 0 x', 'EDIT 1 y', 'EDIT 1 z', 'QUERY 2 2', 'QUERY 3 2', 'QUERY 3 1']),
  });
  T.push({
    name: 'e03_chain_of_four',
    input: build(['EDIT 0 a', 'EDIT 1 b', 'EDIT 2 c', 'EDIT 3 d', 'QUERY 4 1', 'QUERY 4 4', 'QUERY 4 2']),
  });
  T.push({ name: 'e04_single_edit', input: build(['EDIT 0 q', 'QUERY 1 1', 'QUERY 1 1']) });
  T.push({ name: 'e05_only_edits', input: build(['EDIT 0 a', 'EDIT 1 b', 'EDIT 0 c']) });
  T.push({
    name: 'e06_all_from_root',
    input: build(['EDIT 0 a', 'EDIT 0 b', 'EDIT 0 c', 'QUERY 1 1', 'QUERY 2 1', 'QUERY 3 1']),
  });
  T.push({
    name: 'e07_query_first_and_last',
    input: build(['EDIT 0 a', 'EDIT 1 b', 'EDIT 2 c', 'QUERY 3 1', 'QUERY 3 3']),
  });
  {
    // one long chain, then a query at every depth
    const ops = [];
    for (let i = 0; i < 30; i++) ops.push(`EDIT ${i} ${LET[i % 26]}`);
    for (let k = 1; k <= 30; k++) ops.push(`QUERY 30 ${k}`);
    T.push({ name: 'e08_chain_query_all_depths', input: build(ops) });
  }
  {
    // a wide star: 30 versions all branching off version 1
    const ops = ['EDIT 0 a'];
    for (let i = 0; i < 30; i++) ops.push(`EDIT 1 ${LET[i % 26]}`);
    for (let i = 2; i <= 31; i++) ops.push(`QUERY ${i} 2`);
    T.push({ name: 'e09_star_from_one', input: build(ops) });
  }

  // --- randoms -------------------------------------------------------
  // len[v] is the length of version v; version 0 has length 0 and is never
  // queried because k >= 1 requires a non-empty version.
  const randOps = (count, branchiness) => {
    const ops = [];
    const len = [0];
    for (let i = 0; i < count; i++) {
      const canQuery = len.length > 1;
      if (!canQuery || R.next() < 0.5) {
        // branch from a random existing version, biased towards the newest
        const v = R.next() < branchiness ? R.int(len.length) : len.length - 1;
        ops.push(`EDIT ${v} ${LET[R.int(26)]}`);
        len.push(len[v] + 1);
      } else {
        let v = 1 + R.int(len.length - 1);
        const k = 1 + R.int(len[v]);
        ops.push(`QUERY ${v} ${k}`);
      }
    }
    return ops;
  };

  for (let t = 0; t < 20; t++) {
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(randOps(5 + R.int(35), 0.6)) });
  }
  // chain-like: almost every edit extends the newest version
  for (let t = 0; t < 10; t++) {
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_chainish', input: build(randOps(10 + R.int(35), 0.05)) });
  }
  // bushy: almost every edit branches somewhere random
  for (let t = 0; t < 10; t++) {
    T.push({ name: 'b' + String(t + 1).padStart(2, '0') + '_bushy', input: build(randOps(10 + R.int(35), 1)) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(randOps(4000, 0.5)) });

  // --- maximum size --------------------------------------------------
  const Q = 200000;
  T.push({ name: 'x01_max_random', input: build(randOps(Q, 0.5)) });
  T.push({ name: 'x02_max_bushy', input: build(randOps(Q, 1)) });
  {
    // the worst case for walking up: build one chain of 100000, then query
    // position 1 of the deepest version 100000 times
    const half = Q / 2;
    const ops = [];
    for (let i = 0; i < half; i++) ops.push(`EDIT ${i} ${LET[i % 26]}`);
    for (let i = 0; i < Q - half; i++) ops.push(`QUERY ${half} 1`);
    T.push({ name: 'x03_max_deep_chain_query_root', input: build(ops) });
  }
  {
    // same chain but every query is at a random depth
    const half = Q / 2;
    const ops = [];
    for (let i = 0; i < half; i++) ops.push(`EDIT ${i} ${LET[i % 26]}`);
    for (let i = 0; i < Q - half; i++) ops.push(`QUERY ${half} ${1 + R.int(half)}`);
    T.push({ name: 'x04_max_deep_chain_random_depth', input: build(ops) });
  }
  {
    // every version branches straight off the root: depth is always 1
    const ops = [];
    const edits = Q / 2;
    for (let i = 0; i < edits; i++) ops.push(`EDIT 0 ${LET[i % 26]}`);
    for (let i = 0; i < Q - edits; i++) ops.push(`QUERY ${1 + R.int(edits)} 1`);
    T.push({ name: 'x05_max_flat_star', input: build(ops) });
  }
  {
    // a perfect binary tree of versions, depth about 17
    const ops = [];
    let created = 0;
    for (let i = 0; created < Q / 2; i++) {
      ops.push(`EDIT ${i >> 1} ${LET[created % 26]}`);
      created++;
    }
    for (let i = 0; ops.length < Q; i++) ops.push(`QUERY ${1 + R.int(created)} 1`);
    T.push({ name: 'x06_max_binary_tree', input: build(ops) });
  }
  {
    // all edits, no queries at all
    const ops = Array.from({ length: Q }, (_, i) => `EDIT ${i} ${LET[i % 26]}`);
    T.push({ name: 'x07_max_all_edits', input: build(ops) });
  }

  return T;
};
