# Warehouse Bay Audit

A distribution warehouse stores goods on numbered shelves. Shelf numbers were assigned historically as the building expanded, so they are neither contiguous nor ordered — a warehouse may hold shelf `−40219`, shelf `7`, and shelf `1000000000` all at once, and there are large gaps where shelves were decommissioned.

Once a quarter an operator walks the floor with a handheld scanner and records the shelf ID of every shelf still physically in place. The scanner writes IDs in the order it happens to see them, and because an operator sometimes doubles back down an aisle, **the same shelf may be scanned more than once**.

Planning wants to consolidate stock into *aisles*. An aisle can only be formed from shelves whose IDs run **consecutively with no gap** — shelves `14, 15, 16, 17` form an aisle of length four, but `14, 15, 17` does not form an aisle of length three, because shelf `16` is missing from the floor.

The physical position of a shelf is irrelevant to this question, and so is the order the scanner happened to record things. All that matters is which shelf IDs are present.

## Task

Given the scanner log, report the **length of the longest aisle** that could be formed — that is, the size of the longest run of consecutive integers all of which appear somewhere in the log.

## Input

```
Line 1:  n
Line 2:  id[1] id[2] ... id[n]
```

- `n` — the number of scans recorded
- `id[i]` — the shelf ID of the `i`-th scan

## Output

A single integer: the length of the longest run of consecutive shelf IDs present in the log.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
-10^9  ≤  id[i]  ≤  10^9
```

## Sample 1

**Input**
```
6
100 4 200 1 3 2
```

**Output**
```
4
```

**Explanation**

The distinct shelf IDs present are `{1, 2, 3, 4, 100, 200}`.

The run `1, 2, 3, 4` is consecutive and has length four. `100` and `200` are each isolated — the shelves either side of them are not on the floor — so they only form runs of length one. The answer is 4.

## Sample 2

**Input**
```
7
5 5 5 6 7 1 2
```

**Output**
```
3
```

**Explanation**

Shelf `5` was scanned three times, but a shelf scanned repeatedly is still one shelf. The distinct IDs are `{1, 2, 5, 6, 7}`.

That gives two runs: `1, 2` of length two, and `5, 6, 7` of length three. The answer is 3.

## Notes

- Duplicate scans must not inflate an aisle's length.
- Shelf IDs may be negative, and a run may cross zero.
- With `n = 1` the answer is always 1.
- Sorting the log is fast enough to pass. There is also a solution that never sorts and touches each distinct ID a constant number of times — worth finding, because the reasoning behind it transfers.
