# Parking Lot Revenue

A car park has `k` identical bays. Over one day `n` cars turn up. Car `i` arrives at minute `a[i]` and, **if it gets in**, leaves at minute `d[i]`.

Cars are handled strictly in arrival order. When a car arrives:

- if some bay is free, it parks and holds that bay for the half-open stretch `[a[i], d[i])` — the bay frees again exactly at minute `d[i]`, so a car arriving at that same minute can take it;
- if every bay is occupied, the driver gives up and leaves immediately. They do **not** wait, and they do not come back.

The park charges ₹1 per minute for every occupied bay. A car that parks from minute 3 to minute 10 therefore pays ₹7.

## Task

Report the total revenue for the day.

## Input

```
Line 1:       n  k
Next n lines: a[i]  d[i]
```

Cars are listed in non-decreasing order of arrival. Cars arriving in the same minute are handled in the order listed.

## Output

A single integer: the total revenue.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  k  ≤  10^5
1  ≤  a[i]  <  d[i]  ≤  10^9
```

## Sample 1

**Input**
```
3 1
1 5
2 3
5 8
```

**Output**
```
7
```

**Explanation**

One bay. The first car takes it from 1 to 5 and pays ₹4. The second arrives at 2, finds the bay taken, and drives off paying nothing. The third arrives at 5 — exactly when the bay frees — parks until 8 and pays ₹3.

Total **₹7**. Note the second car would have fitted easily *later*; arrival order is not negotiable.

## Sample 2

**Input**
```
3 2
1 10
2 3
2 4
```

**Output**
```
10
```

**Explanation**

Car 1 takes a bay until 10 (₹9). Car 2 takes the other until 3 (₹1). Car 3 arrives at 2 with both bays full and is turned away — even though a bay frees one minute later.

## Sample 3

**Input**
```
2 2
1 100
1 100
```

**Output**
```
198
```

## Sample 4

**Input**
```
4 1
1 100
2 3
3 4
4 5
```

**Output**
```
99
```

**Explanation**

One long stay blocks the only bay all day and three short, profitable cars are lost. Turning the first car away would have earned more — but you do not get to choose, and neither does the park.

## Notes

- Revenue is not "sum of all stay lengths". Only the cars that actually park pay, and Sample 4 exists to make that concrete.
- Keeping an array of `k` bays and scanning it for a free one is `O(k)` per car — `2 · 10^{10}` at the limits. But notice you never need to know *which* bay is free, only **whether** one is. That is a much cheaper question.
- Since arrivals come in order, every bay that is going to free up before this car arrives is one whose occupant has the earliest departure time. So keep the occupied bays' departure times where the smallest is always to hand, discard the ones that have already passed, and check whether fewer than `k` remain.
- The half-open rule matters: a bay freeing at exactly minute `d` is available to a car arriving at `d`. Sample 1's third car depends on it.
- `2 · 10^5` stays of up to `10^9` minutes reach `2 · 10^{14}`. Accumulate in 64-bit.
