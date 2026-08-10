# Rate Limiter

An API gateway enforces a per-user limit: **at most `k` accepted requests within any rolling window of `w` seconds**.

Requests arrive in non-decreasing time order. A request from user `u` at time `t` is **accepted** when the number of that user's already-accepted requests with timestamp **greater than `t − w`** is less than `k`. Otherwise it is **rejected**, and a rejected request is not recorded — it does not count against the user later.

## Task

For each request in order, report whether it was accepted.

## Input

```
Line 1:       q  k  w
Next q lines: userId  timestamp
```

Timestamps are non-decreasing across the whole file.

## Output

One line containing exactly `q` characters: `1` where the request was accepted and `0` where it was rejected, in order and with no separators.

## Constraints

```
1  ≤  q  ≤  10^6
1  ≤  k  ≤  10^5
1  ≤  w  ≤  10^9
1  ≤  userId  ≤  10^6
1  ≤  timestamp  ≤  10^9
```

## Sample 1

**Input**
```
5 2 10
1 1
1 2
1 3
1 11
2 3
```

**Output**
```
11011
```

**Explanation**

User 1's first two requests are accepted. The third, at time 3, would be a third within the last 10 seconds, so it is rejected. By time 11 the request from time 1 has fallen outside the window — `1 > 11 − 10` is false — so there is room again. User 2 has its own independent budget.

## Sample 2

**Input**
```
3 1 5
1 1
1 5
1 6
```

**Output**
```
101
```

**Explanation**

At time 5 the earlier request at time 1 is still inside the window, since `1 > 0`. At time 6 it is not, since `1 > 1` is false.

## Sample 3

**Input**
```
4 1 100
1 1
2 1
1 2
2 2
```

**Output**
```
1100
```

## Notes

- Each user is independent, so the state is per user — but you cannot afford a full history each. With `10^6` requests the total stored must stay proportional to what is **currently relevant**, not to everything ever seen.
- What you actually need per user is the accepted timestamps still inside the window. Keep them in a queue: on each request, discard from the front everything at or before `t − w`, then accept exactly when fewer than `k` remain.
- Every timestamp is pushed once and popped once, so the discarding is amortised constant even though its loop looks unbounded.
- A rejected request must **not** be recorded. Storing it anyway is the single most common bug here, and it makes the limiter far stricter than specified — Sample 1's fourth request would then still be blocked.
- Note also that you never need more than `k` entries for a user, since the queue is trimmed before every decision. That is what bounds the memory.
- Because timestamps only ever move forward, no sorting is needed anywhere.
- With `10^6` answers, build one output buffer; printing per request will dominate the runtime.
