# Sensor Fault Isolation

A diagnostic dump lists `n` sensor IDs. Every sensor reported in exactly twice — except **two** faulty ones, which reported in only once each.

## Task

Find the two IDs that appear exactly once, and print them in **increasing** order.

## Input

```
Line 1:  n
Line 2:  the n sensor IDs, in no particular order
```

## Output

Two integers in increasing order: the IDs that appear once.

## Constraints

```
2  ≤  n  ≤  2 · 10^5
1  ≤  ID  ≤  10^9
```

Exactly two IDs appear once; every other ID appears exactly twice. `n` is therefore always even.

## Sample 1

**Input**
```
6
1 2 1 3 2 5
```

**Output**
```
3 5
```

**Explanation**

1 and 2 each appear twice. 3 and 5 appear once.

## Sample 2

**Input**
```
2
7 9
```

**Output**
```
7 9
```

## Sample 3

**Input**
```
4
1000000000 5 5 1
```

**Output**
```
1 1000000000
```

**Explanation**

Printed smallest first, which is not the order they appear in the dump.

## Notes

- A hash map of counts solves this and is a perfectly good answer — but the intended one uses no extra storage at all, and the reasoning is worth having.
- Start from the single-fault version: XOR everything together and the paired IDs cancel, leaving the odd one out. With **two** faults that leaves `a XOR b` — the two answers mixed together, which on its own tells you neither.
- It does tell you something decisive though. Since `a ≠ b`, that XOR is non-zero, so it has some bit set — and a set bit there means `a` and `b` **disagree** on that bit.
- So pick any such bit and split the whole dump on it. Every paired ID lands wholly in one side, because both copies agree everywhere. `a` and `b` land in different sides. XOR each side separately and each collapses to one answer.
- The lowest set bit is the easiest to isolate: `x & -x`.
- Two passes, a couple of integers, and no allocation. Sort the two answers before printing — the dump order means nothing.
