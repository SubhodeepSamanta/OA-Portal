# Series, analogy, odd one out

Accenture files these under "Numerical Ability" and TCS under "Reasoning" — same questions either way. They are the fastest marks in the paper once you know the letter positions.

## Prerequisite: the alphabet positions

You cannot do letter series at speed without these. Learn the anchors and count from them.

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |

| N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 |

**Anchors to memorise:** E=5, J=10, O=15, T=20, Y=25. Everything else is within two steps of one of those. ("EJOTY" is the standard mnemonic.)

**The opposite-letter rule:** A↔Z, B↔Y, C↔X … each pair sums to **27**. So the opposite of  
K (11) is 27 − 11 = 16 = **P**. This is asked directly and is also the basis of many coding questions.

---

## Number series — the checklist

Run these in order and stop at the first that fits:

1. **Differences** (then second differences)
2. **Ratios** — constant → GP
3. **Squares / cubes ± a small constant**
4. **Primes**
5. **Alternating** — split odd and even positions
6. **×n ± k** with n or k changing
7. **Sum of the previous two**

### Worked examples

*3, 7, 15, 31, ?*
- Each is ×2 + 1 → 31 × 2 + 1 = **63**

*1, 4, 9, 16, 25, ?*
- Perfect squares → **36**

*2, 3, 5, 7, 11, 13, ?*
- Primes → **17**

*4, 9, 19, 39, 79, ?*
- ×2 + 1 → **159**

*120, 99, 80, 63, 48, ?*
- Differences: −21, −19, −17, −15 → next −13 → **35**
- (Also n² − 1 running downward: 121−1, 100−1, 81−1, 64−1, 49−1, **36−1 = 35**.)

*5, 11, 24, 51, 106, ?*
- ×2 + 1, ×2 + 2, ×2 + 3, ×2 + 4 → ×2 + 5 → 106 × 2 + 5 = **217**

---

## Letter series

Convert to numbers, find the pattern, convert back. Always.

### Worked example

*C, F, I, L, ?*
- 3, 6, 9, 12 → +3 each → 15 → **O**

### Worked example

*AZ, BY, CX, DW, ?*
- First letters: A, B, C, D → next **E**
- Second letters: Z, Y, X, W → next **V**
- **EV**

### Worked example

*B, D, G, K, ?*
- 2, 4, 7, 11 → differences +2, +3, +4 → next +5 → 16 → **P**

---

## Analogies

The format is **A : B :: C : ?** — read it as "A is to B as C is to ?"

**The method:** state the relationship between A and B in *words*, as precisely as you can, then apply that exact sentence to C.

| Relationship type | Example |
|---|---|
| Worker : tool | Carpenter : Saw |
| Worker : workplace | Chef : Kitchen |
| Part : whole | Petal : Flower |
| Product : source | Milk : Cow |
| Cause : effect | Virus : Disease |
| Synonym / antonym | Huge : Enormous / Hot : Cold |
| Object : function | Pen : Write |
| Individual : group | Sheep : Flock |
| Degree | Warm : Hot, Sad : Miserable |

### Worked example

*Doctor : Stethoscope :: Farmer : ?*
- Relationship: "a doctor's characteristic tool is a stethoscope"
- **Plough** (not "field" — that would be the workplace relationship)

**The precision test:** if your sentence is vague ("they go together"), two options will fit. Sharpen it until only one does.

### Number analogies

*9 : 81 :: 12 : ?*
- Relationship: square → **144**

*8 : 24 :: 12 : ?*
- Could be ×3 (→36) or +16 (→28). **Prefer the multiplicative relation** — it is the
  intended one far more often. **36**

---

## Odd one out

The rule may be about a **sequence** or about a **property**. Check properties second:

- prime / composite
- perfect square / cube
- odd / even
- divisible by some number
- palindromic digits

### Worked examples

*3, 5, 7, 9, 11* → **9** (the only composite)

*16, 25, 36, 49, 62* → **62** (the only non-square)

*Cat, Dog, Lion, Sparrow, Horse* → **Sparrow** (bird, not mammal)

*121, 144, 169, 196, 220* → **220** (the rest are 11², 12², 13², 14²)

---

## Practice set

**Q1. 6, 11, 21, 36, 56, ?** → differences 5, 10, 15, 20 → next 25 → **81**  
**Q2. 2, 6, 12, 20, 30, ?** → n(n+1) → 6×7 = **42**  
**Q3. 1, 8, 27, 64, ?** → cubes → **125**  
**Q4. 5, 10, 13, 26, 29, ?** → ×2, +3 alternating → 29 × 2 = **58**  
**Q5. 3, 6, 18, 72, ?** → ×2, ×3, ×4 → ×5 = **360**  
**Q6. 1, 2, 6, 24, 120, ?** → factorials, ×2 ×3 ×4 ×5 → ×6 = **720**  
**Q7. 100, 96, 88, 76, 60, ?** → differences −4, −8, −12, −16 → −20 → **40**  
**Q8. 7, 26, 63, 124, ?** → n³ − 1: 2³−1, 3³−1, 4³−1, 5³−1 → 6³−1 = **215**  
**Q9. 0, 6, 24, 60, 120, ?** → n³ − n: 1−1, 8−2, 27−3, 64−4, 125−5 → 216−6 = **210**  
**Q10. 2, 5, 11, 23, 47, ?** → ×2 + 1 → **95**

### Letter series

**Q11. B, E, H, K, ?** → 2, 5, 8, 11 → +3 → 14 → **N**  
**Q12. Z, W, T, Q, ?** → 26, 23, 20, 17 → −3 → 14 → **N**  
**Q13. A, C, F, J, ?** → 1, 3, 6, 10 → +2, +3, +4 → +5 = 15 → **O**  
**Q14. AZ, CX, EV, ?** → first: A, C, E → **G**; second: Z, X, V → **T** → **GT**  
**Q15. ACE, BDF, CEG, ?** → each letter +1 → **DFH**

### Analogies

#### Q16. Book : Author :: Painting : ?

Relationship: the creator of the work. → **Painter/Artist**

#### Q17. Doctor : Hospital :: Judge : ?

Workplace. → **Court**

#### Q18. Hunger : Food :: Thirst : ?

The need and what satisfies it. → **Water**

#### Q19. Optimist : Cheerful :: Pessimist : ?

Person and their characteristic mood. → **Gloomy**

#### Q20. Nurture : Neglect :: Fertile : ?

Antonym pair. → **Barren**

**Q21. 8 : 64 :: 11 : ?** → square → **121**  
**Q22. 6 : 42 :: 9 : ?** → n(n+1) → 9 × 10 = **90**  
**Q23. 25 : 5 :: 121 : ?** → square root → **11**  
**Q24. CAT : DBU :: DOG : ?** → each letter +1 → **EPH**

### Odd one out

**Q25. 8, 27, 64, 100, 125** → all cubes except **100**  
**Q26. 2, 3, 5, 7, 9, 11** → all prime except **9**  
**Q27. Copper, Zinc, Brass, Aluminium** → **Brass** is an alloy, the rest are elements  
**Q28. Square, Circle, Rectangle, Triangle** → **Circle** has no straight sides/vertices  
**Q29. 16, 25, 36, 49, 63** → all perfect squares except **63**  
**Q30. Kilogram, Litre, Metre, Temperature** → **Temperature** is a quantity, not a unit

---

## Traps

- **Two patterns fit the first four terms.** Always verify your rule against *every* given
  term before answering.
- In letter series, watch for wraparound: after Z comes A again in some questions.
- For analogies, the *direction* matters. Doctor : Patient is not the same as Patient :
  Doctor.
- In odd-one-out, more than one answer often looks defensible; pick the property that
  separates **exactly one** item, not one that separates two.
- Do not assume "alternating" until simple differences and ratios have both failed.

---

## Checkpoints

- [ ] I know EJOTY and can place any letter's position within two seconds
- [ ] I know that opposite letters sum to 27
- [ ] I run the number-series checklist in order rather than guessing
- [ ] I verify a candidate rule against every given term before answering
- [ ] I convert letter series to numbers before looking for the pattern
- [ ] I can handle two-letter series by treating each position independently
- [ ] I state an analogy's relationship as a precise sentence before checking options
- [ ] I prefer multiplicative relationships in number analogies
- [ ] I check properties (prime, square, parity) as well as sequences in odd-one-out
