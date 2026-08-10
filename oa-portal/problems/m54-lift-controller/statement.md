# Lift Controller

A building has `f` floors, numbered `1` through `f`, and `e` lifts, numbered `1` through `e`. Every lift starts at floor `1` and is idle from time `0`.

A lift takes **one second per floor**. Doors open and close instantly.

`n` requests arrive. Request `i` is `(t, from, to)`: at time `t` somebody standing on floor `from` presses the button, wanting to go to floor `to`. Requests are listed in non-decreasing order of `t` and are assigned **one at a time, in that order**.

When a request is assigned, the controller looks at each lift as it will be once it has finished everything already assigned to it — say lift `j` becomes idle at time `free[j]`, standing at floor `at[j]`. That lift could begin travelling towards `from` at time `max(t, free[j])`, so it would arrive at

```
max(t, free[j]) + |at[j] − from|
```

The request goes to the lift that would **arrive soonest**. If several tie, it goes to the one with the **lowest number**.

That lift then carries the passenger, finishing at the arrival time plus `|from − to|`. It is now idle on floor `to`.

## Task

Report the completion time of each request, in input order.

## Input

```
Line 1:       f  e  n
Next n lines: t  from  to
```

## Output

`n` lines: the completion time of each request, in the order the requests were given.

## Constraints

```
1  ≤  f  ≤  200
1  ≤  e  ≤  10
1  ≤  n  ≤  10^5
1  ≤  t  ≤  10^9,   non-decreasing
1  ≤  from, to  ≤  f
```

`from` and `to` may be equal.

## Sample 1

**Input**
```
5 1 3
1 1 3
2 3 1
10 1 5
```

**Output**
```
3
5
14
```

**Explanation**

One lift, so every request waits for it.

It is already on floor 1, so the first request starts at once and reaches floor 3 at time **3**. The second request was pressed at time 2 but the lift is busy until 3; it is already on floor 3, so it goes straight down, finishing at **5**. The third is pressed at time 10, by which point the lift has been idle on floor 1 since time 5, so it runs 1 → 5 and finishes at **14**.

## Sample 2

**Input**
```
10 2 3
1 1 5
1 10 2
1 3 4
```

**Output**
```
5
18
4
```

**Explanation**

All three are pressed at time 1 but are assigned in order.

Request 1: both lifts are on floor 1 and would arrive at time 1, so the tie goes to lift 1. It finishes on floor 5 at time **5**.

Request 2: lift 1 is free at 5 on floor 5, so it would reach floor 10 at `5 + 5 = 10`. Lift 2 is free at 1 on floor 1, so it would reach floor 10 at `1 + 9 = 10` as well. A tie again, so lift 1 takes it, finishing at **18**.

Request 3: lift 1 is now busy until 18, but lift 2 has not moved. It reaches floor 3 at time 3 and finishes at **4**.

Note the completion times are not in increasing order — a later request can finish first.

## Sample 3

**Input**
```
3 1 1
5 2 2
```

**Output**
```
6
```

**Explanation**

The lift is on floor 1 and must still travel to floor 2 to collect the passenger, arriving at 6. The journey itself is zero floors.

## Notes

- Nothing here is algorithmically deep — `e ≤ 10` means comparing all lifts per request is only `10^6` comparisons total. The entire difficulty is reading the rule exactly and encoding it without drift.
- Three details do all the damage. A lift cannot start moving before the button is pressed *or* before it is free, hence the `max`. The travel to reach the passenger counts, so a lift that is "free" far away is not necessarily the best. And the tie-break is by lift number, not by whichever you happened to check first.
- Keep only two numbers per lift — when it next goes idle, and where. Anything more elaborate is a sign the rule has been misread.
- Times reach `10^9` and journeys accumulate on top of them, so completion times need 64-bit.
- `from == to` is legal, and it still costs the trip to reach the passenger. Sample 3 exists for that.
