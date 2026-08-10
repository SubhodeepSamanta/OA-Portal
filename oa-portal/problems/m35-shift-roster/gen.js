'use strict';
// Test generator - m35 / Q78 Shift Roster
// Tiny cases stay at m <= 8 so brute.cpp runs its exhaustive mode.
module.exports = function (R) {
  const T = [];
  const build = (n, m, pairs) =>
    `${n} ${m} ${pairs.length}\n` + (pairs.length ? pairs.map((x) => x.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(3, 3, [[1, 1], [1, 2], [2, 2], [3, 3]]) });
  T.push({ name: 'e02_sample2_too_few_staff', input: build(2, 3, [[1, 1], [1, 2], [2, 3]]) });
  T.push({ name: 'e03_sample3_needs_augment', input: build(3, 3, [[1, 1], [2, 1], [2, 2], [3, 3]]) });
  T.push({ name: 'e04_sample4_orphan_shift', input: build(3, 2, [[1, 1], [2, 1]]) });
  T.push({ name: 'e05_no_pairs', input: build(5, 1, []) });
  T.push({ name: 'e06_one_each', input: build(1, 1, [[1, 1]]) });
  T.push({ name: 'e07_duplicates_only', input: build(2, 2, [[1, 1], [1, 1], [1, 1], [2, 2], [2, 2]]) });
  T.push({ name: 'e08_everyone_can_do_everything', input: build(4, 4, [1, 2, 3, 4].flatMap((a) => [1, 2, 3, 4].map((b) => [a, b]))) });
  T.push({ name: 'e09_one_person_many_shifts', input: build(3, 3, [[1, 1], [1, 2], [1, 3]]) });
  T.push({ name: 'e10_perfect_chain', input: build(5, 5, Array.from({ length: 5 }, (_, i) => [i + 1, i + 1])) });
  T.push({
    // long displacement chain: every shift but the last is contested
    name: 'e11_long_augment_chain',
    input: build(6, 6, [[1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [4, 3], [4, 4], [5, 4], [5, 5], [6, 5], [6, 6]]),
  });
  T.push({ name: 'e12_more_staff_than_shifts', input: build(8, 3, [[7, 1], [8, 2], [1, 3]]) });

  // --- tiny randoms (exhaustive brute) ------------------------------
  const randPairs = (n, m, density) => {
    const out = [];
    for (let a = 1; a <= n; a++)
      for (let b = 1; b <= m; b++)
        if (R.next() < density) out.push([a, b]);
    return out;
  };
  for (let t = 0; t < 24; t++) {
    const n = 1 + R.int(8);
    const m = 1 + R.int(Math.min(8, n + 1));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: build(n, m, randPairs(n, m, 0.15 + R.next() * 0.5)),
    });
  }
  // sparse: mostly NO
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    const m = 2 + R.int(6);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_sparse_tiny',
      input: build(n, m, randPairs(n, m, 0.12)),
    });
  }
  // dense square: mostly YES
  for (let t = 0; t < 10; t++) {
    const k = 2 + R.int(6);
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_dense_square',
      input: build(k, k, randPairs(k, k, 0.6)),
    });
  }
  // with duplicates deliberately mixed in
  for (let t = 0; t < 8; t++) {
    const k = 2 + R.int(5);
    const base = randPairs(k, k, 0.4);
    const dup = base.concat(base.slice(0, R.int(base.length + 1)));
    T.push({ name: 'u' + String(t + 1).padStart(2, '0') + '_with_duplicates', input: build(k, k, dup) });
  }

  // --- medium (BFS-augmenting brute) --------------------------------
  {
    const n = 60, m = 60;
    const pr = [];
    for (let a = 1; a <= n; a++) for (let b = 1; b <= m; b++) if (R.next() < 0.08) pr.push([a, b]);
    T.push({ name: 'm01_medium_sparse', input: build(n, m, pr) });
  }
  {
    const n = 60, m = 60;
    const pr = Array.from({ length: n }, (_, i) => [i + 1, i + 1]);
    for (let i = 0; i < 400; i++) pr.push([1 + R.int(n), 1 + R.int(m)]);
    T.push({ name: 'm02_medium_perfect_plus_noise', input: build(n, m, pr) });
  }

  // --- maximum size --------------------------------------------------
  const N = 500, M = 500, P = 100000;
  {
    // exactly one perfect roster hidden in a wall of noise
    const pr = Array.from({ length: M }, (_, i) => [i + 1, i + 1]);
    while (pr.length < P) pr.push([1 + R.int(N), 1 + R.int(M)]);
    T.push({ name: 'x01_max_perfect_in_noise', input: build(N, M, pr.slice(0, P)) });
  }
  {
    // everybody can work everything: 250000 pairs, trivially YES
    const pr = [];
    for (let a = 1; a <= N && pr.length < P; a++)
      for (let b = 1; b <= M && pr.length < P; b++) pr.push([a, b]);
    T.push({ name: 'x02_max_complete', input: build(N, M, pr) });
  }
  {
    // one shift nobody will take, buried among 100000 pairs
    const pr = [];
    while (pr.length < P) { const b = 1 + R.int(M - 1); pr.push([1 + R.int(N), b]); }
    T.push({ name: 'x03_max_one_orphan_shift', input: build(N, M, pr) });
  }
  {
    // the worst shape for augmenting search: a long staircase of displacements
    const pr = [];
    for (let i = 1; i <= M; i++) {
      pr.push([i, i]);
      if (i + 1 <= N) pr.push([i + 1, i]);
    }
    while (pr.length < P) pr.push([1 + R.int(N), 1 + R.int(M)]);
    T.push({ name: 'x04_max_staircase', input: build(N, M, pr.slice(0, P)) });
  }
  {
    // dense but structurally impossible: 300 shifts share only 299 willing staff
    const pr = [];
    for (let b = 1; b <= 300; b++)
      for (let a = 1; a <= 299; a++) pr.push([a, b]);
    for (let b = 301; b <= M; b++) pr.push([300 + (b % 200), b]);
    T.push({ name: 'x05_max_hall_violation', input: build(N, M, pr.slice(0, P)) });
  }
  {
    // more shifts than staff at full size: the counting check alone settles it
    const pr = [];
    while (pr.length < 50000) pr.push([1 + R.int(400), 1 + R.int(M)]);
    T.push({ name: 'x06_max_more_shifts_than_staff', input: build(400, M, pr) });
  }
  {
    // every pair duplicated many times
    const pr = [];
    for (let i = 1; i <= M && pr.length < P; i++)
      for (let k = 0; k < 200 && pr.length < P; k++) pr.push([i, i]);
    T.push({ name: 'x07_max_all_duplicates', input: build(N, M, pr) });
  }

  return T;
};
