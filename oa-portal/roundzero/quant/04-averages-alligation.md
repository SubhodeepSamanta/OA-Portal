# Averages, mixtures, alligation

Alligation is the best trick-to-effort ratio in quant. It turns a two-variable equation into a subtraction you can do in your head.

## What gets asked

1. Average changes when one item is added / removed / replaced
2. Weighted average of two groups
3. Mixing two things to hit a target price or concentration
4. Repeated replacement (milk and water)
5. Average speed (which is *not* the average of the speeds)

---

## Averages — the only two facts

- **Average = Sum / Count**, so **Sum = Average × Count**. Always convert to sums.
- If every value changes by the same amount, the average changes by exactly that amount.

### Worked example — replacement

*The average of 10 numbers is 25. A number 30 is replaced by 20. New average?*

- Sum was 25 × 10 = 250.
- Sum drops by 10 → 240 → new average **24**.

### Worked example — the classic wrong-entry question

*The average weight of 20 students was recorded as 45 kg. One student's weight was written as 65 kg instead of 56 kg. Find the correct average.*

- Sum is 9 too high → correct sum = 900 − 9 = 891
- 891 / 20 = **44.55 kg**

### Worked example — a person joins

*The average age of 8 people is 30. A ninth joins and the average becomes 31. How old is the newcomer?*

- Old sum = 240. New sum = 31 × 9 = 279. Newcomer = **39**.

**Shortcut:** the newcomer equals the new average plus the total lift they caused —  
31 + (1 × 8) = 39. When a joiner raises the average by d over n existing members, they are worth *new average + n × d*.

---

## Weighted average

Groups of size n₁ and n₂ with averages a₁ and a₂:

> **combined average = (n₁a₁ + n₂a₂) / (n₁ + n₂)**

The combined average always lies **between** the two, closer to the bigger group.

---

## Alligation — the cross method

This is the weighted-average formula rearranged to give you the **ratio** directly:

> **(cheaper quantity) : (dearer quantity) = (dearer − mean) : (mean − cheaper)**

Draw it as a cross: the two extremes on the left, the mean in the middle, and you subtract diagonally.

```
   30              40
        \        /
          34
        /        \
  (40-34)=6   (34-30)=4
```

### Worked example — mixing rice

*Rice at ₹30/kg is mixed with rice at ₹40/kg to sell at ₹34/kg. In what ratio?*

- (40 − 34) : (34 − 30) = 6 : 4 = **3 : 2**

Two seconds of subtraction instead of a simultaneous equation.

### Worked example — alligation on percentages

*How much water must be added to 60 litres of a 20% acid solution to make it 15% acid?*

Treat water as 0% acid. Water is the "cheaper" extreme, the solution is the "dearer" one, and the mean is 15%:

- water : solution = (20 − 15) : (15 − 0) = 5 : 15 = **1 : 3**
- The solution is 60 L, so 3 parts = 60 → 1 part = 20 → **add 20 litres of water**.

Check: 12 L acid in 80 L total = 15%. ✓

> Sanity rule: the mean sits nearer the extreme with the **larger** share. Here 15 is much
> nearer 20 than 0, so the 20% solution must dominate — and it does, 3 : 1.

---

## Repeated replacement

A vessel holds V litres of pure liquid. You remove x litres and top up with water, n times:

> **liquid remaining = V × (1 − x/V)ⁿ**

### Worked example

*40 L of milk. 4 L is removed and replaced with water, three times. Milk left?*

- 40 × (1 − 4/40)³ = 40 × (0.9)³ = 40 × 0.729 = **29.16 L**
- Water = 40 − 29.16 = 10.84 L

---

## Average speed

For **equal distances** at speeds a and b:

> **average speed = 2ab / (a + b)** (the harmonic mean — *not* (a+b)/2)

For **equal times**, it *is* the plain average (a + b)/2.

### Worked example

*A man goes 60 km/h and returns at 40 km/h. Average speed?*

- 2 × 60 × 40 / 100 = 4800/100 = **48 km/h** (not 50)

---

## First n numbers

| Sequence | Average |
|---|---|
| First n natural numbers | (n + 1) / 2 |
| First n odd numbers | n |
| First n even numbers | n + 1 |
| Any arithmetic progression | (first + last) / 2 |

---

## Practice set

#### Q1. The average of 5 numbers is 27. If one number is excluded the average becomes 25. Find the excluded number.

Old sum = 135, new sum = 25 × 4 = 100 → excluded = **35**

#### Q2. The average age of 30 students is 14 years. Including the teacher, it becomes 15. Find the teacher's age.

New sum = 15 × 31 = 465, old sum = 420 → **45 years**  
*Shortcut: 15 + (1 × 30) = 45.*

#### Q3. The average of the first 50 natural numbers?

(n + 1)/2 = 51/2 = **25.5**

#### Q4. A batsman's average after 16 innings is 36. He scores 84 in the 17th. Find his new average.

Old sum = 576, new sum = 660 → 660/17 = **38.82**  
*Shortcut: the innings lifted the average by (84 − 36)/17 = 2.82, so 36 + 2.82 = 38.82.*

#### Q5. In what ratio must tea at ₹62/kg be mixed with tea at ₹72/kg to get a mixture worth ₹64.50/kg?

(72 − 64.5) : (64.5 − 62) = 7.5 : 2.5 = **3 : 1**

#### Q6. How many kg of sugar at ₹9/kg must be mixed with 27 kg at ₹7/kg to get a mixture worth ₹8.20/kg?

Ratio of ₹9 : ₹7 sugar = (8.2 − 7) : (9 − 8.2) = 1.2 : 0.8 = 3 : 2.  
The ₹7 sugar is 2 parts = 27 kg → 1 part = 13.5 → 3 parts = **40.5 kg**

#### Q7. A vessel has 60 litres of milk. 6 litres is removed and replaced with water; this is done twice. How much milk remains?

60 × (1 − 6/60)² = 60 × (0.9)² = 60 × 0.81 = **48.6 litres**

#### Q8. A man travels 300 km at 60 km/h and the next 300 km at 40 km/h. Find his average speed.

Equal distances → 2ab/(a+b) = 2 × 60 × 40 / 100 = **48 km/h**

#### Q9. A man covers half his journey at 30 km/h and the other half at 20 km/h. Average speed?

Still equal distances → 2 × 30 × 20 / 50 = **24 km/h**

#### Q10. The average weight of a class of 24 students is 35 kg. If the teacher's weight is included, the average rises by 400 g. Find the teacher's weight.

Rise = 0.4 kg across 25 people.  
Teacher = new average + n × rise = (35 + 0.4) + (24 × 0.4) = 35.4 + 9.6 = **45 kg**

#### Q11. In a mixture of 45 litres, the ratio of milk to water is 4 : 1. How much water must be added to make the ratio 3 : 2?

Milk = 36 L, water = 9 L. Milk stays 36.  
For 3 : 2, water must be 36 × 2/3 = 24 L → add 24 − 9 = **15 litres**

#### Q12. The average of 11 numbers is 10.9. If the average of the first six is 10.5 and of the last six is 11.4, find the sixth number.

Sum of first six + sum of last six counts the sixth twice.  
(10.5 × 6) + (11.4 × 6) − (10.9 × 11) = 63 + 68.4 − 119.9 = **11.5**

> That "counted twice" trick appears in every averages set. Whenever two overlapping groups
> are given, the overlap equals (sum of the groups) − (sum of everything).

---

## Traps

- Average speed for equal distances is **never** the simple average. This is the most-asked
  trap in the topic.
- Alligation gives you a **ratio**, not a quantity. You still have to scale it.
- In alligation, be clear which quantity is which side of the cross; check that the mean
  lands nearer the dominant one.
- Replacement formula uses the same x every time. If the amounts differ, multiply the terms
  individually: V × (1 − x₁/V)(1 − x₂/V)…
- "Average of the group excluding the captain" — count changes as well as sum.

---

## Checkpoints

- [ ] I convert every average question to sums immediately
- [ ] I can solve add / remove / replace / wrong-entry average questions in two lines
- [ ] I know the joiner shortcut: new average + n × (change in average)
- [ ] I can draw the alligation cross and read the ratio off it
- [ ] I can use alligation on concentrations and on prices, including water as 0%
- [ ] I check that the mean lies nearer the extreme with the larger share
- [ ] I know the repeated-replacement formula V(1 − x/V)ⁿ
- [ ] I use 2ab/(a+b) for equal-distance average speed and never (a+b)/2
