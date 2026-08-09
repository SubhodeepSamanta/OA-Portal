# Refund Reconciliation

A payments company settles merchant transactions continuously through the trading day. Every settlement event that touches a merchant's balance is written to an append-only ledger in the order it occurred. A **positive** entry is money moving to the merchant; a **negative** entry is a refund clawing money back.

At the end of each day the compliance team performs a reconciliation sweep. Their auditors are not interested in individual entries — they care about **windows of continuous activity**. A *reconciliation window* is any contiguous run of ledger entries, from some entry `i` through to some entry `j` (with `i ≤ j`), taken in ledger order and with nothing skipped.

A window is called **balanced at target `k`** when the entries inside it sum to exactly `k` rupees. When `k` is zero this identifies stretches of the day where every rupee that moved out was matched by a rupee that moved back; when `k` is non-zero it isolates stretches that produced exactly the expected net movement.

The auditors need a single number to open their report with.

## Task

Given the day's ledger and a target `k`, report **how many reconciliation windows are balanced at `k`**.

Two windows are different if they begin at a different entry or end at a different entry, even if the entries inside them happen to hold identical amounts.

## Input

```
Line 1:  n  k
Line 2:  a[1] a[2] ... a[n]
```

- `n` — the number of ledger entries
- `k` — the reconciliation target
- `a[i]` — the `i`-th ledger entry, in ledger order

## Output

A single integer: the number of contiguous windows whose entries sum to exactly `k`.

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

Writing windows as `[first entry .. last entry]`:

| Window | Entries | Sum | Balanced? |
|---|---|---|---|
| `[1..1]` | `1` | 1 | no |
| `[1..2]` | `1, -1` | 0 | **yes** |
| `[1..3]` | `1, -1, 0` | 0 | **yes** |
| `[2..2]` | `-1` | −1 | no |
| `[2..3]` | `-1, 0` | −1 | no |
| `[3..3]` | `0` | 0 | **yes** |

Three windows are balanced.

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

The balanced windows are `[1..1]`, `[1..2]`, `[1..5]`, `[2..4]` and `[3..4]`.

Note that `[1..1]` and `[1..2]` both sum to 3 and are counted separately — a zero entry extends a window without changing its sum, and each distinct pair of endpoints is its own window.

## Notes

- The ledger is **not** sorted and must not be reordered. Windows are contiguous in ledger order.
- Entries may be zero, and the same amount may appear many times.
- The answer can be considerably larger than the number of entries. Choose your integer type accordingly.
- Running sums over the whole ledger can exceed the range of a 32-bit integer.
