# Knapsack 1

> **Mirrored from AtCoder — Educational DP Contest, problem D** —
> <https://atcoder.jp/contests/dp/tasks/dp_d>
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
1  ≤  W     ≤  100000
1  ≤  w[i]  ≤  W
1  ≤  v[i]  ≤  10^9
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

**Explanation**

Items 1 and 3 weigh `3 + 5 = 8` and are worth `30 + 60 = 90`.

## Sample 2

**Input**
```
5 5
1 1000000000
1 1000000000
1 1000000000
1 1000000000
1 1000000000
```

**Output**
```
5000000000
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

- The classic **0/1 knapsack**, indexed by weight. `best[c]` is the greatest value achievable with capacity exactly `c` or less:
  ```
  for each item i:
      for c = W down to w[i]:
          best[c] = max(best[c], best[c - w[i]] + v[i])
  ```
- The inner loop must run **downwards**. Going down means `best[c − w[i]]` still describes the world *before* item `i` was offered, so each item is used at most once. Going up turns this into the unbounded knapsack, where the same item can be taken repeatedly — it compiles, runs, and quietly reports a larger number.
- `O(N·W)` = `10^7`. Comfortable.
- **Sample 2 exists to break 32-bit code.** Five items worth `10^9` each total `5 × 10^9`, well past `2^{31}`. The value array must be 64-bit. The weights fit in `int`; the values do not.
- Note what is *not* bounded here: values reach `10^9`, so indexing the DP by value would need an array of `10^{11}` entries. That is exactly the constraint that flips in *Knapsack 2*, where `W` becomes huge and the values become small — and the state has to flip with it. Do this one first, then look at that one and ask what changed.
- `best` needs `W + 1` entries, all starting at 0 (taking nothing is always allowed).
