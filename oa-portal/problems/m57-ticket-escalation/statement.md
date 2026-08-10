# Ticket Escalation

A support desk holds `n` open tickets, numbered `1` through `n`. Ticket `i` has priority `p[i]`.

The desk runs on a strict hourly cycle:

1. The ticket with the **highest priority** is resolved and leaves the queue. If several are tied, the one with the **lowest number** goes first.
2. Every ticket still open then has its priority **raised by 1**, to stop old tickets languishing.

This repeats until the queue is empty.

## Task

Report the order in which the tickets are resolved.

## Input

```
Line 1:  n
Line 2:  p[1] p[2] ... p[n]
```

## Output

`n` integers on one line: the ticket numbers, in the order they are resolved.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  p[i]  ≤  10^9
```

## Sample 1

**Input**
```
3
5 3 9
```

**Output**
```
3 1 2
```

**Explanation**

Ticket 3 is highest at 9 and goes first. The rest are bumped to `6 4`, and ticket 1 is still ahead, so it goes next. Ticket 2 is left.

## Sample 2

**Input**
```
4
2 2 2 2
```

**Output**
```
1 2 3 4
```

**Explanation**

Everything is tied the whole way through, so the lowest number wins every hour.

## Sample 3

**Input**
```
1
7
```

**Output**
```
1
```

## Sample 4

**Input**
```
5
1 2 3 4 5
```

**Output**
```
5 4 3 2 1
```

## Notes

- Simulating this literally is `O(n²)` — each hour you scan for the maximum and then touch every survivor. At `2 · 10^5` tickets that is `4 · 10^{10}` updates.
- Before optimising the simulation, look hard at step 2. The escalation adds **1 to every open ticket**, without exception. Ask what that does to the *comparison* between any two open tickets.
- The answer is: nothing. If `p[a] > p[b]` now, then `p[a] + 1 > p[b] + 1`, and both remain open together for exactly the same hours. So the relative order never changes, no matter how many hours pass — the escalation is real, but it is not a tiebreaker and it never reorders anything.
- Which means the whole escalation rule can be deleted from the problem. What is left is: resolve in decreasing priority, breaking ties by ticket number. One sort.
- This is the kind of rule an OA includes to see whether you simulate what you are told or work out what actually matters. Both answers are "correct"; only one finishes in time.
- Beware the tie rule when sorting: equal priorities must come out in increasing ticket number, so sort by `(−priority, number)` or use a stable sort on a list already in number order.
