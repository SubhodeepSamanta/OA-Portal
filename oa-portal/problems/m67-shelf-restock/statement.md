# Shelf Restock

A shop has `n` shelves. Shelf `i` currently holds `s[i]` units and can hold at most `c[i]`.

A restock truck arrives with `T` units. Units are indivisible: you may put any whole number of them on any shelf, you do not have to use them all, and no shelf may be pushed past its capacity.

A shelf's **fill ratio** is `stock / capacity`. The manager is judged on the **worst** shelf, so the aim is to make the smallest fill ratio in the shop as large as possible.

## Task

Report the largest achievable value of the smallest fill ratio, **in millionths** — that is, the ratio multiplied by `10^6` and rounded **down** to a whole number.

## Input

```
Line 1:       n  T
Next n lines: s[i]  c[i]
```

## Output

A single integer: the best achievable smallest fill ratio, in millionths.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  T  ≤  10^9
0  ≤  s[i]  ≤  c[i]  ≤  10^9
1  ≤  c[i]
```

## Sample 1

**Input**
```
2 5
0 10
0 10
```

**Output**
```
200000
```

**Explanation**

Two empty shelves of capacity 10 and five units to share. Whichever way you split them one shelf gets at most 2, so the worst ratio is `2/10 = 0.2`, which is **200000** millionths.

Splitting 2 and 3 does not help the worst shelf, and 3 and 3 would need six units.

## Sample 2

**Input**
```
1 0
5 10
```

**Output**
```
500000
```

**Explanation**

Nothing to distribute, so the answer is simply the shelf's current ratio.

## Sample 3

**Input**
```
2 100
0 1
0 1000000000
```

**Output**
```
0
```

**Explanation**

The huge shelf needs a thousand units just to reach one millionth of its capacity, and only 100 are available. The worst ratio stays at 0.

## Sample 4

**Input**
```
3 6
1 4
2 4
0 4
```

**Output**
```
750000
```

**Explanation**

Getting every shelf to `3/4` needs `2 + 1 + 3 = 6` units — exactly the truckload. Anything higher would need a fourth unit somewhere, and `4/4` costs nine units in total.

## Notes

- Do not search for the answer directly. Ask instead: *"can every shelf reach a ratio of at least `r`?"* — a question with a one-pass answer, and one whose answer only ever changes from yes to no as `r` grows. That monotonicity is what lets you binary search.
- Answering it: shelf `i` needs its stock to be at least `r · c[i]`, and stock is a whole number, so it needs `⌈r · c[i]⌉` units — which is more than `r · c[i]` whenever the product is not already whole. Add up the shortfalls and compare with `T`.
- Search over the **millionths** directly, an integer in `[0, 10^6]`, and the ceiling becomes exact integer arithmetic: `⌈m · c / 10^6⌉` is `(m · c + 10^6 − 1) / 10^6` in integer division. Never introduce a floating-point ratio — the boundary cases in Samples 1 and 4 are exactly where it would betray you.
- `m · c` reaches `10^6 × 10^9 = 10^{15}`, and the total shortfall reaches `2 · 10^{14}`, so both need 64-bit. Stop adding once the total passes `T` if you want to be tidy about it.
- A shelf already at or above the target needs nothing — that `max(0, …)` is easy to forget, and without it a well-stocked shelf appears to *consume* units.
