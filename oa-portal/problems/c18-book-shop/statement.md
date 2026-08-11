# Book Shop

> **Mirrored from CSES 1158** — <https://cses.fi/problemset/task/1158>
> Solve it here, then paste the same code into the CSES submit box.

You are in a book shop with `n` books. Book `i` costs `h[i]` and has `s[i]` pages. You have `x` to spend, and you may buy each book **at most once**.

## Task

Report the maximum number of pages you can buy.

## Input

```
Line 1:  n  x
Line 2:  h[1] h[2] ... h[n]     prices
Line 3:  s[1] s[2] ... s[n]     pages
```

## Output

A single integer: the maximum total pages.

## Constraints

```
1  ≤  n        ≤  1000
1  ≤  x        ≤  100000
1  ≤  h[i], s[i] ≤  1000
```

## Sample 1

**Input**
```
4 10
4 8 5 3
5 12 8 1
```

**Output**
```
13
```

**Explanation**

Buying books 1 and 3 costs `4 + 5 = 9` and gives `5 + 8 = 13` pages.

## Notes

- This is the **0/1 knapsack**: each book is taken or not, never partially and never twice.
- The full table is `best[i][c]` = most pages using the first `i` books with budget `c`. That is `1000 × 100001` entries — 400 MB as `int`, which will not fit. The standard fix is a **single rolling array** `best[c]`, reused for every book.
- The direction of the inner loop is the whole problem. Iterate the budget **downwards**, `c = x` down to `h[i]`:
  ```
  for each book i:
      for c = x down to h[i]:
          best[c] = max(best[c], best[c - h[i]] + s[i])
  ```
  Going downwards means `best[c - h[i]]` still refers to the state *before* book `i` was considered, so each book is used at most once. Iterating **upwards** silently turns this into the unbounded knapsack, where you may buy the same book repeatedly — it compiles, it runs, and it prints a larger number.
- That single detail is what this problem is for. If you remember one thing, remember that 0/1 goes down and unbounded goes up.
- `O(n·x)` is `10^8` operations at the limit. That is fine in C++ with a flat `vector<int>`; avoid anything per-iteration that allocates.
- The answer is at most `1000 × 1000 = 10^6`, so `int` is safe throughout.
