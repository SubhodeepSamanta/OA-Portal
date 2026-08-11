# Antenna Placement

`n` houses sit along a straight road. House `i` is at position `x[i]`. One antenna is to be installed at an **integer** position `p` on the same road.

The cost of serving house `i` is the square of its distance to the antenna, `(x[i] − p)^2`. The cost of a placement is the sum over all houses.

## Task

Report the minimum achievable total cost.

## Input

```
Line 1:  n
Line 2:  x[1] x[2] ... x[n]
```

## Output

A single integer: the minimum total cost.

## Constraints

```
1  ≤  n     ≤  200000
0  ≤  x[i]  ≤  1000000
```

Positions may repeat. The antenna may share a position with a house.

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

At `p = 2` the cost is `1 + 0 + 1 = 2`. No integer position does better.

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

## Sample 3

**Input**
```
2
0 3
```

**Output**
```
5
```

**Explanation**

The real-valued optimum is `1.5`, which is not allowed. Both `p = 1` (`1 + 4`) and `p = 2` (`4 + 1`) cost 5.

## Sample 4

**Input**
```
4
0 0 0 4
```

**Output**
```
12
```

## Notes

- Expand the cost as a function of `p`:
  `f(p) = Σ(x[i] − p)^2 = n·p^2 − 2·p·Σx[i] + Σx[i]^2`.
  That is an upward parabola in `p`, so it has a single minimum and no local traps.
- Over the reals the minimum sits at the **mean** `Σx[i] / n`. That is the whole reason squared distance shows up in least-squares fitting — minimising it lands you on the average. (Minimising the *absolute* distance instead would land you on the median; these are different problems, and mixing them up is a classic slip.)
- Since `p` must be an integer and the parabola is symmetric about the mean, the answer is at `floor(mean)` or `ceil(mean)`. Evaluate both and take the smaller — do not assume rounding to nearest is always right, just check the two.
- Alternatively, `f` is convex over the integers, so a ternary search on `[min x, max x]` also works. Both are fine; the closed form is `O(n)`.
- Overflow is the real trap here. `Σx[i]^2` reaches `2·10^5 · (10^6)^2 = 2·10^{17}`, which needs a 64-bit type. A 32-bit accumulator wraps long before the end of a large case. Likewise compute the mean with integer division on 64-bit values rather than converting to `double` — at these magnitudes a `double` has enough precision, but the habit of trusting floats for exact integer answers will cost you elsewhere.
- Do not evaluate every candidate position from `min` to `max`: with `n = 2·10^5` and a span of `10^6` that is `2·10^{11}` operations.
