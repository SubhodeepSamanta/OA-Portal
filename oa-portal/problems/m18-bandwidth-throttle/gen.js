'use strict';
// Test generator - m18 / Q29 Bandwidth Throttle
module.exports = function (R) {
  const T = [];
  const build = (k, arr) => `${arr.length} ${k}\n${arr.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single_file', input: build(1, [1]) });
  T.push({ name: 'e02_single_file_max', input: build(1, [1000000000]) });
  T.push({ name: 'e03_one_link', input: build(1, [2, 2, 2, 2, 2]) });
  T.push({ name: 'e04_links_equal_files', input: build(4, [7, 3, 9, 1]) });
  T.push({ name: 'e05_sample', input: build(3, [3, 1, 4, 1, 5, 9]) });
  T.push({ name: 'e06_one_huge_rest_tiny', input: build(3, [1, 1, 1000000000, 1, 1]) });
  T.push({ name: 'e07_all_equal', input: build(3, [5, 5, 5, 5, 5, 5, 5]) });
  T.push({ name: 'e08_increasing', input: build(3, [1, 2, 3, 4, 5, 6, 7, 8]) });
  T.push({ name: 'e09_decreasing', input: build(3, [8, 7, 6, 5, 4, 3, 2, 1]) });
  T.push({ name: 'e10_k_one_less_than_n', input: build(6, [4, 4, 4, 4, 4, 4, 4]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(30);
    const k = 1 + R.int(n);
    const arr = Array.from({ length: n }, () => 1 + R.int(50));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(k, arr) });
  }
  // skewed: a few giants among dust, where the max-element bound bites
  for (let t = 0; t < 6; t++) {
    const n = 5 + R.int(25);
    const k = 1 + R.int(n);
    const arr = Array.from({ length: n }, () => (R.next() < 0.15 ? 900 + R.int(100) : 1 + R.int(5)));
    T.push({ name: 's' + String(t + 1).padStart(2, '0') + '_skewed_small', input: build(k, arr) });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(37, Array.from({ length: 5000 }, () => 1 + R.int(1000000))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(1 + R.int(N), Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x02_max_k_is_one',
    input: build(1, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x03_max_k_is_n',
    input: build(N, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x04_max_all_equal',
    input: build(1000, Array(N).fill(1000000000)),
  });
  T.push({
    name: 'x05_max_all_ones',
    input: build(3, Array(N).fill(1)),
  });
  T.push({
    // one file dwarfs the whole rest of the queue - the answer IS that file
    name: 'x06_max_one_giant',
    input: build(2, Array.from({ length: N }, (_, i) => (i === N >> 1 ? 1000000000 : 1))),
  });
  T.push({
    // widest possible binary-search range: forces the most iterations
    name: 'x07_max_wide_range',
    input: build(2, Array.from({ length: N }, (_, i) => (i === 0 ? 1 : 1000000000))),
  });

  return T;
};
