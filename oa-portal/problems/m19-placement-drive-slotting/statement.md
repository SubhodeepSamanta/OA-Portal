# Placement Drive Slotting

The placement cell is scheduling a one-day drive. `n` students have been shortlisted; student `i` needs `t[i]` minutes of interview time. The company has sent `m` interviewers.

The day is split into **two rounds**: a pre-lunch round and a post-lunch round. Every interviewer sits in both rounds, and in each round an interviewer meets **at most one student**. So an interviewer meets at most two students all day, and no student is ever split across two interviewers.

Both rounds start the moment the previous one is fully over — the whole panel breaks together. Concretely, an interviewer who is given students taking `x` and `y` minutes is busy for `x + y` minutes of actual interviewing, and the drive is over once every interviewer has finished both of their slots.

The cell has already checked that `n ≤ 2m`, so a valid seating always exists. Some interviewers may end up with one student, or none.

## Task

Assign students to interviewers so that the **largest total interviewing time given to any single interviewer** is as small as possible, and report that number.

## Input

```
Line 1:  n  m
Line 2:  t[1] t[2] ... t[n]
```

## Output

A single integer: the smallest possible value of the busiest interviewer's total minutes.

## Constraints

```
1  ≤  m  ≤  10^5
1  ≤  n  ≤  2m
1  ≤  t[i]  ≤  10^9
```

## Sample 1

**Input**
```
4 2
10 20 30 40
```

**Output**
```
50
```

**Explanation**

Two interviewers, four students, so both interviewers are full. Pairing `40` with `10` and `30` with `20` gives loads of 50 and 50.

Any other pairing is worse: `40+30` and `20+10` gives 70, and `40+20` and `30+10` gives 60.

## Sample 2

**Input**
```
3 2
5 5 5
```

**Output**
```
10
```

**Explanation**

Three students across two interviewers means one interviewer must take two of them, and every student takes 5 minutes, so somebody is busy for 10. Giving the third student to the other interviewer changes nothing.

## Sample 3

**Input**
```
1 1
7
```

**Output**
```
7
```

## Sample 4

**Input**
```
5 3
1 2 3 4 100
```

**Output**
```
100
```

**Explanation**

The 100-minute student sets the floor on their own. There are enough interviewers to give that student a slot and still fit `1,2,3,4` elsewhere without anyone exceeding 100 — for instance `100` alone, `4+3`, `2+1`.

## Notes

- Read the capacity rule twice. "At most one student per round" is a much stronger restriction than "any number of students in a row", and it is what makes this solvable exactly.
- Two things force the answer up, and it is worth naming both before coding: the single longest interview, and the fact that when students outnumber the free slots somebody must double up.
- Once you suspect a pairing rule, try to break it. Take a proposed assignment where the longest and the shortest interview are *not* together, and see what happens to the maximum when you swap one student between two interviewers. That argument is the whole proof.
- `t[i]` reaches `10^9` and two of them can share an interviewer, so the answer can exceed a 32-bit integer.
