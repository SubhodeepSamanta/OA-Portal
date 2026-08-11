'use strict';
// Test generator - c9 / Q79 Labyrinth (CSES 1193)
// Both solutions are O(n*m) BFS, so "small" here just means small on disk.
// Shape is what matters: open rooms, dense walls, corridors, and grids with
// no route at all.
module.exports = function (R) {
  const T = [];

  // place exactly one A and one B on two distinct floor squares
  const finish = (grid) => {
    const n = grid.length, m = grid[0].length;
    const floors = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < m; c++) if (grid[r][c] === '.') floors.push([r, c]);
    if (floors.length < 2) {                 // force room for A and B
      grid[0][0] = '.';
      grid[n - 1][m - 1] = '.';
      floors.length = 0;
      floors.push([0, 0], [n - 1, m - 1]);
    }
    const i = R.int(floors.length);
    let j = R.int(floors.length);
    while (j === i) j = R.int(floors.length);
    grid[floors[i][0]][floors[i][1]] = 'A';
    grid[floors[j][0]][floors[j][1]] = 'B';
    return `${n} ${m}\n` + grid.map((row) => row.join('')).join('\n') + '\n';
  };

  const blank = (n, m, ch) => Array.from({ length: n }, () => Array(m).fill(ch));
  const randomGrid = (n, m, wallPct) =>
    Array.from({ length: n }, () => Array.from({ length: m }, () => (R.int(100) < wallPct ? '#' : '.')));

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_cses_sample', input: '5 8\n########\n#.A#...#\n#.##.#B#\n#......#\n########\n' });
  T.push({ name: 'e02_adjacent', input: '1 2\nAB\n' });
  T.push({ name: 'e03_blocked', input: '1 3\nA#B\n' });
  T.push({ name: 'e04_single_column', input: '4 1\nA\n.\n.\nB\n' });
  T.push({ name: 'e05_single_row', input: '1 5\nA...B\n' });
  T.push({ name: 'e06_walled_off', input: '3 3\nA.#\n..#\n##B\n' });
  T.push({ name: 'e07_open_room', input: finish(blank(6, 6, '.')) });
  T.push({ name: 'e08_spiral_corridor', input: '5 5\nA....\n####.\n.....\n.####\n....B\n' });
  T.push({ name: 'e09_two_routes_same_length', input: '3 3\nA..\n.#.\n..B\n' });
  T.push({ name: 'e10_all_wall_but_two', input: '3 3\nA#B\n###\n###\n' });
  T.push({ name: 'e11_full_border', input: '5 5\n#####\n#A.B#\n#...#\n#...#\n#####\n' });

  // --- small randoms at several wall densities -----------------------
  for (let i = 0; i < 20; i++) {
    // m >= 2 so the grid always has room for both an A and a B - a 1x1 grid
    // is not a valid input for this problem
    const n = 1 + R.int(12), m = 2 + R.int(11);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: finish(randomGrid(n, m, 20 + R.int(30))),
    });
  }
  // dense walls, so NO is common
  for (let i = 0; i < 12; i++) {
    const n = 3 + R.int(14), m = 3 + R.int(14);
    T.push({
      name: 'w' + String(i + 1).padStart(2, '0') + '_dense_walls',
      input: finish(randomGrid(n, m, 45 + R.int(25))),
    });
  }
  // wide open, so routes are long and many are tied
  for (let i = 0; i < 10; i++) {
    const n = 3 + R.int(16), m = 3 + R.int(16);
    T.push({
      name: 'o' + String(i + 1).padStart(2, '0') + '_open',
      input: finish(randomGrid(n, m, R.int(8))),
    });
  }
  // long thin grids
  for (let i = 0; i < 8; i++) {
    const n = 1 + R.int(3), m = 20 + R.int(40);
    T.push({
      name: 't' + String(i + 1).padStart(2, '0') + '_thin',
      input: finish(randomGrid(n, m, 10 + R.int(20))),
    });
  }

  // --- maximum size --------------------------------------------------
  const N = 1000, M = 1000;
  T.push({ name: 'x01_max_open', input: finish(blank(N, M, '.')) });
  T.push({ name: 'x02_max_random_sparse', input: finish(randomGrid(N, M, 20)) });
  T.push({ name: 'x03_max_random_dense', input: finish(randomGrid(N, M, 55)) });
  T.push({
    // comb: vertical walls with a gap on alternating ends, forcing a route
    // that snakes across the whole grid
    name: 'x04_max_comb',
    input: (() => {
      const g = blank(N, M, '.');
      for (let c = 1; c < M; c += 2) {
        for (let r = 0; r < N; r++) g[r][c] = '#';
        g[(c % 4 === 1) ? 0 : N - 1][c] = '.';
      }
      g[0][0] = 'A';
      g[N - 1][M - 1] = '.';
      // put B at the far end of the snake
      g[N - 1][M - 1] = 'B';
      return `${N} ${M}\n` + g.map((row) => row.join('')).join('\n') + '\n';
    })(),
  });
  T.push({
    // one long single-file corridor
    name: 'x05_max_corridor',
    input: (() => {
      const g = blank(N, M, '#');
      for (let c = 0; c < M; c++) g[0][c] = '.';
      for (let r = 0; r < N; r++) g[r][M - 1] = '.';
      g[0][0] = 'A';
      g[N - 1][M - 1] = 'B';
      return `${N} ${M}\n` + g.map((row) => row.join('')).join('\n') + '\n';
    })(),
  });
  T.push({
    // A and B sealed off from each other at full size
    name: 'x06_max_no_route',
    input: (() => {
      const g = blank(N, M, '.');
      for (let r = 0; r < N; r++) g[r][M >> 1] = '#';
      g[0][0] = 'A';
      g[N - 1][M - 1] = 'B';
      return `${N} ${M}\n` + g.map((row) => row.join('')).join('\n') + '\n';
    })(),
  });

  return T;
};
