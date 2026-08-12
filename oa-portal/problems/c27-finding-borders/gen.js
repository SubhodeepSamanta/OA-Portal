'use strict';
// Test generator - c27 / Q123 Finding Borders (CSES 1732)
// Small cases stay short for the O(n^2) brute. Periodic strings are the point:
// they have long chains of borders, which is where chaining the failure
// function either works or quietly stops after the first one.
module.exports = function (R) {
  const T = [];
  const build = (s) => `${s}\n`;
  const AB = 'abcdefghijklmnopqrstuvwxyz';
  const word = (len, alpha) => Array.from({ length: len }, () => AB[R.int(alpha)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build('abcababcab') });
  T.push({ name: 'e02_single_char', input: build('a') });            // no borders
  T.push({ name: 'e03_two_same', input: build('aa') });              // border 1
  T.push({ name: 'e04_two_diff', input: build('ab') });              // none
  T.push({ name: 'e05_all_same', input: build('aaaaaa') });          // 1 2 3 4 5
  T.push({ name: 'e06_no_borders', input: build('abcdefg') });
  T.push({ name: 'e07_periodic', input: build('abababab') });
  T.push({ name: 'e08_nested_borders', input: build('aabaabaabaab') });
  T.push({ name: 'e09_full_palindrome', input: build('abacaba') });
  T.push({ name: 'e10_one_border_only', input: build('abcda') });

  // --- small randoms -------------------------------------------------
  for (let i = 0; i < 20; i++) {
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(word(1 + R.int(200), 26)),
    });
  }
  // tiny alphabets - borders become common
  for (let i = 0; i < 12; i++) {
    T.push({
      name: 'b' + String(i + 1).padStart(2, '0') + '_binary',
      input: build(word(1 + R.int(300), 2)),
    });
  }
  // built to have a long border chain: repeat a random block
  for (let i = 0; i < 10; i++) {
    const block = word(1 + R.int(5), 2);
    const reps = 2 + R.int(20);
    T.push({ name: 'p' + String(i + 1).padStart(2, '0') + '_periodic', input: build(block.repeat(reps)) });
  }

  // --- maximum size --------------------------------------------------
  const N = 1000000;
  T.push({ name: 'x01_max_random', input: build(word(N, 26)) });
  T.push({
    // a million identical characters: n-1 borders, the longest possible answer
    name: 'x02_max_all_same',
    input: build('a'.repeat(N)),
  });
  T.push({ name: 'x03_max_binary', input: build(word(N, 2)) });
  T.push({ name: 'x04_max_periodic', input: build('ab'.repeat(N / 2)) });
  T.push({
    // a long block repeated - a moderate chain of borders at full size
    name: 'x05_max_block_repeat',
    input: build('abcde'.repeat(N / 5)),
  });
  T.push({
    // no borders at all at full size: distinct-ish prefix then a unique tail
    name: 'x06_max_no_borders',
    input: build('a'.repeat(N - 1) + 'b'),
  });

  return T;
};
