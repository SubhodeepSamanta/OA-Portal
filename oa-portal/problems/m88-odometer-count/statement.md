# Odometer Count

A test rig logs odometer readings. A reading is **clean** when no two adjacent digits are the same — `121` is clean, `122` is not.

Leading zeros are not part of a reading: `101` has digits `1, 0, 1`, and that is all.

## Task

Count the clean readings in `[L, R]`.

## Input

```
Line 1:  L  R
```

## Output

A single integer: how many readings in `[L, R]` are clean.

## Constraints

```
1  ≤  L  ≤  R  ≤  10^18
```

## Sample 1

**Input**
```
1 100
```

**Output**
```
90
```

**Explanation**

All nine single digits are clean. Of the two-digit readings, the first digit has 9 choices and the second has 9 (anything but the first), so 81. And 100 has adjacent zeros, so it is not clean. That is `9 + 81 = 90`.

## Sample 2

**Input**
```
11 11
```

**Output**
```
0
```

## Sample 3

**Input**
```
1 10
```

**Output**
```
10
```

**Explanation**

Nine single digits plus 10 itself.

## Sample 4

**Input**
```
100 110
```

**Output**
```
9
```

**Explanation**

Only `101` through `109` are clean. `100` repeats a zero and `110` repeats a one.

## Notes

- `R` reaches `10^18`, so counting one at a time is impossible. But cleanliness depends only on adjacent digit pairs, and there are at most 19 digits.
- Count up to a bound and subtract: `answer(L, R) = count(R) − count(L − 1)`. That halves the thinking, and `L ≥ 1` means `L − 1` is never negative.
- To count up to a bound, build the number digit by digit from the most significant end, carrying three things: how many positions remain, **the digit you just placed**, and whether the prefix so far still matches the bound exactly. While it matches, the next digit is capped; once you drop below, the remaining digits are free.
- The one extra piece here is **leading zeros**. A number shorter than the bound is built by placing zeros first, and those zeros are not really digits — two of them in a row must not disqualify the number. Carry a "have I started yet" flag, and while it is false, no adjacency check applies.
- Getting that flag wrong is the whole difficulty: without it, every number shorter than the bound with two leading zeros silently vanishes from the count.
- The state count is tiny — 19 positions by 11 previous digits by 2 by 2 — so memoise and the answer comes out in a few thousand steps.
- Counts reach `10^{18}`, so use 64-bit. No modulus here: the exact count is wanted.
