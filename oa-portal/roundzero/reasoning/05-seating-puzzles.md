# Seating arrangement & puzzles

The biggest block in the reasoning section — Accenture alone gives 7–8 questions to "data arrangements". A set takes 4–6 minutes and yields 4–5 marks, which is the best rate in the paper **if** you finish it. Half-finished sets are worth nothing.

## The four types

| Type | Shape |
|---|---|
| **Linear** | a row; all facing the same way, or facing each other |
| **Circular** | a round table; facing centre or facing outwards |
| **Rectangular / square** | people on sides and corners |
| **Floor / box / scheduling** | a vertical stack or a timetable |

Most sets add a second dimension — names *plus* a colour, a city, an age. Those are  
"complex arrangements", and the grid below handles them.

---

## The universal method

**1. Read every clue once before writing anything.** Count the people, the seats, and the attributes.

**2. Draw the frame.** Number the positions. For a circle, mark which way they face.

**3. Rank the clues by definiteness.** Place these first:
   - absolute positions ("C sits third from the left end")
   - blocks ("A and B sit together")
   - then relative clues ("D is somewhere to the right of E")

**4. Never place a tentative fact in ink.** If a clue gives two options, draw **two separate diagrams** and carry both forward. Kill one when a later clue contradicts it.

**5. Use a grid for the extra attributes:**

| Position | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Name | | | | | |
| City | | | | | |
| Colour | | | | | |

Filling a grid is what stops you from losing track on question 4 of the set.

---

## Direction rules you must have automatic

**Facing the centre (circular):**
- Your **left** is the **clockwise** direction
- Your **right** is **anticlockwise**

**Facing outwards (circular):** exactly the reverse.

**Linear, all facing North (the standard):** the observer's left is *your* right as you look at the page. Draw an arrow on the diagram showing the facing direction — do not trust memory.

> **"Immediate neighbour"** means adjacent. **"Between"** does not imply immediate unless the
> clue says "exactly between" or "immediately between".

---

## Worked example — linear

*Seven friends P, Q, R, S, T, U, V sit in a row facing North.*

1. *S sits third to the right of P.*
2. *Q sits second to the left of S.*
3. *U sits third from the left end.*
4. *V sits at one of the ends.*
5. *T sits immediately to the right of R.*

**Frame:** positions 1–7, left to right.

**Combine the two relative clues first.** From (1), S = P + 3. From (2), Q = S − 2 = P + 1.  
So P, Q, S form a rigid block with one gap:

```
   P    Q    _    S
   p   p+1  p+2  p+3
```

**Now use the absolute clue (3): U is at seat 3.** Test each placement of the block:

| Block at | Seats used | Clash with U at 3? |
|---|---|---|
| p = 1 | P1 Q2 S4, gap at 3 | no — the gap **is** seat 3 ✓ |
| p = 2 | P2 Q3 S5 | Q takes seat 3 ✗ |
| p = 3 | P3 Q4 S6 | P takes seat 3 ✗ |
| p = 4 | P4 Q5 S7 | seat 3 free ✓ — keep for now |

Two survive. Take them in turn:

- **p = 4:** P4, Q5, S7, U3. V must be at an end, and seat 7 is taken, so V is at 1. That
  leaves seats 2 and 6 for R and T — not adjacent, so (5) fails. ✗
- **p = 1:** P1, Q2, U3, S4. V at an end → seat 7 (seat 1 is P). Seats 5 and 6 remain for R
  and T, and (5) puts T immediately right of R → **R5, T6**. ✓

**Final arrangement:** P(1), Q(2), U(3), S(4), R(5), T(6), V(7).

Note the shape of the work: two relative clues fused into one block, then one absolute clue cut four possibilities to two, then one more clue killed the survivor. That is the standard rhythm of every linear set.

---

## Worked example — circular

*Six people A, B, C, D, E, F sit around a circular table facing the centre.*

1. *A sits second to the left of C.*
2. *B sits opposite E.*
3. *D is an immediate neighbour of A.*

**Frame:** 6 seats, so "opposite" means 3 apart.

- Fix **C at seat 1** (you may always fix one person in a circular puzzle — only relative
  positions matter).
- Facing the centre, "to the left" is clockwise. Second to the left of C → **A at seat 3**.
- (2): B and E are opposite. Available pairs: (2,5) or (4,1)… seat 1 is taken, so B and E
  occupy **2 and 5** in some order.
- (3): D neighbours A(3), so D is at 2 or 4. Seat 2 is B or E → **D at seat 4**.
- F takes the last seat, **6**.

**Arrangement:** C(1), B/E(2), A(3), D(4), E/B(5), F(6).

---

## Floor puzzles

*Five people live on floors 1–5. C lives on the topmost floor. E lives on the fourth floor.  
D lives immediately below A. A lives above B.*

Always number floors with **1 at the bottom** and write the stack vertically.

- C is on **5**, E is on **4**. That leaves floors 1, 2, 3 for A, B and D.
- "D immediately below A" → (D, A) is a consecutive pair with A on top. Within {1,2,3} the
  options are (1,2) and (2,3).
- **Try (D1, A2):** B must be below A, so B would need floor 1 — taken by D. ✗
- **Try (D2, A3):** B takes floor 1, which is below A. ✓

**Final:** B(1), D(2), A(3), E(4), C(5).

> If two arrangements survive at the end, you have missed a clue — re-read the set. A
> well-formed puzzle has exactly one answer, and the questions that follow assume it.

---

## Time control

- **Budget 5 minutes per set.** Set a mental limit.
- If you are 3 minutes in with nothing placed definitively, **abandon it** and come back if
  time allows. One stuck set can eat a whole section.
- Attempt the set with the **fewest people and the most absolute clues** first. Scan for
  "third from the left" style clues — sets that open with those are the quick ones.

---

## Practice set

### Set A — circular, facing centre

*Six friends A, B, C, D, E, F sit around a circular table facing the centre.*
1. *A sits opposite D.*
2. *B sits to the immediate right of A.*
3. *C sits between D and E.*
4. *F is not adjacent to A.*

**Solve it.** Fix **A at seat 1**. Six seats, so opposite is 3 apart → **D at seat 4**.  
Facing the centre, immediate **right** is anticlockwise → **B at seat 6**.  
Remaining seats: 2, 3, 5 for C, E, F.  
(4) F not adjacent to A(1) → F not at 2 or 6 → **F at 3 or 5**.  
(3) C between D(4) and E → C adjacent to D → C at 3 or 5.  
If C at 5, then E must be at 6 — taken by B. ✗  
So **C at 3**, and E adjacent to C on the other side → **E at 2**. Then **F at 5** ✓  
(Check F at 5 is not adjacent to A at 1 ✓)

**Arrangement: A(1), E(2), C(3), D(4), F(5), B(6)**

**Q1. Who sits opposite B?** B is at 6 → opposite is seat 3 → **C**  
**Q2. Who is to the immediate left of D?** Left = clockwise = seat 5 → **F**  
**Q3. How many people sit between E and F, counting clockwise from E?** Seats 3, 4 → **two (C and D)**

### Set B — linear, facing each other

*Eight people sit in two rows of four. Row 1 (P, Q, R, S) faces North. Row 2 (W, X, Y, Z) faces South. Each person in row 1 faces exactly one person in row 2.*
1. *Q sits second from the left of row 1.*
2. *X faces Q.*
3. *W sits at an extreme end.*
4. *R sits to the immediate right of S.*
5. *Y is not adjacent to X.*

Number both rows 1–4, so that the person at row-1 position *n* faces the person at row-2 position *n*.

- (1) → **Q at position 2.**
- (4) → S and R are adjacent with R on S's immediate right, so (S, R) is (1,2), (2,3) or
  (3,4). Position 2 is Q, which rules out the first two → **S at 3, R at 4**, leaving  
  **P at 1**.
- (2) → X faces Q, so **X at row-2 position 2**.
- (5) → Y is not adjacent to X, and X's neighbours are positions 1 and 3 → **Y at 4**.
- (3) → W is at an extreme end, and position 4 is Y → **W at 1**, leaving **Z at 3**.

**Row 1: P, Q, S, R · Row 2: W, X, Z, Y**

**Q4. Who faces R?** R is at position 4 → **Y**  
**Q5. Who faces S?** S is at position 3 → **Z**  
**Q6. Who sits at the extreme ends of row 2?** **W and Y**

### Set C — floors with an attribute

*Five people — Amit, Bina, Chetan, Divya, Esha — live on floors 1 to 5, and each likes a different colour: red, blue, green, white, black.*
1. *Chetan lives on the top floor.*
2. *The person who likes red lives on floor 2.*
3. *Amit lives immediately above Bina.*
4. *Divya likes blue and does not live on floor 1.*
5. *Esha likes black.*
6. *Amit likes green.*

- (1) → **Chetan on floor 5.**
- (3) → (Bina, Amit) are consecutive with Amit above, so within floors 1–4 the options are
  (1,2), (2,3) and (3,4).
- **Kill (1,2) with the colours:** it would put Amit on floor 2, but (2) says floor 2 likes
  red while (6) says Amit likes green. ✗
- **Try (3,4):** Bina 3, Amit 4. Floors 1 and 2 remain for Divya and Esha. By (4) Divya is
  not on 1, so Divya would be on 2 — but floor 2 likes red and Divya likes blue. ✗
- **Try (2,3):** Bina 2, Amit 3. Floor 1 must be Esha, since Divya is barred from it → Divya
  on 4. ✓

Now fill the colour row: Bina on floor 2 → **red**. Amit → **green** (6). Divya → **blue** (4). Esha → **black** (5). Chetan takes the only one left, **white**.

**Esha(1, black), Bina(2, red), Amit(3, green), Divya(4, blue), Chetan(5, white)**

**Q7. Who lives on floor 4?** **Divya**  
**Q8. Who likes white?** **Chetan**  
**Q9. How many people live between Bina and Chetan?** Floors 3 and 4 → **two**

> Set C shows the real skill: when two branches survive, **the extra attribute clues are what
> kill one**. Do not stop at the position grid — fill the attribute row too.

---

## Traps

- **Left/right inversion** when people face the centre or face each other. Draw the arrow.
- In a circle, "opposite" only exists when the number of people is **even**.
- "Third to the left" means three positions away, not two. Count the target seat, not the
  gaps.
- "Not adjacent" and "not opposite" are constraints too — use them to eliminate.
- Carrying a guess forward without marking it as a guess. Use two diagrams instead.
- Answering from a half-finished diagram. If two arrangements survive, check whether the
  question's answer is the same in both before selecting.

---

## Checkpoints

- [ ] I read every clue before drawing anything
- [ ] I place absolute clues first, then blocks, then relative clues
- [ ] I draw two diagrams when a clue leaves two possibilities instead of guessing one
- [ ] I use a grid when the puzzle has more than one attribute per person
- [ ] I know left = clockwise when facing the centre, and reverse when facing outwards
- [ ] I fix one person's seat in a circular puzzle to remove rotational duplicates
- [ ] I know "opposite" needs an even number of seats
- [ ] I count "third to the left" as three seats, not two gaps
- [ ] I budget 5 minutes per set and abandon a stuck set rather than sinking the section
