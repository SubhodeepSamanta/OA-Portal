# Equalise the Shelves

A library has `n` shelves in a row, numbered `1` through `n`. Shelf `i` currently holds `a[i]` books.

One **operation** moves a single book from a shelf to one of its immediate neighbours — shelf `i` to shelf `i−1` or `i+1`. Moving one book two shelves along therefore costs two operations.

## Task

Report the fewest operations needed to leave every shelf holding the same number of books.

If that is impossible, report `-1`.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

A single integer: the minimum number of operations, or `-1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  a[i]  ≤  10^9
```

## Sample 1

**Input**
```
3
1 2 3
```

**Output**
```
2
```

**Explanation**

Six books over three shelves means two each. Move one book from shelf 3 to shelf 2, giving `1 3 2`, then one from shelf 2 to shelf 1, giving `2 2 2`. **2** operations.

## Sample 2

**Input**
```
2
1 2
```

**Output**
```
-1
```

**Explanation**

Three books cannot be split evenly between two shelves, and no sequence of moves changes the total.

## Sample 3

**Input**
```
1
5
```

**Output**
```
0
```

**Explanation**

A single shelf is already equal to itself.

## Sample 4

**Input**
```
4
0 0 0 4
```

**Output**
```
6
```

**Explanation**

Every shelf must end with 1. One book travels three shelves, one travels two, one travels one: `3 + 2 + 1 = 6`.

## Notes

- First the easy gate: moves never create or destroy books, so the total must divide evenly by `n`. Otherwise the answer is `-1` and nothing else matters.
- Now think about a single **gap** — the boundary between shelf `i` and shelf `i+1`. Every book that starts on the left of that gap and must end on the right has to cross it, one operation each, and no book ever needs to cross it twice.
- So the number of crossings at that gap is fixed before you move anything: it is `|(books currently on the left) − (books that ought to be on the left)|`, which is `|prefix[i] − i × average|`.
- The gaps are independent — each book's journey is counted once at each gap it crosses — so the answer is simply that quantity summed over all `n−1` gaps. One pass, no simulation, no greedy choices to make.
- The absolute value matters: some gaps push books right, others push them left, and they must not cancel.
- This is the overflow problem of the set. `a[i]` reaches `10^9` across `2 · 10^5` shelves, and the worst arrangement — the first half full, the second half empty — makes the answer approach `5 · 10^{18}`. That fits in a signed 64-bit integer with room to spare, and in nothing smaller. The running prefix and `i × average` both need 64 bits too, well before the sum does.
