# Build Pipeline

A CI system runs `n` build tasks, numbered `1` through `n`. Task `i` occupies a worker for `t[i]` seconds once it starts, and a task is never interrupted.

There are `m` dependency rules. A rule `(a, b)` means task `a` must be **completely finished** before task `b` may start.

Workers are unlimited: any number of tasks whose dependencies are all satisfied can run at the same instant. The build begins at time `0`.

## Task

Report the earliest time at which every task is finished.

If the dependency rules are contradictory — some group of tasks each waiting, directly or indirectly, on itself — the build can never run. Report `-1`.

## Input

```
Line 1:       n  m
Line 2:       t[1] t[2] ... t[n]
Next m lines: a  b        task a must finish before task b starts
```

The same rule may be listed more than once. A rule may name the same task twice, `a = b`, which is itself contradictory.

## Output

A single integer: the total wall-clock time in seconds, or `-1` if the dependencies cannot be satisfied.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  m  ≤  5 · 10^5
1  ≤  t[i]  ≤  10^9
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
5 4
3 2 4 1 5
1 3
2 3
3 4
3 5
```

**Output**
```
12
```

**Explanation**

Tasks 1 and 2 start immediately and finish at 3 and 2. Task 3 waits for both, so it starts at 3 and finishes at 7. Tasks 4 and 5 both wait only on task 3, so they start together at 7 and finish at 8 and 12.

The build is done at **12**. Note that task 2 finishing early buys nothing — task 3 is held by the slower of its two prerequisites.

## Sample 2

**Input**
```
3 3
1 1 1
1 2
2 3
3 1
```

**Output**
```
-1
```

**Explanation**

Task 1 waits on task 3, which waits on task 2, which waits on task 1. Nothing can ever start.

## Sample 3

**Input**
```
1 0
7
```

**Output**
```
7
```

## Sample 4

**Input**
```
4 0
5 3 9 1
```

**Output**
```
9
```

**Explanation**

No dependencies at all, so all four run at once and the build takes as long as its slowest task.

## Notes

- "Unlimited workers" is the phrase that decides the whole problem. It means no task ever waits for a *machine* — only for its prerequisites. So each task's start time is entirely determined by its predecessors, and the total is the heaviest chain of dependencies anywhere in the graph.
- Sum of all `t[i]` is the wrong answer, and so is `max(t[i])`. Sample 1 is 12 while the sum is 15 and the max is 5.
- Compute finish times in an order where every task's predecessors are already done. Finding such an order, and noticing when no such order exists, are the same procedure — if you get stuck with tasks still unprocessed, that is your `-1`.
- Recursion depth can reach `2 · 10^5` on a chain. If you go recursive, be aware of the stack; an iterative order avoids the question entirely.
- `t[i]` up to `10^9` across a chain of `2 · 10^5` tasks reaches `2 · 10^14`, so accumulate in 64-bit.
- `m` can be `0`, and self-dependencies `a = b` are legal input that must produce `-1`.
