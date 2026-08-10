'use strict';
// Test generator - m40 / Q119 Sensor Range Alerts
module.exports = function (R) {
  const T = [];
  const build = (a, ops) => `${a.length} ${ops.length}\n${a.join(' ')}\n${ops.join('\n')}\n`;
  const range = (n) => { const l = 1 + R.int(n); const r = l + R.int(n - l + 1); return [l, r]; };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build([1, 2, 3, 4, 5], ['MAX 1 5', 'ADD 2 3 10', 'MAX 1 3', 'MAX 4 5']) });
  T.push({ name: 'e02_all_negative', input: build([-5, -5, -5], ['MAX 1 3', 'ADD 1 3 -10', 'MAX 2 2']) });
  T.push({ name: 'e03_single_sensor', input: build([7], ['MAX 1 1', 'ADD 1 1 1000000000', 'MAX 1 1']) });
  T.push({ name: 'e04_only_max', input: build([3, 1, 4, 1, 5], ['MAX 1 1', 'MAX 2 4', 'MAX 1 5']) });
  T.push({ name: 'e05_only_add', input: build([1, 2, 3], ['ADD 1 3 5', 'ADD 1 1 5']) });
  T.push({ name: 'e06_add_zero', input: build([1, 2, 3], ['ADD 1 3 0', 'MAX 1 3']) });
  T.push({ name: 'e07_extremes', input: build([1000000000, -1000000000], ['MAX 1 2', 'ADD 1 2 -1000000000', 'MAX 1 2']) });
  T.push({ name: 'e08_full_range_repeatedly', input: build([0, 0, 0, 0], ['ADD 1 4 7', 'ADD 1 4 7', 'ADD 1 4 7', 'MAX 1 4']) });
  T.push({ name: 'e09_single_point_updates', input: build([0, 0, 0, 0, 0], ['ADD 3 3 9', 'MAX 1 2', 'MAX 3 3', 'MAX 1 5']) });
  T.push({ name: 'e10_overlapping_adds', input: build([0, 0, 0, 0, 0], ['ADD 1 3 5', 'ADD 3 5 5', 'MAX 3 3', 'MAX 1 5', 'MAX 4 5']) });
  T.push({ name: 'e11_negatives_then_positive', input: build([-9, -8, -7], ['MAX 1 3', 'ADD 1 1 100', 'MAX 1 1', 'MAX 2 3']) });

  // --- small randoms (stress-compared against brute) -----------------
  const randOps = (n, k, maxX) =>
    Array.from({ length: k }, () => {
      const [l, r] = range(n);
      if (R.next() < 0.5) return `ADD ${l} ${r} ${R.int(2 * maxX + 1) - maxX}`;
      return `MAX ${l} ${r}`;
    });

  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(12);
    const a = Array.from({ length: n }, () => R.int(41) - 20);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(a, randOps(n, 5 + R.int(30), 20)),
    });
  }
  // all-negative worlds
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(10);
    const a = Array.from({ length: n }, () => -1 - R.int(50));
    const ops = Array.from({ length: 8 + R.int(25) }, () => {
      const [l, r] = range(n);
      return R.next() < 0.5 ? `ADD ${l} ${r} ${-1 - R.int(20)}` : `MAX ${l} ${r}`;
    });
    T.push({ name: 'n' + String(t + 1).padStart(2, '0') + '_all_negative', input: build(a, ops) });
  }
  // add-heavy then query, so lazy notes stack deep before anyone descends
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(10);
    const a = Array.from({ length: n }, () => R.int(11));
    const ops = Array.from({ length: 10 + R.int(25) }, () => {
      const [l, r] = range(n);
      return R.next() < 0.8 ? `ADD ${l} ${r} ${R.int(21) - 10}` : `MAX ${l} ${r}`;
    });
    T.push({ name: 'a' + String(t + 1).padStart(2, '0') + '_add_heavy', input: build(a, ops) });
  }
  // single-point ranges only
  for (let t = 0; t < 6; t++) {
    const n = 3 + R.int(8);
    const a = Array.from({ length: n }, () => R.int(21) - 10);
    const ops = Array.from({ length: 10 + R.int(20) }, () => {
      const i = 1 + R.int(n);
      return R.next() < 0.5 ? `ADD ${i} ${i} ${R.int(11) - 5}` : `MAX ${i} ${i}`;
    });
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_point_ops', input: build(a, ops) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 2000;
    const a = Array.from({ length: n }, () => R.int(2000001) - 1000000);
    T.push({ name: 'm01_medium', input: build(a, randOps(n, 4000, 1000000)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  {
    const a = Array.from({ length: N }, () => R.int(2000000001) - 1000000000);
    T.push({ name: 'x01_max_random', input: build(a, randOps(N, Q, 1000000000)) });
  }
  {
    // every op spans the whole line: maximum lazy pressure at the root
    const a = Array.from({ length: N }, () => R.int(1000000001));
    const ops = Array.from({ length: Q }, () =>
      R.next() < 0.5 ? `ADD 1 ${N} 1000000000` : `MAX 1 ${N}`);
    T.push({ name: 'x02_max_full_width', input: build(a, ops) });
  }
  {
    // adds only, then one query: the notes must survive without any push
    const a = Array(N).fill(0);
    const ops = [];
    for (let i = 0; i < Q - 1; i++) ops.push(`ADD 1 ${N} 1000000000`);
    ops.push(`MAX 1 ${N}`);
    T.push({ name: 'x03_max_overflow_bait', input: build(a, ops) });
  }
  {
    // single points only, scattered
    const a = Array.from({ length: N }, () => -1000000000);
    const ops = Array.from({ length: Q }, () => {
      const i = 1 + R.int(N);
      return R.next() < 0.5 ? `ADD ${i} ${i} ${R.int(1000000001)}` : `MAX ${i} ${i}`;
    });
    T.push({ name: 'x04_max_point_ops', input: build(a, ops) });
  }
  {
    // everything negative at full scale
    const a = Array.from({ length: N }, () => -1 - R.int(1000000000));
    const ops = Array.from({ length: Q }, () => {
      const [l, r] = range(N);
      return R.next() < 0.5 ? `ADD ${l} ${r} ${-1 - R.int(1000000)}` : `MAX ${l} ${r}`;
    });
    T.push({ name: 'x05_max_all_negative', input: build(a, ops) });
  }
  {
    // nested shrinking ranges: every op descends a different depth
    const a = Array.from({ length: N }, () => R.int(1000));
    const ops = [];
    for (let i = 0; i < Q; i++) {
      const half = Math.max(1, (N >> 1) - (i % (N >> 2)));
      const l = Math.max(1, (N >> 1) - half), r = Math.min(N, (N >> 1) + half);
      ops.push(i % 2 === 0 ? `ADD ${l} ${r} ${i % 1000}` : `MAX ${l} ${r}`);
    }
    T.push({ name: 'x06_max_nested_ranges', input: build(a, ops) });
  }
  {
    // queries only: no lazy work, pure traversal cost
    const a = Array.from({ length: N }, () => R.int(2000000001) - 1000000000);
    const ops = Array.from({ length: Q }, () => { const [l, r] = range(N); return `MAX ${l} ${r}`; });
    T.push({ name: 'x07_max_queries_only', input: build(a, ops) });
  }

  return T;
};
