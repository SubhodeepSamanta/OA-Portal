'use strict';
// Test generator - m12 / Q52 Log Line Normalizer II
module.exports = function (R) {
  const T = [];
  const line = (s, p, q, r) => `${s}\n${p} ${q} ${r}\n`;
  const rnd = (n, pA) => Array.from({ length: n }, () => (R.next() < pA ? 'a' : 'b')).join('');

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_bab_front_dear', input: line('bab', 5, 1, 1) });      // 5
  T.push({ name: 'e02_abab_splice_cheap', input: line('abab', 10, 10, 1) }); // 1
  T.push({ name: 'e03_impossible', input: line('ba', 1, 1, 1) });           // -1
  T.push({ name: 'e04_trim_beats_splice', input: line('bbaabb', 1, 1, 100) }); // 2
  T.push({ name: 'e05_splice_beats_trim', input: line('abba', 100, 100, 1) });
  T.push({ name: 'e06_already_valid', input: line('aabbb', 7, 7, 7) });     // 0
  T.push({ name: 'e07_single_a', input: line('a', 1, 1, 1) });              // -1
  T.push({ name: 'e08_single_b', input: line('b', 1, 1, 1) });              // -1
  T.push({ name: 'e09_all_a', input: line('a'.repeat(12), 1, 1, 1) });      // -1
  T.push({ name: 'e10_all_b', input: line('b'.repeat(12), 1, 1, 1) });      // -1
  T.push({ name: 'e11_reversed', input: line('bbbaaa', 1, 1, 1) });
  T.push({ name: 'e12_front_cheap', input: line('bbbbab', 1, 1000, 1000) });
  T.push({ name: 'e13_back_cheap', input: line('abaaaa', 1000, 1, 1000) });
  T.push({ name: 'e14_max_prices', input: line('bab', 1000000000, 1000000000, 1000000000) });

  // --- small randoms (bitmask brute checks these exactly) ---------
  for (let t = 0; t < 26; t++) {
    const n = 2 + R.int(12);
    const pA = [0.3, 0.5, 0.7][t % 3];
    const pick = () => [1, 2, 5, 1000, 1000000000][R.int(5)];
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: line(rnd(n, pA), pick(), pick(), pick()),
    });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(rnd(5000, 0.5), 3, 5, 7) });
  T.push({ name: 'm02_medium_splice_dear', input: line(rnd(5000, 0.5), 1, 1, 1000000) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(rnd(N, 0.5), 3, 5, 7) });
  T.push({ name: 'x02_max_splice_cheap', input: line(rnd(N, 0.5), 1000000000, 1000000000, 1) });
  T.push({ name: 'x03_max_trim_cheap', input: line(rnd(N, 0.5), 1, 1, 1000000000) });
  T.push({ name: 'x04_max_all_a', input: line('a'.repeat(N), 1, 1, 1) });            // -1
  T.push({ name: 'x05_max_all_b', input: line('b'.repeat(N), 1, 1, 1) });            // -1
  T.push({ name: 'x06_max_valid', input: line('a'.repeat(N / 2) + 'b'.repeat(N / 2), 9, 9, 9) }); // 0
  T.push({ name: 'x07_max_reversed', input: line('b'.repeat(N / 2) + 'a'.repeat(N / 2), 2, 3, 5) });
  T.push({ name: 'x08_max_alternating', input: line('ab'.repeat(N / 2), 1000000000, 1000000000, 1) });
  T.push({ name: 'x09_max_overflow', input: line(rnd(N, 0.5), 1000000000, 1000000000, 1000000000) });

  return T;
};
