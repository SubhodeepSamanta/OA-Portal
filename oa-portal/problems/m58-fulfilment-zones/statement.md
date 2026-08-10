# Fulfilment Zones

A retailer has `n` candidate warehouse sites and `m` customers, all at integer points on a plane.

A warehouse can serve a customer if the straight-line distance between them is **at most `d`**. Every customer must be served by at least one **opened** warehouse; a customer may be within reach of several, and only one of them needs to be open.

Opening warehouses is expensive.

## Task

Report the smallest number of warehouses that can be opened so that every customer is served, or `-1` if no choice of warehouses can serve everybody.

## Input

```
Line 1:       n  m  d
Next n lines: x  y      a candidate warehouse site
Next m lines: x  y      a customer
```

## Output

A single integer: the minimum number of warehouses opened, or `-1`.

## Constraints

```
1  ≤  n  ≤  20
1  ≤  m  ≤  10^5
0  ≤  d  ≤  3 · 10^6
-10^6  ≤  x, y  ≤  10^6
```

## Sample 1

**Input**
```
2 3 5
0 0
10 0
0 0
1 1
10 1
```

**Output**
```
2
```

**Explanation**

The first two customers are only within 5 of the warehouse at `(0,0)`, and the third only of the one at `(10,0)`. Both must open.

## Sample 2

**Input**
```
1 1 0
5 5
5 5
```

**Output**
```
1
```

**Explanation**

A distance of exactly `d` counts as served, and `0 ≤ 0`.

## Sample 3

**Input**
```
1 1 1
0 0
10 10
```

**Output**
```
-1
```

**Explanation**

The only customer is out of reach of the only site, so no selection works.

## Sample 4

**Input**
```
3 2 100
0 0
50 50
100 100
1 1
2 2
```

**Output**
```
1
```

**Explanation**

Both customers are within 100 of the site at `(0,0)` *and* of the one at `(50,50)`. Either alone will do, so one warehouse suffices — even though three are on offer.

## Notes

- `n ≤ 20` against `m ≤ 10^5` is the whole shape of this problem. The customers are many but simple; the warehouses are few enough to enumerate.
- So describe each customer by the **set of warehouses that can reach them** — a 20-bit number. Computing all of those is `n × m = 2 · 10^6` distance checks.
- A chosen set `S` of warehouses serves everybody exactly when `S` shares at least one warehouse with every customer's set. Equivalently, `S` **fails** when there is some customer whose set it misses entirely — that is, when `S` is a subset of the complement of that customer's set.
- That reframing is what makes it tractable. Mark the complement of every customer's set as "bad", then propagate: any subset of a bad set is also bad. That is a single sweep over all `2^n` masks, one bit at a time — about `2 · 10^7` steps. The answer is the fewest bits in any mask left unmarked.
- A customer nobody can reach makes their complement the full set, which marks everything, and the answer falls out as `-1` with no special case needed.
- Compare **squared** distances against `d²` and stay in integers. Coordinates reach `10^6`, so a squared distance reaches `8 · 10^{12}` — fine in 64-bit, and floating-point square roots would be both slower and prone to boundary errors on the `≤ d` test.
- `d = 0` is legal and means a warehouse must sit exactly on the customer.
