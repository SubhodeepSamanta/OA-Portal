'use strict';
// Test generator - m48 / Q135 Minimum Platform Rebuild
module.exports = function (R) {
  const T = [];
  const build = (iv) => `${iv.length}\n` + iv.map((p) => p[0] + ' ' + p[1]).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_cancel_helps', input: build([[1, 5], [2, 6], [7, 8]]) });
  T.push({ name: 'e02_three_identical', input: build([[1, 10], [1, 10], [1, 10]]) });
  T.push({ name: 'e03_single_train', input: build([[5, 5]]) });
  T.push({ name: 'e04_two_separate_peaks', input: build([[1, 2], [1, 2], [3, 4], [3, 4]]) });
  T.push({ name: 'e05_touching_endpoints', input: build([[3, 5], [5, 9]]) });
  T.push({ name: 'e06_all_disjoint', input: build([[1, 2], [3, 4], [5, 6], [7, 8]]) });
  T.push({ name: 'e07_nested', input: build([[0, 100], [10, 90], [20, 80]]) });
  T.push({ name: 'e08_one_spanning_train', input: build([[0, 100], [1, 2], [50, 51], [99, 100]]) });
  T.push({ name: 'e09_peak_needs_two_cancels', input: build([[1, 5], [1, 5], [1, 5], [1, 5]]) });
  T.push({ name: 'e10_extremes', input: build([[0, 1000000000], [0, 0], [1000000000, 1000000000]]) });
  T.push({ name: 'e11_staircase', input: build([[1, 4], [2, 5], [3, 6], [4, 7]]) });
  T.push({ name: 'e12_two_trains_same_minute', input: build([[7, 7], [7, 7]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(14);
    const iv = Array.from({ length: n }, () => { const s = R.int(30); return [s, s + R.int(12)]; });
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(iv) });
  }
  // tight coordinates: touching endpoints happen constantly
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(12);
    const iv = Array.from({ length: n }, () => { const s = R.int(6); return [s, s + R.int(4)]; });
    T.push({ name: 't' + String(t + 1).padStart(2, '0') + '_tight_coords', input: build(iv) });
  }
  // two clusters far apart, so a single cancellation often cannot help
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(10);
    const iv = Array.from({ length: n }, () => {
      const base = R.next() < 0.5 ? 0 : 1000;
      const s = base + R.int(5);
      return [s, s + R.int(4)];
    });
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_two_clusters', input: build(iv) });
  }
  // one long train spanning everything else
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(10);
    const iv = [[0, 1000]];
    for (let i = 1; i < n; i++) { const s = R.int(900); iv.push([s, s + R.int(90)]); }
    T.push({ name: 'l' + String(t + 1).padStart(2, '0') + '_one_spanner', input: build(iv) });
  }

  // --- medium --------------------------------------------------------
  {
    const iv = Array.from({ length: 4000 }, () => { const s = R.int(20000); return [s, s + R.int(400)]; });
    T.push({ name: 'm01_medium', input: build(iv) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const iv = Array.from({ length: N }, () => { const s = R.int(1000000000); return [s, s + R.int(1000000)]; });
    T.push({ name: 'x01_max_random', input: build(iv) });
  }
  {
    // every train present at once: peak N, one cancellation gives N-1
    const iv = Array.from({ length: N }, () => [0, 1000000000]);
    T.push({ name: 'x02_max_all_overlap', input: build(iv) });
  }
  {
    // completely disjoint: peak 1, cancelling one leaves peak 1
    const iv = Array.from({ length: N }, (_, i) => [2 * i, 2 * i + 1]);
    T.push({ name: 'x03_max_all_disjoint', input: build(iv) });
  }
  {
    // two far-apart peaks of equal height, no train covering both
    const iv = [];
    for (let i = 0; i < N / 2; i++) iv.push([0, 10]);
    for (let i = 0; i < N / 2; i++) iv.push([1000000, 1000010]);
    T.push({ name: 'x04_max_two_peaks', input: build(iv) });
  }
  {
    // one train spans the whole timetable, so a cancellation always helps
    const iv = [[0, 1000000000]];
    for (let i = 1; i < N; i++) iv.push([500000, 500000 + R.int(1000)]);
    T.push({ name: 'x05_max_spanner_helps', input: build(iv) });
  }
  {
    // deeply nested, peak at the centre
    const iv = Array.from({ length: N }, (_, i) => [i, 2 * N - i]);
    T.push({ name: 'x06_max_nested', input: build(iv) });
  }
  {
    // touching endpoints all the way along, at full size
    const iv = Array.from({ length: N }, (_, i) => [i, i + 1]);
    T.push({ name: 'x07_max_touching_chain', input: build(iv) });
  }
  {
    // single train at maximum coordinates
    T.push({ name: 'x08_max_single', input: build([[1000000000, 1000000000]]) });
  }

  return T;
};
