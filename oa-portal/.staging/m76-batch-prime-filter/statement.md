# Batch Prime Filter

A key-generation service screens candidate values. It is asked `q` questions, each giving a range `[l, r]`.

## Task

For each question, report how many prime numbers lie in `[l, r]`, inclusive.

## Input

```
Line 1:       q
Next q lines: l  r
```

## Output

`q` lines, one count each.

## Constraints

```
1  ≤  q  ≤  2 · 10^5
1  ≤  l  ≤  r  ≤  10^6
```

## Sample 1

**Input**
```
3
1 10
2 2
1 1
```

**Output**
```
4
1
0
```

**Explanation**

The primes up to 10 are 2, 3, 5 and 7. The range `[2,2]` holds the single prime 2. The range `[1,1]` holds none — **1 is not prime**.

## Sample 2

**Input**
```
1
1 1000000
```

**Output**
```
78498
```

**Explanation**

There are 78498 primes below a million.

## Sample 3

**Input**
```
2
999983 1000000
4 4
```

**Output**
```
1
0
```

**Explanation**

999983 is the largest prime under a million, and nothing above it in range qualifies.

## Notes

- Testing each number for primality per question is far too slow: `2 · 10^5` questions over ranges of up to `10^6` numbers is `2 · 10^{11}` tests in the worst case.
- The ranges all live inside a fixed, small universe, so do the work **once**: sieve every number up to `10^6`, then build a running count of how many primes are at or below each value. Each question is then a single subtraction, `count[r] − count[l−1]`.
- Watch `l = 1`, where `l − 1` is `0` — your running count needs an entry there, which is why it is natural to index it from `0`.
- The sieve itself has two classic slips: **1 is not prime**, and the inner loop should start at `i · i` rather than `2i`, since smaller multiples already have a smaller factor.
- Sieving to `10^6` takes a few milliseconds and a megabyte; there is no need for anything cleverer, and a segmented sieve would be more code for no gain at this bound.
- Answers fit easily in 32 bits, but with `2 · 10^5` lines of output it is still worth building one buffer rather than printing in a loop.
