# Factory Machines

> **Mirrored from CSES 1620** — <https://cses.fi/problemset/task/1620>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

A factory has `n` machines and needs to produce `t` products in total.

Machine `i` takes `k[i]` seconds to make one product. All machines run at the same time, and you choose how many products each one makes.

## Task

Report the smallest number of seconds in which `t` products can be finished.

## Input

```
Line 1:  n  t
Line 2:  k[1] k[2] ... k[n]
```

## Output

A single integer: the minimum time.

## Constraints

```
1  ≤  n     ≤  200000
1  ≤  t     ≤  10^9
1  ≤  k[i]  ≤  10^9
```

## Sample 1

**Input**
```
3 7
3 2 5
```

**Output**
```
8
```

**Explanation**

In 8 seconds machine 1 makes 2 products (6 seconds used), machine 2 makes 4 (8 seconds), and machine 3 makes 1 (5 seconds). That is 7 products.

## Notes

- Do not try to build the schedule. Ask the **decision question** instead: *given `T` seconds, can we make at least `t` products?* In `T` seconds machine `i` finishes `T / k[i]` products (integer division), so the answer to that question is `Σ ⌊T / k[i]⌋ ≥ t`.
- That predicate is monotone — if `T` works, so does `T + 1` — which is exactly what binary search needs. Search for the smallest `T` that works.
- Choosing the search range is part of the problem. `lo = 1` is safe. For `hi`, one machine alone can do it: `hi = t · min(k[i])`, which reaches `10^9 · 10^9 = 10^{18}`. That fits in a signed 64-bit integer (max ≈ `9.2 · 10^{18}`) but leaves no room to be careless.
- **The overflow that catches almost everyone** is inside the predicate, not in `hi`. With `n = 2·10^5` machines and `T = 10^{18}`, the sum `Σ ⌊T / k[i]⌋` can reach `2·10^{23}`, which overflows `long long` and wraps to something negative — so the check `sum >= t` fails, the search walks the wrong way, and the answer comes out far too large. Fix it by **breaking out of the loop the moment `sum >= t`**. Once you know you have enough, the exact total is irrelevant.
- Complexity is `O(n log(t · min k))`, about `60 n` — comfortably fast.
- Sanity check your bounds with `n = 1`: the answer is exactly `t · k[1]`, and if that is `10^{18}` your `hi` must be able to represent it.
