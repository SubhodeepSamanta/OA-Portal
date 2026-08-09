# Meeting Room Heatmap

An office building's booking system holds every meeting scheduled for a single day. Each meeting has a start time and an end time, recorded as integers on a shared clock (you can read them as minutes since midnight, though the unit does not matter).

The facilities team is deciding how many rooms the floor actually needs. Their question is not how many meetings happen, nor how long they run — it is **how many meetings are ever in progress at the same instant**, at the busiest moment of the day. That number is the true room requirement, because every simultaneously-running meeting needs its own room.

One detail decides a large number of borderline cases. A meeting occupies its room over the **half-open** interval `[s, e)`: it holds the room from instant `s` up to *but not including* instant `e`. In plain terms, the room is vacated exactly at `e`. So a meeting running `[1, 5)` and a meeting running `[5, 9)` can share a single room — the first has released it at the very instant the second claims it. They are never both in progress.

## Task

Given the day's bookings, report the **maximum number of meetings in progress simultaneously** at any instant.

## Input

```
Line 1:      n
Next n lines: s  e
```

- `n` — the number of meetings booked
- `s`, `e` — the start and end of a meeting, occupying `[s, e)`

## Output

A single integer: the largest number of meetings that are simultaneously in progress at any instant of the day.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  s  <  e  ≤  10^9
```

## Sample 1

**Input**
```
3
0 30
5 10
15 20
```

**Output**
```
2
```

**Explanation**

The long meeting `[0, 30)` runs across the whole window. The other two sit inside it but never overlap each other — `[5, 10)` has finished long before `[15, 20)` begins.

So at any instant at most two meetings are live: the long one plus at most one of the short ones. The answer is 2.

## Sample 2

**Input**
```
3
1 5
5 9
9 12
```

**Output**
```
1
```

**Explanation**

These three meetings are back to back. At instant 5 the first meeting has already released its room — it occupies `[1, 5)`, which does not include 5 — and the second claims it at that exact instant. The same happens at instant 9.

At no point are two meetings live together, so a single room serves all three and the answer is 1.

## Sample 3

**Input**
```
5
1 10
2 6
3 8
9 11
20 21
```

**Output**
```
3
```

**Explanation**

Between instants 3 and 6 the meetings `[1,10)`, `[2,6)` and `[3,8)` are all in progress at once, which is the busiest moment of the day.

## Notes

- The half-open rule is not a technicality — it is the difference between a correct and an incorrect answer on realistic back-to-back schedules. Handle the instant where one meeting ends and another begins with care.
- Times are large but the number of meetings is not; the clock values themselves are far too spread out to index directly.
- Meetings are given in no particular order, and many may share the same start or end time.
- With `n = 1` the answer is always 1.
