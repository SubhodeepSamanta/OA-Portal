# Progressions & number series

Two related things: the formal AP/GP formulas, and the informal "find the next number" questions that appear in *every* reasoning section.

---

# Part 1 — Arithmetic progression (AP)

A sequence with a constant **difference** d.

> **nth term: aₙ = a + (n − 1)d**
> **Sum: Sₙ = n/2 × [2a + (n − 1)d]**  or  **Sₙ = n/2 × (first + last)**

The second sum formula is the one to use when you know the last term — it is much faster.

### Worked example

*Find the 20th term of 7, 11, 15, …*

- a = 7, d = 4 → a₂₀ = 7 + 19 × 4 = **83**

### Worked example

*Sum of all two-digit numbers divisible by 7.*

- First is 14, last is 98, d = 7.
- n: 98 = 14 + (n−1)7 → 84 = 7(n−1) → n = **13**
- S = 13/2 × (14 + 98) = 13/2 × 112 = **728**

### Standard sums worth memorising

| Sum | Formula |
|---|---|
| 1 + 2 + … + n | n(n+1)/2 |
| 1² + 2² + … + n² | n(n+1)(2n+1)/6 |
| 1³ + 2³ + … + n³ | [n(n+1)/2]² |
| First n odd numbers | n² |
| First n even numbers | n(n+1) |

---

# Part 2 — Geometric progression (GP)

A constant **ratio** r.

> **nth term: aₙ = a·r⁽ⁿ⁻¹⁾**
> **Sum: Sₙ = a(rⁿ − 1)/(r − 1)** for r > 1, or **a(1 − rⁿ)/(1 − r)** for r < 1
> **Infinite sum (only if |r| < 1): S∞ = a / (1 − r)**

### Worked example

*Sum of 3 + 6 + 12 + … to 8 terms.*

- a = 3, r = 2 → S = 3(2⁸ − 1)/(2 − 1) = 3 × 255 = **765**

### Worked example — infinite

*1 + 1/2 + 1/4 + 1/8 + … ?*

- a = 1, r = 1/2 → 1/(1 − 1/2) = **2**

**Harmonic progression (HP):** a sequence whose reciprocals form an AP. To solve any HP question, flip everything into an AP, solve, and flip back.

---

# Part 3 — Number series (the reasoning kind)

This is the version that actually appears most. You are shown 5–6 numbers and must find the next one or the odd one out. It is pattern recognition, and there are only about eight patterns.

## The checklist — run it in this order

1. **Differences.** Take consecutive differences. Constant → AP. If the differences
   themselves form a pattern, take second differences.
2. **Ratios.** Each term ÷ previous. Constant → GP.
3. **Squares / cubes**, possibly ±1. Know squares to 30 and cubes to 15.
4. **Primes**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29…
5. **Alternating**: two interleaved series. Check odd positions and even positions
   separately.
6. **×n then ±k**, with n or k changing.
7. **Sum of the previous two** (Fibonacci-like).
8. **n! or n×(n+1)** patterns.

### Worked example — differences

*2, 6, 12, 20, 30, ?*

- Differences: 4, 6, 8, 10 → next difference 12 → **42**
- (Also n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, **6×7 = 42**.)

### Worked example — squares ± 1

*0, 3, 8, 15, 24, ?*

- These are 1²−1, 2²−1, 3²−1, 4²−1, 5²−1 → next is 6²−1 = **35**

### Worked example — alternating

*2, 3, 5, 6, 8, 12, 11, 24, ?*

Nothing sensible comes from consecutive differences, so split by position:

- Positions 1, 3, 5, 7 → 2, 5, 8, 11 → an AP with d = 3
- Positions 2, 4, 6, 8 → 3, 6, 12, 24 → a GP with r = 2
- Position 9 is the next odd-position term → 11 + 3 = **14**

Whenever a series refuses to yield to differences or ratios, split it by position before trying anything cleverer.

### Worked example — ×n then +k

*5, 11, 23, 47, ?*

- Each is ×2 + 1 → 47 × 2 + 1 = **95**

### Worked example — odd one out

*3, 5, 7, 9, 11, 13*

- All odd, but 9 is not prime → **9** is the odd one out.

---

## Squares and cubes to memorise

| n | n² | n | n² | n | n³ |
|---|---|---|---|---|---|
| 11 | 121 | 21 | 441 | 6 | 216 |
| 12 | 144 | 22 | 484 | 7 | 343 |
| 13 | 169 | 23 | 529 | 8 | 512 |
| 14 | 196 | 24 | 576 | 9 | 729 |
| 15 | 225 | 25 | 625 | 11 | 1331 |
| 16 | 256 | 26 | 676 | 12 | 1728 |
| 17 | 289 | 27 | 729 | 13 | 2197 |
| 18 | 324 | 28 | 784 | 14 | 2744 |
| 19 | 361 | 29 | 841 | 15 | 3375 |
| 20 | 400 | 30 | 900 | | |

Recognising 729 as both 27² and 9³ has resolved a lot of series questions.

---

## Practice set

#### Q1. Find the 25th term of the AP 5, 9, 13, …

a = 5, d = 4 → a₂₅ = 5 + 24 × 4 = **101**

#### Q2. How many terms are there in the AP 7, 11, 15, …, 139?

139 = 7 + (n−1)4 → 132 = 4(n−1) → n − 1 = 33 → **n = 34**

#### Q3. Find the sum of the first 30 terms of the AP 3, 7, 11, …

S = 30/2 × [2(3) + 29(4)] = 15 × (6 + 116) = 15 × 122 = **1,830**

#### Q4. Find the sum of all three-digit numbers divisible by 9.

First 108, last 999, d = 9.  
n: 999 = 108 + (n−1)9 → 891 = 9(n−1) → n = 100  
S = 100/2 × (108 + 999) = 50 × 1107 = **55,350**

#### Q5. The 7th term of an AP is 34 and the 13th is 64. Find the 18th term.

a + 6d = 34, a + 12d = 64 → 6d = 30 → d = 5, a = 4 a₁₈ = 4 + 17 × 5 = **89**

#### Q6. Find the sum of 2 + 4 + 6 + … + 100.

This is 2(1 + 2 + … + 50) = 2 × (50 × 51/2) = **2,550**

#### Q7. Find the sum of the first 20 terms of the GP 2, 6, 18, … (leave in index form).

a = 2, r = 3 → S = 2(3²⁰ − 1)/(3 − 1) = **3²⁰ − 1**

#### Q8. Find the sum of the infinite GP 8, 4, 2, 1, …

a = 8, r = 1/2 → 8/(1 − 1/2) = **16**

#### Q9. The third term of a GP is 12 and the sixth is 96. Find the first term.

ar² = 12, ar⁵ = 96 → r³ = 8 → r = 2 a × 4 = 12 → **a = 3**

#### Q10. Find the next term: 7, 14, 28, 56, ?

Each term doubles → **112**

#### Q11. Find the missing term: 4, 9, 19, 39, ?, 159

Rule is ×2 + 1 → 39 × 2 + 1 = **79** *(and 79 × 2 + 1 = 159 ✓)*

#### Q12. Find the next term: 1, 4, 27, 256, ?

1¹, 2², 3³, 4⁴ → next is 5⁵ = **3,125**

#### Q13. Find the odd one out: 4, 9, 16, 25, 36, 48

All are perfect squares except **48**.

#### Q14. Find the next term: 2, 12, 36, 80, 150, ?

These are n³ + n²: 1+1=2, 8+4=12, 27+9=36, 64+16=80, 125+25=150 → 216 + 36 = **252**

#### Q15. Find the next term: 3, 8, 15, 24, 35, ?

Differences 5, 7, 9, 11 → next 13 → 35 + 13 = **48**  
*(Also n² − 1: 4−1, 9−1, 16−1, 25−1, 36−1, 49−1 = 48 ✓)*

---

## Traps

- In a series question, always check **two** patterns before committing. Many sequences fit
  two rules for the first four terms and diverge at the fifth.
- S∞ for a GP exists **only** when |r| < 1. If r ≥ 1 the answer is "infinite", and that is
  sometimes an option.
- In AP sum questions, find **n** first. Half the wrong answers come from a wrong term count.
- "Two-digit numbers divisible by 7" starts at 14, not 7.
- For odd-one-out, the rule may be about a property (prime, perfect square, divisible by 3)
  rather than about a sequence.

---

## Checkpoints

- [ ] I know aₙ = a + (n−1)d and both AP sum formulas
- [ ] I use Sₙ = n/2 × (first + last) whenever the last term is known
- [ ] I know the sums of the first n naturals, squares and cubes
- [ ] I know the GP nth term, finite sum, and that S∞ = a/(1−r) needs |r| < 1
- [ ] I solve HP questions by flipping to an AP
- [ ] I run the series checklist in order: differences → ratios → squares/cubes → primes → alternating
- [ ] I check odd and even positions separately when one pattern does not fit
- [ ] I know squares to 30 and cubes to 15 by sight
