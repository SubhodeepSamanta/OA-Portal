'use strict';
// Test generator - a8 / Q96 Coins (AtCoder EDPC I)
// N is always ODD, as the constraints promise - the "more heads than tails"
// question has no tie to resolve precisely because of that. Small cases keep
// N <= 15 so the brute can enumerate all 2^N outcomes.
// Every probability carries exactly two decimals, again per the constraints.
module.exports = function (R) {
  const T = [];
  const pct = () => 1 + R.int(99);                 // 1..99, so 0 < p < 1
  const fmt = (v) => (v / 100).toFixed(2);
  const build = (ps) => `${ps.length}\n${ps.map(fmt).join(' ')}\n`;
  const oddUpTo = (max) => 1 + 2 * R.int((max - 1) / 2 + 1);

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build([30, 60, 80]) });
  T.push({ name: 'e02_edpc_sample2', input: build([50]) });
  T.push({ name: 'e03_edpc_sample3', input: build([42, 1, 42, 99, 42]) });
  T.push({ name: 'e04_single_lowest', input: build([1]) });
  T.push({ name: 'e05_single_highest', input: build([99]) });
  T.push({ name: 'e06_all_fair_three', input: build([50, 50, 50]) });      // exactly 0.5
  T.push({ name: 'e07_all_lowest', input: build(Array(9).fill(1)) });      // very near 0
  T.push({ name: 'e08_all_highest', input: build(Array(9).fill(99)) });    // very near 1
  T.push({ name: 'e09_half_split', input: build([99, 99, 1, 1, 50]) });
  T.push({ name: 'e10_ascending', input: build([10, 20, 30, 40, 50, 60, 70]) });
  T.push({ name: 'e11_all_fair_odd', input: build(Array(15).fill(50)) });  // exactly 0.5

  // --- small randoms (brute enumerates all 2^N outcomes) --------------
  for (let i = 0; i < 24; i++) {
    const n = oddUpTo(15);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, pct)),
    });
  }
  // biased low - the answer sits close to 0, where absolute error is easy but
  // a solution that sums the wrong half of the table is obviously wrong
  for (let i = 0; i < 8; i++) {
    const n = oddUpTo(15);
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_biased_low',
      input: build(Array.from({ length: n }, () => 1 + R.int(25))),
    });
  }
  // biased high
  for (let i = 0; i < 8; i++) {
    const n = oddUpTo(15);
    T.push({
      name: 'h' + String(i + 1).padStart(2, '0') + '_biased_high',
      input: build(Array.from({ length: n }, () => 75 + R.int(25))),
    });
  }
  // mid-sized: past the brute's exponential bound, still inside the stress
  // size cap, so these compare the two tables against each other
  for (let i = 0; i < 6; i++) {
    const n = 101 + 2 * R.int(150);
    T.push({
      name: 'm' + String(i + 1).padStart(2, '0') + '_mid',
      input: build(Array.from({ length: n }, pct)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 2999;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, pct)) });
  T.push({ name: 'x02_max_all_fair', input: build(Array(N).fill(50)) });     // exactly 0.5
  T.push({ name: 'x03_max_all_lowest', input: build(Array(N).fill(1)) });    // underflows to 0
  T.push({ name: 'x04_max_all_highest', input: build(Array(N).fill(99)) });  // rounds to 1
  T.push({
    // half strongly biased each way
    name: 'x05_max_split',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 5 : 95))),
  });
  T.push({
    name: 'x06_max_near_half',
    input: build(Array.from({ length: N }, () => 49 + R.int(3))),
  });

  return T;
};
