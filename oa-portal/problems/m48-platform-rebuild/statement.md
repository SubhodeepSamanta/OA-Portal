# Minimum Platform Rebuild

A station is being redesigned. `n` trains are scheduled; train `i` occupies a platform for every minute from `a[i]` to `d[i]` **inclusive**. Two trains whose intervals share even a single minute cannot use the same platform — including trains that merely touch, since `[3, 5]` and `[5, 9]` both need minute 5.

The number of platforms the station must build is the largest number of trains present at any one minute.

The planners are allowed to **cancel at most one train** from the timetable — or none at all, if cancelling does not help.

## Task

Report the smallest number of platforms needed after cancelling at most one train.

## Input

```
Line 1:       n
Next n lines: a[i]  d[i]
```

## Output

A single integer: the minimum number of platforms.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  a[i]  ≤  d[i]  ≤  10^9
```

## Sample 1

**Input**
```
3
1 5
2 6
7 8
```

**Output**
```
1
```

**Explanation**

As scheduled, minutes 2 to 5 hold two trains, so two platforms are needed. Cancelling either of the first two leaves no minute with more than one train, so **1** platform suffices.

## Sample 2

**Input**
```
3
1 10
1 10
1 10
```

**Output**
```
2
```

**Explanation**

Three trains all present at once. Removing one still leaves two overlapping, and you only get one cancellation.

## Sample 3

**Input**
```
1
5 5
```

**Output**
```
0
```

**Explanation**

Cancel the only train and the station needs no platforms at all.

## Sample 4

**Input**
```
4
1 2
1 2
3 4
3 4
```

**Output**
```
2
```

**Explanation**

Two platforms are needed at minutes 1–2, and two again at minutes 3–4. No single cancellation can relieve both busy stretches, because no train spans them. The answer stays **2** — cancelling is allowed, not compulsory, and here it buys nothing.

## Notes

- Start with the easy half: without any cancellation the answer is the peak number of overlapping trains, found by sorting the arrivals and departures into one event list and sweeping.
- Now the cancellation. Removing one train lowers the count by exactly 1 at the minutes it covers and by 0 everywhere else. So the answer is either the peak `M` or `M − 1`, never less — and it is `M − 1` precisely when some single train covers **every** minute where the count reaches `M`.
- That test sounds expensive but is not. A train occupies a contiguous stretch, so it covers all the peak minutes exactly when it covers the earliest one and the latest one. Find those two minutes during the sweep, then one pass over the trains answers the question.
- Sample 4 is the case that punishes a solution which only ever looks at one busy stretch: there are two peaks, far apart, and no train reaches both.
- Intervals are **closed**. Treating `[3,5]` and `[5,9]` as compatible undercounts the peak, and it is the single most common way to get this wrong. Sweeping with `+1` at `a` and `−1` at `d + 1` gets it right.
- Coordinates reach `10^9`, so you cannot build an array over minutes — the sweep must work on the `2n` event coordinates alone.
