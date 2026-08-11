# Permission Merge

An access system has `b` distinct permissions, numbered `0` through `b − 1`. Each of `n` roles is described by a bitmask: bit `p` is set when that role grants permission `p`.

Assigning a user **two** roles gives them the union of both roles' permissions.

## Task

Count the pairs of roles `(i, j)` with `i < j` whose permissions together cover **every** one of the `b` permissions.

## Input

```
Line 1:  n  b
Line 2:  the n role masks, as integers
```

## Output

A single integer: the number of qualifying pairs.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  b  ≤  20
0  ≤  mask  <  2^b
```

Two different roles may have identical masks; they still count as a pair.

## Sample 1

**Input**
```
3 3
3 5 6
```

**Output**
```
3
```

**Explanation**

With three permissions, full coverage is mask `7`. All three pairs work: `3|5 = 7`, `3|6 = 7`, `5|6 = 7`.

## Sample 2

**Input**
```
2 2
1 1
```

**Output**
```
0
```

**Explanation**

Both roles grant only permission 0, so together they still miss permission 1.

## Sample 3

**Input**
```
4 2
3 3 0 1
```

**Output**
```
5
```

**Explanation**

Roles 1 and 2 already cover everything, so every pair involving either of them qualifies — that is 5 pairs. The remaining pair, roles 3 and 4, gives `0|1 = 1`, which misses permission 1.

## Sample 4

**Input**
```
1 5
31
```

**Output**
```
0
```

**Explanation**

One role covers everything by itself, but a pair needs two roles.

## Notes

- Checking all pairs is `n²/2`, about `2 · 10^{10}`. The masks, though, come from a universe of only `2^b ≤ 10^6` values — so count how many roles carry each mask and work over the universe instead of over the roles.
- Turn the condition around. Role `a` paired with role `c` covers everything exactly when `c` supplies every permission `a` is missing — that is, when `c` is a **superset** of `a`'s complement. So for each mask you need "how many roles are supersets of this mask".
- That is computable for every mask at once. Start with the plain counts, then for each bit in turn, add each mask's count into the mask **without** that bit. After all `b` passes, every entry holds the number of roles that are supersets of it. Total work is `b · 2^b`, around `2 · 10^7`.
- Then sum, over all roles, the superset count of that role's complement. That counts every qualifying ordered pair — and also counts a role with itself whenever the role alone covers everything, so subtract those, then halve.
- Getting that correction wrong is the usual failure: forget it and any role with a full mask inflates the answer.
- Up to `2 · 10^{10}` pairs, so the answer needs 64-bit even though every mask fits in an `int`.
