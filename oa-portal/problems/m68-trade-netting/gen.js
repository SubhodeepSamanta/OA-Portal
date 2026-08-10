'use strict';
// Test generator - m68 / Q163 Trade Netting
// Trades never have a == b.
module.exports = function (R) {
  const T = [];
  const build = (n, trades) =>
    `${n} ${trades.length}\n` + (trades.length ? trades.map((t) => t.join(' ')).join('\n') + '\n' : '');

  const pair = (n) => {
    let a = 1 + R.int(n), b = 1 + R.int(n);
    while (b === a) b = 1 + R.int(n);
    return [a, b];
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_chain_nets_middle', input: build(3, [[1, 2, 10], [2, 3, 10]]) });
  T.push({ name: 'e02_two_groups', input: build(4, [[1, 2, 5], [3, 4, 7]]) });
  T.push({ name: 'e03_no_trades', input: build(2, []) });
  T.push({ name: 'e04_ring_cancels', input: build(3, [[1, 2, 5], [2, 3, 5], [3, 1, 5]]) });
  T.push({ name: 'e05_single_counterparty', input: build(1, []) });
  T.push({ name: 'e06_repeated_pair', input: build(2, [[1, 2, 5], [1, 2, 5], [2, 1, 3]]) });
  T.push({ name: 'e07_both_directions_cancel', input: build(2, [[1, 2, 9], [2, 1, 9]]) });
  T.push({ name: 'e08_max_amounts', input: build(2, [[1, 2, 1000000000], [1, 2, 1000000000]]) });
  T.push({ name: 'e09_isolated_alongside_group', input: build(5, [[1, 2, 4], [2, 3, 4]]) });
  T.push({ name: 'e10_star', input: build(5, [[1, 2, 1], [1, 3, 1], [1, 4, 1], [1, 5, 1]]) });
  T.push({ name: 'e11_group_not_starting_at_one', input: build(4, [[3, 4, 6]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(10);
    const m = n > 1 ? R.int(12) : 0;
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(n, Array.from({ length: m }, () => { const [a, b] = pair(n); return [a, b, 1 + R.int(20)]; })),
    });
  }
  // amounts drawn from a tiny set, so netting to zero happens often
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(8);
    const m = 2 + R.int(12);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_cancelling',
      input: build(n, Array.from({ length: m }, () => { const [a, b] = pair(n); return [a, b, 1 + R.int(2)]; })),
    });
  }
  // sparse, so many isolated counterparties survive
  for (let t = 0; t < 10; t++) {
    const n = 5 + R.int(10);
    const m = R.int(4);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_sparse',
      input: build(n, Array.from({ length: m }, () => { const [a, b] = pair(n); return [a, b, 1 + R.int(50)]; })),
    });
  }
  // deliberate rings, which net to nothing
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(6);
    const amount = 1 + R.int(20);
    const trades = Array.from({ length: n }, (_, i) => [i + 1, ((i + 1) % n) + 1, amount]);
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_ring', input: build(n, trades) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000;
    const trades = Array.from({ length: 6000 }, () => { const [a, b] = pair(n); return [a, b, 1 + R.int(1000000)]; });
    T.push({ name: 'z01_medium', input: build(n, trades) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000, M = 200000;
  {
    const trades = Array.from({ length: M }, () => { const [a, b] = pair(N); return [a, b, 1 + R.int(1000000000)]; });
    T.push({ name: 'x01_max_random', input: build(N, trades) });
  }
  {
    // one enormous group: a spanning chain plus noise
    const trades = [];
    for (let i = 1; i < N; i++) trades.push([i, i + 1, 1 + R.int(1000000000)]);
    while (trades.length < M) { const [a, b] = pair(N); trades.push([a, b, 1 + R.int(1000000000)]); }
    T.push({ name: 'x02_max_one_group', input: build(N, trades) });
  }
  {
    // no trades at all: 100000 groups of one
    T.push({ name: 'x03_max_all_isolated', input: build(N, []) });
  }
  {
    // 50000 disjoint pairs
    const trades = Array.from({ length: N / 2 }, (_, i) => [2 * i + 1, 2 * i + 2, 1000000000]);
    T.push({ name: 'x04_max_many_pairs', input: build(N, trades) });
  }
  {
    // one giant ring: everything nets to zero
    const trades = Array.from({ length: N }, (_, i) => [i + 1, ((i + 1) % N) + 1, 1000000000]);
    T.push({ name: 'x05_max_ring_cancels', input: build(N, trades) });
  }
  {
    // every trade on the same pair, maximum amounts - the overflow case
    const trades = Array.from({ length: M }, () => [1, 2, 1000000000]);
    T.push({ name: 'x06_max_overflow_bait', input: build(N, trades) });
  }
  {
    // a star centred on the last counterparty
    const trades = Array.from({ length: N - 1 }, (_, i) => [i + 1, N, 1 + R.int(1000)]);
    T.push({ name: 'x07_max_star', input: build(N, trades) });
  }

  return T;
};
