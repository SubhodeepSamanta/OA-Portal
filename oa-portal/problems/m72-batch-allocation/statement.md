# Batch Allocation

A training programme has `n` trainees, each with an integer skill score, and must split them into exactly `k` batches.

The trainees are first **sorted by score**, and each batch then takes a contiguous block of that sorted list. Every trainee is in exactly one batch, and no batch may be empty.

A batch's **spread** is the difference between the highest and lowest score in it. A batch of one trainee has a spread of zero.

## Task

Report the smallest achievable total spread across all `k` batches.

## Input

```
Line 1:  n  k
Line 2:  the n scores, in no particular order
```

## Output

A single integer: the minimum total spread.

## Constraints

```
1  ≤  k  ≤  n  ≤  2 · 10^5
1  ≤  score  ≤  10^9
```

## Sample 1

**Input**
```
5 2
1 3 6 10 11
```

**Output**
```
6
```

**Explanation**

Sorted, the scores are `1 3 6 10 11`. Splitting after 6 gives batches `1 3 6` and `10 11`, with spreads 5 and 1 — a total of **6**.

Every other split is worse: after 1 gives `0 + 8 = 8`, after 3 gives `2 + 5 = 7`, after 10 gives `9 + 0 = 9`.

## Sample 2

**Input**
```
4 1
1 2 3 10
```

**Output**
```
9
```

**Explanation**

One batch must hold everybody, so the spread is the full range.

## Sample 3

**Input**
```
3 3
5 1 9
```

**Output**
```
0
```

**Explanation**

One trainee per batch, so every spread is zero.

## Sample 4

**Input**
```
6 3
1 2 3 100 101 200
```

**Output**
```
3
```

**Explanation**

Cutting at the two big jumps — before 100 and before 200 — gives `1 2 3`, `100 101` and `200`, with spreads 2, 1 and 0.

## Notes

- Sort first; after that the batches are just the pieces between `k − 1` cut points, and the only decision is where to cut.
- Now the reframing that solves it. Write the full range `max − min` as the sum of the gaps between neighbouring sorted scores. Each batch's spread is the sum of the gaps *inside* it, so the total spread is the full range **minus the gaps you cut at**.
- So the cuts are free choices that each save exactly one gap, and you make `k − 1` of them. To minimise what is left, cut at the `k − 1` **largest** gaps. Sort the gaps, take the biggest, subtract.
- No dynamic programming is needed, and no binary search — this is the rare interval problem where the greedy is not just correct but obvious once you have the right expression for the total.
- `k = 1` means no cuts and `k = n` means every gap is cut, leaving zero. Both fall out of the formula without special cases, which is a good sign you have written it correctly.
- Scores reach `10^9` but the answer is a single difference, so it stays under `10^9` — this problem is not about overflow.
