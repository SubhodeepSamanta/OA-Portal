'use strict';
// Test generator - m33 / Q76 Employee Referral Chain
module.exports = function (R) {
  const T = [];
  const build = (f) => `${f.length}\n${f.join(' ')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build([2, 3, 1, 3, 4]) });
  T.push({ name: 'e02_all_self', input: build([1, 2, 3]) });
  T.push({ name: 'e03_single', input: build([1]) });
  T.push({ name: 'e04_two_rings', input: build([2, 1, 2, 3, 6, 5]) });
  T.push({ name: 'e05_one_big_ring', input: build([2, 3, 4, 5, 6, 7, 8, 1]) });
  T.push({ name: 'e06_long_tail_into_self_loop', input: build([1, 1, 2, 3, 4, 5, 6, 7]) });
  T.push({ name: 'e07_everyone_points_at_one', input: build([1, 1, 1, 1, 1, 1]) });
  T.push({ name: 'e08_two_cycles_sizes_2_and_3', input: build([2, 1, 4, 5, 3]) });
  T.push({ name: 'e09_rho_shape', input: build([2, 3, 4, 5, 3]) });
  T.push({ name: 'e10_all_point_to_last', input: build([6, 6, 6, 6, 6, 6]) });
  T.push({ name: 'e11_pure_chain_into_ring', input: build([2, 3, 4, 5, 6, 4]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(25);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => 1 + R.int(n))),
    });
  }
  // many self-loops
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(20);
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_self_heavy',
      input: build(Array.from({ length: n }, (_, i) => (R.next() < 0.5 ? i + 1 : 1 + R.int(n)))),
    });
  }
  // mostly tails: f[i] < i keeps chains flowing downward into few rings
  for (let t = 0; t < 8; t++) {
    const n = 4 + R.int(20);
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_deep_tails',
      input: build(Array.from({ length: n }, (_, i) => (i === 0 ? 1 : i))),
    });
  }
  // a few large rings with trees hanging off
  for (let t = 0; t < 8; t++) {
    const n = 6 + R.int(18);
    const ring = 2 + R.int(4);
    const f = [];
    for (let i = 0; i < n; i++) {
      if (i < ring) f.push(((i + 1) % ring) + 1);
      else f.push(1 + R.int(i));
    }
    T.push({ name: 'g' + String(t + 1).padStart(2, '0') + '_ring_with_trees', input: build(f) });
  }

  // --- medium --------------------------------------------------------
  T.push({
    name: 'm01_medium',
    input: build(Array.from({ length: 4000 }, () => 1 + R.int(4000))),
  });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  T.push({ name: 'x01_max_random', input: build(Array.from({ length: N }, () => 1 + R.int(N))) });
  {
    // one ring containing every employee
    const f = Array.from({ length: N }, (_, i) => ((i + 1) % N) + 1);
    T.push({ name: 'x02_max_single_ring', input: build(f) });
  }
  {
    // longest possible tail: 1 is a self-loop, everyone else strung behind it.
    // This is the test a recursive traversal dies on.
    const f = Array.from({ length: N }, (_, i) => (i === 0 ? 1 : i));
    T.push({ name: 'x03_max_long_tail', input: build(f) });
  }
  {
    // every employee names themselves
    const f = Array.from({ length: N }, (_, i) => i + 1);
    T.push({ name: 'x04_max_all_self_loops', input: build(f) });
  }
  {
    // everyone points at employee 1, who points at themselves
    const f = Array(N).fill(1);
    T.push({ name: 'x05_max_all_to_one', input: build(f) });
  }
  {
    // 100000 separate two-person rings
    const f = new Array(N);
    for (let i = 0; i < N; i += 2) { f[i] = i + 2; f[i + 1] = i + 1; }
    T.push({ name: 'x06_max_many_small_rings', input: build(f) });
  }
  {
    // half the company in one ring, half in a tail feeding it
    const half = N >> 1;
    const f = new Array(N);
    for (let i = 0; i < half; i++) f[i] = ((i + 1) % half) + 1;
    for (let i = half; i < N; i++) f[i] = i;      // i -> i (1-based: i+1 -> i)
    T.push({ name: 'x07_max_ring_plus_tail', input: build(f) });
  }

  return T;
};
