# Flowcharts, decision tables, attention to detail

A grab-bag of formats that Accenture and Cognizant use heavily and that most candidates never practise. They require no theory at all — only care — which makes them among the cheapest marks available.

---

# Part 1 — Flowcharts

Accenture asks 2–3 flowchart questions per paper. You are shown a diagram and must trace the output, or fill in a missing box.

## The symbols

| Shape | Meaning |
|---|---|
| Oval / rounded | Start or End |
| Rectangle | Process — a computation or assignment |
| **Diamond** | Decision — has exactly two exits, Yes and No |
| Parallelogram | Input or Output |
| Arrow | Flow of control |

## The method: trace with a table

Never trace a flowchart in your head. Draw a column per variable and one row per pass through the loop.

### Worked example

*Start → A = 1, B = 1 → [Loop] Is A > 4? → No: B = B × A; A = A + 1; repeat. Yes: print B.*

| Pass | A | A > 4? | B after B = B × A | A after A = A+1 |
|---|---|---|---|---|
| 1 | 1 | No | 1 × 1 = 1 | 2 |
| 2 | 2 | No | 1 × 2 = 2 | 3 |
| 3 | 3 | No | 2 × 3 = 6 | 4 |
| 4 | 4 | No | 6 × 4 = 24 | 5 |
| 5 | 5 | **Yes** | — | — |

**Output: 24** — the flowchart computes 4!.

**The three things to check every time:**

1. **Is the test before or after the body?** A test at the top may run the body zero times;
   a test at the bottom always runs it at least once.
2. **Is the comparison `>` or `>=`?** This changes the count by exactly one — the single
   most common flowchart trap.
3. **What is the order of updates inside the loop?** `B = B × A` then `A = A + 1` gives a
   different answer from the reverse.

---

# Part 2 — Decision tables / selection criteria

A block of eligibility rules, then several candidate profiles to judge. Cognizant and the bank-style papers use these heavily.

**Format:** "A candidate must satisfy (i) age under 30, (ii) a degree with 60%+, (iii)  
2 years' experience. **However**, if the candidate satisfies (i) and (ii) but not (iii), the case is referred to the Manager. If a candidate satisfies all but (i), refer to the  
Director."

## The method

**1. Write the criteria as a checklist before reading any candidate.**

```
   (i)   age < 30
   (ii)  degree ≥ 60%
   (iii) experience ≥ 2 yrs
   exceptions:  ¬(iii) but (i)(ii)  → Manager
                ¬(i)  but (ii)(iii) → Director
```

**2. For each candidate, mark every criterion ✓ or ✗ before deciding.** Do not read and judge at the same time.

**3. Check the exceptions only after you know exactly which criteria failed.**

### Worked example

*Criteria as above. Candidate: age 32, degree 68%, experience 4 years.*

- (i) 32 < 30? **✗**
- (ii) 68 ≥ 60? **✓**
- (iii) 4 ≥ 2? **✓**
- Fails only (i), satisfies (ii) and (iii) → matches the Director exception → **refer to the
  Director**.

**The trap:** two candidates in the set will differ by one value only — 29 vs 30, 59.9% vs  
60%. Boundary cases are the whole point of the exercise. **"Under 30" excludes 30. "60% and above" includes 60.** Read the preposition, not the number.

---

# Part 3 — Attention to detail

Two strings or lists that you must compare exactly. It sounds trivial; under time pressure it is not.

*Which pairs are identical?*

```
  1.  8493027561    8493027561
  2.  RTX-4090-Ti   RTX-4O90-Ti
  3.  bharat@dit.in bharat@dlt.in
```

- Pair 1: identical ✓
- Pair 2: the second contains the **letter O** where the first has a **zero** ✗
- Pair 3: **dit** vs **dlt** — an i against an l ✗

## The technique

- **Compare in chunks of 3–4 characters**, not character by character and not as a whole
  string. Chunking is measurably faster and more accurate.
- Know the confusable sets by heart: **0/O**, **1/l/I**, **5/S**, **2/Z**, **8/B**, **rn/m**
- **Compare from the middle outwards** occasionally. Errors are planted in the middle far
  more often than at the ends, because the eye anchors on the ends.
- If the strings are long, compare **lengths** first — a difference settles it instantly.

---

## Practice set

### Flowcharts

**Q1.** *Start → N = 5, S = 0 → Is N > 0? → Yes: S = S + N; N = N − 1; repeat. No: print S.*

| Pass | N | N > 0? | S |
|---|---|---|---|
| 1 | 5 | Yes | 5 |
| 2 | 4 | Yes | 9 |
| 3 | 3 | Yes | 12 |
| 4 | 2 | Yes | 14 |
| 5 | 1 | Yes | 15 |
| 6 | 0 | No | — |

**Output: 15** — it sums 1 to 5.

**Q2.** *Start → A = 1, B = 1 → Is A > 5? No: B = B + A; A = A + 2; repeat. Yes: print B.*

| Pass | A | A > 5? | B |
|---|---|---|---|
| 1 | 1 | No | 2 |
| 2 | 3 | No | 5 |
| 3 | 5 | No | 10 |
| 4 | 7 | Yes | — |

**Output: 10**
*Note pass 3: A = 5 and the test is `A > 5`, which is false, so the body runs one more time.  
Had the test been `A >= 5`, the answer would be 5.*

**Q3.** *Start → X = 20 → Is X divisible by 3? Yes: X = X − 3. No: X = X − 1. Repeat until  
X ≤ 0, then print X.*

20 → not div 3 → 19 → no → 18 → **yes** → 15 → yes → 12 → yes → 9 → yes → 6 → yes → 3 → yes  
→ 0 → stop.

**Output: 0**

**Q4.** *A flowchart reads a number N, then: if N % 2 == 0 print "A", else if N % 3 == 0 print  
"B", else print "C". What is printed for N = 6, 9 and 7?*
- N = 6: even → **A** *(the first matching branch wins; it never tests % 3)*
- N = 9: odd, divisible by 3 → **B**
- N = 7: neither → **C**

### Decision tables

**Criteria for a loan.** An applicant qualifies if:  
(i) age is between 21 and 58 inclusive, (ii) monthly income is at least ₹30,000, (iii) employed for at least 2 years with the current employer.  
**Exceptions:** if (i) and (ii) are met but not (iii), refer to the Branch Manager.  
If (ii) and (iii) are met but not (i), refer to the Regional Head.

#### Q5. Applicant: age 24, income ₹45,000, employed 3 years.

(i) ✓ (ii) ✓ (iii) ✓ → **qualifies**

#### Q6. Applicant: age 26, income ₹38,000, employed 1 year.

(i) ✓ (ii) ✓ (iii) ✗ → **refer to the Branch Manager**

#### Q7. Applicant: age 60, income ₹80,000, employed 10 years.

(i) ✗ (ii) ✓ (iii) ✓ → **refer to the Regional Head**

#### Q8. Applicant: age 21, income ₹30,000, employed 2 years.

"Between 21 and 58 **inclusive**" → 21 ✓. "At least ₹30,000" → 30,000 ✓. "At least 2 years"  
→ 2 ✓  
**Qualifies.** *(Every value sits exactly on a boundary — this is the question the set exists to ask.)*

#### Q9. Applicant: age 20, income ₹29,000, employed 5 years.

(i) ✗ (ii) ✗ (iii) ✓ → two criteria fail, so no exception applies →  
**does not qualify, no referral**

### Attention to detail

#### Q10. Which pairs are identical?

| | Left | Right |
|---|---|---|
| 1 | 7823094516 | 7823094516 |
| 2 | INV-2024-0O81 | INV-2024-0081 |
| 3 | subhodeep.s@dit.edu.in | subhodeep.s@dlt.edu.in |
| 4 | RTX–4090 | RTX-4090 |
| 5 | 100110101101 | 100110101101 |

- **1 — identical ✓**
- 2 — letter **O** vs digit **0** in the fourth block ✗
- 3 — **dit** vs **dlt** (i against l) ✗
- 4 — an **en dash** vs a **hyphen** ✗
- **5 — identical ✓**

**Answer: pairs 1 and 5.**

> Pair 4 is the one people miss, because the difference is punctuation rather than a
> character. When strings look identical, check the separators too.

---

## Traps

- Flowcharts: off-by-one from `>` vs `>=`, and loops that run zero times.
- Flowcharts: updating variables in the wrong order.
- Decision tables: assuming "and" where the text says "or", and vice versa.
- Decision tables: mishandling the boundary. "Above 60%" and "60% or above" differ.
- Decision tables: applying an exception before confirming which criteria actually failed.
- Attention to detail: reading for **meaning** instead of for **characters**. Your brain will
  autocorrect a misspelling you are reading semantically — read it as symbols.

---

## Checkpoints

- [ ] I know the flowchart symbols, especially that a diamond has exactly two exits
- [ ] I trace flowcharts with a variable table, one row per loop pass, never in my head
- [ ] I check whether the loop test is at the top or the bottom
- [ ] I check `>` versus `>=` explicitly on every flowchart
- [ ] I check the order of updates inside the loop body
- [ ] I write the eligibility criteria as a checklist before reading any candidate
- [ ] I mark every criterion ✓/✗ before deciding, and check exceptions only afterwards
- [ ] I treat boundary values ("under 30", "60% and above") as the point of the question
- [ ] I compare strings in chunks of 3–4 characters and know the confusable pairs
