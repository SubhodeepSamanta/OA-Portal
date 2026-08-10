# Gear Ratios

Two gears are meshed together. Gear A has `a` teeth and gear B has `b` teeth. Both start with a painted tooth pointing straight up.

As they turn, one tooth of A passes for every tooth of B. After `k` teeth have gone by, gear A has turned `k / a` full rotations and gear B has turned `k / b`.

## Task

Report how many **full rotations of gear A** pass before both painted teeth point straight up again at the same moment, for the first time.

## Input

```
Line 1:  a  b
```

## Output

A single integer: the number of full rotations of gear A.

## Constraints

```
1  ≤  a, b  ≤  10^18
```

## Sample 1

**Input**
```
4 6
```

**Output**
```
3
```

**Explanation**

Both gears are back to their starting orientation once a multiple of 4 **and** of 6 teeth have passed — first at 12. Gear A has turned `12 / 4 = 3` times.

## Sample 2

**Input**
```
1 1
```

**Output**
```
1
```

## Sample 3

**Input**
```
12 8
```

**Output**
```
2
```

**Explanation**

24 teeth pass, so gear A turns twice and gear B three times.

## Sample 4

**Input**
```
1000000000000000000 999999999999999999
```

**Output**
```
999999999999999999
```

**Explanation**

These two share no factor, so nothing lines up until `a · b` teeth have passed. Gear A turns `b` times — and `a · b` itself is around `10^{36}`, which is the point of this sample.

## Notes

- The moment both are upright again is the first `k` that is a multiple of both tooth counts — their lowest common multiple. Gear A's rotations are then `lcm(a, b) / a`.
- Writing that as `a · b / gcd(a, b) / a` is correct mathematics and broken code: `a · b` reaches `10^{36}`, which overflows a 64-bit integer long before the division rescues it. The result would be silently wrong, not an error.
- Cancel on paper first. `lcm(a, b) / a` simplifies to `b / gcd(a, b)`, which never exceeds `b` and so never leaves the range of the inputs. One `gcd` and one division, no large intermediate anywhere.
- This is the general lesson with `lcm`: divide before you multiply. `a / gcd(a, b) * b` is the safe form when you genuinely need the `lcm` itself, and even that can overflow — here you never need it at all.
- The answer reaches `10^{18}`, which fits in a signed 64-bit integer. Read the input into one too: `a` and `b` will not fit in 32 bits.
