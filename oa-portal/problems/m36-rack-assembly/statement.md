# Rack Assembly

A data centre is commissioning `n` servers into a rack with exactly `n` positions. Both are numbered `1` through `n`.

Bolting server `i` into position `j` costs `c[i][j]` — cable runs, airflow penalties and the like, so the cost table has no structure you can lean on.

Every server takes exactly one position, and every position takes exactly one server.

## Task

Report the smallest possible total cost of commissioning all `n` servers.

## Input

```
Line 1:      n
Next n rows: c[i][1] c[i][2] ... c[i][n]
```

Row `i` is the cost of putting server `i` in each position in turn.

## Output

A single integer: the minimum total cost.

## Constraints

```
1  ≤  n  ≤  18
0  ≤  c[i][j]  ≤  10^6
```

## Sample 1

**Input**
```
3
1 2 3
1 5 6
1 8 9
```

**Output**
```
9
```

**Explanation**

Every server is cheapest in position 1, but only one of them can have it — so the obvious greedy immediately breaks.

The best assignment is server 1 → position 2 (2), server 2 → position 3 (6), server 3 → position 1 (1), totalling **9**. Giving position 1 to server 1 instead forces `1 + 5 + 9 = 15`.

## Sample 2

**Input**
```
2
1 100
2 3
```

**Output**
```
4
```

**Explanation**

Two choices only: `1 + 3 = 4`, or `100 + 2 = 102`.

## Sample 3

**Input**
```
1
7
```

**Output**
```
7
```

## Sample 4

**Input**
```
3
0 0 0
0 0 0
0 0 0
```

**Output**
```
0
```

## Notes

- Greedy is wrong and Sample 1 says so. Sorting by cheapest cost, or by cheapest row, or by "regret" — all of them lose to some table, because every choice removes a position from everyone else.
- Trying every assignment is `18!`, about `6 · 10^{15}`. Also out.
- So look hard at `n ≤ 18`. That bound is doing all the talking. It is far too small for a problem with an efficient general solution, and it is exactly the size where a subset of the positions fits in one machine word — `2^{18}` is only `262144`.
- That reframes the search. Commission the servers in order, `1, 2, 3, …`; then the only thing that matters about the past is **which set of positions is already taken**, not who took them. The number of servers placed so far is just how many bits that set has.
- Total states `2^n`, each with at most `n` moves out: about `4.7 · 10^6` steps at the limit.
- Costs are small but there are 18 of them, so the total stays well inside 32 bits. That is one of the few problems here where it genuinely does.
