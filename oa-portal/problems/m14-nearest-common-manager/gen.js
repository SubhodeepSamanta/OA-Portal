'use strict';
// Test generator - m14 / Q63 Nearest Common Manager
module.exports = function (R) {
  const T = [];

  // parent[i] < i is guaranteed, so any generator must respect that
  const build = (n, parents, queries) =>
    `${n} ${queries.length}\n${parents.join(' ')}\n` +
    queries.map((x) => x.join(' ')).join('\n') + '\n';

  const randQueries = (n, q) => Array.from({ length: q }, () => [1 + R.int(n), 1 + R.int(n)]);

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_node', input: build(1, [], [[1, 1]]) });
  T.push({ name: 'e02_two_nodes', input: build(2, [1], [[1, 2], [2, 2], [2, 1]]) });
  T.push({ name: 'e03_sample_tree', input: build(7, [1, 1, 2, 2, 3, 3], [[4, 5], [4, 6], [4, 2], [5, 5], [6, 7], [1, 7]]) });
  {
    // a straight chain 1-2-3-...-30
    const n = 30;
    T.push({
      name: 'e04_chain',
      input: build(n, Array.from({ length: n - 1 }, (_, i) => i + 1),
                   [[1, n], [n, 1], [15, n], [7, 20], [n, n]]),
    });
  }
  {
    // a star: everyone reports straight to the CEO
    const n = 30;
    T.push({
      name: 'e05_star',
      input: build(n, Array(n - 1).fill(1), randQueries(n, 10)),
    });
  }
  T.push({ name: 'e06_self_queries', input: build(6, [1, 1, 2, 2, 3], [[1, 1], [4, 4], [6, 6]]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 16; t++) {
    const n = 1 + R.int(40);
    const parents = Array.from({ length: Math.max(0, n - 1) }, (_, i) => 1 + R.int(i + 1));
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, parents, randQueries(n, 1 + R.int(20))),
    });
  }
  // deep-ish random chains, where depth handling matters
  for (let t = 0; t < 6; t++) {
    const n = 5 + R.int(30);
    const parents = Array.from({ length: n - 1 }, (_, i) => (R.next() < 0.8 ? i + 1 : 1 + R.int(i + 1)));
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_deep_small',
      input: build(n, parents, randQueries(n, 15)),
    });
  }

  // --- medium ------------------------------------------------------
  {
    const n = 3000, q = 3000;
    const parents = Array.from({ length: n - 1 }, (_, i) => 1 + R.int(i + 1));
    T.push({ name: 'm01_medium', input: build(n, parents, randQueries(n, q)) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000, Q = 200000;
  {
    const parents = Array.from({ length: N - 1 }, (_, i) => 1 + R.int(i + 1));
    T.push({ name: 'x01_max_random_tree', input: build(N, parents, randQueries(N, Q)) });
  }
  {
    // worst case for naive walking: one long chain
    const parents = Array.from({ length: N - 1 }, (_, i) => i + 1);
    T.push({ name: 'x02_max_chain', input: build(N, parents, randQueries(N, Q)) });
  }
  {
    const parents = Array.from({ length: N - 1 }, (_, i) => i + 1);
    // deepest possible pairs, repeatedly
    const qs = Array.from({ length: Q }, () => [1, N]);
    T.push({ name: 'x03_max_chain_far_pairs', input: build(N, parents, qs) });
  }
  {
    const parents = Array(N - 1).fill(1);
    T.push({ name: 'x04_max_star', input: build(N, parents, randQueries(N, Q)) });
  }
  {
    // perfect binary tree
    const parents = Array.from({ length: N - 1 }, (_, i) => ((i + 2) >> 1));
    T.push({ name: 'x05_max_binary_tree', input: build(N, parents, randQueries(N, Q)) });
  }
  {
    // caterpillar: long spine with leaves hanging off
    const parents = Array.from({ length: N - 1 }, (_, i) => (i % 2 === 0 ? Math.max(1, i) : i + 1));
    T.push({ name: 'x06_max_caterpillar', input: build(N, parents, randQueries(N, Q)) });
  }

  return T;
};
