# Trains, boats & streams

Two small topics that share one idea: **relative speed**. Both are formulaic enough that you can finish a question in 30 seconds.

---

# Part 1 — Trains

The only thing that makes trains different from cars: **a train has length**, so the distance it covers is not just the gap.

## The distance rule

| Situation | Distance covered |
|---|---|
| Train passes a **pole / man / point** | its own length **L** |
| Train passes a **platform / bridge / tunnel** | **L + length of platform** |
| Two trains cross each other | **L₁ + L₂** |

Speed is relative: **a + b** if opposite directions, **a − b** if same direction.

### Worked example — pole

*A 150 m train at 54 km/h passes a pole. Time?*

- 54 km/h = 54 × 5/18 = **15 m/s**
- 150 / 15 = **10 seconds**

### Worked example — platform

*The same train crosses a 300 m platform.*

- Distance = 150 + 300 = 450 m → 450 / 15 = **30 seconds**

### Worked example — two trains, opposite directions

*Trains of length 120 m and 180 m run at 42 km/h and 30 km/h towards each other. Time to cross?*

- Relative speed = 72 km/h = 72 × 5/18 = **20 m/s**
- Distance = 120 + 180 = 300 m → 300 / 20 = **15 seconds**

### Worked example — same direction

*Same trains, same direction.*

- Relative speed = 12 km/h = 12 × 5/18 = 10/3 m/s
- 300 / (10/3) = **90 seconds**

Same trains, six times longer — that is the point of the same/opposite distinction.

## Two useful results

**A train crosses a pole in t₁ s and a platform in t₂ s.** Then the platform's length is  
**L × (t₂ − t₁)/t₁**, where L is the train's length.

**Two trains cross a man in a and b seconds, and cross each other (opposite) in t seconds.**  
Then the ratio of their speeds is **(t − b) : (t − a)** — rarely needed, occasionally decisive.

---

# Part 2 — Boats & streams

Let **b** = speed of the boat in still water, **s** = speed of the stream.

> **Downstream speed = b + s**  (going with the current)
> **Upstream speed = b − s**  (going against it)

And reversing:

> **b = (downstream + upstream) / 2**
> **s = (downstream − upstream) / 2**

Those two lines answer most boat questions directly.

### Worked example

*A boat goes 20 km downstream in 2 hours and 12 km upstream in 3 hours. Find the speed of the boat and the stream.*

- Downstream = 20/2 = 10 km/h; upstream = 12/3 = 4 km/h
- b = (10 + 4)/2 = **7 km/h**; s = (10 − 4)/2 = **3 km/h**

### Worked example — round trip

*A man rows to a place 48 km away and back in 14 hours. He finds he can row 4 km with the stream in the same time as 3 km against it. Find his speed in still water.*

Take it in two steps.

- 4 km downstream takes the same time as 3 km upstream → 4/(b+s) = 3/(b−s)
- 4b − 4s = 3b + 3s → **b = 7s**
- Total time: 48/(b+s) + 48/(b−s) = 14 → 48/(8s) + 48/(6s) = 14
- 6/s + 8/s = 14 → 14/s = 14 → **s = 1**, so **b = 7 km/h**

### The round-trip formula

For a round trip over distance d each way:

> **total time = d/(b+s) + d/(b−s)**

and the **average speed for the round trip** is **(b² − s²) / b** — note it is always less than b.

---

## Practice set

#### Q1. A 180 m train running at 72 km/h crosses a pole. Time taken?

72 km/h = 20 m/s → 180/20 = **9 seconds**

#### Q2. The same train crosses a 220 m platform. Time?

Distance = 180 + 220 = 400 m → 400/20 = **20 seconds**

#### Q3. A train 150 m long passes a man walking at 6 km/h in the same direction in 10 seconds. Find the train's speed.

Relative speed = 150/10 = 15 m/s = 54 km/h.  
Same direction → train = 54 + 6 = **60 km/h**

#### Q4. The same train passes a man walking at 6 km/h in the opposite direction in 9 seconds. Find the train's speed.

Relative = 150/9 = 16.67 m/s = 60 km/h.  
Opposite → train = 60 − 6 = **54 km/h**

#### Q5. Two trains 140 m and 160 m long run at 60 km/h and 40 km/h in opposite directions. How long do they take to cross each other?

Relative = 100 km/h = 100 × 5/18 = 27.78 m/s. Distance = 300 m.  
300/27.78 = **10.8 seconds**

#### Q6. Same two trains, same direction?

Relative = 20 km/h = 5.56 m/s → 300/5.56 = **54 seconds**

#### Q7. A train crosses a pole in 12 seconds and a 200 m platform in 32 seconds. Find its length and speed.

The extra 20 seconds covers the 200 m platform → speed = 200/20 = 10 m/s = **36 km/h**  
Length = speed × pole time = 10 × 12 = **120 m**

#### Q8. A boat travels 30 km downstream in 2 hours and 18 km upstream in 3 hours. Find the speed of the boat and the stream.

Downstream = 15 km/h, upstream = 6 km/h.  
Boat = (15+6)/2 = **10.5 km/h**, stream = (15−6)/2 = **4.5 km/h**

#### Q9. A man can row 9 km/h in still water. It takes him twice as long to row upstream as downstream. Find the stream's speed.

Upstream time = 2 × downstream time → downstream speed = 2 × upstream speed.  
(9 + s) = 2(9 − s) → 9 + s = 18 − 2s → 3s = 9 → **s = 3 km/h**

#### Q10. A boat covers 24 km upstream and 36 km downstream in 6 hours. It also covers 36 km upstream and 24 km downstream in 6.5 hours. Find the speed of the boat and the stream.

Let 1/upstream = u, 1/downstream = d.  
24u + 36d = 6 … (i)  
36u + 24d = 6.5 … (ii)  
Add: 60u + 60d = 12.5 → u + d = 0.2083  
Subtract (i) from (ii): 12u − 12d = 0.5 → u − d = 0.04167 u = 0.125 → upstream = 8 km/h; d = 0.08333 → downstream = 12 km/h  
Boat = (12+8)/2 = **10 km/h**, stream = (12−8)/2 = **2 km/h**

#### Q11. A man rows to a place 48 km away and back in 14 hours. He can row 4 km downstream in the time he rows 3 km upstream. Find the stream's speed.

4/(b+s) = 3/(b−s) → 4b − 4s = 3b + 3s → b = 7s.  
48/(8s) + 48/(6s) = 14 → 6/s + 8/s = 14 → 14/s = 14 → **s = 1 km/h** (and b = 7 km/h)

#### Q12. A train travelling at 48 km/h completely crosses another train of half its length travelling in the opposite direction at 42 km/h in 12 seconds. It also passes a railway platform in 45 seconds. Find the platform's length.

Let the first train be L m; the second is L/2.  
Relative speed = 90 km/h = 25 m/s. In 12 s they cover 300 m = L + L/2 = 1.5L → **L = 200 m**  
First train's own speed = 48 km/h = 13.33 m/s. In 45 s it covers 600 m = L + platform  
Platform = 600 − 200 = **400 m**

---

## Traps

- Forgetting to add the platform length. A train "crossing a bridge" covers L + bridge.
- Forgetting the 5/18 conversion. Lengths are in metres and speeds usually in km/h.
- "Crosses a man **standing on the platform**" means a point — distance is L only, not
  L + platform.
- If a man is *walking*, he has a speed too: use relative speed against him.
- Upstream is b − s. If a question gives you upstream and downstream *times* rather than
  speeds, convert to speeds first.
- The stream speed s is never subtracted from a still-water *distance* — only from a speed.

---

## Checkpoints

- [ ] I know a train passing a pole covers only its own length
- [ ] I add the platform/bridge length, and add both train lengths when two trains cross
- [ ] I convert km/h to m/s with ×5/18 automatically in every train question
- [ ] I use a+b for opposite directions and a−b for the same direction
- [ ] I can find platform length from the pole time and the platform time
- [ ] I know downstream = b+s, upstream = b−s
- [ ] I can recover b and s from downstream and upstream speeds using the half-sum and half-difference
- [ ] I can set up a round-trip boat question with the total-time equation
