# Time & work, pipes & cisterns

One trick — **the LCM method** — makes this whole topic mental arithmetic. Learn it and never write a fraction in this chapter again.

## What gets asked

1. A and B together / A leaves after n days
2. Efficiency comparisons ("A is twice as good as B")
3. Pipes filling and emptying
4. Men–days–hours (see the ratio sheet's chain rule)
5. Wages split by work done

---

## The LCM method

The standard approach makes you add 1/12 + 1/18. Instead:

> **Set total work = LCM of the given times.** Then each person's rate is a whole number.

### Worked example — the core pattern

*A does a job in 12 days, B in 18 days. Together?*

- Total work = LCM(12, 18) = **36 units**
- A's rate = 36/12 = **3 units/day**
- B's rate = 36/18 = **2 units/day**
- Together = 5 units/day → 36 / 5 = **7.2 days**

No fractions anywhere. Compare that to 1/12 + 1/18 = 5/36.

### Worked example — three workers

*A in 10 days, B in 12 days, C in 15 days. Together?*

- Work = LCM(10, 12, 15) = 60
- Rates 6, 5, 4 → total 15/day → 60/15 = **4 days**

---

## Someone leaves partway

### Worked example

*A can do a job in 20 days and B in 30 days. They start together but A leaves after 5 days.  
How long does B take to finish?*

- Work = LCM(20, 30) = 60. A = 3/day, B = 2/day.
- First 5 days together: 5 × 5 = 25 units done.
- Remaining = 35 units, at B's 2/day → **17.5 days**.

Total time = 5 + 17.5 = 22.5 days. Read whether the question wants B's extra time or the total.

---

## Efficiency

"A is twice as efficient as B" means A's **rate** is double, so A takes **half** the time.  
Efficiency and time are inversely proportional.

### Worked example

*A is 60% more efficient than B. B alone takes 40 days. How long do they take together?*

- Efficiency ratio A : B = 160 : 100 = **8 : 5**
- Time ratio is the inverse = 5 : 8. B takes 40 → A takes 25.
- Work = LCM(25, 40) = 200. Rates 8 and 5 → 13/day → 200/13 = **15.38 days**

---

## Pipes & cisterns

Identical maths, with one change: **an emptying pipe has a negative rate.**

### Worked example

*Pipe A fills a tank in 6 hours, pipe B in 8 hours, and outlet C empties it in 12 hours.  
All three open together?*

- Work = LCM(6, 8, 12) = 24
- A = +4, B = +3, C = **−2** → net = 5/hour
- 24 / 5 = **4.8 hours**

### Worked example — leak

*A tank fills in 5 hours, but with a leak it takes 6 hours. How long does the leak alone take to empty a full tank?*

- Work = LCM(5, 6) = 30. Fill rate 6, combined rate 5 → leak = **−1**/hour
- 30 / 1 = **30 hours**

---

## Wages

Wages divide in the ratio of **work done**, which is the ratio of **rates** when they work the same number of days — and that is the inverse of their times.

### Worked example

*A and B can do a job in 20 and 30 days respectively. They do it together for ₹5,000. Split the wages.*

- Rates ratio = 1/20 : 1/30 = 3 : 2
- **A gets ₹3,000, B gets ₹2,000**

---

## The useful identities

| Situation | Result |
|---|---|
| A takes a days, B takes b days | together **ab/(a+b)** days |
| A+B take x days, A alone takes a days | B alone takes **ax/(a−x)** days |
| A is n times as efficient as B | A takes **1/n** of B's time |
| Work done in d days by rate r | **d × r** units |

---

## Practice set

#### Q1. A can do a job in 15 days, B in 10 days. Working together?

Work = LCM(15,10) = 30. Rates 2 and 3 → 5/day → 30/5 = **6 days**

#### Q2. A and B together finish a job in 12 days. A alone takes 20 days. How long does B take?

Work = LCM(12,20) = 60. Combined rate 5, A's rate 3 → B = 2 → 60/2 = **30 days**

#### Q3. A is twice as good a workman as B, and together they finish a job in 14 days. How long does A alone take?

Efficiency A : B = 2 : 1 → combined 3 units/day.  
A alone does 2 of those 3, so A takes 3/2 × 14 = **21 days**

#### Q4. A can do a job in 24 days, B in 30 days, C in 40 days. They start together, but A leaves 4 days before completion and B leaves 7 days before completion. How long did the work last?

Work = LCM(24,30,40) = 120. Rates: A = 5, B = 4, C = 3.  
Let the job last n days. C works all n days, A works (n − 4), B works (n − 7).  
5(n − 4) + 4(n − 7) + 3n = 120  
5n − 20 + 4n − 28 + 3n = 120 → 12n = 168 → **n = 14 days**  
*Check: A 10 days × 5 = 50, B 7 days × 4 = 28, C 14 days × 3 = 42 → 120 ✓*

> The method to carry away: **write each worker's days in terms of n, multiply by their rate,
> and set the sum equal to the total work.** Every "someone leaves early" question is this.

#### Q5. Pipes A and B fill a tank in 12 and 16 minutes. Both are opened together but A is closed after 3 minutes. How long does the rest take?

Work = LCM(12,16) = 48. A = 4/min, B = 3/min.  
First 3 min together: 3 × 7 = 21 units. Remaining 27 units at B's 3/min = **9 minutes**

#### Q6. A tank is filled by pipe A in 6 hours and emptied by pipe B in 8 hours. If both are opened, how long to fill?

Work = 24. A = +4, B = −3 → net +1/hour → **24 hours**

#### Q7. Two pipes fill a cistern in 14 and 16 hours. Both opened, the cistern took 32 minutes extra because of a leak. When would the leak alone empty a full cistern?

Work = LCM(14,16) = 112. Rates 8 and 7 → 15/hour → normal time = 112/15 = 7.467 h = 7 h 28 min.  
With the leak it took 8 hours exactly (7 h 28 min + 32 min).  
Effective rate = 112/8 = 14/hour → leak = 15 − 14 = 1/hour → **112 hours**

#### Q8. 12 men complete a work in 18 days. After 6 days, 4 more men join. How long does the rest take?

Total work = 12 × 18 = 216 man-days. Done in 6 days = 72 → remaining 144.  
Now 16 men → 144/16 = **9 days**

#### Q9. A can do a job in 20 days and B in 30 days. They work on alternate days starting with A. When is it finished?

Work = 60. A = 3/day, B = 2/day. A two-day block = 5 units.  
11 blocks (22 days) = 55 units. Day 23 is A's: +3 → 58. Day 24 is B's: needs 2, B does 2.  
**Finished on day 24**

#### Q10. A and B can do a job in 30 days. They work together for 20 days, then B leaves and A finishes the rest in 20 days. How long would A alone take?

Combined rate = 1/30. In 20 days together they do 20/30 = 2/3.  
A does the remaining 1/3 in 20 days → A's full job = 60 days.  
**A alone: 60 days**

#### Q11. 3 men or 5 women can do a job in 12 days. How long will 6 men and 5 women take?

3M = 5W → 1M = 5/3 W. So 6M = 10W, plus 5W = 15W total.  
5 women take 12 days → total work = 60 woman-days → 60/15 = **4 days**

#### Q12. A contractor employs 20 men to finish a job in 30 days. After 20 days he finds only half is done. How many extra men are needed to finish on time?

Work done = 20 men × 20 days = 400 man-days = half → total = 800 man-days.  
Remaining 400 man-days in 10 days → needs 40 men → **20 extra men**

---

## Traps

- **"A leaves after 5 days"** — 5 days of *joint* work, not 5 days of A alone. Read it twice.
- Alternate days: if A works day 1, B day 2, A day 3… compute a **two-day block** and see
  how many whole blocks fit, then finish the remainder. Do not divide by the average rate.
- An emptying pipe is negative. If your net rate comes out negative, the tank never fills —
  that is a valid answer some questions want.
- Efficiency ratio and time ratio are **inverses**. Writing "A : B = 8 : 5" for time when
  you meant efficiency flips the answer.
- Men–days–hours problems belong to the chain rule (M₁D₁H₁/W₁ = M₂D₂H₂/W₂), not to the LCM
  method.

---

## Worked example — alternate days

*A can do a job in 10 days, B in 15. They work on alternate days starting with A. When is it done?*

- Work = 30. A = 3/day, B = 2/day.
- One 2-day block = 5 units. 6 blocks (12 days) = 30 units — exactly done.
- But check the final day: after 5 blocks (10 days) = 25 units. Day 11 is A's: +3 → 28.
  Day 12 is B's: needs 2, B does 2 → finished on **day 12**.

---

## Checkpoints

- [ ] I set total work to the LCM of the given times instead of adding fractions
- [ ] I can do the two-worker and three-worker "together" question mentally
- [ ] I can handle "A leaves after n days" and know n counts joint days
- [ ] I know efficiency and time are inversely proportional, and can convert a % efficiency edge into a time ratio
- [ ] I treat emptying pipes as negative rates
- [ ] I can find a leak's emptying time from the with-leak and without-leak fill times
- [ ] I split wages in the ratio of work done
- [ ] I solve alternate-day problems by two-day blocks and then check the final partial day
