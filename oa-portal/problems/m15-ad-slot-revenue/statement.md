# Ad Slot Revenue

A radio station sells advertising in `n` slots laid out along the broadcast day, numbered `1` to `n` in time order. Slot `i` has been bid at `p[i]`.

Advertisers will not tolerate their spot running immediately beside another advert, so the scheduling rule is strict: **if you sell slot `i`, you cannot sell slot `i − 1` or slot `i + 1`.** Non-adjacent slots may all be sold freely.

Sales has negotiated one concession for the year. **Exactly once**, for a single slot of their choosing, they may **ignore the rule** — that is, one adjacent pair of slots may both be sold. The concession may be used at most once across the whole day, and it may be left unused.

## Task

Choose which slots to sell so that no two sold slots are adjacent, **except that at most one adjacent pair is permitted**. Report the **maximum total revenue**.

## Input

```
Line 1:  n
Line 2:  p[1] p[2] ... p[n]
```

## Output

A single integer: the maximum revenue.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
0  ≤  p[i]  ≤  10^9
```

## Sample 1

**Input**
```
4
1 9 8 1
```

**Output**
```
17
```

**Explanation**

Slots 2 and 3 bid 9 and 8 and sit next to each other. Spending the concession on that pair sells both for **17**.

Nothing can be added on top: slot 1 neighbours slot 2 and slot 4 neighbours slot 3, and taking either would create a *second* adjacent pair, which the single concession does not cover.

The alternatives are all worse — `{1, 2, 4}` gives `1 + 9 + 1 = 11` (one adjacent pair), `{2, 4}` gives 10, `{1, 3}` gives 9.

## Sample 2

**Input**
```
5
5 1 1 1 5
```

**Output**
```
11
```

**Explanation**

Selling slots 1, 3 and 5 respects the rule with no concession, totalling `5 + 1 + 5 = 11`. Using the concession anywhere would force dropping a `5`, so it is left unused.

## Sample 3

**Input**
```
1
7
```

**Output**
```
7
```

**Explanation**

One slot, no neighbours, no rule to break.

## Sample 4

**Input**
```
2
3 4
```

**Output**
```
7
```

**Explanation**

Two adjacent slots. Without the concession only one could be sold, for 4. Spending it takes both, for **7**.

## Notes

- The concession is optional. If no adjacent pair is worth taking, the answer is the ordinary no-two-adjacent maximum.
- It may be used **at most once** in total, not once per region.
- Bids may be `0`, and selling a zero-bid slot is allowed but never helps.
- Revenue reaches `2 · 10^14`; use 64-bit arithmetic.
- The ordinary version of this rule is a well-known one-pass problem. The concession adds exactly one bit of state — whether it has been spent yet.
