# Common Divisors

> **Mirrored from CSES 1081** — <https://cses.fi/problemset/task/1081>
> Solve it here, then paste the same code into the CSES submit box.

You are given `n` positive integers. Find two of them (at distinct positions) whose greatest common divisor is as large as possible.

## Input

```
Line 1:  n
Line 2:  x[1] x[2] ... x[n]
```

## Output

A single integer: the maximum possible gcd of any two of the values.

## Constraints

```
2  ≤  n     ≤  200000
1  ≤  x[i]  ≤  1000000
```

## Sample 1

**Input**
```
5
3 14 15 7 9
```

**Output**
```
7
```

**Explanation**

`gcd(14, 7) = 7`, and no pair does better.

## Notes

- Trying every pair is `O(n^2)` gcd calls — `2·10^{10}` at the limit.
- Turn the question around. Instead of asking *"what is the gcd of this pair?"*, ask *"for each candidate `d`, do at least two of the values have `d` as a divisor?"* The answer is the largest `d` for which that holds.
- The values live in a small universe (`x ≤ 10^6`), so:
  1. Build `present[v]` — how many times each value occurs.
  2. For each `d` from 1 to `10^6`, count how many inputs are multiples of `d` by summing `present[d] + present[2d] + present[3d] + …`.
  3. The answer is the largest `d` whose count is at least 2.
- That inner sweep is the harmonic sum again — `10^6 · ln(10^6)` ≈ `1.4 × 10^7`. Sweeping `d` downwards lets you stop at the first hit.
- **Count occurrences, not distinct values.** If the input contains `7` twice, then `d = 7` has a valid pair even though only one distinct value is involved. Using a boolean `seen[]` instead of a counter silently misses those cases — and duplicates are explicitly allowed here.
- The same "iterate over divisors and count multiples" shape solves a family of problems (counting coprime pairs, summing gcds over all pairs). Recognising it is worth more than the specific answer.
- Values fit in `int` throughout; nothing is summed to a large total.
