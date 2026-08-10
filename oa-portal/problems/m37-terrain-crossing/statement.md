# Terrain Crossing

A survey team has an `r × c` grid of ground heights. They must walk from the **top-left** cell to the **bottom-right** cell, and at each step may move only one cell **right** or one cell **down**.

What tires them out is not the distance — it is the single worst step. The **strain** of a route is the largest absolute height difference between any two consecutive cells on it. A route that climbs gently the whole way is easy even if it is long; one gentle route with a single cliff in it is not.

## Task

Report the smallest possible strain of a route from the top-left corner to the bottom-right corner.

## Input

```
Line 1:      r  c
Next r rows: c integers, the heights of that row
```

## Output

A single integer: the minimum strain.

## Constraints

```
1  ≤  r, c  ≤  500
0  ≤  height  ≤  10^9
```

## Sample 1

**Input**
```
3 3
1 2 3
4 5 6
7 8 9
```

**Output**
```
3
```

**Explanation**

Stepping right always changes the height by 1; stepping down always changes it by 3. Any route from the top-left to the bottom-right must step down twice, so some step of size 3 is unavoidable — and taking both downs is fine, since nothing worse ever appears. The answer is **3**.

## Sample 2

**Input**
```
2 3
1 2 3
100 4 5
```

**Output**
```
2
```

**Explanation**

Going down first is disastrous: `1 → 100` is a strain of 99. Staying on the top row and dropping later gives, for instance, `1 → 2 → 3 → 5`, whose worst step is `3 → 5`, a strain of **2**.

Note that the total climbed is much larger on the good route. Total does not matter here.

## Sample 3

**Input**
```
1 1
5
```

**Output**
```
0
```

**Explanation**

You start where you finish. There are no steps at all, so there is no worst step — the strain is **0**.

## Sample 4

**Input**
```
1 4
1 10 11 12
```

**Output**
```
9
```

**Explanation**

A single row leaves no choice, so you take the cliff whether you like it or not.

## Notes

- The usual grid recurrence adds costs up. This one does not — the cost of a route is a **maximum**, so the quantity to carry is "the worst step so far", and extending a route replaces that with `max(worst so far, this step)`.
- That still behaves well, because you can only move right and down: every cell's best value depends only on cells above and to the left, which you have already finished. Sweep the grid once in reading order.
- Do not be tempted to minimise the *total* climb and hope the worst step comes out small. Sample 2 is built to punish exactly that: the winning route has the larger total.
- There is a second, completely different route to the answer worth knowing, because it generalises to grids where you may move in all four directions: guess a strain limit `L`, delete every step bigger than `L`, and ask whether the corner is still reachable. Reachability moves in one direction as `L` grows, so you can search for the smallest workable `L`.
- Heights reach `10^9` but they are never summed, so the answer fits comfortably in 32 bits. Differences do not overflow either — just do not compute them as an unsigned subtraction.
- `r = 1` or `c = 1` leaves a single forced route, and `1 × 1` has no steps at all.
