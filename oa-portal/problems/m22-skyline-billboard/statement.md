# Skyline Billboard

`n` buildings stand shoulder to shoulder along one side of a street. Building `i` is `h[i]` metres tall and exactly **1 metre wide**, and they are packed with no gaps — building 1, then building 2, and so on.

An advertiser wants to hang a single rectangular billboard flat against this row of façades. The billboard must sit **entirely inside the silhouette**: every point of the rectangle has to be covered by building, so if the rectangle spans buildings `l … r` then its height can be at most the shortest building in that stretch.

A building of height `0` is an empty plot — nothing to hang on.

## Task

Report the largest area, in square metres, of a rectangle that fits inside the silhouette.

## Input

```
Line 1:  n
Line 2:  h[1] h[2] ... h[n]
```

## Output

A single integer: the maximum area.

## Sample 1

**Input**
```
6
2 1 5 6 2 3
```

**Output**
```
10
```

**Explanation**

Buildings 3 and 4 are 5 and 6 metres tall. A `2 × 5` billboard spanning both fits flush against them, giving area **10**.

Going wider costs height: spanning buildings 3–6 caps the height at 2, so area `4 × 2 = 8`. Going taller costs width: building 4 alone gives `1 × 6 = 6`.

## Sample 2

**Input**
```
5
0 0 0 0 0
```

**Output**
```
0
```

**Explanation**

Five empty plots. Nothing can be hung, and the answer is 0.

## Sample 3

**Input**
```
4
4 4 4 4
```

**Output**
```
16
```

**Explanation**

A flat block of four equal buildings takes the full `4 × 4` rectangle.

## Sample 4

**Input**
```
1
7
```

**Output**
```
7
```

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  h[i]  ≤  10^9
```

## Notes

- There is an `O(n²)` answer that is easy to see: fix the left edge, walk right, and keep the running minimum height. Write it, use it to check yourself, then throw it away — it will not survive `n = 2 · 10^5`.
- The useful reframing: every candidate rectangle can be pinned to some building whose height it exactly matches. For each building, ask how far left and how far right the rectangle at *that* height can stretch before it hits something shorter. Now you only have `n` candidates.
- Finding "the nearest strictly shorter building on each side" for every index is the whole problem, and it can be done in one pass each way if you keep the right thing in a stack.
- `h[i] = 0` is legal and is exactly the case that breaks a stack written with the wrong strict/non-strict comparison. So is `n = 1`.
- Area reaches `2 · 10^5 × 10^9 = 2 · 10^14`. A 32-bit `int` overflows silently.
