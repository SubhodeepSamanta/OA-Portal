# Numbers, LCM/HCF, remainders

The single biggest quant topic (~6% of the whole test). Almost none of it needs real calculation — it needs four or five memorised rules.

## What gets asked

1. Unit digit of a huge power
2. Remainder of a huge power
3. Number of factors / trailing zeros in a factorial
4. LCM–HCF word problems (bells, tiles, "greatest number that divides…")
5. Divisibility checks

---

## Divisibility rules

| Divisor | Test |
|---|---|
| 2, 4, 8 | last 1 / 2 / 3 digits divisible by it |
| 3, 9 | digit sum divisible by 3 / 9 |
| 5, 25 | last 1 / 2 digits |
| 6 | passes 2 **and** 3 |
| 11 | (sum of odd-position digits) − (sum of even-position digits) is 0 or a multiple of 11 |
| 7 | drop the last digit, subtract twice it from the rest; repeat |

**Example:** is 918082 divisible by 11? Odd positions 9+8+8 = 25, even positions 1+0+2 = 3.  
25 − 3 = 22, a multiple of 11 → **yes**.

---

## Unit digit — cyclicity

Every digit's powers cycle. Only the cycle length matters.

| Base ends in | Cycle | Length |
|---|---|---|
| 2 | 2, 4, 8, 6 | 4 |
| 3 | 3, 9, 7, 1 | 4 |
| 7 | 7, 9, 3, 1 | 4 |
| 8 | 8, 4, 2, 6 | 4 |
| 4 | 4, 6 | 2 |
| 9 | 9, 1 | 2 |
| 0, 1, 5, 6 | itself | 1 |

**Method:** divide the exponent by the cycle length; the remainder tells you the position.  
A remainder of 0 means the **last** entry in the cycle.

### Worked example — unit digit of 7¹⁰⁵

- Cycle of 7 is (7, 9, 3, 1), length 4.
- 105 ÷ 4 leaves remainder **1**.
- First entry of the cycle → **7**.

### Worked example — unit digit of 24³³

- Only the last digit matters: 4. Cycle of 4 is (4, 6), length 2.
- 33 ÷ 2 leaves remainder 1 → first entry → **4**.

---

## Remainders

**The one rule that solves most of them:** reduce the base first, then look for a power that gives remainder 1.

### Worked example — remainder of 2⁵¹ ÷ 7

- 2³ = 8, and 8 ÷ 7 leaves **1**. So 2³ ≡ 1.
- 51 = 3 × 17, so 2⁵¹ = (2³)¹⁷ ≡ 1¹⁷ = **1**.

### Worked example — remainder of 17²³ ÷ 16

- 17 ÷ 16 leaves 1, so 17 ≡ 1. Then 17²³ ≡ 1²³ = **1**.

> Negative remainders are legal and save time. For 15²³ ÷ 16: 15 ≡ −1, so 15²³ ≡ (−1)²³ =
> −1 ≡ **15**.

---

## Factors

For **N = pᵃ × qᵇ × rᶜ** (p, q, r prime):

- **Number of factors** = (a+1)(b+1)(c+1)
- **Sum of factors** = (p^(a+1)−1)/(p−1) × (q^(b+1)−1)/(q−1) × …
- **Number of ways to write N as a product of two factors** = half the factor count
  (round up if N is a perfect square)

### Worked example — how many factors does 360 have?

- 360 = 2³ × 3² × 5¹
- (3+1)(2+1)(1+1) = 4 × 3 × 2 = **24 factors**

---

## Trailing zeros in n!

Count the 5s (there are always more 2s than 5s):

**zeros = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …**

### Worked example — trailing zeros in 100!

⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = **24**

---

## LCM and HCF

- **LCM × HCF = product of the two numbers** (two numbers only)
- HCF of fractions = HCF(numerators) / LCM(denominators)
- LCM of fractions = LCM(numerators) / HCF(denominators)

**The three word-problem shapes:**

| Question says | Use |
|---|---|
| "bells ring together again", "smallest number divisible by all" | **LCM** |
| "largest tile that fits exactly", "greatest number that divides" | **HCF** |
| "leaves the same remainder in each case" | **HCF of the differences** |
| "leaves remainder r each time" | **LCM + r** |

### Worked example — greatest number dividing 43, 91 and 183 leaving the same remainder

- Differences: 91 − 43 = 48, 183 − 91 = 92, 183 − 43 = 140.
- HCF(48, 92, 140) = **4**.

### Worked example — smallest number that leaves remainder 3 when divided by 5, 6 and 8

- LCM(5, 6, 8) = 120. Answer = 120 + 3 = **123**.

---

## Practice set

Attempt each before reading the solution.

#### Q1. Find the unit digit of 3⁴⁷.

Cycle of 3 is (3, 9, 7, 1), length 4. 47 ÷ 4 leaves remainder 3 → third entry.

**Answer: 7**

#### Q2. Find the remainder when 3¹²³ is divided by 5.

Powers of 3 mod 5: 3, 4, 2, 1 — cycle length 4. 123 ÷ 4 leaves remainder 3 → third entry.

**Answer: 2**

#### Q3. How many factors does 720 have, and what is their sum?

720 = 2⁴ × 3² × 5¹.  
Count = (4+1)(2+1)(1+1) = 5 × 3 × 2 = **30 factors**.  
Sum = (2⁵−1)/(2−1) × (3³−1)/(3−1) × (5²−1)/(5−1) = 31 × 13 × 6 = **2,418**

#### Q4. How many trailing zeros does 125! have?

⌊125/5⌋ + ⌊125/25⌋ + ⌊125/125⌋ = 25 + 5 + 1 = **31**

#### Q5. Four bells toll at intervals of 6, 8, 12 and 18 seconds. If they toll together at the start, how many times do they toll together in one hour?

LCM(6, 8, 12, 18): 6 = 2·3, 8 = 2³, 12 = 2²·3, 18 = 2·3² → LCM = 2³ · 3² = 72 s.  
In 3600 s they coincide 3600/72 = 50 times, **plus the toll at the start**.

**Answer: 51 times**

#### Q6. Find the largest 4-digit number divisible by 15, 20 and 25.

LCM(15, 20, 25) = 300. 9999 ÷ 300 = 33.33, so take 33 × 300.

**Answer: 9,900**

#### Q7. Is 4,832,718 divisible by 11?

Odd positions (1st, 3rd, 5th, 7th): 4 + 3 + 7 + 8 = 22. Even positions: 8 + 2 + 1 = 11.  
22 − 11 = 11, a multiple of 11.

**Answer: yes**

#### Q8. Find the remainder when 7¹⁰⁰ is divided by 4.

7 ≡ 3 ≡ −1 (mod 4). So 7¹⁰⁰ ≡ (−1)¹⁰⁰ = 1.

**Answer: 1**

#### Q9. The HCF of two numbers is 12 and their LCM is 336. If one number is 84, find the other.

LCM × HCF = product of the numbers → 12 × 336 = 84 × x x = 4032 / 84 = **48**

#### Q10. What is the greatest power of 3 that divides 50!?

⌊50/3⌋ + ⌊50/9⌋ + ⌊50/27⌋ = 16 + 5 + 1 = **22**, so 3²² divides 50!.

#### Q11. Find the smallest number which when divided by 12, 15 and 20 leaves remainder 5 in each case.

LCM(12, 15, 20) = 60. Add the common remainder.

**Answer: 65**

#### Q12. Find the greatest number that divides 2011 and 2623 leaving remainders 9 and 5 respectively.

Subtract the remainders first: 2011 − 9 = 2002, 2623 − 5 = 2618.  
Now find HCF(2002, 2618). 2618 − 2002 = 616. HCF(2002, 616): 2002 = 3×616 + 154;  
HCF(616, 154) = 154 (616 = 4 × 154).

**Answer: 154**

---

## Traps

- **"Unit digit" vs "remainder by 10"** — same thing. Don't recompute.
- Cycle remainder **0** means the last element, not the first. 2¹² → 12 ÷ 4 = remainder 0 →
  the 4th entry, **6**, not 2.
- Trailing zeros: people forget the ⌊n/25⌋ term. 100! is 24 zeros, not 20.
- 1 is **not** prime. 2 is the only even prime.
- HCF ≤ both numbers ≤ LCM. If your answer breaks that, you swapped them.

---

## Checkpoints

- [ ] I can test divisibility by 3, 4, 8, 9 and 11 without writing anything down
- [ ] I know the cyclicity table and that a remainder of 0 means the last cycle entry
- [ ] I can find the unit digit of any a^b in under 20 seconds
- [ ] I can reduce a base mod n and use negative remainders
- [ ] I can count factors from a prime factorisation
- [ ] I can count trailing zeros in a factorial including the /25 and /125 terms
- [ ] I know LCM × HCF = product, and the HCF/LCM rules for fractions
- [ ] I can tell instantly whether a word problem wants LCM, HCF, or HCF of differences
