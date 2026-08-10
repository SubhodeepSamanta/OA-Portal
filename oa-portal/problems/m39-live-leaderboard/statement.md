# Live Leaderboard

A contest site shows a live leaderboard for `n` players, numbered `1` through `n`. Everybody starts on a score of `0`.

`q` events then arrive, each one of:

- **`UPDATE p s`** — player `p`'s score becomes `s`. This is a replacement, not an increase; their old score is discarded.
- **`RANK p`** — report how many players currently have a score **strictly higher** than player `p`'s.

Players tied with `p` are not counted, and neither is `p`.

## Task

Answer every `RANK` event, in order.

## Input

```
Line 1:      n  q
Next q lines: either  UPDATE p s   or   RANK p
```

## Output

One line per `RANK` event.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  q  ≤  2 · 10^5
1  ≤  p  ≤  n
0  ≤  s  ≤  10^9
```

## Sample 1

**Input**
```
3 5
RANK 1
UPDATE 1 10
RANK 2
RANK 1
UPDATE 2 20
```

**Output**
```
0
1
0
```

**Explanation**

At the start everyone is on `0`, so nobody is strictly above player 1 — **0**.

After player 1 moves to 10, player 2 is still on 0 and has one player above them — **1**.

Player 1 is now top, so nobody is above them — **0**.

The final `UPDATE` prints nothing.

## Sample 2

**Input**
```
2 3
UPDATE 1 5
UPDATE 2 5
RANK 1
```

**Output**
```
0
```

**Explanation**

Both players are on 5. Ties are **not** counted as higher, so the answer is 0, not 1.

## Sample 3

**Input**
```
4 4
UPDATE 1 100
UPDATE 2 50
UPDATE 3 100
RANK 2
```

**Output**
```
2
```

**Explanation**

Players 1 and 3 are both above player 2. Player 4 is still on `0`, which is below.

## Sample 4

**Input**
```
1 1
RANK 1
```

**Output**
```
0
```

## Notes

- Counting players above someone by scanning everybody is `O(n)` per query and `4 · 10^{10}` at the limits. Re-sorting after each update is no better.
- What you actually need is a running count of "how many players sit at each score", supporting two things quickly: move one player from one score to another, and total up everything at or below a given score. Both are prefix-sum questions over the score axis.
- The score axis is `0 … 10^9`, far too wide for an array. But only the scores that actually appear can ever be asked about — at most `q` values from the updates, plus the starting `0`. Read the whole input first, collect those values, sort them, and work with positions in that list instead.
- Then `RANK p` is `n` minus the number of players at or below `p`'s score. Watch the boundary: "at or below" is what makes ties come out right, and Sample 2 exists to catch the off-by-one.
- An `UPDATE` that sets the score a player already has must leave the totals unchanged — decrement then increment, and it takes care of itself.
- Answers are at most `n`, so nothing overflows; this one is about the structure, not the arithmetic.
