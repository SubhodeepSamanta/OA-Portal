# Room Allocation

> **Mirrored from CSES 1164** — <https://cses.fi/problemset/task/1164>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses, so a
> solution that passes here passes there.

A hotel takes `n` bookings. Booking `i` arrives on day `a[i]` and departs on day `b[i]`, and needs one room for that whole stay.

Two bookings can be given the **same** room only if one departs strictly before the other arrives. Sharing a day is not allowed — a guest departing on day 4 does not free the room for a guest arriving on day 4.

## Task

Use as few rooms as possible, and say which room each booking gets.

## Input

```
Line 1:      n
Next n lines: a[i]  b[i]
```

## Output

```
Line 1:  k     — the minimum number of rooms
Line 2:  n room numbers, one per booking, in input order, each in 1..k
```

## Constraints

```
1  ≤  n           ≤  200000
1  ≤  a[i] ≤ b[i] ≤  10^9
```

## Sample 1

**Input**
```
3
1 2
2 4
4 4
```

**Output**
```
2
1 2 1
```

**Explanation**

Bookings 1 and 2 overlap on day 2, so they need different rooms. Booking 3 arrives on day 4; booking 1 left on day 2, so room 1 is free again. Two rooms is the minimum.

## Notes

- **Many answers are accepted.** The room *numbering* is not unique — `2 / 2 1 2` is just as correct as `2 / 1 2 1`. This problem is graded by a checker, not by string comparison: it verifies that you used the minimum `k`, that every booking got a room in `1..k`, and that no two bookings sharing a room overlap. That matches how CSES grades it.
- The minimum number of rooms equals the **largest number of bookings that are all in the hotel on some single day**. You cannot do better than that (they all need separate rooms), and the greedy below always achieves it.
- Process bookings in **order of arrival**. Keep the rooms currently in use in a min-heap keyed by the day they free up.
  - If the earliest-freeing room frees up strictly before the current arrival, reuse it: pop, assign, push back with the new departure day.
  - Otherwise open a new room.
- That is `O(n log n)`. The heap is what makes it fast — a linear scan over rooms is `O(n·k)` and dies when `k` grows to `n` (which happens when every booking overlaps every other).
- Output order matters: you sort by arrival to *decide*, but you must print the answers back in **input order**. Carry the original index through the sort.
- Watch the strictness. The reuse test is `earliest_free < arrival`, not `≤`. Getting that backwards is off by exactly one room on cases like the sample, and it is the most common way this one fails.
- `a` and `b` reach `10^9`, which fits a 32-bit int, but there is no reason not to use 64-bit here.
