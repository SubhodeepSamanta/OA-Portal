# Sensor Calibration

A calibration rig produces `n` readings, `a[1] … a[n]`, in order. A correctly calibrated rig produces readings that are **strictly increasing**.

One **operation** picks any single position and overwrites its reading with any integer you like — positive, zero or negative, and as large or small as you please. Positions you do not touch keep their original values, in their original places.

## Task

Report the fewest operations needed to make the whole sequence strictly increasing.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the minimum number of operations.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
5
1 2 3 4 5
```

**Output**
```
0
```

## Sample 2

**Input**
```
5
5 4 3 2 1
```

**Output**
```
4
```

**Explanation**

No two readings can both survive: any pair you keep is in the wrong order. So one reading stays and the other four are rewritten.

## Sample 3

**Input**
```
1
7
```

**Output**
```
0
```

## Sample 4

**Input**
```
6
1 5 2 4 3 6
```

**Output**
```
3
```

**Explanation**

Keep readings 1, 4 and 6 — that is `a[1] = 1`, `a[4] = 4` and `a[6] = 6`. The gaps can be filled: positions 2 and 3 become `2` and `3`, and position 5 becomes `5`, giving `1 2 3 4 5 6`. Three positions rewritten.

You cannot keep four. Keeping `1, 5` blocks everything after it, and `1, 2, 3` — at positions 1, 3 and 5 — leaves only position 6, which is already counted.

## Notes

- Turn it round: minimising rewrites is maximising how many readings you **keep**. The answer is `n` minus the largest keepable set.
- So, which sets are keepable? Suppose you keep positions `i < j` with values `a[i]` and `a[j]`. Between them sit `j − i − 1` positions that must be filled with **integers strictly between** them, all distinct and increasing. There is room for that exactly when `a[j] − a[i] ≥ j − i`.
- Rearranged, that condition is `a[j] − j ≥ a[i] − i`. So subtract the index from every reading, and a set of positions is keepable precisely when the transformed values are **non-decreasing** along it. Before and after the kept positions there is no constraint at all, since you may use arbitrarily small or large integers.
- That is the whole reduction: the answer is `n` minus the length of the longest non-decreasing subsequence of `b[i] = a[i] − i`.
- Note it is **non-decreasing**, not strictly increasing — two positions with the same `b` are compatible, meaning they are exactly `j − i` apart in value. Using a strict search here is the classic off-by-one and it silently gives answers that are too large.
- An `O(n²)` subsequence search will not survive `2 · 10^5`. The usual patience-sorting trick — keep the smallest possible tail for each achievable length and binary-search where the next value lands — is `O(n log n)`.
- `b[i] = a[i] − i` can be negative even though `a[i]` is positive. That is expected and fine.
