'use strict';
// Test generator - m27 / Q70 Warehouse Robot Keys
// Every grid must contain exactly one S and exactly one X. The exit is X, not
// E - E is the shutter matching card e.
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length} ${rows[0].length}\n${rows.join('\n')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(['S.a.A.X']) });
  T.push({ name: 'e02_sample2', input: build(['S.#.X', '..aA.']) });
  T.push({ name: 'e03_sample3_blocked', input: build(['S#X', '###']) });
  T.push({ name: 'e04_adjacent', input: build(['SX']) });
  T.push({ name: 'e05_shutter_with_no_card', input: build(['S.A.X']) });
  T.push({ name: 'e06_card_with_no_shutter', input: build(['S.a.X']) });
  T.push({ name: 'e07_must_backtrack_for_card', input: build(['..a..', '.###.', 'S#A#X', '.###.', '.....']) });
  T.push({ name: 'e08_all_six_keys_then_gates', input: build(['SabcdefABCDEFX']) });
  T.push({ name: 'e09_gates_before_keys', input: build(['SABCDEFabcdefX']) });
  T.push({ name: 'e10_single_row_long', input: build(['S' + '.'.repeat(50) + 'X']) });
  T.push({ name: 'e11_single_column', input: build(['S', '.', 'a', '.', 'A', '.', 'X']) });
  T.push({
    name: 'e12_open_room',
    input: build(Array.from({ length: 8 }, (_, i) =>
      i === 0 ? 'S' + '.'.repeat(7) : (i === 7 ? '.'.repeat(7) + 'X' : '.'.repeat(8)))),
  });
  T.push({ name: 'e13_start_walled_in', input: build(['S#.', '##.', '..X']) });
  T.push({ name: 'e14_key_behind_its_own_gate', input: build(['S.A.a.X']) });

  // --- small randoms (stress-compared against brute) -----------------
  const randGrid = (rows, cols, wallP, keys) => {
    const pool = '.'.repeat(20) + '#'.repeat(Math.round(wallP * 20));
    const g = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) row += pool[R.int(pool.length)];
      g.push(row.split(''));
    }
    const letters = 'abcdef'.slice(0, keys);
    for (const ch of letters) {
      if (R.next() < 0.85) { const i = R.int(rows), j = R.int(cols); g[i][j] = ch; }
      if (R.next() < 0.85) { const i = R.int(rows), j = R.int(cols); g[i][j] = ch.toUpperCase(); }
    }
    // S and X go in last so nothing can overwrite them, and never collide
    const si = R.int(rows), sj = R.int(cols);
    let ei = R.int(rows), ej = R.int(cols);
    while (ei === si && ej === sj) { ei = R.int(rows); ej = R.int(cols); }
    g[si][sj] = 'S';
    g[ei][ej] = 'X';
    return g.map((x) => x.join(''));
  };

  for (let t = 0; t < 20; t++) {
    const rows = 1 + R.int(6), cols = 1 + R.int(6);
    if (rows * cols < 2) { t--; continue; }
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(randGrid(rows, cols, 0.35, 1 + R.int(3))),
    });
  }
  // key-heavy small grids: many masks genuinely reachable
  for (let t = 0; t < 10; t++) {
    const rows = 3 + R.int(4), cols = 3 + R.int(4);
    T.push({
      name: 'k' + String(t + 1).padStart(2, '0') + '_key_heavy',
      input: build(randGrid(rows, cols, 0.15, 3 + R.int(4))),
    });
  }
  // wall-heavy: -1 shows up often
  for (let t = 0; t < 10; t++) {
    const rows = 2 + R.int(5), cols = 2 + R.int(5);
    T.push({
      name: 'b' + String(t + 1).padStart(2, '0') + '_wall_heavy',
      input: build(randGrid(rows, cols, 0.9, 1 + R.int(3))),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(randGrid(30, 30, 0.3, 4)) });
  T.push({ name: 'm02_medium_open', input: build(randGrid(40, 40, 0.05, 6)) });

  // --- maximum size --------------------------------------------------
  T.push({ name: 'x01_max_random', input: build(randGrid(100, 100, 0.3, 6)) });
  T.push({ name: 'x02_max_open_all_keys', input: build(randGrid(100, 100, 0.02, 6)) });
  T.push({ name: 'x03_max_maze_like', input: build(randGrid(100, 100, 0.45, 5)) });
  {
    // completely open 100x100, S and X in opposite corners: 198 moves
    const g = Array.from({ length: 100 }, () => Array(100).fill('.'));
    g[0][0] = 'S'; g[99][99] = 'X';
    T.push({ name: 'x04_max_open_corners', input: build(g.map((x) => x.join(''))) });
  }
  {
    // serpentine corridor: forces a very long path through a full-size grid
    const g = Array.from({ length: 100 }, () => Array(100).fill('#'));
    for (let i = 0; i < 100; i += 2) {
      for (let j = 0; j < 100; j++) g[i][j] = '.';
      if (i + 1 < 100) g[i + 1][(i / 2) % 2 === 0 ? 99 : 0] = '.';
    }
    g[0][0] = 'S';
    g[98][(98 / 2) % 2 === 0 ? 99 : 0] = 'X';
    T.push({ name: 'x05_max_serpentine', input: build(g.map((x) => x.join(''))) });
  }
  {
    // six gates in series, each card stashed on the far side of the previous
    const g = Array.from({ length: 100 }, () => Array(100).fill('.'));
    for (let i = 0; i < 6; i++) {
      const col = 14 + i * 14;
      for (let rr = 0; rr < 100; rr++) g[rr][col] = '#';
      g[50][col] = String.fromCharCode('A'.charCodeAt(0) + i);
      g[10 + i * 5][col - 7] = String.fromCharCode('a'.charCodeAt(0) + i);
    }
    g[0][0] = 'S'; g[99][99] = 'X';
    T.push({ name: 'x06_max_six_gates', input: build(g.map((x) => x.join(''))) });
  }
  {
    // exit sealed behind a shutter whose card does not exist anywhere
    const g = Array.from({ length: 100 }, () => Array(100).fill('.'));
    for (let rr = 0; rr < 100; rr++) g[rr][50] = '#';
    g[50][50] = 'F';
    g[0][0] = 'S'; g[99][99] = 'X';
    T.push({ name: 'x07_max_impossible_gate', input: build(g.map((x) => x.join(''))) });
  }
  {
    // all 64 masks are reachable and useful: keys scattered, gates everywhere
    const g = Array.from({ length: 100 }, () => Array(100).fill('.'));
    for (let i = 0; i < 6; i++) {
      g[5 + i * 3][5 + i * 3] = String.fromCharCode('a'.charCodeAt(0) + i);
      for (let rr = 0; rr < 100; rr++) if (rr % 7 !== i) g[rr][60 + i * 6] = '#';
      g[i][60 + i * 6] = String.fromCharCode('A'.charCodeAt(0) + i);
    }
    g[0][0] = 'S'; g[99][99] = 'X';
    T.push({ name: 'x08_max_mask_explosion', input: build(g.map((x) => x.join(''))) });
  }

  return T;
};
