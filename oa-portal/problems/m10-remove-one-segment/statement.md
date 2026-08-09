# Remove One Segment

A subscription business tracks its monthly net cash movement for `n` consecutive months. A positive month brought money in; a negative month took money out.

Strategy is reviewing one option: discontinuing a product line. Because the product lines were launched and retired in sequence, discontinuing one always removes a **contiguous run of months** from the books — never a scattered selection. Removing months `l` through `r` deletes exactly those months' movements; the months either side are unaffected and simply close up.

They may remove **at most one** such run. They may also remove nothing, and — if every month was a loss — they may remove the entire history, leaving a book that nets to zero.

## Task

Delete **at most one** contiguous run of months, then report the **maximum achievable total** of the months that remain.

If every month is removed, the remaining total is `0`.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the largest total achievable.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
-10^9  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
5
1 -4 2 -1 3
```

**Output**
```
5
```

**Explanation**

The whole history totals `1 − 4 + 2 − 1 + 3 = 1`.

Removing month 2 alone (the `−4`) leaves `1, 2, −1, 3`, which totals **5**. Removing months 2–4 leaves `1, 3` totalling 4, which is worse. Nothing beats 5.

## Sample 2

**Input**
```
3
-1 -2 -3
```

**Output**
```
0
```

**Explanation**

Every month lost money, so the best move is to remove all three. The remaining book is empty and totals **0**.

## Sample 3

**Input**
```
4
2 3 1 4
```

**Output**
```
10
```

**Explanation**

Every month was profitable, so removing any run only throws value away. The best move is to remove nothing and keep the full total of **10**.

## Notes

- Removing nothing is always allowed, so the answer is never worse than the total of the whole history.
- Removing everything is also allowed, so the answer is never worse than `0`.
- The run must be contiguous. You cannot drop the two worst months if a good month sits between them.
- Trying every run is about `n²/2` possibilities, far too many at the upper limit. Notice what the answer looks like as a function of the run you remove — that reframing is the whole problem.
- Totals reach `2 · 10^14`; a 32-bit integer will overflow.
