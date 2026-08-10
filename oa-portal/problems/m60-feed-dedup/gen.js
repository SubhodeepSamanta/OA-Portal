'use strict';
// Test generator - m60 / Q155 Feed Dedup
// Posts may contain spaces and punctuation but never leading or trailing
// whitespace, so the sample blocks in the statement stay unambiguous.
module.exports = function (R) {
  const T = [];
  const build = (posts) => `${posts.length}\n${posts.join('\n')}\n`;
  const LET = 'abcdefghijklmnopqrstuvwxyz';
  const PUNCT = '!?.,;:-_#@*()';

  const letters = (k, alpha) => Array.from({ length: k }, () => LET[R.int(alpha)]).join('');
  const shuffle = (s) => {
    const a = s.split('');
    for (let i = a.length - 1; i > 0; i--) { const j = R.int(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a.join('');
  };
  // scatter punctuation, spaces and random capitals through a letter string
  const dress = (s) => {
    let out = '';
    for (const ch of s) {
      out += R.next() < 0.3 ? ch.toUpperCase() : ch;
      if (R.next() < 0.25) out += R.next() < 0.5 ? ' ' : PUNCT[R.int(PUNCT.length)];
    }
    return out.trim() || s;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_anagrams', input: build(['Listen!', 'Silent', 'enlist']) });
  T.push({ name: 'e02_two_distinct', input: build(['hello', 'world']) });
  T.push({ name: 'e03_two_groups', input: build(['Dormitory', 'Dirty Room!!', 'abc', 'cab']) });
  T.push({ name: 'e04_no_letters_at_all', input: build(['!!!', '...', '123']) });
  T.push({ name: 'e05_single_post', input: build(['a']) });
  T.push({ name: 'e06_case_only_difference', input: build(['ABC', 'abc', 'AbC']) });
  T.push({ name: 'e07_counts_matter', input: build(['aab', 'abb']) });
  T.push({ name: 'e08_same_letters_different_counts', input: build(['aa', 'a']) });
  T.push({ name: 'e09_digits_stripped', input: build(['a1b2c3', 'c3b2a1', 'abc']) });
  T.push({ name: 'e10_spaces_inside', input: build(['a b c', 'abc', 'c b a']) });
  T.push({ name: 'e11_empty_vs_letters', input: build(['...', 'a']) });
  T.push({ name: 'e12_all_identical', input: build(['same', 'same', 'same', 'same']) });
  T.push({ name: 'e13_full_alphabet', input: build([LET, shuffle(LET), LET.toUpperCase()]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 20; t++) {
    const groups = 1 + R.int(4);
    const bases = Array.from({ length: groups }, () => letters(1 + R.int(8), 2 + R.int(4)));
    const posts = [];
    const count = 2 + R.int(10);
    for (let i = 0; i < count; i++) posts.push(dress(shuffle(bases[R.int(groups)])));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(posts) });
  }
  // all-distinct posts
  for (let t = 0; t < 10; t++) {
    const count = 2 + R.int(8);
    const posts = Array.from({ length: count }, (_, i) => letters(3 + i, 20));
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_mostly_distinct', input: build(posts) });
  }
  // heavy punctuation and spacing
  for (let t = 0; t < 10; t++) {
    const base = letters(2 + R.int(6), 3);
    const posts = Array.from({ length: 2 + R.int(8) }, () => dress(shuffle(base)));
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_punctuation_heavy', input: build(posts) });
  }
  // several posts with no letters at all
  for (let t = 0; t < 8; t++) {
    const posts = [];
    for (let i = 0; i < 2 + R.int(6); i++)
      posts.push(R.next() < 0.5 ? PUNCT.slice(0, 1 + R.int(5)) : letters(1 + R.int(4), 3));
    T.push({ name: 'z' + String(t + 1).padStart(2, '0') + '_empty_mix', input: build(posts) });
  }

  // --- medium --------------------------------------------------------
  {
    const bases = Array.from({ length: 50 }, () => letters(20, 26));
    const posts = Array.from({ length: 3000 }, () => shuffle(bases[R.int(50)]));
    T.push({ name: 'm01_medium', input: build(posts) });
  }

  // --- maximum size --------------------------------------------------
  const N = 100000;
  {
    // 100000 posts of about 10 characters each
    const posts = Array.from({ length: N }, () => letters(9, 26));
    T.push({ name: 'x01_max_random_short', input: build(posts) });
  }
  {
    // every post an anagram of one base: the answer is 1
    const base = letters(9, 26);
    const posts = Array.from({ length: N }, () => shuffle(base));
    T.push({ name: 'x02_max_all_same', input: build(posts) });
  }
  {
    // every post distinct by construction
    const posts = Array.from({ length: N }, (_, i) => 'a'.repeat(1 + (i % 9)) + 'b'.repeat(1 + Math.floor(i / 9) % 9) + letters(2, 26) + i.toString());
    T.push({ name: 'x03_max_mostly_distinct', input: build(posts) });
  }
  {
    // no letters anywhere: one distinct post
    const posts = Array.from({ length: N }, () => PUNCT.slice(0, 1 + R.int(8)));
    T.push({ name: 'x04_max_no_letters', input: build(posts) });
  }
  {
    // a few very long posts instead of many short ones
    const base = letters(100000, 26);
    const posts = [base, shuffle(base), shuffle(base), letters(100000, 26)];
    T.push({ name: 'x05_max_long_posts', input: build(posts) });
  }
  {
    // heavy punctuation at full size
    const base = letters(4, 3);
    const posts = Array.from({ length: N }, () => dress(shuffle(base)));
    T.push({ name: 'x06_max_punctuation', input: build(posts) });
  }
  {
    // exactly two groups, split down the middle
    const a = letters(8, 26), b = letters(8, 26) + 'z';
    const posts = Array.from({ length: N }, (_, i) => shuffle(i % 2 ? a : b));
    T.push({ name: 'x07_max_two_groups', input: build(posts) });
  }

  return T;
};
