'use strict';
// Test generator - m4 / Q11 Warehouse Bay Audit
module.exports = function (R) {
  const T = [];
  const line = (a) => `${a.length}\n${a.join(' ')}\n`;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = R.int(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single', input: line([42]) });
  T.push({ name: 'e02_all_same', input: line(Array(50).fill(-7)) });
  T.push({ name: 'e03_no_run', input: line([1, 3, 5, 7, 9, 11]) });
  T.push({ name: 'e04_one_long_run', input: line(shuffle(Array.from({ length: 100 }, (_, i) => i - 50))) });
  T.push({ name: 'e05_across_zero', input: line([-2, -1, 0, 1, 2]) });
  T.push({ name: 'e06_extremes', input: line([-1000000000, 1000000000, -999999999]) });
  T.push({ name: 'e07_dupes_inflate', input: line([5, 5, 5, 5, 5, 6]) });
  T.push({ name: 'e08_two_runs_tie', input: line([1, 2, 3, 10, 11, 12]) });

  // --- small randoms (stress-compared against brute) ---------------
  for (let t = 0; t < 12; t++) {
    const n = 1 + R.int(60);
    const spread = [3, 10, 50, 1000000000][t % 4];
    const a = Array.from({ length: n }, () => R.int(2 * spread + 1) - spread);
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: line(a) });
  }

  // --- medium ------------------------------------------------------
  {
    const a = Array.from({ length: 5000 }, () => R.int(4000) - 2000);
    T.push({ name: 'm01_medium_dense', input: line(a) });
  }

  // --- maximum size ------------------------------------------------
  const N = 200000;
  {
    // one enormous run, shuffled - answer is N
    T.push({ name: 'x01_max_one_run', input: line(shuffle(Array.from({ length: N }, (_, i) => i - 100000))) });
  }
  {
    // all distinct and far apart - answer is 1
    const set = new Set();
    while (set.size < N) set.add(R.int(2000000001) - 1000000000);
    T.push({ name: 'x02_max_scattered', input: line(shuffle([...set])) });
  }
  {
    // every ID identical - answer is 1
    T.push({ name: 'x03_max_all_same', input: line(Array(N).fill(123456789)) });
  }
  {
    // many medium runs
    const a = [];
    let base = -1000000000;
    while (a.length < N) {
      const len = 1 + R.int(40);
      for (let i = 0; i < len && a.length < N; i++) a.push(base + i);
      base += len + 1 + R.int(1000);
    }
    T.push({ name: 'x04_max_many_runs', input: line(shuffle(a)) });
  }
  {
    // heavy duplication over a small window
    const a = Array.from({ length: N }, () => R.int(1000));
    T.push({ name: 'x05_max_heavy_dupes', input: line(a) });
  }

  return T;
};
