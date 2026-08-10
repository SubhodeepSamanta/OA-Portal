'use strict';
// Test generator - m42 / Q127 Playlist Symmetry
// Small cases stay short because brute.cpp is O(n^3) with string copies.
module.exports = function (R) {
  const T = [];
  const build = (s) => `${s}\n`;
  const rand = (k, alpha) =>
    Array.from({ length: k }, () => 'abcdefghijklmnopqrstuvwxyz'[R.int(alpha)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_aabaa', input: build('aabaa') });
  T.push({ name: 'e02_all_distinct', input: build('abc') });
  T.push({ name: 'e03_all_same', input: build('aaaa') });
  T.push({ name: 'e04_single', input: build('a') });
  T.push({ name: 'e05_two_same', input: build('aa') });
  T.push({ name: 'e06_two_different', input: build('ab') });
  T.push({ name: 'e07_full_alphabet_once', input: build('abcdefghijklmnopqrstuvwxyz') });
  T.push({ name: 'e08_even_palindrome', input: build('abccba') });
  T.push({ name: 'e09_odd_palindrome', input: build('abcba') });
  T.push({ name: 'e10_nested_palindromes', input: build('abaaba') });
  T.push({ name: 'e11_repeated_unit', input: build('abababab') });
  T.push({ name: 'e12_two_blocks', input: build('aaabbb') });
  T.push({ name: 'e13_palindrome_of_palindromes', input: build('aabaacaabaa') });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(rand(1 + R.int(45), 1 + R.int(4))),
    });
  }
  // binary alphabet: palindromes are dense
  for (let t = 0; t < 12; t++) {
    T.push({
      name: 'b' + String(t + 1).padStart(2, '0') + '_binary',
      input: build(rand(5 + R.int(45), 2)),
    });
  }
  // built by mirroring, so long palindromes really exist
  for (let t = 0; t < 10; t++) {
    const half = rand(2 + R.int(18), 2 + R.int(2));
    const s = half + (R.next() < 0.5 ? '' : 'z') + half.split('').reverse().join('');
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_mirrored', input: build(s) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium_random', input: build(rand(3000, 3)) });
  T.push({ name: 'm02_medium_all_same', input: build('a'.repeat(3000)) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random_26', input: build(rand(N, 26)) });
  T.push({ name: 'x02_max_random_binary', input: build(rand(N, 2)) });
  T.push({ name: 'x03_max_all_same', input: build('a'.repeat(N)) });
  T.push({ name: 'x04_max_alternating', input: build('ab'.repeat(N / 2)) });
  {
    // one enormous palindrome: the suffix-link chain is as deep as it gets
    const half = rand(N / 2, 2);
    T.push({ name: 'x05_max_single_palindrome', input: build(half + half.split('').reverse().join('')) });
  }
  {
    // blocks of repeated letters: many long palindromes, heavy fallback
    let s = '';
    let i = 0;
    while (s.length < N) { s += 'abcdefghij'[i++ % 10].repeat(1 + (i % 40)); }
    T.push({ name: 'x06_max_blocks', input: build(s.slice(0, N)) });
  }
  {
    // a palindrome made of palindromes, nested as deeply as it will go
    let s = 'a';
    while (s.length * 2 + 1 <= N) s = s + 'b' + s;
    T.push({ name: 'x07_max_nested', input: build(s.padEnd(N, 'c')) });
  }
  {
    // no palindrome longer than one character anywhere
    let s = '';
    for (let i = 0; s.length < N; i++) s += 'abc'[i % 3];
    T.push({ name: 'x08_max_no_long_palindromes', input: build(s.slice(0, N)) });
  }

  return T;
};
