# Kitchen Order Queue

A cloud kitchen has exactly **one** chef and takes `n` orders over the course of a shift. Order `i` is placed at minute `a[i]` and needs `c[i]` minutes of cooking in total.

The chef works minute by minute. At the start of every minute they may pick **any** order that has already been placed and is not yet finished, and cook it for that one minute. They are free to put a half-cooked order aside and come back to it later — switching costs nothing, and the same order does not have to be cooked in one continuous block. The chef never cooks two orders in the same minute, and never cooks an order before it has been placed.

An order's **completion time** is the clock reading at the end of the minute in which its last minute of cooking is done. (So an order placed at minute 1 and cooked straight through for 2 minutes completes at minute 3.)

## Task

Choose what to cook each minute so that the **sum of all `n` completion times** is as small as possible, and report that sum.

## Input

```
Line 1:       n
Next n lines: a[i]  c[i]
```

## Output

A single integer: the minimum possible total of all completion times.

## Constraints

```
1  ≤  n  ≤  10^5
1  ≤  a[i]  ≤  10^9
1  ≤  c[i]  ≤  10^6
```

Orders are **not** guaranteed to be listed in the order they were placed, and several orders may be placed in the same minute.

## Sample 1

**Input**
```
3
1 2
2 4
3 1
```

**Output**
```
15
```

**Explanation**

Cook order 1 during minute 1. At minute 2 order 2 arrives, but it needs 4 minutes against order 1's remaining 1, so stay on order 1 — it completes at **3**. Order 3 arrives at minute 3 and needs only 1 minute, so cook it next: it completes at **4**. Order 2 then runs from 4 to 8 and completes at **8**.

Total `3 + 4 + 8 = 15`.

## Sample 2

**Input**
```
1
5 3
```

**Output**
```
8
```

**Explanation**

Nothing to cook before minute 5; three minutes of work ends at minute 8.

## Sample 3

**Input**
```
4
1 5
2 1
3 1
4 1
```

**Output**
```
21
```

**Explanation**

The long order is set aside every time a one-minute order arrives. Completions land at 3, 4, 5 and finally 9 for the long one: `3 + 4 + 5 + 9 = 21`.

Cooking the 5-minute order straight through instead finishes it at 6 and pushes the three short ones to 7, 8 and 9 — a total of 30.

## Sample 4

**Input**
```
2
1 10
2 1
```

**Output**
```
15
```

**Explanation**

Start the 10-minute order at minute 1. When the 1-minute order arrives at minute 2, drop everything: it completes at **3**, and the long order resumes and completes at **12**.

## Notes

- Try the obvious rule first and find the input that kills it. "Always finish what you started" loses on Sample 3; "always cook the order placed earliest" loses on Sample 4.
- The only moments where your decision can possibly change are the moments something new arrives. Between two consecutive arrivals the chef has a fixed set of orders in front of them and no reason to switch.
- That gives you at most `2n` events, not `10^9` minutes. Simulating one minute at a time is correct but hopeless — `a[i]` reaches `10^9`.
- At each event you need the unfinished order with the **least remaining** time, and you have to be able to put a partially cooked order back. That is one data structure.
- The answer is a sum of up to `10^5` completion times, each up to about `10^11`. Use 64-bit arithmetic throughout.
