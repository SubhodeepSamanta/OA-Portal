# Currency Desk

A trading desk deals in `n` currencies, numbered `1` through `n`. It publishes `m` **one-way** conversion offers. Offer `i` reads:

> hand over 1 unit of currency `u`, receive `p / q` units of currency `v`

Both `p` and `q` are positive integers. An offer may be used as many times as you like, or not at all, and offers only run in the direction printed — `u → v` says nothing about `v → u`.

You walk in holding **exactly 1 unit of currency 1**. You may make any sequence of conversions you like. To walk out with a profit you must be **holding currency 1 again**.

## Task

Decide whether some sequence of conversions leaves you holding **strictly more than 1 unit of currency 1**.

Print `YES` if it does, `NO` otherwise.

## Input

```
Line 1:       n  m
Next m lines: u  v  p  q      1 unit of u becomes p/q units of v
```

## Output

`YES` or `NO` (uppercase).

## Constraints

```
1  ≤  n  ≤  500
0  ≤  m  ≤  5000
1  ≤  u, v  ≤  n
1  ≤  p, q  ≤  100
```

It is guaranteed that every directed cycle's overall multiplier is either **exactly 1**, or differs from 1 by at least one part in ten thousand. You will never be asked to separate 1 from 1.00000001.

## Sample 1

**Input**
```
3 3
1 2 3 2
2 3 3 2
3 1 3 2
```

**Output**
```
YES
```

**Explanation**

Each hop multiplies your holding by `1.5`, and the three hops bring you back to currency 1. One unit becomes `1.5³ = 3.375`.

## Sample 2

**Input**
```
2 2
1 2 1 2
2 1 1 2
```

**Output**
```
NO
```

**Explanation**

Out and back multiplies by `0.5 × 0.5 = 0.25`. Going round again only makes it worse.

## Sample 3

**Input**
```
2 2
1 2 3 2
2 1 2 3
```

**Output**
```
NO
```

**Explanation**

`1.5 × (2/3) = 1` exactly. You come back with precisely what you left with, and the question asks for **strictly** more.

## Sample 4

**Input**
```
3 3
1 2 1 1
2 3 5 1
3 2 5 1
```

**Output**
```
NO
```

**Explanation**

Currencies 2 and 3 form a wildly profitable loop, and you can even get into it from currency 1. But no offer converts anything back **into** currency 1, so all that profit is stranded — you can never be holding currency 1 again.

## Notes

- The quantity you are tracking is a **product**, and every algorithm you know for this shape of problem accumulates a **sum**. Find the transform that turns one into the other, and remember it also flips which direction counts as "good".
- After the transform, "the product of a loop exceeds 1" becomes a statement about the sign of a sum around a cycle — which is a standard thing to detect, in `O(n · m)`.
- Sample 4 is the whole difficulty. A profitable loop existing somewhere in the graph is **not** the answer. The loop must be reachable from currency 1 **and** able to lead back to currency 1. Compute both of those before you look for the loop, and throw away everything else.
- Sample 3 is the second trap. A loop that returns exactly what you put in is not a profit. Whatever comparison you use, it has to treat "exactly break even" as a no, while still being tolerant enough for floating point — which is what the guarantee in the constraints is there to let you do.
- `m` may be `0`, and `n` may be `1`. With nowhere to go, the answer is `NO`.

## A note on this version

The original asks you to *print the profitable cycle*. That cannot be auto-graded here — many different cycles are equally valid answers and a token comparison would reject correct ones. So this version asks only for the decision. Finding the cycle is the same algorithm plus a predecessor array, and it is worth writing that on paper: walk `n` steps back from a node that relaxed on the last pass to land inside the cycle, then follow predecessors until you repeat.
