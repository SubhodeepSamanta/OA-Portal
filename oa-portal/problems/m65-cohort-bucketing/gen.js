'use strict';
// Test generator - m65 / Q160 Cohort Bucketing
// k is always between 1 and n.
module.exports = function (R) {
  const T = [];
  const build = (k, scores) => `${scores.length} ${k}\n${scores.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(2, [1, 1, 2, 3, 3, 3]) });
  T.push({ name: 'e02_one_bucket', input: build(1, [1, 2, 3, 4]) });
  T.push({ name: 'e03_all_same_score', input: build(5, [7, 7, 7, 7, 7]) });
  T.push({ name: 'e04_all_distinct', input: build(3, [1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e05_single_patient', input: build(1, [42]) });
  T.push({ name: 'e06_k_equals_n_distinct', input: build(4, [1, 2, 3, 4]) });
  T.push({ name: 'e07_more_buckets_than_scores', input: build(6, [1, 1, 2, 2, 5, 5]) });
  T.push({ name: 'e08_one_dominant_score', input: build(3, [1, 2, 3, 3, 3, 3, 3, 3]) });
  T.push({ name: 'e09_unsorted_input', input: build(2, [9, 1, 5, 1, 9, 5]) });
  T.push({ name: 'e10_max_scores', input: build(2, [1000000000, 1, 1000000000]) });
  T.push({ name: 'e11_two_heavy_scores', input: build(2, [1, 1, 1, 2, 2, 2]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(25);
    const k = 1 + R.int(n);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(10))),
    });
  }
  // heavy duplicates: few distinct scores, big counts
  for (let t = 0; t < 12; t++) {
    const n = 5 + R.int(25);
    const k = 1 + R.int(Math.min(n, 6));
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_heavy_duplicates',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // all distinct: a pure split-the-list problem
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(20);
    const k = 1 + R.int(n);
    T.push({
      name: 'u' + String(t + 1).padStart(2, '0') + '_all_distinct',
      input: build(k, Array.from({ length: n }, (_, i) => i + 1)),
    });
  }
  // one score dwarfs the rest
  for (let t = 0; t < 8; t++) {
    const n = 6 + R.int(18);
    const arr = Array.from({ length: n }, (_, i) => (i < n - 3 ? 5 : 1 + i));
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_one_dominant',
      input: build(1 + R.int(Math.min(n, 5)), arr),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'z01_medium',
    input: build(50, Array.from({ length: 4000 }, () => 1 + R.int(500))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(1000, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x02_max_all_same',
    input: build(N, Array(N).fill(1000000000)),
  });
  T.push({
    name: 'x03_max_all_distinct_k_one',
    input: build(1, Array.from({ length: N }, (_, i) => i + 1)),
  });
  T.push({
    name: 'x04_max_all_distinct_k_n',
    input: build(N, Array.from({ length: N }, (_, i) => i + 1)),
  });
  T.push({
    // a handful of scores, each enormous
    name: 'x05_max_few_scores',
    input: build(3, Array.from({ length: N }, (_, i) => 1 + (i % 5))),
  });
  T.push({
    // one score holds half the patients, forcing the answer up
    name: 'x06_max_one_dominant',
    input: build(1000, Array.from({ length: N }, (_, i) => (i < N / 2 ? 1 : i))),
  });
  T.push({
    // counts that grow steadily, so the greedy cut points matter
    name: 'x07_max_growing_counts',
    input: build(400, Array.from({ length: N }, (_, i) => 1 + Math.floor(Math.sqrt(i)))),
  });

  return T;
};
