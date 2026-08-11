# Pseudocode & output questions

**A full section at Infosys (30 min) and Capgemini (25 questions). Accenture asks 18.** For  
Capgemini it is the *largest* scored technical block, because there is no quant section at all. This is the highest-priority sheet in the CS track for anyone targeting those three.

## What the questions look like

You are shown 8–20 lines of pseudocode and asked: **what does it print?** Occasionally: what is the time complexity, or which line has the bug.

They are not hard. They are **easy to get wrong quickly**, which is the point.

---

## The method: trace with a table

The single technique that matters. Never trace in your head.

Draw one column per variable, one row per iteration, and update mechanically.

### Worked example

```
Integer a = 5, b = 2, c
c = a / b
Print c
```

- Many pseudocode dialects use **integer division** when both operands are integers.
- 5 / 2 = **2**, not 2.5.

> **Always check the declared type.** `Integer` division truncates. This is the most common
> single trick in the whole section.

### Worked example — a loop

```
Integer i, sum = 0
for (i = 1; i <= 5; i++)
    sum = sum + i
Print sum
```

| i | sum after |
|---|---|
| 1 | 1 |
| 2 | 3 |
| 3 | 6 |
| 4 | 10 |
| 5 | 15 |
| 6 | loop exits |

**Output: 15**

### Worked example — a nested loop

```
Integer i, j, count = 0
for (i = 1; i <= 3; i++)
    for (j = i; j <= 3; j++)
        count = count + 1
Print count
```

- i = 1 → j runs 1,2,3 → 3 iterations
- i = 2 → j runs 2,3 → 2 iterations
- i = 3 → j runs 3 → 1 iteration

**Output: 6.** Note `j = i`, not `j = 1` — the inner loop's start depends on the outer
variable. Read the initialiser every time.

---

## Pre- vs post-increment

The difference that decides a large share of these questions.

| Expression | Meaning |
|---|---|
| `++a` | increment **first**, then use the value |
| `a++` | use the current value, **then** increment |

```
Integer a = 5, b
b = a++          // b = 5, a becomes 6
Print a, b       // 6, 5

Integer x = 5, y
y = ++x          // x becomes 6, y = 6
Print x, y       // 6, 6
```

### A harder one

```
Integer a = 5
Print a++ + ++a
```

- `a++` yields 5, then a = 6
- `++a` makes a = 7, yields 7
- 5 + 7 = **12**

---

## Reference vs value

```
Function modify(Integer x)
    x = x + 10
End Function

Integer a = 5
modify(a)
Print a
```

**Output: 5** — passed by value, so the original is unchanged.

But with a reference marker (often written `&x`, `ref x`, or noted in the question):

```
Function modify(Integer &x)
    x = x + 10
End Function
```

**Output: 15** — passed by reference.

> Look for `&` or the word "reference" in the signature. Its presence or absence is the whole
> question.

---

## Arrays

Watch the **indexing base**. Most pseudocode is 0-based; some questions are 1-based and will say so.

```
Integer arr[5] = {10, 20, 30, 40, 50}
Integer i, sum = 0
for (i = 0; i < 5; i++)
    if (i % 2 == 0)
        sum = sum + arr[i]
Print sum
```

- i = 0 → arr[0] = 10 ✓
- i = 1 → skipped
- i = 2 → arr[2] = 30 ✓
- i = 3 → skipped
- i = 4 → arr[4] = 50 ✓

**Output: 90**

---

## Recursion

Trace the call stack. Write each call and unwind from the base case.

```
Function f(Integer n)
    if (n <= 1) return 1
    return n * f(n - 1)
End Function
Print f(4)
```

- f(4) = 4 × f(3)
- f(3) = 3 × f(2)
- f(2) = 2 × f(1)
- f(1) = 1 ← base case

Unwind: f(2) = 2, f(3) = 6, f(4) = **24**

### Fibonacci-style

```
Function fib(Integer n)
    if (n <= 1) return n
    return fib(n-1) + fib(n-2)
End Function
Print fib(5)
```

fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, **fib(5)=5**

Build the sequence upward rather than expanding the tree — far faster and less error-prone.

---

## Operator precedence

Highest to lowest:

```
()                          parentheses
++  --  !                   unary
*  /  %                     multiplicative
+  -                        additive
<  <=  >  >=                relational
==  !=                      equality
&&                          logical AND
||                          logical OR
=  +=  -=                   assignment
```

```
Integer r = 2 + 3 * 4      // 14, not 20
Integer s = 10 % 3 + 2     // 1 + 2 = 3
```

**Short-circuit evaluation:** in `a && b`, if `a` is false, `b` is never evaluated. In  
`a || b`, if `a` is true, `b` is never evaluated. Questions exploit this when `b` has a side effect:

```
Integer a = 0, b = 5
if (a != 0 && b++ > 0)
    Print "yes"
Print b
```

`a != 0` is false, so `b++` never runs → **b is still 5**.

---

## The trap list

These are, in order, the things that actually cost marks:

1. **Integer division truncating** — 7/2 = 3
2. **Off-by-one in loops** — `i < n` runs n times, `i <= n` runs n+1 times
3. **Pre- vs post-increment**
4. **`=` vs `==`** — a single `=` is assignment, and `if (x = 5)` assigns and is truthy
5. **Missing braces** — without them, only the *first* statement is in the loop body
6. **Nested loop initialisers** — `j = i` versus `j = 1`
7. **Pass by value vs reference**
8. **Array index base** — 0 or 1
9. **Short-circuit evaluation** skipping a side effect
10. **Modulo with negatives** — implementation-dependent; read the options

### The missing-braces trap

```
for (i = 0; i < 3; i++)
    Print i
    Print "done"
```

Only `Print i` is inside the loop. Output: `0 1 2 done` — "done" prints **once**.

---

## Time complexity in pseudocode

| Structure | Complexity |
|---|---|
| Single loop to n | O(n) |
| Two nested loops to n | O(n²) |
| Loop with `i = i * 2` | O(log n) |
| Nested loop where inner depends on outer (`j = i`) | still O(n²) |
| Two sequential loops | O(n), not O(n²) |
| Recursion halving the input | O(log n) |

> **Sequential loops add; nested loops multiply.** That one line answers most complexity
> MCQs.

---

## Exam technique

- **Budget 60–75 seconds per question.** Capgemini gives 25 questions in 25 minutes.
- **Trace on paper.** The rough sheet exists for this.
- If the code is long, **check the options first** — often they differ only in the last
  value, so you need only trace the final iteration.
- If you are lost after 90 seconds, guess and move. No negative marking.

---

## Practice set

#### Q1.

```
Integer a = 10, b = 3
Print a / b, a % b
```
Integer division truncates; % gives the remainder.

**Output: 3, 1**

#### Q2.

```
Integer i, s = 0
for (i = 1; i < 5; i++)
    s = s + i * i
Print s
```
1 + 4 + 9 + 16 = **30** *(i stops at 4, not 5)*

#### Q3.

```
Integer x = 3, y
y = x++ * 2
Print x, y
```
`x++` yields 3 (then x becomes 4), so y = 6.

**Output: 4, 6**

#### Q4.

```
Integer a = 2, b = 3
a = a + b
b = a - b
a = a - b
Print a, b
```
a=5; b=5−3=2; a=5−2=3. This is the classic **swap without a temp variable**.

**Output: 3, 2**

#### Q5.

```
Integer n = 5, f = 1, i
for (i = n; i > 1; i--)
    f = f * i
Print f
```
5×4×3×2 = **120**

#### Q6.

```
Integer i, j
for (i = 1; i <= 3; i++)
    for (j = 1; j <= 2; j++)
        Print i * j
```
i=1: 1, 2 · i=2: 2, 4 · i=3: 3, 6

**Output: 1 2 2 4 3 6**

#### Q7.

```
Integer arr[6] = {3, 7, 2, 9, 4, 1}
Integer i, max = arr[0]
for (i = 1; i < 6; i++)
    if (arr[i] > max)
        max = arr[i]
Print max
```

**Output: 9**

#### Q8.

```
Integer n = 1234, r = 0
while (n > 0)
    r = r * 10 + n % 10
    n = n / 10
Print r
```
Extracts digits from the right and rebuilds — this **reverses the number**.

**Output: 4321**

#### Q9.

```
Integer n = 153, t = n, s = 0, d
while (t > 0)
    d = t % 10
    s = s + d * d * d
    t = t / 10
if (s == n) Print "Yes" else Print "No"
```
1 + 125 + 27 = 153 → an **Armstrong number**.

**Output: Yes**

#### Q10.

```
Function f(Integer n)
    if (n == 0) return 0
    return n + f(n - 1)
End Function
Print f(5)
```
5+4+3+2+1+0 = **15**

#### Q11.

```
Integer a = 5, b = 0
if (b != 0 && a / b > 1)
    Print "yes"
else
    Print "no"
```
Short-circuit: `b != 0` is false, so `a / b` is never evaluated — **no division by zero**.

**Output: no**

#### Q12.

```
Integer i = 0
while (i < 3)
    Print i
    i = i + 1
Print i
```
Prints 0, 1, 2 inside the loop, then i is 3 when the loop exits.

**Output: 0 1 2 3**

#### Q13.

```
Integer x = 5
if (x = 0)
    Print "zero"
else
    Print "non-zero"
```
`=` is **assignment**, not comparison. x becomes 0, and 0 is falsy.

**Output: non-zero**

#### Q14.

```
Integer arr[5] = {1, 2, 3, 4, 5}
Integer i, s = 0
for (i = 0; i <= 5; i++)
    s = s + arr[i]
Print s
```
`i <= 5` reads `arr[5]`, which is **out of bounds** for a 5-element array.

**Answer: array index out of bounds** — the classic off-by-one.

#### Q15.

```
Function g(Integer n)
    if (n <= 1) return n
    return g(n-1) + g(n-2)
End Function
Print g(6)
```
Fibonacci: 0,1,1,2,3,5,**8**

**Output: 8**

#### Q16.

```
Integer i, c = 0
for (i = 1; i <= 100; i = i * 2)
    c = c + 1
Print c
```
i takes 1, 2, 4, 8, 16, 32, 64 → **7 iterations**. Complexity is O(log n).

**Output: 7**

**Q17.** *What is the time complexity?*
```
for (i = 0; i < n; i++)
    for (j = 0; j < n; j++)
        sum = sum + 1
for (k = 0; k < n; k++)
    sum = sum + 1
```
Nested loops give O(n²); the separate loop adds O(n). Sequential parts **add**, and the larger dominates.  
**O(n²)**

#### Q18.

```
Integer s = "PLACEMENT"
Integer i, c = 0
for (i = 0; i < length(s); i++)
    if (s[i] == 'E')
        c = c + 1
Print c
```
P-L-A-C-E-M-E-N-T → two E's.

**Output: 2**

---

## Checkpoints

- [ ] I trace every pseudocode question with a variable table on paper
- [ ] I check the declared type and know integer division truncates
- [ ] I know pre- vs post-increment and can evaluate `a++ + ++a`
- [ ] I check for `&` or "reference" in a function signature
- [ ] I check the array indexing base before tracing
- [ ] I can trace a recursive function by unwinding from the base case
- [ ] I know the operator precedence order
- [ ] I know short-circuit evaluation can skip a side effect
- [ ] I check for missing braces around a loop body
- [ ] I read nested-loop initialisers carefully (`j = i` vs `j = 1`)
- [ ] I know sequential loops add and nested loops multiply for complexity
- [ ] I keep each question under 75 seconds
