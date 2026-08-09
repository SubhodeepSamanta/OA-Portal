# Warehouse Robot Keys

A warehouse floor is an `r × c` grid. Each cell is one of:

| Symbol | Meaning |
|---|---|
| `.` | open floor |
| `#` | racking — impassable |
| `S` | the robot's starting bay (exactly one) |
| `X` | the exit (exactly one) |
| `a`–`f` | a keycard lying on the floor |
| `A`–`F` | a locked shutter |

Note the exit is `X`, not `E` — `E` is already taken, as the shutter matching card `e`.

The robot moves one cell at a time, up, down, left or right — never diagonally, never off the grid, never into racking.

Stepping onto a cell holding a keycard picks it up automatically; the robot keeps every card it has collected, and cards are never dropped. A shutter `X` can be entered **only if the robot is already carrying the matching lowercase card `x`**. Once it can pass, the shutter behaves like open floor for the rest of the run.

`S` and `X` are open floor. A keycard may exist with no matching shutter; a shutter may exist with no matching keycard anywhere, in which case it can never be opened.

## Task

Report the fewest moves to get from `S` to `X`, or `-1` if it cannot be done.

## Input

```
Line 1:    r  c
Next r rows: c characters each, no spaces
```

## Output

A single integer: the minimum number of moves, or `-1`.

## Constraints

```
1  ≤  r, c  ≤  100
```

There is exactly one `S` and exactly one `X`. At most six key letters are used, `a` through `f`.

## Sample 1

**Input**
```
1 7
S.a.A.X
```

**Output**
```
6
```

**Explanation**

A single corridor. Walking right, the robot picks up card `a` at column 3 on its way, so by the time it reaches shutter `A` at column 5 it can pass. Six steps.

## Sample 2

**Input**
```
2 5
S.#.X
..aA.
```

**Output**
```
6
```

**Explanation**

Column 3 of the top row is racking, so the only way to reach the exit's neighbour is through shutter `A` on the bottom row — and that needs card `a`, which sits immediately before it. Six moves either way round.

## Sample 3

**Input**
```
2 3
S#X
###
```

**Output**
```
-1
```

**Explanation**

The exit is walled off completely.

## Sample 4

**Input**
```
1 2
SX
```

**Output**
```
1
```

## Notes

- Plain shortest-path on cells is wrong here, and it is worth being precise about *why*: the same cell can be worth visiting more than once. A robot standing on a cell without card `c` and the same robot standing there holding it are not in the same situation, and marking the cell "visited" the first time throws away the second.
- So enlarge what you call a position. Six possible cards means `64` possible collections, and a collection only ever grows — that is a natural fit for one integer whose bits say which cards you hold.
- The state count is `100 × 100 × 64 = 640000`. That is small. Every state has four moves out of it, and every move costs exactly one, so the plainest possible search over that space is enough — no priority queue is needed.
- Watch the two traps in the rules: a shutter with no card anywhere is permanently shut (do not "helpfully" open it), and stepping onto a card cell must update the collection *before* you decide what the robot can do next.
- `-1` is a real answer, not an edge case to bolt on afterwards. Sample 3 exists for that.
