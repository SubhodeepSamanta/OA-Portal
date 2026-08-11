# Probability

Sits directly on top of P&C. If you can count, you can do probability — most mistakes here are counting mistakes, not probability mistakes.

## What gets asked

1. Dice (one or two)
2. Cards
3. Balls from a bag
4. "At least one" problems
5. Independent vs mutually exclusive events

---

## The definition

> **P(E) = favourable outcomes / total outcomes**

Always between 0 and 1. If your answer exceeds 1, you added when you should have multiplied.

> **P(not E) = 1 − P(E)** — the most useful line in the topic.

---

## The sample spaces you must know cold

**One die:** 6 outcomes.  
**Two dice:** 36 outcomes.

| Sum on two dice | Ways |
|---|---|
| 2 or 12 | 1 |
| 3 or 11 | 2 |
| 4 or 10 | 3 |
| 5 or 9 | 4 |
| 6 or 8 | 5 |
| 7 | 6 |

**A deck of 52 cards:**

- 26 red (hearts ♥, diamonds ♦), 26 black (spades ♠, clubs ♣)
- 13 of each suit
- **Face cards = 12** (J, Q, K in each of 4 suits)
- Aces = 4. "Honours" (A, K, Q, J, 10) = 20.

**A coin:** n tosses → 2ⁿ outcomes.

---

## Addition and multiplication

> **P(A or B) = P(A) + P(B) − P(A and B)**
> If A and B are **mutually exclusive** (cannot both happen), P(A and B) = 0, so it is just
> the sum.

> **P(A and B) = P(A) × P(B)** — only if A and B are **independent**.

**Mutually exclusive ≠ independent.** Mutually exclusive events are the *opposite* of independent: if one happens, the other definitely does not.

### Worked example — a card

*One card is drawn. P(it is a king **or** a heart)?*

- P(king) = 4/52, P(heart) = 13/52, P(king of hearts) = 1/52
- 4/52 + 13/52 − 1/52 = 16/52 = **4/13**

Subtracting the overlap is the whole question.

---

## Worked example — dice

*Two dice are rolled. P(sum is 8)?*

- Favourable: (2,6)(3,5)(4,4)(5,3)(6,2) = 5
- **5/36**

*P(sum is more than 9)?*

- Sums 10, 11, 12 → 3 + 2 + 1 = 6 → 6/36 = **1/6**

---

## Worked example — balls

*A bag has 5 red and 3 blue balls. Two are drawn at random. P(both red)?*

**Combination method:**
- ⁵C₂ / ⁸C₂ = 10 / 28 = **5/14**

**Sequential method (no replacement):**
- 5/8 × 4/7 = 20/56 = **5/14** ✓

Use whichever you find faster — they always agree.

*P(one red and one blue)?*
- (⁵C₁ × ³C₁) / ⁸C₂ = 15/28

*P(at least one red)?*
- 1 − P(no red) = 1 − ³C₂/⁸C₂ = 1 − 3/28 = **25/28**

---

## "At least one" — always use the complement

### Worked example

*Three coins are tossed. P(at least one head)?*

- P(no head) = P(all tails) = 1/8
- **1 − 1/8 = 7/8**

Counting the 7 favourable cases directly works but is slower and error-prone. With four or five coins the complement is the only sane route.

---

## With vs without replacement

| | Second draw |
|---|---|
| **With** replacement | same probabilities; events independent |
| **Without** replacement | denominator drops by 1; numerator drops if you drew that colour |

### Worked example

*A bag has 4 white and 6 black balls. Two drawn **with** replacement. P(both white)?*

- 4/10 × 4/10 = **4/25**

*Without replacement?*

- 4/10 × 3/9 = 12/90 = **2/15**

---

## Odds

- **Odds in favour** = favourable : unfavourable
- **Odds against** = unfavourable : favourable

If odds in favour are 3 : 5, then P = 3/(3+5) = **3/8**. Notice the denominator is the  
**sum**, not the second term — this catches people out.

---

## Practice set

#### Q1. Two dice are thrown. Find P(sum is 9).

Favourable: (3,6)(4,5)(5,4)(6,3) = 4 → **4/36 = 1/9**

#### Q2. Two dice are thrown. P(sum is a prime number)?

Prime sums: 2 (1 way), 3 (2), 5 (4), 7 (6), 11 (2) = 15 ways  
**15/36 = 5/12**

#### Q3. A card is drawn from a pack. P(it is a face card)?

12 face cards → 12/52 = **3/13**

#### Q4. A card is drawn. P(it is a red king)?

2 red kings → 2/52 = **1/26**

#### Q5. Two cards are drawn without replacement. P(both are aces)?

4/52 × 3/51 = 12/2652 = **1/221**  
*Or ⁴C₂/⁵²C₂ = 6/1326 = 1/221 ✓*

#### Q6. A bag has 6 red, 4 blue and 5 green balls. Two are drawn at random. P(both same colour)?

Total ways = ¹⁵C₂ = 105.  
Same colour = ⁶C₂ + ⁴C₂ + ⁵C₂ = 15 + 6 + 10 = 31  
**31/105**

#### Q7. Three coins are tossed. P(exactly two heads)?

Favourable: HHT, HTH, THH = 3 out of 8 → **3/8**

#### Q8. Four coins are tossed. P(at least one tail)?

1 − P(all heads) = 1 − 1/16 = **15/16**

#### Q9. The probability that A solves a problem is 1/3 and B solves it is 1/4. If both try, find P(the problem is solved).

P(solved) = 1 − P(neither solves it) = 1 − (2/3 × 3/4) = 1 − 1/2 = **1/2**

#### Q10. A bag contains 5 white and 7 black balls. Two are drawn one after another without replacement. P(first white and second black)?

5/12 × 7/11 = **35/132**

#### Q11. From a group of 4 men and 3 women, 3 people are chosen at random. P(at least one woman)?

1 − P(no woman) = 1 − ⁴C₃/⁷C₃ = 1 − 4/35 = **31/35**

#### Q12. A number is chosen at random from 1 to 30. P(it is a multiple of 3 or 5)?

Multiples of 3: 10. Of 5: 6. Of 15 (both): 2.  
10 + 6 − 2 = 14 → **14/30 = 7/15**

#### Q13. Two dice are thrown. P(the numbers are different)?

P(same) = 6/36 = 1/6 → P(different) = **5/6**

#### Q14. If the odds against an event are 5 : 3, find the probability of the event happening.

Odds against 5 : 3 → favourable 3, unfavourable 5, total 8.  
**3/8**

#### Q15. A speaks the truth 75% of the time and B 80%. In what percentage of cases are they likely to contradict each other on the same fact?

They contradict when one lies and the other does not:  
(0.75 × 0.2) + (0.25 × 0.8) = 0.15 + 0.20 = 0.35 → **35%**

---

## Traps

- Face cards are **12**, not 16. The ace is not a face card.
- "At least one" — use 1 − P(none). Almost always.
- Independent and mutually exclusive are different things; do not multiply mutually
  exclusive probabilities.
- Without replacement changes **both** numerator and denominator.
- Odds 3 : 5 means probability 3/8, not 3/5.
- Two dice give 36 outcomes, not 21 — (2,6) and (6,2) are different outcomes even though
  the dice look alike.
- If a question says "a card is drawn and replaced", the two draws are independent.

---

## Checkpoints

- [ ] I know the two-dice sum table by heart
- [ ] I know a deck has 12 face cards, 4 aces, 13 per suit, 26 red
- [ ] I subtract the overlap in P(A or B)
- [ ] I know mutually exclusive and independent are different, and when each applies
- [ ] I can do a two-ball draw by both the nCr method and the sequential method and get the same answer
- [ ] I always convert "at least one" into 1 − P(none)
- [ ] I adjust both numerator and denominator for draws without replacement
- [ ] I can convert odds in favour into a probability using the sum as the denominator
