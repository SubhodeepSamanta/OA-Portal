# Finding Borders

> **Mirrored from CSES 1732** — <https://cses.fi/problemset/task/1732>
> Solve it here, then paste the same code into the CSES submit box.

A **border** of a string is a prefix that is also a suffix of that string, but is not the whole string.

Report the lengths of all borders, in increasing order.

## Input

```
Line 1:  a string of length n, lowercase a-z
```

## Output

The border lengths in increasing order, separated by spaces.

If the string has no borders, print an empty line.

## Constraints

```
1  ≤  n  ≤  1000000
```

## Sample 1

**Input**
```
abcababcab
```

**Output**
```
2 5
```

**Explanation**

`ab` is both a prefix and a suffix. So is `abcab`. The whole string does not count.

## Notes

- Comparing each candidate prefix against the matching suffix is `O(n)` per length and `O(n^2)` overall — `10^{12}` at the limit.
- The **prefix function** from KMP gives every border for free. `fail[i]` is the length of the longest proper prefix of `s[0..i]` that is also a suffix of it — so `fail[n−1]` is the **longest** border of the whole string.
- The rest follow by chaining: the next-longest border is `fail[fail[n−1] − 1]`, and so on down to 0. That is the key structural fact — *the borders of a string are exactly the values you get by repeatedly applying the failure function from the end*, and it is worth convincing yourself of once, because it is why KMP's fallback is correct too.
- So: walk `k = fail[n−1]`, then `k = fail[k−1]`, collecting each `k > 0`, then reverse for increasing order.
- Building the prefix function is `O(n)`:
  ```
  for (int i = 1, k = 0; i < n; i++) {
      while (k > 0 && s[i] != s[k]) k = fail[k - 1];
      if (s[i] == s[k]) k++;
      fail[i] = k;
  }
  ```
- Watch the boundary: `n = 1` has no borders at all, and the output is an empty line rather than `0`. Printing a `0` is the most common way this fails.
- The `while` loop looks quadratic but is not — `k` rises by at most 1 per character, so it can fall at most `n` times in total. That amortised argument is the whole reason KMP is linear.
- With `n = 10^6`, read the line with `scanf("%s")` into a static buffer and buffer the output.
