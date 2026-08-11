# Algebra, surds, indices, logs

Mostly a supporting topic — it shows up inside other questions more than on its own. The identities below are the part worth memorising.

## What gets asked

1. Simplification / "find the value of" (a whole Infosys sub-section)
2. Linear equations in two variables
3. Quadratics: roots, sum and product
4. Laws of indices and surds
5. Basic logarithms

---

## The identities

> (a + b)² = a² + 2ab + b²
> (a − b)² = a² − 2ab + b²
> a² − b² = (a + b)(a − b)
> (a + b)³ = a³ + b³ + 3ab(a + b)
> a³ + b³ = (a + b)(a² − ab + b²)
> a³ − b³ = (a − b)(a² + ab + b²)
> a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)

**The two that appear constantly:**

> **a² + b² = (a + b)² − 2ab**
> **If x + 1/x = k, then x² + 1/x² = k² − 2 and x³ + 1/x³ = k³ − 3k**

### Worked example

*If x + 1/x = 5, find x³ + 1/x³.*

- 5³ − 3(5) = 125 − 15 = **110**

Without the identity this is a genuinely unpleasant question. With it, it is five seconds.

### Worked example

*If a + b = 10 and ab = 21, find a² + b².*

- 10² − 2(21) = 100 − 42 = **58**

---

## Quadratics

For **ax² + bx + c = 0**:

> **roots = (−b ± √(b² − 4ac)) / 2a**
> **sum of roots = −b/a**
> **product of roots = c/a**
> **discriminant D = b² − 4ac**

| D | Roots |
|---|---|
| D > 0 | two distinct real roots |
| D = 0 | two equal real roots |
| D < 0 | no real roots (complex) |

Most campus questions only need the sum and product — you rarely have to actually solve.

### Worked example

*If the roots of x² − 7x + 12 = 0 are α and β, find 1/α + 1/β.*

- 1/α + 1/β = (α + β)/(αβ) = 7/12
- **7/12** — without finding that the roots are 3 and 4.

**To build a quadratic from its roots:** x² − (sum)x + (product) = 0.

---

## Indices

> aᵐ × aⁿ = aᵐ⁺ⁿ
> aᵐ / aⁿ = aᵐ⁻ⁿ
> (aᵐ)ⁿ = aᵐⁿ
> a⁰ = 1 (for a ≠ 0)
> a⁻ⁿ = 1/aⁿ
> a^(1/n) = ⁿ√a

### Worked example

*Simplify (2⁵ × 2³) / 2⁶.*

- 2⁸ / 2⁶ = 2² = **4**

### Worked example — solving for an exponent

*If 3ˣ⁺¹ = 81, find x.*

- 81 = 3⁴ → x + 1 = 4 → **x = 3**

**The technique:** get both sides to the same base, then equate the exponents.

---

## Surds

**Rationalising the denominator** — multiply by the conjugate:

> 1/(√a + √b) × (√a − √b)/(√a − √b) = (√a − √b)/(a − b)

### Worked example

*Simplify 1/(3 + √5).*

- × (3 − √5)/(3 − √5) → (3 − √5)/(9 − 5) = **(3 − √5)/4**

**Comparing surds:** raise both to a power that clears the roots. To compare ∛3 and √2, raise both to the 6th: 3² = 9 vs 2³ = 8 → **∛3 is larger**.

---

## Logarithms

> **log_a(xy) = log_a x + log_a y**
> **log_a(x/y) = log_a x − log_a y**
> **log_a(xⁿ) = n · log_a x**
> **log_a a = 1**, **log_a 1 = 0**
> **change of base: log_a b = log_c b / log_c a**
> **log_a b = 1 / log_b a**

### Worked example

*Find log₂ 32.*

- 32 = 2⁵ → **5**

### Worked example

*If log 2 = 0.3010, find log 5.*

- log 5 = log(10/2) = log 10 − log 2 = 1 − 0.3010 = **0.6990**

This exact question, with these exact numbers, appears very often.

---

## Linear equations in two variables

For a₁x + b₁y = c₁ and a₂x + b₂y = c₂:

| Condition | Meaning |
|---|---|
| a₁/a₂ ≠ b₁/b₂ | one unique solution |
| a₁/a₂ = b₁/b₂ = c₁/c₂ | infinitely many (same line) |
| a₁/a₂ = b₁/b₂ ≠ c₁/c₂ | no solution (parallel lines) |

Questions asking "for what value of k has this no solution" are testing exactly this table.

---

## Practice set

#### Q1. If x + 1/x = 4, find x² + 1/x².

4² − 2 = **14**

#### Q2. If x − 1/x = 3, find x² + 1/x².

(x − 1/x)² = x² − 2 + 1/x² → 9 = x² + 1/x² − 2 → **11**  
*Note the sign: subtracting gives k² **+** 2, adding gives k² **−** 2.*

#### Q3. If a + b = 7 and ab = 12, find a² + b² and a³ + b³.

a² + b² = 49 − 24 = **25** a³ + b³ = (a+b)³ − 3ab(a+b) = 343 − 3(12)(7) = 343 − 252 = **91**

#### Q4. Solve x² − 5x + 6 = 0.

(x − 2)(x − 3) = 0 → **x = 2 or 3**

#### Q5. If α and β are the roots of x² − 5x + 6 = 0, find α² + β².

Sum = 5, product = 6 → α² + β² = 25 − 12 = **13**

#### Q6. Find k so that x² + kx + 9 = 0 has equal roots.

D = 0 → k² − 36 = 0 → **k = ±6**

#### Q7. Form the quadratic whose roots are 3 and −5.

Sum = −2, product = −15 → x² − (−2)x + (−15) = **x² + 2x − 15 = 0**

#### Q8. Simplify (3⁴ × 3⁻²) / 3³.

3^(4−2−3) = 3⁻¹ = **1/3**

#### Q9. If 2ˣ = 32, find x. If 5^(x+2) = 625, find x.

32 = 2⁵ → **x = 5** · 625 = 5⁴ → x + 2 = 4 → **x = 2**

#### Q10. Rationalise 1/(√7 − √3).

× (√7 + √3)/(√7 + √3) → (√7 + √3)/(7 − 3) = **(√7 + √3)/4**

#### Q11. Find log₃ 243.

243 = 3⁵ → **5**

#### Q12. If log 2 = 0.3010 and log 3 = 0.4771, find log 6 and log 1.5.

log 6 = log 2 + log 3 = **0.7781** log 1.5 = log(3/2) = 0.4771 − 0.3010 = **0.1761**

#### Q13. For what value of k do 2x + 3y = 7 and 4x + ky = 14 have infinitely many solutions?

a₁/a₂ = b₁/b₂ = c₁/c₂ → 2/4 = 3/k = 7/14  
2/4 = 1/2 and 7/14 = 1/2, so 3/k = 1/2 → **k = 6**

#### Q14. For what value of k has the pair 3x + 2y = 5 and 6x + ky = 8 no solution?

Need a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → 3/6 = 2/k → k = 4.  
Check: c₁/c₂ = 5/8 ≠ 1/2 ✓ → **k = 4**

#### Q15. Solve: the sum of two numbers is 25 and their difference is 7.

x + y = 25, x − y = 7 → adding, 2x = 32 → x = 16, y = **9**  
**Numbers: 16 and 9**

---

## Traps

- a² + b² is **not** (a + b)². The −2ab is the whole question.
- log(x + y) is **not** log x + log y. The product rule needs a product.
- log of a negative number or of zero is undefined.
- In "no solution" questions, the third ratio must be **different**, not equal — that is
  what separates parallel from identical.
- When squaring both sides of a surd equation, always check the answers back in the original
  — squaring can invent roots.
- x⁰ = 1, but 0⁰ is undefined.

---

## Checkpoints

- [ ] I know the standard expansions including a³ ± b³ and a³+b³+c³−3abc
- [ ] I can use x + 1/x = k to get x² + 1/x² and x³ + 1/x³ instantly
- [ ] I know a² + b² = (a+b)² − 2ab
- [ ] I know sum of roots = −b/a and product = c/a, and use them without solving
- [ ] I can build a quadratic from its roots
- [ ] I can read the discriminant to classify the roots
- [ ] I solve exponential equations by matching bases
- [ ] I can rationalise a denominator with a conjugate
- [ ] I know the log product, quotient, power and change-of-base rules
- [ ] I know the three ratio conditions for unique / infinite / no solution
