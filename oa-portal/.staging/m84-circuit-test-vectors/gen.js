'use strict';
// Test generator - m84 / Q204 Circuit Test Vectors
// Small cases keep n <= 18 because the brute enumerates all 2^n assignments.
module.exports = function (R) {
  const T = [];
  const build = (n, cons) =>
    `${n} ${cons.length}\n` + (cons.length ? cons.map((c) => c.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_chain_of_differs', input: build(3, [[1, 2, 1], [2, 3, 1]]) });
  T.push({ name: 'e02_odd_cycle', input: build(3, [[1, 2, 1], [2, 3, 1], [1, 3, 1]]) });
  T.push({ name: 'e03_no_constraints', input: build(3, []) });
  T.push({ name: 'e04_single_equal', input: build(2, [[1, 2, 0]]) });
  T.push({ name: 'e05_self_equal', input: build(2, [[1, 1, 0]]) });
  T.push({ name: 'e06_self_differ', input: build(2, [[1, 1, 1]]) });
  T.push({ name: 'e07_repeated_consistent', input: build(2, [[1, 2, 1], [1, 2, 1], [1, 2, 1]]) });
  T.push({ name: 'e08_repeated_contradictory', input: build(2, [[1, 2, 1], [1, 2, 0]]) });
  T.push({ name: 'e09_single_input', input: build(1, []) });
  T.push({ name: 'e10_even_cycle', input: build(4, [[1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 1, 1]]) });
  T.push({ name: 'e11_two_components', input: build(4, [[1, 2, 0], [3, 4, 1]]) });
  T.push({ name: 'e12_all_equal', input: build(5, [[1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 5, 0]]) });

  // --- small randoms (2^n brute) ------------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(12);
    const m = R.int(14);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, Array.from({ length: m }, () => [1 + R.int(n), 1 + R.int(n), R.int(2)])),
    });
  }
  // consistent by construction: pick a hidden assignment and derive constraints
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(10);
    const truth = Array.from({ length: n }, () => R.int(2));
    const m = 1 + R.int(14);
    const cons = Array.from({ length: m }, () => {
      const a = 1 + R.int(n), b = 1 + R.int(n);
      return [a, b, truth[a - 1] ^ truth[b - 1]];
    });
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_consistent', input: build(n, cons) });
  }
  // dense small graphs, usually contradictory
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(6);
    const cons = [];
    for (let a = 1; a <= n; a++)
      for (let b = a + 1; b <= n; b++) if (R.next() < 0.5) cons.push([a, b, R.int(2)]);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dense_small', input: build(n, cons) });
  }
  // pure chains, always consistent
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(12);
    const cons = Array.from({ length: n - 1 }, (_, i) => [i + 1, i + 2, R.int(2)]);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_chain', input: build(n, cons) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000;
    const cons = Array.from({ length: 6000 }, () => [1 + R.int(n), 1 + R.int(n), R.int(2)]);
    T.push({ name: 'z01_medium', input: build(n, cons) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(N, Array.from({ length: M }, () => [1 + R.int(N), 1 + R.int(N), R.int(2)])),
  });
  {
    // consistent by construction at full size
    const truth = Array.from({ length: N }, () => R.int(2));
    const cons = Array.from({ length: M }, () => {
      const a = 1 + R.int(N), b = 1 + R.int(N);
      return [a, b, truth[a - 1] ^ truth[b - 1]];
    });
    T.push({ name: 'x02_max_consistent', input: build(N, cons) });
  }
  T.push({ name: 'x03_max_no_constraints', input: build(N, []) });
  {
    // one long chain: a single group, so the answer is 2
    const cons = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, i % 2]);
    T.push({ name: 'x04_max_single_chain', input: build(N, cons) });
  }
  {
    // a chain plus one contradicting edge at the very end
    const cons = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 1]);
    cons.push([1, N, (N - 1) % 2 === 0 ? 1 : 0]);
    T.push({ name: 'x05_max_late_contradiction', input: build(N, cons) });
  }
  {
    // a deep path built to stress parity compression
    const cons = [];
    for (let i = 1; i < N; i++) cons.push([i, i + 1, 1]);
    while (cons.length < M) cons.push([1, 1 + R.int(N), R.int(2)]);
    T.push({ name: 'x06_max_deep_compression', input: build(N, cons.slice(0, M)) });
  }
  {
    // every constraint is a self-loop of type 0, which is vacuous
    const cons = Array.from({ length: M }, (_, i) => [1 + (i % N), 1 + (i % N), 0]);
    T.push({ name: 'x07_max_self_loops', input: build(N, cons) });
  }

  return T;
};
