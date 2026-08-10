'use strict';
// Test generator - m46 / Q133 Broken Keyboard
module.exports = function (R) {
  const T = [];
  const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
  const build = (s, keys) => `${s}\n${keys.length}\n${keys.join(' ')}\n`;
  const rand = (k, alpha) => Array.from({ length: k }, () => ALPHA[R.int(alpha)]).join('');
  const pickKeys = (k) => {
    const pool = ALPHA.split('');
    for (let i = pool.length - 1; i > 0; i--) { const j = R.int(i + 1); const t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    return pool.slice(0, k).sort();
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_split_by_c', input: build('abacaba', ['a', 'b']) });
  T.push({ name: 'e02_no_key_appears', input: build('abc', ['z']) });
  T.push({ name: 'e03_all_typeable', input: build('aaaa', ['a']) });
  T.push({ name: 'e04_whole_document', input: build('xyzzy', ['x', 'y', 'z']) });
  T.push({ name: 'e05_single_char_ok', input: build('a', ['a']) });
  T.push({ name: 'e06_single_char_broken', input: build('a', ['b']) });
  T.push({ name: 'e07_run_at_start', input: build('aaabbb', ['a']) });
  T.push({ name: 'e08_run_at_end', input: build('bbbaaa', ['a']) });
  T.push({ name: 'e09_alternating', input: build('ababababab', ['a']) });
  T.push({ name: 'e10_all_26_keys', input: build('thequickbrownfox', ALPHA.split('')) });
  T.push({ name: 'e11_broken_at_both_ends', input: build('zaaaaz', ['a']) });
  T.push({ name: 'e12_two_equal_runs', input: build('aabaa', ['a']) });
  T.push({ name: 'e13_longest_is_second', input: build('aa' + 'b' + 'aaaa', ['a']) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const alpha = 2 + R.int(4);
    const s = rand(1 + R.int(45), alpha);
    const keys = pickKeys(1 + R.int(4));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(s, keys) });
  }
  // keys drawn from the letters actually present, so runs are long
  for (let t = 0; t < 10; t++) {
    const alpha = 3 + R.int(3);
    const s = rand(10 + R.int(35), alpha);
    const present = Array.from(new Set(s.split(''))).sort();
    const keys = present.slice(0, 1 + R.int(present.length));
    T.push({ name: 'h' + String(t + 1).padStart(2, '0') + '_keys_from_s', input: build(s, keys) });
  }
  // almost nothing works: answers cluster near 0 and 1
  for (let t = 0; t < 10; t++) {
    const s = rand(5 + R.int(40), 6);
    T.push({ name: 'z' + String(t + 1).padStart(2, '0') + '_one_key', input: build(s, [ALPHA[R.int(6)]]) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(rand(30000, 5), pickKeys(3)) });

  // --- maximum size --------------------------------------------------
  const N = 1000000;
  T.push({ name: 'x01_max_random_26', input: build(rand(N, 26), pickKeys(13)) });
  T.push({ name: 'x02_max_random_binary', input: build(rand(N, 2), ['a']) });
  T.push({ name: 'x03_max_everything_works', input: build(rand(N, 26), ALPHA.split('')) });
  T.push({ name: 'x04_max_nothing_works', input: build('a'.repeat(N), ['z']) });
  T.push({ name: 'x05_max_one_long_run', input: build('a'.repeat(N), ['a']) });
  {
    // the longest run sits right at the very end
    const s = ('ab'.repeat(N / 4)) + 'a'.repeat(N / 2);
    T.push({ name: 'x06_max_run_at_end', input: build(s.slice(0, N), ['a']) });
  }
  {
    // the longest run sits right at the very start
    const s = 'a'.repeat(N / 2) + 'ab'.repeat(N / 4);
    T.push({ name: 'x07_max_run_at_start', input: build(s.slice(0, N), ['a']) });
  }
  {
    // one broken character every other position: every run is length 1
    let s = '';
    for (let i = 0; s.length < N; i++) s += i % 2 ? 'z' : 'a';
    T.push({ name: 'x08_max_all_runs_of_one', input: build(s.slice(0, N), ['a']) });
  }

  return T;
};
