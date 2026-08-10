# Router Prefix Table

A router holds `n` routing rules. Each rule is a string of `0`s and `1`s — the leading bits an address must start with for that rule to apply.

Then `q` packets arrive. Each destination address is given as **exactly 32** binary characters.

A rule **matches** an address when the rule is a prefix of that address. Several rules can match at once, and routers always follow the **longest** one — the most specific route wins.

## Task

For each address, report the length of the longest rule that matches it, or `-1` if no rule matches at all.

## Input

```
Line 1:       n  q
Next n lines: a rule, a binary string of length 1 to 32
Next q lines: an address, a binary string of length exactly 32
```

The same rule may be listed more than once.

## Output

`q` lines, one per address in order.

## Constraints

```
1  ≤  n, q  ≤  2 · 10^5
1  ≤  length of each rule  ≤  32
total length of all rules  ≤  10^6
```

## Sample 1

**Input**
```
3 2
1
10
1011
10110000000000000000000000000000
01110000000000000000000000000000
```

**Output**
```
4
-1
```

**Explanation**

The first address starts `1011…`, so all three rules match it — `1`, `10` and `1011`. The most specific is `1011`, of length **4**.

The second address starts with `0`, and no rule does. **-1**.

## Sample 2

**Input**
```
1 1
0
00000000000000000000000000000000
```

**Output**
```
1
```

## Sample 3

**Input**
```
2 1
11
1
10000000000000000000000000000000
```

**Output**
```
1
```

**Explanation**

Rule `11` does not match — the address's second bit is `0`. Only `1` matches, so the answer is its length, **1**.

Notice the rules are not given in any useful order, and the *longer* rule is the one that fails.

## Notes

- Comparing every address against every rule is `n · q` prefix checks — `4 · 10^{10}` character comparisons at the limits.
- The redundancy to exploit is that rules share leading bits. Rules `1`, `10` and `1011` all start the same way, and an address walking down its own bits passes through all of them in one go.
- So arrange the rules by their shared beginnings, into a structure where following an address bit by bit visits every rule that could match it, in increasing order of length. Then one walk of at most 32 steps answers a query, and the last marked point you passed is the answer.
- Every node needs to record whether a rule *ends* there. A node existing is not the same as a rule ending at it — `1011` creates a node for `101` even when no rule `101` was ever given.
- Duplicate rules are legal and must not break the marking.
- Sizes are large in both directions: up to `10^6` characters of rules, and `2 · 10^5 × 32` characters of addresses. Use fast input and write the output in one go.
