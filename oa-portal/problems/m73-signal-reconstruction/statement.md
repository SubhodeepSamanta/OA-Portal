# Signal Reconstruction

A sensor log `a[1] … a[n]` was **strictly increasing** when it was recorded. A firmware fault then reversed exactly one contiguous block of it, in place — everything outside that block is untouched, and everything inside now reads backwards.

You are given the damaged log.

## Task

Report the block that was reversed, as two positions `l` and `r` with `l ≤ r`, such that reversing `a[l] … a[r]` makes the whole log strictly increasing again.

If the log is already strictly increasing, the fault reversed a block of a single element, which changes nothing. Report `1 1` in that case.

If no single reversal can repair the log, report `-1`.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

Two integers `l` and `r`, or the single integer `-1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
5
1 4 3 2 5
```

**Output**
```
2 4
```

**Explanation**

Reversing positions 2 to 4 turns `4 3 2` into `2 3 4`, giving `1 2 3 4 5`.

## Sample 2

**Input**
```
4
1 2 3 4
```

**Output**
```
1 1
```

**Explanation**

Nothing is out of order, so the reversed block was a single element.

## Sample 3

**Input**
```
4
1 3 2 4
```

**Output**
```
2 3
```

## Sample 4

**Input**
```
5
1 5 3 4 2
```

**Output**
```
-1
```

**Explanation**

The log first falls at position 2 and last falls at position 4, so the only candidate block is positions 2 to 5. Reversing it gives `1 2 4 3 5`, which still falls at position 3. No single reversal repairs this log.

## Notes

- The candidate block is **forced**, so there is nothing to search. Find the first position where the log fails to increase and the last one; the block must start at the first and end just after the last, because any reversal leaving one of those failures outside itself cannot fix it.
- Having found the only candidate, you still have to **check it**. Reversing it and confirming the whole log is strictly increasing is the difference between Sample 1 and Sample 4, which look identical up to that point — both have their first fall at position 2 — and only the check separates them.
- "Strictly increasing" means `a[i] < a[i+1]`, so equal neighbours are a failure too. A log like `1 1` cannot be repaired: reversing the pair leaves it unchanged.
- Do not sort. Sorting would tell you what the repaired log should look like but not whether a single **reversal** produces it, and it throws away exactly the information the check needs.
- `n = 1` has nothing to go wrong and answers `1 1`.
- One pass to find the two boundaries and one pass to verify is `O(n)`; there is no need to physically reverse anything if you compare the block back-to-front in place.
