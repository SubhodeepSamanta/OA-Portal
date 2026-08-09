# Trim the Broadcast

A streaming service has a recorded broadcast of `n` frames. Each frame carries a quality score from the encoder.

Before publication an editor trims it. The trimming tool is deliberately limited: it can only **cut from the beginning** or **cut from the end**. There is no way to remove a frame from the middle — whatever survives is a single unbroken run of the original frames.

Publication has one requirement: the **average quality of the surviving run must be at least `t`**. Subject to that, the editor wants to publish as much of the broadcast as possible.

## Task

Cut zero or more frames from the front and zero or more from the back so that the remaining run is non-empty and averages at least `t`. Report the **maximum number of frames that can survive**.

If no non-empty run averages at least `t`, report `0`.

## Input

```
Line 1:  n  t
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the largest number of frames that can be kept, or `0`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  t  ≤  10^9
0  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
5 5
1 9 8 2 7
```

**Output**
```
5
```

**Explanation**

The whole broadcast sums to `1 + 9 + 8 + 2 + 7 = 27` over 5 frames, averaging `5.4`. That already meets the threshold of 5, so nothing needs cutting and all **5** frames survive.

## Sample 2

**Input**
```
5 6
1 9 8 2 7
```

**Output**
```
4
```

**Explanation**

The full broadcast averages `27 / 5 = 5.4`, below 6, so something must go.

Cutting the first frame leaves `9 8 2 7`: sum 26 over 4 frames, averaging `6.5`. That qualifies, giving **4**.

Five is impossible (just shown), so 4 is the best. Note the winning run keeps the weak frame `2` — dropping it is not allowed, because `2` sits in the middle and the tool only cuts from the ends.

## Sample 3

**Input**
```
3 10
1 2 3
```

**Output**
```
0
```

**Explanation**

Every frame scores below 10, so every run averages below 10. Nothing can be published.

## Sample 4

**Input**
```
4 5
4 6 4 6
```

**Output**
```
4
```

**Explanation**

The whole run sums to 20 over 4 frames, averaging exactly `5.0`. The requirement is *at least* `t`, so equality qualifies and all 4 frames survive.

## Notes

- Cutting only from the ends means the survivors are always **contiguous**. That reframing is the problem: you are not choosing what to delete, you are choosing which single run to keep.
- "Average at least `t`" is much easier to handle once you stop dividing. A run qualifies exactly when the sum of `(score − t)` across it is at least zero.
- A single frame counts as a run, so any frame scoring `t` or more guarantees an answer of at least 1.
- Sums reach `2 · 10^14` in magnitude; use 64-bit arithmetic.
- Checking every run is `O(n²)` and will not finish at the upper limit.
