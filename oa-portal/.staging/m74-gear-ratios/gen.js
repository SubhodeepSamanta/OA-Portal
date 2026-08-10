'use strict';
// Test generator - m74 / Q173 Gear Ratios
// Values use BigInt so the 10^18 cases are exact.
module.exports = function (R) {
  const T = [];
  const build = (a, b) => `${a} ${b}\n`;
  const big = (k) => { let s = ''; for (let i = 0; i < k; i++) s += R.int(10); return BigInt(s.replace(/^0+/, '') || '1'); };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(4, 6) });
  T.push({ name: 'e02_both_one', input: build(1, 1) });
  T.push({ name: 'e03_twelve_eight', input: build(12, 8) });
  T.push({ name: 'e04_coprime_max', input: build('1000000000000000000', '999999999999999999') });
  T.push({ name: 'e05_equal_max', input: build('1000000000000000000', '1000000000000000000') });
  T.push({ name: 'e06_one_and_max', input: build(1, '1000000000000000000') });
  T.push({ name: 'e07_max_and_one', input: build('1000000000000000000', 1) });
  T.push({ name: 'e08_a_divides_b', input: build(3, 12) });
  T.push({ name: 'e09_b_divides_a', input: build(12, 3) });
  T.push({ name: 'e10_two_large_primes', input: build('999999999999999989', '999999999999999967') });
  T.push({ name: 'e11_powers_of_two', input: build('576460752303423488', '288230376151711744') });
  T.push({ name: 'e12_equal_small', input: build(7, 7) });

  // --- small randoms (tick-by-tick brute) ---------------------------
  for (let t = 0; t < 24; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(1 + R.int(60), 1 + R.int(60)),
    });
  }
  // deliberately sharing factors
  for (let t = 0; t < 12; t++) {
    const g = 1 + R.int(12);
    T.push({
      name: 'g' + String(t + 1).padStart(2, '0') + '_shared_factor',
      input: build(g * (1 + R.int(20)), g * (1 + R.int(20))),
    });
  }
  // one is a multiple of the other
  for (let t = 0; t < 10; t++) {
    const a = 1 + R.int(40);
    T.push({ name: 'd' + String(t + 1).padStart(2, '0') + '_divides', input: build(a, a * (1 + R.int(10))) });
  }

  // --- larger (128-bit brute path) -----------------------------------
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'y' + String(t + 1).padStart(2, '0') + '_large_random',
      input: build(big(18).toString(), big(18).toString()),
    });
  }
  {
    // both near the maximum and coprime: the a*b overflow case
    T.push({ name: 'x01_max_coprime', input: build('999999999999999989', '999999999999999999') });
    T.push({ name: 'x02_max_even_pair', input: build('999999999999999998', '999999999999999996') });
    T.push({ name: 'x03_max_one_side', input: build('1000000000000000000', '3') });
    T.push({ name: 'x04_max_other_side', input: build('3', '1000000000000000000') });
    T.push({ name: 'x05_max_same', input: build('999999999999999999', '999999999999999999') });
    T.push({ name: 'x06_max_factorial_ish', input: build('963761198400', '997920000') });
    T.push({ name: 'x07_max_power_pair', input: build('1000000000000000000', '500000000000000000') });
  }

  return T;
};
