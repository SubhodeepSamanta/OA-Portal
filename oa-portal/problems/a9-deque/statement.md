# Deque

> **Mirrored from AtCoder — Educational DP Contest, problem L** —
> <https://atcoder.jp/contests/dp/tasks/dp_l>
> Solve it here, then paste the same code into the AtCoder submit box.

Taro and Jiro play a game with a sequence `a` of `N` elements.

They move alternately, **Taro first**. On your turn you remove either the **first** or the **last** remaining element, and add its value to your own score. The game ends when the sequence is empty.

Let `X` be Taro's final score and `Y` be Jiro's. Taro plays to maximise `X − Y`; Jiro plays to maximise `Y − X`. Both play optimally.

## Task

Report `X − Y` at the end of the game.

## Input

```
Line 1:  N
Line 2:  a[1]  a[2]  …  a[N]
```

## Output

A single integer: `X − Y`.

## Constraints

```
1  ≤  N     ≤  3000
1  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
10 80 90 30
```

**Output**
```
10
```

## Sample 2

**Input**
```
3
10 100 10
```

**Output**
```
-80
```

**Explanation**

Taro must take a `10` from one end. Jiro then takes the `100`, and Taro takes the last `10`. So `X = 20`, `Y = 100`, and `X − Y = −80`. Greedily grabbing the larger end does not help — there is no way to reach the `100` first.

## Sample 3

**Input**
```
1
10
```

**Output**
```
10
```

## Sample 4

**Input**
```
10
1000000000 1 1000000000 1 1000000000 1 1000000000 1 1000000000 1
```

**Output**
```
4999999995
```

## Sample 5

**Input**
```
6
4 2 9 7 1 5
```

**Output**
```
2
```

## Notes

- **Store the margin, not the score.** The one idea in this problem is that
  `dp[i][j]` = the best value of *(my score − your score)* that the player **about to move** can force on `a[i..j]`.
  This is the trick that removes "whose turn is it" from the state. Both players want the same thing — the largest margin — so there is only one recurrence, not two:
  ```
  dp[i][j] = max( a[i] − dp[i+1][j],      take the front
                  a[j] − dp[i][j-1] )     take the back
  ```
  The **minus** is where the opponent lives. After you take, they face `a[i+1..j]` and force `dp[i+1][j]` in *their* favour, which is exactly that much against you.
- Base case: `dp[i][i] = a[i]`, the last element goes to whoever is on move.
- Fill by **increasing interval length**, so `dp[i+1][j]` and `dp[i][j-1]` are ready before `dp[i][j]` is needed. The answer is `dp[0][N-1]`.
- Sample 2 is the one to read before coding. It is built so that taking the larger end first is wrong, which kills the greedy solution immediately.
- Scores reach `3000 × 10^9 = 3 × 10^{12}`, so the margin needs 64 bits. It can also be **negative** — the second player can win.
- `3001 × 3001` 64-bit entries is about 72 MB, which the limit allows. If you would rather not allocate that, note `dp[i][j]` only ever reads intervals one shorter, so a single array indexed by the left end and rewritten as the length grows is enough.
- `O(N²)` = `9 × 10^6`.
