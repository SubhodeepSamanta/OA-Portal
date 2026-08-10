'use strict';
// Test generator - m57 / Q152 Ticket Escalation
module.exports = function (R) {
  const T = [];
  const build = (p) => `${p.length}\n${p.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([5, 3, 9]) });
  T.push({ name: 'e02_all_tied', input: build([2, 2, 2, 2]) });
  T.push({ name: 'e03_single', input: build([7]) });
  T.push({ name: 'e04_ascending', input: build([1, 2, 3, 4, 5]) });
  T.push({ name: 'e05_descending', input: build([5, 4, 3, 2, 1]) });
  T.push({ name: 'e06_two_tied_pairs', input: build([3, 1, 3, 1]) });
  T.push({ name: 'e07_max_values', input: build([1000000000, 1000000000, 999999999]) });
  T.push({ name: 'e08_one_high_rest_low', input: build([1, 1, 1, 1000000000, 1]) });
  T.push({ name: 'e09_gap_of_one', input: build([5, 6, 7]) });
  T.push({ name: 'e10_two_tickets', input: build([9, 9]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(25);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // heavy ties, where the tiebreak rule is the whole answer
  for (let t = 0; t < 12; t++) {
    const n = 3 + R.int(20);
    T.push({
      name: 'q' + String(t + 1).padStart(2, '0') + '_many_ties',
      input: build(Array.from({ length: n }, () => 1 + R.int(3))),
    });
  }
  // priorities within 1 of each other, where a wrong escalation model shows up
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(18);
    const base = 1 + R.int(100);
    T.push({
      name: 'n' + String(t + 1).padStart(2, '0') + '_near_ties',
      input: build(Array.from({ length: n }, () => base + R.int(2))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(Array.from({ length: 5000 }, () => 1 + R.int(1000000))) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000000000))) });
  T.push({ name: 'x02_max_all_tied', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_ascending', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({ name: 'x04_max_descending', input: build(Array.from({ length: N }, (_, i) => N - i)) });
  T.push({
    // consecutive priorities, exactly the spacing the escalation would close
    name: 'x05_max_consecutive',
    input: build(Array.from({ length: N }, (_, i) => 1 + (i % 3))),
  });
  T.push({
    // only two distinct priorities: enormous tie groups
    name: 'x06_max_two_values',
    input: build(Array.from({ length: N }, () => 1 + R.int(2))),
  });
  T.push({
    // every priority identical except one at the very end
    name: 'x07_max_one_outlier_last',
    input: build(Array.from({ length: N }, (_, i) => (i === N - 1 ? 1000000000 : 1))),
  });

  return T;
};
