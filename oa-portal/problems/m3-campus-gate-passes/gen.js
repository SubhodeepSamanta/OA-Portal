'use strict';
// Test generator - m3 / Q4 Campus Gate Passes
module.exports = function (R) {
  const T = [];
  const build = (m, grants) =>
    `${m} ${grants.length}\n` + grants.map((g) => g.join(' ')).join('\n') + '\n';

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_gate', input: build(1, [[1, 1, 1]]) });
  T.push({ name: 'e02_single_grant_full', input: build(3, [[1, 3, 7]]) });
  T.push({ name: 'e03_tie_smallest_index', input: build(4, [[1, 2, 5], [3, 4, 5]]) });
  T.push({ name: 'e04_point_grants', input: build(5, [[3, 3, 9], [3, 3, 1], [1, 1, 9]]) });
  T.push({ name: 'e05_max_x_single', input: build(2, [[1, 2, 10000]]) });
  T.push({ name: 'e06_last_gate_wins', input: build(6, [[6, 6, 100]]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 12; t++) {
    const m = 1 + R.int(40);
    const q = 1 + R.int(30);
    const grants = [];
    for (let i = 0; i < q; i++) {
      const l = 1 + R.int(m);
      const r = l + R.int(m - l + 1);
      grants.push([l, r, 1 + R.int(10000)]);
    }
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(m, grants) });
  }

  // --- medium ------------------------------------------------------
  {
    const m = 5000, q = 5000, grants = [];
    for (let i = 0; i < q; i++) {
      const l = 1 + R.int(m);
      const r = l + R.int(m - l + 1);
      grants.push([l, r, 1 + R.int(10000)]);
    }
    T.push({ name: 'm01_medium', input: build(m, grants) });
  }

  // --- maximum size ------------------------------------------------
  const M = 1000000, Q = 1000000;
  {
    // every grant covers the whole wall -> total 1e10, needs 64-bit
    const grants = Array.from({ length: Q }, () => [1, M, 10000]);
    T.push({ name: 'x01_max_overflow', input: build(M, grants) });
  }
  {
    const grants = [];
    for (let i = 0; i < Q; i++) {
      const l = 1 + R.int(M);
      const r = l + R.int(M - l + 1);
      grants.push([l, r, 1 + R.int(10000)]);
    }
    T.push({ name: 'x02_max_random_wide', input: build(M, grants) });
  }
  {
    // long grants -> an O(sum of lengths) walk is hopeless here
    const grants = [];
    for (let i = 0; i < Q; i++) {
      const l = 1 + R.int(M / 2);
      const r = Math.min(M, l + M / 2);
      grants.push([l, r, 1 + R.int(10000)]);
    }
    T.push({ name: 'x03_max_long_ranges', input: build(M, grants) });
  }
  {
    // all point grants, answer near the front
    const grants = [];
    for (let i = 0; i < Q; i++) {
      const g = 1 + R.int(1000);
      grants.push([g, g, 1 + R.int(10000)]);
    }
    T.push({ name: 'x04_max_point_grants', input: build(M, grants) });
  }
  {
    // single grant on a huge wall - most gates are zero
    T.push({ name: 'x05_max_sparse', input: build(M, [[M, M, 1]]) });
  }

  return T;
};
