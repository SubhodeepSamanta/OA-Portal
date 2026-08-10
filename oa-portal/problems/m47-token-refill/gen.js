'use strict';
// Test generator - m47 / Q134 Token Refill
// Arrival times are ALWAYS strictly increasing.
module.exports = function (R) {
  const T = [];
  const build = (C, reqs) =>
    `${reqs.length} ${C}\n` + reqs.map((r) => r.join(' ')).join('\n') + '\n';

  // strictly increasing times, each at least 1
  const times = (n, maxGap) => {
    const out = [];
    let t = 0;
    for (let i = 0; i < n; i++) { t += 1 + R.int(maxGap); out.push(t); }
    return out;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_all_served', input: build(5, [[1, 3], [2, 3], [10, 5]]) });
  T.push({ name: 'e02_rejected_takes_nothing', input: build(2, [[1, 3], [5, 2]]) });
  T.push({ name: 'e03_drain_then_wait', input: build(3, [[1, 3], [2, 3], [3, 3], [10, 3]]) });
  T.push({ name: 'e04_single_max', input: build(1000000000, [[1, 1000000000]]) });
  T.push({ name: 'e05_never_servable', input: build(2, [[1, 5], [2, 5], [1000, 5]]) });
  T.push({ name: 'e06_exactly_enough', input: build(10, [[1, 10], [11, 10], [21, 10]]) });
  T.push({ name: 'e07_one_short', input: build(10, [[1, 10], [10, 10], [20, 10]]) });
  T.push({ name: 'e08_capacity_one', input: build(1, [[1, 1], [2, 1], [3, 1], [4, 1]]) });
  T.push({ name: 'e09_huge_gap_caps', input: build(5, [[1, 5], [1000000000, 5]]) });
  T.push({ name: 'e10_first_arrival_very_late', input: build(7, [[1000000000, 7]]) });
  T.push({ name: 'e11_all_rejected', input: build(3, [[1, 4], [2, 4], [3, 4], [100, 4]]) });
  T.push({ name: 'e12_alternating', input: build(4, [[1, 4], [2, 4], [6, 4], [7, 4], [12, 4]]) });

  // --- small randoms (tick-by-tick brute) ---------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(15);
    const C = 1 + R.int(20);
    const ts = times(n, 6);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_tiny',
      input: build(C, ts.map((x) => [x, 1 + R.int(25)])),
    });
  }
  // demand usually below capacity: most requests succeed
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(14);
    const C = 10 + R.int(20);
    const ts = times(n, 4);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_mostly_served',
      input: build(C, ts.map((x) => [x, 1 + R.int(5)])),
    });
  }
  // demand usually above capacity: most requests are rejected
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(14);
    const C = 5 + R.int(10);
    const ts = times(n, 2);
    T.push({
      name: 'b' + String(t + 1).padStart(2, '0') + '_mostly_rejected',
      input: build(C, ts.map((x) => [x, 5 + R.int(30)])),
    });
  }
  // long idle gaps, so the cap really bites
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(10);
    const C = 3 + R.int(10);
    const ts = times(n, 60);
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_wide_gaps',
      input: build(C, ts.map((x) => [x, 1 + R.int(15)])),
    });
  }

  // --- medium --------------------------------------------------------
  {
    const ts = times(4000, 50);
    T.push({ name: 'm01_medium', input: build(1000, ts.map((x) => [x, 1 + R.int(200)])) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const ts = times(N, 5000);
    T.push({ name: 'x01_max_random', input: build(1000000000, ts.map((x) => [x, 1 + R.int(1000000000)])) });
  }
  {
    // every request arrives one second after the last and wants one token
    const reqs = Array.from({ length: N }, (_, i) => [i + 1, 1]);
    T.push({ name: 'x02_max_paced_exactly', input: build(1, reqs) });
  }
  {
    // demand always just above what has refilled: nearly everything rejected
    const reqs = Array.from({ length: N }, (_, i) => [i + 1, 2]);
    T.push({ name: 'x03_max_always_short', input: build(1, reqs) });
  }
  {
    // every request wants more than the bucket can ever hold
    const reqs = Array.from({ length: N }, (_, i) => [i + 1, 1000000000]);
    T.push({ name: 'x04_max_never_servable', input: build(5, reqs) });
  }
  {
    // maximum capacity and maximum gaps: level + gap overflows a 32-bit int
    const reqs = Array.from({ length: N }, (_, i) => [(i + 1) * 5000, 1000000000]);
    T.push({ name: 'x05_max_overflow_bait', input: build(1000000000, reqs) });
  }
  {
    // huge burst at the start, then one very late request
    const reqs = Array.from({ length: N - 1 }, (_, i) => [i + 1, 1000]);
    reqs.push([1000000000, 1000]);
    T.push({ name: 'x06_max_burst_then_idle', input: build(1000, reqs) });
  }
  {
    // capacity 1: the bucket is empty or full, nothing in between
    const ts = times(N, 3);
    T.push({ name: 'x07_max_capacity_one', input: build(1, ts.map((x) => [x, 1])) });
  }

  return T;
};
