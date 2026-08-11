# Simplification & approximation

Its own question type at TCS and Infosys, and the skill underneath every other quant question. Nobody asks you to *understand* anything here — they ask you to be fast and not make slips.

## What gets asked

1. "Find the value of…" — a long expression to evaluate
2. "Find the **approximate** value of…" — permission to round hard
3. Missing-number equations ("? × 12 = 480")
4. Square roots and cube roots of awkward numbers
5. Fraction comparison and ordering

---

## BODMAS — the order

**B**rackets → **O**rders (powers, roots) → **D**ivision and **M**ultiplication (left to right) → **A**ddition and **S**ubtraction (left to right)

Division and multiplication have **equal** priority — work left to right, not division first. Same for addition and subtraction.

> 12 ÷ 4 × 3 = **9** (left to right), not 12 ÷ 12 = 1.

Bracket order inside out: **( ) → { } → [ ]**.

---

## The multiplication shortcuts worth owning

**× 11:** add adjacent digits.
- 43 × 11 → 4, (4+3), 3 → **473**
- 78 × 11 → 7, (7+8)=15 → carry → 8, so 7+1=8, 5, 8 → **858**

**× 5:** halve, then × 10. → 86 × 5 = 43 × 10 = **430**  
**× 25:** divide by 4, then × 100. → 36 × 25 = 9 × 100 = **900**  
**× 15:** × 10 then add half. → 24 × 15 = 240 + 120 = **360**  
**× 9:** × 10 minus itself. → 47 × 9 = 470 − 47 = **423**

**Squares ending in 5:** first digit × (first digit + 1), then append 25.
- 35² → 3 × 4 = 12 → **1225**
- 85² → 8 × 9 = 72 → **7225**

**Numbers near 100:** (100 − a)(100 − b) = (100 − a − b) then append a×b (two digits).
- 96 × 97 → 100 − 4 − 3 = 93, and 4 × 3 = 12 → **9312**
- 98 × 94 → 92, and 2 × 6 = 12 → **9212**

**a² − b² = (a+b)(a−b)** — the most under-used shortcut in the section.
- 87² − 13² = 100 × 74 = **7400**

**(a + b)² and (a − b)² for mental squares:**
- 51² = 50² + 2(50)(1) + 1 = 2500 + 100 + 1 = **2601**
- 99² = 100² − 2(100)(1) + 1 = **9801**

---

## Approximation

The word "approximately" in the stem is an instruction. Round to **two significant figures** and check how far apart the options are before doing anything precise.

**Rounding rules that keep you accurate:**
- Round the numerator and denominator in the **same direction** and the error partly cancels
- √ of an awkward number: find the two perfect squares it sits between
- Percentages: convert to the nearest easy fraction (33% → 1/3, 12.5% → 1/8)

---

## Square and cube roots

Know squares to 30 and cubes to 15 (they are in the progressions sheet). Then:

**Square root of a perfect square, by inspection:**
- The **last digit** narrows it: a square ending in 1 has a root ending in 1 or 9; ending in
  4 → 2 or 8; ending in 9 → 3 or 7; ending in 6 → 4 or 6; ending in 5 → 5; ending in 0 → 0.
- The **size** picks between them.

*√5184?* Ends in 4 → root ends in 2 or 8. It lies between 70² = 4900 and 80² = 6400, so it is in the 70s → 72 or 78. 72² = 5184 ✓ → **72**

**Cube roots** are easier — last digits are unique:  
cube ends in 1→1, 8→2, 7→3, 4→4, 5→5, 6→6, 3→7, 2→8, 9→9, 0→0.

*∛�9261?* Ends in 1 → root ends in 1. 20³ = 8000, 30³ = 27000 → it is in the 20s → **21**

---

## Comparing fractions

**Cross-multiply.** To compare a/b and c/d, compare **ad** with **bc**.
- 7/9 vs 5/7 → 7×7 = 49 vs 9×5 = 45 → **7/9 is larger**

**When numerators are equal**, the smaller denominator wins. **When denominators are equal**, the larger numerator wins.

**Nearer to 1:** for proper fractions, the one with the smaller (denominator − numerator) gap relative to size is larger. 8/9 beats 5/6 because 8/9 = 1 − 1/9 and 5/6 = 1 − 1/6.

---

## Practice set

#### Q1. Simplify: 36 ÷ 6 × 3 + 4 − 2

Division and multiplication left to right: 36 ÷ 6 = 6, then × 3 = 18.  
18 + 4 − 2 = **20**

#### Q2. Simplify: 12 + [8 − {6 ÷ 2 × (4 − 2)}]

Innermost first: (4 − 2) = 2 → 6 ÷ 2 × 2 = 3 × 2 = 6  
Then {6}, so [8 − 6] = 2 → 12 + 2 = **14**

#### Q3. 78 × 11 = ?

7, (7+8 = 15 → write 5 carry 1), 8 → 7+1 = 8 → **858**

#### Q4. 65² = ?

6 × 7 = 42, append 25 → **4225**

#### Q5. 97 × 96 = ?

100 − 3 − 4 = 93; 3 × 4 = 12 → **9312**

#### Q6. 124² − 76² = ?

(124 + 76)(124 − 76) = 200 × 48 = **9,600**

#### Q7. Find the approximate value of 4987 ÷ 24.9

Round: 5000 ÷ 25 = **200**

#### Q8. Find the approximate value of 39.98% of 649.87 + 25.02% of 799.9

40% of 650 = 260 · 25% of 800 = 200 → **460**

#### Q9. ? × 18 = 45% of 720

45% of 720 = 324 → ? = 324 ÷ 18 = **18**

#### Q10. √6084 = ?

Ends in 4 → root ends in 2 or 8. Between 70² = 4900 and 80² = 6400 → in the 70s.  
78² = 6084 ✓ → **78**

#### Q11. ∛³ 4913 = ?

Ends in 3 → root ends in 7. Between 10³ and 20³ → in the teens → **17**

#### Q12. Which is greater: 11/13 or 15/17?

11 × 17 = 187 vs 13 × 15 = 195 → **15/17 is greater**

#### Q13. Simplify: (0.7 × 0.7 × 0.7 + 0.3 × 0.3 × 0.3) ÷ (0.7 × 0.7 − 0.7 × 0.3 + 0.3 × 0.3)

This is a³ + b³ over a² − ab + b², which equals **a + b**.  
0.7 + 0.3 = **1**

#### Q14. Simplify: 3/4 of 5/6 of 720

720 × 5/6 = 600 → 600 × 3/4 = **450**

#### Q15. 1.5 + 2.25 + 3.125 − 4.875 = ?

1.5 + 2.25 = 3.75; + 3.125 = 6.875; − 4.875 = **2**

#### Q16. Approximate: (23.98)² − (16.02)²

≈ 24² − 16² = (24+16)(24−16) = 40 × 8 = **320**

---

## Traps

- Division before multiplication. They are equal priority — go **left to right**.
- The same for addition and subtraction.
- Losing a decimal place. Count decimals before you start, not after.
- Over-computing an "approximately" question. Check the option spread first.
- In the ×11 trick, forgetting to carry when the digit sum exceeds 9.
- Using the near-100 trick for numbers far from 100 — it only holds close to the base.
- A square root ending in 4 has two candidate roots. Use the magnitude to pick.

---

## Checkpoints

- [ ] I apply BODMAS with division/multiplication left to right, not division first
- [ ] I know the × 11, × 5, × 25, × 15 and × 9 shortcuts
- [ ] I can square any number ending in 5 instantly
- [ ] I can multiply two numbers near 100 in my head
- [ ] I look for a² − b² before doing any subtraction of squares
- [ ] I round to two significant figures on any "approximately" question
- [ ] I can find the square root of a perfect square from its last digit and magnitude
- [ ] I know the cube-root last-digit map
- [ ] I compare fractions by cross-multiplying
- [ ] I recognise the (a³+b³)/(a²−ab+b²) = a+b pattern
