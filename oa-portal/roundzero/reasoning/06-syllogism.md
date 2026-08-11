# Syllogism

Asked by TCS, Infosys and Accenture in every cycle. Venn diagrams make it mechanical — and there is one rule that decides most questions on its own.

## The format

You are given statements ("All A are B", "Some B are C") that you must **assume true even if absurd**, then asked which conclusions follow.

> **The golden rule: a conclusion follows only if it is true in EVERY possible diagram.**
> One counter-diagram kills it. This is the whole topic.

---

## The four statement types

| Type | Form | Venn picture |
|---|---|---|
| **A** (universal affirmative) | All A are B | circle A entirely inside B |
| **E** (universal negative) | No A is B | two separate circles |
| **I** (particular affirmative) | Some A are B | two overlapping circles |
| **O** (particular negative) | Some A are not B | A overlaps B, with part of A outside |

---

## Immediate conversions — memorise this table

From a single statement, these always follow:

| Given | Always follows |
|---|---|
| All A are B | **Some B are A**, and **Some A are B** |
| No A is B | **No B is A**, and **Some A are not B** |
| Some A are B | **Some B are A** |
| Some A are not B | *nothing* converts |

**The two that catch people:**

- "All A are B" does **not** give "All B are A".
- "Some A are not B" does **not** give "Some B are not A".

---

## The chain rules

| Statement 1 | Statement 2 | Conclusion |
|---|---|---|
| All A are B | All B are C | **All A are C** ✓ |
| All A are B | No B is C | **No A is C** ✓ |
| Some A are B | All B are C | **Some A are C** ✓ |
| Some A are B | No B is C | **Some A are not C** ✓ |
| All A are B | Some B are C | **nothing follows** ✗ |
| Some A are B | Some B are C | **nothing follows** ✗ |
| No A is B | No B is C | **nothing follows** ✗ |

> **Two particular statements ("some" + "some") never give a conclusion.**
> **Two negative statements ("no" + "no") never give a conclusion.**
> Memorising those two lines answers a large share of syllogism questions without drawing.

---

## Worked example 1

*Statements: All pens are books. All books are papers.*  
*Conclusions: (I) All pens are papers. (II) Some papers are pens.*

- Pens ⊂ Books ⊂ Papers → **(I) follows** ✓
- Since all pens are papers, and pens exist, some papers are pens → **(II) follows** ✓
- **Both follow.**

---

## Worked example 2

*Statements: Some cats are dogs. All dogs are animals.*  
*Conclusions: (I) Some cats are animals. (II) All cats are animals.*

- Draw: the cat circle overlaps the dog circle; the dog circle sits inside animals.
- The overlapping part of cats is inside dogs, hence inside animals → **(I) follows** ✓
- But the rest of the cat circle can sit entirely outside animals → **(II) does not follow** ✗

**Only (I) follows.** This is the single most common syllogism pattern.

---

## Worked example 3 — where "some" + "some" fails

*Statements: Some books are pens. Some pens are erasers.*  
*Conclusions: (I) Some books are erasers. (II) No book is an eraser.*

- Draw a diagram where books and erasers overlap → (II) fails.
- Draw a diagram where they are completely separate (books overlap pens on the left, erasers
  overlap pens on the right) → (I) fails.
- Neither is true in every diagram → **neither follows**.

But note: **"Either I or II follows"** *is* correct here, because in every possible diagram one of them must hold — books and erasers either overlap or they do not.

---

## The "either–or" rule

When neither conclusion follows individually, check whether they form a **complementary pair**. If they do, the answer is "either I or II follows".

A pair is complementary when it has one of these shapes:

| Pair | Complementary? |
|---|---|
| Some A are B / Some A are not B | ✓ |
| All A are B / Some A are not B | ✓ |
| No A is B / Some A are B | ✓ |

Both must involve the **same two terms in the same order**, and **neither must follow on its own**. Options offering "either–or" are usually there for exactly this case.

---

## The possibility questions

Newer papers ask "Which of the following is a **possibility**?" That inverts the golden rule:

> A **conclusion** must be true in every diagram.
> A **possibility** need only be true in **at least one** diagram.

So for a possibility question, you are hunting for a single diagram that works — a much easier task.

---

## The method under time pressure

1. Check the two "never" rules first (some+some, no+no). If they apply, the answer is usually
   "neither follows" — then check for a complementary pair.
2. Otherwise draw the **most restrictive** diagram (maximum overlap) and test both
   conclusions.
3. Then draw the **least restrictive** diagram (minimum overlap) and test again.
4. A conclusion surviving both is almost certainly valid.

---

## Practice set

For each, decide which conclusions follow.

#### Q1. All roses are flowers. All flowers are plants.

(I) All roses are plants. (II) Some plants are roses.  
Chain rule All+All → All ✓. And "All roses are plants" converts to "Some plants are roses" ✓  
**Both follow.**

#### Q2. All cats are animals. Some animals are dogs.

(I) Some cats are dogs. (II) Some dogs are cats.  
All + Some → **nothing follows**. The dogs could sit entirely outside the cat circle.  
**Neither follows.**

#### Q3. Some pens are books. All books are papers.

(I) Some pens are papers. (II) All pens are papers.  
Some + All → Some ✓ for (I). (II) fails — the non-book pens need not be papers.  
**Only (I) follows.**

#### Q4. No man is a machine. All machines are tools.

(I) No man is a tool. (II) Some tools are not men.  
(I) fails — a man could be a tool of some other kind, outside the machine circle.  
(II) follows — machines are tools and no machine is a man, so some tools (the machines) are not men. ✓  
**Only (II) follows.**

#### Q5. Some books are pens. Some pens are pencils.

(I) Some books are pencils. (II) No book is a pencil.  
Some + Some → nothing follows individually. But the pair is complementary (Some / No on the same two terms in the same order).  
**Either (I) or (II) follows.**

#### Q6. All teachers are graduates. Some graduates are doctors.

(I) Some teachers are doctors. (II) Some doctors are teachers.  
All + Some → nothing.  
**Neither follows.**

#### Q7. All squares are rectangles. No rectangle is a circle.

(I) No square is a circle. (II) Some rectangles are squares.  
All + No → No ✓ for (I). And All A are B gives Some B are A ✓ for (II).  
**Both follow.**

#### Q8. Some students are lazy. All lazy people are failures.

(I) Some students are failures. (II) All students are failures.  
Some + All → Some ✓. (II) overreaches.  
**Only (I) follows.**

#### Q9. No bird is a mammal. Some mammals are pets.

(I) Some pets are not birds. (II) All pets are birds.  
(I) follows — the pets that are mammals cannot be birds ✓  
(II) plainly fails.  
**Only (I) follows.**

#### Q10. All A are B. Some B are C. All C are D.

(I) Some A are D. (II) Some B are D.  
(I) fails — the A's need not overlap the C's at all.  
(II) follows — the B's that are C are also D ✓  
**Only (II) follows.**

**Q11 (possibility). All pens are books. No book is a table.**  
Which is a possibility? (a) Some pens are tables (b) All pens are tables (c) Some tables are pens (d) No pen is a table  
Pens are inside books, and books are disjoint from tables, so **no pen can be a table** — (a), (b) and (c) are impossible. (d) is not merely possible but **certain**, and a certainty is also a possibility.

**Answer: (d)**

#### Q12. All keys are locks. All locks are doors. Some doors are windows.

(I) Some keys are windows. (II) Some doors are keys. (III) Some locks are windows.  
(I) fails, (III) fails — the "some doors" that are windows need not include any lock or key.  
(II) follows: keys ⊂ locks ⊂ doors, so some doors are keys ✓  
**Only (II) follows.**

---

## Traps

- Statements must be taken as **true regardless of real-world facts**. "All men are trees" is
  a valid premise.
- "All A are B" never converts to "All B are A".
- Do not import outside knowledge. If the statements do not mention it, it does not follow.
- "Some A are B" means *at least one*, which allows "all" as a special case — so "Some A are
  B" does not rule out "All A are B".
- Check the either–or option before answering "neither follows".

---

## Checkpoints

- [ ] I treat every statement as true regardless of whether it is realistic
- [ ] I know a conclusion must hold in every possible diagram, not just one
- [ ] I know the four statement types and their Venn pictures
- [ ] I know the conversion table, including that "All A are B" gives "Some B are A"
- [ ] I know some+some and no+no never yield a conclusion
- [ ] I know the four valid chain rules
- [ ] I can spot a complementary pair and answer "either I or II follows"
- [ ] I know a possibility question only needs one valid diagram
- [ ] I test both a maximum-overlap and a minimum-overlap diagram before committing
