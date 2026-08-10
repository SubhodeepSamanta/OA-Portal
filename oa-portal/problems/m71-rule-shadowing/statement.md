# Rule Shadowing

A firewall holds `n` rules in strict priority order. Rule `i` matches every address in the inclusive range `[l[i], r[i]]` and carries an action, either `ALLOW` or `DENY`. An incoming packet is handled by the **first** rule that matches it.

A rule is **shadowed** when it can never handle a packet: every address it matches is already matched by some rule listed before it. Shadowed rules are dead weight and the security team wants them counted.

## Task

Report how many of the `n` rules are shadowed.

## Input

```
Line 1:       n
Next n lines: l  r  action        action is ALLOW or DENY
```

## Output

A single integer: the number of shadowed rules.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  l  ≤  r  <  2^32
```

Addresses go up to `2^32 − 1`, which does not fit in a signed 32-bit integer.

## Sample 1

**Input**
```
3
0 100 ALLOW
50 60 DENY
0 200 ALLOW
```

**Output**
```
1
```

**Explanation**

Rule 2 matches only addresses 50 to 60, all of which rule 1 already handles, so it is shadowed and its `DENY` never fires. Rule 3 reaches beyond 100, so it is still live.

## Sample 2

**Input**
```
2
0 10 ALLOW
11 20 DENY
```

**Output**
```
0
```

**Explanation**

The ranges sit next to each other but do not overlap: address 11 is matched only by rule 2. Neither is shadowed.

## Sample 3

**Input**
```
4
0 10 ALLOW
20 30 DENY
5 25 ALLOW
0 30 DENY
```

**Output**
```
1
```

**Explanation**

Rule 3 spans the gap from 11 to 19 that neither earlier rule covers, so it is live. Once it is in place, addresses 0 to 30 are all covered, and rule 4 is shadowed.

## Sample 4

**Input**
```
3
0 10 ALLOW
11 20 ALLOW
5 15 DENY
```

**Output**
```
1
```

**Explanation**

Rules 1 and 2 are both live. Together they cover 0 to 20 with no gap — they are adjacent, not overlapping — so rule 3 is shadowed even though no single earlier rule contains it.

## Notes

- The action is a decoy. Shadowing is about which addresses are matched, not what happens to them, so `ALLOW` and `DENY` never enter the calculation. Read them and ignore them.
- Keep the covered addresses as a set of disjoint ranges and grow it rule by rule. The question for each new rule is whether its range is already entirely inside that set.
- Here is the observation that makes the check cheap: if you merge ranges that **touch** as well as ranges that overlap — so `[0,10]` and `[11,20]` become `[0,20]` — then no two stored ranges are ever adjacent. A range that is fully covered must then lie inside a **single** stored range, because two stored ranges could never tile it without touching. So the test is one lookup, not a walk.
- Sample 4 is exactly why the merge has to include touching ranges. Merge only on overlap and rule 3 looks live.
- Merging a new range absorbs every stored range that overlaps or touches it. Each stored range is created once and absorbed at most once, so the total work stays near linear despite the loop.
- Addresses reach `2^32 − 1`. Use a 64-bit type — and be careful computing `r + 1` when checking adjacency at the very top of the range.
