# Range Update Queries

> **Mirrored from CSES 1651** — <https://cses.fi/problemset/task/1651>
> Solve it here, then paste the same code into the CSES submit box.

You are given an array of `n` integers and must process `q` queries of two kinds:

```
1 a b u    add u to every value in positions a..b
2 k        report the value at position k
```

Positions are 1-indexed.

## Input

```
Line 1:  n  q
Line 2:  x[1] x[2] ... x[n]
Next q lines:  a query, in one of the two forms above
```

## Output

One line per type-2 query: the requested value.

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
8 3
3 2 4 5 1 1 5 3
2 4
1 2 5 1
2 4
```

**Output**
```
5
6
```

**Explanation**

Position 4 holds 5. Adding 1 to positions 2..5 makes it 6.

## Notes

- This is the **mirror image** of the sum problem: there you had point updates and range queries; here you have range updates and point queries. The same Fenwick tree solves both — you just apply it to a different array.
- Keep a **difference array** `d`, where the value at position `k` is `x[k] + (d[1] + d[2] + … + d[k])`. Then:
  - adding `u` to `a..b` is just two point updates: `d[a] += u` and `d[b+1] -= u`;
  - the value at `k` is `x[k]` plus the prefix sum of `d` up to `k`.
- So you need point-update plus prefix-sum — exactly what a Fenwick tree does. Recognising that a range update becomes *two* point updates on a different array is the whole idea, and it is worth knowing because it generalises.
- Size the tree to `n + 1` so that `d[b+1]` is writable when `b == n`. Forgetting that is an out-of-bounds write that usually survives testing and corrupts memory later.
- **Overflow.** Up to `2·10^5` range updates of `10^9` can pile onto one position, so a value reaches about `2·10^{14}`. The tree, the prefix sum and the printed value all need 64-bit types.
- An alternative is a segment tree with lazy propagation, which is far more machinery than this needs. Reaching for it here is a sign you have not spotted the difference-array trick.
- `O((n + q) log n)`. Buffer the output.
