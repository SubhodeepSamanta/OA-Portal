# Company Queries II

> **Mirrored from CSES 1688** — <https://cses.fi/problemset/task/1688>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

A company has `n` employees, numbered `1` to `n`. Employee `1` is the general director; every other employee has exactly one direct boss.

## Task

Answer `q` queries. Each gives two employees `a` and `b`; report their **lowest common boss** — the employee lowest in the hierarchy who has both of them somewhere beneath them (an employee counts as being beneath themselves).

## Input

```
Line 1:  n  q
Line 2:  e[2] e[3] ... e[n]     the direct boss of each employee 2..n
Next q lines:  a  b
```

## Output

`q` lines: the lowest common boss for each query.

## Constraints

```
1  ≤  n, q   ≤  200000
1  ≤  e[i]   ≤  i - 1
1  ≤  a, b   ≤  n
```

Note `e[i] ≤ i − 1`: a boss always has a smaller number than their reports.

## Sample 1

**Input**
```
5 3
1 1 3 3
4 5
2 5
1 4
```

**Output**
```
3
1
1
```

**Explanation**

Employees 2 and 3 report to 1; employees 4 and 5 report to 3. So 4 and 5 meet at 3; 2 and 5 meet at 1; and since 1 is above 4, the answer to the third query is 1 itself.

## Notes

- Climbing one step at a time is `O(depth)` per query, and with a 2·10⁵-deep chain and 2·10⁵ queries that is 4·10¹⁰ steps. You need to climb in **jumps**.
- **Binary lifting.** Precompute `up[k][v]` = the ancestor of `v` exactly `2^k` steps above it, using `up[0][v] = parent[v]` and `up[k][v] = up[k−1][ up[k−1][v] ]`. With `n ≤ 2·10^5` you need `k` up to 18, since `2^18 > 2·10^5`.
- Answering a query is then two phases:
  1. **Level them.** If `depth[a] > depth[b]`, lift `a` up by `depth[a] − depth[b]` — decompose that difference into powers of two and take one jump per set bit.
  2. **Rise together.** If they are now the same node, that is the answer. Otherwise, for `k` from high to low, jump both up by `2^k` whenever `up[k][a] != up[k][b]`. That leaves both one step below the meeting point, so the answer is `up[0][a]`.
- Phase 2 is the part worth understanding rather than memorising: the test `up[k][a] != up[k][b]` means "this jump is still safely below the ancestor", so you always land as high as possible without overshooting.
- The constraint `e[i] ≤ i − 1` is a gift: a boss always has a smaller index, so you can compute every depth with a single forward loop `depth[i] = depth[e[i]] + 1` — no traversal, and no recursion to overflow the stack.
- Memory: `18 × 2·10^5` ints is about 14 MB, comfortably inside the limit. Use `int`, not `long long`, or you double that for nothing.
- Buffer the `q` output lines and write once.
