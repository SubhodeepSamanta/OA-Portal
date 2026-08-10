# Pipeline Reliability

A deployment pipeline is a directed acyclic graph of `n` stages. An edge `a → b` means stage `b` runs immediately after stage `a`.

A **start** stage is one with nothing feeding into it; an **end** stage is one with nothing running after it. A run of the pipeline follows one path from a start stage to an end stage. A single stage that is both a start and an end is a legal path all by itself.

Stage `i` carries a **risk** `w[i]`, a non-negative integer. The risk of a path is the sum of the risks of its stages, and the probability that a path completes without incident is `2^(−risk)`. So the most reliable route is exactly the one with the smallest total risk.

## Task

Report the smallest total risk over all start-to-end paths.

## Input

```
Line 1:       n  m
Line 2:       w[1] w[2] ... w[n]
Next m lines: a  b        an edge from stage a to stage b
```

The graph is guaranteed acyclic. There may be several edges between the same pair.

## Output

A single integer: the minimum total risk.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  m  ≤  5 · 10^5
0  ≤  w[i]  ≤  10^9
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
4 4
1 5 2 3
1 2
1 3
2 4
3 4
```

**Output**
```
6
```

**Explanation**

Stage 1 is the only start and stage 4 the only end. The two routes are `1 → 2 → 4` at `1 + 5 + 3 = 9` and `1 → 3 → 4` at `1 + 2 + 3 = 6`.

## Sample 2

**Input**
```
1 0
7
```

**Output**
```
7
```

**Explanation**

One stage with no edges is both a start and an end, so the only path is that stage alone.

## Sample 3

**Input**
```
3 2
1 1 1
1 2
2 3
```

**Output**
```
3
```

## Sample 4

**Input**
```
5 3
10 1 1 1 100
1 3
2 3
3 4
```

**Output**
```
3
```

**Explanation**

There are three start stages — 1, 2 and 5 — and two end stages, 4 and 5. Stage 5 is isolated, so it is a path of its own with risk 100. The best route is `2 → 3 → 4`, at `1 + 1 + 1 = 3`, which beats `1 → 3 → 4` at 12.

Note the answer does not start at stage 1. Assuming a single entry point is the most common way to get this wrong.

## Notes

- Every stage's best value depends only on stages that feed into it, and the graph is acyclic — so there is an order in which you can settle each stage once, using answers already final. Producing that order and consuming it are the same sweep.
- Let `best[v]` be the smallest risk of any path from a start stage down to `v`, counting `v` itself. Then `best[v] = w[v]` when `v` has nothing feeding it, and otherwise `w[v]` plus the smallest `best` among its predecessors. The answer is the smallest `best` over the **end** stages.
- Both halves of that are easy to get wrong. Starts are *all* the stages with no incoming edge, not just stage 1; ends are all the stages with no outgoing edge, not just stage `n`. Sample 4 punishes both assumptions at once.
- Recursion will overflow the stack on a chain of `2 · 10^5` stages. Build the order iteratively — repeatedly take a stage whose predecessors are all done — and there is no depth to worry about.
- Risks reach `10^9` over paths of up to `2 · 10^5` stages, so totals approach `2 · 10^{14}`. Use 64-bit, and make "unreached" a value you cannot accidentally add into an answer.

## A note on this version

The original states the stage probabilities directly and asks for the resulting success probability. A judge comparing text cannot grade that — two correct programs will disagree in the last decimal place depending on the order they multiply things.

Casting it as a sum of risks keeps the problem identical in substance and makes the answer exact. The connection is the one from any product-to-sum problem: maximising `Π p[i]` is minimising `Σ (−log p[i])`, and here the logs have simply been handed to you as integers.
