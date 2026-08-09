# Log Line Normalizer

A monitoring agent writes one character per event into a session log. There are only two event types, recorded as `a` and `b`.

A session is considered **well-formed** when its log reads as one or more `a` events followed by one or more `b` events — every `a` before every `b`, with at least one of each. Written as a pattern that is `a⁺b⁺`. So `aab`, `ab` and `abbbb` are well-formed; `ba`, `aba`, `aaa` and `bbb` are not.

Sessions in the wild are messier than that, because events can arrive out of order. Before a log is archived, an operator repairs it by **deleting individual events**. Each deletion costs 1, regardless of which event is removed or where it sits. Events cannot be reordered or inserted — only removed.

Some logs cannot be repaired at all. If no sequence of deletions leaves a well-formed session, the log is rejected.

## Task

Given a session log, report the **minimum number of deletions** needed to make it well-formed, or `-1` if that is impossible.

## Input

```
Line 1:  s
```

A single string of `a` and `b` characters.

## Output

One integer: the minimum number of deletions, or `-1` if the log cannot be made well-formed.

## Constraints

```
1  ≤  |s|  ≤  2 · 10^5
s contains only the characters 'a' and 'b'
```

## Sample 1

**Input**
```
bab
```

**Output**
```
1
```

**Explanation**

Deleting the leading `b` leaves `ab`, which is well-formed. One deletion, and no single deletion does better — the log is not already well-formed.

## Sample 2

**Input**
```
aabbb
```

**Output**
```
0
```

**Explanation**

Two `a` events followed by three `b` events is already `a⁺b⁺`. Nothing to repair.

## Sample 3

**Input**
```
ba
```

**Output**
```
-1
```

**Explanation**

The only `a` arrives after the only `b`. Deleting events can never move one in front of the other, so no repair produces an `a` followed by a `b`. Deleting nothing leaves `ba`; deleting either event leaves a single character, which is not well-formed because both an `a` and a `b` are required. The log is rejected.

## Sample 4

**Input**
```
abab
```

**Output**
```
1
```

**Explanation**

Delete the `b` at position 2, leaving `aab`. One deletion suffices.

## Notes

- The result must contain **at least one `a` and at least one `b`**. An all-`a` or all-`b` log can never be repaired.
- Deletions are the only operation. Characters keep their relative order.
- Every well-formed result is described entirely by the point where the `a` run ends and the `b` run begins. Fixing that point turns the problem into two independent counts.
- `|s|` can reach `2 · 10^5`, so an approach that is quadratic in the length will not finish.
