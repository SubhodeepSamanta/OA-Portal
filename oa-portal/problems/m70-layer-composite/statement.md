# Layer Composite

An image editor stacks `n` rectangular layers on a canvas. Layer `i` covers the pixels with `x` in `[x1, x2)` and `y` in `[y1, y2)` — the left and bottom edges are inside, the right and top edges are not, so the layer covers exactly `(x2 − x1) × (y2 − y1)` pixels.

Layer `n` is the one on top.

A designer wants to know how much of the top layer is doing work that nothing underneath is already doing. A pixel counts when it is covered by layer `n` **and by no other layer at all**.

## Task

Report how many pixels are covered by layer `n` and by none of layers `1 … n−1`.

## Input

```
Line 1:       n
Next n lines: x1  y1  x2  y2
```

## Output

A single integer: the number of such pixels.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
-10^9  ≤  x1  <  x2  ≤  10^9
-10^9  ≤  y1  <  y2  ≤  10^9
```

## Sample 1

**Input**
```
2
0 0 10 10
5 5 15 15
```

**Output**
```
75
```

**Explanation**

The top layer covers 100 pixels. The lower layer overlaps it on the square `[5,10) × [5,10)`, which is 25 pixels. That leaves **75**.

## Sample 2

**Input**
```
1
0 0 4 5
```

**Output**
```
20
```

**Explanation**

Nothing underneath, so the whole top layer counts.

## Sample 3

**Input**
```
2
0 0 10 10
0 0 10 10
```

**Output**
```
0
```

**Explanation**

The layer underneath covers the top one exactly.

## Sample 4

**Input**
```
3
0 0 2 2
5 5 7 7
0 0 10 10
```

**Output**
```
92
```

**Explanation**

Two small layers sit under the big top layer, covering 4 pixels each and not touching each other, so 8 pixels are lost from 100.

## Notes

- Only the part of each lower layer that actually falls under the top one matters, so clip everything to the top rectangle first and throw away whatever becomes empty. The answer is then the top layer's area minus the **area of the union** of what is left.
- It must be the union, not the sum. Overlapping lower layers would be double-counted, and Sample 4 is deliberately *not* that case so it cannot catch the mistake — the random tests will.
- Union of rectangles is the classic sweep: move a vertical line across the `x` coordinates, and between two consecutive `x` values the covered `y` length is constant. Area is that length times the width of the strip, summed.
- Maintaining "how much `y` is covered right now" under adding and removing intervals is what needs a segment tree over the `y` coordinates — compressed, since they reach `10^9`. Each node holds how many rectangles cover its whole range and how much of it is covered; a node covered at least once contributes its full length regardless of its children.
- That tree never needs lazy propagation, because every removal exactly undoes an earlier addition. It is the one segment tree where "push down" is not required, which is worth noticing.
- The top layer alone can be `2 · 10^9 × 2 · 10^9 = 4 · 10^{18}` pixels. That fits in a signed 64-bit integer with very little room to spare, so keep every intermediate in 64-bit and do not multiply widths by lengths in `int`.
- Coordinates can be negative.
