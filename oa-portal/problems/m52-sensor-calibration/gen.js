'use strict';
// Test generator - m52 / Q139 Sensor Calibration
// Small cases keep n <= 14 so brute.cpp runs its exhaustive subset mode.
module.exports = function (R) {
  const T = [];
  const build = (a) => `${a.length}\n${a.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_already_increasing', input: build([1, 2, 3, 4, 5]) });
  T.push({ name: 'e02_decreasing', input: build([5, 4, 3, 2, 1]) });
  T.push({ name: 'e03_single', input: build([7]) });
  T.push({ name: 'e04_zigzag', input: build([1, 5, 2, 4, 3, 6]) });
  T.push({ name: 'e05_all_same', input: build([4, 4, 4, 4]) });
  T.push({ name: 'e06_gap_too_small', input: build([1, 2]) });
  T.push({ name: 'e07_exact_gap', input: build([1, 3, 5]) });
  T.push({ name: 'e08_wide_gaps', input: build([1, 1000, 2000, 3000]) });
  T.push({ name: 'e09_two_equal_after_shift', input: build([5, 6, 7, 1, 2, 3]) });
  T.push({ name: 'e10_extremes', input: build([1000000000, 1]) });
  T.push({ name: 'e11_plateau_then_jump', input: build([3, 3, 3, 100]) });
  T.push({ name: 'e12_strict_needed', input: build([1, 1]) });
  T.push({ name: 'e13_max_values', input: build([1000000000, 1000000000, 1000000000]) });

  // --- small randoms (exhaustive subset brute, n <= 14) -------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(14);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(30))),
    });
  }
  // tiny value range: lots of ties, where non-decreasing vs strict matters
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(12);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_many_ties',
      input: build(Array.from({ length: n }, () => 1 + R.int(4))),
    });
  }
  // nearly sorted, with a few positions knocked out of place
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(10);
    const a = Array.from({ length: n }, (_, i) => (i + 1) * 3);
    for (let k = 0; k < 1 + R.int(3); k++) a[R.int(n)] = 1 + R.int(40);
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_nearly_sorted', input: build(a) });
  }
  // values spaced exactly one apart, the tightest legal spacing
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(11);
    const start = 1 + R.int(20);
    const a = Array.from({ length: n }, (_, i) => start + i);
    for (let k = 0; k < R.int(3); k++) a[R.int(n)] = 1 + R.int(30);
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_tight_spacing', input: build(a) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(Array.from({ length: 3000 }, () => 1 + R.int(1000000))) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_already_increasing', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x03_max_decreasing', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({ name: 'x04_max_all_same', input: build(Array(N).fill(1000000000)) });
  T.push({
    // spaced exactly one apart: every reading is keepable, answer 0
    name: 'x05_max_tight_spacing',
    input: build(Array.from({ length: N }, (_, i) => i + 1)),
  });
  T.push({
    // b[i] identical throughout, so the whole thing is one non-decreasing run
    name: 'x06_max_constant_shift',
    input: build(Array.from({ length: N }, (_, i) => 5 + i)),
  });
  T.push({
    // sawtooth: long runs going the wrong way
    name: 'x07_max_sawtooth',
    input: build(Array.from({ length: N }, (_, i) => (i % 2 ? 1 : 1000000000))),
  });
  T.push({
    // sorted but too tightly packed to keep everything: values repeat in blocks
    name: 'x08_max_blocks',
    input: build(Array.from({ length: N }, (_, i) => 1 + Math.floor(i / 10))),
  });
  T.push({
    // random over a narrow range: heavy ties at full size
    name: 'x09_max_narrow_range',
    input: build(Array.from({ length: N }, () => 1 + R.int(50))),
  });

  return T;
};
