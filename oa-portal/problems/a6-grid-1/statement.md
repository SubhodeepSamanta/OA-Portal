# Grid 1

> **Mirrored from AtCoder — Educational DP Contest, problem H** —
> <https://atcoder.jp/contests/dp/tasks/dp_h>
> Solve it here, then paste the same code into the AtCoder submit box.

There is a grid with `H` rows and `W` columns. Each square is either empty (`.`) or a wall (`#`).

Taro starts at the top-left square `(1, 1)` and wants to reach the bottom-right square `(H, W)`, moving only **right** or **down**, and never onto a wall.

Both `(1, 1)` and `(H, W)` are empty.

## Task

Report the number of distinct paths, **modulo `10^9 + 7`**.

## Input

```
Line 1:       H  W
Next H lines: W characters each, '.' or '#'
```

## Output

A single integer: the number of paths modulo `10^9 + 7`.

## Constraints

```
2  ≤  H, W  ≤  1000
```

## Sample 1

**Input**
```
3 4
...#
.#..
....
```

**Output**
```
3
```

## Sample 2

**Input**
```
5 2
..
#.
..
.#
..
```

**Output**
```
0
```

## Sample 3

**Input**
```
20 20
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
```

**Output**
```
345263555
```

## Notes

- Every path into square `(r, c)` arrives from directly above or directly left, and those two sets of paths are disjoint. So
  `ways[r][c] = ways[r−1][c] + ways[r][c−1]`, and `ways[r][c] = 0` if the square is a wall.
- Base case `ways[1][1] = 1`. Treat out-of-grid neighbours as 0, which the usual guard handles.
- Sample 2 is worth reading before you code: the answer is 0, and a solution that forgets to zero out walls will happily count paths straight through them.
- Sample 3 is a completely open `20 × 20` grid, so the true count is `C(38, 19)` — an enormous number, which is why the answer is taken modulo `10^9 + 7`. **Reduce inside the loop**, not at the end; the raw count overflows any fixed-width integer long before you finish.
- `H × W` reaches `10^6`, so use a flat array indexed `r · W + c`, or two rolling rows. A `vector<vector<long long>>` of that size works but is noticeably slower.
- Read each row as a whole string. Reading character by character is what makes this one time out.
- This is the cleanest possible template for grid DP: fix the traversal order so that everything a square depends on is already computed. Row by row, left to right, does that here because you only ever look up and left.
