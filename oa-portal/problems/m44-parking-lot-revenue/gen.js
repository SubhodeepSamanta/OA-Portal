'use strict';
// Test generator - m44 / Q131 Parking Lot Revenue
// Arrivals are always emitted in non-decreasing order, and a < d always.
module.exports = function (R) {
  const T = [];
  const build = (k, cars) =>
    `${cars.length} ${k}\n` + cars.map((c) => c.join(' ')).join('\n') + '\n';

  const randCars = (n, maxA, maxStay) => {
    const arr = Array.from({ length: n }, () => 1 + R.int(maxA)).sort((x, y) => x - y);
    return arr.map((a) => [a, a + 1 + R.int(maxStay)]);
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(1, [[1, 5], [2, 3], [5, 8]]) });
  T.push({ name: 'e02_sample2', input: build(2, [[1, 10], [2, 3], [2, 4]]) });
  T.push({ name: 'e03_both_park', input: build(2, [[1, 100], [1, 100]]) });
  T.push({ name: 'e04_blocker', input: build(1, [[1, 100], [2, 3], [3, 4], [4, 5]]) });
  T.push({ name: 'e05_single_car', input: build(1, [[1, 1000000000]]) });
  T.push({ name: 'e06_exact_handover', input: build(1, [[1, 2], [2, 3], [3, 4], [4, 5]]) });
  T.push({ name: 'e07_one_minute_late', input: build(1, [[1, 3], [2, 4], [4, 6]]) });
  T.push({ name: 'e08_more_bays_than_cars', input: build(10, [[1, 5], [2, 6], [3, 7]]) });
  T.push({ name: 'e09_all_same_minute', input: build(2, [[5, 9], [5, 9], [5, 9], [5, 9]]) });
  T.push({ name: 'e10_all_turned_away', input: build(1, [[1, 1000000000], [2, 3], [3, 4]]) });
  T.push({ name: 'e11_max_times', input: build(2, [[1, 1000000000], [1, 1000000000], [2, 3]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(20);
    const k = 1 + R.int(4);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(k, randCars(n, 30, 15)),
    });
  }
  // one bay only: turn-aways dominate
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_single_bay',
      input: build(1, randCars(3 + R.int(18), 25, 12)),
    });
  }
  // long stays against short ones
  for (let t = 0; t < 10; t++) {
    const n = 4 + R.int(16);
    const arr = Array.from({ length: n }, () => 1 + R.int(20)).sort((x, y) => x - y);
    const cars = arr.map((a) => [a, a + (R.next() < 0.3 ? 200 + R.int(100) : 1 + R.int(3))]);
    T.push({ name: 'l' + String(t + 1).padStart(2, '0') + '_mixed_stays', input: build(1 + R.int(3), cars) });
  }
  // heavy simultaneous arrivals
  for (let t = 0; t < 8; t++) {
    const n = 5 + R.int(15);
    const cars = Array.from({ length: n }, () => [5, 5 + 1 + R.int(10)]);
    T.push({ name: 'c' + String(t + 1).padStart(2, '0') + '_same_minute', input: build(1 + R.int(4), cars) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(50, randCars(4000, 100000, 500)) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(1000, randCars(N, 1000000000, 1000000)) });
  T.push({ name: 'x02_max_single_bay', input: build(1, randCars(N, 1000000000, 1000000)) });
  T.push({ name: 'x03_max_many_bays', input: build(100000, randCars(N, 1000000000, 1000000)) });
  {
    // everyone parks: arrivals spaced wider than the stays
    const cars = Array.from({ length: N }, (_, i) => [i + 1, i + 2]);
    T.push({ name: 'x04_max_all_park', input: build(1, cars) });
  }
  {
    // one enormous stay blocks the only bay for the whole day
    const cars = [[1, 1000000000]];
    for (let i = 1; i < N; i++) cars.push([i + 1, i + 2]);
    T.push({ name: 'x05_max_all_turned_away', input: build(1, cars) });
  }
  {
    // every car arrives in the same minute and stays the maximum time
    const cars = Array.from({ length: N }, () => [1, 1000000000]);
    T.push({ name: 'x06_max_overflow_bait', input: build(100000, cars) });
  }
  {
    // exact handovers all day: the half-open rule is tested 200000 times
    const cars = Array.from({ length: N }, (_, i) => [i + 1, i + 2]);
    T.push({ name: 'x07_max_exact_handover', input: build(1, cars) });
  }
  {
    // heavy churn against a small number of bays
    const arr = Array.from({ length: N }, () => 1 + R.int(1000)).sort((x, y) => x - y);
    T.push({ name: 'x08_max_tight_window', input: build(5, arr.map((a) => [a, a + 1 + R.int(50)])) });
  }

  return T;
};
