# Playlist Symmetry

A playlist is encoded as a string `s` of lowercase letters, one letter per track.

A **substring** is any run of consecutive tracks. A substring is **symmetric** if it reads the same forwards and backwards.

## Task

Count how many **distinct** symmetric substrings the playlist contains.

Distinct means counted by content, not by position: if the same symmetric string appears in three places it still counts once.

## Input

```
Line 1:  s
```

## Output

A single integer: the number of distinct symmetric substrings.

## Constraints

```
1  ≤  |s|  ≤  2 · 10^5
```

`s` contains only the lowercase letters `a`–`z`.

## Sample 1

**Input**
```
aabaa
```

**Output**
```
5
```

**Explanation**

The distinct symmetric substrings are `a`, `b`, `aa`, `aba` and `aabaa` — **5** of them.

`aa` occurs twice, at the start and at the end, and counts once. Note that `a` counts once despite appearing four times.

## Sample 2

**Input**
```
abc
```

**Output**
```
3
```

**Explanation**

Only the three single letters.

## Sample 3

**Input**
```
aaaa
```

**Output**
```
4
```

**Explanation**

`a`, `aa`, `aaa`, `aaaa`. A string of one repeated letter gives exactly `|s|` of them, no more — every symmetric substring is determined by its length alone.

## Sample 4

**Input**
```
a
```

**Output**
```
1
```

## Notes

- The obvious method — take every substring, test it, put it in a set — is `O(n²)` substrings each costing `O(n)` to build and hash. At `2 · 10^5` that is far beyond reach in both time and memory.
- Before reaching for machinery, prove the bound that makes this tractable: **a string of length `n` has at most `n` distinct symmetric substrings.** Consider reading the string left to right; each new character can introduce at most one symmetric substring that has never been seen before, namely the longest one ending at that position. Everything shorter ending there is also a suffix of that one — and, by symmetry, a prefix of it, so it appeared earlier.
- That proof is the algorithm. Sweep the string once, and at each position find the longest symmetric substring ending there; the answer is just how many times you find something new.
- Doing that step in amortised constant time is the real work. Keep the symmetric substrings you have found in a structure where each one records the longest *proper* symmetric suffix of itself, so that when a character fails to extend the current one you can fall back rather than restart. That fallback chain is the same idea as the prefix function, applied to symmetry.
- The answer never exceeds `2 · 10^5`, so nothing overflows here. The difficulty is entirely in the structure.
