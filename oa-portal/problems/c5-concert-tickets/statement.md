# Concert Tickets

> **Mirrored from CSES 1091** — <https://cses.fi/problemset/task/1091>
> Solve it here, then paste the same code into the CSES submit box. The input
> format, the constraints and the sample below are the ones CSES uses.

There are `n` concert tickets, each with a fixed price. Then `m` customers arrive, one at a time. Customer `j` announces a maximum price `t[j]` they are willing to pay.

Each customer is given the **most expensive ticket** whose price does not exceed their maximum. That ticket is then gone. If no ticket costs `t[j]` or less, the customer gets nothing.

## Task

For every customer in arrival order, print the price they pay, or `-1` if they leave empty-handed.

## Input

```
Line 1:  n  m
Line 2:  h[1] h[2] ... h[n]     ticket prices
Line 3:  t[1] t[2] ... t[m]     customer maximums, in arrival order
```

## Output

`m` lines: the price paid by each customer, or `-1`.

## Constraints

```
1  ≤  n, m       ≤  200000
1  ≤  h[i], t[j] ≤  10^9
```

Prices may repeat.

## Sample 1

**Input**
```
5 3
5 3 7 8 5
4 8 3
```

**Output**
```
3
8
-1
```

**Explanation**

The first customer will pay at most 4; the dearest ticket at or below that is 3. The second takes the 8. The third will pay at most 3, and the only such ticket is already sold, so `-1`.

## Notes

- Sorting the tickets once is not enough on its own, because tickets are **removed** as they sell. You need a structure that stays sorted while items leave it.
- In C++ that is `multiset<int>`. For a customer with maximum `t`:
  - `it = s.upper_bound(t)` gives the first ticket **strictly greater** than `t`.
  - If `it == s.begin()`, every remaining ticket is too expensive → print `-1`.
  - Otherwise `--it` steps back to the dearest ticket at or below `t`. Print `*it`, then `s.erase(it)`.
- **Erase the iterator, not the value.** `s.erase(*it)` removes *every* ticket with that price, which is wrong whenever prices repeat — and the sample has two tickets priced 5, so this is tested immediately.
- Java has no multiset. Use a `TreeMap<Integer, Integer>` from price to count and call `floorKey(t)`, decrementing the count and removing the key when it hits zero.
- The whole thing is `O((n + m) log n)`.
- With `m = 2·10^5` lines of output, build the answer in a `StringBuilder` or a `std::string` and print once. Flushing per line with `endl` is what turns a correct solution into a TLE here.
- Values reach `10^9`, which fits in a 32-bit `int`, and no sums are taken — this is one of the few problems in this set where 64-bit types are not required.
