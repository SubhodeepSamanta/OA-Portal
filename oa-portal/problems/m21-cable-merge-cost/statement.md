# Cable Merge Cost

A campus networking team has `n` loose cable segments lying on the floor, of lengths `L[1] … L[n]` metres. They must all be spliced into one long run.

A splice joins **two** segments at a time. Joining a segment of length `a` to one of length `b` produces a single segment of length `a + b`, and the crew charges `a + b` for that splice — the whole length has to be re-sheathed and re-tested, so a splice costs exactly the length of the cable it produces.

The crew keeps splicing until only one segment is left. The order is entirely up to you, and different orders cost different amounts.

## Task

Report the smallest possible total charge to reduce all `n` segments to one.

## Input

```
Line 1:  n
Line 2:  L[1] L[2] ... L[n]
```

## Output

A single integer: the minimum total splicing cost.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  L[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 2 3 4
```

**Output**
```
19
```

**Explanation**

Splice `1+2 = 3` (cost 3). Segments are now `3, 3, 4`.
Splice `3+3 = 6` (cost 6). Segments are now `6, 4`.
Splice `6+4 = 10` (cost 10). Total **19**.

Compare a careless order: `3+4 = 7`, then `7+2 = 9`, then `9+1 = 10` costs `7+9+10 = 26`.

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

Already one segment. Nothing to splice, nothing to pay.

## Sample 3

**Input**
```
5
1 1 1 1 1
```

**Output**
```
12
```

**Explanation**

`1+1=2` (2), `1+1=2` (2), `1+2=3` (3), `2+3=5` (5). Total **12**.

Pairing the two 1s first each time keeps the growing segments out of later splices for as long as possible.

## Notes

- The natural first instinct — "join them left to right" — is wrong, and worth working out *why* on Sample 1 before reaching for a rule.
- Think about how many times a single original segment's length gets paid for. A segment that is spliced early sits inside every later result and is charged again each time. That reframing tells you what the greedy choice must be.
- Whatever rule you settle on, you need the two smallest segments **currently on the floor**, over and over, and the segments you create go back on the floor. Re-sorting after every splice is `O(n² log n)` and will not survive `n = 2 · 10^5`.
- The statement warns you about overflow for a reason. The total can approach `2 · 10^14 × log n`; a 32-bit accumulator silently wraps and you will fail large tests only.
