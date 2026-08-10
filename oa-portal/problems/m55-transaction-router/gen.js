'use strict';
// Test generator - m55 / Q150 Transaction Router
// REMOVE must always name a gateway that is currently in service, so the
// generator tracks the live set as it emits operations.
module.exports = function (R) {
  const T = [];
  const build = (init, ops) =>
    `${init.length} ${ops.length}\n` +
    (init.length ? init.map((g) => g.join(' ')).join('\n') + '\n' : '') +
    ops.join('\n') + '\n';

  // --- edge cases ---------------------------------------------------
  T.push({
    name: 'e01_sample_basic',
    input: build([[90, 50], [95, 80], [99, 200]], ['ROUTE 90', 'ROUTE 96', 'ROUTE 100', 'REMOVE 1']),
  });
  T.push({
    name: 'e02_sample_add_and_remove',
    input: build([[80, 10], [90, 100]], ['ROUTE 85', 'REMOVE 2', 'ROUTE 85', 'ADD 95 20', 'ROUTE 85']),
  });
  T.push({
    name: 'e03_cheapest_not_best_rate',
    input: build([[99, 500], [95, 10], [90, 1]], ['ROUTE 92', 'ROUTE 90']),
  });
  T.push({ name: 'e04_single_gateway', input: build([[50, 7]], ['ROUTE 50', 'ROUTE 51']) });
  T.push({
    name: 'e05_remove_everything',
    input: build([[10, 1], [20, 2]], ['REMOVE 1', 'ROUTE 0', 'REMOVE 2', 'ROUTE 0']),
  });
  T.push({
    name: 'e06_duplicate_rates',
    input: build([[50, 9], [50, 3], [50, 7]], ['ROUTE 50', 'REMOVE 2', 'ROUTE 50', 'REMOVE 3', 'ROUTE 50']),
  });
  T.push({
    name: 'e07_duplicate_rate_and_cost',
    input: build([[50, 5], [50, 5]], ['ROUTE 50', 'REMOVE 1', 'ROUTE 50', 'REMOVE 2', 'ROUTE 50']),
  });
  T.push({ name: 'e08_zero_rate', input: build([[0, 4]], ['ROUTE 0', 'ROUTE 1']) });
  T.push({
    name: 'e09_max_values',
    input: build([[1000000000, 1000000000]], ['ROUTE 1000000000', 'ROUTE 999999999']),
  });
  T.push({ name: 'e10_only_adds', input: build([[5, 5]], ['ADD 6 6', 'ADD 7 7']) });
  T.push({
    name: 'e11_readd_after_remove',
    input: build([[10, 1]], ['REMOVE 1', 'ROUTE 5', 'ADD 10 2', 'ROUTE 5', 'ADD 10 1', 'ROUTE 5']),
  });

  // --- small randoms (stress-compared against brute) -----------------
  // The live set is kept as a flat array with swap-removal. Spreading a Set
  // to pick a random member would be O(size) per REMOVE, and since the whole
  // generator is re-run for every stress seed that alone made the build hang.
  const randCase = (n, q, maxP, maxC) => {
    const init = Array.from({ length: n }, () => [R.int(maxP + 1), 1 + R.int(maxC)]);
    const liveArr = Array.from({ length: n }, (_, i) => i + 1);
    let count = n;
    const ops = [];
    for (let i = 0; i < q; i++) {
      const roll = R.next();
      if (roll < 0.45 || liveArr.length === 0) {
        ops.push(`ROUTE ${R.int(maxP + 2)}`);
      } else if (roll < 0.75) {
        count++;
        liveArr.push(count);
        ops.push(`ADD ${R.int(maxP + 1)} ${1 + R.int(maxC)}`);
      } else {
        const k = R.int(liveArr.length);
        const id = liveArr[k];
        liveArr[k] = liveArr[liveArr.length - 1];
        liveArr.pop();
        ops.push(`REMOVE ${id}`);
      }
    }
    return build(init, ops);
  };

  for (let t = 0; t < 22; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: randCase(1 + R.int(6), 5 + R.int(25), 30, 50),
    });
  }
  // a tiny rate alphabet, so duplicate leaves are everywhere
  for (let t = 0; t < 12; t++) {
    T.push({
      name: 'd' + String(t + 1).padStart(2, '0') + '_duplicate_rates',
      input: randCase(2 + R.int(6), 8 + R.int(22), 3, 20),
    });
  }
  // removal-heavy: the in-service set often empties
  for (let t = 0; t < 10; t++) {
    const n = 3 + R.int(5);
    const liveArr = Array.from({ length: n }, (_, i) => i + 1);
    const init = Array.from({ length: n }, () => [R.int(20), 1 + R.int(30)]);
    const ops = [];
    for (let i = 0; i < 10 + R.int(15); i++) {
      if (liveArr.length && R.next() < 0.5) {
        const k = R.int(liveArr.length);
        const id = liveArr[k];
        liveArr[k] = liveArr[liveArr.length - 1];
        liveArr.pop();
        ops.push(`REMOVE ${id}`);
      } else ops.push(`ROUTE ${R.int(22)}`);
    }
    T.push({ name: 'k' + String(t + 1).padStart(2, '0') + '_removal_heavy', input: build(init, ops) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: randCase(2000, 4000, 100000, 1000000) });

  // --- maximum size --------------------------------------------------
  const N = 200000, Q = 200000;
  T.push({ name: 'x01_max_random', input: randCase(N, Q, 1000000000, 1000000000) });
  {
    // every operation is a ROUTE against a large static set
    const init = Array.from({ length: N }, () => [R.int(1000000001), 1 + R.int(1000000000)]);
    const ops = Array.from({ length: Q }, () => `ROUTE ${R.int(1000000001)}`);
    T.push({ name: 'x02_max_all_routes', input: build(init, ops) });
  }
  {
    // remove the entire starting set, routing as it drains
    const init = Array.from({ length: N }, (_, i) => [i, 1 + R.int(1000000)]);
    const ops = [];
    for (let i = 1; i <= N && ops.length < Q; i++) {
      ops.push(`REMOVE ${i}`);
      if (i % 4 === 0 && ops.length < Q) ops.push('ROUTE 0');
    }
    while (ops.length < Q) ops.push('ROUTE 0');
    T.push({ name: 'x03_max_drain', input: build(init, ops.slice(0, Q)) });
  }
  {
    // every gateway shares one success rate: a single leaf holds them all
    const init = Array.from({ length: N }, () => [7, 1 + R.int(1000000000)]);
    const ops = Array.from({ length: Q }, (_, i) =>
      i % 2 === 0 ? `REMOVE ${1 + (i >> 1)}` : 'ROUTE 7');
    T.push({ name: 'x04_max_one_leaf', input: build(init, ops) });
  }
  {
    // all adds, interleaved with routes that always match the newest
    const init = [[0, 1000000000]];
    const ops = [];
    for (let i = 0; ops.length < Q; i++) {
      ops.push(`ADD ${i + 1} ${1000000000 - i}`);
      if (ops.length < Q) ops.push(`ROUTE ${i + 1}`);
    }
    T.push({ name: 'x05_max_growing', input: build(init, ops.slice(0, Q)) });
  }
  {
    // rates ascending, costs ascending: the answer is always the first match
    const init = Array.from({ length: N }, (_, i) => [i, i + 1]);
    const ops = Array.from({ length: Q }, () => `ROUTE ${R.int(N)}`);
    T.push({ name: 'x06_max_monotone', input: build(init, ops) });
  }
  {
    // nothing ever qualifies: every answer is -1
    const init = Array.from({ length: N }, () => [0, 1 + R.int(1000)]);
    const ops = Array.from({ length: Q }, () => 'ROUTE 1000000000');
    T.push({ name: 'x07_max_all_minus_one', input: build(init, ops) });
  }

  return T;
};
