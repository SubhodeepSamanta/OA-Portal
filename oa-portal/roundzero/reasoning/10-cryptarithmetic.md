# Cryptarithmetic

A TCS speciality. Letters stand for digits; you must find which. Slow if you brute-force it, fast if you use the carry rules. Tagged **if time** — do it only after the must-do sheets.

## The rules of the game

- Each **letter** stands for exactly one **digit** (0–9)
- Two different letters never share a digit
- The **leading digit of any number is never 0**
- The arithmetic must hold exactly

---

## The five deductions that solve most puzzles

**1. A leading 1 from a carry.**  
If two n-digit numbers add to an (n+1)-digit number, that extra leading digit **must be 1** — because the largest possible carry out of any column is 1.

**2. Column sums and carries.**  
In any column, digit + digit (+ carry in) is at most 9 + 9 + 1 = 19. So the **carry out is always 0 or 1**.

**3. A letter plus a letter giving itself.**  
If X + Y = X in a column (no carry), then **Y = 0**. If there is a carry out, then Y = 9 and a carry came in.

**4. Repeated letters.**  
If the same letter appears in the same column position on both sides, it constrains heavily — start there.

**5. Start from the leftmost or rightmost column**, whichever has the most information.  
The units column has no incoming carry, which often makes it the best entry point.

---

## Worked example — the classic

```
      S E N D
    + M O R E
    -----------
    M O N E Y
```

**Step 1 — the leading digit.** Two 4-digit numbers sum to a 5-digit number, so **M = 1** (rule 1).

**Step 2 — the leftmost column.** S + M = O, possibly with a carry, and producing a carry into M's position. With M = 1: S + 1 (+ carry) must be at least 10 to produce that carry.  
So S is 8 or 9.

- If S = 9 with no incoming carry: 9 + 1 = 10 → O = 0, carry 1. ✓
- If S = 8 with an incoming carry: 8 + 1 + 1 = 10 → O = 0, carry 1. ✓

Either way **O = 0**.

**Step 3 — the next column.** E + O = N, i.e. E + 0 = N. Since E ≠ N, there must be a carry coming in from the column to its right: **E + 1 = N**.

**Step 4 — the next column.** N + R (+ carry in) = E (+ 10 × carry out). Substituting  
N = E + 1:

- E + 1 + R + c = E + 10 → **R + c = 9**

So R = 9 (if no carry in) or R = 8 (if carry in). But if S = 9 then R ≠ 9, so in that branch  
**R = 8 with a carry in**, which means the units column carried.

**Step 5 — the units column.** D + E = Y + 10 (it must carry, from step 4). Digits used so far: M = 1, O = 0, S = 9, R = 8. Remaining available: 2, 3, 4, 5, 6, 7.

- Need D + E ≥ 10, with N = E + 1 also unused.
- Try E = 5 → N = 6. Then D + 5 ≥ 10 → D ≥ 5; available are 2, 3, 4, 7 → **D = 7**.
- Then Y = 7 + 5 − 10 = **2**. ✓ All distinct.

**Solution:** S=9, E=5, N=6, D=7, M=1, O=0, R=8, Y=2

```
      9 5 6 7
    + 1 0 8 5
    -----------
    1 0 6 5 2
```

Check: 9567 + 1085 = 10652 ✓

---

## Worked example — a small one

```
      A B
    + B A
    -------
      C C
```

- Units: B + A = C, or B + A = C + 10 with a carry.
- Tens: A + B (+ carry) = C, with no extra digit appearing.
- If there were a carry, the tens column would give A + B + 1 = C, contradicting the units
  column's A + B = C. So **there is no carry**, and A + B = C in both columns consistently.
- A + B = C and A + B < 10.
- Any pair works so long as the sum is a single digit and all three differ: e.g. A = 1,
  B = 2, C = 3 → 12 + 21 = 33 ✓

Note this puzzle has **many** solutions — real exam questions include enough columns to pin it down. If yours does not, the question is asking for a *property* (like "what is C − A?") rather than the exact digits.

---

## Multiplication puzzles

Same rules, plus:

- The **units digit of the product** depends only on the units digits of the factors — start
  there.
- A single-digit multiplier that leaves a number unchanged is **1**.
- A product ending in 0 means one factor ends in 0 or the pair is 5 × even.
- Squares end only in 0, 1, 4, 5, 6, 9 — never 2, 3, 7, 8.

---

## Exam tactics

Cryptarithmetic questions in a real paper are usually **multiple choice**: "What is the value of E?" That changes everything.

> **Substitute the options.** Testing four candidate values against one or two columns is far
> faster than solving the puzzle. Do this first, always.

If the question is open-ended and you cannot see the leading-1 shortcut within 60 seconds, guess and move on. This topic has poor marks-per-minute compared to seating or syllogism.

---

## Practice set

#### Q1.

```
      A B
    + B A
    -------
      C C
```
*What can you say about A + B?*  
AB + BA = (10A + B) + (10B + A) = **11(A + B)**. For the result to be a two-digit repdigit  
CC = 11C, we need A + B = C, a single digit.  
So any pair works where the digits sum to under 10 — e.g. 12 + 21 = 33, 25 + 52 = 77.

**The two facts to carry away**, both asked directly:
- a two-digit number **plus** its reverse = **11 × (sum of the digits)**
- a two-digit number **minus** its reverse = **9 × (difference of the digits)**

#### Q2.

```
      3 6
    +   A
    -------
      4 2
```
36 + A = 42 → **A = 6**

#### Q3.

```
      T W O
    + T W O
    ---------
    F O U R
```
*Given T = 7 and O = 4, find the rest.*

Line up the columns first: units → R, tens → U, hundreds → O, thousands → F.

- **Units:** O + O = 4 + 4 = 8 → **R = 8**, carry 0
- **Tens:** W + W = U, so **U = 2W** (carry to be determined)
- **Hundreds:** T + T = 7 + 7 = 14 → the digit written is 4, which must be **O** ✓
  (this confirms O = 4), and it carries 1
- **Thousands:** the carry alone gives **F = 1**
- Back to the tens: U = 2W with no carry out (otherwise the hundreds column would be 15).
  Digits already used are {7, 4, 8, 1}, so W = 3 gives **U = 6** ✓

**734 + 734 = 1468** → **T=7, W=3, O=4, F=1, U=6, R=8**

#### Q4.

```
      A B C
    + A B C
    + A B C
    ---------
      C C C
```
*Find A, B, C.*  
3 × ABC = CCC = C × 111 = C × 3 × 37 → ABC = 37C.  
C is a digit and ABC must end in C: 37 × 1 = 037 ✗ (ends in 7), 37 × 2 = 074 ✗,  
37 × 3 = 111 ✗, 37 × 4 = 148 ✗, 37 × 5 = 185 ✓ ends in 5!  
**ABC = 185, CCC = 555** → **A=1, B=8, C=5** ✓

#### Q5.

```
      B A S E
    + B A L L
    -----------
    G A M E S
```
*Given B = 7, A = 4, L = 5, E = 3. Find G, M, S.*
- Units: E + L = 3 + 5 = 8 → **S = 8**, carry 0
- Tens: S + L = 8 + 5 = 13 → **E = 3** ✓ , carry 1
- Hundreds: A + A + 1 = 4 + 4 + 1 = 9 → **M = 9**, carry 0
- Thousands: B + B = 14 → digit **4 = A** ✓, carry 1
- Ten-thousands: **G = 1**

**7483 + 7455 = 14938** ✓ **G=1, M=9, S=8**

**Q6 (MCQ style — the realistic exam case).**
```
      A B
    ×   3
    -------
    C A B
```
*What is A?* Options: (a) 1 (b) 3 (c) 5 (d) 7

**Step 1 — squeeze the units column.** The product ends in B, and the units of the product come from 3 × B. So 3B ≡ B (mod 10) → 2B ≡ 0 (mod 10) → **B = 0 or B = 5**.

**Step 2 — test the options against that.** The tens digit of the product must be A.

| A | B = 0 | B = 5 |
|---|---|---|
| 1 | 10 × 3 = 30 → tens 3 ✗ | 15 × 3 = 45 → only two digits ✗ |
| 3 | 30 × 3 = 90 → two digits ✗ | 35 × 3 = 105 → tens 0 ✗ |
| 5 | 50 × 3 = **150** → tens **5 = A** ✓ | 55 × 3 = 165 → tens 6 ✗ |
| 7 | 70 × 3 = 210 → tens 1 ✗ | 75 × 3 = 225 → tens 2 ✗ |

**Answer: (c) A = 5** (50 × 3 = 150, so C = 1, A = 5, B = 0)

> One column of algebra plus four substitutions. **Never solve the whole puzzle when the
> options are sitting there.**

---

## Traps

- Forgetting that leading digits cannot be 0.
- Forgetting that two letters cannot take the same digit — check at the very end.
- Assuming a carry where none exists, or missing one that does.
- Spending five minutes on one question. This is an **if time** topic for a reason.
- In multiplication, forgetting that intermediate partial products also obey the rules.

---

## Checkpoints

- [ ] I know each letter is one distinct digit and leading digits are never 0
- [ ] I know a carry is always 0 or 1, so an extra leading digit must be 1
- [ ] I know X + Y = X means Y = 0 (or 9 with carries)
- [ ] I start from the column with the most constraints, usually the units or the leftmost
- [ ] I can work through SEND + MORE = MONEY unaided
- [ ] I substitute the answer options before attempting to solve the puzzle
- [ ] I abandon an open-ended cryptarithmetic question after 60 seconds
