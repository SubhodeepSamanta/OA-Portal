'use strict';
// Test generator - c18 / Q102 Book Shop (CSES 1158)
// Small cases keep n <= 18 so the brute enumerates subsets outright. Cheap
// books with a generous budget are included on purpose: that is where an
// upward inner loop (unbounded knapsack) reports a wildly inflated answer.
module.exports = function (R) {
  const T = [];
  const build = (x, h, s) => `${h.length} ${x}\n${h.join(' ')}\n${s.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build(10, [4, 8, 5, 3], [5, 12, 8, 1]) });
  T.push({ name: 'e02_single_affordable', input: build(5, [5], [7]) });
  T.push({ name: 'e03_single_too_dear', input: build(4, [5], [7]) });
  T.push({ name: 'e04_budget_one', input: build(1, [1, 2, 3], [10, 20, 30]) });
  T.push({ name: 'e05_all_affordable', input: build(100000, [1, 1, 1, 1], [1, 2, 3, 4]) });
  T.push({ name: 'e06_nothing_affordable', input: build(1, [2, 3, 4], [100, 100, 100]) });
  // one cheap book with many pages: an upward loop would "buy" it repeatedly
  T.push({ name: 'e07_repeat_trap', input: build(100, [1, 50], [1000, 999]) });
  T.push({ name: 'e08_all_same', input: build(10, [3, 3, 3, 3], [5, 5, 5, 5]) });
  T.push({ name: 'e09_max_values', input: build(1000, [1000, 1000], [1000, 1000]) });
  T.push({ name: 'e10_exact_fit', input: build(9, [4, 5], [5, 8]) });

  const rnd = (cnt, hi) => Array.from({ length: cnt }, () => 1 + R.int(hi));

  // --- small randoms (subset enumeration) ----------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(18);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(200), rnd(n, 50), rnd(n, 1000)),
    });
  }
  // cheap books, generous budget - the unbounded-knapsack trap
  for (let i = 0; i < 10; i++) {
    const n = 1 + R.int(15);
    T.push({
      name: 't' + String(i + 1).padStart(2, '0') + '_cheap_books',
      input: build(500 + R.int(500), rnd(n, 5), rnd(n, 1000)),
    });
  }
  // expensive books, tight budget - most subsets are unaffordable
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(15);
    T.push({
      name: 'p' + String(i + 1).padStart(2, '0') + '_pricey',
      input: build(1 + R.int(30), rnd(n, 1000), rnd(n, 1000)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 1000, X = 100000;
  T.push({ name: 'x01_max_random', input: build(X, rnd(N, 1000), rnd(N, 1000)) });
  T.push({ name: 'x02_max_all_cheap', input: build(X, Array(N).fill(1), rnd(N, 1000)) });
  T.push({ name: 'x03_max_all_dear', input: build(X, Array(N).fill(1000), rnd(N, 1000)) });
  T.push({ name: 'x04_max_tight_budget', input: build(1000, rnd(N, 1000), rnd(N, 1000)) });
  T.push({ name: 'x05_max_all_identical', input: build(X, Array(N).fill(97), Array(N).fill(1000)) });
  T.push({
    // total price just under the budget: the answer is every book
    name: 'x06_max_everything_fits',
    input: build(X, Array(N).fill(100), rnd(N, 1000)),
  });

  return T;
};
