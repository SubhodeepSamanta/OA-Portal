# Frog 1

> **Mirrored from AtCoder — Educational DP Contest, problem A** —
> <https://atcoder.jp/contests/dp/tasks/dp_a>
> Solve it here, then paste the same code into the AtCoder submit box.

There are `N` stones, numbered `1` to `N`. Stone `i` has height `h[i]`.

A frog starts on stone 1. From stone `i` it may jump to stone `i+1` or `i+2`, and a jump to stone `j` costs `|h[i] − h[j]|`.

## Task

Report the minimum total cost to reach stone `N`.

## Input

```
Line 1:  N
Line 2:  h[1] h[2] ... h[N]
```

## Output

A single integer: the minimum total cost.

## Constraints

```
2  ≤  N     ≤  100000
1  ≤  h[i]  ≤  10000
```

## Sample 1

**Input**
```
4
10 30 40 20
```

**Output**
```
30
```

**Explanation**

Jump `1 → 2 → 4`: `|10−30| + |30−20| = 20 + 10 = 30`.

## Sample 2

**Input**
```
2
10 10
```

**Output**
```
0
```

## Sample 3

**Input**
```
6
30 10 60 10 60 50
```

**Output**
```
40
```

**Explanation**

`1 → 3 → 5 → 6`: `|30−60| + |60−60| + |60−50| = 30 + 0 + 10 = 40`.

## Notes

- This is the smallest possible dynamic programming problem, and it is worth doing precisely because the shape is so clean — everything harder is this with more state.
- Let `cost[i]` be the cheapest way to reach stone `i`. The frog arrived from either `i−1` or `i−2`, so
  `cost[i] = min(cost[i−1] + |h[i] − h[i−1]|, cost[i−2] + |h[i] − h[i−2]|)`.
- Base cases: `cost[1] = 0`, and `cost[2] = |h[2] − h[1]|` (only one way to get there).
- **Greedy fails here**, and it is worth seeing why before writing anything. Always taking the cheaper *next* jump gets sample 3 wrong: from stone 1 the cheaper single jump is to stone 2 (cost 20 versus 30), but the optimal route goes to stone 3. A locally cheap step can strand you somewhere expensive — which is exactly the condition that says "use DP, not greedy".
- `O(N)` time and `O(N)` memory. You only ever look two steps back, so two variables suffice if you want `O(1)` memory.
- The total stays under `10^5 × 10^4 = 10^9`, which fits in a 32-bit int — but use 64-bit anyway; it costs nothing and the sibling problems do need it.
