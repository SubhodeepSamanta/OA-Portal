'use strict';
// Test generator - m69 / Q164 Portfolio Rebalance
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length}\n` + rows.map((r) => r.join(' ')).join('\n') + '\n';

  // build a feasible case: same total on both sides
  const balanced = (n, maxUnit, maxFee) => {
    const c = Array.from({ length: n }, () => R.int(maxUnit + 1));
    const total = c.reduce((a, b) => a + b, 0);
    const t = Array(n).fill(0);
    let left = total;
    for (let i = 0; i < n - 1; i++) { const give = R.int(left + 1); t[i] = give; left -= give; }
    t[n - 1] = left;
    return c.map((v, i) => [v, t[i], 1 + R.int(maxFee)]);
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_one_source', input: build([[10, 0, 1], [5, 10, 1], [5, 10, 1]]) });
  T.push({ name: 'e02_fee_at_source', input: build([[10, 0, 5], [0, 10, 3]]) });
  T.push({ name: 'e03_already_on_target', input: build([[5, 5, 100], [7, 7, 100]]) });
  T.push({ name: 'e04_infeasible', input: build([[1, 2, 1], [3, 3, 1]]) });
  T.push({ name: 'e05_single_asset_ok', input: build([[5, 5, 1000]]) });
  T.push({ name: 'e06_single_asset_bad', input: build([[5, 6, 1000]]) });
  T.push({ name: 'e07_all_zero', input: build([[0, 0, 1], [0, 0, 1]]) });
  T.push({ name: 'e08_expensive_source_cheap_sink', input: build([[100, 0, 1000], [0, 100, 1]]) });
  T.push({ name: 'e09_cheap_source_expensive_sink', input: build([[100, 0, 1], [0, 100, 1000]]) });
  T.push({ name: 'e10_max_units', input: build([[1000000000, 0, 1000], [0, 1000000000, 1]]) });
  T.push({ name: 'e11_several_sources', input: build([[5, 0, 2], [5, 0, 3], [0, 10, 1]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(balanced(1 + R.int(10), 30, 20)),
    });
  }
  // deliberately infeasible
  for (let t = 0; t < 8; t++) {
    const n = 1 + R.int(8);
    const rows = balanced(n, 20, 10);
    rows[R.int(n)][1] += 1 + R.int(3);
    T.push({ name: 'i' + String(t + 1).padStart(2, '0') + '_infeasible', input: build(rows) });
  }
  // already balanced everywhere
  for (let t = 0; t < 8; t++) {
    const n = 1 + R.int(9);
    const rows = Array.from({ length: n }, () => { const v = R.int(50); return [v, v, 1 + R.int(1000)]; });
    T.push({ name: 'b' + String(t + 1).padStart(2, '0') + '_no_moves', input: build(rows) });
  }
  // wildly different fees, so the source-only rule is what decides
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(8);
    const rows = balanced(n, 40, 1);
    for (const row of rows) row[2] = R.next() < 0.5 ? 1 : 1000;
    T.push({ name: 'f' + String(t + 1).padStart(2, '0') + '_split_fees', input: build(rows) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(balanced(4000, 1000000, 1000)) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(balanced(N, 1000000000, 1000)) });
  {
    // half the assets shed everything at the maximum fee: the overflow case
    const rows = Array.from({ length: N }, (_, i) =>
      i < N / 2 ? [1000000000, 0, 1000] : [0, 1000000000, 1000]);
    T.push({ name: 'x02_max_overflow_bait', input: build(rows) });
  }
  {
    // already on target at full size
    const rows = Array.from({ length: N }, () => [1000000000, 1000000000, 1000]);
    T.push({ name: 'x03_max_no_moves', input: build(rows) });
  }
  {
    // infeasible by exactly one unit
    const rows = Array.from({ length: N }, (_, i) => [1000, 1000, 1]);
    rows[N - 1][1] += 1;
    T.push({ name: 'x04_max_infeasible_by_one', input: build(rows) });
  }
  {
    // one asset sheds everything to all the others
    const rows = [[1000000000, 0, 1000]];
    for (let i = 1; i < N; i++) rows.push([0, i < 1000 ? 1000000 : 0, 1]);
    // top up the last asset so the totals match
    let have = 1000000000, want = 0;
    for (const r of rows) want += r[1];
    rows[N - 1][1] += have - want;
    T.push({ name: 'x05_max_one_source', input: build(rows) });
  }
  {
    // every asset both above and below alternately
    const rows = Array.from({ length: N }, (_, i) =>
      i % 2 ? [0, 1000000, 1 + (i % 1000)] : [1000000, 0, 1 + (i % 1000)]);
    T.push({ name: 'x06_max_alternating', input: build(rows) });
  }
  {
    // all zero weights: nothing to do
    const rows = Array.from({ length: N }, () => [0, 0, 1000]);
    T.push({ name: 'x07_max_all_zero', input: build(rows) });
  }

  return T;
};
