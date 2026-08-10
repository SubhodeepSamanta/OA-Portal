# Campus Shuttle Route

A campus shuttle serves `n` stops, numbered `1` through `n`, and is garaged at a depot numbered `0`.

You are given the distance `dist[i][j]` from location `i` to location `j` for every pair. **Distances are not necessarily the same in both directions** — one-way roads and a hill mean `dist[i][j]` and `dist[j][i]` can differ. `dist[i][i]` is `0`.

The shuttle leaves the depot, visits **every stop exactly once**, and returns to the depot.

## Task

Report the minimum total distance of such a round trip.

## Input

```
Line 1:        n
Next n+1 rows: n+1 integers each, row i being dist[i][0] ... dist[i][n]
```

Rows and columns are indexed `0 … n`, with `0` the depot.

## Output

A single integer: the minimum round-trip distance.

## Constraints

```
1  ≤  n  ≤  15
0  ≤  dist[i][j]  ≤  10^6
```

## Sample 1

**Input**
```
3
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0
```

**Output**
```
80
```

**Explanation**

The route `0 → 1 → 3 → 2 → 0` costs `10 + 25 + 30 + 15 = 80`. Its mirror image `0 → 2 → 3 → 1 → 0` costs the same, since this particular table happens to be symmetric. Every other order costs 95.

## Sample 2

**Input**
```
1
0 7
7 0
```

**Output**
```
14
```

**Explanation**

Out to the single stop and back.

## Sample 3

**Input**
```
2
0 1 100
100 0 1
1 100 0
```

**Output**
```
3
```

**Explanation**

Going `0 → 1 → 2 → 0` costs `1 + 1 + 1 = 3`. Going the other way round costs `100 + 100 + 100 = 300`.

Direction matters. A solution that assumes `dist[i][j] == dist[j][i]` gets 3 here by luck and fails elsewhere — it is worth checking whether yours ever reads the table backwards.

## Notes

- Trying every order is `15!`, about `1.3 · 10^{12}`. Not viable, so `n ≤ 15` is a hint rather than a mercy.
- The saving is that two partial routes covering the **same set of stops** and **ending at the same stop** are interchangeable from here on — whatever is best to do next depends only on those two facts, never on the order the set was visited in. That collapses `15!` orders into `2^{15} × 15` situations.
- So carry exactly that pair as your state, and grow it one stop at a time. About `2^{15} × 15 × 15 ≈ 7 · 10^6` steps.
- Finish the loop properly. A state that has covered every stop still owes the leg back to the depot, and that leg is `dist[last][0]` — not `dist[0][last]`.
- With `n = 1` there is only one route, and it uses two different table entries.
- The total stays under `16 × 10^6`, so this is not an overflow problem — but initialise unreachable states to something you cannot accidentally add into an answer.
