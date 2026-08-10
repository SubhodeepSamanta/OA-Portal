# Coin Row Duel

`n` coins lie in a row; coin `i` is worth `v[i]`. Two players take turns, the first player going first.

On a turn, a player takes **either the leftmost or the rightmost** remaining coin and keeps it. Play continues until no coins remain.

Both players play optimally, each maximising **their own** total — not minimising the other's.

## Task

Report the first player's final total.

## Input

```
Line 1:  n
Line 2:  v[1] v[2] ... v[n]
```

## Output

A single integer: the first player's total under optimal play by both.

## Constraints

```
1  ≤  n  ≤  2000
1  ≤  v[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 2 9 3
```

**Output**
```
10
```

**Explanation**

Taking the 3 on the right looks tempting but hands over the 9. Taking the 1 on the left instead leaves `2 9 3`, where whatever the opponent does the 9 comes back — the first player ends with `1 + 9 = 10` against the opponent's 5.

## Sample 2

**Input**
```
1
5
```

**Output**
```
5
```

## Sample 3

**Input**
```
2
3 7
```

**Output**
```
7
```

## Sample 4

**Input**
```
4
1 1 1 1
```

**Output**
```
2
```

## Notes

- Greedily taking the larger end is wrong, and Sample 1 is the counterexample — the best first move is the **smaller** of the two ends.
- The position is fully described by which coins remain, and since coins only ever leave from the ends, what remains is always a contiguous stretch `i … j`. That is only `O(n²)` positions, which is what makes this tractable.
- Let `best[i][j]` be the most the player **to move** can collect from that stretch. Taking coin `i` leaves the opponent to move on `i+1 … j`, where they will collect `best[i+1][j]` — so you get the rest, `sum(i+1, j) − best[i+1][j]`, on top of `v[i]`. Same for taking coin `j`. Take the better of the two.
- Note the subtlety in that recurrence: after the opponent's optimal play you receive **everything they do not take**, which is why the sum of the stretch appears. Modelling it as "opponent minimises my score" gives the same answer here but is the wrong mental model in general.
- Fill by increasing stretch length so both smaller stretches are ready. `2000 × 2000` entries of 8 bytes is 32 MB — fine, though a rolling row would do.
- Values reach `10^9` across 2000 coins, so totals reach `2 · 10^{12}`. Use 64-bit for the sums and the table.
