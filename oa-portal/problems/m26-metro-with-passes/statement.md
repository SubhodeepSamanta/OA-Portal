# Metro with Passes

A metro network has `n` stations, numbered `1` through `n`, joined by `m` two-way links. Riding link `i` costs `c[i]` rupees in either direction.

Your travel card carries `k` **free passes**. Tapping a pass as you board makes that one link cost nothing. Each pass is good for exactly one link, you may use as many or as few as you like, and you cannot split a pass across two links.

You start at station `1` and want to reach station `n`.

## Task

Report the cheapest total fare from station `1` to station `n`, or `-1` if no route exists.

## Input

```
Line 1:       n  m  k
Next m lines: u  v  c      a link between stations u and v costing c
```

The network may contain several links between the same pair of stations. There are no links from a station to itself.

## Output

A single integer: the minimum fare, or `-1` if station `n` cannot be reached.

## Constraints

```
1  ≤  n  ≤  10^5
0  ≤  m  ≤  2 · 10^5
0  ≤  k  ≤  10
1  ≤  u, v  ≤  n,   u ≠ v
1  ≤  c  ≤  10^9
```

## Sample 1

**Input**
```
4 4 1
1 2 10
2 4 10
1 3 1
3 4 100
```

**Output**
```
1
```

**Explanation**

Take `1 → 3` for 1 rupee, then spend the single pass on the 100-rupee link `3 → 4`. Total **1**.

The other route `1 → 2 → 4` costs 20, and one pass only removes 10 of it.

## Sample 2

**Input**
```
3 1 0
1 2 5
```

**Output**
```
-1
```

**Explanation**

Station 3 has no links at all.

## Sample 3

**Input**
```
2 1 5
1 2 7
```

**Output**
```
0
```

**Explanation**

More passes than links on the route. One of them covers the only link and the ride is free. Unused passes are simply wasted.

## Sample 4

**Input**
```
4 4 0
1 2 10
2 4 10
1 3 1
3 4 100
```

**Output**
```
20
```

**Explanation**

The same network with no passes. Now the cheap-looking first hop is a trap: `1 → 3 → 4` costs 101, and the honest shortest route is `1 → 2 → 4` at 20.

## Notes

- The greedy instinct — find the shortest route first, then spend the passes on its most expensive links — is wrong, and Sample 1 is the counterexample. Which route is best *depends on* how the passes get spent, so the two decisions cannot be made in that order.
- The fix is to stop thinking of "where you are" as just a station. You are at a station **and** you have some number of passes left. Two travellers standing on the same platform with different numbers of passes remaining are genuinely in different situations.
- Once you accept that, the state space is `n × (k + 1)` — at most `1.1 · 10^6` states — and every link gives you two ways to move: pay for it and keep your passes, or burn one pass and ride free. Run your usual shortest-path over that.
- `k ≤ 10` is not decoration. It is the constraint telling you the layered state space is small enough to afford.
- Costs reach `10^9` and a route can have `10^5` links, so the answer can approach `10^14`. Initialise distances to something safely above that, and use 64-bit arithmetic.
- `n = 1` is legal, and then you are already at the destination.
