'use strict';
// Test generator - m58 / Q153 Fulfilment Zones
// Small cases keep n and m tiny: brute.cpp is 2^n * m * n.
module.exports = function (R) {
  const T = [];
  const build = (d, w, c) =>
    `${w.length} ${c.length} ${d}\n` +
    w.map((p) => p.join(' ')).join('\n') + '\n' +
    c.map((p) => p.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_two_needed', input: build(5, [[0, 0], [10, 0]], [[0, 0], [1, 1], [10, 1]]) });
  T.push({ name: 'e02_zero_distance_exact', input: build(0, [[5, 5]], [[5, 5]]) });
  T.push({ name: 'e03_unreachable', input: build(1, [[0, 0]], [[10, 10]]) });
  T.push({ name: 'e04_one_covers_all', input: build(100, [[0, 0], [50, 50], [100, 100]], [[1, 1], [2, 2]]) });
  T.push({ name: 'e05_zero_distance_miss', input: build(0, [[5, 5]], [[5, 6]]) });
  T.push({ name: 'e06_boundary_exact', input: build(5, [[0, 0]], [[3, 4]]) });
  T.push({ name: 'e07_boundary_just_over', input: build(4, [[0, 0]], [[3, 4]]) });
  T.push({ name: 'e08_negative_coords', input: build(10, [[-5, -5], [5, 5]], [[-6, -6], [6, 6]]) });
  T.push({ name: 'e09_all_customers_same_point', input: build(3, [[0, 0], [100, 100]], [[1, 1], [1, 1], [1, 1]]) });
  T.push({ name: 'e10_extreme_coords', input: build(3000000, [[-1000000, -1000000]], [[1000000, 1000000]]) });
  T.push({ name: 'e11_extreme_coords_miss', input: build(2828426, [[-1000000, -1000000]], [[1000000, 1000000]]) });
  T.push({ name: 'e12_many_sites_one_customer', input: build(1, [[0, 0], [9, 9], [8, 8], [7, 7]], [[0, 1]]) });

  // --- small randoms (stress-compared against brute) -----------------
  const pts = (k, span) => Array.from({ length: k }, () => [R.int(2 * span + 1) - span, R.int(2 * span + 1) - span]);
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(8);
    const m = 1 + R.int(10);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(20), pts(n, 20), pts(m, 20)),
    });
  }
  // generous range: usually one warehouse is enough
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    const m = 2 + R.int(8);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_generous_range',
      input: build(60 + R.int(40), pts(n, 20), pts(m, 20)),
    });
  }
  // tight range: -1 is common
  for (let t = 0; t < 10; t++) {
    const n = 1 + R.int(6);
    const m = 2 + R.int(8);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_tight_range',
      input: build(R.int(4), pts(n, 25), pts(m, 25)),
    });
  }
  // customers deliberately placed near sites, so most are covered
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    const w = pts(n, 50);
    const m = 2 + R.int(8);
    const c = Array.from({ length: m }, () => {
      const base = w[R.int(w.length)];
      return [base[0] + R.int(7) - 3, base[1] + R.int(7) - 3];
    });
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_clustered', input: build(4, w, c) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(300, pts(14, 1000), pts(3000, 1000)) });

  // --- maximum size --------------------------------------------------
  const N = 20, M = 100000;
  T.push({ name: 'x01_max_random', input: build(200000, pts(N, 1000000), pts(M, 1000000)) });
  {
    // every customer reachable from every site: the answer is 1
    const w = pts(N, 10);
    const c = Array.from({ length: M }, () => [R.int(21) - 10, R.int(21) - 10]);
    T.push({ name: 'x02_max_all_reachable', input: build(3000000, w, c) });
  }
  {
    // one customer out of everyone's reach: -1 at full size
    const w = pts(N, 1000);
    const c = Array.from({ length: M - 1 }, () => [R.int(2001) - 1000, R.int(2001) - 1000]);
    c.push([1000000, 1000000]);
    T.push({ name: 'x03_max_one_unreachable', input: build(5000, w, c) });
  }
  {
    // each site owns its own cluster, so every site must open
    const w = Array.from({ length: N }, (_, i) => [i * 100000 - 900000, 0]);
    const c = Array.from({ length: M }, (_, j) => {
      const i = j % N;
      return [i * 100000 - 900000 + (R.int(3) - 1), R.int(3) - 1];
    });
    T.push({ name: 'x04_max_all_needed', input: build(10, w, c) });
  }
  {
    // d = 0: a site must sit exactly on the customer
    const w = Array.from({ length: N }, (_, i) => [i, i]);
    const c = Array.from({ length: M }, () => { const i = R.int(N); return [i, i]; });
    T.push({ name: 'x05_max_zero_distance', input: build(0, w, c) });
  }
  {
    // nested reach: site 0 covers everything, so the answer is 1 despite 20 sites
    const w = Array.from({ length: N }, (_, i) => [i * 10, 0]);
    const c = Array.from({ length: M }, () => [R.int(200), R.int(200) - 100]);
    T.push({ name: 'x06_max_one_suffices', input: build(1000000, w, c) });
  }
  {
    // boundary-heavy: many customers at exactly distance d
    const w = [[0, 0]];
    for (let i = 1; i < N; i++) w.push([1000000, 1000000]);
    const c = Array.from({ length: M }, () => (R.next() < 0.5 ? [3, 4] : [4, 3]));
    T.push({ name: 'x07_max_exact_boundary', input: build(5, w, c) });
  }

  return T;
};
