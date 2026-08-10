# Rumor Spread

A campus is mapped as an `r × c` grid. Each cell is one of:

| Symbol | Meaning |
|---|---|
| `.` | an open spot with one person standing on it |
| `#` | a building — nobody there, and nothing passes through |
| `R` | an open spot whose person **already knows** the rumour |

At the end of every minute, each person who knows the rumour tells whoever is standing in the four cells directly up, down, left and right of them. Buildings block completely — the rumour never crosses a `#`.

Everyone tells everyone simultaneously, so the spread happens in clean one-minute waves.

## Task

Report how many minutes pass until every person on the grid knows.

If somebody can never hear it — they are sealed off behind buildings, or nobody knows it to begin with — report `-1`.

## Input

```
Line 1:      r  c
Next r rows: c characters each, no spaces
```

## Output

A single integer: the number of minutes, or `-1`.

## Constraints

```
1  ≤  r, c  ≤  1000
```

There may be any number of `R` cells, including none.

## Sample 1

**Input**
```
3 3
R..
.#.
...
```

**Output**
```
4
```

**Explanation**

Writing each person's minute in place of their symbol:

```
0 1 2
1 # 3
2 3 4
```

The bottom-right corner is the last to hear it, at minute **4**. It cannot be reached in 3 because the building sits on the diagonal.

## Sample 2

**Input**
```
2 3
R#.
.#.
```

**Output**
```
-1
```

**Explanation**

The middle column is solid building, so the two people on the right are sealed off forever.

## Sample 3

**Input**
```
1 1
R
```

**Output**
```
0
```

**Explanation**

The only person already knows. No minutes pass.

## Sample 4

**Input**
```
2 2
..
..
```

**Output**
```
-1
```

**Explanation**

Four people and not one of them has heard anything. A rumour with no source never starts.

## Notes

- There can be many `R` cells, and the answer is when the **last** person hears it. Running a separate search from each source and combining is both slow and fiddly. Start the search with *every* source already in the queue at minute 0 — the wavefront then expands from all of them at once, exactly as the story describes.
- That works because each step costs the same one minute. It is the same reason no priority queue is needed here.
- The `-1` has two distinct causes and one test: after the spread finishes, is there any `.` you never assigned a minute to? Both a sealed-off pocket and a grid with no `R` at all fail that check. Do not special-case them separately.
- Careful with the empty-ish cases: a grid that is *all* buildings has nobody to inform, so nothing is ever unreached and the answer is `0`, not `-1`.
- `1000 × 1000` is a million cells. Reading the grid a character at a time with slow input, or copying strings inside the loop, is what will cost you the limit here — not the search itself.
