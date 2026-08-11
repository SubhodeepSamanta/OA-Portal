# Undo-Redo Editor

A text editor holds one document, initially empty, and supports five commands:

- **`APPEND s`** — add the string `s` to the end of the document.
- **`DELETE k`** — remove the last `k` characters.
- **`UNDO`** — revert the most recent `APPEND` or `DELETE` that has not already been undone. If there is nothing to undo, do nothing.
- **`REDO`** — re-apply the most recently undone command. If there is nothing to redo, do nothing.
- **`PRINT i`** — output the `i`-th character of the document, counting from 1.

A new `APPEND` or `DELETE` **clears the redo history** — once you type something fresh, the undone edits are gone for good. `PRINT` never affects undo or redo.

## Task

Output the character requested by each `PRINT`.

## Input

```
Line 1:       q
Next q lines: one command
```

## Output

One line per `PRINT`, containing the single character requested.

## Constraints

```
1  ≤  q  ≤  2 · 10^5
total length of all APPEND strings  ≤  2 · 10^5
```

`APPEND` strings are lowercase letters. `DELETE k` never removes more characters than the document holds, and `PRINT i` always names a position that exists.

## Sample 1

**Input**
```
6
APPEND abc
PRINT 2
DELETE 1
PRINT 2
UNDO
PRINT 3
```

**Output**
```
b
b
c
```

**Explanation**

`abc`, then `ab` after the delete — position 2 is `b` in both. The undo restores `abc`, so position 3 is `c` again.

## Sample 2

**Input**
```
7
APPEND xy
APPEND z
UNDO
PRINT 2
REDO
PRINT 3
UNDO
```

**Output**
```
y
z
```

**Explanation**

After undoing the second append the document is `xy`. Redo brings back `xyz`.

## Sample 3

**Input**
```
5
UNDO
APPEND ab
UNDO
REDO
PRINT 1
```

**Output**
```
a
```

**Explanation**

The first `UNDO` has nothing to undo and is simply ignored — it is not an error, and it must not consume the append that follows.

## Notes

- Do not keep the document as a string you copy on every edit. A run of appends and undos would copy an ever-growing string each time, which is quadratic in both time and memory.
- Look at what an edit actually does. `APPEND` extends the end; `DELETE` retracts from the end. So every document that ever exists is a **path from the root** in a tree whose edges are single characters — exactly the structure of a trie built from everything ever appended.
- Then a version is just a node. Its length is its depth. `DELETE k` moves `k` steps up. And the `i`-th character of the current document is the character on the **ancestor at depth `i`** — a jump of `depth − i` steps.
- Jumping a known number of steps up a tree quickly is binary lifting: store for each node its ancestor 1, 2, 4, 8 … steps above, and any jump decomposes into the set bits of the distance. Each `PRINT` and each `DELETE` then costs `O(log q)`.
- Undo and redo need no copying at all once you see this: a version is a single node pointer, so keep a stack of previous pointers and a stack of undone ones. Undo moves a pointer from one to the other; a fresh edit empties the redo stack.
- The two easy mistakes are letting `UNDO` on an empty history swallow the next command, and forgetting that a new edit discards the redo history. Samples 2 and 3 cover both.
