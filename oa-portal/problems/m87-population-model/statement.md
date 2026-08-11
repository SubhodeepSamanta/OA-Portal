# Population Model

A colony's size follows

```
p(t) = a · p(t−1) + b · p(t−2)      for t ≥ 2
```

with `p(0)`, `p(1)`, `a` and `b` given.

## Task

Report `p(T)` **modulo `10^9 + 7`**.

## Input

```
Line 1:  p0  p1  a  b  T
```

## Output

A single integer: `p(T)` modulo `10^9 + 7`.

## Constraints

```
0  ≤  p0, p1, a, b  <  10^9 + 7
0  ≤  T  ≤  10^18
```

## Sample 1

**Input**
```
0 1 1 1 10
```

**Output**
```
55
```

**Explanation**

`a = b = 1` with those starting values is the Fibonacci sequence, and `p(10) = 55`.

## Sample 2

**Input**
```
1 1 1 0 5
```

**Output**
```
1
```

**Explanation**

With `b = 0` each term simply copies the one before it.

## Sample 3

**Input**
```
0 1 1 1 0
```

**Output**
```
0
```

**Explanation**

`T = 0` asks for the starting value, not for any step of the recurrence.

## Sample 4

**Input**
```
2 3 2 3 4
```

**Output**
```
102
```

**Explanation**

`p(2) = 2·3 + 3·2 = 12`, `p(3) = 2·12 + 3·3 = 33`, `p(4) = 2·33 + 3·12 = 102`.

## Notes

- `T` reaches `10^18`, so iterating is impossible even though each step is trivial.
- The move is to notice the step is **linear**: the pair `(p(t), p(t−1))` is obtained from `(p(t−1), p(t−2))` by a fixed 2×2 matrix, `[[a, b], [1, 0]]`. Advancing `T − 1` steps is that matrix raised to the `T − 1`.
- A matrix power is computed the same way as a numeric one: square repeatedly and multiply in the factors matching the set bits of the exponent. That is `O(log T)` matrix multiplications, each eight multiplications of residues.
- Reduce modulo `10^9 + 7` after every multiplication. A product of two residues reaches `10^{18}`, which fits in a signed 64-bit integer only just — never let two of them add up before reducing.
- Handle the small exponents before you start: `T = 0` and `T = 1` are the given values and must not go through the matrix at all, since the exponent would be negative.
- `a`, `b` and the starting values can be zero, which is legal and worth a moment's thought — the sequence may collapse to zeros.
