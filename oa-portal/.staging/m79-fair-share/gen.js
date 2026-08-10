'use strict';
// Test generator - m79 / Q178 Fair Share
// Small cases keep BOTH n and m small: the brute hands out items one by one.
module.exports = function (R) {
  const T = [];
  const build = (n, m) => `${n} ${m}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample_remainder', input: build(3, 10) });
  T.push({ name: 'e02_divides_evenly', input: build(4, 8) });
  T.push({ name: 'e03_fewer_items_than_people', input: build(5, 3) });
  T.push({ name: 'e04_single_person_max', input: build(1, '1000000000000000000') });
  T.push({ name: 'e05_one_item', input: build(4, 1) });
  T.push({ name: 'e06_one_each', input: build(4, 4) });
  T.push({ name: 'e07_one_short', input: build(4, 3) });
  T.push({ name: 'e08_one_over', input: build(4, 5) });
  T.push({ name: 'e09_single_person_single_item', input: build(1, 1) });
  T.push({ name: 'e10_remainder_is_n_minus_one', input: build(7, 13) });
  T.push({ name: 'e11_large_n_small_m', input: build(100, 7) });

  // --- small randoms (one-at-a-time brute) ---------------------------
  for (let t = 0; t < 24; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(30), 1 + R.int(120)),
    });
  }
  // exact divisions
  for (let t = 0; t < 10; t++) {
    const n = 1 + R.int(20);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_exact', input: build(n, n * (1 + R.int(15))) });
  }
  // one short of an exact division, so the remainder is n-1
  for (let t = 0; t < 10; t++) {
    const n = 2 + R.int(20);
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_one_short', input: build(n, n * (1 + R.int(10)) - 1) });
  }
  // more people than items
  for (let t = 0; t < 10; t++) {
    const n = 5 + R.int(40);
    T.push({ name: 'f' + String(t + 1).padStart(2, '0') + '_scarce', input: build(n, 1 + R.int(n - 1)) });
  }

  // --- larger (formula brute path) -----------------------------------
  for (let t = 0; t < 8; t++) {
    T.push({
      name: 'y' + String(t + 1).padStart(2, '0') + '_large_m',
      input: build(1 + R.int(50), String(BigInt(1 + R.int(1000000000)) * 1000000000n + BigInt(R.int(1000000000)))),
    });
  }
  {
    const N = 100000;
    T.push({ name: 'x01_max_n_max_m', input: build(N, '1000000000000000000') });
    T.push({ name: 'x02_max_n_one_item', input: build(N, 1) });
    T.push({ name: 'x03_max_n_exact', input: build(N, String(BigInt(N) * 9999999999999n)) });
    T.push({ name: 'x04_max_n_one_short', input: build(N, String(BigInt(N) * 9999999999999n - 1n)) });
    T.push({ name: 'x05_max_n_fewer_items', input: build(N, N - 1) });
    T.push({ name: 'x06_single_person_max', input: build(1, '1000000000000000000') });
    T.push({ name: 'x07_two_people_max', input: build(2, '999999999999999999') });
  }

  return T;
};
