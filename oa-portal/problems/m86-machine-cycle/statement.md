# Machine Cycle

A controller's state is an integer in `0 … n−1`. Every second the state advances by one fixed rule: `x` becomes `f[x]`, where `f` is given as a table.

The machine starts in state `s`.

## Task

Report the state after exactly `T` seconds.

## Input

```
Line 1:  n  s  T
Line 2:  f[0] f[1] ... f[n-1]
```

## Output

A single integer: the state after `T` seconds.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  s  <  n
0  ≤  f[x]  <  n
0  ≤  T  ≤  10^18
```

## Sample 1

**Input**
```
3 0 5
1 2 0
```

**Output**
```
2
```

**Explanation**

The states go `0, 1, 2, 0, 1, 2` — after 5 seconds the machine is in state **2**.

## Sample 2

**Input**
```
1 0 1000000000000000000
0
```

**Output**
```
0
```

**Explanation**

One state that maps to itself. Any number of seconds leaves it there.

## Sample 3

**Input**
```
5 0 1000000000000000000
1 2 3 4 2
```

**Output**
```
4
```

**Explanation**

The walk is `0, 1, 2, 3, 4, 2, 3, 4, …` — a tail of length 2 followed by a cycle of length 3. After the tail, the state depends only on `(T − 2) mod 3`.

## Notes

- `T` reaches `10^18`, so stepping is out. But every state has exactly one successor, so the walk from `s` can never branch — it runs forward and must eventually revisit a state, at which point it repeats forever.
- That gives the shape: a **tail** of states visited once, then a **cycle** repeated endlessly. Walk from `s` recording the second at which each state was first seen, and stop the moment you meet one you have seen. Where the repeat happened tells you where the cycle starts and how long it is.
- If `T` lands inside the tail, just read it off the record. Otherwise fold it into the cycle: the answer is the state at position `start + (T − start) mod length`.
- Both parts are easy to get subtly wrong. The modulus must be taken on `T − start`, not on `T`; and `T` can be smaller than the tail, in which case no folding happens at all.
- The walk visits at most `n` distinct states before repeating, so this is linear regardless of `T`.
- `T − start` needs 64-bit arithmetic, and so does reading `T`.
