'use strict';
// Test generator - m11 / Q51 Log Line Normalizer
module.exports = function (R) {
  const T = [];
  const line = (s) => s + '\n';
  const rnd = (n, pA) => Array.from({ length: n }, () => (R.next() < pA ? 'a' : 'b')).join('');

  // --- edge cases -------------------------------------------------
  T.push({ name: 'e01_single_a', input: line('a') });             // -1
  T.push({ name: 'e02_single_b', input: line('b') });             // -1
  T.push({ name: 'e03_ab', input: line('ab') });                  // 0
  T.push({ name: 'e04_ba', input: line('ba') });                  // -1
  T.push({ name: 'e05_bab', input: line('bab') });                // 1
  T.push({ name: 'e06_abab', input: line('abab') });              // 1
  T.push({ name: 'e07_already_valid', input: line('aabbb') });    // 0
  T.push({ name: 'e08_all_a', input: line('a'.repeat(40)) });     // -1
  T.push({ name: 'e09_all_b', input: line('b'.repeat(40)) });     // -1
  T.push({ name: 'e10_reversed', input: line('bbbaaa') });        // needs many deletions
  T.push({ name: 'e11_alternating', input: line('abababab') });
  T.push({ name: 'e12_one_a_at_end', input: line('bbbbba') });    // -1
  T.push({ name: 'e13_one_b_at_start', input: line('baaaaa') });  // -1

  // --- small randoms (bitmask brute checks these exactly) ---------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(14);
    const pA = [0.2, 0.5, 0.8][t % 3];
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny', input: line(rnd(n, pA)) });
  }
  for (let t = 0; t < 8; t++) {
    T.push({ name: 's' + String(t + 1).padStart(2, '0') + '_random_small', input: line(rnd(1 + R.int(60), 0.5)) });
  }

  // --- medium ------------------------------------------------------
  T.push({ name: 'm01_medium', input: line(rnd(5000, 0.5)) });

  // --- maximum size ------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: line(rnd(N, 0.5)) });
  T.push({ name: 'x02_max_a_heavy', input: line(rnd(N, 0.9)) });
  T.push({ name: 'x03_max_b_heavy', input: line(rnd(N, 0.1)) });
  T.push({ name: 'x04_max_all_a', input: line('a'.repeat(N)) });
  T.push({ name: 'x05_max_all_b', input: line('b'.repeat(N)) });
  T.push({ name: 'x06_max_already_valid', input: line('a'.repeat(N / 2) + 'b'.repeat(N / 2)) });
  T.push({ name: 'x07_max_reversed', input: line('b'.repeat(N / 2) + 'a'.repeat(N / 2)) });
  T.push({ name: 'x08_max_alternating', input: line('ab'.repeat(N / 2)) });

  return T;
};
