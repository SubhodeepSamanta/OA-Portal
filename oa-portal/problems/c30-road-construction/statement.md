# Road Construction

> **Mirrored from CSES 1676** — <https://cses.fi/problemset/task/1676>
> Solve it here, then paste the same code into the CSES submit box.

There are `n` cities and initially no roads between them. Then `m` roads are built, one per day.

After each new road, report how many connected components the country has, and how many cities are in the largest one.

## Input

```
Line 1:       n  m
Next m lines: a  b     a new two-way road between cities a and b
```

## Output

`m` lines, one per road: the number of components and the size of the largest component after that road is built.

## Constraints

```
1  ≤  n     ≤  100000
1  ≤  m     ≤  200000
1  ≤  a, b  ≤  n
```

## Sample 1

**Input**
```
5 3
1 2
1 3
4 5
```

**Output**
```
4 2
3 3
2 3
```

**Explanation**

After `1–2`: components `{1,2} {3} {4} {5}` — four of them, largest has 2 cities.
After `1–3`: `{1,2,3} {4} {5}` — three, largest 3.
After `4–5`: `{1,2,3} {4,5}` — two, largest still 3.

## Notes

- Recomputing components from scratch after each road is `O(m · (n + m))` — far too slow.
- **Union-Find (DSU)** answers both questions incrementally, and neither needs a scan:
  - Start with `components = n` and `largest = 1`.
  - For each road, find the two roots. If they differ, union them, do `components--`, and set `largest = max(largest, size of the merged set)`.
  - If they are already in the same component, **nothing changes** — print the current values unchanged.
- The key realisation is that both answers only ever move in one direction, so you never recompute them. `components` only falls; `largest` only rises. Keeping a running maximum is correct precisely because merging can never *shrink* the biggest component.
- Track sizes in the DSU (`size[root]`), which you want anyway for union by size. After `parent[rb] = ra`, the merged size is `size[ra] += size[rb]`, and that single value is the only candidate that can beat the old maximum.
- Roads can repeat and can join two cities already connected — both are no-ops for the answers, not errors.
- Use path compression **and** union by size. With only one, a long chain of unions degrades to `O(n)` per find and this times out.
- Everything fits in `int`. Buffer the output — up to `2·10^5` lines of two numbers.
