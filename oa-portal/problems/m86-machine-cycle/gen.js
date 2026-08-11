'use strict';
// Test generator - m86 / Q207 Machine Cycle
// Small cases keep T small so the brute steps rather than lifts; the big
// ones use the lifting path.
module.exports = function (R) {
  const T = [];
  const build = (s, t, f) => `${f.length} ${s} ${t}\n${f.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_ring', input: build(0, 5, [1, 2, 0]) });
  T.push({ name: 'e02_self_loop', input: build(0, '1000000000000000000', [0]) });
  T.push({ name: 'e03_tail_then_cycle', input: build(0, '1000000000000000000', [1, 2, 3, 4, 2]) });
  T.push({ name: 'e04_zero_seconds', input: build(3, 0, [1, 2, 3, 4, 0]) });
  T.push({ name: 'e05_inside_tail', input: build(0, 3, [1, 2, 3, 3]) });
  T.push({ name: 'e06_all_to_zero', input: build(4, '999999999999999999', [0, 0, 0, 0, 0]) });
  T.push({ name: 'e07_identity', input: build(2, '1000000000000000000', [0, 1, 2, 3]) });
  T.push({ name: 'e08_two_cycle', input: build(0, '1000000000000000000', [1, 0]) });
  T.push({ name: 'e09_two_cycle_odd_t', input: build(0, '999999999999999999', [1, 0]) });
  T.push({ name: 'e10_long_tail_short_cycle', input: build(0, '1000000000000000000', [1, 2, 3, 4, 5, 6, 6]) });
  T.push({ name: 'e11_start_inside_cycle', input: build(4, '1000000000000000000', [1, 2, 3, 4, 2]) });

  // --- small randoms (stepping brute) -------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(R.int(n), R.int(200), Array.from({ length: n }, () => R.int(n))),
    });
  }
  // pure permutations, so every state lies on a cycle
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(20);
    const perm = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) { const j = R.int(i + 1); const x = perm[i]; perm[i] = perm[j]; perm[j] = x; }
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_permutation', input: build(R.int(n), R.int(500), perm) });
  }
  // long tails into a short cycle
  for (let t = 0; t < 10; t++) {
    const n = 5 + R.int(25);
    const f = Array.from({ length: n }, (_, i) => (i + 1 < n ? i + 1 : n - 2));
    T.push({ name: 'l' + String(t + 1).padStart(2, '0') + '_long_tail', input: build(0, R.int(400), f) });
  }

  // --- larger (binary-lifting brute path) ----------------------------
  for (let t = 0; t < 10; t++) {
    const n = 5 + R.int(40);
    T.push({
      name: 'y' + String(t + 1).padStart(2, '0') + '_large_t',
      input: build(R.int(n), String(BigInt(1 + R.int(1000000000)) * 1000000000n), Array.from({ length: n }, () => R.int(n))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(0, '1000000000000000000', Array.from({ length: N }, () => R.int(N))),
  });
  T.push({
    // one enormous cycle covering every state
    name: 'x02_max_single_cycle',
    input: build(0, '1000000000000000000', Array.from({ length: N }, (_, i) => (i + 1) % N)),
  });
  T.push({
    // the longest possible tail, ending in a self loop
    name: 'x03_max_long_tail',
    input: build(0, '1000000000000000000', Array.from({ length: N }, (_, i) => (i + 1 < N ? i + 1 : N - 1))),
  });
  T.push({
    // every state maps to itself
    name: 'x04_max_all_self',
    input: build(12345, '1000000000000000000', Array.from({ length: N }, (_, i) => i)),
  });
  T.push({
    // T smaller than the tail, so no folding happens
    name: 'x05_max_inside_tail',
    input: build(0, 100000, Array.from({ length: N }, (_, i) => (i + 1 < N ? i + 1 : 0))),
  });
  T.push({
    // T is exactly zero at full size
    name: 'x06_max_zero_t',
    input: build(199999, 0, Array.from({ length: N }, () => R.int(N))),
  });
  T.push({
    // a long tail feeding a two-state cycle, so parity of T decides
    name: 'x07_max_tail_two_cycle',
    input: build(0, '999999999999999999', Array.from({ length: N }, (_, i) => (i + 2 < N ? i + 1 : (i === N - 2 ? N - 1 : N - 2)))),
  });

  return T;
};
