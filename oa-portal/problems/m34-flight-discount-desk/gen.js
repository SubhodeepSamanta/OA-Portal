'use strict';
// Test generator - m34 / Q77 Flight Discount Desk
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + (edges.length ? edges.map((e) => e.join(' ')).join('\n') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(4, [[1, 2, 3], [2, 4, 5], [1, 3, 2], [3, 4, 6], [1, 4, 20]]) });
  T.push({ name: 'e02_unreachable', input: build(3, [[1, 2, 5]]) });
  T.push({ name: 'e03_single_city', input: build(1, []) });
  T.push({ name: 'e04_odd_price_rounds_down', input: build(2, [[1, 2, 7]]) });
  T.push({ name: 'e05_price_one', input: build(2, [[1, 2, 1]]) });
  T.push({ name: 'e06_max_price', input: build(2, [[1, 2, 1000000000]]) });
  T.push({ name: 'e07_one_way_only', input: build(3, [[2, 1, 1], [3, 2, 1]]) });
  T.push({ name: 'e08_parallel_flights', input: build(2, [[1, 2, 9], [1, 2, 4], [1, 2, 100]]) });
  T.push({
    // the greedy "cheapest route then discount its worst leg" trap
    name: 'e09_greedy_trap',
    input: build(4, [[1, 4, 10], [1, 2, 6], [2, 3, 1], [3, 4, 1000000000]]),
  });
  T.push({ name: 'e10_no_flights', input: build(5, []) });
  T.push({
    name: 'e11_long_chain',
    input: build(11, Array.from({ length: 10 }, (_, i) => [i + 1, i + 2, (i + 1) * 100])),
  });

  // --- small randoms (stress-compared against brute) -----------------
  const randGraph = (n, m, maxC) => {
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, 1 + R.int(maxC)]);
    }
    return e;
  };
  for (let t = 0; t < 20; t++) {
    const n = 2 + R.int(9);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, randGraph(n, 1 + R.int(16), 40)),
    });
  }
  // one giant fare among small ones: the coupon placement decides everything
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(7);
    const m = 3 + R.int(10);
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, R.next() < 0.25 ? 900 + R.int(100) : 1 + R.int(4)]);
    }
    T.push({ name: 'w' + String(t + 1).padStart(2, '0') + '_skewed_small', input: build(n, e) });
  }
  // odd fares everywhere: rounding matters on every leg
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(7);
    const m = 3 + R.int(12);
    const e = [];
    for (let i = 0; i < m; i++) {
      let u = 1 + R.int(n), v = 1 + R.int(n);
      while (v === u) v = 1 + R.int(n);
      e.push([u, v, 1 + 2 * R.int(20)]);
    }
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_odd_fares', input: build(n, e) });
  }
  // sparse: -1 comes up often
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(8);
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_sparse_small',
      input: build(n, randGraph(n, 1 + R.int(4), 100)),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 500;
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(1000000)]);
    while (e.length < 1500) {
      const u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, 1 + R.int(1000000)]);
    }
    T.push({ name: 'm01_medium', input: build(n, e) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  const connected = (n, m, maxC) => {
    const e = [];
    for (let i = 2; i <= n; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(maxC)]);
    while (e.length < m) {
      const u = 1 + R.int(n), v = 1 + R.int(n);
      if (u !== v) e.push([u, v, 1 + R.int(maxC)]);
    }
    return e;
  };
  T.push({ name: 'x01_max_random', input: build(N, connected(N, M, 1000000000)) });
  {
    // one chain of maximum fares: totals near 10^14
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 1000000000]);
    T.push({ name: 'x02_max_chain_overflow_bait', input: build(N, e) });
  }
  {
    // two routes: many cheap legs, or few legs with one enormous fare
    const e = [];
    const half = N >> 1;
    for (let i = 1; i < half; i++) e.push([i, i + 1, 2]);
    e.push([half, N, 3]);
    e.push([1, half + 1, 1]);
    for (let i = half + 1; i < N; i++) e.push([i, i + 1, 1000000000]);
    while (e.length < M) {
      const u = 1 + R.int(N), v = 1 + R.int(N);
      if (u !== v) e.push([u, v, 1000000000]);
    }
    T.push({ name: 'x03_max_coupon_decides_route', input: build(N, e.slice(0, M)) });
  }
  {
    // dense star out of city 1
    const e = [];
    for (let i = 2; i <= N; i++) e.push([1, i, 1 + R.int(1000000000)]);
    while (e.length < M) {
      const u = 2 + R.int(N - 1), v = 2 + R.int(N - 1);
      if (u !== v) e.push([u, v, 1 + R.int(1000000000)]);
    }
    T.push({ name: 'x04_max_star', input: build(N, e) });
  }
  {
    // every fare odd and maximal: rounding down on every possible leg
    const e = Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 999999999]);
    T.push({ name: 'x05_max_all_odd', input: build(N, e) });
  }
  {
    // destination unreachable at full size
    const e = [];
    for (let i = 2; i <= N - 1; i++) e.push([1 + R.int(i - 1), i, 1 + R.int(1000)]);
    T.push({ name: 'x06_max_unreachable', input: build(N, e) });
  }
  {
    // ladder with many ties
    const e = [];
    const half = N >> 1;
    for (let i = 1; i < half; i++) { e.push([i, i + 1, 1]); e.push([half + i, half + i + 1, 1]); }
    for (let i = 1; i <= half && e.length < M; i++) e.push([i, half + i, 2]);
    T.push({ name: 'x07_max_ladder_ties', input: build(N, e) });
  }

  return T;
};
