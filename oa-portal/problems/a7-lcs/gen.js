'use strict';
// Test generator - a7 / Q94 LCS (AtCoder EDPC F)
// Small cases keep |s| <= 14 so the bitmask brute can enumerate every
// subsequence. Small alphabets are used deliberately: over 26 letters two
// random short strings share almost nothing, and the interesting cases are
// the ones where many different subsequences tie for the longest.
module.exports = function (R) {
  const T = [];
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const word = (len, alpha) =>
    Array.from({ length: len }, () => alpha[R.int(alpha.length)]).join('');
  const build = (s, t) => `${s}\n${t}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: build('axyb', 'abyxb') });
  T.push({ name: 'e02_edpc_sample2', input: build('aa', 'xayaz') });
  T.push({ name: 'e03_edpc_sample3_empty', input: build('a', 'z') });      // LCS is empty
  T.push({ name: 'e04_edpc_sample4', input: build('abracadabra', 'avadakedavra') });
  T.push({ name: 'e05_identical', input: build('abcabc', 'abcabc') });
  T.push({ name: 'e06_no_common_letter', input: build('aaaa', 'bbbb') });  // empty again
  T.push({ name: 'e07_single_each_match', input: build('q', 'q') });
  T.push({ name: 'e08_one_is_a_letter', input: build('zzzz', 'z') });
  T.push({ name: 'e09_reversed', input: build('abcde', 'edcba') });
  T.push({ name: 'e10_all_same_letter', input: build('aaaaaa', 'aaa') });
  T.push({ name: 'e11_prefix_of_other', input: build('abcdef', 'abc') });
  T.push({ name: 'e12_interleaved_ties', input: build('abab', 'baba') });

  // --- small randoms (bitmask brute enumerates every subsequence) -----
  for (let i = 0; i < 24; i++) {
    const alpha = letters.slice(0, 2 + R.int(4));       // 2-5 distinct letters
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(word(1 + R.int(14), alpha), word(1 + R.int(14), alpha)),
    });
  }
  // wide alphabet, so the LCS is short and the walk mostly skips
  for (let i = 0; i < 8; i++) {
    T.push({
      name: 'a' + String(i + 1).padStart(2, '0') + '_wide_alphabet',
      input: build(word(1 + R.int(14), letters), word(1 + R.int(14), letters)),
    });
  }
  // very lopsided lengths
  for (let i = 0; i < 6; i++) {
    const alpha = letters.slice(0, 3);
    T.push({
      name: 'l' + String(i + 1).padStart(2, '0') + '_lopsided',
      input: build(word(1 + R.int(13), alpha), word(30 + R.int(200), alpha)),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 3000;
  T.push({ name: 'x01_max_random_26', input: build(word(N, letters), word(N, letters)) });
  T.push({
    // two letters: the LCS is a large fraction of the string, so the
    // reconstruction walk is long
    name: 'x02_max_binary_alphabet',
    input: build(word(N, 'ab'), word(N, 'ab')),
  });
  T.push({
    // identical maximum strings: the LCS is the whole 3000 characters
    name: 'x03_max_identical',
    input: (() => { const s = word(N, letters); return build(s, s); })(),
  });
  T.push({
    // disjoint alphabets at full size: the answer is empty
    name: 'x04_max_disjoint',
    input: build(word(N, 'abcdefghijklm'), word(N, 'nopqrstuvwxyz')),
  });
  T.push({
    // one long run against another: LCS is min(|s|, |t|) of the same letter
    name: 'x05_max_all_same',
    input: build('a'.repeat(N), 'a'.repeat(N)),
  });
  T.push({
    name: 'x06_max_lopsided',
    input: build(word(1, letters), word(N, letters)),
  });

  return T;
};
