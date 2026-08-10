# Signature Scanner

An antivirus engine holds one malware signature `p` and scans a byte stream `s`. Both are strings of lowercase letters.

The engine must report **every** position where the signature appears. Occurrences may overlap: in `aaaa` the signature `aa` occurs three times, starting at positions 1, 2 and 3.

Positions are counted from **1**.

## Task

Report how many times `p` occurs in `s`, then the starting position of each occurrence in increasing order.

## Input

```
Line 1:  p
Line 2:  s
```

## Output

```
Line 1:  k, the number of occurrences
Line 2:  the k starting positions, separated by single spaces
```

When `k` is `0`, the second line is empty — print the newline anyway.

## Constraints

```
1  ≤  |p|  ≤  |s|  ≤  10^6
```

Both strings contain only the lowercase letters `a`–`z`.

## Sample 1

**Input**
```
aba
abababa
```

**Output**
```
3
1 3 5
```

**Explanation**

`abababa` contains `aba` starting at 1, 3 and 5. These overlap heavily — the one starting at 3 reuses two characters from the one starting at 1 — and all three count.

## Sample 2

**Input**
```
aa
aaaa
```

**Output**
```
3
1 2 3
```

## Sample 3

**Input**
```
abc
defgh
```

**Output**
```
0

```

**Explanation**

No occurrences. The count line reads `0` and the position line is empty.

## Sample 4

**Input**
```
a
a
```

**Output**
```
1
1
```

## Notes

- The direct approach — try every start position and compare `|p|` characters — is `O(|s| · |p|)`. Feed it `s = aaaa…a` and `p = aaa…ab` and it does about `10^{12}` character comparisons.
- What kills it is throwing away work. After a mismatch it restarts one character along, having learnt nothing from the characters it just matched. But those characters were `p`'s own prefix, so it already knows everything about them.
- So precompute, for every prefix of `p`, the length of the longest proper prefix of `p` that is also a suffix of it. On a mismatch, that number tells you how far you may jump without skipping any occurrence — and the scan then never moves backwards through `s`.
- The overlapping rule is what decides your behaviour on a **successful** match. Do not restart from scratch after finding one; fall back the same way you would on a mismatch, or you will miss the occurrence at position 3 in Sample 1.
- `|s|` reaches `10^6` and there can be up to `10^6` occurrences, so the output line alone can be several megabytes. Build it in one buffer and write it once — printing positions one at a time will cost you the limit.
- `p` and `s` may be the same string, and `|p| = |s|` is legal.
