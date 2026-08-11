# Profit, loss, discount

This is percentages applied to shopkeepers. If you know the percentage sheet, this is mostly vocabulary plus three formulas.

## What gets asked

1. Find profit % / SP / CP given the other two
2. Successive discounts
3. Marked price ↔ discount ↔ profit chains
4. The "sold two articles, one at a gain and one at a loss" trap
5. False weights / dishonest shopkeeper

---

## Vocabulary

| Term | Meaning |
|---|---|
| **CP** | cost price — what the seller paid |
| **SP** | selling price — what the buyer paid |
| **MP** | marked price / list price — the sticker, before discount |
| **Profit** | SP − CP |
| **Discount** | MP − SP |

**The rule that decides everything:** profit and loss percentages are always on **CP**.  
Discount percentages are always on **MP**. Mixing these up is the single biggest source of wrong answers here.

---

## The three formulas

> **SP = CP × (100 + profit%) / 100**
> **CP = SP × 100 / (100 + profit%)**
> **SP = MP × (100 − discount%) / 100**

For a loss, use (100 − loss%).

### Worked example — basic

*An article bought for ₹400 is sold for ₹460. Profit %?*

- Profit = 60, on a CP of 400 → 60/400 = 15/100 = **15%**

### Worked example — working backwards

*By selling an article for ₹575 a man gains 15%. Find the cost price.*

- CP = 575 × 100/115 = **₹500**
- (Not 575 − 15% of 575. The percentage is on CP, which you do not know yet — so divide.)

---

## Successive discounts

Same formula as successive percentage change:

> **net discount = a + b − ab/100**

(both negative changes, so the cross term is added back)

### Worked example — 20% then 10%

- net = 20 + 10 − (20 × 10)/100 = 30 − 2 = **28%**, not 30%.

A shop advertising "20% + 10% off" is giving 28%, and the question usually asks you to spot exactly that.

**Fraction shortcut:** 20% off = ×4/5, 10% off = ×9/10. Together ×36/50 = ×18/25 = 0.72, so 28% off. The fraction table pays again.

---

## The MP → discount → profit chain

Most real questions stack all three. Work left to right and **assume CP = 100** whenever no number is given.

### Worked example

*A shopkeeper marks his goods 40% above cost and allows a discount of 25%. Find his profit percentage.*

- Let CP = 100 → MP = 140
- SP = 140 × 0.75 = 105
- Profit = 5 on 100 → **5%**

Assuming CP = 100 turns nearly every abstract profit-loss question into arithmetic.

### Worked example — the other direction

*A trader wants a 20% profit after giving a 20% discount. By what % above CP must he mark the goods?*

- CP = 100 → required SP = 120
- SP is 80% of MP → MP = 120 / 0.8 = 150
- **Mark it 50% above cost.**

---

## The two-articles trap

> *Two articles are sold at ₹X each, one at a gain of y% and the other at a loss of y%.*

The result is **always a net loss**, and the loss percentage is:

> **loss % = y² / 100**

### Worked example

*Two radios sold at ₹1,980 each, one at 10% profit and one at 10% loss. Overall?*

- Loss = 10²/100 = **1% loss** (regardless of the selling price)
- To confirm: CP₁ = 1980/1.1 = 1800, CP₂ = 1980/0.9 = 2200. Total CP = 4000, total SP =
  3960 → loss 40 on 4000 = 1%. ✓

**Why it is always a loss:** the item sold at a loss had the higher cost price, so the loss is taken on a bigger base than the profit.

---

## False weights

> *A dishonest dealer claims to sell at cost price but uses a weight of only w grams for a
> kilogram.*

> **gain % = (error / (true value − error)) × 100**

### Worked example — uses a 900 g weight for 1 kg

- gain = 100 / (1000 − 100) × 100 = 100/900 × 100 = **11.11%**

Note it is 11.11%, not 10% — the gain is measured against the 900 g he actually gave.

---

## Practice set

#### Q1. An article bought for ₹720 is sold for ₹864. Find the profit percentage.

Profit = 144 on CP 720 → 144/720 = 1/5 = **20%**

#### Q2. By selling an article for ₹1,120 a man loses 20%. Find the cost price.

CP = 1120 × 100/80 = **₹1,400**

#### Q3. A shopkeeper marks his goods 25% above cost and gives a 12% discount. Find his profit percentage.

CP = 100 → MP = 125 → SP = 125 × 0.88 = 110 → **10% profit**

#### Q4. Successive discounts of 25% and 20% are equivalent to a single discount of?

25 + 20 − (25 × 20)/100 = 45 − 5 = **40%**  
*Check with fractions: ×3/4 × ×4/5 = ×3/5 = 0.6, so 40% off ✓*

#### Q5. A man sells two articles at ₹1,470 each. On one he gains 5% and on the other he loses 5%. Find his overall gain or loss percentage.

Always a loss of y²/100 = 25/100 = **0.25% loss**

#### Q6. A dishonest dealer sells goods at cost price but uses a 800 g weight for 1 kg. Find his gain percentage.

Error/(true − error) × 100 = 200/800 × 100 = **25%**

#### Q7. If the cost price of 15 articles equals the selling price of 12 articles, find the profit percentage.

Let each article cost ₹1 → CP of 12 sold = 12, SP of 12 = 15.  
Profit = 3 on 12 = **25%**

#### Q8. A trader marks his goods 40% above cost. What discount can he give and still make a 19% profit?

CP = 100 → MP = 140, required SP = 119.  
Discount = (140 − 119)/140 = 21/140 = **15%**

#### Q9. A man sold an article at a loss of 10%. Had he sold it for ₹90 more, he would have gained 8%. Find the cost price.

The ₹90 spans the gap from −10% to +8%, i.e. 18% of CP.  
18% of CP = 90 → **CP = ₹500**

#### Q10. A shopkeeper sells an article at a 20% profit. If he had bought it 10% cheaper and sold it for ₹15 less, he would have gained 25%. Find the original cost price.

Let CP = x, so the original SP = 1.2x.  
New CP = 0.9x, and a 25% gain on it gives new SP = 1.25 × 0.9x = 1.125x.  
The new SP is also 15 less than the old: 1.125x = 1.2x − 15  
0.075x = 15 → **x = ₹200**  
*Check: CP 200, SP 240. Cheaper CP 180, new SP 225 — a 25% gain, and 240 − 225 = 15 ✓*

#### Q11. Profit of 20% on the selling price is what percentage on the cost price?

SP = 100 → profit = 20 → CP = 80 → 20/80 = **25% on cost**

#### Q12. An article passes through three hands, each selling at a 20% profit. If the final price is ₹1,728, find the original cost.

1728 / (1.2)³ = 1728 / 1.728 = **₹1,000**

---

## Traps

- Profit % on CP, discount % on MP. Never on each other.
- To find CP from SP, **divide** by (1 + profit%), never subtract.
- Successive discounts do not add.
- "Profit of 25% on selling price" is different from "25% on cost price". If a question says
  *on SP*, convert: 25% on SP = 33.33% on CP.
- In the two-articles question the answer does not depend on the price at all — do not waste
  time computing cost prices.
- If an article is sold at a loss of x%, SP = CP × (100 − x)/100. People flip the sign.

---

## Checkpoints

- [ ] I know profit% is on CP and discount% is on MP, and never mix them
- [ ] I find CP from SP by dividing by (100 + profit%)/100
- [ ] I can chain successive discounts with a + b − ab/100 or with fractions
- [ ] I set CP = 100 whenever the question gives no absolute numbers
- [ ] I can solve "marked x% above cost, y% discount, find profit%" in three lines
- [ ] I can solve the reverse: required markup for a target profit after a discount
- [ ] I know the two-articles-at-±y% result is always a y²/100 loss
- [ ] I know the false-weight gain formula and why it gives 11.11% for a 900 g weight
