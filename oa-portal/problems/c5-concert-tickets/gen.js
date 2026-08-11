'use strict';
// Test generator - c5 / Q34 Concert Tickets (CSES 1091)
// Small cases keep n and m under ~120 so the O(n*m) brute stays quick.
// Repeated prices are everywhere on purpose: erasing by value instead of by
// iterator is the bug this problem is built to catch.
module.exports = function (R) {
  const T = [];
  const build = (h, t) => `${h.length} ${t.length}\n${h.join(' ')}\n${t.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build([5, 3, 7, 8, 5], [4, 8, 3]) });
  T.push({ name: 'e02_single_each', input: build([5], [5]) });
  T.push({ name: 'e03_single_too_poor', input: build([5], [4]) });
  T.push({ name: 'e04_all_same_price', input: build([7, 7, 7, 7], [7, 7, 7, 7, 7]) });
  T.push({ name: 'e05_everyone_broke', input: build([10, 20, 30], [1, 1, 1]) });
  T.push({ name: 'e06_everyone_rich', input: build([10, 20, 30], [1000000000, 1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e07_more_customers', input: build([1, 2], [5, 5, 5, 5, 5]) });
  T.push({ name: 'e08_more_tickets', input: build([1, 2, 3, 4, 5, 6], [3]) });
  T.push({ name: 'e09_max_values', input: build([1000000000, 1000000000], [1000000000, 1000000000, 999999999]) });
  T.push({ name: 'e10_exact_matches', input: build([1, 2, 3], [3, 2, 1]) });
  T.push({ name: 'e11_reverse_order', input: build([1, 2, 3], [1, 2, 3]) });
  T.push({ name: 'e12_duplicate_heavy', input: build([5, 5, 5, 5, 5], [5, 5, 5, 5, 5, 5]) });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(60), m = 1 + R.int(60);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000000000)),
                   Array.from({ length: m }, () => 1 + R.int(1000000000))),
    });
  }
  // tiny price range, so duplicates are guaranteed
  for (let i = 0; i < 12; i++) {
    const n = 2 + R.int(60), m = 2 + R.int(60);
    T.push({
      name: 'd' + String(i + 1).padStart(2, '0') + '_many_duplicates',
      input: build(Array.from({ length: n }, () => 1 + R.int(6)),
                   Array.from({ length: m }, () => 1 + R.int(8))),
    });
  }
  // budgets clustered just below the prices - lots of -1
  for (let i = 0; i < 8; i++) {
    const n = 2 + R.int(50), m = 2 + R.int(50);
    T.push({
      name: 'n' + String(i + 1).padStart(2, '0') + '_near_misses',
      input: build(Array.from({ length: n }, () => 500 + R.int(50)),
                   Array.from({ length: m }, () => 480 + R.int(40))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  const rnd = (cnt, hi) => Array.from({ length: cnt }, () => 1 + R.int(hi));
  T.push({ name: 'x01_max_random', input: build(rnd(N, 1000000000), rnd(N, 1000000000)) });
  T.push({ name: 'x02_max_all_same', input: build(Array(N).fill(500000000), Array(N).fill(500000000)) });
  T.push({ name: 'x03_max_all_broke', input: build(rnd(N, 1000000000), Array(N).fill(1)) });
  T.push({ name: 'x04_max_all_rich', input: build(rnd(N, 1000000000), Array(N).fill(1000000000)) });
  T.push({ name: 'x05_max_narrow_prices', input: build(rnd(N, 10), rnd(N, 12)) });
  T.push({
    // sorted ascending prices with ascending budgets - worst case for a naive scan
    name: 'x06_max_sorted',
    input: build(Array.from({ length: N }, (_, i) => i + 1), Array.from({ length: N }, (_, i) => i + 1)),
  });

  return T;
};
