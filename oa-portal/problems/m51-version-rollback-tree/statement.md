# Version Rollback Tree

A document editor keeps every version it has ever produced. **Version 0** is the empty document and always exists.

`q` operations arrive:

- **`EDIT v c`** — take version `v`, append the single character `c` to the end of it, and save the result as a **brand-new version**. New versions are numbered `1, 2, 3, …` in the order the `EDIT` operations occur. Version `v` itself is unchanged — older versions are never modified or discarded.
- **`QUERY v k`** — report the `k`-th character of version `v`, counting from 1.

Because an `EDIT` can branch off *any* existing version, the versions form a tree rather than a line.

## Task

Answer every `QUERY`, in order.

## Input

```
Line 1:       q
Next q lines: either  EDIT v c   or   QUERY v k
```

- In `EDIT v c`, version `v` already exists and `c` is a lowercase letter.
- In `QUERY v k`, version `v` already exists and `1 ≤ k ≤` the length of version `v`.

## Output

One line per `QUERY`: the single character requested.

## Constraints

```
1  ≤  q  ≤  2 · 10^5
```

## Sample 1

**Input**
```
5
EDIT 0 a
EDIT 1 b
QUERY 2 1
QUERY 2 2
EDIT 1 c
```

**Output**
```
a
b
```

**Explanation**

Version 1 is `a` and version 2 is `ab`, so its first and second characters are `a` and `b`. The final `EDIT` branches off version 1 again, creating version 3 = `ac` — and leaves version 2 exactly as it was.

## Sample 2

**Input**
```
6
EDIT 0 x
EDIT 1 y
EDIT 1 z
QUERY 2 2
QUERY 3 2
QUERY 3 1
```

**Output**
```
y
z
x
```

**Explanation**

Versions 2 (`xy`) and 3 (`xz`) both grow out of version 1 (`x`). They share their first character and differ in their second.

## Sample 3

**Input**
```
7
EDIT 0 a
EDIT 1 b
EDIT 2 c
EDIT 3 d
QUERY 4 1
QUERY 4 4
QUERY 4 2
```

**Output**
```
a
d
b
```

## Notes

- Do not store the versions as strings. A chain of `2 · 10^5` edits would copy an ever-growing string each time — quadratic in both time and memory.
- Notice what a version actually *is*: a version and its parent differ by exactly one character, appended at the end. So the length of a version is its depth in the tree, and the character at position `k` of version `v` is the character that was appended by **the ancestor of `v` at depth `k`**.
- That turns the whole problem into "walk up from `v` by `depth(v) − k` steps". Walking one step at a time is `O(depth)`, which is `2 · 10^5` per query in the worst case — a single long chain — so it must be faster.
- The standard way to jump a known number of steps up a tree quickly is to precompute, for each node, its ancestor `1` step up, `2` up, `4` up, `8` up, and so on. Then any jump decomposes into the set bits of the distance, and each query costs `O(log q)`.
- The tree is built as you go, but that is fine: a node's jump table only ever refers to nodes that already exist, so you can fill it in the moment the node is created.
- Version 0 is a real node of length 0 that you never query, but every chain bottoms out there. Watch the depth arithmetic around it.
- Up to `2 · 10^5` single-character answers: build one output buffer rather than printing each one.
