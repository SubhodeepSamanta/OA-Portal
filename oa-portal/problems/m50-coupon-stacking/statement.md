# Coupon Stacking

You are buying `n` items; item `i` costs `p[i]` **rupees**. You also hold `m` coupons; coupon `j` takes `d[j]` **percent** off the price of one item.

- each item may have **at most one** coupon applied,
- each coupon may be used **at most once**,
- you do not have to use every coupon.

Applying a coupon of `d` percent to an item costing `p` rupees leaves you paying `p − p·d/100` rupees.

Because that can be a fraction of a rupee, **report the total in paise**, where 1 rupee = 100 paise. An item costing `p` rupees with a `d` percent coupon therefore costs `100·p − p·d` paise, which is always a whole number.

## Task

Report the smallest total you can pay, in paise.

## Input

```
Line 1:  n  m
Line 2:  p[1] p[2] ... p[n]
Line 3:  d[1] d[2] ... d[m]      (this line is absent when m = 0)
```

## Output

A single integer: the minimum total spend, in paise.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  m  ≤  2 · 10^5
1  ≤  p[i]  ≤  10^9
1  ≤  d[j]  ≤  100
```

## Sample 1

**Input**
```
3 2
100 200 300
50 10
```

**Output**
```
43000
```

**Explanation**

Put the 50% coupon on the 300-rupee item (paying 150) and the 10% coupon on the 200-rupee item (paying 180). With the untouched 100-rupee item that is 430 rupees, or **43000 paise**.

Swapping the coupons would cost `300 − 30 = 270` plus `200 − 100 = 100` plus 100, which is 470 rupees — worse.

## Sample 2

**Input**
```
2 0
10 20
```

**Output**
```
3000
```

**Explanation**

No coupons at all, so the third input line is simply not there. 30 rupees is **3000 paise**.

## Sample 3

**Input**
```
1 3
100
100 1 1
```

**Output**
```
0
```

**Explanation**

More coupons than items. Use the 100% one and the rest go to waste.

## Sample 4

**Input**
```
2 3
10 100
30 70 5
```

**Output**
```
3700
```

**Explanation**

The best two coupons are 70% and 30%. Put 70% on the 100-rupee item and 30% on the 10-rupee one: `30 + 7 = 37` rupees, or **3700 paise**.

## Notes

- Since you keep `100·p − p·d` paise for a coupon of `d` on price `p`, the total you pay is `100 · Σp` minus `Σ p·d` over the pairs you make. The prices are fixed, so **minimising the spend is exactly maximising `Σ p·d`**. Get that reframing down first — everything else follows from it.
- Every coupon is worth using (`d ≥ 1` and `p ≥ 1`, so every pairing saves something), so you will always make `min(n, m)` pairs, using the largest discounts on the most expensive items.
- Which pairing maximises `Σ p·d` is the rearrangement inequality: sort both lists descending and pair them off in order. Convince yourself with the two-element case — if `p₁ > p₂` and `d₁ > d₂` then `p₁d₁ + p₂d₂ ≥ p₁d₂ + p₂d₁`, because the difference is `(p₁ − p₂)(d₁ − d₂) ≥ 0` — and note that any crossed pairing can be uncrossed one swap at a time without ever getting worse.
- The paise framing is not decoration; it removes rounding from the problem entirely. Compute in paise throughout rather than dividing by 100 anywhere.
- `100 · Σp` reaches `100 × 2·10^5 × 10^9 = 2·10^{16}`, so 64-bit arithmetic is required even before any coupon is applied.
- `m` may be `0`, and then the third line does not exist at all — read it accordingly.
