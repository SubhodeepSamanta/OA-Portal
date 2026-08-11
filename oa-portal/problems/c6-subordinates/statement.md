# Subordinates

> **Mirrored from CSES 1674** — <https://cses.fi/problemset/task/1674>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

A company has `n` employees, numbered `1` to `n`. Employee `1` is the general director. Every other employee has exactly one direct boss, and the structure is a tree rooted at employee 1.

A **subordinate** of employee `x` is anyone below `x` in the hierarchy — not just their direct reports, but everyone underneath them at any depth.

## Task

For every employee `1..n`, report how many subordinates they have.

## Input

```
Line 1:  n
Line 2:  b[2] b[3] ... b[n]     the direct boss of each employee 2..n
```

When `n = 1` the second line is empty.

## Output

`n` integers: the subordinate count of employees `1, 2, …, n`.

## Constraints

```
1  ≤  n     ≤  200000
1  ≤  b[i]  ≤  n
```

## Sample 1

**Input**
```
5
1 1 2 3
```

**Output**
```
4 1 1 0 0
```

**Explanation**

Employee 1 is the boss of 2 and 3; employee 2 is the boss of 4; employee 3 is the boss of 5. So 1 has everyone below them (4 people), 2 has just employee 4, 3 has just employee 5, and 4 and 5 have none.

## Notes

- The answer for a node is the size of its subtree minus one, and subtree sizes obey a one-line recurrence: `count[x] = Σ (count[child] + 1)` over its direct reports.
- The order matters — a node cannot be computed before its children. A post-order traversal is the standard way.
- **Do not use plain recursion here.** With `n = 2·10^5`, the hierarchy can be one long chain, and a recursive DFS goes `2·10^5` frames deep. That overflows the default 1 MB stack on Windows and shows up as a bare crash with no message. Two safe ways out:
  - Run a BFS from the root, record the order nodes are visited, then walk that order **backwards**. Every node is guaranteed to come after all of its ancestors in BFS order, so going backwards means every child is finished before its parent.
  - Or write the DFS with your own explicit stack.
- Build the children lists from the parent array first — the input gives you edges pointing the wrong way for a downward traversal.
- The counts fit comfortably in a 32-bit `int` (at most `n − 1`), but printing `2·10^5` numbers still needs buffered output; assembling a string and writing it once avoids a needless TLE.
- Careful with `n = 1`: there is no second line at all, and the answer is a single `0`.
