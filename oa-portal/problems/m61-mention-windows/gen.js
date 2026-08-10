'use strict';
// Test generator - m61 / Q156 Mention Windows
module.exports = function (R) {
  const T = [];
  const build = (b) => `${b.length}\n${b.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build([1, 2, 1, 3, 2, 1, 3]) });
  T.push({ name: 'e02_single', input: build([5]) });
  T.push({ name: 'e03_all_same', input: build([7, 7, 7, 7]) });
  T.push({ name: 'e04_all_distinct', input: build([1, 2, 3, 4, 5]) });
  T.push({ name: 'e05_window_at_start', input: build([1, 2, 3, 1, 1, 1, 1]) });
  T.push({ name: 'e06_window_at_end', input: build([1, 1, 1, 1, 1, 2, 3]) });
  T.push({ name: 'e07_two_brands_far_apart', input: build([1, 1, 1, 1, 1, 1, 2]) });
  T.push({ name: 'e08_alternating', input: build([1, 2, 1, 2, 1, 2]) });
  T.push({ name: 'e09_max_ids', input: build([1000000000, 1, 1000000000]) });
  T.push({ name: 'e10_rare_brand_in_middle', input: build([1, 1, 1, 2, 1, 1, 1]) });
  T.push({ name: 'e11_two_equal_windows', input: build([1, 2, 3, 9, 1, 2, 3]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(50);
    const brands = 1 + R.int(6);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(brands))),
    });
  }
  // many brands relative to length: the answer approaches n
  for (let t = 0; t < 10; t++) {
    const n = 5 + R.int(40);
    T.push({
      name: 'm' + String(t + 1).padStart(2, '0') + '_many_brands',
      input: build(Array.from({ length: n }, () => 1 + R.int(n))),
    });
  }
  // one rare brand among a sea of common ones
  for (let t = 0; t < 10; t++) {
    const n = 10 + R.int(40);
    const arr = Array.from({ length: n }, () => 1 + R.int(2));
    arr[R.int(n)] = 99;
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_one_rare', input: build(arr) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(Array.from({ length: 4000 }, () => 1 + R.int(50))) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(1000))) });
  T.push({ name: 'x02_max_all_same', input: build(Array(N).fill(1000000000)) });
  T.push({ name: 'x03_max_all_distinct', input: build(Array.from({ length: N }, (_, i) => i + 1)) });
  T.push({
    // two brands, the second appearing only at the very end
    name: 'x04_max_rare_at_end',
    input: build(Array.from({ length: N }, (_, i) => (i === N - 1 ? 2 : 1))),
  });
  T.push({
    // every brand appears exactly twice, at opposite ends
    name: 'x05_max_mirrored',
    input: build(Array.from({ length: N }, (_, i) => (i < N / 2 ? i + 1 : N - i))),
  });
  T.push({
    // the shortest window sits right in the middle
    name: 'x06_max_window_in_middle',
    input: build(Array.from({ length: N }, (_, i) =>
      (i >= N / 2 && i < N / 2 + 5) ? (i - N / 2) + 2 : 1)),
  });
  T.push({
    // cyclic pattern, so many windows tie at the optimum
    name: 'x07_max_cyclic',
    input: build(Array.from({ length: N }, (_, i) => 1 + (i % 500))),
  });
  T.push({ name: 'x08_max_two_brands', input: build(Array.from({ length: N }, () => 1 + R.int(2))) });

  return T;
};
