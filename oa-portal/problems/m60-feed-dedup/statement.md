# Feed Dedup

A social feed has `n` posts. Spammers reuse the same text with the words shuffled and the punctuation changed, so the feed needs deduplicating.

Two posts count as **the same** when, after

1. deleting every character that is not a letter, and
2. lowercasing what remains,

one is an anagram of the other — that is, they use exactly the same letters the same number of times, in any order.

Sameness is transitive: if post A matches post B and post B matches post C, all three are one post.

## Task

Report how many **distinct** posts the feed really contains.

## Input

```
Line 1:       n
Next n lines: one post each
```

A post is a single line and may contain **any printable characters, including spaces**. It never contains a newline.

## Output

A single integer: the number of distinct posts.

## Constraints

```
1  ≤  n  ≤  10^5
total length of all posts  ≤  10^6
```

## Sample 1

**Input**
```
3
Listen!
Silent
enlist
```

**Output**
```
1
```

**Explanation**

Strip the `!`, lowercase everything, and all three are rearrangements of `eilnst`.

## Sample 2

**Input**
```
2
hello
world
```

**Output**
```
2
```

## Sample 3

**Input**
```
4
Dormitory
Dirty Room!!
abc
cab
```

**Output**
```
2
```

**Explanation**

`Dormitory` and `Dirty Room!!` both reduce to the letters of `dimoorrty` — the space and the exclamation marks are deleted before comparing. `abc` and `cab` are the other group.

## Sample 4

**Input**
```
3
!!!
...
123
```

**Output**
```
1
```

**Explanation**

None of these contain a single letter, so all three reduce to nothing at all — and empty matches empty. They are one post.

## Notes

- Never compare posts pairwise. That is `10^{10}` comparisons at the limit, each one expensive.
- Instead give every post a **canonical form** — something that is identical for two posts exactly when they are duplicates — and count how many distinct forms appear. Then it is one pass and a set.
- Sorting each post's letters is a valid canonical form, but the posts are long; a far cheaper one is the tally of how many times each of the 26 letters occurs. Two posts are anagrams precisely when those 26 numbers match.
- Read whole **lines**, not whitespace-separated tokens. A post can contain spaces, and reading token by token would split one post into several and quietly change the answer. Watch the newline left behind after reading `n`.
- Everything that is not `a`–`z` or `A`–`Z` is deleted, not replaced by a space — digits and punctuation simply vanish.
- A post with no letters is legal, and all such posts are duplicates of one another, as Sample 4 shows.
- Total input is `10^6` characters, so read it in bulk rather than character by character, and avoid building a fresh sorted copy of every post.
