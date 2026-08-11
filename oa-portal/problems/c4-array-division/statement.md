# Array Division

> **Mirrored from CSES 1085** — <https://cses.fi/problemset/task/1085>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

You are given an array of `n` positive integers. Split it into `k` **contiguous** subarrays, so that every element belongs to exactly one subarray.

## Task

Report the smallest possible value of the **largest** subarray sum.

## Input

```
Line 1:  n  k
Line 2:  x[1] x[2] ... x[n]
```

## Output

A single integer: the minimum achievable maximum subarray sum.

## Constraints

```
1  ≤  n     ≤  200000
1  ≤  k     ≤  n
1  ≤  x[i]  ≤  10^9
```

## Sample 1

**Input**
```
5 3
2 4 7 3 5
```

**Output**
```
8
```

**Explanation**

Split as `[2, 4] [7] [3, 5]` with sums `6, 7, 8`. The largest is 8, and no split into 3 parts does better.

## Notes

- This is the same shape as *Factory Machines*: stop trying to find the split, and ask a yes/no question instead — *with a cap of `S` on every subarray sum, can the array be cut into at most `k` pieces?*
- Answering it is a single greedy pass: walk left to right adding elements to the current piece; the moment adding one would push the running sum past `S`, close the piece and start a new one with that element. That uses the fewest pieces possible for the cap `S`, so if even it needs more than `k`, no split works.
- The predicate is monotone in `S` — a larger cap never needs more pieces — so binary search on `S`.
- The search range is what makes this problem: `lo = max(x[i])` (a piece must hold at least one element, so no cap below the largest element can ever work) and `hi = Σx[i]` (one piece holding everything). Starting at `lo = 0` or `lo = 1` still works but the greedy must then handle the impossible caps correctly; starting at `max(x)` sidesteps that entirely.
- `Σx[i]` reaches `2·10^5 · 10^9 = 2·10^{14}`, so sums, the cap and the bounds all need 64-bit types. This is the overflow that bites.
- `O(n log Σx)` overall — around 48 passes over the array.
- Note "at most `k` pieces", not exactly `k`. Since every element is positive, using fewer pieces than allowed never hurts, and `k ≤ n` guarantees a valid split always exists.
