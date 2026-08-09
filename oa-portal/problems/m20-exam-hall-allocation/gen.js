'use strict';
// Test generator - m20 / Q36 Exam Hall Allocation
module.exports = function (R) {
  const T = [];
  const build = (iv) => `${iv.length}\n` + iv.map((p) => p[0] + ' ' + p[1]).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_single', input: build([[0, 1]]) });
  T.push({ name: 'e02_sample', input: build([[0, 30], [5, 10], [15, 20], [25, 40], [35, 50]]) });
  T.push({ name: 'e03_touching', input: build([[1, 5], [5, 9], [9, 12]]) });
  T.push({ name: 'e04_all_identical', input: build([[0, 10], [0, 10], [0, 10], [0, 10]]) });
  T.push({ name: 'e05_nested', input: build([[0, 100], [10, 90], [20, 80], [30, 70]]) });
  T.push({ name: 'e06_disjoint_chain', input: build([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]) });
  T.push({ name: 'e07_same_start_diff_end', input: build([[5, 20], [5, 6], [5, 30], [5, 7]]) });
  T.push({ name: 'e08_extremes', input: build([[0, 1000000000], [0, 1], [999999999, 1000000000]]) });
  T.push({ name: 'e09_staircase', input: build([[0, 4], [1, 5], [2, 6], [3, 7], [4, 8], [5, 9]]) });
  T.push({ name: 'e10_gap_then_burst', input: build([[0, 2], [100, 200], [100, 200], [100, 200]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(25);
    const iv = Array.from({ length: n }, () => {
      const s = R.int(40);
      return [s, s + 1 + R.int(20)];
    });
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(iv) });
  }
  // deliberately tight coordinates so touching endpoints happen constantly
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(20);
    const iv = Array.from({ length: n }, () => {
      const s = R.int(8);
      return [s, s + 1 + R.int(4)];
    });
    T.push({ name: 't' + String(t + 1).padStart(2, '0') + '_tight_coords', input: build(iv) });
  }
  // heavy duplicates: identical intervals repeated
  for (let t = 0; t < 5; t++) {
    const n = 4 + R.int(16);
    const iv = Array.from({ length: n }, () => {
      const s = 2 * R.int(4);
      return [s, s + 2 * (1 + R.int(2))];
    });
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_dup_small', input: build(iv) });
  }

  // --- medium --------------------------------------------------------
  {
    const iv = Array.from({ length: 4000 }, () => {
      const s = R.int(20000);
      return [s, s + 1 + R.int(500)];
    });
    T.push({ name: 'm01_medium', input: build(iv) });
  }

  const N = 200000;
  // --- maximum size --------------------------------------------------
  {
    const iv = Array.from({ length: N }, () => {
      const s = R.int(1000000000);
      return [s, s + 1 + R.int(1000000)];
    });
    T.push({ name: 'x01_max_random', input: build(iv) });
  }
  {
    // every exam overlaps every other: N halls, hall 1 holds exactly one exam
    const iv = Array.from({ length: N }, () => [0, 1000000000]);
    T.push({ name: 'x02_max_all_overlap', input: build(iv) });
  }
  {
    // a perfect chain: 1 hall holds all N exams - longest possible line 2
    const iv = Array.from({ length: N }, (_, i) => [i, i + 1]);
    T.push({ name: 'x03_max_single_hall_chain', input: build(iv) });
  }
  {
    // deeply nested: hall count grows to N but ends are strictly decreasing
    const iv = Array.from({ length: N }, (_, i) => [i, 2 * N - i]);
    T.push({ name: 'x04_max_nested', input: build(iv) });
  }
  {
    // hall numbers get recycled constantly - stresses the free-hall structure
    const iv = Array.from({ length: N }, (_, i) => {
      const s = (i % 1000) * 1000;
      return [s, s + 1 + R.int(2000)];
    });
    T.push({ name: 'x05_max_recycling', input: build(iv) });
  }
  {
    // huge burst of identical intervals then a long tail in one hall
    const iv = [];
    for (let i = 0; i < N / 2; i++) iv.push([0, 5]);
    for (let i = 0; i < N / 2; i++) iv.push([5 + i, 6 + i]);
    T.push({ name: 'x06_max_burst_then_chain', input: build(iv) });
  }
  {
    // all zero-width-ish minimal intervals at the same instant
    const iv = Array.from({ length: N }, (_, i) => [1000000000 - 1, 1000000000]);
    T.push({ name: 'x07_max_same_instant', input: build(iv) });
  }

  return T;
};
