# Fair Split

An estate is to be divided between two heirs. There are `n` items, item `i` worth `a[i]`.

Every item goes to exactly one heir, and **both heirs must receive at least one item**. The items need not be split into contiguous runs — any assignment is allowed.

## Task

Report the smallest possible absolute difference between the two heirs' totals.

If no valid division exists, report `-1`.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the minimum possible difference, or `-1`.

## Constraints

```
1  ≤  n  ≤  100
1  ≤  a[i]  ≤  1000
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

The total is 23, which is odd, so the two shares can never be equal. `{11, 1}` is 12 and `{6, 5}` is 11 — a difference of **1**, and you cannot do better than 1 on an odd total.

## Sample 2

**Input**
```
2
1 1
```

**Output**
```
0
```

## Sample 3

**Input**
```
1
5
```

**Output**
```
-1
```

**Explanation**

One item cannot be split so that both heirs receive something. This is the only shape of input with no answer.

## Sample 4

**Input**
```
3
1 2 3
```

**Output**
```
0
```

**Explanation**

`{3}` against `{1, 2}`. A greedy that hands each item to whichever heir is currently behind would give `3` to one, then `2` to the other, then `1` to the second — ending 3 against 3 here, but that rule fails on other inputs, so do not trust it.

## Notes

- Sorting and dealing items out to whoever is behind is the natural guess and it is wrong. Try `8 7 6 5 4` with it: it ends 17 against 13, a difference of 4, when `{8,7}` against `{6,5,4}` splits the estate exactly.
- Reframe it. Once one heir's total is fixed at `x`, the other's is `total − x`, so the difference is `|total − 2x|`. Minimising that means finding the achievable `x` closest to `total / 2` — you never need to think about two piles at once.
- "Which totals are achievable by some subset" is a yes/no question per value, and `total` is at most `100 × 1000 = 100000`. So sweep the items once, marking off every total that becomes reachable.
- The non-empty condition needs a moment's thought and then turns out to be free: every value is at least `1`, so the only subset summing to `0` is the empty one, and the only one summing to `total` is everything. Ignore those two values and every remaining achievable total is a legal split.
- `n = 1` is the sole `-1`. Handle it before the sweep or it will quietly report `a[1]`.
- Nothing here overflows; the whole point of the small bounds is that the reachable totals fit in an array.
