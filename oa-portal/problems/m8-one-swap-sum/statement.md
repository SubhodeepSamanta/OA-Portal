# One Swap Sum

A trading desk keeps its daily positions in a fixed ledger of `n` slots, numbered `1` through `n` in order. At the close of business an auditor totals only the **odd-numbered slots** — slots `1`, `3`, `5` and so on. That figure is what gets reported upward, and the desk is measured on it.

Before the ledger is frozen, the desk is permitted **one correction**: they may pick any two slots and exchange their contents. Any two — adjacent or far apart, odd-numbered or even-numbered. The correction is optional; if the ledger already reads as well as it can, they may leave it alone.

A slot may hold a negative amount (a short position), so a swap that looks helpful can easily make things worse.

## Task

Perform **at most one** swap of two slots, then report the **largest achievable total of the odd-numbered slots**.

Slot numbering is **1-based**: slots `1, 3, 5, …` are the ones that count.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the maximum total of the odd-numbered slots after at most one swap.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
-10^9  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 2 3 4
```

**Output**
```
7
```

**Explanation**

Odd-numbered slots are 1 and 3, holding `1` and `3`, totalling 4.

Swapping slot 3 with slot 4 puts `4` into an odd slot and moves `3` out: the ledger becomes `1 2 4 3` and the odd slots hold `1` and `4`, totalling **7**. No other single swap beats it.

## Sample 2

**Input**
```
3
5 1 5
```

**Output**
```
10
```

**Explanation**

Odd slots 1 and 3 already hold `5` and `5`, totalling 10. The only value sitting in an even slot is `1`, and bringing it in would replace a `5`. Every swap makes things worse, so the desk leaves the ledger alone.

## Sample 3

**Input**
```
1
-7
```

**Output**
```
-7
```

**Explanation**

With a single slot there is nothing to swap with. Slot 1 is odd-numbered, so the answer is its contents.

## Notes

- The swap is **optional**. If no swap improves the total, report the total as it stands.
- Swapping two odd-numbered slots with each other changes nothing, and neither does swapping two even-numbered slots. Only a swap that crosses between the two groups can move the figure.
- There are about `n²/2` possible swaps. At the upper limit that is far too many to try. Work out how few of them could possibly be worth considering.
- Totals can reach `2 · 10^14`, well beyond a 32-bit integer.
