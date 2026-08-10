# Inventory Rebalance

A retailer has `n` warehouses in a line, numbered `1` through `n`. Warehouse `i` holds `s[i]` units of stock.

Moving **one unit** between **adjacent** warehouses costs ₹1. Moving a unit two warehouses along therefore costs ₹2.

Head office requires that when the shuffling is over, **every warehouse holds at least `m` units**. There is no upper limit — surplus stock may sit wherever it likes.

## Task

Report the cheapest way to satisfy that requirement, or `-1` if the total stock is not enough.

## Input

```
Line 1:  n  m
Line 2:  s[1] s[2] ... s[n]
```

## Output

A single integer: the minimum cost, or `-1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  m  ≤  10^9
0  ≤  s[i]  ≤  10^9
```

## Sample 1

**Input**
```
3 2
5 1 10
```

**Output**
```
1
```

**Explanation**

Warehouse 2 is one unit short. One unit from warehouse 1 costs ₹1 and fixes it, giving `4 2 10`. Taking it from warehouse 3 instead also costs ₹1. The surplus at warehouse 3 is left exactly where it is — moving it would only cost more.

## Sample 2

**Input**
```
3 1
3 0 0
```

**Output**
```
3
```

**Explanation**

Total stock is exactly `3 × 1`, so every warehouse must end with exactly 1. One unit travels one step and another travels two: `1 + 2 = 3`.

## Sample 3

**Input**
```
2 5
1 1
```

**Output**
```
-1
```

**Explanation**

Two units of stock cannot meet a requirement of 10.

## Sample 4

**Input**
```
4 1
4 0 0 0
```

**Output**
```
6
```

**Explanation**

`1 + 2 + 3 = 6`, the three units travelling one, two and three steps.

## Notes

- First the gate: if `total < n × m` the requirement cannot be met and the answer is `-1`. Note `n × m` reaches `2 · 10^{14}`, so compare in 64-bit.
- Now the shape of the problem. Every unit that crosses the boundary between warehouse `i` and `i+1` costs exactly ₹1, and no unit ever needs to cross the same boundary twice. So the total cost is the sum, over the `n−1` boundaries, of how much stock crosses each one — and that is `|prefix[i] − Q[i]|`, where `Q[i]` is the amount that **ends up** in the first `i` warehouses.
- Unlike the equalise-everything version, `Q` is not forced. All you know is that each warehouse ends with at least `m`, which says `Q[i] − Q[i−1] ≥ m`, and that the grand total is fixed.
- Substituting `R[i] = Q[i] − i·m` turns that condition into something much friendlier: `R` must be **non-decreasing**, starting at `R[0] = 0` and ending at `R[n] = total − n·m`. Since it is non-decreasing and starts at 0, every `R[i]` automatically lies in `[0, R[n]]`.
- So the whole problem is: given `A[i] = prefix[i] − i·m`, choose a non-decreasing `R` inside `[0, R[n]]` minimising `Σ|A[i] − R[i]|`. That is L1 isotonic regression with a box.
- The box comes off for free. For any `A[i]` outside `[0, R[n]]`, pushing it to the nearest edge costs a fixed amount that no choice of `R` can avoid, and after clamping every value is inside the box — so the remaining problem is unconstrained.
- What is left is the classic "make it non-decreasing as cheaply as possible under L1", which a max-heap solves in `O(n log n)`: push each value, and if the largest so far exceeds it, pay the difference and replace that largest with this value.
- Sample 1 is the case that catches a solution which only clamps and stops: the clamping costs nothing there, and the answer of 1 comes entirely from the isotonic step.
- The answer can approach `5 · 10^{18}`. That fits in a signed 64-bit integer and in nothing smaller.
