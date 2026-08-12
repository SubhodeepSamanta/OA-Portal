# Vacation

> **Mirrored from AtCoder — Educational DP Contest, problem C** —
> <https://atcoder.jp/contests/dp/tasks/dp_c>
> Solve it here, then paste the same code into the AtCoder submit box.

Taro's summer vacation lasts `N` days. On day `i` he must choose exactly one of three activities:

- **A**: swim, gaining `a[i]` happiness
- **B**: catch bugs, gaining `b[i]` happiness
- **C**: do homework, gaining `c[i]` happiness

He will not do the **same** activity on two consecutive days.

## Task

Report the maximum total happiness.

## Input

```
Line 1:       N
Next N lines: a[i]  b[i]  c[i]
```

## Output

A single integer: the maximum total happiness.

## Constraints

```
1  ≤  N              ≤  100000
1  ≤  a[i], b[i], c[i]  ≤  10000
```

## Sample 1

**Input**
```
3
10 40 70
20 50 80
30 60 90
```

**Output**
```
210
```

**Explanation**

Choose C, B, C: `70 + 50 + 90 = 210`.

## Sample 2

**Input**
```
1
100 10 1
```

**Output**
```
100
```

## Sample 3

**Input**
```
7
6 7 8
8 8 3
2 5 2
7 8 6
4 6 8
2 3 4
7 5 1
```

**Output**
```
46
```

## Notes

- The greedy "take the biggest each day" breaks the moment the same activity is best twice running — which sample 1 is built to show: the largest values are `70, 80, 90`, all in column C, and taking all three is illegal.
- The fix is to carry **which activity you took yesterday** as part of the state. Let `best[i][t]` be the most happiness through day `i` when day `i` used activity `t`:
  ```
  best[i][A] = a[i] + max(best[i-1][B], best[i-1][C])
  best[i][B] = b[i] + max(best[i-1][A], best[i-1][C])
  best[i][C] = c[i] + max(best[i-1][A], best[i-1][B])
  ```
  The answer is the largest of the three on day `N`.
- That is the whole idea, and it generalises: when a choice is constrained by the *previous* choice, make the previous choice part of the state. Three activities means three states; the cost is `O(3N)`.
- Only the previous day matters, so three rolling variables give `O(1)` memory. Keeping the full `N × 3` table is fine too at these limits.
- Base case is day 1: `best[1][A] = a[1]`, and so on. There is no "yesterday" to exclude.
- The total reaches `10^5 × 10^4 = 10^9`, which fits a 32-bit int with almost nothing to spare. Use 64-bit.
- `N = 1` is a valid input — the answer is just the largest of the three values.
