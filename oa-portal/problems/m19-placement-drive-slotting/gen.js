'use strict';
// Test generator - m19 / Q30 Placement Drive Slotting
// Every case must satisfy n <= 2m.
module.exports = function (R) {
  const T = [];
  const build = (m, arr) => `${arr.length} ${m}\n${arr.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_one_student_one_interviewer', input: build(1, [7]) });
  T.push({ name: 'e02_two_students_one_interviewer', input: build(1, [3, 9]) });
  T.push({ name: 'e03_sample_full_panel', input: build(2, [10, 20, 30, 40]) });
  T.push({ name: 'e04_sample_odd', input: build(2, [5, 5, 5]) });
  T.push({ name: 'e05_one_dominant', input: build(3, [1, 2, 3, 4, 100]) });
  T.push({ name: 'e06_all_equal_full', input: build(4, [6, 6, 6, 6, 6, 6, 6, 6]) });
  T.push({ name: 'e07_far_more_slots_than_students', input: build(10, [5, 5, 5]) });
  T.push({ name: 'e08_max_values', input: build(2, [1000000000, 1000000000, 1000000000, 1000000000]) });
  T.push({ name: 'e09_one_giant_rest_tiny', input: build(3, [1000000000, 1, 1, 1, 1, 1]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const m = 1 + R.int(5);
    const n = 1 + R.int(2 * m);
    const arr = Array.from({ length: n }, () => 1 + R.int(40));
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(m, arr) });
  }
  // exactly-full panels, where the pairing has no slack at all
  for (let t = 0; t < 8; t++) {
    const m = 1 + R.int(5);
    const arr = Array.from({ length: 2 * m }, () => 1 + R.int(60));
    T.push({ name: 'f' + String(t + 1).padStart(2, '0') + '_full_panel_small', input: build(m, arr) });
  }
  // heavy skew: a couple of long interviews among short ones
  for (let t = 0; t < 6; t++) {
    const m = 2 + R.int(4);
    const n = m + R.int(m + 1);
    const arr = Array.from({ length: n }, () => (R.next() < 0.25 ? 500 + R.int(200) : 1 + R.int(10)));
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_skewed_small', input: build(m, arr) });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(3000, Array.from({ length: 5500 }, () => 1 + R.int(1000000))),
  });

  // --- maximum size --------------------------------------------------
  const M = 100000;
  T.push({
    name: 'x01_max_full_panel',
    input: build(M, Array.from({ length: 2 * M }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x02_max_one_short_of_full',
    input: build(M, Array.from({ length: 2 * M - 1 }, () => 1 + R.int(1000000000))),
  });
  T.push({
    name: 'x03_max_all_equal',
    input: build(M, Array(2 * M).fill(1000000000)),
  });
  T.push({
    name: 'x04_max_half_empty',
    input: build(M, Array.from({ length: M }, () => 1 + R.int(1000000000))),
  });
  T.push({
    // sorted input already ascending: no shuffle to save the naive approach
    name: 'x05_max_presorted',
    input: build(M, Array.from({ length: 2 * M }, (_, i) => i + 1)),
  });
  T.push({
    name: 'x06_max_presorted_desc',
    input: build(M, Array.from({ length: 2 * M }, (_, i) => 2 * M - i)),
  });
  T.push({
    // one enormous interview: the answer is that value alone
    name: 'x07_max_single_giant',
    input: build(M, Array.from({ length: M + 5 }, (_, i) => (i === 3 ? 1000000000 : 1))),
  });

  return T;
};
