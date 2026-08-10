'use strict';
// Test generator - m70 / Q165 Layer Composite
// Small cases keep coordinates tiny: brute.cpp marks an actual pixel grid.
module.exports = function (R) {
  const T = [];
  const build = (rects) => `${rects.length}\n` + rects.map((r) => r.join(' ')).join('\n') + '\n';

  const rnd = (span) => {
    const x1 = R.int(2 * span + 1) - span;
    const y1 = R.int(2 * span + 1) - span;
    return [x1, y1, x1 + 1 + R.int(span), y1 + 1 + R.int(span)];
  };

  // --- edge cases ---------------------------------------------------
  T.push({ name: 'e01_corner_overlap', input: build([[0, 0, 10, 10], [5, 5, 15, 15]]) });
  T.push({ name: 'e02_single_layer', input: build([[0, 0, 4, 5]]) });
  T.push({ name: 'e03_exactly_covered', input: build([[0, 0, 10, 10], [0, 0, 10, 10]]) });
  T.push({ name: 'e04_two_small_under', input: build([[0, 0, 2, 2], [5, 5, 7, 7], [0, 0, 10, 10]]) });
  T.push({ name: 'e05_no_overlap_at_all', input: build([[0, 0, 3, 3], [20, 20, 25, 25]]) });
  T.push({ name: 'e06_lower_bigger', input: build([[0, 0, 20, 20], [5, 5, 10, 10]]) });
  T.push({ name: 'e07_overlapping_lowers', input: build([[0, 0, 6, 6], [3, 3, 9, 9], [0, 0, 10, 10]]) });
  T.push({ name: 'e08_touching_not_overlapping', input: build([[0, 0, 5, 5], [5, 0, 10, 5]]) });
  T.push({ name: 'e09_negative_coords', input: build([[-5, -5, 0, 0], [-3, -3, 3, 3]]) });
  T.push({ name: 'e10_one_pixel', input: build([[0, 0, 1, 1]]) });
  T.push({ name: 'e11_one_pixel_covered', input: build([[0, 0, 1, 1], [0, 0, 1, 1]]) });
  T.push({ name: 'e12_stripes', input: build([[0, 0, 10, 2], [0, 4, 10, 6], [0, 0, 10, 10]]) });

  // --- small randoms (grid brute) ------------------------------------
  for (let t = 0; t < 22; t++) {
    const n = 1 + R.int(6);
    T.push({
      name: 'r' + String(t + 1).padStart(2, '0') + '_random_small',
      input: build(Array.from({ length: n }, () => rnd(8))),
    });
  }
  // lower layers deliberately overlapping each other inside the top one
  for (let t = 0; t < 12; t++) {
    const rects = [];
    for (let i = 0; i < 2 + R.int(5); i++) {
      const x1 = R.int(8), y1 = R.int(8);
      rects.push([x1, y1, x1 + 1 + R.int(8), y1 + 1 + R.int(8)]);
    }
    rects.push([0, 0, 12, 12]);
    T.push({ name: 'o' + String(t + 1).padStart(2, '0') + '_overlapping_lowers', input: build(rects) });
  }
  // top layer small, lowers large
  for (let t = 0; t < 10; t++) {
    const rects = Array.from({ length: 1 + R.int(4) }, () => rnd(10));
    const x1 = R.int(6), y1 = R.int(6);
    rects.push([x1, y1, x1 + 1 + R.int(4), y1 + 1 + R.int(4)]);
    T.push({ name: 's' + String(t + 1).padStart(2, '0') + '_small_top', input: build(rects) });
  }

  // --- medium --------------------------------------------------------
  {
    const rects = Array.from({ length: 3000 }, () => {
      const x1 = R.int(2000), y1 = R.int(2000);
      return [x1, y1, x1 + 1 + R.int(300), y1 + 1 + R.int(300)];
    });
    rects.push([0, 0, 2000, 2000]);
    T.push({ name: 'z01_medium', input: build(rects) });
  }

  // --- maximum size --------------------------------------------------
  const N = 200000;
  {
    const rects = Array.from({ length: N - 1 }, () => {
      const x1 = R.int(1000000000) - 500000000, y1 = R.int(1000000000) - 500000000;
      return [x1, y1, x1 + 1 + R.int(1000000), y1 + 1 + R.int(1000000)];
    });
    rects.push([-1000000000, -1000000000, 1000000000, 1000000000]);
    T.push({ name: 'x01_max_random', input: build(rects) });
  }
  {
    // the top layer spans the whole plane: the answer approaches 4*10^18
    const rects = [[0, 0, 1, 1], [-1000000000, -1000000000, 1000000000, 1000000000]];
    T.push({ name: 'x02_max_overflow_bait', input: build(rects) });
  }
  {
    // every lower layer identical to the top: nothing survives
    const rects = Array.from({ length: N }, () => [0, 0, 1000000000, 1000000000]);
    T.push({ name: 'x03_max_all_identical', input: build(rects) });
  }
  {
    // lower layers entirely elsewhere: the whole top layer survives
    const rects = Array.from({ length: N - 1 }, (_, i) => [-1000000000, -1000000000, -999999999, -999999998]);
    rects.push([0, 0, 1000000, 1000000]);
    T.push({ name: 'x04_max_no_overlap', input: build(rects) });
  }
  {
    // a dense grid of small tiles under a big top layer
    const rects = [];
    const side = 400;
    for (let i = 0; i < side && rects.length < N - 1; i++)
      for (let j = 0; j < side && rects.length < N - 1; j++)
        rects.push([i * 3, j * 3, i * 3 + 2, j * 3 + 2]);
    rects.push([0, 0, side * 3, side * 3]);
    T.push({ name: 'x05_max_tiled', input: build(rects) });
  }
  {
    // heavily nested lower layers, all overlapping each other
    const rects = Array.from({ length: N - 1 }, (_, i) => [i, i, 200000 + i, 200000 + i]);
    rects.push([0, 0, 400000, 400000]);
    T.push({ name: 'x06_max_nested', input: build(rects) });
  }
  {
    // long thin horizontal stripes
    const rects = Array.from({ length: N - 1 }, (_, i) => [0, 2 * i, 1000000, 2 * i + 1]);
    rects.push([0, 0, 1000000, 400000]);
    T.push({ name: 'x07_max_stripes', input: build(rects) });
  }

  return T;
};
