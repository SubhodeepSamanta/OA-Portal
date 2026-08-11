'use strict';
// Test generator - c8 / Q61 Company Queries II (CSES 1688)
// The constraint e[i] <= i-1 is honoured everywhere. Small cases stay under
// ~120 employees so the brute's one-step-at-a-time climb is quick.
module.exports = function (R) {
  const T = [];
  const build = (n, par, qs) =>
    `${n} ${qs.length}\n` + par.join(' ') + '\n' + qs.map(([a, b]) => `${a} ${b}`).join('\n') + '\n';

  // par[j] is the boss of employee j+2, always <= j+1
  const randomTree = (n) => Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
  const chain = (n) => Array.from({ length: n - 1 }, (_, i) => i + 1);
  const star = (n) => Array(n - 1).fill(1);
  const balanced = (n) => Array.from({ length: n - 1 }, (_, i) => Math.floor(i / 2) + 1);

  const randQueries = (n, m) => Array.from({ length: m }, () => [1 + R.int(n), 1 + R.int(n)]);

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 3\n1 1 3 3\n4 5\n2 5\n1 4\n' });
  T.push({ name: 'e02_single_employee', input: '1 1\n\n1 1\n' });
  T.push({ name: 'e03_two_employees', input: '2 3\n1\n1 2\n2 2\n1 1\n' });
  T.push({ name: 'e04_chain_deep_pair', input: build(8, chain(8), [[8, 1], [8, 8], [5, 7], [2, 8]]) });
  T.push({ name: 'e05_star', input: build(8, star(8), [[2, 3], [1, 5], [7, 7]]) });
  T.push({ name: 'e06_balanced', input: build(15, balanced(15), [[8, 15], [8, 9], [4, 5], [1, 15]]) });
  T.push({ name: 'e07_self_queries', input: build(6, chain(6), [[1, 1], [3, 3], [6, 6]]) });
  T.push({ name: 'e08_root_involved', input: build(6, randomTree(6), [[1, 6], [6, 1], [1, 1]]) });
  T.push({ name: 'e09_siblings', input: build(7, [1, 1, 2, 2, 3, 3], [[4, 5], [6, 7], [4, 7], [4, 4]]) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(80), m = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: n === 1 ? `1 ${m}\n\n` + Array.from({ length: m }, () => '1 1').join('\n') + '\n'
                     : build(n, randomTree(n), randQueries(n, m)),
    });
  }
  // deep chains - the shape that makes the naive climb expensive
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(80), m = 1 + R.int(50);
    T.push({ name: 'c' + String(i + 1).padStart(2, '0') + '_chain', input: build(n, chain(n), randQueries(n, m)) });
  }
  // shallow and wide
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(80), m = 1 + R.int(50);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_shallow',
      input: build(n, Array.from({ length: n - 1 }, (_, j) => 1 + R.int(Math.min(3, j + 1))), randQueries(n, m)),
    });
  }
  for (let i = 0; i < 6; i++) {
    const n = 3 + R.int(80), m = 1 + R.int(50);
    T.push({ name: 'b' + String(i + 1).padStart(2, '0') + '_balanced', input: build(n, balanced(n), randQueries(n, m)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  T.push({ name: 'x01_max_random', input: build(N, randomTree(N), randQueries(N, Q)) });
  T.push({
    // 200000-deep chain with queries spanning it end to end: the case where
    // one step at a time is 4e10 operations
    name: 'x02_max_chain',
    input: build(N, chain(N), Array.from({ length: Q }, () => [1 + R.int(N), 1 + R.int(N)])),
  });
  T.push({
    name: 'x03_max_chain_worst_pairs',
    input: build(N, chain(N), Array.from({ length: Q }, (_, i) => [N - (i % 2), 1 + (i % 3)])),
  });
  T.push({ name: 'x04_max_star', input: build(N, star(N), randQueries(N, Q)) });
  T.push({ name: 'x05_max_balanced', input: build(N, balanced(N), randQueries(N, Q)) });
  T.push({
    // every query on the same node - checks the a == b short circuit
    name: 'x06_max_self_queries',
    input: build(N, randomTree(N), Array.from({ length: Q }, (_, i) => [1 + (i % N), 1 + (i % N)])),
  });

  return T;
};
