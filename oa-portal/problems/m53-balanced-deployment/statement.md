# Balanced Deployment

A release log is a string `s` of length `n` made only of `0`s and `1`s. A `0` is a deployment to staging and a `1` is a deployment to production.

A **window** is any run of consecutive entries. A window is **balanced** when it contains exactly as many `0`s as `1`s.

## Task

Count the balanced windows.

Windows are counted by position, not by content — two windows starting at different places both count, even if they read the same.

## Input

```
Line 1:  s
```

## Output

A single integer: the number of balanced windows.

## Constraints

```
1  ≤  |s|  ≤  2 · 10^5
```

`s` contains only the characters `0` and `1`.

## Sample 1

**Input**
```
0011
```

**Output**
```
2
```

**Explanation**

The balanced windows are `01` (entries 2–3) and `0011` (entries 1–4). The window `00` is not balanced, and neither is `001`.

## Sample 2

**Input**
```
01
```

**Output**
```
1
```

## Sample 3

**Input**
```
000
```

**Output**
```
0
```

**Explanation**

Nothing to balance against.

## Sample 4

**Input**
```
010101
```

**Output**
```
9
```

**Explanation**

Five windows of length 2, three of length 4 and one of length 6.

## Notes

- There are about `2 · 10^{10}` windows at the limit, so they cannot be examined one by one — and the answer itself can be that large, which is your first hint about the return type.
- The move is to stop thinking about windows and start thinking about **boundaries**. Score the log by walking it and keeping a running total that goes up by 1 on a `1` and down by 1 on a `0`. Call the total after `i` entries `P[i]`, with `P[0] = 0`.
- A window covering entries `i+1 … j` is balanced exactly when `P[j] = P[i]`. So the question becomes: how many pairs of positions share the same running total? That is one pass, tallying how often each total has been seen.
- Do not forget `P[0] = 0`, which must be in the tally before you start — it is what lets a balanced window begin at entry 1. Sample 1's `0011` is found only through it.
- The running total ranges over `−n … n`, so it indexes an array of size `2n + 1` directly once you shift by `n`. No hash map is needed, and avoiding one is worth it at this size.
- With `k` positions sharing a total, they contribute `k(k−1)/2` windows. Summing those reaches roughly `10^{10}` for an alternating log, so a 32-bit accumulator overflows — and it overflows *silently*, only on the large tests.
