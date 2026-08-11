# Dice Combinations

> **Mirrored from CSES 1633** — <https://cses.fi/problemset/task/1633>
> Solve it here, then paste the same code into the CSES submit box.

Count the number of ways to make the sum `n` by throwing a dice one or more times. Each throw gives a value from `1` to `6`.

Two ways are different if the **sequence** of throws differs — `1 + 2` and `2 + 1` are two different ways.

## Task

Report the number of ways, **modulo `10^9 + 7`**.

## Input

```
Line 1:  n
```

## Output

A single integer: the number of ways modulo `10^9 + 7`.

## Constraints

```
1  ≤  n  ≤  1000000
```

## Sample 1

**Input**
```
3
```

**Output**
```
4
```

**Explanation**

`1+1+1`, `1+2`, `2+1`, and `3`.

## Notes

- Let `ways[s]` be the number of ways to reach sum `s`. The **last** throw was one of `1..6`, so
  `ways[s] = ways[s−1] + ways[s−2] + … + ways[s−6]`, skipping any term where `s − j < 0`.
- The base case is `ways[0] = 1` — the empty sequence of throws is the one way to make 0. Getting this wrong (setting `ways[0] = 0`, or hand-seeding `ways[1..6]`) is the usual reason a correct-looking recurrence prints garbage.
- Order matters here, which is why this is a straightforward 1-D loop. If order did *not* matter it would be a coin-change **combinations** problem needing a different loop nesting — recognising which of the two you are looking at is the actual skill.
- Take the modulus **inside** the loop, not at the end. Six terms each under `10^9 + 7` sum to about `6·10^9`, which overflows a 32-bit int immediately; even in 64-bit, letting values grow unbounded across `10^6` iterations overflows fast.
- `O(6n)` time and `O(n)` memory. An array of `10^6` ints is 4 MB — fine.
- This is the same shape as counting staircase climbs with steps of 1..6. If you have seen that, you have seen this.
