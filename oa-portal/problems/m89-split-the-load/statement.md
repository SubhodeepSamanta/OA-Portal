# Split the Load

A scheduler has `n` jobs; job `i` has weight `w[i]`. They are to be divided between two machines — every job to exactly one machine.

Either machine may end up with no jobs at all.

## Task

Report the smallest achievable absolute difference between the two machines' total weights.

## Input

```
Line 1:  n
Line 2:  w[1] w[2] ... w[n]
```

## Output

A single integer: the minimum absolute difference.

## Constraints

```
1  ≤  n  ≤  40
1  ≤  w[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 6 11 5
```

**Output**
```
1
```

**Explanation**

`{11, 1}` totals 12 and `{6, 5}` totals 11. The whole set sums to 23, which is odd, so a difference of 0 is impossible and 1 is best.

## Sample 2

**Input**
```
1
5
```

**Output**
```
5
```

**Explanation**

One machine takes the job and the other stays idle.

## Sample 3

**Input**
```
4
1 1 1 1
```

**Output**
```
0
```

## Sample 4

**Input**
```
2
1 1000000000
```

**Output**
```
999999999
```

## Notes

- Read the bound carefully: `n ≤ 40`. That is deliberately between the two sizes you already know how to attack, and it rules both out.
  - Enumerating subsets is `2^{40}`, about `10^{12}` — too many.
  - The subset-sum table used when weights are small is `O(n · Σw)`, and `Σw` reaches `4 · 10^{10}` here — far too wide.
- What fits between them is **meet in the middle**. Split the jobs into two halves of about 20. Enumerate every subset sum of each half — `2^{20}` is only a million per side.
- Then every split of the whole set is one subset from the left plus one from the right. Fixing the left part's sum `x`, you want the right part's sum as close as possible to `(total − 2x) / 2` — so sort one side's sums and binary search the other against it.
- Total work is about `2^{20} · 20` for the sorting and searching, comfortably fast.
- Watch the arithmetic: `Σw` reaches `4 · 10^{10}` and the quantity you minimise is `|total − 2·chosen|`, so everything must be 64-bit. A 32-bit accumulator overflows around `n = 5` at maximum weights.
- Empty parts are allowed, which matters when `n = 1` — the answer is then the single weight, not 0.
