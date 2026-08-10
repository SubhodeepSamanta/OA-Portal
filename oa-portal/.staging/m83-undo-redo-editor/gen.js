'use strict';
// Test generator - m83 / Q199 Undo-Redo Editor
// The generator mirrors the editor's state so DELETE k and PRINT i are always
// within range, and so the redo history is cleared exactly when it should be.
module.exports = function (R) {
  const T = [];
  const build = (ops) => `${ops.length}\n${ops.join('\n')}\n`;
  const LET = 'abcdefghijklmnopqrstuvwxyz';
  const word = (k) => Array.from({ length: k }, () => LET[R.int(26)]).join('');

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample', input: build(['APPEND abc', 'PRINT 2', 'DELETE 1', 'PRINT 2', 'UNDO', 'PRINT 3']) });
  T.push({ name: 'e02_redo', input: build(['APPEND xy', 'APPEND z', 'UNDO', 'PRINT 2', 'REDO', 'PRINT 3', 'UNDO']) });
  T.push({ name: 'e03_undo_nothing', input: build(['UNDO', 'APPEND ab', 'UNDO', 'REDO', 'PRINT 1']) });
  T.push({ name: 'e04_redo_nothing', input: build(['REDO', 'APPEND q', 'PRINT 1']) });
  T.push({ name: 'e05_edit_clears_redo', input: build(['APPEND ab', 'UNDO', 'APPEND cd', 'REDO', 'PRINT 2']) });
  T.push({ name: 'e06_delete_all', input: build(['APPEND hello', 'DELETE 5', 'UNDO', 'PRINT 5']) });
  T.push({ name: 'e07_many_undos', input: build(['APPEND a', 'APPEND b', 'APPEND c', 'UNDO', 'UNDO', 'UNDO', 'REDO', 'PRINT 1']) });
  T.push({ name: 'e08_print_first_and_last', input: build(['APPEND abcdef', 'PRINT 1', 'PRINT 6']) });
  T.push({ name: 'e09_delete_then_append', input: build(['APPEND abcd', 'DELETE 2', 'APPEND zz', 'PRINT 3', 'PRINT 4']) });
  T.push({ name: 'e10_repeated_undo_redo', input: build(['APPEND ab', 'UNDO', 'REDO', 'UNDO', 'REDO', 'PRINT 2']) });
  T.push({ name: 'e11_single_char', input: build(['APPEND z', 'PRINT 1']) });
  {
    // a long chain of single appends then prints at every depth
    const ops = [];
    for (let i = 0; i < 40; i++) ops.push('APPEND ' + LET[i % 26]);
    for (let i = 1; i <= 40; i++) ops.push('PRINT ' + i);
    T.push({ name: 'e12_deep_chain', input: build(ops) });
  }

  // --- randoms -------------------------------------------------------
  // mirror the editor so every command is legal
  const randOps = (count, maxAppend) => {
    const ops = [];
    let len = 0;
    const undo = [];
    const redo = [];
    for (let i = 0; i < count; i++) {
      const roll = R.next();
      if (roll < 0.4 || len === 0) {
        const k = 1 + R.int(maxAppend);
        ops.push('APPEND ' + word(k));
        undo.push(len); redo.length = 0; len += k;
      } else if (roll < 0.55) {
        const k = 1 + R.int(len);
        ops.push('DELETE ' + k);
        undo.push(len); redo.length = 0; len -= k;
      } else if (roll < 0.7) {
        ops.push('UNDO');
        if (undo.length) { redo.push(len); len = undo.pop(); }
      } else if (roll < 0.8) {
        ops.push('REDO');
        if (redo.length) { undo.push(len); len = redo.pop(); }
      } else {
        if (len === 0) { ops.push('APPEND ' + word(1)); undo.push(len); redo.length = 0; len += 1; }
        else ops.push('PRINT ' + (1 + R.int(len)));
      }
    }
    return ops;
  };

  for (let t = 0; t < 22; t++) {
    T.push({ name: 'r' + String(t + 1).padStart(2, '0') + '_random_small', input: build(randOps(5 + R.int(35), 4)) });
  }
  for (let t = 0; t < 10; t++) {
    T.push({ name: 'p' + String(t + 1).padStart(2, '0') + '_print_heavy', input: build(randOps(15 + R.int(30), 2)) });
  }
  for (let t = 0; t < 10; t++) {
    T.push({ name: 'u' + String(t + 1).padStart(2, '0') + '_undo_heavy', input: build(randOps(20 + R.int(30), 1)) });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'z01_medium', input: build(randOps(4000, 6)) });

  // --- maximum size --------------------------------------------------
  const Q = 200000;
  T.push({ name: 'x01_max_random', input: build(randOps(Q, 1)) });
  {
    // one enormous document, then prints at random depths
    const ops = ['APPEND ' + word(100000)];
    for (let i = 1; i < Q && ops.length < Q; i++) ops.push('PRINT ' + (1 + R.int(100000)));
    T.push({ name: 'x02_max_deep_prints', input: build(ops.slice(0, Q)) });
  }
  {
    // build one character at a time, then print position 1 repeatedly -
    // the deepest possible climb, done 100000 times
    const half = Q / 2;
    const ops = [];
    for (let i = 0; i < half; i++) ops.push('APPEND ' + LET[i % 26]);
    for (let i = 0; i < Q - half; i++) ops.push('PRINT 1');
    T.push({ name: 'x03_max_deep_climb', input: build(ops) });
  }
  {
    // alternate append and undo forever
    const ops = [];
    for (let i = 0; i < Q; i++) ops.push(i % 2 ? 'UNDO' : 'APPEND ' + LET[i % 26]);
    T.push({ name: 'x04_max_append_undo', input: build(ops) });
  }
  {
    // grow, delete most of it, grow again - many branches in the trie
    const ops = [];
    let len = 0;
    while (ops.length < Q - 2) {
      ops.push('APPEND ' + word(3)); len += 3;
      if (len > 4) { ops.push('DELETE 2'); len -= 2; }
    }
    ops.push('PRINT 1');
    T.push({ name: 'x05_max_branching', input: build(ops.slice(0, Q)) });
  }
  {
    // undo everything then redo everything
    const ops = [];
    const third = Q / 3;
    for (let i = 0; i < third; i++) ops.push('APPEND ' + LET[i % 26]);
    for (let i = 0; i < third; i++) ops.push('UNDO');
    for (let i = 0; i < Q - 2 * third; i++) ops.push('REDO');
    T.push({ name: 'x06_max_undo_all_redo_all', input: build(ops) });
  }

  return T;
};
