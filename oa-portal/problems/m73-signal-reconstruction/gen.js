'use strict';
// Test generator - m73 / Q168 Signal Reconstruction
// Small cases stay short: brute.cpp tries every block, O(n^3).
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // take a strictly increasing array and reverse one block
  const damaged = (n, l, r) => {
    const a = [];
    let v = 1 + R.int(5);
    for (let i = 0; i < n; i++) { a.push(v); v += 1 + R.int(5); }
    const block = a.slice(l, r + 1).reverse();
    return a.slice(0, l).concat(block, a.slice(r + 1));
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_middle_block', input: build([1, 4, 3, 2, 5]) });
  T.push({ name: 'e02_already_increasing', input: build([1, 2, 3, 4]) });
  T.push({ name: 'e03_adjacent_swap', input: build([1, 3, 2, 4]) });
  T.push({ name: 'e04_impossible', input: build([1, 5, 3, 4, 2]) });
  T.push({ name: 'e05_single', input: build([7]) });
  T.push({ name: 'e06_whole_array_reversed', input: build([9, 7, 5, 3, 1]) });
  T.push({ name: 'e07_equal_pair', input: build([1, 1]) });
  T.push({ name: 'e08_equal_inside', input: build([1, 3, 3, 4]) });
  T.push({ name: 'e09_block_at_start', input: build([3, 2, 1, 4, 5]) });
  T.push({ name: 'e10_block_at_end', input: build([1, 2, 5, 4, 3]) });
  T.push({ name: 'e11_two_separate_faults', input: build([2, 1, 4, 3]) });
  T.push({ name: 'e12_all_equal', input: build([5, 5, 5]) });
  T.push({ name: 'e13_max_values', input: build([1, 1000000000, 999999999, 1000000000]) });

  // --- small randoms: genuine single reversals -----------------------
  for (let t = 0; t < 20; t++) {
    const n = 2 + R.int(14);
    const l = R.int(n);
    const r = l + R.int(n - l);
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_true_reversal', input: build(damaged(n, l, r)) });
  }
  // small randoms: arbitrary arrays, usually impossible
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(14);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(12))),
    });
  }
  // tiny value range, so equal neighbours are common
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(12);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_many_equal',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // nearly increasing with one element out of place
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(11);
    const a = [];
    let v = 1;
    for (let i = 0; i < n; i++) { a.push(v); v += 1 + R.int(3); }
    a[R.int(n)] = 1 + R.int(v);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_one_disturbed', input: build(a) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 5000;
    T.push({ name: 'z01_medium_reversal', input: build(damaged(n, 1000, 3500)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_reversal', input: build(damaged(N, 50000, 150000)) });
  T.push({ name: 'x02_max_already_increasing', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x03_max_whole_reversed', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({
    // the block runs to the very end
    name: 'x04_max_block_at_end',
    input: build(damaged(N, N - 1000, N - 1)),
  });
  T.push({
    // the block starts at the very beginning
    name: 'x05_max_block_at_start',
    input: build(damaged(N, 0, 1000)),
  });
  T.push({
    // two separate faults: impossible, and only the verification catches it
    name: 'x06_max_two_faults',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? i : i + 2))),
  });
  T.push({ name: 'x07_max_all_equal', input: build(Array(N).fill(1000000000)) });
  T.push({
    // a single adjacent swap deep inside a huge increasing array
    name: 'x08_max_single_swap',
    input: build(Array.from({ length: N }, (_, i) => {
      if (i === N / 2) return N / 2 + 2;
      if (i === N / 2 + 1) return N / 2 + 1;
      return i + 1;
    })),
  });

  return T;
};
