# Loyalty Streak

A retail chain runs a loyalty programme and keeps, for each member, a chronological log of every transaction that moved money. A **positive** amount is a purchase; a **negative** amount is a return of goods previously bought.

The marketing team is designing a campaign around *sustained engagement*. They are not interested in a customer's total spend, and they are not interested in how often some target was hit. What they want to identify is the **single longest unbroken run of transactions** whose amounts net out to a specific campaign figure `k`.

A run here means a contiguous block of the log: transactions `i` through `j` in order, with none skipped. The campaign figure `k` may be positive, negative, or zero — a zero campaign figure picks out the longest stretch during which the customer spent and returned in perfect balance.

Only the length of that stretch matters. If several different stretches all achieve the campaign figure, the longest one wins; the team wants a duration to headline the campaign with.

## Task

Given the transaction log and the campaign figure `k`, report the **length of the longest contiguous block** of transactions whose amounts sum to exactly `k`.

If no block of transactions sums to `k`, report `0`.

## Input

```
Line 1:  n  k
Line 2:  a[1] a[2] ... a[n]
```

- `n` — number of transactions in the log
- `k` — the campaign figure
- `a[i]` — the amount of the `i`-th transaction, in chronological order

## Output

A single integer: the length of the longest contiguous block summing to exactly `k`, or `0` if there is none.

## Constraints

```
1  ≤  n     ≤  2 · 10^5
-10^9  ≤  a[i]  ≤  10^9
-10^14 ≤  k     ≤  10^14
```

## Sample 1

**Input**
```
3 0
1 -1 0
```

**Output**
```
3
```

**Explanation**

Three blocks sum to zero: `[1..2]` of length 2, `[3..3]` of length 1, and `[1..3]` of length 3. The longest is the whole log, so the answer is 3.

## Sample 2

**Input**
```
5 3
3 0 -1 4 -3
```

**Output**
```
5
```

**Explanation**

The blocks summing to 3 are `[1..1]`, `[1..2]`, `[3..4]`, `[2..4]` and `[1..5]`, of lengths 1, 2, 2, 3 and 5.

Note that the whole log sums to `3 + 0 − 1 + 4 − 3 = 3`, so the answer is the full length 5. A long block can qualify even though it contains large positive and negative swings, because only the net matters.

## Sample 3

**Input**
```
4 100
1 2 3 4
```

**Output**
```
0
```

**Explanation**

No contiguous block sums to 100, so the answer is 0.

## Notes

- Amounts may be zero, and zero-amount transactions extend a block's length without changing its sum. This is exactly why the longest block is not always the obvious one.
- Running totals across the log can exceed the range of a 32-bit integer.
- This problem is a deliberate near-twin of the reconciliation question (`Q2` / `m1`). The two differ in one word — *count* against *longest* — and that single word changes what has to be stored while sweeping the log. Work out precisely what changes, and why the bookkeeping that answers one gives the wrong answer for the other.
