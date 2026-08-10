# Lucky Token Count

A raffle issues tokens numbered `1` through `N`. A token is **lucky** when its digits add up to exactly `s`.

## Task

Report how many lucky tokens were issued, **modulo `10^9 + 7`**.

## Input

```
Line 1:  N  s
```

## Output

A single integer: the count of lucky tokens, modulo `10^9 + 7`.

## Constraints

```
1  ≤  N  ≤  10^18
1  ≤  s  ≤  162
```

## Sample 1

**Input**
```
20 2
```

**Output**
```
3
```

**Explanation**

Tokens 2, 11 and 20 have digits summing to 2.

## Sample 2

**Input**
```
9 9
```

**Output**
```
1
```

## Sample 3

**Input**
```
100 1
```

**Output**
```
3
```

**Explanation**

1, 10 and 100.

## Sample 4

**Input**
```
1000000000000000000 1
```

**Output**
```
19
```

**Explanation**

Only the powers of ten qualify: `1, 10, 100, …, 10^18`. That is 19 tokens, and checking them one at a time would mean walking through a quintillion numbers.

## Notes

- `N` reaches `10^18`, so nothing that visits each token can work. What saves you is that a token's luckiness depends only on its **digits**, and there are just 19 of those.
- Build the number digit by digit, most significant first, and carry only what you still need to know: how many positions are left, how much of `s` you have used, and whether the prefix so far is still exactly equal to `N`'s prefix. That last flag is what keeps you inside the range — while it holds, the next digit is capped by `N`'s digit; once you go below, every later digit is free from 0 to 9.
- The number of distinct states is tiny — 19 positions by 163 sums by 2 flags — so memoise on those three and the whole count falls out in a few thousand steps.
- Prune as soon as the running sum passes `s`; nothing below can recover.
- Leading zeros need no special handling here, because a zero digit adds nothing to a digit sum. Token 0 is not issued, but with `s ≥ 1` it would never be counted anyway.
- `s` can exceed any achievable digit sum — 19 digits cap out at 171, and `N`'s own shape caps it lower — in which case the answer is simply `0`. Do not assume a solution exists.
- Take the modulus as you add; the raw count reaches `10^18` and the reduced one is what is being asked for.
