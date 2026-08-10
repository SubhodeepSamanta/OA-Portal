# Deployment Windows

A release engineer has `n` services to deploy. Service `i` needs `t[i]` minutes of deployer time, and all of that time must fall inside its maintenance window `[l[i], r[i]]` — it may not start before `l[i]` and must be completely finished by `r[i]`.

There is **one** deployer, so it can only work on one service at a time. It may sit idle whenever it likes.

A deployment **may be paused and resumed** as often as you like, at whole minutes, as long as every minute of its work lands inside its own window. Pausing costs nothing.

## Task

Decide whether all `n` services can be deployed. Print `YES` or `NO`.

## Input

```
Line 1:       n
Next n lines: l[i]  r[i]  t[i]
```

## Output

`YES` or `NO` (uppercase).

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  l[i]  <  r[i]  ≤  10^9
1  ≤  t[i]  ≤  10^9
```

## Sample 1

**Input**
```
2
0 5 3
0 5 3
```

**Output**
```
NO
```

**Explanation**

Six minutes of work must fit into the five minutes between 0 and 5. Nothing else needs checking.

## Sample 2

**Input**
```
2
0 10 3
0 10 3
```

**Output**
```
YES
```

## Sample 3

**Input**
```
1
5 7 2
```

**Output**
```
YES
```

**Explanation**

Exactly two minutes of work in a two-minute window — a perfect fit is still a fit.

## Sample 4

**Input**
```
2
0 10 5
4 6 2
```

**Output**
```
YES
```

**Explanation**

The second service is pinned: its two minutes can only be minutes 4 and 5. That splits the first service's window into `[0,4]` and `[6,10]`, four minutes each — not enough for five in one go, but fine when you are allowed to do four minutes, pause, and finish the last one later.

## Notes

- Two checks come free and settle many inputs. Each service must fit its own window, `t[i] ≤ r[i] − l[i]`; and over any stretch of time, the work that is *forced* into it cannot exceed its length.
- That second idea is the whole problem. For any interval `[a, b]`, every service whose window lies entirely inside it must do all its work inside it. So if the total `t` of those services exceeds `b − a`, the answer is `NO` — and it turns out that checking this for every `[a, b]` drawn from the endpoints is not only necessary but **sufficient**.
- You do not have to check all `O(n²)` intervals, though. Simulating instead is cheaper and easier to get right: sweep time, and whenever the deployer is free give it the available service with the **earliest deadline**. That rule — earliest deadline first — is optimal here, and if it ever misses a deadline then no schedule exists.
- Times reach `10^9`, so do not step minute by minute. The only interesting moments are window openings and completions, so jump between them: run the chosen service either until it finishes or until the next window opens, whichever comes first, and put the remainder back.
- Total work reaches `2 · 10^{14}`, so keep the clock and the remaining amounts in 64-bit.

## A note on this version

The original forbids pausing. That version — one machine, release times, deadlines, no preemption — is NP-hard, so no judge can hold a correct answer key for it at `n = 2 · 10^5`. Allowing pauses makes the feasibility question exactly solvable, and earliest-deadline-first is the reason why. Sample 4 is precisely a case the no-pausing version would reject, which is worth noticing: the two problems have genuinely different answers, and only one of them is decidable at this size.
