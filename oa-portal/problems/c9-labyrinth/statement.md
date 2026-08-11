# Labyrinth

> **Mirrored from CSES 1193** — <https://cses.fi/problemset/task/1193>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

You are given a map of a labyrinth with `n` rows and `m` columns. Each square is one of:

```
.   floor
#   wall
A   your starting square
B   the exit
```

There is exactly one `A` and exactly one `B`. You may move one square at a time, up, down, left or right, and you may not enter a wall or leave the grid.

## Task

Decide whether you can reach `B` from `A`. If you can, give a **shortest** route.

## Input

```
Line 1:       n  m
Next n lines: m characters each
```

## Output

If no route exists, print a single line:

```
NO
```

Otherwise print three lines: `YES`, the length of a shortest route, and the route itself as a string of moves, using `L`, `R`, `U`, `D` for left, right, up and down.

## Constraints

```
1  ≤  n, m  ≤  1000
```

## Sample 1

**Input**
```
5 8
########
#.A#...#
#.##.#B#
#......#
########
```

**Output**
```
YES
9
LDDRRRRRU
```

## Notes

- **Many answers are accepted.** There is usually more than one shortest route, and any of them is correct. This problem is graded by a checker: it confirms your `YES`/`NO` matches, that your stated length is the true shortest distance, and that your move string actually walks from `A` to `B` without hitting a wall or leaving the grid. That is how CSES grades it too.
- Every move costs the same, so **BFS** gives shortest distances directly. Dijkstra would also work but is needless here; a plain DFS would not — it finds *a* route, not a shortest one.
- To recover the route, store for each square the square you came from, or just the single character of the move that got you there. Walk back from `B` to `A` and reverse. Storing the move character is cheaper and simpler than storing coordinates.
- Sizing matters: `1000 × 1000` is `10^6` squares. Use a flat array of size `n·m` and index it as `r·m + c`, rather than a `vector<vector<>>`. A `queue<pair<int,int>>` will work but a plain `vector<int>` used as a queue with a head index is noticeably faster.
- Do not run a recursive flood fill — a `10^6`-square open grid gives a recursion depth that will overflow the stack.
- Read the grid rows as whole strings. Reading character by character with `cin >> char` in a loop is what makes this one time out.
- Watch the direction letters: moving to the row **below** is `D`, and rows are usually stored with row 0 at the top. Getting `U` and `D` backwards produces a route of the right length that walks into walls — the checker will tell you exactly which move went wrong.
