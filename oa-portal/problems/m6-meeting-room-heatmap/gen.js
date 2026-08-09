'use strict';
// Test generator - m6 / Q17 Meeting Room Heatmap
module.exports = function (R) {
  const T = [];
  const build = (iv) => `${iv.length}\n` + iv.map((x) => x.join(' ')).join('\n') + '\n';

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: build([[0, 1]]) });
  T.push({ name: 'e02_back_to_back', input: build([[1, 5], [5, 9], [9, 12]]) });          // half-open -> 1
  T.push({ name: 'e03_all_identical', input: build(Array.from({ length: 50 }, () => [10, 20])) }); // -> 50
  T.push({ name: 'e04_nested', input: build([[0, 100], [10, 90], [20, 80], [30, 70]]) });  // -> 4
  T.push({ name: 'e05_disjoint', input: build(Array.from({ length: 40 }, (_, i) => [i * 10, i * 10 + 5])) }); // -> 1
  T.push({ name: 'e06_touching_chain', input: build(Array.from({ length: 60 }, (_, i) => [i, i + 1])) });     // -> 1
  T.push({ name: 'e07_extremes', input: build([[0, 1000000000], [999999999, 1000000000]]) }); // -> 2
  T.push({ name: 'e08_shared_end_then_start', input: build([[1, 4], [4, 7], [1, 7]]) });      // -> 2
  T.push({ name: 'e09_zero_start', input: build([[0, 5], [0, 5], [0, 5]]) });                 // -> 3

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 14; t++) {
    const n = 1 + R.int(50);
    const span = [5, 20, 100, 1000000000][t % 4];
    const iv = [];
    for (let i = 0; i < n; i++) {
      const s = R.int(span);
      const e = s + 1 + R.int(Math.max(1, span - s));
      iv.push([s, Math.min(e, 1000000000)]);
    }
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(iv) });
  }

  // --- medium ------------------------------------------------------
  {
    const iv = [];
    for (let i = 0; i < 5000; i++) {
      const s = R.int(10000);
      iv.push([s, s + 1 + R.int(500)]);
    }
    T.push({ name: 'm01_medium', input: build(iv) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000;
  {
    // all meetings share one instant -> answer N
    T.push({ name: 'x01_max_all_overlap', input: build(Array.from({ length: N }, () => [0, 1000000000])) });
  }
  {
    // perfect chain of touching half-open intervals -> answer 1
    T.push({ name: 'x02_max_touching_chain', input: build(Array.from({ length: N }, (_, i) => [i * 5, i * 5 + 5])) });
  }
  {
    const iv = [];
    for (let i = 0; i < N; i++) {
      const s = R.int(1000000000);
      iv.push([s, Math.min(1000000000, s + 1 + R.int(1000))]);
    }
    T.push({ name: 'x03_max_random_sparse', input: build(iv) });
  }
  {
    const iv = [];
    for (let i = 0; i < N; i++) {
      const s = R.int(100000);
      iv.push([s, s + 1 + R.int(100000)]);
    }
    T.push({ name: 'x04_max_random_dense', input: build(iv) });
  }
  {
    // deeply nested staircase -> answer N
    const iv = Array.from({ length: N }, (_, i) => [i, 2 * N - i]);
    T.push({ name: 'x05_max_nested', input: build(iv) });
  }

  return T;
};
