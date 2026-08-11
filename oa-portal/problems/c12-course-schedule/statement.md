# Course Schedule

> **Mirrored from CSES 1679** — <https://cses.fi/problemset/task/1679>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

A university offers `n` courses. There are `m` requirements of the form *"course `a` must be completed before course `b`"*.

## Task

Find an order in which all `n` courses can be completed, or report that none exists.

## Input

```
Line 1:       n  m
Next m lines: a  b     course a must come before course b
```

## Output

`n` integers: a valid order of all courses.

If no valid order exists, print `IMPOSSIBLE`.

## Constraints

```
1  ≤  n  ≤  100000
1  ≤  m  ≤  200000
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
5 3
1 2
3 1
4 5
```

**Output**
```
3 4 1 5 2
```

**Explanation**

3 comes before 1, 1 before 2, and 4 before 5. Course 4 has no constraints tying it to the others, so it can go anywhere consistent with `4 → 5`.

## Notes

- **Many answers are accepted.** `3 1 2 4 5` and `4 5 3 1 2` are both correct here. This problem is graded by a checker, which confirms your line lists every course exactly once and that every requirement `a → b` really has `a` before `b`. That is how CSES grades it.
- This is a **topological sort** of a directed graph, and the answer is `IMPOSSIBLE` exactly when the graph has a cycle — a course that transitively requires itself.
- **Kahn's algorithm** does both jobs at once:
  1. Count each course's in-degree (how many requirements point at it).
  2. Put every course with in-degree 0 into a queue.
  3. Repeatedly take a course, append it to the order, and decrement the in-degree of everything it points to, pushing any that reach 0.
  4. If the order ends up shorter than `n`, the leftovers form a cycle → `IMPOSSIBLE`.
  That final count check is the whole cycle detection — no separate pass needed.
- The alternative is a DFS post-order (reversed), with three colours to spot a back edge. It works, but at `10^5` courses a **recursive** DFS on a chain-shaped graph will overflow the stack, so it needs an explicit stack. Kahn's is iterative by nature and the safer choice under time pressure.
- The graph is **directed**: add only `a → b`.
- Duplicate requirements are allowed and are harmless for Kahn's — they just increment an in-degree twice and decrement it twice. A self-requirement `a a` makes the answer `IMPOSSIBLE`, since the course would have to precede itself.
- Buffer the output: up to `10^5` numbers on one line.
