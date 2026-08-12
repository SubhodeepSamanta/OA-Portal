'use strict';
// Test generator - c26 / Q122 String Matching (CSES 1753)
// Small cases keep n*m modest for the O(n*m) brute. Heavily overlapping
// patterns are the point: resetting to 0 after a match instead of falling
// back to fail[m-1] is the bug this problem is built around.
module.exports = function (R) {
  const T = [];
  const build = (s, p) => `${s}\n${p}\n`;
  const AB = 'abcdefghijklmnopqrstuvwxyz';
  const word = (len, alpha) => Array.from({ length: len }, () => AB[R.int(alpha)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build('saippuakauppias', 'pp') });
  T.push({ name: 'e02_single_char_match', input: build('a', 'a') });
  T.push({ name: 'e03_single_char_no_match', input: build('a', 'b') });
  T.push({ name: 'e04_pattern_longer', input: build('ab', 'abc') });
  T.push({ name: 'e05_whole_string', input: build('abc', 'abc') });
  // overlaps: 'aa' occurs 3 times in 'aaaa'
  T.push({ name: 'e06_overlapping', input: build('aaaa', 'aa') });
  T.push({ name: 'e07_overlapping_long', input: build('aaaaaaaaaa', 'aaa') });
  T.push({ name: 'e08_overlapping_periodic', input: build('abababababab', 'abab') });
  T.push({ name: 'e09_no_occurrence', input: build('abcdefghij', 'xyz') });
  T.push({ name: 'e10_all_same_char', input: build('aaaaaaaa', 'a') });
  T.push({ name: 'e11_border_heavy', input: build('aabaabaabaab', 'aabaab') });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(word(1 + R.int(200), 26), word(1 + R.int(6), 26)),
    });
  }
  // two-letter alphabet - many partial matches and fallbacks
  for (let i = 0; i < 12; i++) {
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_binary_alphabet',
      input: build(word(1 + R.int(300), 2), word(1 + R.int(8), 2)),
    });
  }
  // single-letter strings - maximum overlap
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(200), m = 1 + R.int(10);
    T.push({ name: 'o' + String(i + 1).padStart(2, '0') + '_all_a', input: build('a'.repeat(n), 'a'.repeat(m)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 1000000;
  T.push({ name: 'x01_max_random', input: build(word(N, 26), word(1000, 26)) });
  T.push({
    // a million 'a's with a pattern of 'a's: nearly n occurrences, all overlapping
    name: 'x02_max_all_same',
    input: build('a'.repeat(N), 'a'.repeat(1000)),
  });
  T.push({ name: 'x03_max_binary', input: build(word(N, 2), word(500, 2)) });
  T.push({
    name: 'x04_max_periodic',
    input: build('ab'.repeat(N / 2), 'ab'.repeat(50)),
  });
  T.push({ name: 'x05_max_pattern_equals_string', input: build('a'.repeat(N), 'a'.repeat(N)) });
  T.push({ name: 'x06_max_pattern_longer', input: build('a'.repeat(1000), 'a'.repeat(N)) });
  T.push({ name: 'x07_max_no_match', input: build('a'.repeat(N), 'b'.repeat(100)) });

  return T;
};
