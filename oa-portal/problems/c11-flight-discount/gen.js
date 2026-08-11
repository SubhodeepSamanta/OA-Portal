'use strict';
// Test generator - c11 / Q81 Flight Discount (CSES 1195)
// Every case must have a route from 1 to n, so a spine 1->2->...->n is always
// laid down first and extra flights are added on top. Small cases stay tiny:
// the brute runs one Dijkstra PER FLIGHT.
module.exports = function (R) {
  const T = [];
  const build = (n, edges) =>
    `${n} ${edges.length}\n` + edges.map(([a, b, c]) => `${a} ${b} ${c}`).join('\n') + '\n';

  // guaranteed path 1->n, plus `extra` random directed flights
  const withSpine = (n, extra, maxC) => {
    const edges = [];
    for (let v = 1; v < n; v++) edges.push([v, v + 1, 1 + R.int(maxC)]);
    for (let i = 0; i < extra; i++) {
      edges.push([1 + R.int(n), 1 + R.int(n), 1 + R.int(maxC)]);
    }
    return edges;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '3 4\n1 2 3\n2 3 1\n1 3 7\n2 1 5\n' });
  T.push({ name: 'e02_two_cities', input: '2 1\n1 2 10\n' });
  T.push({ name: 'e03_two_cities_odd', input: '2 1\n1 2 7\n' });
  T.push({ name: 'e04_cost_one', input: '2 1\n1 2 1\n' });
  T.push({ name: 'e05_max_cost', input: '2 1\n1 2 1000000000\n' });
  T.push({ name: 'e06_direct_vs_detour', input: '3 3\n1 3 10\n1 2 4\n2 3 4\n' });
  T.push({ name: 'e07_parallel_flights', input: '2 3\n1 2 9\n1 2 8\n1 2 100\n' });
  T.push({ name: 'e08_backward_flights_useless', input: '3 4\n1 2 5\n2 3 5\n3 2 1\n2 1 1\n' });
  T.push({ name: 'e09_self_loop', input: '3 3\n1 1 1\n1 2 6\n2 3 6\n' });
  T.push({ name: 'e10_long_chain_of_ones', input: '6 5\n1 2 1\n2 3 1\n3 4 1\n4 5 1\n5 6 1\n' });
  T.push({ name: 'e11_one_huge_edge', input: '4 3\n1 2 1\n2 3 1000000000\n3 4 1\n' });

  // --- small randoms (brute runs m+1 Dijkstras) ----------------------
  for (let i = 0; i < 20; i++) {
    const n = 2 + R.int(12);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(n, withSpine(n, R.int(15), 1000)),
    });
  }
  // big edge costs, so the halving actually changes the route chosen
  for (let i = 0; i < 12; i++) {
    const n = 2 + R.int(10);
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_big_costs',
      input: build(n, withSpine(n, R.int(12), 1000000000)),
    });
  }
  // one dominant edge among cheap ones - the coupon must land on it
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(8);
    const edges = withSpine(n, R.int(6), 5);
    edges[R.int(n - 1)][2] = 1000000000;
    T.push({ name: 'h' + String(i + 1).padStart(2, '0') + '_one_huge', input: build(n, edges) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v < N; v++) e.push([v, v + 1, 1 + R.int(1000000000)]);
      while (e.length < M) e.push([1 + R.int(N), 1 + R.int(N), 1 + R.int(1000000000)]);
      return e;
    })()),
  });
  T.push({
    // a single 100000-long chain at maximum cost: the total is 1e14, well
    // past what a 32-bit accumulator can hold
    name: 'x02_max_chain_max_cost',
    input: build(N, Array.from({ length: N - 1 }, (_, i) => [i + 1, i + 2, 1000000000])),
  });
  T.push({
    // chain of ones with one enormous flight in the middle
    name: 'x03_max_one_huge',
    input: build(N, Array.from({ length: N - 1 }, (_, i) =>
      [i + 1, i + 2, i === (N >> 1) ? 1000000000 : 1])),
  });
  T.push({
    // two parallel routes: a cheap long one and an expensive short one
    name: 'x04_max_two_routes',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v < N; v++) e.push([v, v + 1, 2]);
      e.push([1, N, 1000000000]);
      return e;
    })()),
  });
  T.push({
    name: 'x05_max_dense_small_costs',
    input: build(N, (() => {
      const e = [];
      for (let v = 1; v < N; v++) e.push([v, v + 1, 1 + R.int(10)]);
      while (e.length < M) e.push([1 + R.int(N), 1 + R.int(N), 1 + R.int(10)]);
      return e;
    })()),
  });

  return T;
};
