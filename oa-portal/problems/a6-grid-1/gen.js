'use strict';
// Test generator - a6 / Q95 Grid 1 (AtCoder EDPC H)
// Small cases keep H + W <= 22 so the brute can walk every path. Start and
// end are always forced empty, as the constraints promise.
module.exports = function (R) {
  const T = [];
  const render = (g) => `${g.length} ${g[0].length}\n` + g.map((r) => r.join('')).join('\n') + '\n';

  const grid = (h, w, wallPct) => {
    const g = Array.from({ length: h }, () =>
      Array.from({ length: w }, () => (R.int(100) < wallPct ? '#' : '.')));
    g[0][0] = '.';
    g[h - 1][w - 1] = '.';
    return g;
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_edpc_sample1', input: '3 4\n...#\n.#..\n....\n' });
  T.push({ name: 'e02_edpc_sample2', input: '5 2\n..\n#.\n..\n.#\n..\n' });
  T.push({ name: 'e03_edpc_sample3_open20', input: '20 20\n' + Array(20).fill('.'.repeat(20)).join('\n') + '\n' });
  T.push({ name: 'e04_smallest', input: '2 2\n..\n..\n' });
  T.push({ name: 'e05_blocked_corner', input: '2 2\n.#\n#.\n' });           // 0 paths
  T.push({ name: 'e06_single_column', input: '4 2\n..\n..\n..\n..\n' });
  T.push({ name: 'e07_wall_row', input: '3 3\n...\n###\n...\n' });          // 0 paths
  T.push({ name: 'e08_corridor', input: '3 3\n..#\n.#.\n...\n' });
  T.push({ name: 'e09_open_small', input: '4 4\n' + Array(4).fill('....').join('\n') + '\n' });
  T.push({ name: 'e10_diagonal_walls', input: '4 4\n.#..\n..#.\n...#\n....\n' });

  // --- small randoms (brute walks every path) ------------------------
  for (let i = 0; i < 22; i++) {
    const h = 2 + R.int(9), w = 2 + Math.min(9, R.int(22 - h - 1) + 1);
    T.push({
      name: 'r' + String(i + 1).padStart(2, '0') + '_random_small',
      input: render(grid(h, w, 10 + R.int(30))),
    });
  }
  // dense walls - many grids answer 0
  for (let i = 0; i < 10; i++) {
    const h = 2 + R.int(8), w = 2 + R.int(8);
    T.push({
      name: 'w' + String(i + 1).padStart(2, '0') + '_dense_walls',
      input: render(grid(h, w, 45 + R.int(30))),
    });
  }
  // wide open - the counts get large and the modulus starts mattering
  for (let i = 0; i < 8; i++) {
    const h = 2 + R.int(9), w = 2 + R.int(9);
    T.push({ name: 'o' + String(i + 1).padStart(2, '0') + '_open', input: render(grid(h, w, 0)) });
  }

  // --- maximum size --------------------------------------------------
  const H = 1000, W = 1000;
  T.push({
    // fully open 1000x1000: the true count is astronomical, so this is the
    // case where reducing only at the end is hopeless
    name: 'x01_max_open',
    input: '1000 1000\n' + Array(H).fill('.'.repeat(W)).join('\n') + '\n',
  });
  T.push({ name: 'x02_max_sparse_walls', input: render(grid(H, W, 10)) });
  T.push({ name: 'x03_max_dense_walls', input: render(grid(H, W, 40)) });
  T.push({
    // a wall row across the middle: 0 paths at full size
    name: 'x04_max_blocked',
    input: (() => {
      const g = Array.from({ length: H }, () => Array(W).fill('.'));
      for (let c = 0; c < W; c++) g[H >> 1][c] = '#';
      g[0][0] = '.'; g[H - 1][W - 1] = '.';
      return render(g);
    })(),
  });
  T.push({
    // one open corridor along the top row and right column
    name: 'x05_max_corridor',
    input: (() => {
      const g = Array.from({ length: H }, () => Array(W).fill('#'));
      for (let c = 0; c < W; c++) g[0][c] = '.';
      for (let r = 0; r < H; r++) g[r][W - 1] = '.';
      return render(g);
    })(),
  });

  return T;
};
