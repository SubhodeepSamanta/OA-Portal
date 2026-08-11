# Coding–decoding

Pure mechanics — there is nothing to understand, only a small number of schemes to recognise. Expect 2–4 questions in every paper.

## The five schemes

Work through them in this order when you meet a new question.

### 1. Letter shift (the most common)

Every letter moves a fixed number of places.

*If CAT is coded as DBU, how is DOG coded?*
- C→D, A→B, T→U: each letter **+1**
- D→E, O→P, G→H → **EPH**

*If MONKEY is coded as PRQNHB, what is the shift?*
- M(13)→P(16), O(15)→R(18): each **+3** → the code for any word is each letter +3.

**Backward shifts** work the same way with a minus. If FRUIT → EQTHS, the shift is −1.

### 2. Reverse / opposite letters

Each letter is replaced by its opposite (sum to 27).

*If DOG is coded as WLT:*
- D(4) → W(23): 4 + 23 = 27 ✓
- O(15) → L(12): 27 ✓
- G(7) → T(20): 27 ✓
- So the rule is "opposite letter". Apply it to any new word the same way.

### 3. Letter–number

Letters are replaced by their positions, sometimes with an operation.

*If BAD = 2-1-4, then CAB = ?* → **3-1-2**

*If FACE = 21, how? * → F+A+C+E = 6+1+3+5 = **15**. If the given answer were 21 the rule would be something else — always test the arithmetic before assuming.

### 4. Word substitution (the "language" questions)

*If 'sky' is called 'water', 'water' is called 'air', 'air' is called 'cloud', what do birds fly in?*
- Birds actually fly in **air**, and air is called **cloud** → answer **cloud**.

**Method:** find the real-world answer first, then translate it once using the given list.  
Translating in the wrong direction is the only way to get these wrong.

### 5. Substitution coding (deciphering a whole sentence)

The hardest type. You are given several coded sentences and must find what one word maps to.

**Method: find the common word.**

*'pit na som' means 'apple is sweet'*  
*'na jo pa' means 'sweet and sour'*  
*'som ka pa' means 'apple and mango'*

- Sentences 1 and 2 share the word **sweet**, and share the code **na** → **na = sweet**
- Sentences 1 and 3 share **apple**, and share **som** → **som = apple**
- Sentences 2 and 3 share **and**, and share **pa** → **pa = and**
- From sentence 1: pit = **is**. From 2: jo = **sour**. From 3: ka = **mango**.

Always start by listing which sentences share which English words — the overlaps solve themselves.

---

## Worked example — mixed shift

*If TEACHER is coded as VGCEJGT, how is STUDENT coded?*

- T(20)→V(22), E(5)→G(7), A(1)→C(3): each **+2**
- S→U, T→V, U→W, D→F, E→G, N→P, T→V → **UVWFGPV**

## Worked example — positional shift

*If ROSE is coded as SQVI, find the rule.*

- R(18)→S(19): +1
- O(15)→Q(17): +2
- S(19)→V(22): +3
- E(5)→I(9): +4

The shift **increases by one each position**. This variant catches people who check only the first letter.

## Worked example — number coding with an operation

*If 'CAB' is coded as 6, 'DEF' as 15, what is 'GHI'?*

- C+A+B = 3+1+2 = 6 ✓
- D+E+F = 4+5+6 = 15 ✓
- G+H+I = 7+8+9 = **24**

---

## The systematic approach

1. Write the **position numbers** under both the plaintext and the code.
2. Subtract to get the shift for **each** letter, not just the first.
3. If the shifts are equal → constant shift. If they increase/decrease → positional shift.
4. If the sums are 27 → opposite letters.
5. If nothing works, check whether the **letters have been reordered** (e.g. reversed) before
   or after shifting.

### Worked example — reorder + shift

*If HELP is coded as QMFI, how is WORD coded?*

- A straight letter-by-letter shift gives H→Q (+9), E→M (+8), L→F (−6): inconsistent, so it
  is not a plain shift.
- **Try reversing first.** HELP reversed is PLEH.
- Now compare with QMFI: P(16)→Q(17), L(12)→M(13), E(5)→F(6), H(8)→I(9) — every letter **+1**.
- Rule: **reverse the word, then shift each letter +1**.
- WORD reversed is DROW → +1 each → **ESPX**

> If a letter-by-letter shift is inconsistent, reverse the plaintext and try again **before**
> abandoning the question. Reverse-then-shift is the second most common scheme after the
> plain shift.

**When to walk away:** if a plain shift, a reversed shift and the opposite-letter rule all fail, guess and move on. In a sectionally timed paper, three failed schemes is your signal to leave.

---

## Practice set

#### Q1. If FRIEND is coded as GSJFOE, how is CANDLE coded?

Each letter **+1** → **DBOEMF**

#### Q2. If TEACHER is coded as QBXZEBO, how is STUDENT coded?

T(20)→Q(17) is −3; E(5)→B(2) is −3; A(1)→X(24) wraps back 3.  
Each letter **−3** → S→P, T→Q, U→R, D→A, E→B, N→K, T→Q → **PQRABKQ**

#### Q3. If LONDON is coded as OLMWLM, what is the rule?

L(12)→O(15)? Check the opposite rule instead: L(12) → O(15), 12+15 = 27 ✓; O(15)→L(12) ✓;  
N(14)→M(13) ✓ (27); D(4)→W(23) ✓.  
Rule: **opposite letters**.

#### Q4. If MADRAS is coded as NBESBT, how is BOMBAY coded?

Each letter **+1** → **CPNCBZ**

#### Q5. If in a code SUNDAY is written as SNUDYA, how is MONDAY written?

The pattern swaps letters in pairs from position 2: S-UN-D-AY → S-NU-D-YA.  
Applying the same positional swap to MONDAY: M-ON-D-AY → **M-NO-D-YA = MNODYA**

#### Q6. If A = 1, B = 2, …, what is the value of PEN?

16 + 5 + 14 = **35**

#### Q7. If HOSPITAL is coded as 32, what is the rule and what is DOCTOR?

HOSPITAL has 8 letters × 4 = 32. So the code is **letters × 4**.  
DOCTOR has 6 letters → **24**

#### Q8. If ROSE is coded as 6821, CHAIR as 73456 and PREACH as 961473, what is SEARCH?

Build the map: R=6, O=8, S=2, E=1 · C=7, H=3, A=4, I=5, R=6 · P=9, R=6, E=1, A=4, C=7, H=3  
S=2, E=1, A=4, R=6, C=7, H=3 → **214673**

#### Q9. If 'green' means 'blue', 'blue' means 'red', 'red' means 'yellow', what is the colour of blood?

Blood is really **red**, and red is called **yellow** → **yellow**

#### Q10. In a code, 'pit dar na' means 'you are good', 'dar tok la' means 'good and bad', and 'na sim tok' means 'you like bad'. What is the code for 'good'?

Sentences 1 and 2 share **good**, and share the code **dar** → **dar**

#### Q11. Continuing Q10, what is the code for 'you'?

Sentences 1 and 3 share **you**, and share **na** → **na**

#### Q12. If BEAT is written as YVZG, how is COLD written?

B(2)→Y(25): 27 ✓ · E(5)→V(22): 27 ✓ · A→Z ✓ · T(20)→G(7): 27 ✓ → opposite letters.  
C(3)→X(24), O(15)→L(12), L(12)→O(15), D(4)→W(23) → **XLOW**

#### Q13. If DELHI is coded as CDKGH, how is MUMBAI coded?

Each letter **−1** → **LTLAZH**

#### Q14. If 5 × 4 = 15, 6 × 5 = 24, 7 × 6 = 35, then 8 × 7 = ?

The rule is a(b−1) … check: 5×(4−1) = 15 ✓, 6×(5−1) = 24 ✓, 7×(6−1) = 35 ✓  
8 × (7−1) = **48**

#### Q15. If PALE is coded as 2134 and EARTH as 41590, how is PEARL coded?

P=2, A=1, L=3, E=4 · E=4, A=1, R=5, T=9, H=0  
P-E-A-R-L → **24153**

---

## Traps

- Check **every** letter's shift. Positional shifts (+1, +2, +3…) look like constant shifts
  if you only test the first pair.
- After Z, wrap to A. X + 3 = A, not something off the end.
- In "if sky is called water" questions, translate **once**, in the right direction.
- In substitution coding, the same English word must map to the same code across sentences —
  if it does not, you have mis-paired the sentences.
- Do not assume the code preserves letter order; check for reversal.

---

## Checkpoints

- [ ] I write position numbers under both strings before looking for a rule
- [ ] I check the shift for every letter, not just the first
- [ ] I recognise a constant shift, an increasing positional shift, and opposite-letter coding
- [ ] I handle wraparound past Z correctly
- [ ] I can solve "if sky is called water" questions by finding the real answer then translating once
- [ ] I solve substitution-coding sets by finding words common to two sentences
- [ ] I know to abandon a coding question after two failed schemes rather than sink time in it
