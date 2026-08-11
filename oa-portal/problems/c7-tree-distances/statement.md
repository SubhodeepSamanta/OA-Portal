# Tree Distances I

> **Mirrored from CSES 1132** — <https://cses.fi/problemset/task/1132>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

You are given a tree with `n` nodes, numbered `1` to `n`. Every edge has length 1.

## Task

For each node, report the distance to the node **furthest away** from it.

## Input

```
Line 1:       n
Next n-1 lines: a  b     an edge between nodes a and b
```

## Output

`n` integers: for each node `1..n`, the maximum distance to any other node.

## Constraints

```
1  ≤  n     ≤  200000
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
5
1 2
1 3
3 4
3 5
```

**Output**
```
2 3 2 3 3
```

**Explanation**

From node 2 the furthest nodes are 4 and 5, both 3 edges away. From node 1 the furthest are 4 and 5, 2 edges away.

## Notes

- Running a BFS from every node is `O(n²)` — 4·10¹⁰ steps at the limit. The intended solution runs **three** BFS passes in total.
- The key fact: **the node furthest from any node `v` is always one of the two endpoints of the tree's diameter** (a longest path in the tree). So you never need per-node searches.
- The three passes:
  1. BFS from node 1. The furthest node found is `a` — guaranteed to be a diameter endpoint.
  2. BFS from `a`, recording `distA[]`. The furthest node found is `b`, the other endpoint.
  3. BFS from `b`, recording `distB[]`.
  Then `answer[v] = max(distA[v], distB[v])`.
- Step 1 deserves a moment's thought rather than memorisation. Whichever node you start from, the furthest node you reach must be an endpoint of some longest path — if it were not, you could extend the path and contradict its being furthest.
- **Use BFS, not a recursive DFS.** A path graph makes the tree 2·10⁵ deep and a recursive traversal will blow the stack. BFS with an explicit queue has no such problem, and since every edge has length 1, BFS gives correct distances directly.
- Build the adjacency list from the edges — the input is an undirected edge list, so add both directions.
- `n = 1` has no edges at all and the answer is a single `0`.
