'use strict';
// Test generator - m39 / Q118 Live Leaderboard
module.exports = function (R) {
  const T = [];
  const build = (n, ops) => `${n} ${ops.length}\n${ops.join('\n')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(3, ['RANK 1', 'UPDATE 1 10', 'RANK 2', 'RANK 1', 'UPDATE 2 20']) });
  T.push({ name: 'e02_ties_not_counted', input: build(2, ['UPDATE 1 5', 'UPDATE 2 5', 'RANK 1']) });
  T.push({ name: 'e03_two_above', input: build(4, ['UPDATE 1 100', 'UPDATE 2 50', 'UPDATE 3 100', 'RANK 2']) });
  T.push({ name: 'e04_single_player', input: build(1, ['RANK 1']) });
  T.push({ name: 'e05_all_start_equal', input: build(5, ['RANK 1', 'RANK 3', 'RANK 5']) });
  T.push({ name: 'e06_set_same_score_twice', input: build(3, ['UPDATE 1 7', 'UPDATE 1 7', 'RANK 2', 'RANK 1']) });
  T.push({ name: 'e07_score_drops_back_to_zero', input: build(3, ['UPDATE 1 9', 'RANK 2', 'UPDATE 1 0', 'RANK 2']) });
  T.push({ name: 'e08_max_score', input: build(3, ['UPDATE 1 1000000000', 'RANK 2', 'RANK 1']) });
  T.push({ name: 'e09_only_updates', input: build(3, ['UPDATE 1 1', 'UPDATE 2 2', 'UPDATE 3 3']) });
  T.push({ name: 'e10_only_ranks', input: build(4, ['RANK 1', 'RANK 2', 'RANK 3', 'RANK 4']) });
  T.push({
    name: 'e11_strict_ladder',
    input: build(4, ['UPDATE 1 1', 'UPDATE 2 2', 'UPDATE 3 3', 'UPDATE 4 4', 'RANK 1', 'RANK 2', 'RANK 3', 'RANK 4']),
  });

  // --- small randoms (stress-compared against brute) -----------------
  const randOps = (n, k, maxS) =>
    Array.from({ length: k }, () =>
      R.next() < 0.5 ? `UPDATE ${1 + R.int(n)} ${R.int(maxS + 1)}` : `RANK ${1 + R.int(n)}`);

  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(10);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, randOps(n, 5 + R.int(30), 20)),
    });
  }
  // a tiny score alphabet: ties everywhere
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(8);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_many_ties',
      input: build(n, randOps(n, 10 + R.int(25), 2)),
    });
  }
  // rank-heavy streams
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(8);
    const ops = Array.from({ length: 12 + R.int(25) }, () =>
      R.next() < 0.75 ? `RANK ${1 + R.int(n)}` : `UPDATE ${1 + R.int(n)} ${R.int(15)}`);
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_rank_heavy', input: build(n, ops) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(2000, randOps(2000, 4000, 1000000)) });

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  T.push({ name: 'x01_max_random', input: build(N, randOps(N, Q, 1000000000)) });
  {
    // every event is a RANK: nothing ever moves, but the count must be fast
    const ops = Array.from({ length: Q }, () => `RANK ${1 + R.int(N)}`);
    T.push({ name: 'x02_max_all_ranks', input: build(N, ops) });
  }
  {
    // every event is an UPDATE: no output at all
    const ops = Array.from({ length: Q }, () => `UPDATE ${1 + R.int(N)} ${R.int(1000000001)}`);
    T.push({ name: 'x03_max_all_updates', input: build(N, ops) });
  }
  {
    // one player climbs while everyone else is asked about
    const ops = [];
    for (let i = 0; i < Q; i++)
      ops.push(i % 2 === 0 ? `UPDATE 1 ${i}` : `RANK ${1 + R.int(N)}`);
    T.push({ name: 'x04_max_one_climber', input: build(N, ops) });
  }
  {
    // only two distinct scores: compression collapses to almost nothing
    const ops = Array.from({ length: Q }, () =>
      R.next() < 0.5 ? `UPDATE ${1 + R.int(N)} ${R.int(2)}` : `RANK ${1 + R.int(N)}`);
    T.push({ name: 'x05_max_two_scores', input: build(N, ops) });
  }
  {
    // every UPDATE is a distinct score: the compressed axis is as wide as it gets
    const ops = [];
    for (let i = 0; i < Q; i++)
      ops.push(i % 2 === 0 ? `UPDATE ${1 + R.int(N)} ${i + 1}` : `RANK ${1 + R.int(N)}`);
    T.push({ name: 'x06_max_all_distinct_scores', input: build(N, ops) });
  }
  {
    // one player, hammered
    const ops = Array.from({ length: Q }, (_, i) =>
      i % 2 === 0 ? `UPDATE 1 ${R.int(1000000001)}` : 'RANK 1');
    T.push({ name: 'x07_max_single_player', input: build(1, ops) });
  }

  return T;
};
