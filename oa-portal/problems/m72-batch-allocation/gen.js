'use strict';
// Test generator - m72 / Q167 Batch Allocation
// k is always between 1 and n. Small cases keep n modest: brute is O(k*n^2).
module.exports = function (R) {
  const T = [];
  const build = (k, scores) => `${scores.length} ${k}\n${scores.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(2, [1, 3, 6, 10, 11]) });
  T.push({ name: 'e02_one_batch', input: build(1, [1, 2, 3, 10]) });
  T.push({ name: 'e03_batch_each', input: build(3, [5, 1, 9]) });
  T.push({ name: 'e04_two_big_jumps', input: build(3, [1, 2, 3, 100, 101, 200]) });
  T.push({ name: 'e05_single_trainee', input: build(1, [42]) });
  T.push({ name: 'e06_all_equal', input: build(2, [7, 7, 7, 7]) });
  T.push({ name: 'e07_all_equal_k_one', input: build(1, [7, 7, 7, 7]) });
  T.push({ name: 'e08_unsorted_input', input: build(2, [10, 1, 6, 3, 11]) });
  T.push({ name: 'e09_two_trainees', input: build(1, [1, 1000000000]) });
  T.push({ name: 'e10_two_trainees_two_batches', input: build(2, [1, 1000000000]) });
  T.push({ name: 'e11_uniform_gaps', input: build(3, [1, 5, 9, 13, 17, 21]) });
  T.push({ name: 'e12_max_scores', input: build(2, [1000000000, 1000000000, 1]) });

  // --- small randoms (DP brute) --------------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(25);
    const k = 1 + R.int(n);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(200))),
    });
  }
  // heavy duplicates, so many gaps are zero
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(20);
    const k = 1 + R.int(n);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_duplicates',
      input: build(k, Array.from({ length: n }, () => 1 + R.int(4))),
    });
  }
  // clustered, so the big gaps are obvious
  for (let t = 0; t < 10; t++) {
    const clusters = 2 + R.int(4);
    const arr = [];
    for (let c = 0; c < clusters; c++)
      for (let i = 0; i < 1 + R.int(4); i++) arr.push(c * 1000 + R.int(5));
    T.push({
      name: 'c' + String(t + 1).padStart(2, '0') + '_clustered',
      input: build(1 + R.int(Math.min(arr.length, clusters + 1)), arr),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'z01_medium',
    input: build(50, Array.from({ length: 4000 }, () => 1 + R.int(1000000))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(1000, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({ name: 'x02_max_k_one', input: build(1, Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x03_max_k_n', input: build(N, Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x04_max_all_equal', input: build(1000, Array(N).fill(1000000000)) });
  T.push({
    // evenly spaced, so every gap is identical and ties abound
    name: 'x05_max_uniform_gaps',
    input: build(1000, Array.from({ length: N }, (_, i) => 1 + i * 5)),
  });
  T.push({
    // one enormous jump in the middle
    name: 'x06_max_single_jump',
    input: build(2, Array.from({ length: N }, (_, i) => (i < N / 2 ? i + 1 : i + 900000000))),
  });
  T.push({
    // tight clusters far apart
    name: 'x07_max_clustered',
    input: build(500, Array.from({ length: N }, (_, i) => Math.floor(i / 400) * 1000000 + (i % 400))),
  });

  return T;
};
