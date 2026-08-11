# Geometry & mensuration

Low weightage (~3% combined) but almost entirely formula recall, so it is cheap marks if you have the table and expensive if you do not. Learn the formulas; skip the proofs.

## What gets asked

1. Area / perimeter of a plane figure
2. Volume / surface area of a solid
3. Triangle properties (Pythagoras, similarity)
4. Circles: tangents, sectors, arcs
5. "What happens to the area if the radius doubles" — scaling

---

## Plane figures

| Shape | Area | Perimeter |
|---|---|---|
| Square (side a) | a² | 4a |
| Rectangle (l, b) | l × b | 2(l + b) |
| Triangle (base b, height h) | ½ b h | a + b + c |
| Equilateral triangle (side a) | (√3/4) a² | 3a |
| Parallelogram | base × height | 2(a + b) |
| Rhombus (diagonals d₁, d₂) | ½ d₁ d₂ | 4a |
| Trapezium (parallel a, b; height h) | ½ (a + b) h | sum of sides |
| Circle (radius r) | π r² | 2π r |

**Heron's formula** for a triangle with sides a, b, c:  
s = (a+b+c)/2, **Area = √[s(s−a)(s−b)(s−c)]**

**Diagonal of a square** = a√2. **Diagonal of a rectangle** = √(l² + b²).

---

## Solids

| Solid | Volume | Curved / lateral SA | Total SA |
|---|---|---|---|
| Cube (a) | a³ | 4a² | 6a² |
| Cuboid (l,b,h) | lbh | 2h(l+b) | 2(lb + bh + hl) |
| Cylinder (r, h) | π r² h | 2π r h | 2π r(r + h) |
| Cone (r, h, slant l) | ⅓ π r² h | π r l | π r(r + l) |
| Sphere (r) | (4/3) π r³ | — | 4π r² |
| Hemisphere (r) | (2/3) π r³ | 2π r² | 3π r² |

**Cone slant height:** l = √(r² + h²)  
**Diagonal of a cuboid:** √(l² + b² + h²)

---

## The scaling rule — worth more than any single formula

If every linear dimension is multiplied by k:

> **lengths × k, areas × k², volumes × k³**

### Worked example

*If the radius of a sphere is doubled, by what percentage does its volume increase?*

- Volume × 2³ = 8× → an increase of **700%** (not 800% — it *becomes* 8 times, so it
  *increases* by 7 times).

### Worked example

*The side of a square is increased by 20%. Increase in area?*

- Area × (1.2)² = 1.44 → **44% increase**

This is a percentage question dressed as geometry, and it is asked constantly.

---

## Triangles

**Pythagoras:** a² + b² = c² for a right triangle.

**Triples worth recognising instantly:** (3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41) — and any multiple of them, so (6,8,10) and (9,12,15) too.

**Similar triangles:** corresponding angles equal → sides in proportion → **areas in the ratio of the squares of corresponding sides**.

### Worked example

*Two similar triangles have sides in the ratio 3 : 5. Ratio of their areas?*

- **9 : 25**

**Special centres:**

| Centre | Meeting point of |
|---|---|
| Centroid | medians (divides each 2 : 1 from the vertex) |
| Incentre | angle bisectors |
| Circumcentre | perpendicular bisectors of the sides |
| Orthocentre | altitudes |

**Angle sum** of a triangle = 180°; of a quadrilateral = 360°; of an n-sided polygon =  
**(n − 2) × 180°**. Each exterior angle of a regular n-gon = **360°/n**.

---

## Circles

- **Sector area** = (θ/360) × π r²; **arc length** = (θ/360) × 2π r
- **Angle at the centre = twice the angle at the circumference** on the same arc
- **Angle in a semicircle = 90°**
- A **tangent** is perpendicular to the radius at the point of contact
- Tangents from an external point are **equal in length**

### Worked example

*Area of a sector of radius 14 cm subtending 90° at the centre.*

- (90/360) × π × 14² = ¼ × (22/7) × 196 = ¼ × 616 = **154 cm²**

> Use **π = 22/7** whenever the radius is a multiple of 7 — it cancels and the answer comes
> out whole. Otherwise use 3.14.

---

## Coordinate geometry

> **Distance** between (x₁,y₁) and (x₂,y₂) = √[(x₂−x₁)² + (y₂−y₁)²]
> **Midpoint** = ((x₁+x₂)/2, (y₁+y₂)/2)
> **Slope** m = (y₂−y₁)/(x₂−x₁)
> **Line:** y = mx + c
> Parallel lines: equal slopes. Perpendicular lines: **m₁ × m₂ = −1**

---

## Practice set

#### Q1. Find the area of a triangle with sides 13, 14 and 15 cm.

s = 21 → √[21 × 8 × 7 × 6] = √7056 = **84 cm²**

#### Q2. The area of an equilateral triangle of side 12 cm?

(√3/4) × 144 = **36√3 ≈ 62.35 cm²**

#### Q3. A rectangle is 24 m by 10 m. Find its diagonal.

√(576 + 100) = √676 = **26 m** *(a 5-12-13 triple doubled)*

#### Q4. The perimeter of a square is 64 cm. Find its area and diagonal.

Side = 16 → area = **256 cm²**, diagonal = 16√2 ≈ **22.63 cm**

#### Q5. Find the area of a circle whose circumference is 44 cm.

2πr = 44 → r = 44 × 7/(2 × 22) = 7 cm → area = (22/7) × 49 = **154 cm²**

#### Q6. A wire bent into a square of side 22 cm is re-bent into a circle. Find the circle's radius.

Perimeter = 88 cm = 2πr → r = 88 × 7/(2 × 22) = **14 cm**

#### Q7. The radius of a cylinder is 7 cm and its height 20 cm. Find its volume, CSA and TSA.

Volume = (22/7) × 49 × 20 = **3,080 cm³**  
CSA = 2 × (22/7) × 7 × 20 = **880 cm²**  
TSA = 880 + 2 × 154 = **1,188 cm²**

#### Q8. A cone has radius 6 cm and height 8 cm. Find its slant height, volume and CSA.

l = √(36 + 64) = **10 cm**  
Volume = ⅓ × 3.14 × 36 × 8 = **301.44 cm³**  
CSA = 3.14 × 6 × 10 = **188.4 cm²**

#### Q9. The volume of a sphere is 38808 cm³. Find its radius. (π = 22/7)

(4/3)(22/7)r³ = 38808 → r³ = 38808 × 21 / 88 = 9261 → **r = 21 cm**

#### Q10. If the radius of a circle is increased by 20%, find the percentage increase in area.

Area scales by k² = 1.44 → **44% increase**

#### Q11. If each edge of a cube is doubled, by what percentage does its surface area increase?

Surface scales by k² = 4 → it becomes 4 times → **300% increase**

#### Q12. Two similar triangles have areas 81 cm² and 144 cm². If the smaller has a side of 9 cm, find the corresponding side of the larger.

Area ratio 81 : 144 → side ratio 9 : 12 = 3 : 4  
Side = 9 × 4/3 = **12 cm**

#### Q13. Find the interior angle of a regular octagon.

Sum = (8 − 2) × 180 = 1080 → each = 1080/8 = **135°**

#### Q14. A sector of a circle of radius 21 cm subtends 120°. Find its area and arc length.

Area = (120/360) × (22/7) × 441 = ⅓ × 1386 = **462 cm²**  
Arc = (120/360) × 2 × (22/7) × 21 = ⅓ × 132 = **44 cm**

#### Q15. Find the distance between (3, 4) and (−3, −4), and the slope of the line joining them.

Distance = √(36 + 64) = **10**  
Slope = (−4 − 4)/(−3 − 3) = −8/−6 = **4/3**

#### Q16. A room is 8 m × 6 m × 4 m. Find the length of the longest rod that fits inside.

Space diagonal = √(64 + 36 + 16) = √116 ≈ **10.77 m**

---

## Traps

- **Curved surface area vs total surface area.** A cylinder's CSA is 2πrh; the TSA adds the
  two circular ends. Read which one is asked.
- A cone's formulas use the **slant** height l for surface area but the **vertical** height h
  for volume. Compute l = √(r²+h²) first.
- "Increases by 700%" vs "becomes 8 times" — these are the same thing stated two ways.
- Units: if a volume is asked in litres, remember 1 m³ = 1000 litres and 1 litre = 1000 cm³.
- Hemisphere TSA is 3πr², not 2πr² — the flat circular face counts.
- The area ratio of similar figures is the **square** of the side ratio, not the side ratio.

---

## Checkpoints

- [ ] I know the plane-figure area and perimeter table
- [ ] I know Heron's formula and the equilateral-triangle area
- [ ] I know volume, CSA and TSA for cube, cuboid, cylinder, cone, sphere and hemisphere
- [ ] I compute a cone's slant height before touching its surface area
- [ ] I know the k, k², k³ scaling rule and can apply it to percentage-change questions
- [ ] I recognise the common Pythagorean triples on sight
- [ ] I know similar triangles have areas in the ratio of the squares of their sides
- [ ] I know sector area and arc length, and use π = 22/7 when the radius is a multiple of 7
- [ ] I know the polygon angle-sum formula and the exterior angle 360/n
- [ ] I know the distance, midpoint and slope formulas and the perpendicular condition
