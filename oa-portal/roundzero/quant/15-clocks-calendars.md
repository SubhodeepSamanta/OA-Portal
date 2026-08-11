# Clocks & calendars

Small, self-contained, and entirely mechanical. Two hours of work here reliably converts into marks because almost every question is one of four shapes.

---

# Part 1 — Clocks

## The base facts

- The **minute hand** moves 360° in 60 min → **6° per minute**
- The **hour hand** moves 360° in 12 h → **0.5° per minute**
- **Relative speed = 5.5° per minute** (this is the number that does all the work)
- The hands **coincide 11 times in 12 hours** (22 times a day), not 12
- The hands are **opposite (180°) 11 times in 12 hours**
- They are at **right angles 22 times in 12 hours** (44 times a day)

## The angle formula

At **H hours and M minutes**:

> **angle = |30H − 5.5M|**

If the result exceeds 180°, subtract it from 360°.

### Worked example — angle at 3:40

- |30(3) − 5.5(40)| = |90 − 220| = **130°**

### Worked example — angle at 8:20

- |30(8) − 5.5(20)| = |240 − 110| = **130°**

## When do the hands do X?

Set the formula equal to the angle you want and solve for M.

### Worked example — when do the hands coincide between 4 and 5 o'clock?

- Want angle 0: 30(4) − 5.5M = 0 → 120 = 5.5M → M = 120/5.5 = **21 9/11 minutes past 4**

### Worked example — when are they opposite between 4 and 5?

- Want 180: |120 − 5.5M| = 180 → 5.5M = 300 (taking the negative branch) → M = **54 6/11
  minutes past 4**

**Gap between successive coincidences** = 720/11 = **65 5/11 minutes**. A clock whose hands meet every 65 minutes exactly is therefore running **fast**.

## Fast and slow clocks

### Worked example

*A clock gains 5 minutes every hour. If set right at 8 a.m., what does it show at 8 p.m.?*

- 12 real hours × 5 min = 60 minutes gained → it shows **9 p.m.**

---

# Part 2 — Calendars

## Odd days

An "odd day" is the remainder when a number of days is divided by 7.

| Period | Odd days |
|---|---|
| Ordinary year (365 days) | **1** |
| Leap year (366 days) | **2** |
| 100 years | **5** |
| 200 years | 3 |
| 300 years | 1 |
| 400 years | **0** |

Because 400 years has 0 odd days, **the calendar repeats every 400 years**.

## Leap year rule

Divisible by 4 → leap. **But** century years must be divisible by **400**.

- 1900 is **not** a leap year (divisible by 100 but not 400)
- 2000 **is** a leap year
- 2024 is a leap year

## Month odd days

| Days in month | Odd days |
|---|---|
| 31 | 3 |
| 30 | 2 |
| 28 (Feb, ordinary) | 0 |
| 29 (Feb, leap) | 1 |

Running total for an ordinary year: Jan 3, Feb 0, Mar 3, Apr 2, May 3, Jun 2, Jul 3, Aug 3,  
Sep 2, Oct 3, Nov 2, Dec 3.

## Day codes

0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.

### Worked example — what day was 15 August 1947?

**Step 1 — complete years before it.** 1946 years = 1600 + 300 + 46.
- 1600 years → 0 odd days (multiple of 400)
- 300 years → 1 odd day
- 46 years → how many leaps? ⌊46/4⌋ = 11 leap, 35 ordinary
  → odd days = 11 × 2 + 35 × 1 = 22 + 35 = 57 → 57 mod 7 = **1**

Running total: 0 + 1 + 1 = 2 odd days.

**Step 2 — days in 1947 up to 15 August.**
- Jan 31 + Feb 28 + Mar 31 + Apr 30 + May 31 + Jun 30 + Jul 31 + Aug 15 = 227
- 227 mod 7 = **3** (since 227 = 32 × 7 + 3)

**Step 3 — total.** 2 + 3 = 5 odd days → **Friday**. ✓ (India's independence day was indeed a Friday.)

### Worked example — a shorter shape

*If 1 January 2024 is a Monday, what day is 1 January 2025?*

- 2024 is a leap year → 2 odd days → Monday + 2 = **Wednesday**

That short form is far more commonly asked than the full 1947-style computation.

---

## Practice set

#### Q1. Find the angle between the hands at 4:20.

|30(4) − 5.5(20)| = |120 − 110| = **10°**

#### Q2. Find the angle at 7:35.

|30(7) − 5.5(35)| = |210 − 192.5| = **17.5°**

#### Q3. Find the angle at 2:45.

|30(2) − 5.5(45)| = |60 − 247.5| = 187.5 → exceeds 180, so 360 − 187.5 = **172.5°**

#### Q4. At what time between 3 and 4 o'clock do the hands coincide?

30(3) − 5.5M = 0 → 90 = 5.5M → M = 180/11 = **16 4/11 minutes past 3**

#### Q5. At what time between 5 and 6 are the hands at right angles?

|150 − 5.5M| = 90
→ 150 − 5.5M = 90 → M = 60/5.5 = **10 10/11 min past 5**  
→ 5.5M − 150 = 90 → M = 240/5.5 = **43 7/11 min past 5**  
Both occur.

#### Q6. At what time between 8 and 9 are the hands opposite?

|240 − 5.5M| = 180 → 5.5M = 60 → M = **10 10/11 minutes past 8**

#### Q7. A clock gains 4 minutes every hour. It is set right at 6 a.m. What is the true time when it shows 3 p.m.?

In each true hour it shows 64 minutes. It shows 9 hours = 540 shown minutes.  
True time = 540 × 60/64 = 506.25 min = 8 h 26.25 min → **2:26 p.m. (approximately)**

#### Q8. How many times do the hands of a clock coincide in a day?

11 per 12 hours → **22 times**

#### Q9. Is 2100 a leap year?

Divisible by 100 but not by 400 → **no**

#### Q10. If 5 January 2020 was a Sunday, what day was 5 January 2021?

2020 is a leap year, but the span from Jan 2020 to Jan 2021 includes 29 Feb 2020 → 366 days  
→ 2 odd days.  
Sunday + 2 = **Tuesday**

#### Q11. What day of the week was 26 January 1950?

**Years:** 1949 = 1600 + 300 + 49.
- 1600 → 0 odd days
- 300 → 1 odd day
- 49 years: leap years = ⌊49/4⌋ = 12, ordinary = 37 → 12(2) + 37(1) = 61 → 61 mod 7 = 5
Total so far: 0 + 1 + 5 = 6

**Days in 1950 up to 26 Jan:** 26 → 26 mod 7 = 5

**Total:** 6 + 5 = 11 → 11 mod 7 = 4 → **Thursday** ✓ *(India's first Republic Day was a  
Thursday.)*

#### Q12. What day was 15 August 2023?

**Years:** 2022 = 1600 + 400 + 22 → 0 + 0 + [⌊22/4⌋ = 5 leap, 17 ordinary → 5(2)+17 = 27 →  
27 mod 7 = 6] = 6  
**Days in 2023 to 15 Aug:** 31+28+31+30+31+30+31+15 = 227 → 227 mod 7 = 3  
**Total:** 6 + 3 = 9 → 9 mod 7 = 2 → **Tuesday** ✓

---

## Traps

- The hands coincide **11** times in 12 hours, not 12. Between 11 and 12 o'clock there is no
  separate coincidence — it happens exactly at 12.
- The angle formula can give a reflex answer; subtract from 360 if it exceeds 180.
- 1900 was not a leap year. Century years need /400.
- February has 28 days in the odd-day count unless the year is a leap year *and* the date is
  on or after 1 March.
- When counting years, use **completed** years — for a date in 1947, count 1946 years.
- A clock "gaining" time shows a later time than reality; a losing clock shows earlier.

---

## Checkpoints

- [ ] I know the minute hand is 6°/min, the hour hand 0.5°/min, relative 5.5°/min
- [ ] I can compute the angle at any time with |30H − 5.5M| and fix reflex angles
- [ ] I can find when the hands coincide or are opposite in a given hour
- [ ] I know the hands coincide 11 times in 12 hours and meet every 65 5/11 minutes
- [ ] I can solve a fast/slow clock question
- [ ] I know odd days for ordinary, leap, 100, 200, 300 and 400 year blocks
- [ ] I know the century leap-year rule and that 1900 was not a leap year
- [ ] I can find the day of the week for any date using the three-step odd-day method
