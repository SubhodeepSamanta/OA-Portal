# Simple & compound interest

Small, predictable topic. Two formulas and three shortcuts cover essentially every question asked at campus level.

## What gets asked

1. Plain SI or CI calculation
2. The **difference** between CI and SI (very common — there is a one-line formula)
3. Compounding more often than yearly
4. Amount doubling / tripling
5. Instalments

---

## The formulas

**Simple interest** — interest only ever on the original principal:

> **SI = P × R × T / 100**   and   **Amount = P + SI**

**Compound interest** — interest on interest:

> **Amount = P (1 + R/100)ᵀ**   and   **CI = Amount − P**

### Worked example — SI

*₹6,000 at 8% for 3 years.*

- SI = 6000 × 8 × 3 / 100 = **₹1,440**, amount **₹7,440**

### Worked example — CI

*₹10,000 at 10% for 2 years.*

- Amount = 10000 × 1.1 × 1.1 = **₹12,100** → CI = **₹2,100**
- SI for comparison would be 2,000. The extra ₹100 is interest on the first year's interest.

---

## The difference formula — memorise this

For the **same P, R, T**:

> **2 years:  CI − SI = P (R/100)²**
> **3 years:  CI − SI = P (R/100)² × (3 + R/100)**

### Worked example

*The difference between CI and SI on a sum for 2 years at 5% is ₹25. Find the sum.*

- 25 = P × (5/100)² = P/400 → **P = ₹10,000**

That is a 10-second question if you know the formula and a two-minute one if you do not.

### Worked example — 3 years

*Difference between CI and SI for 3 years at 10% on ₹8,000?*

- 8000 × (0.1)² × (3 + 0.1) = 8000 × 0.01 × 3.1 = **₹248**

---

## Compounding more often than yearly

Divide the rate, multiply the time:

| Compounded | Rate per period | Periods |
|---|---|---|
| Annually | R | T |
| Half-yearly | R/2 | 2T |
| Quarterly | R/4 | 4T |
| Monthly | R/12 | 12T |

### Worked example

*₹8,000 at 10% per annum compounded half-yearly for 1 year.*

- Rate 5% per half-year, 2 periods
- 8000 × 1.05 × 1.05 = **₹8,820** → CI = **₹820** (against ₹800 if compounded annually)

---

## Yearly CI as successive percentages

CI for 2 years at R% is just two successive R% increases, so:

> **total 2-year CI % = 2R + R²/100**

At 10%: 20 + 1 = **21%**. So CI on ₹10,000 = ₹2,100 without touching the formula. This is the fastest route in an exam.

---

## Doubling and tripling

**Simple interest:** the interest equals the principal, so

> **T = 100 / R** years to double.

**Compound interest:** if a sum doubles in n years, it becomes

- 4× in 2n years, 8× in 3n years (powers of 2)

### Worked example

*A sum doubles in 6 years at CI. When is it 8 times?*

- 8 = 2³ → **3 × 6 = 18 years**

**Rule of 72** (approximate, for quick elimination): years to double ≈ 72 / R.

---

## Instalments

Each instalment is discounted back to the present.

For **simple interest**, a debt P repaid in n equal annual instalments x:

> P = Σ [ x / (1 + RT/100) ] for each instalment's own T

For **compound interest**:

> P = x/(1+r) + x/(1+r)² + … + x/(1+r)ⁿ, where r = R/100

### Worked example

*What sum borrowed at 10% CI can be cleared by two annual instalments of ₹6,050 each?*

- P = 6050/1.1 + 6050/1.21 = 5500 + 5000 = **₹10,500**

---

## Practice set

#### Q1. Find the SI on ₹7,500 at 9% per annum for 4 years.

7500 × 9 × 4 / 100 = **₹2,700**

#### Q2. At what rate will ₹4,000 amount to ₹5,000 in 5 years at simple interest?

SI = 1,000 → 1000 = 4000 × R × 5/100 → R = **5%**

#### Q3. Find the compound interest on ₹12,000 at 10% per annum for 2 years.

Use the successive-percentage shortcut: 2R + R²/100 = 20 + 1 = 21%.  
CI = 21% of 12,000 = **₹2,520**

#### Q4. The difference between CI and SI on a sum for 2 years at 8% is ₹64. Find the sum.

P(R/100)² = 64 → P × 0.0064 = 64 → **P = ₹10,000**

#### Q5. The difference between CI and SI on ₹5,000 for 3 years at 10%?

P(R/100)²(3 + R/100) = 5000 × 0.01 × 3.1 = **₹155**

#### Q6. Find the amount on ₹16,000 at 20% per annum for 1 year, compounded half-yearly.

Rate 10% per half-year, 2 periods → 16000 × 1.1 × 1.1 = **₹19,360**

#### Q7. A sum doubles in 8 years at simple interest. In how many years will it triple?

SI doubling means the interest equalled the principal in 8 years.  
Tripling needs interest = 2 × principal → **16 years**

#### Q8. A sum doubles in 5 years at compound interest. In how many years will it become 16 times?

16 = 2⁴ → 4 × 5 = **20 years**

#### Q9. At what rate of compound interest will ₹1,000 become ₹1,331 in 3 years?

1331/1000 = 1.331 = (1.1)³ → **R = 10%**

#### Q10. The simple interest on a sum for 3 years at 8% is ₹1,200. Find the compound interest on the same sum, rate and time.

SI = 1200 → P × 8 × 3/100 = 1200 → P = ₹5,000.  
CI − SI for 3 years = 5000 × (0.08)² × (3.08) = 5000 × 0.0064 × 3.08 = 98.56  
CI = 1200 + 98.56 = **₹1,298.56**

#### Q11. A sum of ₹2,500 is lent partly at 6% and partly at 8% simple interest. The total annual interest is ₹170. Find the amount lent at 8%.

Let the 8% part be x → 0.08x + 0.06(2500 − x) = 170  
0.08x + 150 − 0.06x = 170 → 0.02x = 20 → **x = ₹1,000**  
*Faster, by alligation: overall rate = 170/2500 = 6.8%. Ratio of 6% to 8% parts = (8 − 6.8) : (6.8 − 6) = 1.2 : 0.8 = 3 : 2, so the 8% part is 2/5 of 2500 = ₹1,000 ✓*

#### Q12. What sum borrowed at 5% compound interest is cleared by two equal annual instalments of ₹1,102.50?

P = 1102.50/1.05 + 1102.50/1.1025 = 1050 + 1000 = **₹2,050**

---

## Traps

- CI **and** SI are the same for the first year at yearly compounding. Only from year 2 do
  they diverge.
- "Rate of 10% per annum compounded half-yearly" means **5% per half-year**, not 10%.
- The CI − SI formula requires the same P, R and T for both. Check before using it.
- For CI questions, work with the **amount** and subtract P at the end — going straight for
  the interest causes sign errors.
- Doubling under SI is linear (2× in 100/R years, 3× in 200/R years). Doubling under CI is
  exponential. Do not use one rule for the other.

---

## Checkpoints

- [ ] I know SI = PRT/100 and Amount = P(1 + R/100)^T cold
- [ ] I know CI − SI = P(R/100)² for 2 years and can use it in reverse to find P
- [ ] I know the 3-year difference formula
- [ ] I halve/quarter the rate and double/quadruple the time for non-annual compounding
- [ ] I can compute 2-year CI as the successive percentage 2R + R²/100
- [ ] I know SI doubles a sum in 100/R years
- [ ] I know a CI sum doubling in n years is 8× in 3n years
- [ ] I can set up a two-instalment CI question by discounting each payment
