# Road Reparation

> **Mirrored from CSES 1675** — <https://cses.fi/problemset/task/1675>
> Solve it here, then paste the same code into the CSES submit box.

There are `n` cities and `m` roads between them. Each road has a repair cost.

Repair a set of roads so that there is a route between every pair of cities, spending as little as possible.

## Input

```
Line 1:       n  m
Next m lines: a  b  c     a two-way road between a and b costing c to repair
```

## Output

A single integer: the minimum total cost.

If it is impossible to connect all the cities, print `IMPOSSIBLE`.

## Constraints

```
1  ≤  n     ≤  100000
1  ≤  m     ≤  200000
1  ≤  a, b  ≤  n
1  ≤  c     ≤  10^9
```

## Sample 1

**Input**
```
5 6
1 2 3
2 3 5
2 4 2
3 4 8
5 1 7
5 4 4
```

**Output**
```
14
```

**Explanation**

Repairing roads `2–4` (2), `1–2` (3), `5–4` (4) and `2–3` (5) connects everything for `14`.

## Notes

- This is a **minimum spanning tree**. The cheapest way to connect `n` cities always uses exactly `n − 1` roads and never contains a cycle.
- **Kruskal's algorithm** is the natural fit here because the input is already an edge list:
  1. Sort all roads by cost, cheapest first.
  2. Walk the sorted list; take a road only if its two cities are not already connected.
  3. Track connectivity with a **Union-Find (DSU)** structure.
  4. Stop once `n − 1` roads have been taken.
- If you finish the list with fewer than `n − 1` roads taken, the graph was disconnected → `IMPOSSIBLE`.
- Prim's algorithm with a priority queue also works and is better on dense graphs. Here `m ≤ 2·10^5` is sparse, and Kruskal is shorter to write correctly.
- **Overflow.** Up to `10^5 − 1` roads at `10^9` each gives a total near `10^{14}`. The accumulator must be 64-bit. The individual costs fit in `int`, which is exactly what makes this easy to get wrong — the sum is the problem, not the values.
- Use path compression **and** union by size or rank. With only one of them, a worst-case chain of unions degrades to `O(n)` per find.
- `n = 1` is a valid input: zero roads are needed and the answer is `0`, not `IMPOSSIBLE`. Check that your "took `n − 1` roads" condition handles it.
- Sorting `2·10^5` edges dominates the runtime at `O(m log m)`.
