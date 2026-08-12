# Knapsack 2

> **Mirrored from AtCoder — Educational DP Contest, problem E** —
> <https://atcoder.jp/contests/dp/tasks/dp_e>
> Solve it here, then paste the same code into the AtCoder submit box.

There are `N` items. Item `i` has weight `w[i]` and value `v[i]`.

Choose some of them with total weight at most `W`, taking each item at most once.

## Task

Report the maximum total value.

## Input

```
Line 1:       N  W
Next N lines: w[i]  v[i]
```

## Output

A single integer: the maximum total value.

## Constraints

```
1  ≤  N     ≤  100
1  ≤  W     ≤  10^9
1  ≤  w[i]  ≤  W
1  ≤  v[i]  ≤  1000
```

## Sample 1

**Input**
```
3 8
3 30
4 50
5 60
```

**Output**
```
90
```

## Sample 2

**Input**
```
1 1000000000
1000000000 10
```

**Output**
```
10
```

## Sample 3

**Input**
```
6 15
6 5
5 6
6 4
6 6
3 5
7 2
```

**Output**
```
17
```

## Notes

- **This is the same problem as *Knapsack 1*.** The statement is word-for-word identical. Only the constraints moved:

  | | Knapsack 1 | Knapsack 2 |
  |---|---|---|
  | `W` | `10^5` | **`10^9`** |
  | `v[i]` | `10^9` | **`10^3`** |

- The weight-indexed table from *Knapsack 1* needs `W + 1` entries. At `W = 10^9` that is 8 GB. It is not slow — it is impossible. **The state has to flip.**
- What is small now is the **total value**: at most `100 × 1000 = 10^5`. So index by value instead and store weight:
  `minWeight[val]` = the least total weight that achieves exactly `val`.
  ```
  minWeight[0] = 0, everything else = infinity
  for each item i:
      for val = V down to v[i]:
          minWeight[val] = min(minWeight[val], minWeight[val - v[i]] + w[i])
  ```
  The answer is the largest `val` whose `minWeight[val] ≤ W`.
- Same downward loop, same 0/1 discipline — only the axis changed. Doing these two problems back to back is the single most useful hour in the whole DP set, because the lesson is not "knapsack" but **read the constraints to choose the state**.
- Use a large sentinel for infinity that will not overflow when you add `w[i]` to it — `4e18` is too close to the edge; something like `2e18`, or guard with `if (minWeight[val - v[i]] == INF) continue;`.
- Weights sum to at most `100 × 10^9 = 10^{11}`, so weights are 64-bit. Values fit comfortably in `int`.
- `O(N · Σv)` = `10^7`.
