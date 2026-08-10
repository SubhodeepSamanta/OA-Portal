# Client Panel Scheduling

A consultant is offered `n` client meetings. Meeting `i` runs from `s[i]` to `e[i]` and is worth `v[i]`.

The consultant can only be in one meeting at a time, so any two accepted meetings must not overlap. Meetings that merely touch are fine — a meeting ending at 5 and another starting at 5 can both be taken.

Meetings may be accepted or declined freely; there is no obligation to take any particular one, and no penalty for declining.

## Task

Report the greatest total value the consultant can earn.

## Input

```
Line 1:       n
Next n lines: s[i]  e[i]  v[i]
```

## Output

A single integer: the maximum total value.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  s[i]  <  e[i]  ≤  10^9
1  ≤  v[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 3 5
2 5 6
4 6 5
7 8 4
```

**Output**
```
14
```

**Explanation**

Take meetings 1, 3 and 4 — they run `1–3`, `4–6` and `7–8`, none overlapping — for `5 + 5 + 4 = 14`.

Taking meeting 2 instead of meeting 1 earns 1 more on its own but collides with meeting 3, which costs more than it gains.

## Sample 2

**Input**
```
1
1 10 100
```

**Output**
```
100
```

## Sample 3

**Input**
```
2
1 5 10
5 9 20
```

**Output**
```
30
```

**Explanation**

The first ends exactly when the second begins, so both can be taken.

## Sample 4

**Input**
```
3
1 10 1
2 3 5
4 5 5
```

**Output**
```
10
```

**Explanation**

The long meeting blocks the whole day for a value of 1. Declining it and taking the two short ones earns 10.

## Notes

- Greedy does not work here, in any of its usual forms. Earliest-ending-first ignores value; highest-value-first takes the long meeting in Sample 4; best value-per-hour has its own counterexamples. The presence of **weights** is what breaks them all — without weights, earliest-ending-first would be right.
- Sort by end time and think about the meetings one at a time in that order. For each, there are exactly two choices: decline it, and keep whatever the previous meetings were worth; or accept it, and add its value to the best total achievable among meetings that finish **at or before** its start.
- That second lookup is the only real work. Because the list is sorted by end time, the meetings that finish in time form a prefix, and its boundary can be found by binary search. Keep a running best-so-far array so the value of that prefix is available in one read.
- Watch the boundary. "Finishes at or before this one starts" is `e ≤ s`, not `e < s`; Sample 3 exists to catch that.
- Values reach `10^9` across `2 · 10^5` meetings, so totals approach `2 · 10^{14}`. Accumulate in 64-bit.
- Times reach `10^9`, so the times themselves cannot index anything — the binary search has to be over the sorted meetings, not over a timeline.
