# LCS

> **Mirrored from AtCoder — Educational DP Contest, problem F** —
> <https://atcoder.jp/contests/dp/tasks/dp_f>
> Solve it here, then paste the same code into the AtCoder submit box.

You are given strings `s` and `t`.

A **subsequence** of a string is what is left after deleting zero or more characters, keeping the rest in their original order. `ace` is a subsequence of `abcde`; `aec` is not.

## Task

Print one longest string that is a subsequence of **both** `s` and `t`.

## Input

```
Line 1:  s
Line 2:  t
```

## Output

One longest common subsequence, on a single line.

If `s` and `t` share no character at all, the answer is the empty string — print an empty line.

## Constraints

```
1  ≤  |s|, |t|  ≤  3000
```

Both strings consist of lowercase English letters.

## Sample 1

**Input**
```
axyb
abyxb
```

**Output**
```
axb
```

**Explanation**

`axb` has length 3, and no common subsequence is longer. `ayb` is also length 3 and is **equally acceptable** — see the note below.

## Sample 2

**Input**
```
aa
xayaz
```

**Output**
```
aa
```

## Sample 3

**Input**
```
a
z
```

**Output**
```
```

**Explanation**

The two strings share no character, so the only common subsequence is the empty one. Print an empty line.

## Sample 4

**Input**
```
abracadabra
avadakedavra
```

**Output**
```
aaadara
```

## Notes

- **Many answers can be accepted.** When several subsequences tie for the longest, any of them is correct — AtCoder's own sample 1 lists two. This problem is graded by a checker: it confirms your string is as long as the true LCS and that it really is a subsequence of both `s` and `t`. Anything meeting both conditions *is* a longest common subsequence, so nothing else needs checking.
- The length is the standard table:
  `dp[i][j]` = length of the LCS of the first `i` characters of `s` and the first `j` of `t`.
  ```
  if s[i-1] == t[j-1]:  dp[i][j] = dp[i-1][j-1] + 1
  else:                 dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  ```
- **The length is the easy half.** This problem exists to make you *reconstruct* the string, and that is the part worth practising: start at `(|s|, |t|)` and walk backwards. If the characters match, that character belongs to the answer — take it and step diagonally. Otherwise step whichever way the table says is no worse. You build the answer in reverse, so remember to flip it at the end.
- Because you walk backwards, the rolling one-row trick that works for the length **does not work here** — you need the whole table to walk back through. `3001 × 3001` ints is about 36 MB, which the limit allows.
- Reconstruction is exactly where the ties come from: when `dp[i-1][j] == dp[i][j-1]`, both directions lead to a correct answer of the same length, and which one you take decides whether you print `axb` or `ayb`.
- `O(|s| · |t|)` = `9 × 10^6`.
