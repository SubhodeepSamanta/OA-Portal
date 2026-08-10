# Parity Lock

A machine holds `n` counters, showing `a[1] … a[n]`.

The only control available performs one operation: **pick any two different counters and add 1 to each**. You may do this as often as you like, choosing a different pair each time if you wish.

## Task

Decide whether the counters can all be made to show the same value. Print `YES` or `NO`.

## Input

```
Line 1:  n
Line 2:  a[1] a[2] ... a[n]
```

## Output

`YES` or `NO` (uppercase).

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
YES
```

**Explanation**

Add to counters 1 and 2 twice, then to counters 1 and 3 once: `1 2 3` becomes `4 4 4`.

## Sample 2

**Input**
```
2
1 2
```

**Output**
```
NO
```

**Explanation**

With only two counters, every operation must use both, so their difference never changes. They start one apart and stay one apart forever.

## Sample 3

**Input**
```
4
1 1 1 2
```

**Output**
```
NO
```

**Explanation**

Every operation adds 2 to the total, so the total's parity never changes. It starts at 5, odd. Four equal counters would total `4T`, which is always even, so it can never be reached.

## Sample 4

**Input**
```
1
7
```

**Output**
```
YES
```

**Explanation**

A single counter is already "all equal", and no operation is possible anyway — there is no second counter to pair it with.

## Notes

- Do not simulate. Look for what an operation **cannot** change, because that is what decides the answer.
- Two such quantities matter. Every operation adds exactly 2 to the total, so the **parity of the total** is fixed forever. And ending with all `n` counters at `T` means a total of `n · T` — so if `n` is even that total is always even, and an odd starting total is hopeless.
- With `n` odd, `n · T` can be made either parity by choosing `T`, so the parity obstruction disappears entirely.
- The second obstruction only bites at `n = 2`, where every operation is forced to touch both counters and their difference is frozen. For `n ≥ 3` you always have a spare counter to pair with, so any single counter can be raised relative to another, and given a large enough `T` everything can be brought level.
- If you want the general condition rather than the case split: writing `d[i] = T − a[i]`, you need `Σd` even and `max d ≤ Σd / 2` — no counter may need more than half the total increments, since each operation gives away exactly two. Working out which `T` satisfy that is where the parity argument comes from.
- `n = 1` and `n = 2` are the two cases worth checking before you write anything general; both samples are here for that.
- The total reaches `2 · 10^{14}`, so compute it in 64-bit before testing its parity.
