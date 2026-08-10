'use strict';
// Test generator - m43 / Q130 Campus Shuttle Route
module.exports = function (R) {
  const T = [];
  const build = (n, d) => `${n}\n` + d.map((r) => r.join(' ')).join('\n') + '\n';
  const table = (n, f) => {
    const m = n + 1;
    return Array.from({ length: m }, (_, i) =>
      Array.from({ length: m }, (_, j) => (i === j ? 0 : f(i, j))));
  };

  // --- edge cases ---------------------------------------------------
  T.push({
    name: 'e01_sample_classic',
    input: build(3, [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]),
  });
  T.push({ name: 'e02_single_stop', input: build(1, [[0, 7], [7, 0]]) });
  T.push({ name: 'e03_asymmetric', input: build(2, [[0, 1, 100], [100, 0, 1], [1, 100, 0]]) });
  T.push({ name: 'e04_all_zero', input: build(5, table(5, () => 0)) });
  T.push({ name: 'e05_all_same', input: build(5, table(5, () => 1000000)) });
  T.push({ name: 'e06_max_values_small', input: build(2, table(2, () => 1000000)) });
  T.push({ name: 'e07_one_cheap_ring', input: build(4, table(4, (i, j) => (j === (i + 1) % 5 ? 1 : 1000000))) });
  T.push({ name: 'e08_cheap_reverse_ring', input: build(4, table(4, (i, j) => (i === (j + 1) % 5 ? 1 : 1000000))) });
  T.push({ name: 'e09_distance_by_index', input: build(6, table(6, (i, j) => Math.abs(i - j) * 10)) });
  T.push({ name: 'e10_two_stops', input: build(2, [[0, 5, 9], [5, 0, 3], [9, 3, 0]]) });

  // --- small randoms (exhaustive permutation brute, n <= 8) ---------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(8);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, table(n, () => R.int(200))),
    });
  }
  // symmetric tables, where the two directions of a tour tie
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    const base = table(n, () => R.int(150));
    for (let i = 0; i <= n; i++) for (let j = 0; j < i; j++) base[i][j] = base[j][i];
    T.push({ name: 's' + String(t + 1).padStart(2, '0') + '_symmetric_small', input: build(n, base) });
  }
  // heavily asymmetric: one direction cheap, the other ruinous
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(6);
    T.push({
      name: 'a' + String(t + 1).padStart(2, '0') + '_asymmetric_small',
      input: build(n, table(n, (i, j) => (i < j ? 1 + R.int(5) : 500 + R.int(500)))),
    });
  }
  // heavy ties
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(6);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_ties_small',
      input: build(n, table(n, () => R.int(3))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium_n11', input: build(11, table(11, () => R.int(1000000))) });
  T.push({ name: 'm02_medium_n13', input: build(13, table(13, () => R.int(1000))) });

  // --- maximum size --------------------------------------------------
  const N = 15;
  T.push({ name: 'x01_max_random', input: build(N, table(N, () => R.int(1000000))) });
  T.push({ name: 'x02_max_all_zero', input: build(N, table(N, () => 0)) });
  T.push({ name: 'x03_max_all_same', input: build(N, table(N, () => 1000000)) });
  T.push({
    // exactly one cheap Hamiltonian cycle hidden in expensive noise
    name: 'x04_max_hidden_cycle',
    input: build(N, table(N, (i, j) => (j === (i + 1) % (N + 1) ? 1 : 900000 + R.int(100000)))),
  });
  T.push({
    // the cheap cycle runs the other way, so direction must be read correctly
    name: 'x05_max_hidden_reverse_cycle',
    input: build(N, table(N, (i, j) => (i === (j + 1) % (N + 1) ? 1 : 900000 + R.int(100000)))),
  });
  T.push({
    name: 'x06_max_distance_by_index',
    input: build(N, table(N, (i, j) => Math.abs(i - j) * 1000)),
  });
  T.push({
    name: 'x07_max_asymmetric',
    input: build(N, table(N, (i, j) => (i < j ? 1 + R.int(1000) : 500000 + R.int(500000)))),
  });
  T.push({ name: 'x08_max_binary_costs', input: build(N, table(N, () => R.int(2))) });

  return T;
};
