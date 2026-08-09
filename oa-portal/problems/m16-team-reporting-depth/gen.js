'use strict';
// Test generator - m16 / Q66 Team Reporting Depth
module.exports = function (R) {
  const T = [];
  const build = (n, k, parents) => `${n} ${k}\n${parents.join(' ')}\n`;
  const chain = (n) => Array.from({ length: Math.max(0, n - 1) }, (_, i) => i + 1);
  const star = (n) => Array(Math.max(0, n - 1)).fill(1);
  const rand = (n) => Array.from({ length: Math.max(0, n - 1) }, (_, i) => 1 + R.int(i + 1));
  const binary = (n) => Array.from({ length: Math.max(0, n - 1) }, (_, i) => (i + 2) >> 1);

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: build(1, 1, []) });
  T.push({ name: 'e02_two', input: build(2, 1, [1]) });
  T.push({ name: 'e03_sample_k1', input: build(7, 1, [1, 1, 2, 2, 3, 3]) });
  T.push({ name: 'e04_sample_k2', input: build(7, 2, [1, 1, 2, 2, 3, 3]) });
  T.push({ name: 'e05_chain_k2', input: build(5, 2, chain(5)) });
  T.push({ name: 'e06_chain_k_large', input: build(20, 20, chain(20)) });
  T.push({ name: 'e07_star_k1', input: build(30, 1, star(30)) });
  T.push({ name: 'e08_star_k5', input: build(30, 5, star(30)) });
  T.push({ name: 'e09_binary_k3', input: build(31, 3, binary(31)) });
  T.push({ name: 'e10_k_equals_n', input: build(15, 15, rand(15)) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(40);
    const k = 1 + R.int(n);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(n, k, rand(n)) });
  }
  // deep-leaning shapes
  for (let t = 0; t < 6; t++) {
    const n = 5 + R.int(30);
    const parents = Array.from({ length: n - 1 }, (_, i) => (R.next() < 0.85 ? i + 1 : 1 + R.int(i + 1)));
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_deep_small', input: build(n, 1 + R.int(6), parents) });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(3000, 7, rand(3000)) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random_k1', input: build(N, 1, rand(N)) });
  T.push({ name: 'x02_max_random_kbig', input: build(N, N, rand(N)) });
  T.push({ name: 'x03_max_chain_k1', input: build(N, 1, chain(N)) });
  T.push({ name: 'x04_max_chain_khalf', input: build(N, N / 2, chain(N)) });
  T.push({ name: 'x05_max_star', input: build(N, 3, star(N)) });
  T.push({ name: 'x06_max_binary', input: build(N, 10, binary(N)) });
  {
    // caterpillar: long spine with leaves
    const parents = Array.from({ length: N - 1 }, (_, i) => (i % 2 === 0 ? Math.max(1, i) : i + 1));
    T.push({ name: 'x07_max_caterpillar', input: build(N, 4, parents) });
  }

  return T;
};
