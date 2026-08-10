# Flight Discount Desk

An airline serves `n` cities, numbered `1` through `n`, with `m` **one-way** flights. Flight `i` goes from `u` to `v` and costs `c` rupees. A flight only runs in the direction listed.

You hold one discount coupon. Used on a flight costing `c`, it brings the price down to `⌊c / 2⌋` — integer division, so a ₹7 flight becomes ₹3.

The coupon works on **at most one** flight of your choosing, anywhere on your route. You may also not use it at all.

## Task

Report the cheapest total fare from city `1` to city `n`, or `-1` if there is no route.

## Input

```
Line 1:       n  m
Next m lines: u  v  c
```

There may be several flights between the same pair of cities, and a flight never goes from a city to itself.

## Output

A single integer: the minimum fare, or `-1`.

## Constraints

```
1  ≤  n  ≤  10^5
0  ≤  m  ≤  2 · 10^5
1  ≤  u, v  ≤  n,   u ≠ v
1  ≤  c  ≤  10^9
```

## Sample 1

**Input**
```
4 5
1 2 3
2 4 5
1 3 2
3 4 6
1 4 20
```

**Output**
```
5
```

**Explanation**

Route `1 → 2 → 4` costs `3 + 5 = 8`; spending the coupon on the ₹5 leg makes it `3 + 2 = 5`.

Route `1 → 3 → 4` costs `2 + 6 = 8`; the coupon on the ₹6 leg makes it `2 + 3 = 5` as well.

The direct flight costs 20, or 10 with the coupon. So **5**.

## Sample 2

**Input**
```
3 1
1 2 5
```

**Output**
```
-1
```

**Explanation**

Nothing flies to city 3.

## Sample 3

**Input**
```
1 0
```

**Output**
```
0
```

**Explanation**

You are already there. The coupon goes unused, which is allowed.

## Sample 4

**Input**
```
2 1
1 2 7
```

**Output**
```
3
```

**Explanation**

`⌊7 / 2⌋ = 3`. The halving rounds **down**, not to `3.5`.

## Notes

- The tempting shortcut — find the cheapest route, then discount its priciest leg — is wrong. Which route is cheapest depends on where the coupon goes, so the two choices cannot be made one after the other. Build an input where a slightly longer route carries one enormous flight and you will see it fail.
- The fix is to widen what counts as "where you are". Being in city `x` with the coupon still in your pocket is a different situation from being in city `x` having already spent it. Two copies of the map, then: one before, one after.
- Every flight then offers two moves — pay full price and stay in the same copy, or pay `⌊c/2⌋` and cross into the spent copy. There is no way back.
- The destination can be reached in either copy, so the answer is the better of the two.
- Fares reach `10^9` across up to `10^5` legs, so totals approach `10^{14}`. Use 64-bit arithmetic and an "infinity" that will not overflow when you add to it.
- `n = 1` is legal with `m = 0` and no flight lines at all, and `-1` is a real answer, not an afterthought.
