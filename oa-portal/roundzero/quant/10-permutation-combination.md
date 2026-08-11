# Permutation & combination

Lower weightage than arithmetic (~1–2%) but it appears in every paper and it is the gateway to probability. The whole topic hangs on one question: **does order matter?**

## What gets asked

1. Arrangements of letters in a word (with repeats)
2. Selecting a committee / team
3. Circular arrangements
4. "At least one" / "always together" / "never together"
5. Distributing identical or distinct objects

---

## The one decision

| Question | Use |
|---|---|
| Does **order** matter? (arrangement, ranking, seating, passwords) | **Permutation** |
| Does order **not** matter? (selection, committee, handshakes, teams) | **Combination** |

> **ⁿPᵣ = n! / (n−r)!**
> **ⁿCᵣ = n! / (r! (n−r)!)**

Useful identities: **ⁿCᵣ = ⁿCₙ₋ᵣ**, **ⁿC₀ = ⁿCₙ = 1**, **ⁿC₁ = n**.

Small values worth knowing by sight: ⁵C₂ = 10, ⁶C₂ = 15, ⁶C₃ = 20, ⁷C₂ = 21, ⁸C₂ = 28,  
¹⁰C₂ = 45, ¹⁰C₃ = 120.

---

## Arrangements of a word

Total letters n, with repeats of counts p, q, …:

> **arrangements = n! / (p! × q! × …)**

### Worked example — ALLAHABAD

- 9 letters: A appears 4 times, L twice, and H, B, D once each.
- 9! / (4! × 2!) = 362880 / 48 = **7,560**

### Worked example — vowels together

*In how many ways can the letters of LEADING be arranged so the vowels are always together?*

- LEADING has 7 distinct letters; vowels are E, A, I (3 of them).
- Glue the vowels into one block → 5 units (block + L, D, N, G) → 5! = 120 arrangements.
- The vowels shuffle inside the block → 3! = 6.
- **120 × 6 = 720**

**The "always together" rule:** treat the group as one unit, arrange, then multiply by the internal arrangements of the group.

**The "never together" rule:** total − (always together).

---

## Selections

### Worked example — committee

*From 7 men and 6 women, form a committee of 5 with exactly 3 men.*

- Choose 3 men from 7: ⁷C₃ = 35
- Choose 2 women from 6: ⁶C₂ = 15
- **35 × 15 = 525**

### Worked example — "at least"

*From 7 men and 6 women, choose 5 people with **at least** 3 men.*

Break into cases and add:

- 3 men, 2 women: ⁷C₃ × ⁶C₂ = 35 × 15 = 525
- 4 men, 1 woman: ⁷C₄ × ⁶C₁ = 35 × 6 = 210
- 5 men, 0 women: ⁷C₅ × ⁶C₀ = 21 × 1 = 21
- **Total = 756**

> When "at least" has many cases, compute **total − the unwanted cases** instead. Here the
> complement (0, 1 or 2 men) would be three cases too, so direct is fine — but for "at least
> one", the complement is always a single case and is far faster.

### Worked example — at least one

*In how many ways can you select at least one fruit from 4 distinct fruits?*

- Each fruit is in or out → 2⁴ = 16 subsets, minus the empty one → **15**

---

## Circular arrangements

Fixing one person kills the rotational duplicates:

> **n people around a circle = (n − 1)!**
> **If clockwise and anticlockwise are the same (a necklace, a garland) = (n − 1)! / 2**

### Worked example

*7 people at a round table?* → 6! = **720**  
*A garland of 7 different flowers?* → 6!/2 = **360**

---

## Distribution

| Objects | Groups | Formula |
|---|---|---|
| n distinct | r distinct, any number each | rⁿ |
| n identical | r distinct, ≥ 0 each | ⁿ⁺ʳ⁻¹Cᵣ₋₁ |
| n identical | r distinct, ≥ 1 each | ⁿ⁻¹Cᵣ₋₁ |

### Worked example

*Distribute 10 identical chocolates among 3 children, each getting at least one.*

- ⁹C₂ = **36**

---

## Handshakes and diagonals — the two you should recognise instantly

- **Handshakes among n people** = ⁿC₂ = n(n−1)/2
- **Diagonals of an n-sided polygon** = ⁿC₂ − n = n(n−3)/2
- **Lines through n points, no 3 collinear** = ⁿC₂
- **Triangles from n points, no 3 collinear** = ⁿC₃

### Worked example

*45 handshakes took place at a party. How many people?*

- n(n−1)/2 = 45 → n(n−1) = 90 → **n = 10**

---

## Practice set

#### Q1. In how many ways can the letters of MATHEMATICS be arranged?

11 letters: M×2, A×2, T×2, and H, E, I, C, S once each.  
11! / (2! 2! 2!) = 39,916,800 / 8 = **4,989,600**

#### Q2. How many ways to arrange ENGINEERING?

11 letters: E×3, N×3, G×2, I×2, R×1.  
11! / (3! 3! 2! 2!) = 39,916,800 / (6 × 6 × 2 × 2) = 39,916,800 / 144 = **277,200**

#### Q3. In how many ways can the letters of DAUGHTER be arranged so that all vowels come together?

DAUGHTER has 8 letters; vowels A, U, E (3).  
Glue the vowels → 6 units → 6! = 720. Vowels internally → 3! = 6.  
**720 × 6 = 4,320**

#### Q4. How many ways can 5 boys and 3 girls sit in a row so that no two girls sit together?

Seat the boys first: 5! = 120. That creates 6 gaps (including the ends).  
Choose 3 gaps for the girls and arrange them: ⁶P₃ = 6 × 5 × 4 = 120.  
**120 × 120 = 14,400**

> **The gap method** is the standard tool for "no two X together". Arrange the others first,
> then slot the restricted items into the gaps.

#### Q5. From 8 men and 6 women, in how many ways can a committee of 5 be formed with at least 3 women?

- 3W, 2M: ⁶C₃ × ⁸C₂ = 20 × 28 = 560
- 4W, 1M: ⁶C₄ × ⁸C₁ = 15 × 8 = 120
- 5W, 0M: ⁶C₅ = 6
**Total = 686**

#### Q6. In how many ways can 8 people be seated at a round table?

(8 − 1)! = **5,040**

#### Q7. In how many ways can 8 beads be strung into a necklace?

(8 − 1)!/2 = 5040/2 = **2,520**

#### Q8. How many 4-digit numbers can be formed using the digits 1–7 with no repetition?

⁷P₄ = 7 × 6 × 5 × 4 = **840**

#### Q9. How many 4-digit even numbers can be formed from 0, 1, 2, 3, 4, 5 without repetition?

Split by the last digit.
- Last digit 0: remaining 3 places from {1,2,3,4,5} → ⁵P₃ = 60
- Last digit 2 or 4 (2 choices): the leading digit cannot be 0, so 4 options for it, then
  ⁴P₂ = 12 for the middle two → 2 × 4 × 12 = 96  
**Total = 60 + 96 = 156**

#### Q10. In how many ways can 10 identical balls be put into 4 distinct boxes if no box may be empty?

ⁿ⁻¹Cᵣ₋₁ = ⁹C₃ = **84**

#### Q11. A polygon has 44 diagonals. How many sides does it have?

n(n − 3)/2 = 44 → n² − 3n − 88 = 0 → (n − 11)(n + 8) = 0 → **n = 11**

#### Q12. In how many ways can 3 letters be posted into 5 letterboxes?

Each letter independently picks a box → 5 × 5 × 5 = **125**  
*(Not ⁵C₃ — the letters are distinct and a box may take more than one.)*

#### Q13. How many words can be formed from the letters of the word LEADER such that the vowels never come together?

LEADER: 6 letters with E×2 → total arrangements = 6!/2! = 360.  
Vowels together: E, A, E glued → 4 units → 4! = 24, internal 3!/2! = 3 → 72.  
Never together = 360 − 72 = **288**

#### Q14. Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?

Choose: ⁷C₃ × ⁴C₂ = 35 × 6 = 210.  
Arrange the 5 chosen letters: 5! = 120.  
**210 × 120 = 25,200**

---

## Traps

- The commonest error in the whole topic: using P when you need C. "Committee" and "team"
  are always C. "Rank", "seat", "password", "code" are always P.
- Repeated letters must be divided out. AABB is 4!/(2!2!) = 6, not 24.
- Circular is (n−1)!, not n!.
- "Always together" → glue **and then multiply by the internal arrangements**. Forgetting
  the second step is very common.
- "At least one" is almost always faster as **total − none**.
- Cases in an "at least" breakdown are **added**; steps within one case are **multiplied**.

---

## Checkpoints

- [ ] I can decide permutation vs combination from the wording in one read
- [ ] I know nPr and nCr and the identity nCr = nC(n−r)
- [ ] I can arrange a word with repeated letters using n!/(p!q!)
- [ ] I can do "vowels always together" by gluing and multiplying by the internal arrangements
- [ ] I compute "never together" as total minus together
- [ ] I can break an "at least" question into cases and add them
- [ ] I use total − none for "at least one"
- [ ] I know circular is (n−1)! and a garland is (n−1)!/2
- [ ] I recognise handshakes as nC2 and polygon diagonals as n(n−3)/2
