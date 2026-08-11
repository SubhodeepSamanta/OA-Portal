'use strict';
// Test generator - c3 / Q26 Factory Machines (CSES 1620)
// Small cases keep t under 200000 so the brute's heap simulation runs.
module.exports = function (R) {
  const T = [];
  const build = (t, k) => `${k.length} ${t}\n${k.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: build(7, [3, 2, 5]) });
  T.push({ name: 'e02_one_machine', input: build(1, [1]) });
  T.push({ name: 'e03_one_machine_slow', input: build(5, [1000000000]) });
  T.push({ name: 'e04_all_same_speed', input: build(10, [4, 4, 4, 4]) });
  T.push({ name: 'e05_one_product', input: build(1, [7, 3, 9]) });
  T.push({ name: 'e06_more_machines_than_products', input: build(2, [5, 5, 5, 5, 5, 5]) });
  T.push({ name: 'e07_one_fast_many_slow', input: build(100, [1, 1000000000, 1000000000]) });
  T.push({ name: 'e08_all_max_cost', input: build(3, [1000000000, 1000000000]) });
  T.push({ name: 'e09_exact_multiple', input: build(6, [2, 3]) });
  T.push({ name: 'e10_all_ones', input: build(1000, Array(10).fill(1)) });

  // --- huge t (tiny on disk, so the brute takes its int128 path) -----
  T.push({ name: 'h01_max_t_one_machine', input: build(1000000000, [1000000000]) });
  T.push({ name: 'h02_max_t_fast_machine', input: build(1000000000, [1]) });
  T.push({ name: 'h03_max_t_few_machines', input: build(1000000000, [3, 2, 5]) });
  T.push({ name: 'h04_max_t_mixed', input: build(999999999, [1, 2, 1000000000]) });

  // --- small randoms (heap simulation) -------------------------------
  for (let i = 0; i < 20; i++) {
    const n = 1 + R.int(30);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(5000), Array.from({ length: n }, () => 1 + R.int(1000))),
    });
  }
  // wide spread of speeds
  for (let i = 0; i < 10; i++) {
    const n = 2 + R.int(20);
    T.push({
      name: 's' + String(i + 1).padStart(2, '0') + '_wide_speeds',
      input: build(1 + R.int(20000), Array.from({ length: n }, () => 1 + R.int(1000000000))),
    });
  }
  // many machines, few products
  for (let i = 0; i < 8; i++) {
    T.push({
      name: 'f' + String(i + 1).padStart(2, '0') + '_few_products',
      input: build(1 + R.int(5), Array.from({ length: 5 + R.int(60) }, () => 1 + R.int(100))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({
    name: 'x01_max_random',
    input: build(1000000000, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });
  T.push({
    // every machine at the slowest speed: answer is close to 1e18/2e5 * 1e9
    name: 'x02_max_all_slow',
    input: build(1000000000, Array(N).fill(1000000000)),
  });
  T.push({
    name: 'x03_max_all_fast',
    input: build(1000000000, Array(N).fill(1)),
  });
  T.push({
    // one fast machine buried among slow ones - the early break matters most here
    name: 'x04_max_one_fast',
    input: build(1000000000, Array.from({ length: N }, (_, i) => (i === N - 1 ? 1 : 1000000000))),
  });
  T.push({
    name: 'x05_max_small_t',
    input: build(1, Array.from({ length: N }, () => 1 + R.int(1000000000))),
  });

  return T;
};
