# Query Plan Cost

A database planner turns a query into a binary tree of operators. The `n` **leaves** are table scans, given **in a fixed left-to-right order** that cannot be rearranged; leaf `i` has cost `c[i]`.

Every internal node is a join of two adjacent groups. Its **value** is the sum of the values of its two children, plus `1` for the join itself. A leaf's value is just its cost.

The **total cost of the plan** is the sum of the values of all internal nodes. Leaves contribute nothing on their own — only through the joins above them.

You choose the tree shape, subject to the leaf order being fixed: any binary tree whose leaves read `c[1] … c[n]` left to right is allowed.

## Task

Report the smallest possible total cost.

## Input

```
Line 1:  n
Line 2:  c[1] c[2] ... c[n]
```

## Output

A single integer: the minimum total cost.

## Constraints

```
1  ≤  n  ≤  3000
0  ≤  c[i]  ≤  10^6
```

## Sample 1

**Input**
```
3
1 2 3
```

**Output**
```
12
```

**Explanation**

Joining the first two first: the inner node has value `1 + 2 + 1 = 4`, and the root has value `4 + 3 + 1 = 8`. Total `4 + 8 = 12`.

Joining the last two first: the inner node is `2 + 3 + 1 = 6`, the root is `1 + 6 + 1 = 8`. Total `6 + 8 = 14`.

The cheaper shape is **12**.

## Sample 2

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

One leaf, no joins, nothing to pay.

## Sample 3

**Input**
```
2
4 7
```

**Output**
```
12
```

**Explanation**

The only shape has one join, worth `4 + 7 + 1 = 12`.

## Sample 4

**Input**
```
4
1 1 1 1
```

**Output**
```
13
```

**Explanation**

Balanced — `(1,1)` and `(1,1)` then joined — gives `3 + 3 + 7 = 13`. A left-deep chain gives `3 + 5 + 7 = 15`. Balanced wins because the two small joins are not carried through as many levels.

## Notes

- First work out what a subtree's value actually is. A group covering leaves `i … j` has value `c[i] + … + c[j] + (j − i)`, because a binary tree over `j − i + 1` leaves always has exactly `j − i` internal nodes. So a subtree's **value does not depend on its shape at all** — only its position does.
- What shape changes is how many *times* those values are added up, since the total counts every internal node. Deep subtrees get charged repeatedly; that is the whole tension in the problem, and it is why the balanced shape wins in Sample 4.
- That gives the recurrence directly: the best cost for `i … j` is the cheapest way to split it into `i … k` and `k+1 … j`, plus the value of `i … j` itself, which is the same whatever the split. Single leaves cost nothing.
- Written plainly that is `O(n³)` — about `2.7 · 10^{10}` at `n = 3000`, too slow.
- The saving is a monotonicity property. Let `opt[i][j]` be the best split point. Because the weight function is a plain sum over the interval, it satisfies the quadrangle inequality, and then `opt[i][j−1] ≤ opt[i][j] ≤ opt[i+1][j]`. Restricting the search for `opt[i][j]` to that range collapses the whole DP to `O(n²)`.
- Fill the table by interval length so those two neighbours are ready when you need them.
- Costs reach `10^6` over `3000` leaves and are re-counted at every level, so totals reach roughly `10^{13}`. Use 64-bit.
