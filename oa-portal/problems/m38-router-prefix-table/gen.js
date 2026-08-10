'use strict';
// Test generator - m38 / Q113 Router Prefix Table
// Addresses are ALWAYS exactly 32 binary characters.
module.exports = function (R) {
  const T = [];
  const build = (rules, addrs) =>
    `${rules.length} ${addrs.length}\n` + rules.join('\n') + '\n' + addrs.join('\n') + '\n';

  const bits = (k) => Array.from({ length: k }, () => (R.int(2) ? '1' : '0')).join('');
  const addr = () => bits(32);
  const addrFrom = (prefix) => (prefix + bits(32)).slice(0, 32);

  // --- edge cases ---------------------------------------------------
  T.push({
    name: 'e01_sample1',
    input: build(['1', '10', '1011'], ['1011'.padEnd(32, '0'), '0111'.padEnd(32, '0')]),
  });
  T.push({ name: 'e02_single_rule', input: build(['0'], ['0'.repeat(32)]) });
  T.push({ name: 'e03_longer_rule_fails', input: build(['11', '1'], ['1'.padEnd(32, '0')]) });
  T.push({ name: 'e04_no_match', input: build(['1'], ['0'.repeat(32)]) });
  T.push({ name: 'e05_full_length_rule', input: build(['1'.repeat(32)], ['1'.repeat(32), '1'.repeat(31) + '0']) });
  T.push({ name: 'e06_duplicate_rules', input: build(['101', '101', '101'], ['101'.padEnd(32, '1')]) });
  T.push({
    // nodes exist for 101 but no rule ends there
    name: 'e07_intermediate_node_not_a_rule',
    input: build(['1011'], ['101'.padEnd(32, '0'), '1011'.padEnd(32, '0')]),
  });
  T.push({
    name: 'e08_all_prefix_lengths',
    input: build(Array.from({ length: 32 }, (_, i) => '1'.repeat(i + 1)), ['1'.repeat(32)]),
  });
  T.push({ name: 'e09_both_branches', input: build(['0', '1'], ['0'.repeat(32), '1'.repeat(32)]) });
  T.push({ name: 'e10_empty_side', input: build(['0000'], ['1'.repeat(32), '0000'.padEnd(32, '1')]) });

  // --- small randoms (stress-compared against brute) -----------------
  for (let t = 0; t < 20; t++) {
    const n = 1 + R.int(8);
    const q = 1 + R.int(6);
    const rules = Array.from({ length: n }, () => bits(1 + R.int(6)));
    const addrs = Array.from({ length: q }, () => addr());
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(rules, addrs) });
  }
  // addresses deliberately built from the rules, so matches are common
  for (let t = 0; t < 12; t++) {
    const n = 2 + R.int(6);
    const rules = Array.from({ length: n }, () => bits(1 + R.int(5)));
    const addrs = Array.from({ length: 1 + R.int(6) }, () =>
      addrFrom(rules[R.int(rules.length)]));
    T.push({ name: 'h' + String(t + 1).padStart(2, '0') + '_hits_small', input: build(rules, addrs) });
  }
  // a tight alphabet of short rules: heavy sharing near the root
  for (let t = 0; t < 8; t++) {
    const rules = Array.from({ length: 2 + R.int(6) }, () => bits(1 + R.int(3)));
    const addrs = Array.from({ length: 2 + R.int(5) }, () => addr());
    T.push({ name: 's' + String(t + 1).padStart(2, '0') + '_short_rules', input: build(rules, addrs) });
  }

  // --- medium --------------------------------------------------------
  {
    const rules = Array.from({ length: 3000 }, () => bits(1 + R.int(32)));
    const addrs = Array.from({ length: 3000 }, () => (R.next() < 0.5 ? addrFrom(rules[R.int(3000)]) : addr()));
    T.push({ name: 'm01_medium', input: build(rules, addrs) });
  }

  // --- maximum size --------------------------------------------------
  // The total rule length is capped at 1e6, so 2e5 rules forces them SHORT.
  // The long-rule case therefore uses fewer rules, right up against the cap.
  const N = 200000, Q = 200000;
  {
    const rules = Array.from({ length: N }, () => bits(1 + R.int(5)));
    const addrs = Array.from({ length: Q }, () => addr());
    T.push({ name: 'x01_max_random', input: build(rules, addrs) });
  }
  {
    // every address is built from a real rule, so every query matches
    const rules = Array.from({ length: N }, () => bits(1 + R.int(5)));
    const addrs = Array.from({ length: Q }, () => addrFrom(rules[R.int(N)]));
    T.push({ name: 'x02_max_all_hits', input: build(rules, addrs) });
  }
  {
    // all rules on the 1 side, all addresses on the 0 side: every answer -1
    const rules = Array.from({ length: N }, () => '1' + bits(R.int(4)));
    const addrs = Array.from({ length: Q }, () => '0' + bits(31));
    T.push({ name: 'x03_max_all_miss', input: build(rules, addrs) });
  }
  {
    // total rule length right at the 1e6 cap: 31250 rules of 32 characters
    const K = 31250;
    const rules = Array.from({ length: K }, () => bits(32));
    const addrs = Array.from({ length: Q }, () => (R.next() < 0.5 ? rules[R.int(K)] : addr()));
    T.push({ name: 'x04_max_total_rule_length', input: build(rules, addrs) });
  }
  {
    // one nested chain of all 32 lengths: the deepest possible single walk,
    // repeated for every one of 2e5 queries
    const rules = Array.from({ length: 32 }, (_, i) => '1'.repeat(i + 1));
    while (rules.length < N) rules.push('1'.repeat(1 + R.int(4)));
    const addrs = Array.from({ length: Q }, () => '1'.repeat(32));
    T.push({ name: 'x05_max_nested_chain', input: build(rules, addrs) });
  }
  {
    // every rule identical: duplicates at full scale
    const rules = Array(N).fill('1010');
    const addrs = Array.from({ length: Q }, () => addrFrom('1010'));
    T.push({ name: 'x06_max_all_duplicates', input: build(rules, addrs) });
  }
  {
    // short rules only: a wide shallow trie, every query answered in 1-3 steps
    const rules = Array.from({ length: N }, () => bits(1 + R.int(3)));
    const addrs = Array.from({ length: Q }, () => addr());
    T.push({ name: 'x07_max_shallow', input: build(rules, addrs) });
  }

  return T;
};
