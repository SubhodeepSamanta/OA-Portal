# Subscription Tiers

A software company is pricing its product. Market research has produced, for each of `n` prospective customers, the **most they are willing to pay** — customer `i` will buy at any price up to `w[i]`, and at no price above it.

Pricing has decided to launch **exactly `k` tiers**, each at a price of their choosing. Every tier offers the identical product; they differ only in price. Customers behave in the obvious self-interested way:

- a customer buys the **most expensive tier they can afford**, paying that tier's price
- a customer who cannot afford even the cheapest tier buys nothing

Since a customer buys the dearest tier within reach, setting a tier too low leaves money on the table from wealthy customers, while setting every tier high loses the budget end entirely.

Prices may be any positive integers, and two tiers may not share a price.

## Task

Choose `k` distinct prices to maximise **total revenue**, and report that revenue.

## Input

```
Line 1:  n  k
Line 2:  w[1] w[2] ... w[n]
```

## Output

A single integer: the maximum total revenue.

## Constraints

```
1  ≤  k  ≤  n  ≤  2000
1  ≤  k  ≤  30
1  ≤  w[i]  ≤  10^9
```

## Sample 1

**Input**
```
3 1
10 5 1
```

**Output**
```
10
```

**Explanation**

With one tier the choice is a single price.

| Price | Buyers | Revenue |
|---|---|---|
| 10 | the `10` customer | **10** |
| 5 | the `10` and `5` customers | 10 |
| 1 | all three | 3 |

Pricing at 10 or at 5 both yield 10, and nothing does better.

## Sample 2

**Input**
```
3 2
10 5 1
```

**Output**
```
15
```

**Explanation**

Launch tiers at 10 and 5. The `10` customer can afford both and takes the dearer, paying 10. The `5` customer takes the 5 tier. The `1` customer affords neither and buys nothing. Revenue `10 + 5 = 15`.

Adding a third-tier price of 1 would only bring in 1 more, but `k` is fixed at 2 here.

## Sample 3

**Input**
```
4 2
1 1 1 1
```

**Output**
```
4
```

**Explanation**

Every customer will pay at most 1. Whatever the second tier is priced at, nobody can afford it. All four buy the tier priced at 1, for **4**.

## Sample 4

**Input**
```
1 1
7
```

**Output**
```
7
```

## Notes

- A tier that nobody can afford simply earns nothing — it is never an error to have one.
- There is no reason to price a tier at anything other than exactly some customer's willingness to pay. Raising a tier above the weakest customer it serves loses that customer; lowering it below charges everyone in that group less than necessary.
- Once the customers are sorted, the set of buyers at each tier is a contiguous block. That is the observation the whole solution rests on.
- Read the bounds carefully. `n ≤ 2000` alongside `k ≤ 30` is telling you exactly which table is intended.
- Revenue reaches `2 · 10^12`; use 64-bit arithmetic.
