# Circuit Test Vectors

A test rig drives `n` binary inputs, numbered `1` through `n`. Each is set to `0` or `1`.

`m` wiring constraints are imposed. Constraint `j` names two inputs `i` and `j` and a type:

- type `0` — the two inputs must be **equal**;
- type `1` — the two inputs must **differ**.

## Task

Count the assignments of `0`/`1` to all `n` inputs that satisfy every constraint, **modulo `10^9 + 7`**.

If no assignment satisfies them, the answer is `0`.

## Input

```
Line 1:       n  m
Next m lines: i  j  type
```

## Output

A single integer: the number of satisfying assignments, modulo `10^9 + 7`.

## Constraints

```
1  ≤  n  ≤  10^5
0  ≤  m  ≤  2 · 10^5
1  ≤  i, j  ≤  n
type  ∈  {0, 1}
```

A constraint may repeat, and `i` may equal `j`.

## Sample 1

**Input**
```
3 2
1 2 1
2 3 1
```

**Output**
```
2
```

**Explanation**

Input 1 differs from 2, and 2 differs from 3 — so 1 and 3 agree. Fixing input 1 fixes everything, giving `010` and `101`.

## Sample 2

**Input**
```
3 3
1 2 1
2 3 1
1 3 1
```

**Output**
```
0
```

**Explanation**

The first two force inputs 1 and 3 to be equal, and the third demands they differ. Nothing satisfies all three.

## Sample 3

**Input**
```
3 0
```

**Output**
```
8
```

**Explanation**

With no constraints every input is free: `2^3`.

## Sample 4

**Input**
```
2 1
1 2 0
```

**Output**
```
2
```

## Notes

- `n` reaches `10^5`, so trying assignments is out — `2^{100000}` of them. The constraints are the structure to exploit, not an obstacle to search around.
- Every constraint fixes the **relationship** between two inputs, never their values. So once you pick a value for any single input, every input connected to it by constraints is determined. A whole connected group therefore has exactly **two** consistent assignments — unless it has none.
- That gives the count immediately: `2^{number of connected groups}`, where inputs touched by no constraint are groups of one.
- Contradiction is the other half. Track, for each input, its value **relative to** the representative of its group — a single parity bit. Merging two groups fixes their relative parity; if a constraint joins two inputs already in the same group, it either agrees with the parity already recorded or it does not, and disagreement means the answer is `0`.
- A disjoint-set structure carrying that parity alongside the parent is the standard tool. Keep the parity correct through path compression — that is the part worth being careful about.
- `i = j` is legal input: a self-constraint of type 0 is vacuous, and one of type 1 is an immediate contradiction.
- Take the modulus while exponentiating; `2^{100000}` is not a number you can hold.
