# String Matching

> **Mirrored from CSES 1753** — <https://cses.fi/problemset/task/1753>
> Solve it here, then paste the same code into the CSES submit box.

Count how many times a pattern occurs in a string. Occurrences may **overlap**.

## Input

```
Line 1:  the string   (length n)
Line 2:  the pattern  (length m)
```

Both consist of lowercase letters `a`–`z`.

## Output

A single integer: the number of occurrences.

## Constraints

```
1  ≤  n, m  ≤  1000000
```

## Sample 1

**Input**
```
saippuakauppias
pp
```

**Output**
```
2
```

**Explanation**

Writing out `s a i p p u a k a u p p i a s` with 1-based positions, `pp` starts at position 4 and again at position 11. That is 2 occurrences.

## Notes

- Checking every start position character by character is `O(n·m)` — `10^{12}` at the limit.
- **KMP** does it in `O(n + m)`. Build the *failure function* (also called the prefix function) of the pattern:
  `fail[i]` = the length of the longest proper prefix of `pattern[0..i]` that is also a suffix of it.
  Then scan the string once, and whenever a character mismatches, fall back to `fail[matched−1]` instead of restarting.
- Because the fallback lands you inside the pattern rather than at its start, **overlapping occurrences are found automatically**. After a full match, do not reset the counter to zero — set it to `fail[m−1]` and carry on. Resetting to 0 is what makes overlapping cases (like `aaaa` containing `aa` three times) come out wrong.
- The Z-function is an equally good alternative: build `Z` over `pattern + '#' + string` and count positions where `Z[i] == m`. Pick whichever you can write correctly from memory — that matters more than which one it is.
- **Watch the memory.** With `n, m ≤ 10^6`, the concatenation trick allocates a 2 MB string, which is fine, but do not build anything quadratic. Read the lines with `scanf("%s")` into a static buffer or use `std::string` with `cin >> s` after `sync_with_stdio(false)`.
- Note `m` can exceed `n`, in which case the answer is 0. Guard the scan rather than indexing past the end.
- The count fits in `int` comfortably (at most `n`), but the strings themselves are the memory concern.
