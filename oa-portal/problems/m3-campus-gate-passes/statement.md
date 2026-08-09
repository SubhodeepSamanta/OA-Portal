# Campus Gate Passes

A large university campus is enclosed by a perimeter wall with `m` numbered gates, `1` through `m`, arranged in order along the wall. Access to the campus is governed by *pass grants* issued by the administration.

An access grant is never written for a single gate. Because departments sit next to one another along the perimeter, every grant is issued for a **contiguous stretch of gates**. A grant is recorded as three numbers `l`, `r` and `x`, and it means:

> every gate from `l` through `r` inclusive receives `x` additional passes.

Grants accumulate. A gate covered by four different grants ends the term holding the sum of all four allocations. Grants overlap freely — that is the normal case, since a gate near a busy faculty is covered by many departments at once.

At the end of the term the facilities office audits the perimeter. They want to know which gate ended up carrying the heaviest access load, so that gate can be prioritised for a hardware upgrade.

## Task

Apply all `q` grants, then report the gate holding the **most passes**, together with that pass count.

If several gates tie for the maximum, report the one with the **smallest gate number**.

## Input

```
Line 1:      m  q
Next q lines: l  r  x
```

- `m` — number of gates along the perimeter
- `q` — number of grants
- each following line is one grant: gates `l` through `r` inclusive each gain `x` passes

## Output

Two integers on one line separated by a space:

```
gate_number  pass_count
```

## Constraints

```
1  ≤  m  ≤  10^6
1  ≤  q  ≤  10^6
1  ≤  l  ≤  r  ≤  m
1  ≤  x  ≤  10^4
```

## Sample 1

**Input**
```
5 3
1 3 2
2 5 3
4 4 1
```

**Output**
```
2 5
```

**Explanation**

Applying the grants one at a time:

| Gate | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| after grant `1 3 2` | 2 | 2 | 2 | 0 | 0 |
| after grant `2 5 3` | 2 | 5 | 5 | 3 | 3 |
| after grant `4 4 1` | 2 | 5 | 5 | 4 | 3 |

Gates 2 and 3 both finish on 5 passes, the highest total. The smaller gate number is 2, so the answer is `2 5`.

## Sample 2

**Input**
```
3 1
1 3 7
```

**Output**
```
1 7
```

**Explanation**

A single grant covers the whole perimeter, so all three gates hold 7 passes. Every gate ties, and the smallest gate number is 1.

## Notes

- A gate covered by no grant at all holds zero passes. If every gate holds zero, gate 1 is the answer.
- Grants may repeat the same `l` and `r`, and a grant may cover a single gate (`l = r`) or the entire wall (`l = 1`, `r = m`).
- The number of grants and the size of each allocation are both large. A gate's final pass count can exceed the range of a 32-bit signed integer.
- Walking every gate of every grant performs work proportional to the total length of all grants, which at these limits is far too slow. The intended approach touches each grant a constant number of times.
- The input is large — up to three million integers. Slow input parsing alone can exhaust the time limit.
