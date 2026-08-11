# Building Roads

> **Mirrored from CSES 1666** — <https://cses.fi/problemset/task/1666>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

Byteland has `n` cities and `m` roads between them. Roads are two-way. Your task is to make it possible to travel from any city to any other city, by building as few new roads as possible.

## Task

Report the minimum number of new roads, and which roads to build.

## Input

```
Line 1:       n  m
Next m lines: a  b     an existing road between cities a and b
```

## Output

```
Line 1:  k     — the minimum number of new roads
Next k lines:  two cities to connect with a new road
```

## Constraints

```
1  ≤  n  ≤  100000
1  ≤  m  ≤  200000
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
4 2
1 2
3 4
```

**Output**
```
1
2 3
```

**Explanation**

Cities 1 and 2 form one group and cities 3 and 4 another. One road joining the two groups is enough.

## Notes

- **Many answers are accepted.** Connecting `1 3` or `2 4` would be just as correct as `2 3`. This problem is graded by a checker, which confirms you built the minimum number of roads and that the country really is fully connected afterwards. That is how CSES grades it.
- Count the **connected components**. If there are `k` of them, the answer is `k − 1` roads — each new road can reduce the number of components by at most one, and joining any city of one component to any city of the next always achieves that.
- So: find one representative city per component and chain them together — `rep[0]–rep[1]`, `rep[1]–rep[2]`, and so on.
- Either tool works:
  - **Union-Find (DSU)** — union every existing road, then collect one city per distinct root. With path compression and union by size this is effectively linear.
  - **BFS or DFS flood fill** — sweep cities `1..n`, and whenever you meet one not yet visited, that city is a new component's representative; flood from it.
- If you flood fill, use **BFS or an explicit stack**. A recursive DFS over `10^5` cities in a path-shaped graph will overflow the stack.
- A graph with no edges at all still has `n` components and needs `n − 1` roads, so `m ≥ 1` in the constraints does not mean the graph is connected. And a graph that is already connected needs `0` roads — print `0` and nothing else.
- The counts are small (`k − 1 < 10^5`), so no 64-bit types are needed here. But do buffer the output: up to `10^5` lines printed one at a time with `endl` is a needless TLE.
