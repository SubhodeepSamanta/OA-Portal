'use strict';
// Test generator - m71 / Q166 Rule Shadowing
module.exports = function (R) {
  const T = [];
  const act = () => (R.int(2) ? 'ALLOW' : 'DENY');
  const build = (rules) => `${rules.length}\n` + rules.map((r) => r.join(' ')).join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_inside_earlier', input: build([[0, 100, 'ALLOW'], [50, 60, 'DENY'], [0, 200, 'ALLOW']]) });
  T.push({ name: 'e02_adjacent_not_covering', input: build([[0, 10, 'ALLOW'], [11, 20, 'DENY']]) });
  T.push({ name: 'e03_gap_then_covered', input: build([[0, 10, 'ALLOW'], [20, 30, 'DENY'], [5, 25, 'ALLOW'], [0, 30, 'DENY']]) });
  T.push({ name: 'e04_adjacency_merge_matters', input: build([[0, 10, 'ALLOW'], [11, 20, 'ALLOW'], [5, 15, 'DENY']]) });
  T.push({ name: 'e05_single_rule', input: build([[5, 5, 'DENY']]) });
  T.push({ name: 'e06_identical_repeated', input: build([[7, 9, 'ALLOW'], [7, 9, 'DENY'], [7, 9, 'ALLOW']]) });
  T.push({ name: 'e07_full_range_first', input: build([[0, 4294967295, 'ALLOW'], [0, 0, 'DENY'], [4294967295, 4294967295, 'DENY']]) });
  T.push({ name: 'e08_top_of_range', input: build([[4294967290, 4294967295, 'ALLOW'], [4294967295, 4294967295, 'DENY']]) });
  T.push({ name: 'e09_single_addresses', input: build([[1, 1, 'ALLOW'], [2, 2, 'ALLOW'], [1, 2, 'DENY']]) });
  T.push({ name: 'e10_all_disjoint', input: build([[0, 1, 'ALLOW'], [10, 11, 'ALLOW'], [20, 21, 'ALLOW']]) });
  T.push({ name: 'e11_widening', input: build([[5, 5, 'ALLOW'], [4, 6, 'ALLOW'], [3, 7, 'ALLOW'], [4, 6, 'DENY']]) });

  // --- small randoms (stress-compared against brute) -----------------
  const randRules = (n, span) =>
    Array.from({ length: n }, () => {
      const l = R.int(span);
      return [l, l + R.int(span), act()];
    });

  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(randRules(1 + R.int(25), 30)),
    });
  }
  // very tight coordinates, so adjacency happens constantly
  for (let t = 0; t < 12; t++) {
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_tight',
      input: build(randRules(3 + R.int(22), 6)),
    });
  }
  // single-address rules only
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(20);
    T.push({
      name: 'u' + String(t + 1).padStart(2, '0') + '_single_addresses',
      input: build(Array.from({ length: n }, () => { const a = R.int(10); return [a, a, act()]; })),
    });
  }
  // steadily widening rules: everything after the first is live
  for (let t = 0; t < 8; t++) {
    const n = 3 + R.int(15);
    const mid = 50;
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_widening',
      input: build(Array.from({ length: n }, (_, i) => [mid - i, mid + i, act()])),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(randRules(4000, 20000)) });

  // --- maximum size --------------------------------------------------
  const N = 200000;
  const TOP = 4294967295;
  T.push({
    name: 'x01_max_random',
    input: build(Array.from({ length: N }, () => {
      const l = R.int(4000000000);
      return [l, Math.min(TOP, l + R.int(1000000)), act()];
    })),
  });
  {
    // the first rule covers everything, so every later rule is shadowed
    const rules = [[0, TOP, 'ALLOW']];
    for (let i = 1; i < N; i++) { const l = R.int(4000000000); rules.push([l, Math.min(TOP, l + R.int(1000)), act()]); }
    T.push({ name: 'x02_max_all_shadowed', input: build(rules) });
  }
  {
    // perfectly disjoint, spaced out: nothing is ever shadowed
    const rules = Array.from({ length: N }, (_, i) => [i * 20, i * 20 + 5, act()]);
    T.push({ name: 'x03_max_none_shadowed', input: build(rules) });
  }
  {
    // adjacent blocks that keep merging, then one big rule at the end
    const rules = Array.from({ length: N - 1 }, (_, i) => [i * 10, i * 10 + 9, act()]);
    rules.push([0, (N - 2) * 10 + 9, 'DENY']);
    T.push({ name: 'x04_max_adjacent_chain', input: build(rules) });
  }
  {
    // every rule identical after the first
    const rules = Array.from({ length: N }, () => [1000, 2000, act()]);
    T.push({ name: 'x05_max_identical', input: build(rules) });
  }
  {
    // rules widening around a centre: each one live, forcing repeated merges
    const rules = Array.from({ length: N }, (_, i) => [2000000000 - i, 2000000000 + i, act()]);
    T.push({ name: 'x06_max_widening', input: build(rules) });
  }
  {
    // rules built at the very top of the address space
    const rules = Array.from({ length: N }, (_, i) => [TOP - (i % 1000), TOP, act()]);
    T.push({ name: 'x07_max_top_of_range', input: build(rules) });
  }
  {
    // single addresses filling a dense block, then a rule covering it
    const rules = Array.from({ length: N - 1 }, (_, i) => [i, i, act()]);
    rules.push([0, N - 2, 'DENY']);
    T.push({ name: 'x08_max_singletons_then_span', input: build(rules) });
  }

  return T;
};
