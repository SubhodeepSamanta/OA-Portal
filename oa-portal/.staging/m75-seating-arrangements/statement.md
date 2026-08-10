# Seating Arrangements

A lecture hall has a row of `r` chairs and `n` students waiting outside. Exactly `r` of them will be let in to fill the row, and the rest wait for the next session.

Only **which students get in** matters. The order they sit in does not — two outcomes with the same set of seated students count as one.

`q` independent questions are asked, each with its own `n` and `r`.

## Task

For each question, report the number of possible sets of seated students, **modulo `10^9 + 7`**.

## Input

```
Line 1:       q
Next q lines: n  r
```

## Output

`q` lines, one answer each.

## Constraints

```
1  ≤  q  ≤  2 · 10^5
0  ≤  n  ≤  2 · 10^5
0  ≤  r  ≤  2 · 10^5
```

Note that `r` may exceed `n`.

## Sample 1

**Input**
```
4
5 2
5 0
5 5
6 3
```

**Output**
```
10
1
1
20
```

**Explanation**

Choosing 2 students from 5 can be done 10 ways. Choosing none, or choosing all of them, can each be done exactly one way. Choosing 3 from 6 gives 20.

## Sample 2

**Input**
```
2
3 5
0 0
```

**Output**
```
0
1
```

**Explanation**

Five chairs cannot be filled from three students, so there are **no** valid outcomes. With no students and no chairs there is exactly one outcome — the empty one — which is not the same as zero.

## Sample 3

**Input**
```
1
10 5
```

**Output**
```
252
```

## Notes

- This is `C(n, r)` — order does not matter, so it is not `n!/(n−r)!`. Read that line of the statement carefully; it is the difference between this problem and a much larger answer.
- Computing each answer from scratch is far too slow across `2 · 10^5` questions. Precompute every factorial up to the largest `n` once, then each answer is `n! · (r!)^{-1} · ((n−r)!)^{-1}`.
- Division is not available modulo a prime, so those inverses are modular ones. Two facts make this cheap: `10^9 + 7` is prime, so `x^{-1} = x^{p−2}` by Fermat; and rather than doing a power per query, compute the inverse of the *largest* factorial once and walk backwards, since `(k−1)!^{-1} = k!^{-1} · k`. That is one modular power for the whole problem.
- Guard the degenerate cases before indexing anything: `r > n` is `0`, and `r = 0` or `r = n` is `1`. `C(0, 0)` is `1`, not `0` — the empty choice exists.
- Every multiplication of two residues reaches `10^{18}`, so hold them in 64-bit and reduce after each step.
