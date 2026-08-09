# One Swap Sum II

The trading desk's reporting rule has been tightened.

As before, the ledger has `n` slots numbered `1` through `n`, and only the **odd-numbered slots** are totalled. But the auditor now discards anything that does not settle cleanly: a slot contributes to the total **only if the amount in it is an odd number**. An even amount sitting in an odd-numbered slot contributes nothing at all — it is simply ignored.

Note that "odd amount" is about the value's parity, not its sign: `-3` is odd and counts; `-4` is even and does not.

The permitted correction has been tightened too. The desk may still make **at most one** swap, but it must now be between an **odd-numbered slot and an even-numbered slot**. Swapping two odd slots with each other, or two even slots, is no longer allowed.

## Task

Perform **at most one** swap between an odd-numbered slot and an even-numbered slot, then report the **largest achievable total**, where the total counts only odd amounts sitting in odd-numbered slots.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the maximum achievable total.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
-10^9  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
2 7 4 1
```

**Output**
```
7
```

**Explanation**

Odd-numbered slots are 1 and 3, holding `2` and `4`. Both are even amounts, so both are ignored and the total starts at **0**.

Swapping slot 2 with slot 3 brings `7` — an odd amount — into odd slot 3, and pushes the ignored `4` out. The ledger becomes `2 4 7 1` and the total is **7**.

## Sample 2

**Input**
```
3
3 2 5
```

**Output**
```
8
```

**Explanation**

Odd slots 1 and 3 hold `3` and `5`, both odd amounts, totalling 8.

The only even-numbered slot holds `2`, which is an even amount and would contribute nothing. Bringing it in would displace a `3` or a `5`, so every allowed swap loses value. The desk leaves the ledger alone.

## Sample 3

**Input**
```
5
-3 -4 6 -9 8
```

**Output**
```
0
```

**Explanation**

Odd slots are 1, 3 and 5 holding `-3`, `6`, `8`. Only `-3` is an odd amount; `6` and `8` are even and are ignored. The total starts at `-3`.

Now swap slot 1 with slot 2. The `-3` leaves the odd slots and `-4` arrives — and `-4` is an even amount, so it contributes **nothing**. The ledger becomes `-4 -3 6 -9 8` and the total is **0**.

That is the trap worth noticing: replacing a counted negative with an ignored value is a gain of 3, even though `-4` is itself the smaller number. Bringing `-9` in instead would count it and give `-9`, which is worse.

## Notes

- A slot holding an even amount contributes **zero**, not its value. Treat it as if the slot were empty for totalling purposes.
- Negative odd amounts still count, and they count negatively — sometimes the best move is no move.
- The swap is optional, and it must cross between an odd-numbered and an even-numbered slot.
- With `n = 1` there are no even-numbered slots, so no swap is possible.
- Totals can exceed the range of a 32-bit integer.
