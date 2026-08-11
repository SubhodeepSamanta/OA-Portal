'use strict';
// Test generator - c6 / Q59 Subordinates (CSES 1674)
// Small cases stay under ~150 employees for the O(n^2) brute. Shapes matter
// more than values here: a deep chain is what breaks a recursive solution.
module.exports = function (R) {
  const T = [];
  const build = (par) => `${par.length + 1}\n${par.join(' ')}\n`;   // par[i] = boss of employee i+2

  // random tree with each boss chosen from the employees already placed
  const randomTree = (n) => Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
  const chain = (n) => Array.from({ length: n - 1 }, (_, i) => i + 1);
  const star = (n) => Array(n - 1).fill(1);

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([1, 1, 2, 3]) });
  T.push({ name: 'e02_single_employee', input: '1\n\n' });
  T.push({ name: 'e03_two_employees', input: build([1]) });
  T.push({ name: 'e04_star', input: build(star(8)) });
  T.push({ name: 'e05_chain', input: build(chain(8)) });
  T.push({ name: 'e06_binary_tree', input: build([1, 1, 2, 2, 3, 3]) });
  T.push({ name: 'e07_two_branches', input: build([1, 1, 2, 3, 4, 5]) });
  T.push({ name: 'e08_deep_then_wide', input: build([1, 2, 3, 4, 4, 4, 4]) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(100);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: n === 1 ? '1\n\n' : build(randomTree(n)),
    });
  }
  // Shallow: almost everyone reports to the director.
  //
  // The boss of employee j+2 has to be an employee that already exists, so the
  // pick must be capped by j+1. Drawing freely from {1,2,3} instead lets
  // employee 2 report to 3 while 3 reports to 2 - a cycle, not a tree, which
  // sends anything that climbs parent links into an infinite loop.
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(100);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_shallow',
      input: build(Array.from({ length: n - 1 }, (_, j) => 1 + R.int(Math.min(3, j + 1)))),
    });
  }
  // deep: long chains with occasional branching
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(100);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_deep',
      input: build(Array.from({ length: n - 1 }, (_, j) => Math.max(1, j + 1 - R.int(2)))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(randomTree(N)) });
  T.push({
    // one 200000-deep chain: this is what kills a recursive DFS
    name: 'x02_max_chain',
    input: build(chain(N)),
  });
  T.push({ name: 'x03_max_star', input: build(star(N)) });
  T.push({
    // balanced binary tree: shallow but every node has children
    name: 'x04_max_binary',
    input: build(Array.from({ length: N - 1 }, (_, i) => Math.floor(i / 2) + 1)),
  });
  T.push({
    // caterpillar: a long spine with a leaf hanging off each vertebra
    name: 'x05_max_caterpillar',
    input: build(Array.from({ length: N - 1 }, (_, i) => (i % 2 === 0 ? Math.max(1, i) : i))),
  });

  return T;
};
