# Mention Windows

A social listening tool has a stream of `n` mentions in time order. Mention `i` is tagged with a brand ID `b[i]`.

An analyst wants the shortest stretch of consecutive mentions that includes **at least one mention of every brand that appears anywhere in the stream**.

## Task

Report the length of the shortest such stretch.

## Input

```
Line 1:  n
Line 2:  b[1] b[2] ... b[n]
```

## Output

A single integer: the length of the shortest window containing every brand.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  b[i]  ≤  10^9
```

## Sample 1

**Input**
```
7
1 2 1 3 2 1 3
```

**Output**
```
3
```

**Explanation**

Three brands appear: 1, 2 and 3. The window `2 1 3` at positions 2–4 covers all three in three mentions, and no two consecutive mentions can cover three brands.

## Sample 2

**Input**
```
1
5
```

**Output**
```
1
```

## Sample 3

**Input**
```
4
7 7 7 7
```

**Output**
```
1
```

**Explanation**

Only one brand appears, so a single mention already covers everything.

## Sample 4

**Input**
```
5
1 2 3 4 5
```

**Output**
```
5
```

**Explanation**

Every brand appears exactly once, so nothing shorter than the whole stream works.

## Notes

- Checking every window is `O(n²)` windows, and confirming each one covers all brands costs more on top. At `2 · 10^5` that is hopeless.
- The useful property is monotonic: if a window covers every brand, so does any window containing it. That means for each right end there is a **leftmost** left end that still works, and — this is the part that makes it linear — that leftmost position never moves backwards as the right end advances.
- So run two pointers. Extend the right end one mention at a time, and whenever the window is complete, pull the left end in as far as it will go before recording the length. Every index enters and leaves once, so the whole sweep is `O(n)`.
- Track how many **distinct** brands are currently inside, not how many mentions. A count per brand plus a running "how many brands have a positive count" is all you need; the window loses a brand only when some count drops to zero.
- Brand IDs reach `10^9`, so index them by hash map rather than by array — or compress them first, which is faster and worth doing at this size.
- Work out the number of distinct brands before the sweep starts; the window is complete exactly when it holds that many.
