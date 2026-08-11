# Puzzles

**Infosys runs a whole Puzzle Solving section.** The good news: interviewers and test-setters reuse the same twenty or so classics. Learn these and you will recognise most of what appears rather than solving from scratch.

## The three families

| Family | What it looks like |
|---|---|
| **Classic lateral puzzles** | weighings, crossings, bulbs, ropes, jugs |
| **Grid / matrix puzzles** | missing number in a figure, Sudoku-style fills |
| **Logical deduction** | truth-tellers and liars, hats, ordering |

---

# Part 1 — The classics

### Weighing: 8 balls, one heavier, 2 weighings

Split into **3, 3, 2**.
- Weigh 3 vs 3. If balanced, the odd ball is in the 2 → weigh those two → done.
- If one side is heavier, take those 3, weigh 1 vs 1. Balanced → it is the third. Otherwise
  the heavier pan holds it.

**The principle:** each weighing has **three** outcomes (left, right, balanced), so *n* weighings can distinguish **3ⁿ** cases. Two weighings handle up to 9 balls — which is why 8 is easy and 12 (with unknown heavier-or-lighter) is the hard version.

### Burning ropes: measure 45 minutes

Two ropes, each burns for 60 minutes but **unevenly**.
- Light rope A at **both** ends and rope B at **one** end simultaneously.
- Rope A is consumed in 30 minutes. At that moment, rope B has 30 minutes left.
- Now light rope B's **other** end. Its remaining 30 minutes burns in 15.
- 30 + 15 = **45 minutes**

**The principle:** lighting both ends halves the remaining time, whatever the unevenness.

### Three bulbs, three switches

Three switches outside a room, three bulbs inside. You may enter **once**.
- Turn switch 1 on, wait 5 minutes, turn it off.
- Turn switch 2 on and enter.
- **Lit** = switch 2. **Off but warm** = switch 1. **Off and cold** = switch 3.

**The principle:** add a second observable dimension (heat) when one (light) is insufficient.

### Water jugs: get 4 litres from a 3 L and a 5 L jug

- Fill the 5 L. Pour into the 3 L → 2 L left in the 5 L jug.
- Empty the 3 L. Pour the 2 L into it.
- Fill the 5 L again. Top up the 3 L (which needs 1 more) → **4 L remains in the 5 L jug.**

### Bridge crossing with one torch

Four people cross in 1, 2, 5 and 10 minutes. Two may cross at a time, the pair moves at the  
**slower** speed, and someone must carry the torch back.

- 1 and 2 cross → 2 min. 1 returns → 1 min. *(total 3)*
- 5 and 10 cross → 10 min. 2 returns → 2 min. *(total 15)*
- 1 and 2 cross → 2 min. **Total 17 minutes.**

**The principle:** send the **two slowest together**, and use the two fastest as shuttles. The naive "fastest escorts everyone" answer gives 19 and is the trap.

### Poisoned wine: 1000 bottles, 1 poisoned, rats

One bottle of 1000 is poisoned; a rat that drinks it dies in 24 hours. How many rats to find it in one round?

Number the bottles 0–999 in **binary**. Assign one rat per bit. Each rat drinks from every bottle whose number has a 1 in that rat's bit position. The pattern of dead rats reads off the bottle number in binary.

2¹⁰ = 1024 ≥ 1000 → **10 rats**

### Camel and bananas

3000 bananas, 1000 km, the camel carries 1000 at a time and eats 1 per km.  
Move in stages, dropping bananas at intermediate depots. Answer: **533 bananas** delivered.

*This one is long; if it appears, recognise it and move on unless you have time.*

### Truth-tellers and liars

One always lies, one always tells the truth, and you may ask **one** question to find the right road.

Ask either one: *"If I asked the other which road leads to the city, what would they say?"*  
Then take the **opposite** road. A double negative through the liar cancels either way.

---

# Part 2 — Grid and matrix puzzles

**Find the missing number.** The relationship runs along rows, along columns, or diagonally — test all three.

### Worked example

```
    4    9    5
    7    3    2
    6    8    ?
```
Row rule: 4 + 9 = 13, and 7 + 3 = 10… no consistent link. Try columns: 4 + 7 + 6 = 17,  
9 + 3 + 8 = 20 — no. Try **first two of each row minus something**: 4 × 9 = 36, and  
3 + 6 = 9 → 36/9 = 4? Inconsistent.

Try the common pattern **col1 + col2 − col3**: 4 + 9 − 5 = 8; 7 + 3 − 2 = 8; so  
6 + 8 − ? = 8 → **? = 6**

> **The method:** compute the same candidate relationship for **every** complete row before
> committing. A rule that fits one row is a coincidence; a rule that fits two is the answer.

### Worked example — figure puzzles

```
      5              8              7
   3     7        4     6        2     9
     26             32             ?
```

**Step 1 — try the two commonest rules on figure 1.**
- Sum of all three corners: 3 + 7 + 5 = 15 ✗ (the centre is 26)
- Product of the two lower corners, plus the top: (3 × 7) + 5 = **26** ✓

**Step 2 — verify on figure 2 before trusting it.** (4 × 6) + 8 = 24 + 8 = **32** ✓

**Step 3 — apply.** (2 × 9) + 7 = 18 + 7 = **25**

> **The method:** on figure puzzles, the rule is nearly always *product of two corners, plus
> or minus the third*. Test that first, confirm it on a **second** complete figure, then
> apply. A rule that fits one figure is a coincidence; one that fits two is the answer.
> If nothing survives 90 seconds, guess and move — these are the lowest marks-per-minute
> questions in the paper.

---

# Part 3 — Logical deduction

### Worked example — ordering

*Five books are stacked. The Maths book is above the Physics book. Chemistry is below  
Physics. English is at the top. Biology is immediately below English. Find the order.*

- English is 1st. Biology is 2nd.
- Maths above Physics above Chemistry, filling 3, 4, 5 in that order.

**English, Biology, Maths, Physics, Chemistry**

### Worked example — hats

*Three people in a line, each wearing a black or white hat, can see only those in front.  
Told there are 2 black and 1 white, the back person says "I don't know". The middle then knows their own colour. How?*

- If the back person saw two whites, they would know theirs was black. Saying "I don't know"
  means the front two are **not both white**.
- The middle person sees the front. If the front is white, then (since not both white) the
  middle must be **black**. If the front is black, the middle cannot deduce it — so the fact that they *do* know means the front is white and the **middle is black**.

**The principle:** in these puzzles, another person's *ignorance* is itself information.

---

## Exam tactics

- **Recognise before you solve.** Most puzzles in a real paper are one of the classics above
  with the numbers changed. If it looks familiar, recall the method rather than deriving it.
- **Budget 2 minutes.** Puzzles have poor marks-per-minute compared with seating arrangement
  or syllogism. Infosys gives a whole section, so pace across it rather than sinking into one.
- **Options are a shortcut.** For "how many minimum" questions, test the smallest option
  first — often it works and you are done.
- **Draw.** Every crossing, weighing and jug puzzle collapses the moment you draw the states.

---

## Traps

- The bridge puzzle: escorting with the fastest person gives 19, not 17. Send the two slowest
  together.
- The weighing puzzle: a balance has **three** outcomes, not two. Splitting into halves wastes
  a weighing.
- Grid puzzles: a rule that fits one row proves nothing. Test every complete row.
- The rope puzzle: the ropes burn **unevenly**, so you cannot measure 30 minutes by burning
  half a rope.
- Spending five minutes on a puzzle worth one mark.

---

## Checkpoints

- [ ] I can solve the 8-ball weighing and know a weighing has three outcomes
- [ ] I can measure 45 minutes with two unevenly burning ropes
- [ ] I know the three-bulbs-three-switches answer and why heat is the trick
- [ ] I can do the 3 L / 5 L jug puzzle to get 4 L
- [ ] I know the bridge crossing is 17 minutes and why 19 is the trap
- [ ] I know the binary trick for the 1000-bottles problem
- [ ] I know the one-question answer for truth-tellers and liars
- [ ] I test a candidate grid rule against every complete row before committing
- [ ] I know that another person's ignorance is information in deduction puzzles
- [ ] I budget 2 minutes per puzzle and abandon rather than sink the section
