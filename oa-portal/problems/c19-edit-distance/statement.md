# Edit Distance

> **Mirrored from CSES 1639** — <https://cses.fi/problemset/task/1639>
> Solve it here, then paste the same code into the CSES submit box.

The edit distance between two strings is the minimum number of operations needed to turn the first into the second. The allowed operations are:

- **insert** a character
- **remove** a character
- **replace** a character with another

## Task

Report the edit distance between the two given strings.

## Input

```
Line 1:  the first string  (n characters, A-Z)
Line 2:  the second string (m characters, A-Z)
```

## Output

A single integer: the edit distance.

## Constraints

```
1  ≤  n, m  ≤  5000
```

## Sample 1

**Input**
```
LOVE
MOVIE
```

**Output**
```
2
```

**Explanation**

Replace `L` with `M`, then insert `I`.

## Notes

- Let `d[i][j]` be the edit distance between the first `i` characters of `a` and the first `j` of `b`.
  - If `a[i] == b[j]`, the last characters already agree and cost nothing: `d[i][j] = d[i−1][j−1]`.
  - Otherwise pay 1 and take the best of the three moves:
    `d[i][j] = 1 + min(d[i−1][j−1] /* replace */, d[i−1][j] /* remove */, d[i][j−1] /* insert */)`.
- The base cases carry real meaning: `d[i][0] = i` (delete everything) and `d[0][j] = j` (insert everything). Forgetting to fill the first row and column is the most common way this comes out wrong.
- Getting the three moves straight is worth doing once slowly. `d[i−1][j]` means you consumed a character of `a` and not of `b` — a **deletion**. `d[i][j−1]` is the mirror — an **insertion**. Mixing them up still gives a symmetric-looking answer on many inputs, which is exactly why it survives casual testing.
- `5000 × 5000` ints is 100 MB — over a comfortable margin. Keep only **two rows** (previous and current) and the memory drops to 40 KB. You are asked only for the distance, not the sequence of operations, so nothing is lost.
- `O(n·m)` is `2.5 × 10^7` — fast.
- Read the strings with `scanf("%s")` or `cin >>`; there is no whitespace inside them.
