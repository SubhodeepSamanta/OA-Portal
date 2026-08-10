# Delivery Windows

A courier has one van and `n` parcels to deliver. Parcel `i` may only be delivered during the window `[s[i], e[i]]`, and each delivery takes exactly **one hour**.

The van starts a delivery on a whole hour. Starting parcel `i` at hour `t` is allowed when `s[i] ≤ t ≤ e[i]`. The van can only do one delivery per hour, and it may idle whenever it likes.

Not every parcel can necessarily be delivered.

## Task

Report the largest number of parcels the van can deliver.

## Input

```
Line 1:       n
Next n lines: s[i]  e[i]
```

## Output

A single integer: the maximum number of deliveries.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  s[i]  ≤  e[i]  ≤  10^9
```

## Sample 1

**Input**
```
3
1 2
1 1
2 2
```

**Output**
```
2
```

**Explanation**

All three parcels want hour 1 or hour 2, and only two hours are usable, so at most two can go. Deliver parcel 2 at hour 1 and parcel 1 at hour 2, and parcel 3 misses out.

## Sample 2

**Input**
```
1
5 5
```

**Output**
```
1
```

## Sample 3

**Input**
```
3
1 10
1 10
1 10
```

**Output**
```
3
```

**Explanation**

Plenty of room — hours 1, 2 and 3.

## Sample 4

**Input**
```
4
1 1
1 1
2 2
3 3
```

**Output**
```
3
```

**Explanation**

Two parcels both insist on hour 1, so one of them is lost. The other three take hours 1, 2 and 3.

## Notes

- The instinct to sort by **start** time is wrong here. Consider `[1,2]` and `[1,1]`: taking the roomy one first steals hour 1 and strands the parcel that had nowhere else to go.
- Sort by **deadline** instead, and give each parcel the earliest hour it can still use. Handling the most urgent parcel first never costs you anything, and using the earliest available hour leaves the latest hours free for whatever comes next — those are the two exchange arguments worth writing out.
- The remaining problem is "what is the first free hour at or after `s`?" with hours being consumed as you go. Hours run to `10^9`, so you cannot keep an array of them.
- But you only ever occupy at most `n` hours. Keep a map from an occupied hour to "the next hour worth trying", and follow that chain, compressing it as you go — the same trick as a disjoint-set union with path compression. Each lookup is then effectively constant.
- Once you find that hour, check it is still within `e[i]`; if it is not, this parcel simply cannot be delivered and you move on.
- Nothing overflows: the answer is at most `n`. The difficulty is entirely in the ordering argument and in searching a range of `10^9` hours without touching them all.
