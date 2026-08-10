# Token Refill

An API is rate-limited with a token bucket. The bucket holds at most `C` tokens and **starts completely full at time 0**. It refills at exactly **1 token per second**, and never goes above `C` — tokens that would overflow are simply lost.

`n` requests arrive. Request `i` arrives at time `t[i]` and needs `c[i]` tokens:

- if the bucket holds **at least** `c[i]` tokens at that moment, the request is **served** and those tokens are removed;
- otherwise it is **rejected** and consumes nothing at all — the bucket is left exactly as it was.

Arrival times are strictly increasing.

## Task

Report how many requests are served.

## Input

```
Line 1:       n  C
Next n lines: t[i]  c[i]
```

## Output

A single integer: the number of requests served.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  C  ≤  10^9
1  ≤  t[i]  ≤  10^9,   strictly increasing
1  ≤  c[i]  ≤  10^9
```

## Sample 1

**Input**
```
3 5
1 3
2 3
10 5
```

**Output**
```
3
```

**Explanation**

At time 1 the bucket is full at 5 — it was already full, and the one second that passed added nothing. The request takes 3, leaving 2.

At time 2 one second has refilled one token, so the bucket holds 3. The request needs exactly 3 and is served, leaving 0.

At time 10 eight seconds have passed, but the bucket caps at **5**, not 8. The request takes all 5. All **3** served.

## Sample 2

**Input**
```
2 2
1 3
5 2
```

**Output**
```
1
```

**Explanation**

The first request wants 3 tokens from a bucket that can never hold more than 2, so it is rejected — and, crucially, takes nothing. The bucket is still at 2 when the second request arrives and is served.

## Sample 3

**Input**
```
4 3
1 3
2 3
3 3
10 3
```

**Output**
```
2
```

**Explanation**

The first request drains the bucket. The next two arrive before it has refilled to 3 and are rejected. By time 10 it is full again and the last is served.

## Sample 4

**Input**
```
1 1000000000
1 1000000000
```

**Output**
```
1
```

## Notes

- Simulating second by second is the obvious reading and it is fatal: times go to `10^9`. You only ever need the bucket's level **at an arrival**, and there are just `n` of those.
- Between two consecutive arrivals the level goes up by the gap in seconds, capped at `C`. That is one `min` per request, and the whole problem is `O(n)`.
- The cap is where this is usually got wrong. `tokens + gap` can be enormous — a gap approaching `10^9` on top of a level near `10^9` — so clamp with `min` rather than assuming it stays small, and keep it in 64-bit before the clamp.
- A rejected request must leave the bucket untouched. Subtracting anyway, or clamping the level to `0`, changes later answers and is the bug this problem is really testing.
- `c[i]` may exceed `C` outright, in which case that request can never be served no matter how long you wait.
- The bucket starts **full**, not empty, and time starts at `0` while the first arrival can be as late as `10^9`.
