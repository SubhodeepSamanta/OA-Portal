# Tree of Space

A storage system is laid out as a rooted tree of `n` nodes, numbered `1` through `n`. Node `1` is the root. Node `x` is an **ancestor** of node `y` if `x` lies on the path from `y` up to the root; `y` is then a **descendant** of `x`. A node is neither its own ancestor nor its own descendant.

Users lock nodes to reserve the space beneath them. A user is identified by an integer `uid`. Three operations arrive, `q` of them, and each either succeeds or fails. **A failed operation changes nothing at all.**

**`lock(v, uid)`** succeeds only if all three hold:
- `v` is currently unlocked,
- no ancestor of `v` is locked,
- no descendant of `v` is locked.

On success `v` becomes locked, held by `uid`.

**`unlock(v, uid)`** succeeds only if `v` is currently locked **and held by that same `uid`**. On success `v` becomes unlocked.

**`upgrade(v, uid)`** succeeds only if all three hold:
- `v` is currently unlocked,
- **at least one** descendant of `v` is locked,
- **every** locked descendant of `v` is held by `uid`.

On success every locked descendant of `v` is unlocked, and `v` becomes locked, held by `uid`.

## Task

Process the `q` operations in order and report whether each one succeeded.

## Input

```
Line 1:       n  q
Line 2:       parent[2] parent[3] ... parent[n]
Next q lines: type  v  uid
```

- `parent[i]` is the parent of node `i`, for `i` from `2` to `n`. The root has none, so the list has `n − 1` entries; when `n = 1` that line is empty.
- `type` is `1` for lock, `2` for unlock, `3` for upgrade.

## Output

`q` lines, each `true` or `false` (lowercase), in the order the operations arrive.

## Constraints

```
1  ≤  n  ≤  10^5
1  ≤  q  ≤  10^5
1  ≤  parent[i]  <  i
1  ≤  v  ≤  n
1  ≤  uid  ≤  10^5
```

## Sample 1

**Input**
```
7 5
1 1 2 2 3 3
1 4 9
1 2 9
2 4 8
2 4 9
3 2 9
```

**Output**
```
true
false
false
true
false
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

- `lock(4, 9)` — nothing is locked anywhere. **true**
- `lock(2, 9)` — node 4 is a locked descendant of 2. **false**
- `unlock(4, 8)` — node 4 is held by user 9, not 8. **false**
- `unlock(4, 9)` — right owner. **true**, and node 4 is now free
- `upgrade(2, 9)` — nothing under 2 is locked any more, and upgrade needs at least one. **false**

## Sample 2

**Input**
```
7 4
1 1 2 2 3 3
1 4 5
1 5 5
3 2 5
1 1 7
```

**Output**
```
true
true
true
false
```

**Explanation**

Nodes 4 and 5 are both locked by user 5. `upgrade(2, 5)` finds two locked descendants, both held by user 5, so it releases them and locks node 2 instead. `lock(1, 7)` then fails because node 2, a descendant of the root, is locked.

## Sample 3

**Input**
```
7 3
1 1 2 2 3 3
1 4 1
1 5 2
3 2 1
```

**Output**
```
true
true
false
```

**Explanation**

Nodes 4 and 5 are locked by *different* users. Upgrade demands that every locked descendant belong to the requesting user, so it fails and nothing changes.

## Notes

- Work out the invariant before you code. Because `lock` refuses when an ancestor or a descendant is locked, the set of locked nodes is always an **antichain** — no locked node is ever above another. That single fact removes a whole class of cases you might otherwise write code for.
- All three operations reduce to two questions about a subtree and one about an ancestor chain. Walking the chain is `O(depth)` and the tree can be a chain of `10^5` nodes, so `10^5` operations of that shape is `10^10` steps. Both questions have to become `O(log n)`.
- Flatten the tree once. Give every node an entry time and an exit time; then "is in the subtree of `v`" becomes "entry time lies in `v`'s interval", and both questions turn into range queries you already know how to do.
- "Is some ancestor locked?" is the same query read backwards: a locked node covers exactly its own interval, so ask how many covering intervals contain `v`'s entry time.
- Checking that every locked descendant shares one `uid` without listing them is the last trick. You do not need the list to answer that question — you need something summable per subtree that can only agree when all the values are equal.
- Actually unlocking them on a successful upgrade does need the list, but every node you unlock was locked once, so the total work across all operations stays linear.
