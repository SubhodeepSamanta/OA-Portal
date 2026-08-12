# Independent Set

> **Mirrored from AtCoder — Educational DP Contest, problem P** —
> <https://atcoder.jp/contests/dp/tasks/dp_p>
> Solve it here, then paste the same code into the AtCoder submit box.

There is a tree with `N` vertices, numbered `1` to `N`. The `i`-th edge connects vertices `x[i]` and `y[i]`.

Paint each vertex either **white** or **black**. The one rule: **no two adjacent vertices may both be black**.

## Task

Report the number of valid paintings, **modulo `10^9 + 7`**.

## Input

```
Line 1:        N
Next N-1 lines: x[i]  y[i]
```

When `N = 1` there are no edge lines at all.

## Output

A single integer: the number of paintings modulo `10^9 + 7`.

## Constraints

```
1  ≤  N        ≤  10^5
1  ≤  x[i], y[i]  ≤  N
```

The input graph is a tree.

## Sample 1

**Input**
```
3
1 2
2 3
```

**Output**
```
5
```

**Explanation**

Of the `2³ = 8` paintings, three are illegal: black-black-white, white-black-black, and black-black-black. Five remain.

## Sample 2

**Input**
```
4
1 2
1 3
1 4
```

**Output**
```
9
```

**Explanation**

If vertex 1 is black, all three leaves must be white — 1 painting. If vertex 1 is white, each leaf is free — `2³ = 8`. Total `9`.

## Sample 3

**Input**
```
1
```

**Output**
```
2
```

## Sample 4

**Input**
```
10
8 5
10 8
6 5
1 5
4 8
2 10
3 6
9 2
1 7
```

**Output**
```
157
```

## Notes

- Root the tree anywhere — vertex 1 will do. A vertex only ever constrains its neighbours, so once you fix a vertex's colour the subtrees hanging off it become **independent**, and their counts simply multiply.
- Two numbers per vertex:
  `white[v]` = paintings of `v`'s subtree with `v` white, `black[v]` = the same with `v` black.
  ```
  white[v] = product over children c of ( white[c] + black[c] )
  black[v] = product over children c of   white[c]
  ```
  White puts no restriction on a child, so the child may be either. Black forces every child white. Leaves start at `white = black = 1`.
- The answer is `white[root] + black[root]`. Reduce modulo `10^9 + 7` at every multiplication, and note `white[c] + black[c]` can reach `2(10^9+6)`, so add in 64-bit before reducing.
- **`N` reaches 10^5 and the tree may be a single path.** A recursive depth-first search will then nest 100 000 frames deep and blow the stack — the verdict is a crash, not a wrong answer, and there is a test built precisely to do it. Either traverse iteratively with your own stack, or record a traversal order first and then process it in reverse so that every vertex is finished before its parent reads it.
- Build the adjacency once as a flat array with per-vertex offsets, rather than `vector<vector<int>>`, if you want the constant factor down. At this size either is fast enough.
- `N = 1` is legal: no edges, and both colours work, so the answer is `2`. Make sure your input reading does not wait for a line that never comes.
- `O(N)`.
