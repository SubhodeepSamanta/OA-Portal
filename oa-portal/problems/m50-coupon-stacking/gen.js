'use strict';
// Test generator - m50 / Q137 Coupon Stacking
// The coupons line is omitted entirely when m = 0.
module.exports = function (R) {
  const T = [];
  const build = (p, d) =>
    `${p.length} ${d.length}\n${p.join(' ')}\n` + (d.length ? d.join(' ') + '\n' : '');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([100, 200, 300], [50, 10]) });
  T.push({ name: 'e02_no_coupons', input: build([10, 20], []) });
  T.push({ name: 'e03_more_coupons_than_items', input: build([100], [100, 1, 1]) });
  T.push({ name: 'e04_pick_best_two', input: build([10, 100], [30, 70, 5]) });
  T.push({ name: 'e05_single_item_single_coupon', input: build([7], [50]) });
  T.push({ name: 'e06_all_hundred_percent', input: build([5, 6, 7], [100, 100, 100]) });
  T.push({ name: 'e07_all_one_percent', input: build([5, 6, 7], [1, 1, 1]) });
  T.push({ name: 'e08_max_price', input: build([1000000000], [100]) });
  T.push({ name: 'e09_equal_prices', input: build([50, 50, 50], [10, 20, 30]) });
  T.push({ name: 'e10_equal_discounts', input: build([10, 500, 3], [40, 40]) });
  T.push({ name: 'e11_one_coupon_many_items', input: build([1, 2, 3, 4, 5], [100]) });
  T.push({ name: 'e12_ascending_vs_descending', input: build([1, 2, 3], [90, 50, 10]) });

  // --- small randoms (exhaustive brute, n and m <= 7) ---------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(7);
    const m = R.int(8);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: build(Array.from({ length: n }, () => 1 + R.int(500)),
                   Array.from({ length: m }, () => 1 + R.int(100))),
    });
  }
  // heavy ties in both lists
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(5);
    const m = 1 + R.int(6);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_ties_tiny',
      input: build(Array.from({ length: n }, () => 1 + R.int(3)),
                   Array.from({ length: m }, () => 1 + R.int(3))),
    });
  }
  // one very expensive item among cheap ones
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(5);
    const m = 1 + R.int(5);
    const p = Array.from({ length: n - 1 }, () => 1 + R.int(5));
    p.push(1000000000);
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_one_dominant',
      input: build(p, Array.from({ length: m }, () => 1 + R.int(100))),
    });
  }
  // no coupons at all
  for (let t = 0; t < 6; t++) {
    const n = 1 + R.int(7);
    T.push({
      name: 'z' + String(t + 1).padStart(2, '0') + '_no_coupons',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000)), []),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(Array.from({ length: 3000 }, () => 1 + R.int(1000000)),
                 Array.from({ length: 2000 }, () => 1 + R.int(100))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_balanced',
    input: build(Array.from({ length: N }, () => 1 + R.int(1000000000)),
                 Array.from({ length: N }, () => 1 + R.int(100))),
  });
  T.push({
    // every price and every discount maximal: 100*sum(p) is 2*10^16
    name: 'x02_max_overflow_bait',
    input: build(Array(N).fill(1000000000), Array(N).fill(100)),
  });
  T.push({
    name: 'x03_max_no_coupons',
    input: build(Array(N).fill(1000000000), []),
  });
  T.push({
    // far more coupons than items: only the best n matter
    name: 'x04_max_coupon_surplus',
    input: build(Array.from({ length: 10 }, () => 1 + R.int(1000000000)),
                 Array.from({ length: N }, () => 1 + R.int(100))),
  });
  T.push({
    // far more items than coupons
    name: 'x05_max_item_surplus',
    input: build(Array.from({ length: N }, () => 1 + R.int(1000000000)),
                 Array.from({ length: 10 }, () => 1 + R.int(100))),
  });
  T.push({
    // prices ascending, discounts ascending - both need reversing
    name: 'x06_max_both_ascending',
    input: build(Array.from({ length: N }, (_, i) => i + 1),
                 Array.from({ length: N }, (_, i) => 1 + (i % 100))),
  });
  T.push({
    // one enormous price among a sea of cheap ones
    name: 'x07_max_one_dominant',
    input: build(Array.from({ length: N }, (_, i) => (i === N >> 1 ? 1000000000 : 1)),
                 Array.from({ length: N }, () => 1 + R.int(100))),
  });
  T.push({
    // every discount identical, so only the prices decide
    name: 'x08_max_uniform_discounts',
    input: build(Array.from({ length: N }, () => 1 + R.int(1000000000)), Array(N).fill(37)),
  });

  return T;
};
