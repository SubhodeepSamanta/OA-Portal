'use strict';
// Test generator - m54 / Q149 Lift Controller
// Request times are always emitted in non-decreasing order.
module.exports = function (R) {
  const T = [];
  const build = (f, e, reqs) =>
    `${f} ${e} ${reqs.length}\n` + reqs.map((r) => r.join(' ')).join('\n') + '\n';

  const randReqs = (f, n, maxGap) => {
    let t = 0;
    return Array.from({ length: n }, () => {
      t += R.int(maxGap + 1);
      return [Math.max(1, t), 1 + R.int(f), 1 + R.int(f)];
    });
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_one_lift', input: build(5, 1, [[1, 1, 3], [2, 3, 1], [10, 1, 5]]) });
  T.push({ name: 'e02_sample_ties', input: build(10, 2, [[1, 1, 5], [1, 10, 2], [1, 3, 4]]) });
  T.push({ name: 'e03_from_equals_to', input: build(3, 1, [[5, 2, 2]]) });
  T.push({ name: 'e04_single_floor', input: build(1, 1, [[1, 1, 1], [2, 1, 1]]) });
  T.push({ name: 'e05_all_same_time', input: build(6, 3, [[1, 6, 1], [1, 6, 1], [1, 6, 1], [1, 6, 1]]) });
  T.push({ name: 'e06_lift_already_there', input: build(4, 1, [[1, 1, 4], [100, 4, 1]]) });
  T.push({ name: 'e07_max_time', input: build(5, 2, [[1000000000, 1, 5], [1000000000, 5, 1]]) });
  T.push({ name: 'e08_ten_lifts_one_request', input: build(200, 10, [[1, 200, 1]]) });
  T.push({ name: 'e09_ping_pong', input: build(5, 1, [[1, 1, 5], [1, 5, 1], [1, 1, 5], [1, 5, 1]]) });
  T.push({ name: 'e10_idle_between', input: build(10, 2, [[1, 1, 10], [1000, 10, 1], [2000, 1, 10]]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const f = 2 + R.int(10);
    const e = 1 + R.int(4);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(f, e, randReqs(f, 1 + R.int(15), 5)),
    });
  }
  // everything arriving at once: assignment order and ties dominate
  for (let t = 0; t < 10; t++) {
    const f = 3 + R.int(8);
    const e = 1 + R.int(4);
    const reqs = Array.from({ length: 3 + R.int(10) }, () => [1, 1 + R.int(f), 1 + R.int(f)]);
    T.push({ name: 'b' + String(t + 1).padStart(2, '0') + '_burst', input: build(f, e, reqs) });
  }
  // long idle gaps, so lifts are always free when a request arrives
  for (let t = 0; t < 10; t++) {
    const f = 3 + R.int(8);
    const e = 1 + R.int(3);
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_wide_gaps',
      input: build(f, e, randReqs(f, 2 + R.int(10), 200)),
    });
  }
  // one lift only: pure queueing
  for (let t = 0; t < 8; t++) {
    const f = 2 + R.int(10);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_single_lift',
      input: build(f, 1, randReqs(f, 2 + R.int(12), 3)),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(200, 5, randReqs(200, 5000, 50)) });

  // --- maximum size --------------------------------------------------
  const N = 100000;
  T.push({ name: 'x01_max_random', input: build(200, 10, randReqs(200, N, 100)) });
  T.push({ name: 'x02_max_single_lift', input: build(200, 1, randReqs(200, N, 100)) });
  {
    // every request at the same instant: the whole stream queues up
    const reqs = Array.from({ length: N }, () => [1, 1 + R.int(200), 1 + R.int(200)]);
    T.push({ name: 'x03_max_all_at_once', input: build(200, 10, reqs) });
  }
  {
    // maximum travel every time, between the two extreme floors
    const reqs = Array.from({ length: N }, (_, i) => [i + 1, i % 2 ? 1 : 200, i % 2 ? 200 : 1]);
    T.push({ name: 'x04_max_full_height', input: build(200, 10, reqs) });
  }
  {
    // times start at the maximum, so everything is offset by 10^9
    const reqs = Array.from({ length: N }, (_, i) => [1000000000, 1 + R.int(200), 1 + R.int(200)]);
    T.push({ name: 'x05_max_late_start_overflow_bait', input: build(200, 10, reqs) });
  }
  {
    // one floor building: every journey is zero floors
    const reqs = Array.from({ length: N }, (_, i) => [i + 1, 1, 1]);
    T.push({ name: 'x06_max_single_floor', input: build(1, 10, reqs) });
  }
  {
    // lifts never fall behind: huge gaps between requests
    const reqs = Array.from({ length: N }, (_, i) => [(i + 1) * 1000, 1 + R.int(200), 1 + R.int(200)]);
    T.push({ name: 'x07_max_always_idle', input: build(200, 10, reqs) });
  }

  return T;
};
