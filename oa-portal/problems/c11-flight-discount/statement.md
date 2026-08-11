# Flight Discount

> **Mirrored from CSES 1195** — <https://cses.fi/problemset/task/1195>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

You are planning a flight from city `1` to city `n`. There are `m` one-way flights, each with a price.

You hold one discount coupon. You may use it on **at most one** flight, which halves that flight's price, rounded down: a flight costing `x` becomes `⌊x/2⌋`.

## Task

Report the cheapest total price from city `1` to city `n`.

## Input

```
Line 1:       n  m
Next m lines: a  b  c     a one-way flight from a to b costing c
```

A route from city 1 to city n always exists.

## Output

A single integer: the minimum total price.

## Constraints

```
2  ≤  n  ≤  100000
1  ≤  m  ≤  200000
1  ≤  a, b  ≤  n
1  ≤  c  ≤  10^9
```

## Sample 1

**Input**
```
3 4
1 2 3
2 3 1
1 3 7
2 1 5
```

**Output**
```
2
```

**Explanation**

Fly `1 → 2` for 3 with the coupon (`⌊3/2⌋ = 1`), then `2 → 3` for 1. Total 2. Using the coupon on the direct `1 → 3` flight would cost `⌊7/2⌋ = 3`.

## Notes

- Trying the coupon on each flight in turn means `m` separate runs of Dijkstra — `2·10^5` runs, far too slow.
- The trick is to **build a second copy of the graph** and let the state carry whether the coupon is spent. A node is now a pair `(city, used)` where `used` is 0 or 1, giving `2n` states:
  - a normal flight `a → b` costing `c` goes from `(a, 0) → (b, 0)` and from `(a, 1) → (b, 1)`, both costing `c`;
  - **spending** the coupon goes from `(a, 0) → (b, 1)` costing `⌊c/2⌋`.
- Run one Dijkstra from `(1, 0)` and the answer is `dist[(n, 1)]` — or `dist[(n, 0)]` if leaving the coupon unused could ever be better. Since every `c ≥ 1` and `⌊c/2⌋ ≤ c`, using it never hurts, but taking the minimum of the two costs nothing and is safer than reasoning about it under pressure.
- This "layered graph" shape is worth recognising, because it generalises: *at most k coupons* becomes `k + 1` layers, and the rest of the solution is unchanged.
- **Overflow.** A route can chain `10^5` flights at `10^9` each, so distances reach `10^{14}`. Use 64-bit types and initialise distances to something like `4·10^{18}` — not `INT_MAX`, and not `LLONG_MAX` (adding an edge weight to that overflows).
- Use a `priority_queue` with the lazy-deletion pattern: push `(dist, state)`, and when you pop a state whose recorded distance is smaller than the popped one, skip it. `O((n + m) log n)`.
- The graph is **directed** — add each flight in one direction only. The sample's `2 1 5` flight exists precisely to catch code that adds both.
