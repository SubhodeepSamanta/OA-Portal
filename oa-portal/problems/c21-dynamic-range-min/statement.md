# Dynamic Range Minimum Queries

> **Mirrored from CSES 1649** — <https://cses.fi/problemset/task/1649>
> Solve it here, then paste the same code into the CSES submit box.

You are given an array of `n` integers and must process `q` queries of two kinds:

```
1 k u    set the value at position k to u
2 a b    report the minimum value in positions a..b
```

Positions are 1-indexed.

## Input

```
Line 1:  n  q
Line 2:  x[1] x[2] ... x[n]
Next q lines:  a query, in one of the two forms above
```

## Output

One line per type-2 query: the requested minimum.

## Constraints

```
1  ≤  n, q      ≤  200000
1  ≤  x[i], u   ≤  10^9
1  ≤  k         ≤  n
1  ≤  a ≤ b     ≤  n
```

## Sample 1

**Input**
```
8 4
3 2 4 5 1 1 5 3
2 1 4
2 5 6
1 2 3
2 1 4
```

**Output**
```
2
1
3
```

**Explanation**

`min(3,2,4,5) = 2`, then `min(1,1) = 1`. Setting position 2 to 3 makes the first range `min(3,3,4,5) = 3`.

## Notes

- This looks like the sum problem, but **a Fenwick tree does not work here**, and understanding why is the point. A BIT answers `pref(b) − pref(a−1)` because addition has an inverse — subtraction. Minimum has no inverse: knowing `min(1..b)` and `min(1..a−1)` tells you nothing about `min(a..b)`. Reaching for a BIT out of habit is the trap.
- Use a **segment tree**. The iterative bottom-up version is short and needs no recursion:
  ```
  int sz = 1; while (sz < n) sz <<= 1;          // pad to a power of two
  // leaves live at t[sz .. sz+n-1]; t[i] = min(t[2i], t[2i+1])
  ```
  - **Update**: write the leaf at `sz + k − 1`, then walk to the root fixing each parent.
  - **Query `[l, r]`**: start at the two leaves and climb, absorbing a child whenever it is the odd one out.
- Pad the unused tail with a value larger than any input — `INT_MAX` or `2·10^9` — so it can never win a minimum. (In the bottom-up form above, a node covering padding always extends past `r` and so is never absorbed, which makes `0` padding harmless *there*; in a recursive top-down query it is a silent wrong answer. Use a proper identity and the question never arises.)
- Sparse tables answer range minimum in `O(1)`, but they are **static**. Values change here, so they do not apply. Recognising static-versus-dynamic is what picks the structure.
- Values reach `10^9` but nothing is summed, so `int` suffices. Just make sure the identity you initialise with is bigger than any real value.
- `O((n + q) log n)`. Buffer the output — up to `2·10^5` lines.
