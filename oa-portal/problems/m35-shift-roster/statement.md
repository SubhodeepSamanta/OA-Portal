# Shift Roster

A hospital is drawing up next week's roster. There are `n` staff, numbered `1` through `n`, and `m` shifts, numbered `1` through `m`.

Each staff member has told the roster office which shifts they are willing and qualified to work. The office is given those `p` willingness pairs.

Two rules bind the roster:

- **every shift must be covered by exactly one person**, and
- **no person may work more than one shift** all week.

## Task

Decide whether a roster satisfying both rules exists. Print `YES` if it does, `NO` otherwise.

## Input

```
Line 1:       n  m  p
Next p lines: a  b      staff member a can work shift b
```

The same pair may be listed more than once.

## Output

`YES` or `NO` (uppercase).

## Constraints

```
1  ≤  n  ≤  500
1  ≤  m  ≤  500
0  ≤  p  ≤  10^5
1  ≤  a  ≤  n
1  ≤  b  ≤  m
```

## Sample 1

**Input**
```
3 3 4
1 1
1 2
2 2
3 3
```

**Output**
```
YES
```

**Explanation**

Only staff 1 can cover shift 1, so they take it. Shift 2 then goes to staff 2, and shift 3 to staff 3.

## Sample 2

**Input**
```
2 3 3
1 1
1 2
2 3
```

**Output**
```
NO
```

**Explanation**

Three shifts, two people, and nobody may work twice. It fails on counting alone, before you look at who can do what.

## Sample 3

**Input**
```
3 3 4
1 1
2 1
2 2
3 3
```

**Output**
```
YES
```

**Explanation**

Shift 1 can go to staff 1 or 2, but shift 2 can only go to staff 2. So shift 1 must take staff 1, freeing staff 2 for shift 2 and leaving staff 3 for shift 3.

This is the case that punishes a one-pass greedy: hand shift 1 to staff 2 because they came up first, and shift 2 is left with nobody — even though a full roster existed.

## Sample 4

**Input**
```
3 2 2
1 1
2 1
```

**Output**
```
NO
```

**Explanation**

Three staff and only two shifts is fine in principle — people may be left unrostered. But nobody at all is willing to work shift 2, and every shift must be covered.

## Notes

- Sample 3 is the heart of this. Assigning shifts one at a time and never revisiting a choice is not enough, because an early free choice can block a later forced one. You need to be able to say "take this shift back off you, cover it with someone else, and you take the new one" — and to let that displacement ripple as far as it needs to.
- That chain of displacements is the entire algorithm. For each shift in turn, search for a chain that ends at some staff member nobody has claimed yet; if you find one, flip every assignment along it and you have covered one more shift without uncovering any. If no such chain exists for some shift, no roster exists at all.
- Mark each staff member at most once per search, or a chain can loop forever.
- Two cheap checks answer many inputs before the search starts: if `m > n` the answer is `NO`, and if any shift has nobody willing the answer is `NO`.
- Duplicate pairs in the input are legal. They cost you nothing if your search marks people as it goes, but they do inflate `p`.
- `p` can be `0`, and then the answer is `NO` for any `m ≥ 1`.
