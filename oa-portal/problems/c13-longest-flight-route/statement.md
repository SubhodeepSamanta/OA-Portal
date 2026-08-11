# Longest Flight Route

> **Mirrored from CSES 1680** — <https://cses.fi/problemset/task/1680>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

You have won a flight ticket and want to travel from city `1` to city `n`, visiting **as many cities as possible** along the way.

There are `m` one-way flights. The flight network contains **no directed cycles**.

## Task

Report the maximum number of cities on such a route, and the route itself.

## Input

```
Line 1:       n  m
Next m lines: a  b     a one-way flight from a to b
```

## Output

The number of cities on the route, then the cities in order.

If city `n` cannot be reached from city `1`, print `IMPOSSIBLE`.

## Constraints

```
2  ≤  n  ≤  100000
1  ≤  m  ≤  200000
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
5 5
1 2
2 5
1 3
3 4
4 5
```

**Output**
```
4
1 3 4 5
```

**Explanation**

Going `1 → 2 → 5` visits 3 cities; `1 → 3 → 4 → 5` visits 4, which is the most.

## Notes

- **Many answers can be accepted.** When several routes tie for the maximum, any of them is correct. This problem is graded by a checker: it confirms your count is the true maximum and that your list really is a route of that length from 1 to `n` along existing flights. That is how CSES grades it.
- Longest path is NP-hard in general graphs — but the "no directed cycles" guarantee changes everything. On a **DAG** you can process cities in topological order, and every predecessor of a city is finished before the city itself.
- Let `best[v]` be the greatest number of cities on a route from 1 to `v`, with `best[1] = 1` and `best[v] = 0` meaning "unreachable". Then in topological order, for each flight `v → w`: if `best[v] > 0` and `best[v] + 1 > best[w]`, set `best[w] = best[v] + 1` and record `from[w] = v`.
- Reconstruct by following `from` back from `n` and reversing. If `best[n] == 0`, print `IMPOSSIBLE`.
- Kahn's algorithm gives the topological order iteratively. A recursive DFS ordering would overflow the stack on a `10^5`-city chain.
- The reachability check matters: a city can be topologically before `n` yet unreachable from 1. Guarding on `best[v] > 0` is what keeps those out — without it you will build routes that start nowhere.
- Counts fit easily in `int` (at most `n`), so no 64-bit types are needed. Buffer the output — the route can be `10^5` numbers.
