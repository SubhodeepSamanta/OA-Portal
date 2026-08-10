# Broken Keyboard

You are copying out a document `s`, a string of lowercase letters. Your keyboard is damaged: only `k` of the letter keys still work.

You can type a run of consecutive characters from `s` only if **every** character in that run is on a working key. The moment you need a broken key, the run stops.

## Task

Report the length of the longest run of consecutive characters of `s` that you can type.

If not a single character of `s` can be typed, report `0`.

## Input

```
Line 1:  s
Line 2:  k
Line 3:  k lowercase letters separated by spaces — the working keys
```

The `k` letters are distinct.

## Output

A single integer: the length of the longest typeable run.

## Constraints

```
1  ≤  |s|  ≤  10^6
1  ≤  k  ≤  26
```

`s` contains only lowercase letters.

## Sample 1

**Input**
```
abacaba
2
a b
```

**Output**
```
3
```

**Explanation**

The `c` in the middle is unusable, splitting the document into `aba` and `aba`. Both are typeable and three characters long.

## Sample 2

**Input**
```
abc
1
z
```

**Output**
```
0
```

**Explanation**

The only working key never appears in the document.

## Sample 3

**Input**
```
aaaa
1
a
```

**Output**
```
4
```

## Sample 4

**Input**
```
xyzzy
3
x y z
```

**Output**
```
5
```

**Explanation**

Every key needed happens to work, so the whole document is one run.

## Notes

- This is one pass. Walk the document keeping a count of how many consecutive typeable characters you have just seen; a broken key resets the count to zero, and the answer is the largest count you ever reached.
- The classic slip is resetting to `1` instead of `0` at a broken character — the broken character itself is not typeable and must not be counted as the start of the next run.
- Testing membership in the working set must be `O(1)`. Scanning a list of up to 26 letters for every one of `10^6` characters is 26 million comparisons for no reason; a 26-slot lookup table indexed by `c - 'a'` costs nothing.
- Answer `0` is a genuine outcome, not an error, and Sample 2 is exactly that case.
- `10^6` characters is enough that reading the document character by character with slow input will dominate the runtime. Read it in one go.
