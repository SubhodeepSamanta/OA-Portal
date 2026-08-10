'use strict';
// Test generator - m81 / Q184 Permission Merge
// Every mask must be < 2^b.
module.exports = function (R) {
  const T = [];
  const build = (b, masks) => `${masks.length} ${b}\n${masks.join(' ')}\n`;
  const rand = (n, b) => Array.from({ length: n }, () => R.int(1 << b));

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_all_pairs', input: build(3, [3, 5, 6]) });
  T.push({ name: 'e02_no_pair_works', input: build(2, [1, 1]) });
  T.push({ name: 'e03_full_masks_present', input: build(2, [3, 3, 0, 1]) });
  T.push({ name: 'e04_single_role', input: build(5, [31]) });
  T.push({ name: 'e05_all_full', input: build(3, [7, 7, 7, 7]) });
  T.push({ name: 'e06_all_empty', input: build(3, [0, 0, 0]) });
  T.push({ name: 'e07_one_bit_each', input: build(3, [1, 2, 4]) });
  T.push({ name: 'e08_complementary_pairs', input: build(4, [3, 12, 5, 10]) });
  T.push({ name: 'e09_one_permission', input: build(1, [0, 1, 1, 0]) });
  T.push({ name: 'e10_twenty_bits_full', input: build(20, [1048575, 1048575, 0]) });
  T.push({ name: 'e11_twenty_bits_halves', input: build(20, [1023, 1047552]) });

  // --- small randoms (all-pairs brute) ------------------------------
  for (let t = 0; t < 22; t++) {
    const b = 1 + R.int(6);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(b, rand(1 + R.int(40), b)),
    });
  }
  // dense masks, so most pairs qualify
  for (let t = 0; t < 10; t++) {
    const b = 2 + R.int(5);
    const FULL = (1 << b) - 1;
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_dense',
      input: build(b, Array.from({ length: 2 + R.int(30) }, () => FULL ^ (R.int(2) ? 0 : (1 << R.int(b))))),
    });
  }
  // sparse masks, so few pairs qualify
  for (let t = 0; t < 10; t++) {
    const b = 3 + R.int(5);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_sparse',
      input: build(b, Array.from({ length: 2 + R.int(30) }, () => 1 << R.int(b))),
    });
  }
  // deliberately complementary halves
  for (let t = 0; t < 8; t++) {
    const b = 2 + R.int(6);
    const FULL = (1 << b) - 1;
    const out = [];
    for (let i = 0; i < 2 + R.int(15); i++) { const m = R.int(1 << b); out.push(m, FULL ^ m); }
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_complementary', input: build(b, out) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(12, rand(3000, 12)) });

  // --- maximum size --------------------------------------------------
  const N = 200000, B = 20, FULL = (1 << B) - 1;
  T.push({ name: 'x01_max_random', input: build(B, rand(N, B)) });
  T.push({
    // every role covers everything: all pairs qualify, and the self-pair
    // correction is what keeps the count right
    name: 'x02_max_all_full',
    input: build(B, Array(N).fill(FULL)),
  });
  T.push({ name: 'x03_max_all_empty', input: build(B, Array(N).fill(0)) });
  T.push({
    // exact complementary halves throughout
    name: 'x04_max_complementary',
    input: build(B, Array.from({ length: N }, (_, i) => (i % 2 ? FULL ^ 1023 : 1023))),
  });
  T.push({
    // each role missing exactly one permission
    name: 'x05_max_one_missing',
    input: build(B, Array.from({ length: N }, (_, i) => FULL ^ (1 << (i % B)))),
  });
  T.push({
    // single-bit roles only: a pair can only cover 2 of 20 permissions
    name: 'x06_max_single_bits',
    input: build(B, Array.from({ length: N }, (_, i) => 1 << (i % B))),
  });
  T.push({ name: 'x07_max_small_b', input: build(1, rand(N, 1)) });

  return T;
};
