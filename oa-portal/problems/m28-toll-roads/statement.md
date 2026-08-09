# Toll Roads

A state has `n` cities numbered `1` through `n`, joined by `m` two-way roads. Every road is one of exactly two kinds:

- a **free** road, costing `0`,
- a **toll** road, costing `₹1` each time you drive it.

Nothing else. There is no road costing `₹2` or `₹7` — the whole network is built from these two.

## Task

Report the smallest total toll payable driving from city `1` to city `n`, or `-1` if there is no route.

## Input

```
Line 1:       n  m
Next m lines: u  v  w      a road between u and v, w is 0 or 1
```

The network may contain several roads between the same pair of cities. There are no roads from a city to itself.

## Output

A single integer: the minimum toll, or `-1` if city `n` cannot be reached.

## Constraints

```
1  ≤  n  ≤  10^5
0  ≤  m  ≤  5 · 10^5
1  ≤  u, v  ≤  n,   u ≠ v
w  ∈  {0, 1}
```

## Sample 1

**Input**
```
4 4
1 2 0
2 3 0
3 4 1
1 4 1
```

**Output**
```
1
```

**Explanation**

Both routes cost the same. `1 → 2 → 3 → 4` pays only on the last road, and `1 → 4` is a single toll road. Either way, **₹1**.

## Sample 2

**Input**
```
3 1
1 2 0
```

**Output**
```
-1
```

## Sample 3

**Input**
```
1 0
```

**Output**
```
0
```

**Explanation**

One city. You start where you are going, so you pay nothing and there are no road lines to read.

## Sample 4

**Input**
```
5 5
1 3 0
3 4 0
4 5 0
1 2 1
2 5 1
```

**Output**
```
0
```

**Explanation**

A completely free route exists, so the toll route is irrelevant.

## Notes

- A general shortest-path algorithm solves this and will pass. But look at the constraint again: `m` reaches `5 · 10^5`, and the only weights in the entire problem are `0` and `1`. That is not an accident — the setter is telling you something about the shape of the answer.
- Here is the observation to chase. In a normal shortest-path run, the frontier holds distances that can differ wildly. With only `0` and `1` weights, at any moment the frontier holds **at most two distinct values**, `d` and `d + 1`. A structure that can hold "two groups" is much cheaper than one that can order arbitrary numbers.
- That points at a queue you can push onto from *both ends*: a free road keeps the distance the same, so it belongs at the front, ahead of everything already waiting; a toll road costs one more, so it belongs at the back. Then you never need to sort anything.
- Whichever route you take, get the `-1` right. Reaching city `n` and paying `0` is a different outcome from never reaching it, and `0` is a perfectly ordinary answer here.
- `n = 1` is legal and `m` may be `0`, in which case there are no road lines at all.
