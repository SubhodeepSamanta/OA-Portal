# Subarray Divisibility

> **Mirrored from CSES 1662** — <https://cses.fi/problemset/task/1662>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses, so a
> solution that passes here passes there.

You are given an array of `n` integers.

## Task

Count the subarrays (contiguous, non-empty) whose sum is divisible by `n`.

Note that the divisor is `n` itself — the length of the array, not a separate input.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: how many subarrays have a sum divisible by `n`.

## Constraints

```
1  ≤  n     ≤  200000
-10^9  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
5
3 1 2 7 4
```

**Output**
```
1
```

**Explanation**

Exactly one subarray works: positions 2 to 4, values `1 + 2 + 7 = 10`, which is divisible by 5.

The prefix sums are `0, 3, 4, 6, 13, 17`, with residues `0, 3, 4, 1, 3, 2` mod 5. The only repeated residue is `3`, at prefixes 1 and 4 — and that pair is precisely the subarray above.

## Notes

- The subarray `a[i..j]` has sum `P[j] − P[i−1]` where `P` is the prefix-sum array. That sum is divisible by `n` exactly when `P[j] ≡ P[i−1] (mod n)`.
- So the answer is: over all `n + 1` prefix sums `P[0..n]`, count the pairs sharing a residue. If a residue occurs `c` times it contributes `c·(c−1)/2` pairs.
- Keep a count array of size `n` and add the running tally as you go — one pass, `O(n)` time.
- **The trap is negative values.** In C++ and Java, `%` on a negative operand gives a negative (or zero) result, so `-7 % 5` is `-2`, not `3`. Indexing a count array with that is undefined behaviour in C++ and an exception in Java. Normalise with `((p % n) + n) % n`.
- Second trap: `P[n]` can reach `2·10^5 · 10^9 = 2·10^{14}`, and the answer can reach `n(n+1)/2 ≈ 2·10^{10}`. Both need a 64-bit type. A 32-bit accumulator is wrong in two separate places.
- Do not forget `P[0] = 0` — it is a genuine prefix and the subarrays starting at index 1 depend on it. Initialise the count of residue 0 to 1 before the loop.
