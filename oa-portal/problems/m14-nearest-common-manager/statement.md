# Nearest Common Manager

A company's reporting structure is a strict hierarchy of `n` employees, numbered `1` through `n`. Employee `1` is the CEO and reports to nobody. Every other employee reports to exactly one manager, and following the chain of managers upward from anyone always reaches the CEO.

Employee `x` is a **manager of** employee `y` if `x` appears somewhere on the chain from `y` up to the CEO. By this definition the CEO manages everyone, and an employee is **not** considered a manager of themselves.

HR is building an escalation tool. When two employees raise a dispute, it must route the case to the **lowest-ranked person who manages both of them** — the deepest point in the hierarchy where their two chains of command meet. If one of the two already manages the other, that manager is the answer.

## Task

Answer `q` independent queries. Each gives two employees `u` and `v`; report the **lowest-ranked common manager** of the pair.

If `u` manages `v`, the answer is `u`. If `v` manages `u`, the answer is `v`. If `u` and `v` are the same employee, the answer is that employee.

## Input

```
Line 1:       n  q
Line 2:       parent[2] parent[3] ... parent[n]
Next q lines: u  v
```

- `parent[i]` is the manager of employee `i`, for `i` from `2` to `n`. Employee 1 has no manager, so the list has `n − 1` entries. When `n = 1` this line is empty.
- Each manager is guaranteed to be a valid employee number, and the structure is guaranteed to be a hierarchy with no cycles.

## Output

`q` lines. Each is the employee number of the lowest-ranked common manager for that query.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  q  ≤  2 · 10^5
1  ≤  parent[i]  <  i    (a manager always has a smaller number than a report)
1  ≤  u, v  ≤  n
```

## Sample 1

**Input**
```
7 4
1 1 2 2 3 3
4 5
4 6
4 2
5 5
```

**Output**
```
2
1
2
5
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

- `4` and `5` both report to `2`, so their nearest common manager is **2**.
- `4` sits under `2`, `6` sits under `3`; the chains meet only at the CEO, so the answer is **1**.
- `2` is itself a manager of `4`, so the answer is **2**.
- A query about the same employee twice answers with that employee, **5**.

## Sample 2

**Input**
```
1 1
1 1
```

**Output**
```
1
```

**Explanation**

A company of one. The parent list is empty (there is nothing on line 2), and the only possible query answers with employee 1.

## Notes

- The hierarchy can be a long chain — up to `2 · 10^5` deep — so walking up one step at a time per query is `O(n)` each and far too slow across `2 · 10^5` queries.
- Note the guarantee `parent[i] < i`. That makes a single left-to-right pass enough to compute every employee's depth, with no recursion and no stack-overflow risk.
- Both `n` and `q` are large; unbuffered input alone can exhaust the limit.
