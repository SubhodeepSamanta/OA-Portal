# Planets Queries I

> **Mirrored from CSES 1750** — <https://cses.fi/problemset/task/1750>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

There are `n` planets, numbered `1` to `n`. Each planet has exactly one teleporter, and the teleporter on planet `i` sends you to planet `t[i]` (possibly back to `i` itself).

## Task

Answer `q` queries. Each gives a starting planet `x` and a number of teleports `k`; report where you end up after using `k` teleporters.

## Input

```
Line 1:  n  q
Line 2:  t[1] t[2] ... t[n]
Next q lines:  x  k
```

## Output

`q` lines: the destination planet for each query.

## Constraints

```
1  ≤  n, q   ≤  200000
1  ≤  t[i]   ≤  n
1  ≤  x      ≤  n
0  ≤  k      ≤  10^9
```

## Sample 1

**Input**
```
4 3
2 1 1 4
1 2
3 4
4 1
```

**Output**
```
1
2
4
```

**Explanation**

From planet 1: `1 → 2 → 1`, so after 2 teleports you are on planet 1.
From planet 3: `3 → 1 → 2 → 1 → 2`, so after 4 teleports you are on planet 2.
Planet 4 teleports to itself.

## Notes

- Simulating `k` steps is `O(k)` per query — up to `10^9 × 2·10^5` steps. Far too slow.
- **Binary lifting** again, but on a *functional graph* rather than a tree: `up[j][v]` is where you land from `v` after `2^j` teleports.
  - `up[0][v] = t[v]`
  - `up[j][v] = up[j−1][ up[j−1][v] ]`
- Answering a query is then: decompose `k` into powers of two and take one jump per set bit. `for (j = 0; j < LOG; j++) if (k >> j & 1) x = up[j][x];`
- Sizing `LOG`: `k` reaches `10^9`, and `2^{30} > 10^9`, so `LOG = 30`. This is a different bound from the tree problems where `LOG` follows `n` — here it follows **`k`**, and using `18` because that worked last time silently breaks every query with `k ≥ 262144`.
- Memory is the thing to watch: `30 × 2·10^5` ints is 24 MB. That fits, but a `long long` table would be 48 MB and a `vector<vector<>>` of the wrong shape can be far worse. Index it as `up[j][v]` with `j` outermost so each level is one contiguous array.
- Note `k = 0` is allowed — the answer is `x` itself, and the loop handles it with no special case.
- Unlike a tree, this graph has cycles by construction: every planet has an out-edge, so following teleporters forever must eventually repeat. Binary lifting does not care — it never needs the graph to be acyclic. (Finding the cycle explicitly is a different problem; you do not need it here.)
- Buffer the `q` output lines.
