# Tree of Space II

Same storage system as before: a rooted tree of `n` nodes numbered `1 … n` with node `1` as the root, and users identified by an integer `uid`.

`x` is an **ancestor** of `y` if `x` lies on the path from `y` up to the root; `y` is then a **descendant** of `x`. A node is neither its own ancestor nor its own descendant. A failed operation changes nothing.

**`lock(v, uid)`** — succeeds only if `v` is unlocked, no ancestor of `v` is locked, and no descendant of `v` is locked. On success `v` becomes locked, held by `uid`.

**`unlock(v, uid)`** — succeeds only if `v` is locked and held by that same `uid`. On success `v` becomes unlocked.

**`upgrade(v, uid)`** — succeeds only if `v` is unlocked, at least one descendant of `v` is locked, and every locked descendant of `v` is held by `uid`. On success all of those descendants are unlocked and `v` becomes locked, held by `uid`.

**`count(v)`** — the new one. Report how many locked nodes lie in the subtree of `v`, **including `v` itself** if it happens to be locked. This is a pure query and never changes anything. It must answer in `O(log n)`.

## Task

Process the `q` operations in order. Lock, unlock and upgrade report whether they succeeded; count reports a number.

## Input

```
Line 1:       n  q
Line 2:       parent[2] parent[3] ... parent[n]
Next q lines: type  v  uid
```

- `parent[i]` is the parent of node `i`, for `i` from `2` to `n`; the list has `n − 1` entries and is empty when `n = 1`.
- `type` is `1` lock, `2` unlock, `3` upgrade, `4` count.
- **Every operation line has three integers.** For `type = 4` the third is always `0` and carries no meaning — read it and discard it.

## Output

One line per operation, in order:
- types `1`, `2`, `3` → `true` or `false` (lowercase)
- type `4` → a single integer

## Constraints

```
1  ≤  n  ≤  10^5
1  ≤  q  ≤  10^5
1  ≤  parent[i]  <  i
1  ≤  v  ≤  n
1  ≤  uid  ≤  10^5     (0 on count lines)
```

## Sample 1

**Input**
```
7 6
1 1 2 2 3 3
1 4 5
1 5 5
4 2 0
3 2 5
4 2 0
4 1 0
```

**Output**
```
true
true
2
true
1
1
```

**Explanation**

The tree is:

```
            1
          /   \
         2     3
        / \   / \
       4   5 6   7
```

Nodes 4 and 5 get locked by user 5, so the subtree of node 2 holds **2** locks. The upgrade then releases both and locks node 2 itself, so the subtree of node 2 now holds exactly **1** — node 2 counts itself. The whole tree holds that same single lock, so the count at the root is **1** too.

## Sample 2

**Input**
```
3 4
1 1
4 1 0
1 2 3
4 1 0
4 3 0
```

**Output**
```
0
true
1
0
```

**Explanation**

Nothing is locked at first. After locking node 2, the root's subtree contains one lock, but node 3's subtree contains none — node 3 is a sibling of node 2, not an ancestor of it.

## Notes

- Everything from the first version still holds: locked nodes always form an antichain, and both the ancestor test and the descendant test have to be `O(log n)`.
- If your first version already flattened the tree, `count` is nearly free — it is the same subtree range you were already querying to decide whether a lock is allowed. If it is not nearly free, that is a signal your first version was structured around the wrong primitive.
- `count(v)` includes `v` itself, unlike the descendant test inside `lock`. That is one `≥`/`>` away from being wrong on exactly the inputs where `v` is the locked node, which random testing hits constantly.
- Answers are at most `10^5`, but the operation stream is long — build one output buffer and write it once.
