# Cycle Finding

> **Mirrored from CSES 1197** — <https://cses.fi/problemset/task/1197>
> Solve it here, then paste the same code into the CSES submit box.

You are given a directed graph with `n` nodes and `m` edges, where edge weights may be **negative**.

Find a cycle whose total weight is negative, or report that none exists.

## Input

```
Line 1:       n  m
Next m lines: a  b  c     a directed edge from a to b with weight c
```

## Output

If a negative cycle exists, print `YES` and then the nodes of such a cycle in order, starting and ending at the same node.

Otherwise print `NO`.

## Constraints

```
1  ≤  n  ≤  2500
1  ≤  m  ≤  5000
1  ≤  a, b  ≤  n
-10^9  ≤  c  ≤  10^9
```

## Sample 1

**Input**
```
4 5
1 2 1
2 4 1
3 1 1
4 1 -3
4 3 -2
```

**Output**
```
YES
1 2 4 1
```

**Explanation**

`1 → 2` costs 1, `2 → 4` costs 1, `4 → 1` costs −3. Total −1.

## Notes

- **Many answers are accepted.** Any negative cycle will do, printed from any starting node. This problem is graded by a checker: it confirms your `YES`/`NO` matches, that consecutive nodes really are joined by edges, that the walk closes, and that its total weight is negative. That is how CSES grades it.
- **Bellman-Ford** is the tool. Relax all `m` edges, `n` times over. If some edge still relaxes on the `n`-th pass, a negative cycle is reachable — because a shortest *path* uses at most `n − 1` edges, so any further improvement must come from going round a cycle.
- Start with **every** distance at 0 rather than picking a source. That is equivalent to adding a virtual node with a zero-weight edge to every node, and it matters: the negative cycle need not be reachable from node 1, and seeding only node 1 will miss those.
- Recovering the cycle is the part worth care. Let `x` be a node that relaxed on the final pass. `x` is not necessarily *on* the cycle — only reachable from it. Walking `n` steps back through the parent pointers is guaranteed to land you inside the cycle; from there, follow parents until you return to the same node, then reverse.
- **Overflow.** Distances can fall by `10^9` per edge across `2500` passes. Use 64-bit distances and clamp after each relaxation (`dist[b] = max(dist[a] + c, -4e18)`), or the values wrap and the detection breaks. This is the most common way a correct-looking Bellman-Ford fails here.
- Complexity is `O(n·m)` = `1.25 × 10^7` — comfortable.
- Watch self-loops: an edge `a → a` with negative weight *is* a negative cycle, and the answer is `a a`.
