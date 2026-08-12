# Range Xor Queries

> **Mirrored from CSES 1650** — <https://cses.fi/problemset/task/1650>
> Solve it here, then paste the same code into the CSES submit box.

You are given an array of `n` integers. Process `q` queries: for each, report the **xor** of all values in positions `a..b`.

The array never changes.

## Input

```
Line 1:  n  q
Line 2:  x[1] x[2] ... x[n]
Next q lines:  a  b
```

## Output

One line per query: the xor of that range.

## Constraints

```
1  ≤  n, q   ≤  200000
1  ≤  x[i]   ≤  10^9
1  ≤  a ≤ b  ≤  n
```

## Sample 1

**Input**
```
8 4
3 2 4 5 1 1 5 3
2 4
5 6
1 8
3 3
```

**Output**
```
3
0
6
4
```

**Explanation**

`2 xor 4 xor 5 = 3`; `1 xor 1 = 0`; the whole array xors to 6; a single element is itself.

## Notes

- The array is **static** — nothing is updated. That one word is the whole difficulty of this problem, and the reason it is easier than the two that come before it. Read the query list before choosing a structure.
- Xor behaves like addition for this purpose because **every value is its own inverse**: `v xor v = 0`. So with `p[i] = x[1] xor x[2] xor … xor x[i]` and `p[0] = 0`,
  `xor(a..b) = p[b] xor p[a−1]`
  — exactly the prefix-sum identity with `xor` in place of `+` and `−`.
- That gives `O(n)` preprocessing and `O(1)` per query. No Fenwick tree, no segment tree.
- It is worth seeing *why* this works where range **minimum** did not: the identity needs an inverse operation, and xor has one (itself) while minimum does not. That single test — "does my operation have an inverse?" — tells you whether prefix arrays are available.
- If updates *were* allowed, a Fenwick tree storing xors would work unchanged, since xor is associative and invertible. Nothing else about the code would change.
- Values are under `10^9` so they fit in 32 bits, and xor never grows a number beyond the widest input. `int` is safe throughout — this is one of the few problems in this set with no overflow concern.
- With `2·10^5` queries, buffer the output rather than printing per line.
