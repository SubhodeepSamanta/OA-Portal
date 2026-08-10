'use strict';
// Test generator - m67 / Q162 Shelf Restock
// Small cases keep capacities tiny: brute.cpp enumerates every candidate
// fraction k/c[i], so its cost is n * sum(c) * n.
module.exports = function (R) {
  const T = [];
  const build = (t, shelves) =>
    `${shelves.length} ${t}\n` + shelves.map((s) => s.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_split', input: build(5, [[0, 10], [0, 10]]) });
  T.push({ name: 'e02_no_units', input: build(0, [[5, 10]]) });
  T.push({ name: 'e03_huge_shelf_starves', input: build(100, [[0, 1], [0, 1000000000]]) });
  T.push({ name: 'e04_exact_fit', input: build(6, [[1, 4], [2, 4], [0, 4]]) });
  T.push({ name: 'e05_already_full', input: build(10, [[4, 4], [4, 4]]) });
  T.push({ name: 'e06_single_shelf_fills', input: build(10, [[0, 10]]) });
  T.push({ name: 'e07_more_than_enough', input: build(1000000000, [[0, 5], [0, 7]]) });
  T.push({ name: 'e08_capacity_one', input: build(1, [[0, 1], [0, 1]]) });
  T.push({ name: 'e09_all_empty', input: build(3, [[0, 3], [0, 3], [0, 3]]) });
  T.push({ name: 'e10_one_short_shelf', input: build(2, [[0, 2], [5, 5]]) });
  T.push({ name: 'e11_zero_units_zero_stock', input: build(0, [[0, 7]]) });
  // a full shelf beside an empty one: forgetting max(0, ...) lets the full
  // shelf's "negative need" pay for the empty one
  T.push({ name: 'e12_full_beside_empty', input: build(0, [[10, 10], [0, 10]]) });
  T.push({ name: 'e13_full_beside_empty_some_units', input: build(3, [[10, 10], [0, 10]]) });

  // --- small randoms (candidate-fraction brute) ---------------------
  const randShelves = (n, maxC) =>
    Array.from({ length: n }, () => {
      const c = 1 + R.int(maxC);
      return [R.int(c + 1), c];
    });

  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(5);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(R.int(20), randShelves(n, 12)),
    });
  }
  // scarce units, so the answer sits low and the ceiling matters
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(4);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_scarce',
      input: build(R.int(4), randShelves(n, 14)),
    });
  }
  // plentiful units, so most shelves fill completely
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(4);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_plentiful',
      input: build(60 + R.int(60), randShelves(n, 10)),
    });
  }
  // wildly uneven capacities, where one big shelf drags the worst ratio down
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(4);
    const shelves = randShelves(n - 1, 4);
    shelves.push([0, 15 + R.int(10)]);
    T.push({ name: 'u' + String(t + 1).padStart(2, '0') + '_uneven', input: build(R.int(25), shelves) });
  }

  // --- medium --------------------------------------------------------
  {
    const shelves = Array.from({ length: 4000 }, () => {
      const c = 1 + R.int(1000);
      return [R.int(c + 1), c];
    });
    T.push({ name: 'z01_medium', input: build(200000, shelves) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const shelves = Array.from({ length: N }, () => {
      const c = 1 + R.int(1000000000);
      return [R.int(c + 1), c];
    });
    T.push({ name: 'x01_max_random', input: build(1000000000, shelves) });
  }
  {
    // every shelf empty and enormous: the truck barely registers
    const shelves = Array.from({ length: N }, () => [0, 1000000000]);
    T.push({ name: 'x02_max_all_empty_huge', input: build(1000000000, shelves) });
  }
  {
    // every shelf already full: the answer is a full million
    const shelves = Array.from({ length: N }, () => [1000000000, 1000000000]);
    T.push({ name: 'x03_max_all_full', input: build(1000000000, shelves) });
  }
  {
    // no units at all: the answer is the current worst ratio
    const shelves = Array.from({ length: N }, (_, i) => [i % 1000, 1000]);
    T.push({ name: 'x04_max_no_units', input: build(0, shelves) });
  }
  {
    // one tiny shelf among giants
    const shelves = Array.from({ length: N }, (_, i) => (i === 0 ? [0, 1] : [0, 1000000000]));
    T.push({ name: 'x05_max_one_tiny', input: build(1000000000, shelves) });
  }
  {
    // capacities all 1, so the ratio is 0 or a full million
    const shelves = Array.from({ length: N }, (_, i) => [i % 2, 1]);
    T.push({ name: 'x06_max_capacity_one', input: build(100000, shelves) });
  }
  {
    // enough to fill everything exactly
    const shelves = Array.from({ length: N }, () => [0, 1000]);
    T.push({ name: 'x07_max_exactly_fills', input: build(1000000000, shelves) });
  }

  return T;
};
