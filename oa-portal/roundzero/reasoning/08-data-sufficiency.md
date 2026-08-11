# Data sufficiency

Asked by TCS, Infosys and Accenture. The highest-value habit in the whole shelf lives here:  
**you do not have to solve the question.** You only decide whether it *could* be solved.

## The format

A question, then two statements. You choose from a fixed option set — usually:

| Option | Meaning |
|---|---|
| **A** | Statement I alone is sufficient, but II alone is not |
| **B** | Statement II alone is sufficient, but I alone is not |
| **C** | Both together are sufficient, but neither alone is |
| **D** | Each alone is sufficient |
| **E** | Both together are still not sufficient |

Read the option list on your actual paper — the lettering varies. The five *cases* do not.

---

## The method

**1. Look at statement I alone.** Cover statement II with your hand. Sufficient or not?

**2. Look at statement II alone.** Now genuinely forget statement I. This is the step people fail — information from I leaks into their reading of II.

**3. Only if both fail individually**, combine them.

**4. Stop the moment you know it is answerable.** Do not compute the answer.

> Write **I: Y/N** and **II: Y/N** on your rough sheet before choosing. Two letters, then map
> to the option. This mechanical habit prevents almost every error in the topic.

---

## Worked example 1

*What is the value of x?*  
*I. x² = 36*  
*II. x is positive.*

- **I alone:** x = 6 or x = −6. Two values → **not sufficient**.
- **II alone:** x is positive tells us nothing about its value → **not sufficient**.
- **Together:** x = 6 → **sufficient**.
- **Answer: C.**

The trap is answering A because "x² = 36 is solvable". It is solvable, but not *uniquely*.

---

## Worked example 2

*How old is Ram?*  
*I. Ram is 5 years older than Shyam.*  
*II. Shyam is 20 years old.*

- **I alone:** relative only → not sufficient.
- **II alone:** says nothing about Ram → not sufficient.
- **Together:** Ram = 25 → sufficient.
- **Answer: C.**

---

## Worked example 3

*What is the area of the rectangle?*  
*I. Its length is 10 cm.*  
*II. Its perimeter is 28 cm.*

- **I alone:** no width → not sufficient.
- **II alone:** perimeter 28 gives l + b = 14; many rectangles fit → not sufficient.
- **Together:** l = 10 → b = 4 → area 40 → sufficient.
- **Answer: C.** (And note we did **not** need to compute 40 — recognising uniqueness was
  enough.)

---

## Worked example 4 — where the answer is D

*What is the value of x?*  
*I. 3x + 6 = 18*  
*II. x is the only even prime number.*

- **I alone:** x = 2 → sufficient.
- **II alone:** the only even prime is 2 → sufficient.
- **Answer: D.**

---

## Worked example 5 — where the answer is E

*What is the value of x + y?*  
*I. x is a positive integer.*  
*II. y = 5.*

- **I alone:** no → **II alone:** no
- **Together:** x could be 1, 2, 3… → x + y is not determined → **not sufficient**.
- **Answer: E.**

---

## Practice set

Use the option set from the top of the sheet (A / B / C / D / E).

#### Q1. What is the value of x?

I. x is a prime number less than 5. II. x is even.  
I alone: x = 2 or 3 → no. II alone: infinitely many → no.  
Together: the even prime under 5 is 2 → yes. **C**

#### Q2. Is n divisible by 6?

I. n is divisible by 3. II. n is divisible by 4.  
I alone no. II alone no.  
Together: divisible by 3 and 4 → divisible by 12 → divisible by 6 → yes. **C**

#### Q3. What is the area of the square?

I. Its perimeter is 36 cm. II. Its diagonal is 9√2 cm.  
I alone: side 9 → area 81 ✓. II alone: side 9 → area 81 ✓.  
**D** — each alone is sufficient.

#### Q4. Who is the tallest among P, Q and R?

I. P is taller than Q. II. R is shorter than Q.  
I alone: nothing about R. II alone: nothing about P.  
Together: P > Q > R ✓ **C**

#### Q5. What is the two-digit number?

I. The sum of its digits is 9. II. The number is divisible by 9.  
I alone: 18, 27, 36, 45 … → no. II alone: the same set → no.  
Together: still the same set → **E**  
*(A classic — two statements that say the same thing add nothing.)*

#### Q6. Is x > 0?

I. x² > 0. II. x³ > 0.  
I alone: x could be negative → no.  
II alone: an odd power preserves the sign, so x³ > 0 forces x > 0 → yes. **B**

#### Q7. What is the speed of the train?

I. It crosses a pole in 10 seconds. II. It is 200 m long.  
Together: 200/10 = 20 m/s ✓ **C**

#### Q8. How many students are in the class?

I. If 4 more join, the number becomes divisible by 5.  
II. The number is between 20 and 25.  
Together: n in 21–24 with n + 4 divisible by 5 → 21 (→25 ✓); 22, 23, 24 all fail. Unique →  
**C**

#### Q9. Is the quadrilateral a square?

I. All four sides are equal. II. All four angles are equal.  
I alone: could be a rhombus. II alone: could be a rectangle.  
Together: square ✓ **C**

#### Q10. Is x an integer?

I. x/2 is an integer. II. 2x is an integer.  
I alone: x/2 integer → x is even → an integer ✓ **sufficient**  
II alone: 2x integer allows x = 0.5 → not sufficient.  
**A**

#### Q11. On which day did Ram arrive?

I. After Tuesday but before Friday. II. After Wednesday but before Saturday.  
I alone: Wed or Thu. II alone: Thu or Fri.  
Together: the overlap is **Thursday** ✓ **C**

#### Q12. What is John's salary?

I. It is 20% more than Peter's. II. Peter earns ₹40,000.  
Together: ₹48,000 ✓ **C**

> Notice how often the answer is **C**. That is genuinely common, because each statement is
> usually built to be deliberately incomplete. But do not let the pattern make you lazy —
> Q3, Q6 and Q10 all break it, and those are exactly the ones designed to catch someone
> guessing C by habit.

---

## The traps that decide this topic

- **The two-value trap.** x² = 36, √x, |x − 3| = 5, and quadratics all typically give two
  answers. "Solvable" ≠ "uniquely solvable".
- **Leakage.** After reading statement I, your brain keeps it while reading II. Physically
  cover it.
- **Actually solving.** You lose 40 seconds computing a number nobody asked for.
- **Yes/no questions.** For "Is x > 5?", a statement is sufficient if it always gives the
  *same* answer — and a consistent **"no"** is just as sufficient as a consistent "yes".
- **Assuming integers.** Unless stated, x can be a fraction or negative.
- **Geometry assumptions.** A quadrilateral is not a square, a triangle is not right-angled,
  and a diagram is not to scale unless stated.

### Worked example — the yes/no case

*Is x greater than 10?*  
*I. x > 15*  
*II. x > 5*

- **I alone:** every x > 15 is > 10 → the answer is always "yes" → **sufficient**.
- **II alone:** x = 6 gives "no", x = 20 gives "yes" → inconsistent → **not sufficient**.
- **Answer: A.**

---

## Why this topic is worth real time

Data sufficiency questions take **20–30 seconds each** when done properly, against 60–90 seconds for an equivalent quant question. In a sectionally timed paper, clearing the DS questions first buys you time for everything else. Learn to spot them and do them first.

---

## Checkpoints

- [ ] I never solve a data sufficiency question — I only decide whether it is solvable
- [ ] I physically cover statement II while judging statement I, and vice versa
- [ ] I write I: Y/N and II: Y/N before selecting an option
- [ ] I check for two-value traps: squares, roots, absolute values, quadratics
- [ ] I know a consistent "no" answers a yes/no question just as well as a consistent "yes"
- [ ] I do not assume integers, positivity, or regular shapes unless stated
- [ ] I combine the statements only after both have failed individually
- [ ] I attempt data sufficiency questions early in a section because they are the fastest marks
