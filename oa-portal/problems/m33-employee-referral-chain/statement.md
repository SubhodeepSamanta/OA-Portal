# Employee Referral Chain

A company of `n` employees, numbered `1` through `n`, ran a referral scheme. Every employee named **exactly one** other employee as their referral — and some named themselves.

Start at an employee, jump to the person they referred, then to the person *that* person referred, and keep going forever. The set of people you land on is that employee's **chain**.

## Task

For every employee, report how many **distinct** people are on their chain, counting the employee themselves.

## Input

```
Line 1:  n
Line 2:  f[1] f[2] ... f[n]      f[i] is the person employee i referred
```

## Output

`n` integers separated by spaces: the chain size for employee `1`, then `2`, and so on.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  f[i]  ≤  n
```

Note that `f[i] = i` is allowed — an employee may name themselves.

## Sample 1

**Input**
```
5
2 3 1 3 4
```

**Output**
```
3 3 3 4 5
```

**Explanation**

Employees 1, 2 and 3 refer in a ring: `1 → 2 → 3 → 1`. Starting anywhere in that ring you visit all three and nobody else, so each has a chain of **3**.

Employee 4 refers 3, and from there the ring. Their chain is `{4, 3, 1, 2}` — **4** people.

Employee 5 refers 4, giving `{5, 4, 3, 1, 2}` — **5**.

## Sample 2

**Input**
```
3
1 2 3
```

**Output**
```
1 1 1
```

**Explanation**

Everyone named themselves, so every chain immediately loops on one person.

## Sample 3

**Input**
```
1
1
```

**Output**
```
1
```

## Sample 4

**Input**
```
6
2 1 2 3 6 5
```

**Output**
```
2 2 3 4 2 2
```

**Explanation**

Two separate rings, `1 ↔ 2` and `5 ↔ 6`, each of size 2. Employee 3 hangs off the first ring at distance 1, giving `1 + 2 = 3`; employee 4 hangs off employee 3, giving `2 + 2 = 4`. The second ring has nobody attached.

## Notes

- Every employee has exactly one outgoing arrow. That single fact fixes the shape of the whole picture: follow any chain and you must eventually repeat, so what you get is a set of rings, each with trees of employees feeding into it. Nothing else is possible.
- Once you see that shape, the answer for a ring member is just the size of their ring. And for anyone else it is *their distance to the ring* plus that ring's size — which is exactly one more than the answer of the person they referred.
- So the real work is: find the rings and their sizes, then push the answer outward along the trees. Both parts are linear.
- Walking each employee's chain separately is `O(n)` each and `O(n²)` overall — fine for the sample, hopeless at `2 · 10^5`.
- Chains can be `2 · 10^5` long. A recursive walk will overflow the stack on the test that is a single long tail; write the traversal iteratively.
- `f[i] = i` is a ring of size one, and it is easy to write code that either loops forever on it or reports `0`.
