'use strict';
// Test generator - m91 / Q212 Duplicate Detector
// Every case is built so that exactly one value repeats, as the statement
// promises: pick the duplicate and its multiplicity, then fill the rest with
// distinct values drawn from what is left.
module.exports = function (R) {
  const T = [];
  const build = (n, arr) => `${n}\n${arr.join(' ')}\n`;

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = R.int(i + 1);
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  };

  // n values in 1..n, one of them repeated `mult` times (mult >= 2),
  // the remaining slots filled with distinct other values.
  const make = (n, dup, mult) => {
    const arr = [];
    for (let i = 0; i < mult; i++) arr.push(dup);
    const pool = [];
    for (let v = 1; v <= n; v++) if (v !== dup) pool.push(v);
    shuffle(pool);
    const need = n + 1 - mult;
    for (let i = 0; i < need; i++) arr.push(pool[i]);
    return build(n, shuffle(arr));
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_basic', input: build(4, [1, 3, 4, 2, 2]) });
  T.push({ name: 'e02_smallest', input: build(1, [1, 1]) });
  T.push({ name: 'e03_triple', input: build(3, [3, 1, 3, 3]) });
  T.push({ name: 'e04_dup_at_end', input: build(5, [1, 2, 3, 4, 5, 3]) });
  T.push({ name: 'e05_all_same', input: build(3, [2, 2, 2, 2]) });
  T.push({ name: 'e06_dup_is_one', input: build(4, [1, 1, 2, 3, 4]) });
  T.push({ name: 'e07_dup_is_n', input: build(4, [4, 4, 1, 2, 3]) });
  T.push({ name: 'e08_adjacent', input: build(5, [1, 2, 2, 3, 4, 5]) });
  T.push({ name: 'e09_far_apart', input: build(6, [3, 1, 2, 4, 5, 6, 3] ) });
  T.push({ name: 'e10_two_values', input: build(2, [1, 2, 1]) });
  T.push({ name: 'e11_long_tail', input: build(8, [8, 7, 6, 5, 4, 3, 2, 1, 5]) });
  T.push({ name: 'e12_all_same_max_mult', input: build(2, [1, 1, 1]) });

  // --- small randoms -------------------------------------------------
  for (let t = 0; t < 24; t++) {
    const n = 1 + R.int(40);
    const dup = 1 + R.int(n);
    const mult = 2 + R.int(n);          // between 2 and n+1
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: make(n, dup, mult) });
  }
  // exactly-twice cases, which is the shape most people picture
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(60);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_exactly_twice', input: make(n, 1 + R.int(n), 2) });
  }
  // heavy multiplicity: the duplicate fills most of the log
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(50);
    T.push({ name: 'h' + String(t + 1).padStart(2, '0') + '_heavy_dup', input: make(n, 1 + R.int(n), n) });
  }

  // --- maximum size --------------------------------------------------
  // Two cases at the full 5e5 - a random one and the longest-possible tail,
  // which are what actually stress the time limit. The rest make their point
  // at 1.2e5 and keep this problem's test data to a sane size on disk.
  const N = 500000;
  const M = 120000;

  T.push({ name: 'x01_max_twice', input: make(N, 1 + R.int(N), 2) });
  T.push({
    // sorted, so the walk from index 0 has the longest possible tail
    // before it reaches the cycle
    name: 'x02_max_sorted',
    input: (() => {
      const arr = [];
      for (let v = 1; v <= N; v++) arr.push(v);
      arr.push(N);
      return build(N, arr);
    })(),
  });

  T.push({ name: 'x03_heavy', input: make(M, 1 + R.int(M), M + 1) });
  T.push({ name: 'x04_dup_is_one', input: make(M, 1, 2) });
  T.push({ name: 'x05_dup_is_n', input: make(M, M, 2) });
  T.push({
    // identity mapping except one slot - the shortest possible cycle
    name: 'x06_identity_shift',
    input: (() => {
      const arr = [];
      for (let v = 1; v <= M; v++) arr.push(v);
      arr.push(1);
      return build(M, arr);
    })(),
  });
  T.push({ name: 'x07_random_mult', input: make(M, 1 + R.int(M), 2 + R.int(1000)) });

  return T;
};
