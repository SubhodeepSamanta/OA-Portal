# Transaction Router

A payments platform routes transactions through gateways. Gateway `i` has a **success rate** `p[i]` and a **cost** `c[i]`, both integers. Higher `p` is better; lower `c` is better.

The platform starts with `n` gateways, numbered `1` through `n`. Then `q` operations arrive:

- **`ADD p c`** — a new gateway joins with that success rate and cost. It takes the next unused number: if `k` gateways have ever existed, the new one is number `k + 1`.
- **`REMOVE id`** — gateway `id` is taken out of service. It is currently in service, and it never comes back.
- **`ROUTE r`** — a transaction arrives that will only accept a success rate of at least `r`. It goes through the **cheapest gateway currently in service with `p ≥ r`**. Report that gateway's cost, or `-1` if no gateway in service qualifies.

Several gateways may share a success rate, a cost, or both.

## Task

Answer every `ROUTE`, in order.

## Input

```
Line 1:       n  q
Next n lines: p[i]  c[i]        the starting gateways, numbered 1 to n
Next q lines: ADD p c   |   REMOVE id   |   ROUTE r
```

## Output

One line per `ROUTE`: the cost charged, or `-1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  q  ≤  2 · 10^5
0  ≤  p, r  ≤  10^9
1  ≤  c  ≤  10^9
```

## Sample 1

**Input**
```
3 4
90 50
95 80
99 200
ROUTE 90
ROUTE 96
ROUTE 100
REMOVE 1
```

**Output**
```
50
200
-1
```

**Explanation**

At `r = 90` every gateway qualifies, and the cheapest of them costs **50**. At `r = 96` only gateway 3 is good enough, so the price jumps to **200** — being choosier costs more. At `r = 100` nothing qualifies.

The trailing `REMOVE` prints nothing.

## Sample 2

**Input**
```
2 5
80 10
90 100
ROUTE 85
REMOVE 2
ROUTE 85
ADD 95 20
ROUTE 85
```

**Output**
```
100
-1
20
```

**Explanation**

Gateway 2 is the only one meeting `r = 85`, at a cost of 100. Once it is removed nothing qualifies. The newly added gateway 3 then covers `r = 85` at a cost of 20.

## Sample 3

**Input**
```
3 2
99 500
95 10
90 1
ROUTE 92
ROUTE 90
```

**Output**
```
10
1
```

**Explanation**

The cheapest qualifying gateway is not the one with the highest success rate, and it is not the overall cheapest either — at `r = 92` the cheap gateway 3 is not good enough, so gateway 2 wins at **10**.

## Notes

- Scanning every gateway per transaction is `O(n)` each, `4 · 10^{10}` at the limits.
- The query is a **suffix minimum over the success-rate axis**: among all gateways with `p ≥ r`, what is the smallest cost? If the set never changed you could sort once and precompute suffix minima — but gateways come and go, so it must survive updates.
- Success rates go up to `10^9`, far too wide for an array. But only the rates that actually appear can ever matter, and you are given every one of them up front, including those in future `ADD`s. Read the whole input first, collect them, sort, and work with positions in that list.
- Then keep a tree over those positions holding the minimum cost beneath each node. Adding or removing a gateway touches one leaf and the path above it, and a query is a suffix minimum — both `O(log n)`.
- One subtlety: several gateways can sit at the *same* success rate, so a leaf is not a single value but a collection, and removing one of them must reveal the next cheapest rather than emptying the leaf. A multiset per leaf handles it.
- `-1` is a real answer and appears whenever the in-service set has nothing good enough — including when it is empty.
