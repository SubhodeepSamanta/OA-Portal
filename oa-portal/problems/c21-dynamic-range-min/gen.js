'use strict';
// Test generator - c21 / Q115 Dynamic Range Minimum Queries (CSES 1649)
// Sizes that are NOT powers of two matter here: that is where a segment tree's
// padding gets touched, and padding with 0 instead of a large value fails.
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
  T.push({ name: 'e01_cses_sample', input: '8 4\n3 2 4 5 1 1 5 3\n2 1 4\n2 5 6\n1 2 3\n2 1 4\n' });
  T.push({ name: 'e02_single_element', input: '1 3\n5\n2 1 1\n1 1 2\n2 1 1\n' });
  // n = 5 is not a power of two, so the tree has padding the query can reach
  T.push({ name: 'e03_padding_reachable', input: '5 3\n9 9 9 9 9\n2 1 5\n2 5 5\n2 4 5\n' });
  T.push({ name: 'e04_n_is_three', input: '3 4\n7 8 9\n2 1 3\n2 3 3\n1 3 1\n2 1 3\n' });
  T.push({ name: 'e05_update_raises_min', input: '4 4\n1 5 5 5\n2 1 4\n1 1 9\n2 1 4\n2 1 1\n' });
  T.push({ name: 'e06_update_lowers_min', input: '4 3\n5 5 5 5\n2 1 4\n1 3 1\n2 1 4\n' });
  T.push({ name: 'e07_all_max', input: '4 2\n1000000000 1000000000 1000000000 1000000000\n2 1 4\n2 2 3\n' });
  T.push({ name: 'e08_all_ones', input: '4 2\n1 1 1 1\n2 1 4\n2 2 2\n' });
  T.push({ name: 'e09_only_updates', input: '3 3\n1 2 3\n1 1 9\n1 2 9\n1 3 9\n' });

  // --- small randoms, several awkward sizes --------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(60), q = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), mixedOps(n, q, MAXV)),
    });
  }
  // sizes just past a power of two - the most padding to get wrong
  for (const base of [2, 4, 8, 16, 32, 64]) {
    const n = base + 1;
    const q = 20;
    T.push({
      name: 'p' + String(base).padStart(2, '0') + '_just_past_power_of_two',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000)), mixedOps(n, q, 1000)),
    });
  }
  // tiny value range - lots of ties
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(40), q = 2 + R.int(40);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_small_values',
      input: build(Array.from({ length: n }, () => 1 + R.int(4)), mixedOps(n, q, 4)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  const maxArr = () => Array.from({ length: N }, () => 1 + R.int(MAXV));
  T.push({ name: 'x01_max_random', input: build(maxArr(), mixedOps(N, Q, MAXV)) });
  T.push({
    // N is not a power of two; every query spans the whole array
    name: 'x02_max_full_range',
    input: build(maxArr(), Array.from({ length: Q }, () => `2 1 ${N}`)),
  });
  T.push({
    name: 'x03_max_all_updates',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `1 ${1 + (i % N)} ${1 + R.int(MAXV)}`)),
  });
  T.push({
    // every value identical, so only a wrong index or bad padding shows up
    name: 'x04_max_all_same',
    input: build(Array(N).fill(MAXV), Array.from({ length: Q }, (_, i) => `2 ${1 + (i % N)} ${N}`)),
  });
  T.push({
    // queries pinned to the very end, where the padding lives
    name: 'x05_max_tail_queries',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `2 ${N - (i % 5)} ${N}`)),
  });

  return T;
};
