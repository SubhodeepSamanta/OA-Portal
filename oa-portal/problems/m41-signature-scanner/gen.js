'use strict';
// Test generator - m41 / Q126 Signature Scanner
// |p| <= |s| always.
module.exports = function (R) {
  const T = [];
  const build = (p, s) => `${p}\n${s}\n`;
  const rand = (k, alpha) =>
    Array.from({ length: k }, () => 'abcdefghijklmnopqrstuvwxyz'[R.int(alpha)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1_overlapping', input: build('aba', 'abababa') });
  T.push({ name: 'e02_sample2_all_same', input: build('aa', 'aaaa') });
  T.push({ name: 'e03_no_match', input: build('abc', 'defgh') });
  T.push({ name: 'e04_single_char_both', input: build('a', 'a') });
  T.push({ name: 'e05_equal_length_match', input: build('hello', 'hello') });
  T.push({ name: 'e06_equal_length_no_match', input: build('hello', 'world') });
  T.push({ name: 'e07_single_char_pattern', input: build('a', 'abacadaeaf') });
  T.push({ name: 'e08_pattern_at_end', input: build('xyz', 'aaaaaxyz') });
  T.push({ name: 'e09_pattern_at_start', input: build('xyz', 'xyzaaaaa') });
  T.push({ name: 'e10_periodic_pattern', input: build('abab', 'abababababab') });
  T.push({ name: 'e11_worst_case_shape', input: build('aaaab', 'a'.repeat(40) + 'b') });
  T.push({ name: 'e12_all_a', input: build('a'.repeat(5), 'a'.repeat(20)) });
  T.push({ name: 'e13_near_miss_repeatedly', input: build('aab', 'aaaaaaaaab') });
  T.push({ name: 'e14_two_letter_alphabet', input: build('abb', 'abbabbabbaabb') });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 20; t++) {
    const alpha = 2 + R.int(3);
    const ns = 1 + R.int(40);
    const np = 1 + R.int(ns);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(rand(np, alpha), rand(ns, alpha)),
    });
  }
  // tiny alphabet: matches everywhere, heavy overlap
  for (let t = 0; t < 12; t++) {
    const ns = 5 + R.int(40);
    const np = 1 + R.int(Math.min(6, ns));
    T.push({
      name: 'b' + String(t + 1).padStart(2, '0') + '_binary_alphabet',
      input: build(rand(np, 2), rand(ns, 2)),
    });
  }
  // pattern lifted straight out of s, so at least one match is guaranteed
  for (let t = 0; t < 12; t++) {
    const s = rand(10 + R.int(40), 2 + R.int(2));
    const start = R.int(s.length);
    const len = 1 + R.int(s.length - start);
    T.push({
      name: 'h' + String(t + 1).padStart(2, '0') + '_substring_of_s',
      input: build(s.slice(start, start + len), s),
    });
  }
  // highly periodic strings, where the prefix function does real work
  for (let t = 0; t < 8; t++) {
    const unit = rand(1 + R.int(3), 2);
    const s = unit.repeat(3 + R.int(12)).slice(0, 45);
    const p = unit.repeat(1 + R.int(3)).slice(0, Math.max(1, s.length - R.int(5)));
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_periodic', input: build(p, s) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(rand(50, 3), rand(20000, 3)) });
  T.push({ name: 'm02_medium_periodic', input: build('ab'.repeat(30), 'ab'.repeat(10000)) });

  // --- maximum size --------------------------------------------------
  const N = 1000000;
  T.push({ name: 'x01_max_random_26', input: build(rand(1000, 26), rand(N, 26)) });
  T.push({ name: 'x02_max_random_binary', input: build(rand(1000, 2), rand(N, 2)) });
  {
    // the classic killer for naive matching: a long run of a with a b at the
    // end of the pattern, so every start position compares almost everything
    const p = 'a'.repeat(50000) + 'b';
    T.push({ name: 'x03_max_naive_killer', input: build(p, 'a'.repeat(N)) });
  }
  {
    // one million occurrences: the output line is the bottleneck
    T.push({ name: 'x04_max_million_hits', input: build('a', 'a'.repeat(N)) });
  }
  {
    // heavily overlapping long pattern
    T.push({ name: 'x05_max_periodic_overlap', input: build('ab'.repeat(5000), 'ab'.repeat(N / 2)) });
  }
  {
    // pattern the same length as the stream, matching exactly once
    const s = rand(N, 4);
    T.push({ name: 'x06_max_equal_length', input: build(s, s) });
  }
  {
    // pattern never occurs, but shares long prefixes with the stream
    T.push({ name: 'x07_max_no_match_long_prefix', input: build('a'.repeat(1000) + 'z', 'a'.repeat(N)) });
  }
  {
    // pattern sits only at the very end
    T.push({ name: 'x08_max_hit_at_end', input: build('qrst', 'a'.repeat(N - 4) + 'qrst') });
  }

  return T;
};
