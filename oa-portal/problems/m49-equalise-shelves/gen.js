'use strict';
// Test generator - m49 / Q136 Equalise the Shelves
// Small cases keep the VALUES small too: brute.cpp moves one book at a time,
// so its cost is the answer itself, not the array length.
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([1, 2, 3]) });
  T.push({ name: 'e02_not_divisible', input: build([1, 2]) });
  T.push({ name: 'e03_single_shelf', input: build([5]) });
  T.push({ name: 'e04_all_at_one_end', input: build([0, 0, 0, 4]) });
  T.push({ name: 'e05_already_equal', input: build([7, 7, 7, 7]) });
  T.push({ name: 'e06_all_zero', input: build([0, 0, 0]) });
  T.push({ name: 'e07_two_shelves_ok', input: build([0, 8]) });
  T.push({ name: 'e08_alternating', input: build([0, 4, 0, 4, 0, 4]) });
  T.push({ name: 'e09_one_off_each_way', input: build([3, 1, 2]) });
  T.push({ name: 'e10_left_heavy', input: build([6, 0, 0]) });
  T.push({ name: 'e11_not_divisible_large', input: build([1000000000, 1000000000, 1]) });
  T.push({ name: 'e12_single_zero', input: build([0]) });

  // --- small randoms (stress-compared against brute) -----------------
  // values stay tiny so the one-book-at-a-time brute finishes quickly
  const divisible = (n, maxEach) => {
    const a = Array.from({ length: n }, () => R.int(maxEach + 1));
    let s = a.reduce((x, y) => x + y, 0);
    a[0] += (n - (s % n)) % n;                 // make the total divide evenly
    return a;
  };
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(9);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(divisible(n, 12)) });
  }
  // deliberately NOT divisible, so -1 gets exercised
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(8);
    const a = Array.from({ length: n }, () => R.int(20));
    let s = a.reduce((x, y) => x + y, 0);
    if (s % n === 0) a[0] += 1;
    T.push({ name: 'n' + String(t + 1).padStart(2, '0') + '_not_divisible', input: build(a) });
  }
  // everything piled at one end
  for (let t = 0; t < 8; t++) {
    const n = 2 + R.int(7);
    const a = Array(n).fill(0);
    a[R.next() < 0.5 ? 0 : n - 1] = n * (1 + R.int(6));
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_piled_at_end', input: build(a) });
  }
  // already balanced
  for (let t = 0; t < 6; t++) {
    const n = 1 + R.int(9);
    T.push({ name: 'b' + String(t + 1).padStart(2, '0') + '_already_equal', input: build(Array(n).fill(R.int(9))) });
  }

  // --- medium --------------------------------------------------------
  {
    const n = 3000;
    const a = Array.from({ length: n }, () => R.int(1000000));
    let s = a.reduce((x, y) => x + y, 0);
    a[0] += (n - (s % n)) % n;
    T.push({ name: 'm01_medium', input: build(a) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const a = Array.from({ length: N }, () => R.int(1000000000));
    let s = a.reduce((x, y) => x + y, 0);
    a[0] += (N - (s % N)) % N;
    T.push({ name: 'x01_max_random', input: build(a) });
  }
  {
    // the worst arrangement there is: first half full, second half empty.
    // The answer here is around 5*10^18 and overflows anything but int64.
    const a = Array.from({ length: N }, (_, i) => (i < N / 2 ? 1000000000 : 0));
    T.push({ name: 'x02_max_overflow_bait', input: build(a) });
  }
  {
    // every book on the very first shelf
    const a = Array(N).fill(0);
    a[0] = N * 5000;
    T.push({ name: 'x03_max_all_on_first', input: build(a) });
  }
  {
    // every book on the very last shelf
    const a = Array(N).fill(0);
    a[N - 1] = N * 5000;
    T.push({ name: 'x04_max_all_on_last', input: build(a) });
  }
  {
    // already equal at maximum value: answer 0
    T.push({ name: 'x05_max_already_equal', input: build(Array(N).fill(1000000000)) });
  }
  {
    // alternating full and empty: every gap carries traffic
    const a = Array.from({ length: N }, (_, i) => (i % 2 ? 0 : 2000000000 / 1000));
    T.push({ name: 'x06_max_alternating', input: build(a) });
  }
  {
    // total deliberately indivisible at full size
    const a = Array.from({ length: N }, () => R.int(1000000000));
    let s = a.reduce((x, y) => x + y, 0);
    if (s % N === 0) a[0] += 1;
    T.push({ name: 'x07_max_not_divisible', input: build(a) });
  }
  {
    // a single huge spike in the middle
    const a = Array(N).fill(0);
    a[N >> 1] = N * 3000;
    T.push({ name: 'x08_max_central_spike', input: build(a) });
  }

  return T;
};
