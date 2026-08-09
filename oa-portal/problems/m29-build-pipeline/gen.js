'use strict';
// Test generator - m29 / Q73 Build Pipeline
module.exports = function (R) {
  const T = [];
  const build = (times, edges) =>
    `${times.length} ${edges.length}\n${times.join(' ')}\n` +
    (edges.length ? edges.map((e) => e.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build([3, 2, 4, 1, 5], [[1, 3], [2, 3], [3, 4], [3, 5]]) });
  T.push({ name: 'e02_cycle', input: build([1, 1, 1], [[1, 2], [2, 3], [3, 1]]) });
  T.push({ name: 'e03_single_task', input: build([7], []) });
  T.push({ name: 'e04_no_deps', input: build([5, 3, 9, 1], []) });
  T.push({ name: 'e05_self_loop', input: build([4, 4], [[1, 1]]) });
  T.push({ name: 'e06_duplicate_rules', input: build([2, 3], [[1, 2], [1, 2], [1, 2]]) });
  T.push({ name: 'e07_pure_chain', input: build([1, 2, 3, 4, 5], [[1, 2], [2, 3], [3, 4], [4, 5]]) });
  T.push({ name: 'e08_diamond', input: build([1, 5, 2, 1], [[1, 2], [1, 3], [2, 4], [3, 4]]) });
  T.push({ name: 'e09_two_components', input: build([10, 1, 1, 20], [[1, 2], [3, 4]]) });
  T.push({ name: 'e10_max_times', input: build([1000000000, 1000000000, 1000000000], [[1, 2], [2, 3]]) });
  T.push({ name: 'e11_cycle_far_from_start', input: build([1, 1, 1, 1, 1], [[1, 2], [3, 4], [4, 5], [5, 3]]) });

  // --- small randoms: DAGs (a < b keeps them acyclic) ---------------
  const randDag = (n, m) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      const a = 1 + R.int(n - 1);
      const b = a + 1 + R.int(n - a);
      e.push([a, b]);
    }
    return e;
  };
  for (let t = 0; t < 18; t++) {
    const n = 2 + R.int(12);
    const times = Array.from({ length: n }, () => 1 + R.int(20));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_dag',
      input: build(times, randDag(n, R.int(20))),
    });
  }
  // small randoms with unrestricted edges: cycles appear naturally
  for (let t = 0; t < 14; t++) {
    const n = 2 + R.int(10);
    const times = Array.from({ length: n }, () => 1 + R.int(15));
    const e = Array.from({ length: 1 + R.int(14) }, () => [1 + R.int(n), 1 + R.int(n)]);
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_maybe_cyclic', input: build(times, e) });
  }
  // wide-and-shallow, then narrow-and-deep
  for (let t = 0; t < 6; t++) {
    const n = 6 + R.int(10);
    const times = Array.from({ length: n }, () => 1 + R.int(30));
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1, i]);
    T.push({ name: 'w' + String(t + 1).padStart(2, '0') + '_fan_out', input: build(times, e) });
  }
  for (let t = 0; t < 6; t++) {
    const n = 6 + R.int(10);
    const times = Array.from({ length: n }, () => 1 + R.int(30));
    const e = [];
    for (let i = 1; i < n; i++) e.push([i, n]);
    T.push({ name: 'v' + String(t + 1).padStart(2, '0') + '_fan_in', input: build(times, e) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000;
    const times = Array.from({ length: n }, () => 1 + R.int(1000000));
    T.push({ name: 'm01_medium', input: build(times, randDag(n, 9000)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000, M = 500000;
  {
    const times = Array.from({ length: N }, () => 1 + R.int(1000000000));
    T.push({ name: 'x01_max_random_dag', input: build(times, randDag(N, M)) });
  }
  {
    // longest possible chain at maximum weight: answer is 2 * 10^14
    const times = Array(N).fill(1000000000);
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2]);
    T.push({ name: 'x02_max_chain_overflow_bait', input: build(times, e) });
  }
  {
    // no dependencies at all: answer is the single slowest task
    const times = Array.from({ length: N }, (_, i) => (i === N >> 1 ? 1000000000 : 1));
    T.push({ name: 'x03_max_no_deps', input: build(times, []) });
  }
  {
    // one enormous fan-in: task N waits on everything
    const times = Array.from({ length: N }, () => 1 + R.int(1000000000));
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, N]);
    T.push({ name: 'x04_max_fan_in', input: build(times, e) });
  }
  {
    // one enormous fan-out from task 1
    const times = Array.from({ length: N }, () => 1 + R.int(1000000000));
    const e = Array.from({ length: N - 1 }, (_, i) => [1, i + 2]);
    T.push({ name: 'x05_max_fan_out', input: build(times, e) });
  }
  {
    // a full-size DAG with a cycle buried at the far end
    const times = Array.from({ length: N }, () => 1 + R.int(1000000));
    const e = randDag(N, M - 2);
    e.push([N, N - 1]);
    e.push([N - 1, N]);
    T.push({ name: 'x06_max_cycle_hidden', input: build(times, e) });
  }
  {
    // layered graph: 400 layers of 500, fully connected between neighbours
    const times = Array.from({ length: N }, () => 1 + R.int(1000));
    const e = [];
    const W = 500;
    for (let layer = 0; layer + 1 < N / W && e.length < M; layer++)
      for (let i = 0; i < W && e.length < M; i++)
        e.push([layer * W + i + 1, (layer + 1) * W + ((i * 7) % W) + 1]);
    T.push({ name: 'x07_max_layered', input: build(times, e) });
  }
  {
    // every task depends on itself: immediate -1 at full size
    const times = Array.from({ length: N }, () => 1 + R.int(1000));
    const e = Array.from({ length: N }, (_, i) => [i + 1, i + 1]);
    T.push({ name: 'x08_max_all_self_loops', input: build(times, e) });
  }

  return T;
};
