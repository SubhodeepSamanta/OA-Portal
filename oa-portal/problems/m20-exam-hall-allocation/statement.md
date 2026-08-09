# Exam Hall Allocation

The examination cell has `n` exams to run. Exam `i` starts at minute `s[i]` and ends at minute `e[i]`. A hall can host only one exam at a time, but it can be reused: an exam may start in a hall at exactly the minute the previous exam there ended, because the invigilator clears the room on the hour. In other words, exam `i` occupies its hall over the **half-open** stretch `[s[i], e[i])`.

Halls are numbered `1, 2, 3, …` and the cell wants to open as few as possible.

The cell does not want *any* valid allocation — the seating chart is printed from a fixed office procedure, and you must reproduce that exact procedure:

> Take the exams in increasing order of start minute. Break a tie by the earlier end minute, and if two exams have the same start *and* the same end, take the one listed earlier in the input first.
>
> For each exam in that order, look at the halls already opened and find every hall whose current exam has already ended by this exam's start minute — those halls are free. Put the exam in the **free hall with the smallest number**. If no opened hall is free, open a brand-new hall (the next unused number) and put the exam there.

## Task

Report two things:

1. the number of halls this procedure ends up opening, and
2. exactly which exams land in **hall 1**.

## Input

```
Line 1:       n
Next n lines: s[i]  e[i]
```

Exams are numbered `1 … n` in the order they appear in the input.

## Output

```
Line 1:  H              the number of halls opened
Line 2:  c  i1 i2 ... ic
```

where `c` is how many exams were placed in hall 1, followed by their input numbers in **increasing** order. Hall 1 is always opened when `n ≥ 1`, so `c ≥ 1`.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  s[i]  <  e[i]  ≤  10^9
```

## Sample 1

**Input**
```
5
0 30
5 10
15 20
25 40
35 50
```

**Output**
```
2
2 1 5
```

**Explanation**

- Exam 1 `[0,30)` — nothing open yet, so open hall 1.
- Exam 2 `[5,10)` — hall 1 is busy until 30, so open hall 2.
- Exam 3 `[15,20)` — hall 2 freed at 10, hall 1 is busy. Hall 2.
- Exam 4 `[25,40)` — hall 2 freed at 20, hall 1 still busy until 30. Hall 2.
- Exam 5 `[35,50)` — hall 1 freed at 30, hall 2 is busy until 40. Hall 1.

Two halls, and hall 1 held exams 1 and 5.

## Sample 2

**Input**
```
3
1 5
5 9
9 12
```

**Output**
```
1
3 1 2 3
```

**Explanation**

Each exam begins exactly when the previous one ends. Because a hall is free *at* its end minute, one hall serves all three.

## Sample 3

**Input**
```
4
0 10
0 10
0 10
0 10
```

**Output**
```
4
1 1
```

**Explanation**

Four identical exams all run at once, so four halls are needed and hall 1 takes only the first.

## Notes

- Part 1 and part 2 are not the same question. The count of halls has a short answer that never mentions halls at all — think about what is true at the instant a new hall has to be opened. Part 2 forces you to actually carry out the allocation.
- Watch the boundary. `[s, e)` means an exam ending at 10 and one starting at 10 do **not** clash. Getting this backwards changes both answers.
- Re-scanning every opened hall for each exam is `O(n)` per exam. With `n = 2 · 10^5` exams that is far too slow — you need the freed halls in a structure that hands you the smallest number directly, and the busy halls in one that hands you the earliest end directly.
- Output can be long: hall 1 may hold up to `2 · 10^5` exam numbers. Build one string and write it once.
