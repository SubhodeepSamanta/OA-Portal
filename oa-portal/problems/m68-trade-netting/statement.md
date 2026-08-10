# Trade Netting

A clearing house has `n` counterparties, numbered `1` through `n`, and a log of `m` trades. Trade `j` records that counterparty `a` owes counterparty `b` an amount `x`.

Two counterparties belong to the same **clearing group** if you can get from one to the other by following trades, in either direction. A counterparty with no trades at all is a clearing group by itself.

Before anything is paid, the house **nets** every counterparty's position: their net figure is everything owed *to* them minus everything they owe. A counterparty whose net figure is zero is already square and takes no part in the settlement.

## Task

For each clearing group, report two things:

1. how many of its members have a **non-zero** net position, and
2. the **total amount that must change hands** — the sum of the positive net positions in that group.

## Input

```
Line 1:       n  m
Next m lines: a  b  x        counterparty a owes counterparty b the amount x
```

## Output

```
Line 1:  G, the number of clearing groups
Next G lines:  smallest member,  non-zero count,  total moving
```

Groups are listed in increasing order of their smallest member number.

## Constraints

```
1  ≤  n  ≤  10^5
0  ≤  m  ≤  2 · 10^5
1  ≤  a, b  ≤  n,   a ≠ b
1  ≤  x  ≤  10^9
```

The same pair may trade many times, in either direction.

## Sample 1

**Input**
```
3 2
1 2 10
2 3 10
```

**Output**
```
1
1 2 10
```

**Explanation**

Counterparty 2 owes 10 and is owed 10, so it nets to zero and drops out. Counterparty 1 is down 10 and counterparty 3 is up 10 — two non-zero positions, and **10** must move.

## Sample 2

**Input**
```
4 2
1 2 5
3 4 7
```

**Output**
```
2
1 2 5
3 2 7
```

**Explanation**

Two separate groups, reported by their smallest member.

## Sample 3

**Input**
```
2 0
```

**Output**
```
2
1 0 0
2 0 0
```

**Explanation**

No trades at all, so each counterparty is its own group with nothing to settle.

## Sample 4

**Input**
```
3 3
1 2 5
2 3 5
3 1 5
```

**Output**
```
1
1 0 0
```

**Explanation**

A ring of debts. Every counterparty owes 5 and is owed 5, so netting cancels the whole thing and no money needs to move at all — even though three trades were logged.

## Notes

- Do the netting first and the grouping second; they are independent. A single pass over the trades gives every counterparty's net figure, and the groups come from treating each trade as an undirected link.
- Union-find is the natural tool for the grouping, but a flood fill over an adjacency list works just as well at this size. Either way, remember that counterparties with **no** trades still form groups of one.
- Within a group the net figures always sum to zero, so the total of the positive positions equals the total of the negative ones. Report the positive side.
- Amounts reach `10^9` across `2 · 10^5` trades, so a net position reaches `2 · 10^{14}`. Use 64-bit throughout — including the running total, which is what overflows first.
- Ordering the output by each group's smallest member is part of the specification, not a detail. Collect the groups, then sort by that key.

## A note on this version

The original asks for the **fewest payments** that settle a group. That question is NP-hard: the minimum is the number of non-zero positions minus the largest number of disjoint subsets that each sum to zero, and finding those subsets is set partitioning. There is no correct answer key for it at `n = 10^5`.

Reporting the non-zero count and the amount moving keeps everything this problem is really teaching — netting, grouping, and 64-bit aggregation — and has an answer a judge can hold. It is worth knowing that the count reported here is an *upper bound minus one* on the payments needed: `z` non-zero members can always be settled in `z − 1` payments by chaining them.
