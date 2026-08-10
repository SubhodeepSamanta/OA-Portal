# Fair Share

`m` identical items are to be handed out among `n` people. Every item must go to somebody, and items cannot be split.

The distribution should be as even as possible: make the difference between the largest share and the smallest share as small as it can be.

## Task

Report the `n` shares, in **non-decreasing** order.

## Input

```
Line 1:  n  m
```

## Output

`n` integers on one line, separated by single spaces, in non-decreasing order.

## Constraints

```
1  ≤  n  ≤  10^5
1  ≤  m  ≤  10^18
```

## Sample 1

**Input**
```
3 10
```

**Output**
```
3 3 4
```

**Explanation**

Ten items among three people. Everyone gets at least 3, and the single item left over goes to one of them. The largest and smallest shares differ by 1, which is the best possible when the count does not divide evenly.

## Sample 2

**Input**
```
4 8
```

**Output**
```
2 2 2 2
```

**Explanation**

Eight divides evenly, so every share is equal and the difference is 0.

## Sample 3

**Input**
```
5 3
```

**Output**
```
0 0 1 1 1
```

**Explanation**

There are fewer items than people, so two people get nothing. A share of zero is perfectly legal — every *item* must be given out, but nobody is owed one.

## Sample 4

**Input**
```
1 1000000000000000000
```

**Output**
```
1000000000000000000
```

## Notes

- The answer is `m / n` for everybody, with the remainder handed out one extra item each to `m mod n` people. The difference is 0 when `n` divides `m`, and 1 otherwise — never more, because two people differing by 2 could be evened out by passing one item across.
- Because the output must be non-decreasing, print the `n − (m mod n)` smaller shares first and the `m mod n` larger ones after. Getting that order backwards is the whole difficulty of an otherwise simple problem.
- Do not simulate handing out items one at a time: `m` reaches `10^{18}`.
- `m` does not fit in a 32-bit integer, and neither does a share when `n` is small — Sample 4 is exactly that case. Read and print in 64-bit.
- `m < n` is normal, not an error, and produces shares of zero.
- `n` can be `10^5`, so build the output in one buffer rather than printing in a loop.
