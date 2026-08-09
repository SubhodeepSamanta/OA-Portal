'use strict';
// Test generator - m17 / Q108 Subscription Tiers
module.exports = function (R) {
  const T = [];
  const line = (k, w) => `${w.length} ${k}\n${w.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: line(1, [7]) });
  T.push({ name: 'e02_one_tier', input: line(1, [10, 5, 1]) });
  T.push({ name: 'e03_two_tiers', input: line(2, [10, 5, 1]) });
  T.push({ name: 'e04_all_same', input: line(2, [1, 1, 1, 1]) });
  T.push({ name: 'e05_k_equals_n', input: line(5, [5, 4, 3, 2, 1]) });
  T.push({ name: 'e06_all_max', input: line(3, Array(10).fill(1000000000)) });
  T.push({ name: 'e07_two_values', input: line(2, [1000000000, 1, 1000000000, 1]) });
  T.push({ name: 'e08_sorted_up', input: line(3, [1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e09_sorted_down', input: line(3, [6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e10_one_rich', input: line(2, [1000000000, 1, 1, 1, 1]) });

  // --- small randoms (subset brute checks these exactly) ----------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(12);
    const k = 1 + R.int(Math.min(n, 4));
    const lim = [3, 10, 60, 1000000000][t % 4];
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: line(k, Array.from({ length: n }, () => 1 + R.int(lim))),
    });
  }
  // heavy duplication - few distinct prices
  for (let t = 0; t < 6; t++) {
    const n = 2 + R.int(10);
    const k = 1 + R.int(Math.min(n, 3));
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_few_distinct',
      input: line(k, Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(8, Array.from({ length: 800 }, () => 1 + R.int(100000))) });

  // --- maximum size ------------------------------------------------
  const N = 2000;
  T.push({ name: 'x01_max_k30_random', input: line(30, Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_k1', input: line(1, Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x03_max_k30_all_same', input: line(30, Array(N).fill(1000000000)) });
  T.push({ name: 'x04_max_k30_increasing', input: line(30, Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x05_max_k30_two_clusters', input: line(30, Array.from({ length: N }, (_, i) => (i < N / 2 ? 1 : 1000000000))) });
  T.push({ name: 'x06_max_k30_narrow', input: line(30, Array.from({ length: N }, () => 1 + R.int(5))) });

  return T;
};
