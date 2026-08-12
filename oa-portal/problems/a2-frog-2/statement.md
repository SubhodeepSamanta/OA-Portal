# Frog 2

> **Mirrored from AtCoder — Educational DP Contest, problem B** —
> <https://atcoder.jp/contests/dp/tasks/dp_b>
> Solve it here, then paste the same code into the AtCoder submit box.

There are `N` stones, numbered `1` to `N`. Stone `i` has height `h[i]`.

A frog starts on stone 1. From stone `i` it may jump to any of stones `i+1, i+2, …, i+K`, and a jump to stone `j` costs `|h[i] − h[j]|`.

## Task

Report the minimum total cost to reach stone `N`.

## Input

```
Line 1:  N  K
Line 2:  h[1] h[2] ... h[N]
```

## Output

A single integer: the minimum total cost.

## Constraints

```
2  ≤  N     ≤  100000
1  ≤  K     ≤  100
1  ≤  h[i]  ≤  10000
```

## Sample 1

**Input**
```
5 3
10 30 40 50 20
```

**Output**
```
30
```

**Explanation**

`1 → 2 → 5`: `|10−30| + |30−20| = 30`.

## Sample 2

**Input**
```
3 1
10 20 10
```

**Output**
```
20
```

## Sample 3

**Input**
```
2 100
10 10
```

**Output**
```
0
```

## Sample 4

**Input**
```
10 4
40 10 20 70 80 10 20 70 80 60
```

**Output**
```
40
```

## Notes

- This is *Frog 1* with the jump range widened from a fixed 2 to a parameter `K`. Doing them back to back is the point: the recurrence does not change shape, only how many predecessors it looks at.
  `cost[i] = min over j in [i−K, i−1] of ( cost[j] + |h[i] − h[j]| )`
- **Read the constraints before choosing the loop.** `K ≤ 100`, so `O(N·K)` is `10^7` — completely fine. If `K` could reach `N` this would be `10^{10}` and you would need a different idea entirely (and the `|h[i] − h[j]|` term makes that genuinely hard, which is why the setter capped `K`).
- Guard the lower end: `j` must stay at least 1. Writing `for (j = i-K; j < i; j++)` without clamping reads before the array.
- Sample 3 is there to catch the other boundary: `K = 100` with only 2 stones. The frog can jump straight to the end, and the loop must not run past `N`.
- `O(N·K)` time, `O(N)` memory. The total stays under `10^9`, but use 64-bit anyway.
- Once this one is written, the honest question to ask is what *else* changing `K` would break — that instinct is what the next problem in the set (Knapsack 1 versus Knapsack 2) is built to train.
