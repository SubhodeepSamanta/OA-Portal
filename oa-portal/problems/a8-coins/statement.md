# Coins

> **Mirrored from AtCoder — Educational DP Contest, problem I** —
> <https://atcoder.jp/contests/dp/tasks/dp_i>
> Solve it here, then paste the same code into the AtCoder submit box.

There are `N` coins, numbered `1` to `N`, and `N` is **odd**.

Coin `i` comes up heads with probability `p[i]` and tails with probability `1 − p[i]`. All `N` coins are tossed once each, independently.

## Task

Report the probability that **more coins come up heads than tails**.

## Input

```
Line 1:  N
Line 2:  p[1]  p[2]  …  p[N]
```

## Output

A single real number: the probability.

## Constraints

```
N  is odd
1  ≤  N  ≤  2999
0  <  p[i]  <  1
```

Each `p[i]` is given with exactly two digits after the decimal point.

## Sample 1

**Input**
```
3
0.30 0.60 0.80
```

**Output**
```
0.612
```

**Explanation**

Heads must beat tails, so with 3 coins that means 2 or 3 heads. Exactly 2 heads happens with probability `0.3·0.6·0.2 + 0.3·0.4·0.8 + 0.7·0.6·0.8 = 0.468`, and 3 heads with probability `0.3·0.6·0.8 = 0.144`. Together, `0.612`.

## Sample 2

**Input**
```
1
0.50
```

**Output**
```
0.5
```

## Sample 3

**Input**
```
5
0.42 0.01 0.42 0.99 0.42
```

**Output**
```
0.3821815872
```

## Notes

- **Your answer does not have to match digit for digit.** This problem is graded by a checker that accepts an absolute error up to `10^-9`, exactly as AtCoder does. Printing `0.612`, `0.6120000000` or `0.611999999998` all pass. Print plenty of digits — something like `printf("%.10f")` — and do not round to two decimals because the input had two.
- `N` is odd for a reason: "more heads than tails" then has no tie to argue about. It simply means at least `(N+1)/2` heads.
- The state is the **count of heads so far**, not which coins were used:
  `dp[k]` = probability that exactly `k` of the coins tossed so far came up heads.
  Adding coin `i` gives `dp[k] = dp[k]·(1 − p[i]) + dp[k−1]·p[i]` — the coin was tails and you already had `k`, or it was heads and you had `k − 1`.
- Start from `dp[0] = 1` (no coins tossed, zero heads, certainly). The answer is `dp[(N+1)/2] + … + dp[N]`.
- Rolling one array works, but **walk `k` downward**, exactly as in 0/1 knapsack, so that `dp[k−1]` still holds the previous coin's value when you read it. Going upward feeds a coin its own result and quietly lets one coin count twice.
- Doubles are fine. The probabilities multiply down to very small numbers, but they are only ever added together, so nothing catastrophic cancels — `10^-9` of room is generous here.
- `O(N²)` = `9 × 10^6`.
