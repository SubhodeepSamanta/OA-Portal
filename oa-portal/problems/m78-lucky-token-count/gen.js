'use strict';
// Test generator - m78 / Q177 Lucky Token Count
module.exports = function (R) {
  const T = [];
  const build = (n, s) => `${n} ${s}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(20, 2) });
  T.push({ name: 'e02_single_digit', input: build(9, 9) });
  T.push({ name: 'e03_powers_of_ten', input: build(100, 1) });
  T.push({ name: 'e04_max_n_sum_one', input: build('1000000000000000000', 1) });
  T.push({ name: 'e05_n_is_one', input: build(1, 1) });
  T.push({ name: 'e06_sum_unreachable', input: build(100, 162) });
  T.push({ name: 'e07_sum_too_big_for_n', input: build(9, 10) });
  T.push({ name: 'e08_all_nines', input: build(999999999, 81) });
  T.push({ name: 'e09_max_n_max_sum', input: build('1000000000000000000', 162) });
  T.push({ name: 'e10_max_n_mid_sum', input: build('1000000000000000000', 81) });
  T.push({ name: 'e11_boundary_number', input: build(999, 27) });
  T.push({ name: 'e12_just_over_boundary', input: build(1000, 27) });
  T.push({ name: 'e13_sum_nine', input: build(1000000, 9) });

  // --- small randoms (walk-every-token brute) -----------------------
  for (let t = 0; t < 24; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(5000), 1 + R.int(25)),
    });
  }
  // sums that are usually reachable
  for (let t = 0; t < 12; t++) {
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_reachable',
      input: build(1 + R.int(200000), 1 + R.int(15)),
    });
  }
  // sums that are usually not reachable
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'u' + String(t + 1).padStart(2, '0') + '_unreachable',
      input: build(1 + R.int(1000), 40 + R.int(120)),
    });
  }

  // --- larger (composition brute) ------------------------------------
  for (let t = 0; t < 12; t++) {
    let digits = '';
    const len = 8 + R.int(11);
    digits += 1 + R.int(9);
    for (let i = 1; i < len; i++) digits += R.int(10);
    T.push({
      name: 'y' + String(t + 1).padStart(2, '0') + '_large_random',
      input: build(digits, 1 + R.int(90)),
    });
  }
  {
    T.push({ name: 'x01_max_random', input: build('987654321987654321', 45) });
    T.push({ name: 'x02_max_all_nines', input: build('999999999999999999', 162) });
    T.push({ name: 'x03_max_all_nines_mid', input: build('999999999999999999', 81) });
    T.push({ name: 'x04_max_one_then_zeros', input: build('1000000000000000000', 2) });
    T.push({ name: 'x05_max_sum_at_limit', input: build('999999999999999999', 161) });
    T.push({ name: 'x06_max_sum_one_over', input: build('999999999999999999', 163 - 1) });
    T.push({ name: 'x07_max_small_sum', input: build('876543210987654321', 5) });
  }

  return T;
};
