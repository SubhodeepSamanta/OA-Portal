'use strict';
// Test generator - c15 / Q85 Planets Queries I (CSES 1750)
// Small cases keep k modest so the brute can walk step by step; a few tiny
// cases carry k = 1e9 on purpose, which is exactly the shape that used to
// hang builds before the brute grew its tail-and-cycle fallback.
module.exports = function (R) {
  const T = [];
  const build = (t, qs) =>
    `${t.length} ${qs.length}\n` + t.join(' ') + '\n' + qs.map(([x, k]) => `${x} ${k}`).join('\n') + '\n';

  const randomT = (n) => Array.from({ length: n }, () => 1 + R.int(n));
  const qs = (n, m, maxK) => Array.from({ length: m }, () => [1 + R.int(n), R.int(maxK + 1)]);

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '4 3\n2 1 1 4\n1 2\n3 4\n4 1\n' });
  T.push({ name: 'e02_single_planet', input: '1 3\n1\n1 0\n1 1\n1 1000000000\n' });
  T.push({ name: 'e03_zero_teleports', input: '3 3\n2 3 1\n1 0\n2 0\n3 0\n' });
  T.push({ name: 'e04_all_self_loops', input: '4 4\n1 2 3 4\n1 5\n2 1000000000\n3 0\n4 7\n' });
  T.push({ name: 'e05_one_big_cycle', input: '5 4\n2 3 4 5 1\n1 5\n1 6\n1 1000000000\n3 999999999\n' });
  T.push({ name: 'e06_long_tail_into_loop', input: '5 4\n2 3 4 5 5\n1 1\n1 4\n1 1000000000\n2 3\n' });
  T.push({ name: 'e07_two_cycle', input: '2 4\n2 1\n1 1\n1 2\n1 999999999\n2 1000000000\n' });
  T.push({ name: 'e08_max_k_everywhere', input: '3 3\n2 3 1\n1 1000000000\n2 1000000000\n3 1000000000\n' });

  // --- small randoms, small k (brute walks) --------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(40), m = 1 + R.int(30);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(randomT(n), qs(n, m, 500)),
    });
  }
  // small graphs but enormous k - the tail-and-cycle path in the brute
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(30), m = 1 + R.int(20);
    T.push({
      name: 'k' + String(i + 1).padStart(2, '0') + '_huge_k',
      input: build(randomT(n), qs(n, m, 1000000000)),
    });
  }
  // pure cycles, where the answer is entirely k mod cycleLen
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(30);
    const t = Array.from({ length: n }, (_, j) => (j + 2 > n ? 1 : j + 2));
    T.push({
      name: 'c' + String(i + 1).padStart(2, '0') + '_pure_cycle',
      input: build(t, qs(n, 1 + R.int(20), 1000000000)),
    });
  }
  // long tail then a self loop
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(30);
    const t = Array.from({ length: n }, (_, j) => (j + 2 > n ? n : j + 2));
    T.push({
      name: 'l' + String(i + 1).padStart(2, '0') + '_tail_to_loop',
      input: build(t, qs(n, 1 + R.int(20), 1000000000)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  T.push({ name: 'x01_max_random', input: build(randomT(N), qs(N, Q, 1000000000)) });
  T.push({
    // one 200000-long cycle with maximum k on every query
    name: 'x02_max_one_cycle',
    input: build(Array.from({ length: N }, (_, j) => (j + 2 > N ? 1 : j + 2)),
                 Array.from({ length: Q }, (_, i) => [1 + (i % N), 1000000000])),
  });
  T.push({
    // a 200000-long tail ending in a self loop - the longest possible walk
    name: 'x03_max_long_tail',
    input: build(Array.from({ length: N }, (_, j) => (j + 2 > N ? N : j + 2)),
                 Array.from({ length: Q }, (_, i) => [1 + (i % N), 1000000000])),
  });
  T.push({
    name: 'x04_max_all_self_loops',
    input: build(Array.from({ length: N }, (_, j) => j + 1), qs(N, Q, 1000000000)),
  });
  T.push({
    // every k = 0, so the answer is always the starting planet
    name: 'x05_max_zero_k',
    input: build(randomT(N), Array.from({ length: Q }, (_, i) => [1 + (i % N), 0])),
  });
  T.push({
    // many small cycles: 100000 two-cycles
    name: 'x06_max_two_cycles',
    input: build(Array.from({ length: N }, (_, j) => (j % 2 === 0 ? j + 2 : j)),
                 qs(N, Q, 1000000000)),
  });

  return T;
};
