# Portfolio Rebalance

A fund holds `n` assets. Asset `i` currently carries `c[i]` units of weight and should end up carrying `t[i]`.

A **trade** moves any whole number of weight units out of one asset and into another — any pair, in one step. Moving one unit **out of asset `i`** costs `f[i]`, whatever its destination. Moving weight *into* an asset is free.

## Task

Report the cheapest way to reach every target, or `-1` if the targets cannot be met at all.

## Input

```
Line 1:       n
Next n lines: c[i]  t[i]  f[i]
```

## Output

A single integer: the minimum total cost, or `-1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  c[i], t[i]  ≤  10^9
1  ≤  f[i]  ≤  1000
```

## Sample 1

**Input**
```
3
10 0 1
5 10 1
5 10 1
```

**Output**
```
10
```

**Explanation**

Asset 1 must shed all 10 of its units, at a cost of 1 each. Assets 2 and 3 each need 5 more, which the 10 units cover exactly.

## Sample 2

**Input**
```
2
10 0 5
0 10 3
```

**Output**
```
50
```

**Explanation**

Ten units leave asset 1 at a cost of 5 each. Asset 2's own fee of 3 never comes into it, because nothing leaves asset 2 — fees are charged at the source only.

## Sample 3

**Input**
```
2
5 5 100
7 7 100
```

**Output**
```
0
```

**Explanation**

Already on target. No trades, no cost, however expensive the fees are.

## Sample 4

**Input**
```
2
1 2 1
3 3 1
```

**Output**
```
-1
```

**Explanation**

Trades move weight around but never create or destroy it, so the totals must match. Here the fund holds 4 units and the targets ask for 5.

## Notes

- Check feasibility first. A trade conserves total weight, so `Σc` must equal `Σt` — and at `2 · 10^5` assets of `10^9` that sum needs 64 bits before you even compare it.
- Now the cost. Resist the urge to plan actual trades or to match sources with destinations. Instead ask what is **forced**: an asset holding more than its target must send away exactly the excess, no more and no less, and every one of those units is charged at that asset's own fee. That already fixes the total: `Σ max(0, c[i] − t[i]) · f[i]`.
- That is a lower bound, so to be sure it is the answer you also need a plan achieving it — and one exists: pair surplus with deficit in any order you like, since the fee depends only on where a unit comes from and never on where it goes. Both halves of that argument are worth writing down; the problem is easy only once you have.
- The classic error is counting both ends: adding the deficits as well as the surpluses doubles the answer. The other is using the destination's fee.
- Excess reaches `2 · 10^{14}` in total and each unit costs up to `1000`, so the answer reaches `2 · 10^{17}`. That fits in a signed 64-bit integer and in nothing smaller.
