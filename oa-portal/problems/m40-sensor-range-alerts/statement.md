# Sensor Range Alerts

A pipeline is monitored by `n` sensors laid out in a line, numbered `1` through `n`. Sensor `i` currently reads `a[i]`.

`q` operations follow, each one of:

- **`ADD l r x`** — add `x` to the reading of every sensor from `l` to `r` inclusive. `x` may be negative, which is a recalibration downwards.
- **`MAX l r`** — report the highest reading among sensors `l` to `r` inclusive.

## Task

Answer every `MAX` operation, in order.

## Input

```
Line 1:       n  q
Line 2:       a[1] a[2] ... a[n]
Next q lines: either  ADD l r x   or   MAX l r
```

## Output

One line per `MAX` operation.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  q  ≤  2 · 10^5
1  ≤  l  ≤  r  ≤  n
-10^9  ≤  a[i]  ≤  10^9
-10^9  ≤  x  ≤  10^9
```

## Sample 1

**Input**
```
5 4
1 2 3 4 5
MAX 1 5
ADD 2 3 10
MAX 1 3
MAX 4 5
```

**Output**
```
5
13
5
```

**Explanation**

The highest of `1 2 3 4 5` is **5**.

After adding 10 to sensors 2 and 3 the readings are `1 12 13 4 5`. The highest of the first three is now **13**, while sensors 4 and 5 were untouched and still top out at **5**.

## Sample 2

**Input**
```
3 3
-5 -5 -5
MAX 1 3
ADD 1 3 -10
MAX 2 2
```

**Output**
```
-5
-15
```

**Explanation**

Readings are negative throughout and `x` is negative too. A maximum initialised to `0` gets both of these wrong.

## Sample 3

**Input**
```
1 3
7
MAX 1 1
ADD 1 1 1000000000
MAX 1 1
```

**Output**
```
7
1000000007
```

## Notes

- Doing `ADD` cell by cell is `O(n)` per operation, so a run of full-width adds is `4 · 10^{10}` updates. The whole point is to touch a range without touching each element in it.
- Split the line into a hierarchy of segments, each holding the maximum of what is beneath it. A range then decomposes into `O(log n)` whole segments, and an add that covers a whole segment does not need to descend into it at all — bump its maximum and leave a note saying "everything below me still owes this".
- Those pending notes are the entire difficulty. Any later operation that descends past a node has to hand the note down first, or it reads stale children. Getting that ordering right, once, is what this problem is teaching.
- The pending amount is a **sum** of adds and composes by adding; that is what makes this variant tractable. Range *assignment* would not compose the same way.
- Sample 2 exists because negative readings are legal. Initialise your "no maximum yet" to something genuinely below every possible value, not to `0`.
- Readings start at `10^9` and can absorb `2 · 10^5` adds of `10^9`, reaching about `2 · 10^{14}`. Use 64-bit for both the stored maxima and the pending amounts.
