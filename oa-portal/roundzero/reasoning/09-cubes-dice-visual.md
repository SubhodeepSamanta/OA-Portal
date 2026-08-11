# Cubes, dice, figural reasoning

TCS calls this "visual-spatial reasoning"; Accenture allots 4–5 questions to visual reasoning. Cubes and dice are formula-driven and worth doing. Pure figure-series questions are worth a quick guess, not a long fight.

---

# Part 1 — Painted cubes

A large cube is painted on all faces and cut into **n³** smaller cubes (n cuts per side).

> **3 faces painted (corners): always 8**
> **2 faces painted (edges): 12(n − 2)**
> **1 face painted (face centres): 6(n − 2)²**
> **0 faces painted (interior): (n − 2)³**

Check: 8 + 12(n−2) + 6(n−2)² + (n−2)³ = n³ always.

### Worked example — a cube cut into 64 pieces

- 64 = 4³, so n = 4 and (n − 2) = 2
- 3 faces: **8**
- 2 faces: 12 × 2 = **24**
- 1 face: 6 × 2² = **24**
- 0 faces: 2³ = **8**
- Total: 8 + 24 + 24 + 8 = 64 ✓

### Worked example — n = 5 (125 pieces)

- (n − 2) = 3
- 3 faces: 8 · 2 faces: 36 · 1 face: 54 · 0 faces: 27 → total 125 ✓

**If only some faces are painted**, the formulas break — count by position instead. But the standard "all faces painted" version is what is nearly always asked.

---

# Part 2 — Dice

## The one fact that matters

> **On a standard die, opposite faces sum to 7.** So 1↔6, 2↔5, 3↔4.

If a question says "standard die" or "ordinary die", use this immediately.

## Two-position dice questions

You are shown the same die in two orientations and asked which face is opposite which.

**Rule 1 — if one face is common to both views**, the other four faces shown are all  
*adjacent* to it. The face never shown is its opposite.

**Rule 2 — if two faces are common to both views** and their positions have rotated, then the two remaining (different) faces are **opposite each other**.

### Worked example

*Two views of a die:*  
*View 1 shows 1 on top, 2 in front, 3 on the right.*  
*View 2 shows 1 on top, 3 in front, 5 on the right.*

- The 1 is common to both, so 2, 3 and 5 are all adjacent to 1.
- Faces adjacent to 1 are four in number. We know 2, 3, 5 are three of them.
- The faces not yet placed are 4 and 6. One of them is adjacent to 1 and one is opposite.
- With opposite faces summing to 7, **6 is opposite 1** — and 4 is the fourth neighbour.

### Worked example — rule 2

*View 1: faces 3, 1, 5 visible. View 2: faces 3, 1, 2 visible (with 3 and 1 in rotated positions).*

- 3 and 1 are common. The differing faces are 5 and 2.
- By rule 2, **5 is opposite 2**. (And 5 + 2 = 7 ✓ confirms a standard die.)

## Dice nets

When a flat cross-shaped net is folded into a cube:

- Faces **one square apart in a straight line** end up **opposite**
- Faces **adjacent in the net** end up **adjacent**

---

# Part 3 — Figure series and analogies

These show shapes rather than numbers. The transformation is almost always one of:

| Transformation | What to look for |
|---|---|
| **Rotation** | 45°, 90°, 180° — clockwise or anticlockwise |
| **Reflection** | mirror across a vertical or horizontal axis |
| **Addition / removal** | an element appears or disappears each step |
| **Count change** | number of dots, lines or sides increments |
| **Shading movement** | a shaded cell moves one position each step |
| **Size change** | figures grow or shrink |
| **Combination** | two of the above at once |

## The method

1. Count **elements** first — sides, dots, lines. A changing count is the easiest pattern to
   spot and the most common.
2. Check **rotation** second. Pick one asymmetric feature (an arrow, a notch) and track only
   that.
3. Check **shading** third.
4. If two things change at once, describe each separately, then apply both.

> **Track one feature at a time.** Trying to see the whole figure transform at once is why
> these feel impossible. Pick the arrow, follow only the arrow, then start again with the
> dot.

## Mirror and water images

- **Mirror image** (vertical mirror on the side): left and right swap; top and bottom stay.
  Letters that are unchanged: **A, H, I, M, O, T, U, V, W, X, Y**
- **Water image** (reflection in water below): top and bottom swap; left and right stay.
  Letters unchanged: **B, C, D, E, H, I, K, O, X**

## Paper folding and punching

A sheet is folded, a hole is punched, then it is unfolded.

> **Each fold doubles the number of holes.** One fold → 2 holes, two folds → 4, three → 8.

Unfold in **reverse order**, mirroring the holes across each fold line as you go. Working forwards is the standard mistake.

---

## Practice set

### Painted cubes

#### Q1. A cube painted on all faces is cut into 27 identical smaller cubes. How many have exactly 2 faces painted?

27 = 3³ → n = 3, (n−2) = 1.  
12(n−2) = **12**

#### Q2. Same cube — how many have exactly 1 face painted, and how many none?

6(n−2)² = 6 × 1 = **6** with one face · (n−2)³ = **1** with none  
*(Check: 8 + 12 + 6 + 1 = 27 ✓)*

#### Q3. A cube is cut into 216 smaller cubes. How many have exactly 3 faces painted?

Corners are always **8**, whatever n is.

#### Q4. For the 216-cube (n = 6), how many have exactly one face painted?

(n−2) = 4 → 6 × 16 = **96**

#### Q5. A cube of side 5 cm is painted and cut into 1 cm cubes. How many have no paint?

(5−2)³ = **27**

#### Q6. A 4×4×4 cube is painted red on two opposite faces only and cut into 64 cubes. How many have no paint at all?

The standard formulas do not apply. With only two opposite faces painted, a small cube is unpainted unless it lies on one of those two faces. Each painted face touches 16 small cubes  
→ 32 painted → 64 − 32 = **32 unpainted**

### Dice

#### Q7. A standard die shows 3 on top. What is on the bottom?

Opposite faces sum to 7 → **4**

#### Q8. Two views of a die: (i) 1 top, 2 front, 3 right; (ii) 5 top, 2 front, 3 right. Which number is opposite 1?

2 and 3 are common to both views, so they are adjacent to both 1 and 5. The differing faces are 1 and 5 → by rule 2 they are **opposite each other**. So **5 is opposite 1**.

#### Q9. A die shows 2, 3 and 4 in one view. Which faces are hidden?

The hidden ones are the opposites: 7−2 = 5, 7−3 = 4… but 4 is visible, so this die cannot be standard with 3 and 4 both adjacent — on a standard die 3 and 4 **are** opposite and could never both be visible.  
**Conclusion: the die is non-standard**, and the sum-to-7 rule must not be used.

> Q9 is the check worth internalising: **if two faces you can see would be opposite on a
> standard die, the die is not standard.**

#### Q10. In a dice net shaped like a cross, faces A and D are two squares apart in a straight line. What is their relationship when folded?

Faces one square apart in a straight line become **opposite**.

### Figure reasoning

#### Q11. A figure rotates 90° clockwise at each step. After 5 steps, what is the net rotation?

5 × 90 = 450° → 450 − 360 = **90° clockwise**

#### Q12. Which letters look unchanged in a mirror image?

**A, H, I, M, O, T, U, V, W, X, Y**

#### Q13. Which letters look unchanged in a water image?

**B, C, D, E, H, I, K, O, X**

#### Q14. A square sheet is folded twice and one hole is punched. How many holes appear when unfolded?

Each fold doubles → 2² = **4 holes**

#### Q15. A sheet folded three times with two holes punched?

2 holes × 2³ = **16 holes**

---

## Traps

- Painted-cube formulas use **(n − 2)**, not n. For n = 4 that is 2, not 4.
- "Cut into 64 pieces" means n = 4, not n = 64.
- Not every die is standard. If the question shows numbers that contradict the sum-to-7 rule,
  it is a non-standard die and you must reason from the views alone.
- In figure series, a 180° rotation and a double reflection look identical for symmetric
  shapes — use an asymmetric feature to tell them apart.
- Mirror image ≠ water image. Check which the question asks for.
- Unfold paper backwards, mirroring at each step.

---

## Checkpoints

- [ ] I know the four painted-cube formulas and that they use (n − 2)
- [ ] I can convert "cut into N pieces" into n by taking the cube root
- [ ] I verify my four counts sum to n³
- [ ] I know opposite faces of a standard die sum to 7
- [ ] I can use the one-common-face and two-common-faces rules on two-view dice questions
- [ ] I track a single asymmetric feature through a figure series rather than the whole shape
- [ ] I check element counts before checking rotation
- [ ] I know which letters survive a mirror image and which survive a water image
- [ ] I unfold paper-punch questions in reverse, doubling the holes at each step
