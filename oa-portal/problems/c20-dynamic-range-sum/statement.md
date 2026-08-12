# Dynamic Range Sum Queries

> **Mirrored from CSES 1648** — <https://cses.fi/problemset/task/1648>
> Solve it here, then paste the same code into the CSES submit box.

You are given an array of `n` integers and must process `q` queries of two kinds:

```
1 k u    set the value at position k to u
2 a b    report the sum of values in positions a..b
```

Positions are 1-indexed.

## Input

```
Line 1:  n  q
Line 2:  x[1] x[2] ... x[n]
Next q lines:  a query, in one of the two forms above
```

## Output

One line per type-2 query: the requested sum.

## Constraints

```
1  ≤  n, q      ≤  200000
1  ≤  x[i], u   ≤  10^9
1  ≤  k         ≤  n
1  ≤  a ≤ b     ≤  n
```

## Sample 1

**Input**
```
8 4
3 2 4 5 1 1 5 3
2 1 4
2 5 6
1 3 1
2 1 4
```

**Output**
```
14
2
11
```

**Explanation**

`3+2+4+5 = 14`, then `1+1 = 2`. Setting position 3 to 1 makes the first range `3+2+1+5 = 11`.

## Notes

- A prefix-sum array answers range sums in `O(1)` but costs `O(n)` to repair after each update. With `2·10^5` updates that is `4·10^{10}` operations. You need a structure that does **both** in logarithmic time.
- A **Fenwick tree (BIT)** is the smallest thing that works here, and worth knowing by heart — it is about ten lines:
  ```
  void add(int i, long long v) { for (; i <= n; i += i & -i) tree[i] += v; }
  long long pref(int i) { long long s = 0; for (; i > 0; i -= i & -i) s += tree[i]; return s; }
  ```
  Then `sum(a, b) = pref(b) − pref(a − 1)`.
- The one trap specific to *this* problem: the query is **set to `u`**, not *add* `u`. A Fenwick tree only knows how to add, so you must keep the current values in a separate array and add the **difference**: `add(k, u − cur[k]); cur[k] = u;`. Forgetting that turns every update into an increment, and the first update after a query goes wrong.
- Fenwick trees are 1-indexed by nature — the `i & -i` trick relies on it. Do not shift the array to 0-indexed.
- **Overflow.** `2·10^5` values of `10^9` sum to `2·10^{14}`. The tree, the prefix function and the returned sum all need 64-bit types. A 32-bit tree is the single most common way this problem fails, and it fails silently — small tests pass.
- A segment tree also works and generalises further; a Fenwick tree is shorter and about twice as fast. Either is fine here.
- Buffer the output — up to `2·10^5` lines.
