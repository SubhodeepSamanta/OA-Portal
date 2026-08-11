# Direction sense

The easiest topic in the reasoning section. Draw the path, apply Pythagoras, done. Expect  
1–2 questions, and expect to get them right.

## The setup

Always draw with **North at the top**:

```
              N
              |
       W ---- + ---- E
              |
              S
```

**Left and right depend on which way you are facing.** This is the only thing that makes the topic non-trivial.

| Facing | Left turn faces | Right turn faces |
|---|---|---|
| North | West | East |
| South | East | West |
| East | North | South |
| West | South | North |

**The shortcut:** a **left turn is anticlockwise**, a **right turn is clockwise**. Rotate the compass in your head rather than memorising the table.

---

## Worked example — a simple path

*A man walks 5 km North, then turns right and walks 3 km, then turns right and walks 5 km.  
How far is he from the start and in which direction?*

Draw it:
- 5 km North
- Turn right (facing North → now East), 3 km East
- Turn right (facing East → now South), 5 km South

The 5 North and 5 South cancel. He is **3 km East** of his start.

---

## Worked example — shortest distance

*A person walks 4 km East, then 3 km North. How far is he from the starting point?*

- The path is a right angle → use Pythagoras
- √(4² + 3²) = √25 = **5 km**, in the **North-East** direction

**This is why the Pythagorean triples matter.** (3,4,5), (5,12,13), (8,15,17), (7,24,25) — direction questions are built almost exclusively on these so that the answer is a whole number.

---

## Worked example — a longer path

*Starting from home, Rakesh walks 10 m North, turns left and walks 6 m, turns left and walks  
4 m, then turns left and walks 6 m. Where is he relative to home?*

Track coordinates from (0,0), with North = +y and East = +x:

| Step | Facing | Move | Position |
|---|---|---|---|
| Start | North | — | (0, 0) |
| 10 m | North | +10 y | (0, 10) |
| left → West, 6 m | West | −6 x | (−6, 10) |
| left → South, 4 m | South | −4 y | (−6, 6) |
| left → East, 6 m | East | +6 x | (0, 6) |

Final position (0, 6) → **6 m North of home**.

> **The coordinate method is the reliable one.** Set North = +y, East = +x, and track (x, y)
> after every leg. It never goes wrong, and it is faster than redrawing.

---

## Shadows — the one fact you need

- **Sunrise is in the East**, so in the **morning** shadows fall towards the **West**.
- **Sunset is in the West**, so in the **evening** shadows fall towards the **East**.
- At noon the sun is overhead and there is effectively no directional shadow.

### Worked example

*One morning, Suresh's shadow fell to his left. Which direction was he facing?*

Work in two fixed steps, in this order:

- **Step 1 — where does the shadow point?** It is morning, so the sun is in the East and
  every shadow points **West**.
- **Step 2 — whose left is West?** From the turn table: facing **North**, your left is West.

So he was facing **North**.

Do it in this order every time. Deducing the facing first and then trying to place the shadow is how these questions are designed to trip you.

---

## Degrees of turn

- A **half turn / about turn** = 180°
- Turning **45°** puts you on a diagonal: North + 45° right = **North-East**
- Three consecutive right turns = one left turn

---

## Practice set

#### Q1. A man walks 3 km North, then 4 km East. How far is he from the start?

√(9 + 16) = **5 km**, in the North-East direction.

#### Q2. A man walks 5 km South, turns left and walks 5 km, turns left and walks 5 km. Where is he?

5 South → facing South, left = East → 5 East → left = North → 5 North.  
The South and North cancel → **5 km East of the start**.

#### Q3. Ravi walks 10 m West, turns right and walks 6 m, turns right and walks 10 m, turns left and walks 4 m. Where is he relative to the start?

Coordinates from (0,0), West = −x, North = +y:
- 10 W → (−10, 0)
- right (facing W → N), 6 → (−10, 6)
- right (facing N → E), 10 → (0, 6)
- left (facing E → N), 4 → (0, 10)
**10 m North of the start.**

#### Q4. A person facing North turns 135° clockwise, then 180° anticlockwise. Which direction is he facing?

North + 135° clockwise = South-East. South-East − 180° = **North-West**.

#### Q5. A car travels 20 km East, then 15 km North, then 20 km West. How far is it from the start?

The East and West cancel → **15 km North**.

#### Q6. A man walks 8 km North, 6 km East, 12 km South. Find his distance from the start.

Net vertical = 8 − 12 = 4 km South. Net horizontal = 6 km East.  
√(16 + 36) = √52 ≈ **7.21 km**, South-East.

#### Q7. Two men start from the same point. A walks 5 km North, B walks 12 km East. How far apart are they?

√(25 + 144) = √169 = **13 km** *(a 5-12-13 triple)*

#### Q8. One evening, a boy's shadow fell exactly to his right. Which direction was he facing?

Evening sun is in the West, so shadows point **East**. If East is on his right, he faces  
**North**.

#### Q9. One morning, Ram was facing the sun. He walked forward 5 km, turned right and walked 3 km. Which direction is he now facing?

Morning sun is East, so he faced East. Turning right from East → **South**.

#### Q10. A man walks 4 km towards North, turns right and walks 3 km, then turns right and walks 4 km, then turns left and walks 3 km. How far and in which direction from the start?

- 4 N → (0, 4)
- right (N → E), 3 → (3, 4)
- right (E → S), 4 → (3, 0)
- left (S → E), 3 → (6, 0)
**6 km East of the start.**

#### Q11. A room's door faces East. A man enters walking backwards, turns right and walks straight. Which direction is he walking?

Entering a door that faces East means walking **West**; walking backwards means his body faces **East** while moving West. Turning right from a facing of East gives **South**.

#### Q12. If South-East becomes North, and North-East becomes West, what does West become?

Each direction rotates 135° anticlockwise. West rotated 135° anticlockwise → **South-East**.

---

## Traps

- Left and right are **relative to the direction of travel**, never to the page.
- "Turns to his left" and "turns towards the left of the original direction" are different —
  the first is relative to current facing.
- Displacement is the **straight-line** distance from start to finish, not the total walked.
- North-East is not "North then East" as an answer — it is the 45° diagonal. Only give a
  diagonal when the two components are equal.
- Shadow questions: fix the shadow's compass direction first, then deduce the facing.
- If a question gives distances like 8 and 15, expect the answer 17 — recognise the triple
  rather than computing √289.

---

## Checkpoints

- [ ] I draw with North up and track left as anticlockwise, right as clockwise
- [ ] I use the coordinate method (North = +y, East = +x) for anything longer than three legs
- [ ] I compute displacement with Pythagoras, not by adding the distances walked
- [ ] I recognise the common Pythagorean triples on sight
- [ ] I know morning shadows point West and evening shadows point East
- [ ] I fix the shadow's direction first and deduce the person's facing from it
- [ ] I only answer with a diagonal direction when the two components are equal
