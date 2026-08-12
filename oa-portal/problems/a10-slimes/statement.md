# Slimes

> **Mirrored from AtCoder — Educational DP Contest, problem N** —
> <https://atcoder.jp/contests/dp/tasks/dp_n>
> Solve it here, then paste the same code into the AtCoder submit box.

There are `N` slimes in a row. The `i`-th from the left has size `a[i]`.

You will fuse them into a single slime. Each fusion picks **two adjacent** slimes of sizes `x` and `y`, replaces them with one slime of size `x + y`, and costs `x + y`. Repeat until one slime remains.

## Task

Report the minimum possible total cost.

## Input

```
Line 1:  N
Line 2:  a[1]  a[2]  …  a[N]
```

## Output

A single integer: the minimum total cost.

## Constraints

```
2  ≤  N     ≤  400
1  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
10 20 30 40
```

**Output**
```
190
```

**Explanation**

Fuse `10, 20` for 30, then `30, 30` for 60, then `60, 40` for 100 — total `190`. Every other order costs at least as much.

## Sample 2

**Input**
```
5
10 10 10 10 10
```

**Output**
```
120
```

## Sample 3

**Input**
```
3
1000000000 1000000000 1000000000
```

**Output**
```
5000000000
```

## Sample 4

**Input**
```
6
7 6 8 6 1 1
```

**Output**
```
68
```

## Notes

- Slimes only ever fuse with neighbours, so **every slime that exists at any point is a contiguous range of the original row**. That is what makes the interval the right state:
  `dp[i][j]` = the cheapest way to fuse `a[i..j]` into one slime.
- The move to reason about is the **last** one. Whatever order you used, the final fusion joined two slimes covering `a[i..k]` and `a[k+1..j]` for some split `k`. Its cost is `a[i] + … + a[j]` — the full range sum — *whatever* `k` is, because both halves have already been fused into their totals. So:
  ```
  dp[i][j] = min over k in [i, j-1] of ( dp[i][k] + dp[k+1][j] ) + sum(i..j)
  ```
  with `dp[i][i] = 0`, a lone slime needing no work.
- Keep a prefix-sum array so `sum(i..j)` is one subtraction. Recomputing it inside the `k` loop turns `O(N³)` into `O(N⁴)`.
- Fill by increasing interval length so both halves are ready when you need them.
- **This is not a greedy problem.** Always fusing the cheapest adjacent pair looks reasonable and is wrong; so is always fusing the two smallest. (Fusing the two globally smallest *would* be right if any two slimes could fuse — that is Huffman coding — but here they must be adjacent, and that restriction breaks it.)
- Totals reach roughly `400 × 10^9` summed over about `log N` levels of fusion, so the answer needs 64 bits. Sample 3 already exceeds 32 bits.
- `O(N³)` = `6.4 × 10^7` at `N = 400`, which is why `N` is only 400 here.
