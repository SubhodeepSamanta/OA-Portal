# Duplicate Detector

A log holds `n + 1` ticket ids. Every id is between `1` and `n` inclusive.

By the pigeonhole principle at least one id must appear more than once. It is guaranteed that **exactly one** id repeats — that id may appear twice or many times, and every other id in `1..n` appears at most once.

## Task

Report the repeated id.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n+1]
```

## Output

A single integer: the id that appears more than once.

## Constraints

```
1  ≤  n     ≤  500000
1  ≤  a[i]  ≤  n
```

## Sample 1

**Input**
```
4
1 3 4 2 2
```

**Output**
```
2
```

## Sample 2

**Input**
```
1
1 1
```

**Output**
```
1
```

## Sample 3

**Input**
```
3
3 1 3 3
```

**Output**
```
3
```

**Explanation**

`3` appears three times. That is still "exactly one repeated id".

## Sample 4

**Input**
```
5
1 2 3 4 5 3
```

**Output**
```
3
```

## Notes

- A counting array solves this immediately and will pass here. That is the point of the problem, not the end of it: the interview version of this question adds two constraints the judge cannot check for you, and the whole value of practising it is meeting them anyway.
  - **`O(1)` extra space** — no counting array, no hash set, no sorted copy.
  - **The input array must not be modified** — so no in-place sorting and no marking visited slots by negating them.
- Under those constraints, the trick is to stop seeing an array and start seeing a **function**. Read `a` as a mapping `i → a[i]` on the index space `0..n`. Start at index `0` and follow it: `0 → a[0] → a[a[0]] → …`.
- Every value lands in `1..n`, so the walk can never return to index `0` — index `0` is outside the mapping's range. The walk is confined to a finite set, so it must eventually repeat, meaning it enters a cycle. And the entry point into that cycle is exactly a value that two different indices map to — the duplicate.
- That reduces the problem to *find the start of the cycle in a linked list*, which is **Floyd's tortoise and hare**:
  1. Advance `slow` by one and `fast` by two until they meet inside the cycle.
  2. Reset `slow` to the start, then advance both one step at a time. They meet at the cycle entrance.
- The pointer phase is `O(n)` time and two integer variables of space. Getting comfortable with step 2 — why resetting one pointer to the start lands on the entrance — is the part worth deriving on paper once, since the same phase-two argument shows up in every cycle-detection question.
- Because a repeated id may appear many times, do not assume the answer appears exactly twice; any solution that relies on counting to exactly 2 will miss Sample 3.
