# Cohort Bucketing

A study has `n` patients, each with an integer risk score. The scores are to be divided into `k` **contiguous score ranges**, and every patient falls into the range containing their score.

Because the split is by *score*, two patients with the **same score always land in the same bucket** — you cannot separate them.

The ranges must together cover every score present, and a range may end up with no patients at all.

## Task

Choose the ranges so that the bucket holding the **most patients** holds as few as possible, and report that number.

## Input

```
Line 1:  n  k
Line 2:  the n scores, in no particular order
```

## Output

A single integer: the size of the largest bucket, minimised.

## Constraints

```
1  ≤  k  ≤  n  ≤  2 · 10^5
1  ≤  score  ≤  10^9
```

## Sample 1

**Input**
```
6 2
1 1 2 3 3 3
```

**Output**
```
3
```

**Explanation**

Sorted, the distinct scores are 1, 2 and 3, holding 2, 1 and 3 patients. Cutting the score axis into two ranges gives either `{1,2}` and `{3}` — buckets of 3 and 3 — or `{1}` and `{2,3}` — buckets of 2 and 4. The first is better, so the answer is **3**.

Note that no split can beat 3: all three patients scoring 3 must stay together.

## Sample 2

**Input**
```
4 1
1 2 3 4
```

**Output**
```
4
```

## Sample 3

**Input**
```
5 5
7 7 7 7 7
```

**Output**
```
5
```

**Explanation**

Five buckets are allowed, but every patient has the same score, so they cannot be separated. Four buckets end up empty.

## Sample 4

**Input**
```
6 3
1 2 3 4 5 6
```

**Output**
```
2
```

## Notes

- The tempting reading — "split the `n` patients into `k` groups of roughly equal size" — is wrong, and Sample 3 is the shortest proof. Patients are not free to be moved individually; a score is indivisible.
- So collapse the input first: sort the distinct scores and count how many patients sit on each. The problem becomes "cut this list of counts into `k` consecutive pieces, minimising the largest piece total" — the counts, not the patients, are what you are splitting.
- If there are fewer than `k` distinct scores, some ranges must go empty and the answer is simply the largest single count.
- Now the familiar move: rather than searching for the best split directly, test a candidate. "Can the largest piece be held to `X`?" is answered by one greedy pass — walk the counts, starting a new piece whenever adding the next count would exceed `X`, and see whether you used at most `k` pieces.
- That test is monotone in `X`, so binary search it. The answer lies between the largest single count and the total.
- Answers are at most `n`, so nothing overflows here — but the running piece total should still be a type that holds `2 · 10^5` comfortably.
