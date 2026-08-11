# Removing Digits

> **Mirrored from CSES 1637** — <https://cses.fi/problemset/task/1637>
> Solve it here, then paste the same code into the CSES submit box.

You are given an integer `n`. On each step you may subtract **one of the digits that appears in the current number**.

## Task

Report the minimum number of steps to reduce `n` to 0.

## Input

```
Line 1:  n
```

## Output

A single integer: the minimum number of steps.

## Constraints

```
1  ≤  n  ≤  1000000
```

## Sample 1

**Input**
```
27
```

**Output**
```
5
```

**Explanation**

`27 → 20 → 18 → 10 → 9 → 0`, subtracting 7, 2, 8, 1 and 9 in turn.

## Notes

- The greedy "always subtract the largest digit" is *not* obviously correct, and reaching for it without checking is the trap. (It happens to work for this problem, but you should not rely on a fact you cannot justify under exam pressure — and the version below costs nothing extra.)
- Let `steps[v]` be the fewest steps to take `v` down to 0. Then
  `steps[v] = 1 + min over each non-zero digit d of v of steps[v − d]`,
  with `steps[0] = 0`. Every `v − d` is strictly smaller than `v`, so a single forward loop `v = 1 … n` fills the table with no recursion at all.
- Skip digit `0` — subtracting it makes no progress and would loop forever.
- Another way to see it: this is a **shortest path** on the integers `0..n`, where each value has an edge to `v − d` for each of its digits. All edges cost 1, so BFS also solves it. The DP is the same search written as a loop.
- `O(7n)` time (at most seven digits per value) and `O(n)` memory — a `10^6` int array is 4 MB.
- Extracting digits with `%10` and `/10` inside the loop is fine; `to_string` per value would be `10^6` allocations and is what makes this one time out.
- No overflow risk anywhere: the answer is small (well under 100).
