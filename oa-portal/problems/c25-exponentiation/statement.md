# Exponentiation

> **Mirrored from CSES 1095** — <https://cses.fi/problemset/task/1095>
> Solve it here, then paste the same code into the CSES submit box.

Calculate `a^b` modulo `10^9 + 7` for each of `n` pairs.

Note that `0^0` is defined as `1`.

## Input

```
Line 1:  n
Next n lines:  a  b
```

## Output

`n` lines: each `a^b mod (10^9 + 7)`.

## Constraints

```
1  ≤  n     ≤  200000
0  ≤  a, b  ≤  10^9
```

## Sample 1

**Input**
```
3
3 4
2 8
123 123
```

**Output**
```
81
256
921450052
```

## Notes

- Multiplying `b` times is `10^9` operations per query. **Binary exponentiation** does it in about 30, by squaring:
  ```
  long long power(long long base, long long exp, long long mod) {
      long long result = 1;
      base %= mod;
      while (exp > 0) {
          if (exp & 1) result = result * base % mod;
          base = base * base % mod;
          exp >>= 1;
      }
      return result;
  }
  ```
  The idea is just `a^b = (a^{b/2})^2`, halving the exponent each step — the same halving that makes binary search and binary lifting fast.
- **The overflow.** `base` and `result` are each under `10^9 + 7`, so their product reaches about `10^{18}`. That fits in a signed 64-bit integer (max ≈ `9.2 × 10^{18}`) but overflows a 32-bit one instantly. Both the multiplication operands must be 64-bit — writing `int base` and relying on the assignment to widen the result is the classic failure, because the multiplication happens *before* the widening.
- Reduce `base %= mod` before the loop. It is already small here given `a ≤ 10^9`, but the habit costs nothing and saves you when `a` is larger.
- Edge cases the constraints hand you deliberately: `b = 0` must give `1` (the loop does this naturally, since `result` starts at 1), and `a = 0` with `b = 0` must also give `1`. Special-casing `0^0` by hand is unnecessary — but check that your loop gets it right rather than assuming.
- `O(n log b)` overall, about `6 × 10^6` operations. Buffer the output.
