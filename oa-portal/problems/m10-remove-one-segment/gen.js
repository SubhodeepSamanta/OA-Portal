'use strict';
// Test generator - m10 / Q48 Remove One Segment
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_positive', input: line([5]) });
  T.push({ name: 'e02_single_negative', input: line([-5]) });          // -> 0
  T.push({ name: 'e03_all_positive', input: line([2, 3, 1, 4]) });     // remove nothing
  T.push({ name: 'e04_all_negative', input: line([-1, -2, -3]) });     // remove everything
  T.push({ name: 'e05_one_dip', input: line([1, -4, 2, -1, 3]) });
  T.push({ name: 'e06_dip_at_start', input: line([-9, 4, 4, 4]) });
  T.push({ name: 'e07_dip_at_end', input: line([4, 4, 4, -9]) });
  T.push({ name: 'e08_all_zero', input: line(Array(40).fill(0)) });
  T.push({ name: 'e09_alternating', input: line([5, -5, 5, -5, 5, -5]) });
  T.push({ name: 'e10_extremes', input: line([1000000000, -1000000000, 1000000000]) });
  T.push({ name: 'e11_two', input: line([-3, 7]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 16; t++) {
    const n = 1 + R.int(40);
    const lim = [1, 3, 20, 1000000000][t % 4];
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: line(Array.from({ length: n }, () => R.int(2 * lim + 1) - lim)),
    });
  }
  // heavily negative randoms, where "remove everything" competes
  for (let t = 0; t < 5; t++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'n' + String(t + 1).padStart(2, '0') + '_mostly_negative',
      input: line(Array.from({ length: n }, () => R.int(12) - 10)),
    });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(Array.from({ length: 5000 }, () => R.int(2001) - 1000)) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(Array.from({ length: N }, () => R.int(2000000001) - 1000000000)) });
  T.push({ name: 'x02_max_all_positive', input: line(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_negative', input: line(Array(N).fill(-1000000000)) });
  T.push({ name: 'x04_max_narrow', input: line(Array.from({ length: N }, () => R.int(3) - 1)) });
  {
    const a = Array(N).fill(1000);
    for (let i = N / 3; i < (2 * N) / 3; i++) a[i] = -1000;   // one long central dip
    T.push({ name: 'x05_max_central_dip', input: line(a) });
  }
  T.push({ name: 'x06_max_alternating', input: line(Array.from({ length: N }, (_, i) => (i % 2 ? -1000000000 : 1000000000))) });

  return T;
};
