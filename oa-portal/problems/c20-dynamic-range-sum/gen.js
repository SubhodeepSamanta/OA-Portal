'use strict';
// Test generator - c20 / Q114 Dynamic Range Sum Queries (CSES 1648)
// Small cases keep n*q modest so the O(n) per query brute stays quick.
// Maximum values are everywhere on purpose: this problem is an overflow trap.
module.exports = function (R) {
  const T = [];
  const MAXV = 1000000000;
  const build = (x, ops) =>
    `${x.length} ${ops.length}\n${x.join(' ')}\n` + ops.join('\n') + '\n';

  const mixedOps = (n, cnt, maxU) => Array.from({ length: cnt }, () => {
    if (R.int(2) === 0) return `1 ${1 + R.int(n)} ${1 + R.int(maxU)}`;
    let a = 1 + R.int(n), b = 1 + R.int(n);
    if (a > b) { const t = a; a = b; b = t; }
    return `2 ${a} ${b}`;
  });

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '8 4\n3 2 4 5 1 1 5 3\n2 1 4\n2 5 6\n1 3 1\n2 1 4\n' });
  T.push({ name: 'e02_single_element', input: '1 3\n5\n2 1 1\n1 1 9\n2 1 1\n' });
  // the update SETS - a solution that adds instead gets this wrong immediately
  T.push({ name: 'e03_set_not_add', input: '3 4\n10 10 10\n2 1 3\n1 2 1\n2 1 3\n2 2 2\n' });
  T.push({ name: 'e04_whole_range_max', input: '4 2\n1000000000 1000000000 1000000000 1000000000\n2 1 4\n2 1 1\n' });
  T.push({ name: 'e05_repeated_updates_same_cell', input: '3 5\n1 1 1\n1 2 5\n1 2 7\n1 2 2\n2 1 3\n2 2 2\n' });
  T.push({ name: 'e06_only_queries', input: '5 3\n1 2 3 4 5\n2 1 5\n2 3 3\n2 2 4\n' });
  T.push({ name: 'e07_only_updates', input: '3 3\n1 2 3\n1 1 9\n1 2 9\n1 3 9\n' });
  T.push({ name: 'e08_set_to_same_value', input: '3 3\n4 4 4\n1 2 4\n2 1 3\n2 2 2\n' });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(60), q = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), mixedOps(n, q, MAXV)),
    });
  }
  // update-heavy
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(40), q = 2 + R.int(50);
    const ops = Array.from({ length: q }, (_, j) =>
      (j % 4 === 3 ? `2 1 ${n}` : `1 ${1 + R.int(n)} ${1 + R.int(MAXV)}`));
    T.push({ name: 'u' + String(i + 1).padStart(2, '0') + '_update_heavy', input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), ops) });
  }
  // small values, so answers stay tiny and any wrong index shows up plainly
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(40), q = 2 + R.int(40);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_small_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(5)), mixedOps(n, q, 5)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  const maxArr = () => Array.from({ length: N }, () => 1 + R.int(MAXV));
  T.push({ name: 'x01_max_random', input: build(maxArr(), mixedOps(N, Q, MAXV)) });
  T.push({
    // every value at the maximum and every query the whole array: the sum is
    // 2e14, which a 32-bit tree cannot hold
    name: 'x02_max_overflow',
    input: build(Array(N).fill(MAXV), Array.from({ length: Q }, () => `2 1 ${N}`)),
  });
  T.push({
    name: 'x03_max_all_updates',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `1 ${1 + (i % N)} ${MAXV}`)),
  });
  T.push({
    // alternating set-then-query on the full range
    name: 'x04_max_alternating',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) =>
      (i % 2 === 0 ? `1 ${1 + (i % N)} ${1 + R.int(MAXV)}` : `2 1 ${N}`))),
  });
  T.push({
    name: 'x05_max_single_cells',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `2 ${1 + (i % N)} ${1 + (i % N)}`)),
  });

  return T;
};
