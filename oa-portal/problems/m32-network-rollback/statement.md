# Network Rollback

A data centre has `n` servers, numbered `1` through `n`, wired together by `m` cables. Cable `i` is the `i`-th one listed in the input.

Two servers are in the same **cluster** if you can get from one to the other along cables. A server with no cables at all is a cluster of one, so before anything is unplugged there are somewhere between `1` and `n` clusters.

An engineer then works through `q` maintenance events. Each event **unplugs one cable**, given by its number in the original list. No cable is ever unplugged twice, and cables are never plugged back in.

## Task

After each unplugging, report how many clusters the data centre has.

## Input

```
Line 1:       n  m  q
Next m lines: u  v      cable i joins servers u and v
Next q lines: i         unplug cable i
```

Cables never join a server to itself, but two servers may be joined by more than one cable.

## Output

`q` lines. Line `j` is the number of clusters immediately after the `j`-th unplugging.

## Constraints

```
1  ≤  n  ≤  2 · 10^5
1  ≤  m  ≤  2 · 10^5
1  ≤  q  ≤  m
1  ≤  u, v  ≤  n,   u ≠ v
```

Each cable number appears at most once across the `q` events.

## Sample 1

**Input**
```
4 4 2
1 2
2 3
3 4
4 1
1
2
```

**Output**
```
1
2
```

**Explanation**

The four servers form a ring. Unplugging cable 1 (`1–2`) leaves the chain `2–3–4–1`, still **1** cluster. Unplugging cable 2 (`2–3`) then strands server 2: `{1,3,4}` and `{2}`, so **2**.

## Sample 2

**Input**
```
3 2 2
1 2
2 3
2
1
```

**Output**
```
2
3
```

## Sample 3

**Input**
```
3 3 2
1 2
1 2
2 3
1
3
```

**Output**
```
1
2
```

**Explanation**

Servers 1 and 2 are joined by two separate cables. Unplugging the first changes nothing — the spare still holds — so it stays at **1**. Unplugging cable 3 (`2–3`) then splits off server 3.

## Notes

- The obvious approach is to recompute the clusters after every unplugging. That is `O(q · (n + m))`, around `8 · 10^{10}` steps at the limits, so it is not the intended route even though it is correct.
- The natural tool for clusters is a disjoint-set structure, and it has one famous weakness: it merges, and it cannot un-merge. Deletions are exactly what it cannot do.
- So stop trying to make it delete. You are given every event up front, which means you are not obliged to answer them in the order they were asked. Read the whole input, ask what the network looks like at the very **end**, and then work backwards — because run backwards, every unplugging becomes a plugging-in, which is the one thing the structure is good at.
- Take care with what "the end" means. It is the original network minus **all** `q` unplugged cables, and cables never named by an event stay put the whole time.
- Answers come out in reverse order. Store them and print them the right way round — getting this backwards is the single most common way to fail this after getting the idea right.
- Sample 3 is there for a reason: unplugging a cable does not always split anything, and a solution that assumes each removal adds a cluster passes plenty of random tests before it fails.
