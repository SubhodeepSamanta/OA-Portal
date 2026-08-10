'use strict';
// Test generator - m31 / Q74 Rumor Spread
module.exports = function (R) {
  const T = [];
  const build = (rows) => `${rows.length} ${rows[0].length}\n${rows.join('\n')}\n`;

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_sample1', input: build(['R..', '.#.', '...']) });
  T.push({ name: 'e02_sample2_sealed', input: build(['R#.', '.#.']) });
  T.push({ name: 'e03_single_knower', input: build(['R']) });
  T.push({ name: 'e04_no_knower', input: build(['..', '..']) });
  T.push({ name: 'e05_single_unknowing', input: build(['.']) });
  T.push({ name: 'e06_all_buildings', input: build(['##', '##']) });
  T.push({ name: 'e07_everyone_knows', input: build(['RR', 'RR']) });
  T.push({ name: 'e08_two_sources_meet', input: build(['R...R']) });
  T.push({ name: 'e09_long_corridor', input: build(['R' + '.'.repeat(60)]) });
  T.push({ name: 'e10_source_at_far_end', input: build(['.'.repeat(60) + 'R']) });
  T.push({ name: 'e11_single_column', input: build(['R', '.', '.', '#', '.', '.']) });
  T.push({ name: 'e12_pocket_behind_wall', input: build(['R.#..', '..#..', '..#..']) });
  T.push({ name: 'e13_spiral_ish', input: build(['R....', '####.', '.....', '.####', '.....']) });

  // --- small randoms (stress-compared against brute) -----------------
  const randGrid = (rows, cols, wallP, srcP) => {
    const g = [];
    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        const x = R.next();
        row += x < wallP ? '#' : (x < wallP + srcP ? 'R' : '.');
      }
      g.push(row);
    }
    return g;
  };
  for (let t = 0; t < 20; t++) {
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(randGrid(1 + R.int(7), 1 + R.int(7), 0.25, 0.15)),
    });
  }
  // very few sources: long spreads and frequent -1
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 's' + String(t + 1).padStart(2, '0') + '_sparse_sources',
      input: build(randGrid(2 + R.int(6), 2 + R.int(6), 0.3, 0.04)),
    });
  }
  // wall-heavy: pockets everywhere
  for (let t = 0; t < 10; t++) {
    T.push({
      name: 'w' + String(t + 1).padStart(2, '0') + '_wall_heavy',
      input: build(randGrid(2 + R.int(6), 2 + R.int(6), 0.6, 0.12)),
    });
  }
  // no walls at all: pure distance
  for (let t = 0; t < 6; t++) {
    T.push({
      name: 'o' + String(t + 1).padStart(2, '0') + '_open_small',
      input: build(randGrid(2 + R.int(6), 2 + R.int(6), 0, 0.15)),
    });
  }

  // --- medium --------------------------------------------------------
  T.push({ name: 'm01_medium', input: build(randGrid(60, 60, 0.25, 0.02)) });
  T.push({ name: 'm02_medium_open', input: build(randGrid(80, 80, 0.02, 0.005)) });

  // --- maximum size --------------------------------------------------
  const N = 1000;
  T.push({ name: 'x01_max_random', input: build(randGrid(N, N, 0.25, 0.001)) });
  T.push({ name: 'x02_max_wall_heavy', input: build(randGrid(N, N, 0.55, 0.01)) });
  {
    // fully open, one source in a corner: answer is 1998, the deepest BFS
    const g = Array.from({ length: N }, () => '.'.repeat(N)).map((s) => s.split(''));
    g[0][0] = 'R';
    T.push({ name: 'x03_max_open_one_corner', input: build(g.map((x) => x.join(''))) });
  }
  {
    // serpentine corridor: forces the longest possible wavefront
    const g = Array.from({ length: N }, () => Array(N).fill('#'));
    for (let i = 0; i < N; i += 2) {
      for (let j = 0; j < N; j++) g[i][j] = '.';
      if (i + 1 < N) g[i + 1][(i / 2) % 2 === 0 ? N - 1 : 0] = '.';
    }
    g[0][0] = 'R';
    T.push({ name: 'x04_max_serpentine', input: build(g.map((x) => x.join(''))) });
  }
  {
    // everyone already knows: answer 0 at full size
    const g = Array.from({ length: N }, () => 'R'.repeat(N));
    T.push({ name: 'x05_max_all_sources', input: build(g) });
  }
  {
    // one sealed cell at full size: -1, and it must still be found
    const g = Array.from({ length: N }, () => Array(N).fill('.'));
    g[0][0] = 'R';
    g[N - 1][N - 2] = '#';
    g[N - 2][N - 1] = '#';
    T.push({ name: 'x06_max_one_sealed_corner', input: build(g.map((x) => x.join(''))) });
  }
  {
    // no source anywhere at full size
    const g = Array.from({ length: N }, () => '.'.repeat(N));
    T.push({ name: 'x07_max_no_source', input: build(g) });
  }
  {
    // solid buildings everywhere: nobody to inform, so 0
    const g = Array.from({ length: N }, () => '#'.repeat(N));
    T.push({ name: 'x08_max_all_walls', input: build(g) });
  }

  return T;
};
