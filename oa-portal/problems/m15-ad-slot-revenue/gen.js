'use strict';
// Test generator - m15 / Q107 Ad Slot Revenue
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: line([7]) });
  T.push({ name: 'e02_two', input: line([3, 4]) });          // concession takes both
  T.push({ name: 'e03_pair_wins', input: line([1, 9, 8, 1]) });
  T.push({ name: 'e04_pair_unused', input: line([5, 1, 1, 1, 5]) });
  // kept at <= 20 so the bitmask brute force can verify them exactly
  T.push({ name: 'e05_all_zero', input: line(Array(20).fill(0)) });
  T.push({ name: 'e06_all_equal', input: line(Array(18).fill(5)) });
  T.push({ name: 'e07_increasing', input: line([1, 2, 3, 4, 5, 6]) });
  T.push({ name: 'e08_two_big_adjacent', input: line([1, 1000000000, 1000000000, 1]) });
  T.push({ name: 'e09_alternating_big', input: line([1000000000, 1, 1000000000, 1, 1000000000]) });
  T.push({ name: 'e10_three', input: line([2, 9, 2]) });

  // --- small randoms (bitmask brute checks these exactly) ---------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(16);
    const lim = [1, 3, 20, 1000000000][t % 4];
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: line(Array.from({ length: n }, () => R.int(lim + 1))),
    });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(Array.from({ length: 5000 }, () => R.int(100001))) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(Array.from({ length: N }, () => R.int(1000000001))) });
  T.push({ name: 'x02_max_all_max', input: line(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_zero', input: line(Array(N).fill(0)) });
  T.push({ name: 'x04_max_alternating', input: line(Array.from({ length: N }, (_, i) => (i % 2 ? 1 : 1000000000))) });
  T.push({ name: 'x05_max_narrow', input: line(Array.from({ length: N }, () => R.int(3))) });
  {
    // one enormous adjacent pair buried in a flat field
    const a = Array(N).fill(1);
    a[N >> 1] = 1000000000;
    a[(N >> 1) + 1] = 1000000000;
    T.push({ name: 'x06_max_single_pair', input: line(a) });
  }
  T.push({ name: 'x07_max_increasing', input: line(Array.from({ length: N }, (_, i) => i)) });

  return T;
};
