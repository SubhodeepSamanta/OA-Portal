'use strict';
// Test generator - c22 / Q116 Range Update Queries (CSES 1651)
// Ranges ending exactly at n appear often on purpose: that is where writing
// d[b+1] runs off the end of an undersized tree.
module.exports = function (R) {
  const T = [];
  const MAXV = 1000000000;
  const build = (x, ops) =>
    `${x.length} ${ops.length}\n${x.join(' ')}\n` + ops.join('\n') + '\n';

  const mixedOps = (n, cnt, maxU) => Array.from({ length: cnt }, () => {
    if (R.int(2) === 0) {
      let a = 1 + R.int(n), b = 1 + R.int(n);
      if (a > b) { const t = a; a = b; b = t; }
      if (R.int(4) === 0) b = n;                 // ranges that touch the end
      return `1 ${a} ${b} ${1 + R.int(maxU)}`;
    }
    return `2 ${1 + R.int(n)}`;
  });

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '8 3\n3 2 4 5 1 1 5 3\n2 4\n1 2 5 1\n2 4\n' });
  T.push({ name: 'e02_single_element', input: '1 3\n5\n2 1\n1 1 1 7\n2 1\n' });
  // b == n, the case that needs room for d[n+1]
  T.push({ name: 'e03_range_to_end', input: '4 3\n1 1 1 1\n1 2 4 5\n2 4\n2 1\n' });
  T.push({ name: 'e04_whole_array', input: '4 3\n1 2 3 4\n1 1 4 10\n2 1\n2 4\n' });
  T.push({ name: 'e05_single_cell_range', input: '4 3\n1 2 3 4\n1 3 3 100\n2 3\n2 2\n' });
  T.push({ name: 'e06_only_reads', input: '4 4\n1 2 3 4\n2 1\n2 2\n2 3\n2 4\n' });
  T.push({ name: 'e07_only_updates', input: '3 3\n1 2 3\n1 1 3 1\n1 1 2 1\n1 2 3 1\n' });
  T.push({ name: 'e08_stacked_updates', input: '3 5\n1 1 1\n1 1 3 1000000000\n1 1 3 1000000000\n1 1 3 1000000000\n2 2\n2 1\n' });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(60), q = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), mixedOps(n, q, MAXV)),
    });
  }
  // update-heavy, all touching the last cell
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(40), q = 2 + R.int(40);
    const ops = Array.from({ length: q }, (_, j) =>
      (j % 3 === 2 ? `2 ${n}` : `1 ${1 + R.int(n)} ${n} ${1 + R.int(MAXV)}`));
    T.push({ name: 'u' + String(i + 1).padStart(2, '0') + '_to_end', input: build(Array.from({ length: n }, () => 1 + R.int(MAXV)), ops) });
  }
  // small values so a wrong index is obvious rather than lost in noise
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(30), q = 2 + R.int(30);
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
    // every update covers the whole array at the maximum increment: one cell
    // accumulates about 1e14, well past 32 bits
    name: 'x02_max_overflow',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) =>
      (i % 2 === 0 ? `1 1 ${N} ${MAXV}` : `2 ${1 + (i % N)}`))),
  });
  T.push({
    name: 'x03_max_all_updates_to_end',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `1 ${1 + (i % N)} ${N} ${MAXV}`)),
  });
  T.push({
    name: 'x04_max_all_reads',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => `2 ${1 + (i % N)}`)),
  });
  T.push({
    name: 'x05_max_single_cell_ranges',
    input: build(maxArr(), Array.from({ length: Q }, (_, i) => {
      const k = 1 + (i % N);
      return i % 2 === 0 ? `1 ${k} ${k} ${MAXV}` : `2 ${k}`;
    })),
  });

  return T;
};
