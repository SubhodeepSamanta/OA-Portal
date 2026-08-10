'use strict';
// Test generator - m76 / Q175 Batch Prime Filter
// Small cases keep the RANGES narrow, not just the query count: the brute
// trial-divides every value in every range.
module.exports = function (R) {
  const T = [];
  const build = (qs) => `${qs.length}\n` + qs.map((q) => q.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([[1, 10], [2, 2], [1, 1]]) });
  T.push({ name: 'e02_top_of_range', input: build([[999983, 1000000], [4, 4]]) });
  T.push({ name: 'e03_one_is_not_prime', input: build([[1, 1], [1, 2], [1, 3]]) });
  T.push({ name: 'e04_single_points', input: build([[2, 2], [3, 3], [4, 4], [5, 5], [9, 9]]) });
  T.push({ name: 'e05_twin_primes', input: build([[11, 13], [17, 19], [29, 31]]) });
  T.push({ name: 'e06_prime_gap', input: build([[114, 126], [90, 96]]) });
  T.push({ name: 'e07_full_small', input: build([[1, 100]]) });
  T.push({ name: 'e08_squares', input: build([[4, 4], [9, 9], [25, 25], [49, 49]]) });
  T.push({ name: 'e09_repeated_query', input: build([[1, 50], [1, 50], [1, 50]]) });
  T.push({ name: 'e10_max_single_point', input: build([[1000000, 1000000], [999999, 999999]]) });

  // --- small randoms (trial-division brute) -------------------------
  for (let t = 0; t < 22; t++) {
    const k = 1 + R.int(12);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: k }, () => { const l = 1 + R.int(500); return [l, l + R.int(200)]; })),
    });
  }
  // narrow ranges scattered high in the universe
  for (let t = 0; t < 10; t++) {
    const k = 2 + R.int(10);
    T.push({
      name: 'h' + String(t + 1).padStart(2, '0') + '_high_narrow',
      input: build(Array.from({ length: k }, () => { const l = 900000 + R.int(99000); return [l, l + R.int(60)]; })),
    });
  }
  // single-value queries only
  for (let t = 0; t < 10; t++) {
    const k = 3 + R.int(15);
    T.push({
      name: 'p' + String(t + 1).padStart(2, '0') + '_points',
      input: build(Array.from({ length: k }, () => { const v = 1 + R.int(2000); return [v, v]; })),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'z01_medium',
    input: build(Array.from({ length: 3000 }, () => { const l = 1 + R.int(999000); return [l, l + R.int(1000)]; })),
  });

  // --- maximum size --------------------------------------------------
  const Q = 200000, LIM = 1000000;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: Q }, () => {
      const l = 1 + R.int(LIM), r = 1 + R.int(LIM);
      return l <= r ? [l, r] : [r, l];
    })),
  });
  T.push({
    // every query spans the whole universe
    name: 'x02_max_full_range',
    input: build(Array.from({ length: Q }, () => [1, LIM])),
  });
  T.push({
    // every query is a single point
    name: 'x03_max_points',
    input: build(Array.from({ length: Q }, (_, i) => { const v = 1 + (i % LIM); return [v, v]; })),
  });
  T.push({
    // every query starts at 1, so the l-1 = 0 boundary is hit constantly
    name: 'x04_max_prefix_queries',
    input: build(Array.from({ length: Q }, (_, i) => [1, 1 + (i % LIM)])),
  });
  T.push({
    // ranges packed at the very top
    name: 'x05_max_high_ranges',
    input: build(Array.from({ length: Q }, () => { const l = 999000 + R.int(900); return [l, l + R.int(100)]; })),
  });
  T.push({
    // ranges with no primes at all: even numbers above 2
    name: 'x06_max_even_windows',
    input: build(Array.from({ length: Q }, (_, i) => { const v = 4 + 2 * (i % 400000); return [v, v]; })),
  });

  return T;
};
