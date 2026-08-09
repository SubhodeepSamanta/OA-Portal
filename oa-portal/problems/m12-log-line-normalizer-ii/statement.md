# Log Line Normalizer II

Same monitoring agent, same two event types, same target: a repaired log must read as one or more `a` events followed by one or more `b` events — the pattern `a⁺b⁺`, with at least one of each.

What has changed is the cost of repair. The archiver no longer charges a flat rate per deletion. It exposes three separate operations, and which one applies depends on **where the event sits at the moment you remove it**:

| Operation | Cost | Effect |
|---|---|---|
| `TRIM_FRONT` | `p` | delete the log's current **first** event |
| `TRIM_BACK` | `q` | delete the log's current **last** event |
| `SPLICE` | `r` | delete any event that is neither first nor last |

Operations may be applied in any order and any number of times. Because trimming shortens the log, repeated `TRIM_FRONT` operations peel events off the front one at a time, each charged `p`; repeated `TRIM_BACK` peel off the back at `q` each. Anything removed from strictly inside the surviving log is a `SPLICE` at `r`.

The three prices are unrelated — splicing may be cheaper or dearer than trimming, and the two trims may differ from each other.

## Task

Report the **minimum total cost** to make the log well-formed, or `-1` if it cannot be done.

## Input

```
Line 1:  s
Line 2:  p  q  r
```

## Output

One integer: the minimum total cost, or `-1` if the log cannot be made well-formed.

## Constraints

```
1  ≤  |s|  ≤  2 · 10^5
s contains only 'a' and 'b'
1  ≤  p, q, r  ≤  10^9
```

## Sample 1

**Input**
```
bab
5 1 1
```

**Output**
```
5
```

**Explanation**

The only usable pair is the `a` at position 2 and the `b` at position 3. Reaching them means removing the leading `b`, and a leading event can only go via `TRIM_FRONT` at cost `p = 5`.

Trimming from the back is cheaper at 1, but removing the trailing `b` leaves `ba`, which cannot be repaired. The answer is **5**.

## Sample 2

**Input**
```
abab
10 10 1
```

**Output**
```
1
```

**Explanation**

Keep the `a` at position 1, the `a` at position 3 and the `b` at position 4. The only event removed is the `b` at position 2, which sits strictly between the first and last surviving events — a `SPLICE` at cost `r = 1`.

Trimming would cost 10 per event here, so splicing the middle is far cheaper. Total **1**.

## Sample 3

**Input**
```
ba
1 1 1
```

**Output**
```
-1
```

**Explanation**

The `a` arrives after the `b` and deletions cannot reorder events, so no well-formed log is reachable at any price.

## Sample 4

**Input**
```
bbaabb
1 1 100
```

**Output**
```
2
```

**Explanation**

Splicing is expensive at 100, but the two leading `b` events sit at the front and can be trimmed at 1 each. That leaves `aabb`, already well-formed. Total **2**.

## Notes

- The surviving log must contain at least one `a` and at least one `b`.
- Cost depends on **position at the time of removal**, not on the original index. An event becomes trimmable once everything outside it has gone — which is exactly why a leading run can always be peeled off at `p` each.
- Equivalently: whatever you keep, the events removed before the first survivor were trimmed from the front, those after the last survivor were trimmed from the back, and everything else removed was spliced.
- With `|s|` up to `2 · 10^5` and three independent prices, a quadratic search over start and end positions will not finish. Both ends can be optimised while sweeping the split point.
- Costs reach `2 · 10^14`. Use 64-bit arithmetic.
