# Team Reporting Depth

A company's reporting structure is a hierarchy of `n` employees numbered `1` to `n`. Employee `1` is the CEO; every other employee reports to exactly one manager, and following managers upward always reaches the CEO.

Employee `y` is a **subordinate** of employee `x` if `x` lies on the chain from `y` up to the CEO. The **reporting distance** from `x` down to a subordinate `y` is the number of steps on that chain — a direct report is at distance 1, their reports are at distance 2, and so on.

HR is sizing up "span of control". For a given depth budget `k`, each employee wants to know how many people sit underneath them **within `k` levels** — that is, how many subordinates have reporting distance between `1` and `k` inclusive. Employees do not count themselves.

## Task

Given the hierarchy and a depth budget `k`, report for **every** employee the number of subordinates within `k` reporting levels.

## Input

```
Line 1:  n  k
Line 2:  parent[2] parent[3] ... parent[n]
```

`parent[i]` is the manager of employee `i`. The list has `n − 1` entries; when `n = 1` it is empty.

## Output

`n` integers separated by single spaces: the count for employee `1`, then employee `2`, and so on.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  k  ≤  n
1  ≤  parent[i]  <  i
```

## Sample 1

**Input**
```
7 1
1 1 2 2 3 3
```

**Output**
```
2 2 2 0 0 0 0
```

**Explanation**

The hierarchy is:

```
            1
          /   \
         2     3
        / \   / \
       4   5 6   7
```

With `k = 1` only direct reports count. The CEO has 2, employees 2 and 3 have 2 each, and the four leaves have none.

## Sample 2

**Input**
```
7 2
1 1 2 2 3 3
```

**Output**
```
6 2 2 0 0 0 0
```

**Explanation**

With `k = 2` the CEO now reaches everyone — 2 direct reports plus 4 at distance 2, totalling 6. Employees 2 and 3 still see only their own two reports, since nothing sits below those.

## Sample 3

**Input**
```
1 1

```

**Output**
```
0
```

**Explanation**

A company of one. The parent list on line 2 is empty. The CEO has no subordinates.

## Sample 4

**Input**
```
5 2
1 2 3 4
```

**Output**
```
2 2 2 1 0
```

**Explanation**

A straight chain `1 → 2 → 3 → 4 → 5`. Each employee sees the next two below them, except employee 4 who has only one, and employee 5 who has none.

## Notes

- Counts exclude the employee themselves.
- The hierarchy may be a single chain of length `2 · 10^5`, or a star where everyone reports to the CEO. Both must run in time.
- Walking down from every employee separately is `O(n²)` in the chain case and will not finish.
- Note the guarantee `parent[i] < i` — depths can be filled in one forward pass with no recursion.
- Counts fit comfortably in a 32-bit integer, but the total work does not; think about what structure lets you ask "how many nodes in this subtree are shallower than X" quickly.
