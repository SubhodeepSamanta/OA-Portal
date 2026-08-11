'use strict';
// Test generator - c4 / Q27 Array Division (CSES 1085)
// Small cases keep n <= 60 so the O(k*n^2) DP in the brute stays quick.
module.exports = function (R) {
  const T = [];
  const build = (k, x) => `${x.length} ${k}\n${x.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build(3, [2, 4, 7, 3, 5]) });
  T.push({ name: 'e02_single_element', input: build(1, [5]) });
  T.push({ name: 'e03_k_equals_n', input: build(4, [9, 1, 8, 2]) });
  T.push({ name: 'e04_k_is_one', input: build(1, [3, 1, 4, 1, 5]) });
  T.push({ name: 'e05_all_equal', input: build(3, [5, 5, 5, 5, 5, 5]) });
  T.push({ name: 'e06_one_dominant', input: build(2, [1, 1, 1000000000, 1, 1]) });
  T.push({ name: 'e07_all_max', input: build(2, [1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e08_increasing', input: build(3, [1, 2, 3, 4, 5, 6, 7, 8]) });
  T.push({ name: 'e09_decreasing', input: build(3, [8, 7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e10_single_max', input: build(1, [1000000000]) });
  T.push({ name: 'e11_two_elements_two_parts', input: build(2, [1, 1000000000]) });
  T.push({ name: 'e12_all_ones', input: build(3, Array(10).fill(1)) });

  // --- small randoms (exact DP in the brute) -------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(45);
    const k = 1 + R.int(n);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // huge values, so the sums exercise 64-bit arithmetic even when small
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(30);
    const k = 1 + R.int(n);
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_big_values',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(1000000000))),
    });
  }
  // spiky: mostly tiny with a few huge, which pins the answer to lo
  for (let i = 0; i < 8; i++) {
    const n = 5 + R.int(35);
    const k = 1 + R.int(n);
    const arr = Array.from({ length: n }, () => 1 + R.int(5));
    arr[R.int(n)] = 1000000000;
    T.push({ name: 'p' + String(i + 1).padStart(2, '0') + '_spiky', input: build(k, arr) });
  }
  // k close to n, so most pieces are single elements
  for (let i = 0; i < 8; i++) {
    const n = 3 + R.int(40);
    const k = Math.max(1, n - R.int(3));
    T.push({
      name: 'k' + String(i + 1).padStart(2, '0') + '_k_near_n',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(100000))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  const rnd = () => Array.from({ length: N }, () => 1 + R.int(1000000000));
  T.push({ name: 'x01_max_random_mid_k', input: build(1000, rnd()) });
  T.push({ name: 'x02_max_k_is_one', input: build(1, rnd()) });
  T.push({ name: 'x03_max_k_equals_n', input: build(N, rnd()) });
  T.push({ name: 'x04_max_all_max_values', input: build(777, Array(N).fill(1000000000)) });
  T.push({ name: 'x05_max_all_ones', input: build(3, Array(N).fill(1)) });
  T.push({
    // one element dwarfs the rest: the answer is exactly that element
    name: 'x06_max_one_dominant',
    input: build(2, Array.from({ length: N }, (_, i) => (i === N / 2 ? 1000000000 : 1))),
  });

  return T;
};
