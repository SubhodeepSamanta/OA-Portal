# Counting Divisors

> **Mirrored from CSES 1713** — <https://cses.fi/problemset/task/1713>
> Solve it here, then paste the same code into the CSES submit box.

You are given `n` integers. For each one, report how many divisors it has.

## Input

```
Line 1:  n
Next n lines:  x
```

## Output

`n` lines: the number of divisors of each `x`.

## Constraints

```
1  ≤  n  ≤  100000
1  ≤  x  ≤  1000000
```

## Sample 1

**Input**
```
3
16
17
18
```

**Output**
```
5
2
6
```

**Explanation**

`16` has divisors `1, 2, 4, 8, 16`. `17` is prime. `18` has `1, 2, 3, 6, 9, 18`.

## Notes

- Testing every candidate up to `x` is `10^6` work per query and `10^{11}` overall. Trial division only up to `√x` cuts that to `10^3` per query, or `10^8` total — borderline, and it needs care with perfect squares (`d` and `x/d` are the same divisor when `d·d == x`).
- The clean answer exploits the fact that all `10^5` queries share one small universe: **`x ≤ 10^6`**. Precompute the divisor count for *every* value up to `10^6` once, then answer each query by lookup.
- The sieve is three lines and worth remembering:
  ```
  for (int d = 1; d <= LIMIT; d++)
      for (int m = d; m <= LIMIT; m += d)
          divisors[m]++;
  ```
  Each `d` marks its own multiples, so `divisors[m]` ends up counting exactly the `d` that divide `m`.
- Its cost is the harmonic sum `LIMIT·(1 + 1/2 + 1/3 + … )` ≈ `LIMIT · ln(LIMIT)` ≈ `1.4 × 10^7` — comfortably fast, and the same trick behind the Sieve of Eratosthenes.
- Read the constraints before choosing: the bound on `x` being *small* is what makes precomputation possible. If `x` reached `10^{18}` you would be forced back to factorisation. **The bound is the setter telling you the method.**
- An `int` array of `10^6` is 4 MB. Counts are tiny (at most 240 for `x ≤ 10^6`), so `int` is more than enough.
- Buffer the output — up to `10^5` lines.
