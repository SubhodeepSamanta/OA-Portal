# OA MASTER PLAN
### Unseen-problem training for Indian campus placements
### DIT University · 4th year CS · v2.1 · 9 Aug 2026

---

## PART 1 — HOW TO USE THIS MASTER PLAN

### The one question this document exists to answer

> **"If a completely unfamiliar company gives me 4 coding questions tomorrow, can I solve 2–3 of them?"**

Not *"can I prepare for company X."* Every section is judged against that sentence. If a section stops serving it, delete the section.

### Current target status — read this before Part 9

**No company in this document is a current target.** I have no reliable information about which companies are visiting DIT University in the coming weeks, and I will not invent it.

| Company | Status |
|---|---|
| **Juspay** | Drive already passed. Questions retained as **general DSA training** only |
| **Infosys** | Drive already passed. Questions retained as **general OA training** only |
| **Everyone else** | **Historical recruiters.** DIT's published lists say who *has* recruited there, not who is coming. Treat every format table as reference, not as a schedule |

**What this means in practice:** no company gets a week, a track, or a dedicated schedule slot. Company formats live in Part 9 as a *reference table you read once*, and Part 12's mocks are built around **assessment shapes** (60/3, 90/3, 120/4, 180/4, aptitude-heavy) rather than company names.

### Priority order

| | Priority | Where it lives |
|---|---|---|
| **1** | **General unseen-OA solving ability** | Parts 2–7, 11–14 — roughly 90% of this document |
| **2** | Companies actually confirmed as visiting DIT | Nothing yet. **Tell me and I re-plan within a day** |
| **3** | ZS Associates — aptitude/DI shape, which nothing else in the plan trains | Part 10 |
| **4** | Other plausible DIT recruiters | Part 9, reference only |
| **5** | Historical company questions — **only where they teach transferable patterns** | Part 8, filed as general training |

Priority 5 is the load-bearing clause. The Juspay and Infosys questions stay because they are **good teaching problems**, not because those companies matter now. A functional-graph trio that answers three different questions from one statement, and a target-form string transform with asymmetric costs, are genuinely excellent training regardless of who set them.

### What changed in v2.1

| Change | Why |
|---|---|
| **Infosys reclassified as historical** | Drive has passed. Its questions were the *best evidence available* about your actual weaknesses, so all of them and all 20 disguise variants are preserved — but re-filed under the pattern they teach, not the company. No Infosys track, week, or schedule slot. |
| **Mock styles renamed to format archetypes** | A "180/4 endurance paper" is a useful thing to rehearse. "An Infosys-style paper" implies preparing for Infosys. Same papers, honest labels. |
| **Part 9 demoted to a reference table** | v2.0 gave eleven companies a "Train with" column, which reads like eleven prep tracks. There is no evidence any of them is upcoming. |
| **Explicit current-target status block** | Added above, so this cannot drift again. |

### What changed in v2.0

| Change | Why |
|---|---|
| **Juspay reclassified as historical** | Drive already passed. Its problems stay *only* where they build transferable ability — functional graphs, cycle detection, custom data structures. Filed as general DSA, not company prep. |
| **Blind sets rebuilt from a reserved pool** | v1 drew blind sets from questions already assigned that week. That is not blind. Q286–Q305 are now **reserved** — never assigned in any week, used only when blind. |
| **Mocks rebuilt with unseen problems** | v1 mocks recycled solved questions, which measures nothing. Every mock now contains at least two problems you have never seen. |
| **ZS given a real section** | v1 had 3 coding questions and a footnote. ZS's assessment is mostly aptitude / logical / verbal / **data interpretation as its own section**. Part 10 now covers it properly with 42 items. |
| **Coverage gaps closed** | MST had **zero** questions despite being on the checklist. Expression parsing, probability, combinatorics, meet-in-the-middle, offline processing and coordinate compression had one or two each. Fixed. |
| **Constraint forensics made a drill** | v1 preached constraint-reading and never trained it. Q214–Q233 are a dedicated ladder where the bound *is* the problem. |
| **Reported questions expanded into families** | Two variants each was not enough for transfer. Now six disguises per real question. |
| **Topic key upgraded** | Now gives technique, primary intuition, key observation, complexity, family, provenance — not one word. |
| **Intuition audit is now blind** | A checklist you grade yourself on is worthless. Part 13 is 18 unlabeled problems where the *only* task is to name the direction in 5 minutes. |
| **R22–R25 corrected** | Those were bare titles with no recoverable statement. Presenting them as solvable questions overstated the evidence. Now marked title-only with modelled analogues supplied. |

### Provenance — every question carries one tag

| Tag | Meaning | Trust it for |
|---|---|---|
| `[REPORTED]` | Candidates say they were asked this, in a named company's assessment, traced to a specific interview-experience post. | Problem **shape and pattern**. Wording and exact constraints are recalled from memory afterward, so treat those as approximate. |
| `[REPORTED-TITLE]` | A question name appears in candidate reports but **no usable statement survives**. Listed for honesty; a modelled analogue is supplied alongside. | Knowing the topic came up. Nothing more. |
| `[PLATFORM]` | A standard public problem — LeetCode, CSES, AtCoder, Codeforces. | Teaching one fundamental idea cleanly. Capped at 40% of any week. |
| `[MODELLED]` | Written here, full statement, OA voice. **Not claimed to have been asked anywhere.** | Genuine blind practice — no editorial, no tags, no discussion tab exists. |

**I will never present a modelled question as a real company question.** Where evidence is thin I say "reported pattern" or "inferred", not "asked".

### The five rules of use

1. **Never read Appendix A before attempting.** It is the answer key. Reading it first converts training into review.
2. **Never open LeetCode tags or Discuss.** Titles leak a little; tags leak everything.
3. **Run the ladder (Part 2) on every problem rated M or above.** Write rungs 1–5 down before you are allowed a hint.
4. **A wrong answer is data, not a failure.** Classify it (Part 14) and it selects your next set.
5. **If you solve something in under 8 minutes with no doubt, it taught you nothing.** Log it as free and move on. Comfort is not practice.

### The honest diagnosis this plan is built on

You know Dijkstra, bridges, articulation points, Kosaraju, 0-1 BFS. Students who clear 3/4 in a hard OA usually know **less** algorithmic content than you. What they have is a working pipeline from an unfamiliar English paragraph to an attackable object.

| Stage | | Status |
|---|---|---|
| 1 | Strip the story → state the real question | **Weak — the main gap** |
| 2 | Constraints → complexity budget → solution family | **Weak — routinely skipped** |
| 3 | Brute force → locate the wasted work | **Weak — you jump to "what pattern is this?"** |
| 4 | Waste → invariant → operation → structure | Fine once started |
| 5 | Code, then defend against hidden tests | **Weak — you have passed visible tests and failed hidden ones in a real assessment** |

The weight of this plan sits on 1, 2, 3 and 5. Stage 4 is where most roadmaps live, and it is where you are already competent.

---

## PART 2 — THE PROBLEM-SOLVING LADDER

Fourteen rungs. Every blind problem runs through them **in order**. The discipline is rung 8: you do not ask "what pattern is this" until you have already found the waste and named the invariant. Pattern-first is precisely the habit that collapses on unseen problems.

```
 1. RESTATE      Rewrite in ≤2 sentences with zero story words. No servers,
                 no warehouses, no customers. Only: array, string, graph,
                 set, number, interval, state.
                 Can't do it? You don't understand the problem. Re-read.

 2. ASK          What is ACTUALLY being asked? Count? Maximise? Decide
                 yes/no? Construct? Report per query? People lose marks
                 solving a nearby problem.

 3. CONSTRAIN    Read every bound. Write the complexity budget BEFORE
                 having any idea. "n ≤ 2e5 → O(n log n) or better."
                 Ask: why did the setter pick THIS number?

 4. SHRINK       Build the smallest examples by hand. n=1,2,3,4,5.
                 Write the answers in a row. Look at them.

 5. BRUTE        State the brute force in full, with its complexity.
                 Always. Even when it's obviously O(2^n) garbage.
                 In a real OA you will often CODE this first.

 6. WASTE        Why does brute force exceed budget? Be specific.
                 Not "too slow" — "it recomputes the same range sum 1e5
                 times." THIS RUNG IS THE ENGINE.

 7. SEARCH       Hunt for one of: an invariant, a monotonic predicate,
                 a contribution formula, or a state. One of these four
                 is present in almost every OA problem.

 8. STRUCTURE    NOW choose the algorithm/data structure. It is a
                 CONSEQUENCE of rungs 6 and 7, never a guess.

 9. PROVE        Greedy → exchange argument. DP → state meaning in one
                 English sentence. Observation → try to break it at n=1,2,3.

10. COST         State time and space. Check against rung 3's budget.
                 If it doesn't fit, go back to rung 6 — there's more waste.

11. IMPLEMENT    Write it. Loop invariant as a comment before the loop.

12. ATTACK       Run the edge-case checklist (Part 5). Deliberately try
                 to break your own code.

13. STRESS       Brute vs optimised on small random inputs, if the
                 problem admits it.

14. RECORD       Wrong? Classify the failure (Part 14). Right but slow?
                 Record why. This selects your next practice set.
```

### The motion to internalise — rung 6 fires more than once

**Subarray Sum Equals K**, laddered:

| Rung | |
|---|---|
| 1 RESTATE | Count contiguous segments summing to K. |
| 2 ASK | A count, not the segments themselves. |
| 3 CONSTRAIN | n ≤ 1e5 → O(n) or O(n log n). |
| 4 SHRINK | `[1,1,1], k=2` → 2. `[1,-1,0], k=0` → 3. The second is the interesting one. |
| 5 BRUTE | All O(n²) pairs with a running sum. |
| 6 WASTE | Range sums over overlapping ranges recomputed from scratch. |
| 7 SEARCH | Prefix sums: `sum(i..j) = P[j] − P[i−1]`. Each range now O(1) — **but the pairing is still O(n²). Rung 6 fires again.** Fix j; I need the *count of earlier prefixes equal to P[j] − K*. |
| 8 STRUCTURE | HashMap value → **frequency**. Not a set — the same prefix recurs and each occurrence is a separate valid subarray. *This is where marks are lost.* |
| 9 PROVE | Each subarray counted exactly once, at index j. Initialise `{0:1}`. |
| 10 COST | O(n) time, O(n) space. Fits. |
| 12 ATTACK | Negatives (fine — and exactly why sliding window fails here), K=0, all zeros, overflow → `long long`. |

Most hard problems are **two or three rounds** of "find the waste, kill it, look again." A single pass through rung 6 solves easy problems only.

---

## PART 3 — THE UNSTICKING TOOLKIT

When the ladder stalls at rung 6 or 7, work down this list. Nearly every OA "insight" is one of these applied once.

| # | Move | What it buys you |
|---|---|---|
| 1 | **Hand-compute n = 1..5** | Write the answers in a row. Look for the pattern. Solves a startling share of observation problems |
| 2 | **Describe the optimal answer**, not how to find it | "The optimal subarray must start right after a prefix minimum." Characterising the answer collapses the search space |
| 3 | **Reverse it** | Process right-to-left, or work backwards from the goal state |
| 4 | **Sort it** | If reordering is legal, sort — free structure. If it isn't, that's information: order matters, think prefix/window |
| 5 | **Fix one variable** | Fix the left endpoint / split point / maximum / which item is last. Turns 2D search into n × 1D |
| 6 | **Count contribution, not objects** | "How many subarrays have `a[i]` as their minimum?" instead of "sum over subarrays" |
| 7 | **Count the complement** | Count the bad ones, subtract from the total |
| 8 | **Binary search the answer** | "Minimise the maximum" / "smallest X such that possible" + a cheap feasibility check. **The single most-missed OA pattern** |
| 9 | **Prefix/suffix decomposition** | Precompute best-from-left and best-from-right, join at each split. Kills "one operation allowed" |
| 10 | **Find the invariant** | What never changes under the allowed operation? Sum, parity, multiset, gcd, inversion parity |
| 11 | **Exchange argument** | Assume an optimum differs from yours at the first choice; swap toward yours without loss. A *failed* swap is your counterexample |
| 12 | **Amortize** | Each element pushed/popped once overall → the O(n²)-looking loop is O(n) |
| 13 | **Bound the candidate set** | Are there really only O(n) or O(log V) possible answers? |
| 14 | **Split "at most K" into a difference** | `count(=K) = count(≤K) − count(≤K−1)` |
| 15 | **Draw the graph** | Node = (position, carried state). Then BFS/Dijkstra unchanged |
| 16 | **Re-read the constraints** | Alphabet 26 → bitmask. k ≤ 10 → an O(n·2^k) dimension is intended. **Constraints are the setter telling you the answer** |
| 17 | **Process offline** | Are the queries independent of order? Sort them, or run time backwards |
| 18 | **Compress the values** | Values ≤ 1e9 but n ≤ 2e5 → the values are labels, not indices |

---

## PART 4 — CONSTRAINT → COMPLEXITY REASONING

Mental model: **~1e8 simple operations per second** in C++ (1e7–1e8 in Java) against a 1–2 second limit.

**Do not memorise the table. Regenerate it.** "What n makes n² ≈ 1e8? → n ≈ 1e4." That derivation is what must become automatic, because setters pick bounds you haven't seen before.

| Bound | Budget | What fits | Why the setter chose it |
|---|---|---|---|
| n ≤ 10 | O(n!) ≈ 3.6e6 | Full permutation search | "Try every ordering" |
| n ≤ 12–14 | O(n! ) or O(n²·2ⁿ) | Permutations, TSP-shaped DP | |
| n ≤ 20–24 | O(2ⁿ·n) | **Subset enumeration, bitmask DP** | 2²⁰ ≈ 1e6 |
| n ≤ 40 | O(2^(n/2)) | **Meet in the middle** | 2²⁰ per half. *40 is never accidental* |
| n ≤ 100 | O(n³) | Floyd–Warshall, interval DP, matrix ops | 1e6 |
| n ≤ 500 | O(n³) borderline / O(n² log n) | Interval DP, small flows | |
| n ≤ 2000–5000 | O(n²) | LCS, edit distance, all-pairs on sequences | **The classic 2D DP tell** |
| n ≤ 1e5 | O(n log n) | Sort, heap, binary search, Fenwick, segment tree | Most common OA size |
| n ≤ 1e6 | O(n) or O(n log n) small constant | Two pointers, prefix, counting sort, sieve | Avoid `map` — use arrays |
| n ≤ 1e8 | O(√n), O(log n) | Number theory, closed form | |
| **value ≤ 100** | — | Frequency array, value-indexed DP, counting sort | Values are small enough to index |
| **value ≤ 1e9, n small** | — | **Coordinate compression**, hashing, binary search on value | Values are *labels*, not indices |
| **T ≤ 1e18** | O(log T) | **Matrix exponentiation, cycle detection, closed form** | You cannot iterate. Full stop |
| **Σn over tests ≤ 2e5** | near-linear per test | Multi-test format | Never O(n²) per test |
| **q ≤ 2e5 with updates** | O(log n) per op | Fenwick / segment tree | |
| **q ≤ 2e5, no updates** | O(1) or O(log n) | Prefix sums, sparse table | |
| Range update, query at end only | O(1) per update | **Difference array** | Cheapest structure in the toolkit |
| Answer mod 1e9+7 | — | Counting DP, combinatorics | Mod ⇒ you are counting, not optimising |
| k ≤ 10 alongside n ≤ 1e5 | O(n·k) or O(n·2^k) | k is a DP dimension | Small k next to big n is always deliberate |
| Alphabet = 26 | — | 26-length arrays, 26-bit masks | |
| **Negative values present** | — | **Sliding window is dead** → prefix + hashmap | The Subarray-Sum-K lesson |

### The three questions to ask at rung 3, every time

1. **What complexity can possibly fit?**
2. **What does this bound rule OUT?** (n ≤ 1e5 rules out O(n²) — so any idea I have that's quadratic is wrong, and I should stop developing it.)
3. **Why did the setter choose this exact number?** (Why 40 and not 50? Why 2000 and not 1e5? The odd number is the hint.)

**Drill:** Q214–Q233 are a constraint-forensics ladder where the bound *is* the puzzle. Additionally, five times a week I give you constraint blocks with **no statement attached** and you name the plausible families.

---

## PART 5 — OA EXECUTION, DEBUGGING, HIDDEN TESTS

### 5.1 The hidden-test problem, solved

You passed visible tests and failed hidden ones. That is mechanical and fully fixable.

**The stress-testing loop** — build it once, use it forever:

```
1. Write the brute force. Obviously correct, obviously slow.
2. Random generator with SMALL parameters (n ≤ 8, values ≤ 5).
   Small is essential — small counterexamples are readable.
3. Loop: generate → run both → diff → stop on mismatch.
4. You now hold a minimal failing case. Dry-run it by hand.
```

This finds off-by-ones, wrong initialisation, duplicate mishandling and broken greedy assumptions in seconds. Most candidates never write one. It is the difference between 11/16 and 16/16.

### 5.2 The edge-case checklist — ~40 seconds before every submit

| Class | Cases |
|---|---|
| **Size** | n = 0, n = 1, n = 2, n = max |
| **Uniformity** | all identical, all distinct |
| **Order** | already sorted, reverse sorted, random |
| **Values** | negatives, zero, max value, duplicates |
| **Overflow** | sum of all elements, product, `n·max`. **Use 64-bit by default** |
| **Parameters** | k = 0, k = 1, k > n, k = n |
| **Graphs** | disconnected, self-loop, multi-edge, single node, tree vs general, cycle present |
| **Strings** | empty, length 1, all same character, no match at all |
| **Multi-test** | does state reset between test cases? |
| **Adversarial** | the input that makes *your specific* approach worst-case |
| **Complexity** | max n with worst-case structure. **TLE is a wrong answer** |

### 5.3 Debug protocol — and how I will treat your buggy code

I will not fix it. I will ask what it is trying to do, hand you a failing case, and let you find it.

1. **State the loop invariant in one English sentence.** Half of all bugs die here — you will discover you cannot state it.
2. Shrink to the smallest failing input via stress testing.
3. Print the state each iteration for that input.
4. Compare against what rungs 7–8 said *should* be maintained.
5. The first line where actual ≠ expected is the bug. Not near it — at it.

### 5.4 Live OA war-plan — overrides everything else that day

**Minutes 0–5: read every question. Solve nothing.** Rate each 1–5 on "I can see a direction," and write the ratings down. Candidates who clear 3/4 are usually not smarter — they **picked better**. Attempting in printed order is the most common avoidable mistake in Indian OAs.

**Order by rating, not by position.**

| Format | Per question | Reserve |
|---|---|---|
| 60 min / 3 | 17 min | 9 |
| 75 min / 3 | 22 min | 9 |
| 90 min / 3 | 27 min | 9 |
| 120 min / 4 | 27 min | 12 |
| 180 min / 4 | 40 min | 20 |

When a box expires, **leave**. A question you are 80% through scores zero; two finished score everything.

**Submit the brute force first.** Many Indian OA platforms award per-test-case partial credit — Sprinklr's reported format is explicitly 50/75/100 points with partial marking and a 120-point cutoff. A correct O(n²) passing 9/16 beats an unfinished O(n log n) passing 0/16. Your 11/16 shows you already benefit; now do it deliberately.

**The 10-minute rule.** No direction after 10 minutes → leave it, come back with the reserve.

**Last 10 minutes.** Stop writing new logic. Re-read submitted code for overflow, n=1, and uninitialised state. This recovers more marks per minute than anything else at that point.

**Type rungs 1–3 into the scratch pad.** Ninety seconds, and it is the difference between a directed attempt and panic-coding.

---

## PART 6 — TRAINING PHILOSOPHY

### 6.1 The transfer principle

The purpose of variation is **not** volume. It is that you should recognise the same skeleton wearing different clothes.

For every important idea the bank supplies disguises along these axes:

| Axis | Example |
|---|---|
| Different story | Warehouse shelves → transaction log → sensor stream |
| Different constraints | n ≤ 2000 (O(n²) invited) vs n ≤ 2e5 (forbidden) |
| Different input representation | Array → adjacency list → grid → query stream |
| Different required output | Count → maximum → the actual construction → yes/no |
| Combined with a second technique | Binary search on answer **whose check is a DP** |
| Edge-case heavy | Negatives, zeros, duplicates, all-equal |
| Harder version | Same idea, one extra dimension of state |
| Implementation-heavy | Same idea, but the code is the difficulty |

### 6.2 The learning cycle — never five copies of one problem

```
LEARN      one representative problem, derived not told
DISGUISE   two variants that look nothing like it
BLIND      it reappears unlabeled, mixed with unrelated problems
REVISIT    D+3 re-derive from a blank page; D+10 harder variant
COMBINE    it appears as a sub-step inside a two-technique problem
```

Five stages, roughly five problems. **Not fifteen.**

### 6.3 Anti-grind rules — enforced

1. Never more than **2 consecutive problems from the same pattern**.
2. A new pattern costs about **5 problems** via the cycle above. Nail them and it is closed.
3. **Every day contains at least one problem where you don't know the topic.**
4. No problem repeated for "practice" — only for re-derivation.
5. **Editorial rule:** unlocked only after 45 minutes of honest effort *and* written rungs 1–7. Then extract **one sentence** — the key observation — and close it.
6. **LeetCode capped at 40% of any week.** It is a poor OA simulator: pre-classified, discussion tab as a crutch, no story to strip.
7. **Blind means blind.** I never reveal topic, difficulty, company or source before you attempt.

### 6.4 The four working logs (`logs/`)

| File | Purpose |
|---|---|
| `derivation-log.md` | All 14 rungs per problem. Rungs 1–7 written **before** any hint |
| `weakness-ledger.md` | The control system. One row per failure with its code (Part 14) |
| `pattern-dictionary.md` | *Your* disguise dictionary, in your words, written after being burned |
| `observation-bank.md` | Exactly one sentence per editorial read. Re-read all of it before every mock |

### 6.5 The disguise dictionary — seed version

You extend this yourself. Entries you write after losing marks encode the trigger in your own language and are worth far more than mine.

**Optimisation phrasing**

| Surface | Likely core |
|---|---|
| "minimise the maximum" / "maximise the minimum" | Binary search on answer + feasibility check |
| "smallest capacity / speed / days such that possible" | Binary search on answer |
| "at most K changes," contiguous | Sliding window + violation counter |
| "at most K changes," selection matters | DP with K as a dimension |
| "**at most one** swap / removal / operation" | Bound the candidates + prefix/suffix precompute |
| "two players play optimally" | Game DP, parity argument, or Grundy |

**Structural phrasing**

| Surface | Likely core |
|---|---|
| "max/min of every window of size k" | Monotonic deque |
| "next greater / days until warmer / span" | Monotonic stack |
| "largest rectangle / trapped water / visibility" | Monotonic stack |
| "k-th largest so far / running median" | Heap / two heaps |
| "meetings, rooms, servers, overlapping intervals" | Sweep line, or heap of end times |
| "count pairs with property" | Sort + two pointers, complement map, or BIT |
| "count subarrays with sum/property = X" | Prefix + hashmap |
| "range update, query only at the end" | Difference array |
| "range query + point update" | Fenwick |
| "range query + range update" | Segment tree + lazy |
| "prefixes / autocomplete / maximum XOR pair" | Trie |

**Graph & tree disguises**

| Surface | Likely core |
|---|---|
| "each X has exactly one parent / successor / next / exit" | **Functional graph** — cycles, ρ-shape, binary lifting |
| "the array is a permutation" | Cycle decomposition |
| "dependencies / prerequisites / must come before" | Topological sort → DP on DAG |
| "spreading, rotting, fire, infection, several starting points" | Multi-source BFS |
| "grid with obstacles, fewest moves" | BFS; 0/1 costs → 0-1 BFS; general → Dijkstra |
| "cheapest way to connect everything" | MST |
| "merge groups / are these two related" | DSU |
| "connectivity queries after removals" | DSU processed in **reverse time** |
| "lock/unlock a node; ancestors and descendants matter" | Tree + ancestor walk + descendant counters |
| "position plus some carried state" | **State-space graph** — node = (pos, state) |

**String & math disguises**

| Surface | Likely core |
|---|---|
| "must end up as AAA…BBB" / "a⁺b⁺" / "non-decreasing" | Fix the split point; prefix cost + suffix cost. Equivalently 2-state DP |
| "remove from the beginning or the end" | Reframe: min removals = **max keepable middle window** |
| "pattern occurrences / repeated substring / border" | KMP, Z-function, rolling hash |
| "only lowercase letters" | 26-length frequency arrays, or a 26-bit mask |
| "XOR" | Bit independence, prefix XOR, trie |
| "digits of all numbers up to N" | Digit DP |
| "operations are reversible / order doesn't matter" | Hunt for an **invariant** |
| "minimise Σ\|x − c\|" | c = median. (Σ(x−c)² → c = mean) |

---
---

## PART 7 — THE COMPLETE QUESTION BANK

**Q1–Q320 · 320 problems.** Reported company questions are in Part 8 (R-series). ZS aptitude is Part 10 (Z-series).

**Difficulty:** `F` foundation · `M` medium · `H` hard-medium · `X` hard

> **Reserved pools — do not touch these until instructed.**
> **Q286–Q305** are reserved for blind sets. **Q306–Q320** are reserved for mocks. If you solve them early you destroy their only purpose.

---

### 7.1 · REPEATED WORK → STRUCTURE · Q1–Q22

**Q1** `[PLATFORM]` LC · `M` — *Longest Consecutive Sequence*

**Q2** `[MODELLED]` · `M` — **Refund Reconciliation**
> A payments team stores a day's settlement deltas as an array `a` of `n` integers; a negative delta is a refund. Compliance needs to know how many contiguous stretches of the day settled to exactly `k` rupees net.
> **Input:** `n`, `k`, then `n` integers. **Output:** one integer.
> **Constraints:** `1 ≤ n ≤ 2e5`, `−1e9 ≤ a[i] ≤ 1e9`, `−1e14 ≤ k ≤ 1e14`.
> **Example:** `a = [1,-1,0], k = 0` → `3`.

**Q3** `[MODELLED]` · `H` — **Server Heartbeat Windows**
> `n` servers report a load reading each second, in order. An alert engine examines every window of `w` consecutive seconds and records the peak load in it. Print all peaks in order.
> **Constraints:** `1 ≤ w ≤ n ≤ 1e6`, `0 ≤ load ≤ 1e9`. *The limit is tight; O(n·w) will not finish.*

**Q4** `[MODELLED]` · `H` — **Campus Gate Passes**
> `m` gates numbered `1..m`. `q` grants; grant `i` is `(l, r, x)` meaning every gate in `[l, r]` gains `x` passes. After all grants, report the gate with the most passes (smallest index on a tie).
> **Constraints:** `1 ≤ m, q ≤ 1e6`, `1 ≤ x ≤ 1e4`.

**Q5** `[PLATFORM]` LC · `F` — *Contains Duplicate II*
**Q6** `[PLATFORM]` LC · `M` — *Subarray Sum Equals K*
**Q7** `[PLATFORM]` LC · `M` — *Subarray Sums Divisible by K*
**Q8** `[PLATFORM]` LC · `M` — *Continuous Subarray Sum*
**Q9** `[PLATFORM]` LC · `M` — *Maximum Size Subarray Sum Equals k*
**Q10** `[PLATFORM]` CSES · `M` — *Subarray Divisibility*

**Q11** `[MODELLED]` · `M` — **Warehouse Bay Audit**
> A scanner recorded `n` shelf IDs, unordered and possibly repeated. An aisle is a set of shelves with consecutive IDs. Find the length of the longest aisle formable from the scanned shelves.
> **Constraints:** `1 ≤ n ≤ 2e5`, `−1e9 ≤ id ≤ 1e9`. *Sorting passes. An O(n) solution exists — find it.*

**Q12** `[MODELLED]` · `H` — **Loyalty Streak**
> A customer's transaction log is `n` integers (negative = return). Find the **length of the longest** contiguous stretch with net spend exactly `k` — not the count.
> **Constraints:** `1 ≤ n ≤ 2e5`, values to `1e9` in absolute value.
> *Deliberately adjacent to Q2. Work out precisely what changes in the bookkeeping, and why.*

**Q13** `[PLATFORM]` LC · `M` — *Corporate Flight Bookings*
**Q14** `[PLATFORM]` LC · `M` — *Product of Array Except Self*
**Q15** `[PLATFORM]` LC · `M` — *Check If All 1's Are at Least Length K Places Away*
**Q16** `[PLATFORM]` CSES · `M` — *Room Allocation*

**Q17** `[MODELLED]` · `M` — **Meeting Room Heatmap**
> `n` meetings; meeting `i` occupies the half-open interval `[s_i, e_i)`. Report the maximum number running simultaneously at any instant.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ s_i < e_i ≤ 1e9`.

**Q18** `[MODELLED]` · `H` — **Splice Cost**
> An array of `n` integers. You must delete **exactly one** element. Maximise the sum of any contiguous non-empty subarray of what remains.
> **Constraints:** `2 ≤ n ≤ 2e5`, `−1e4 ≤ a[i] ≤ 1e4`.

**Q19** `[PLATFORM]` LC · `M` — *Longest Substring Without Repeating Characters*
**Q20** `[PLATFORM]` LC · `M` — *Max Consecutive Ones III*
**Q21** `[PLATFORM]` LC · `M` — *Longest Repeating Character Replacement*
**Q22** `[PLATFORM]` LC · `H` — *Sliding Window Maximum* — **re-derive it, do not recall it**

---

### 7.2 · MONOTONIC PREDICATE, GREEDY, INTERVALS, STACK, HEAP · Q23–Q45

**Q23** `[PLATFORM]` LC · `M` — *Koko Eating Bananas*
**Q24** `[PLATFORM]` LC · `M` — *Capacity To Ship Packages Within D Days*
**Q25** `[PLATFORM]` LC · `H` — *Split Array Largest Sum*
**Q26** `[PLATFORM]` CSES · `M` — *Factory Machines*
**Q27** `[PLATFORM]` CSES · `H` — *Array Division*
**Q28** `[PLATFORM]` CF · `H` — *Present* (~1600) — search the title on the problemset

**Q29** `[MODELLED]` · `H` — **Bandwidth Throttle**
> `n` files sit in an upload queue; file `i` is `s_i` MB. `k` identical links each take a **consecutive run** of the queue — the dispatcher only ever cuts the queue, never interleaves it. A link works through its own run one file at a time at 1 MB/sec, and all links start at time 0. You choose the cut points. Minimum time until all files are done?
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`, `1 ≤ s_i ≤ 1e9`.
> *Note: the run must be consecutive. Let links pick any subset and the problem becomes NP-hard (it is bin-packing), so an OA asking this is always asking the consecutive version — read for that word.*

**Q30** `[MODELLED]` · `X` — **Placement Drive Slotting**
> `n` students must be interviewed; student `i` needs `t_i` minutes. There are `m` interviewers and the drive runs in **two rounds** — each interviewer meets at most one student per round, so at most two students all day. An interview is never split across interviewers. Given `n ≤ 2m`, minimise the total minutes given to the busiest interviewer.
> **Constraints:** `1 ≤ m ≤ 1e5`, `1 ≤ n ≤ 2m`, `1 ≤ t_i ≤ 1e9`.
> *Note: the two-rounds cap is what makes this exactly solvable. Drop it — "any number of students per interviewer" — and it is the same NP-hard load-balancing problem as Q29's free-assignment variant.*

**Q31** `[PLATFORM]` LC · `M` — *Gas Station* — you have seen it. **Now prove the greedy.**
**Q32** `[PLATFORM]` LC · `M` — *Jump Game II*
**Q33** `[PLATFORM]` LC · `H` — *Task Scheduler*
**Q34** `[PLATFORM]` CSES · `M` — *Concert Tickets*
**Q35** `[PLATFORM]` CF · `M` — *Woodcutters* (~1500)

**Q36** `[MODELLED]` · `H` — **Exam Hall Allocation**
> `n` exams; exam `i` occupies its hall over `[s_i, e_i)` — a hall is free again *at* the end minute. Minimum number of halls needed? Then, in the same program, report which exams land in hall 1 under this fixed rule: take exams by increasing start (ties by earlier end, then input order) and put each in the lowest-numbered free hall, opening a new hall only when none is free.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ s_i < e_i ≤ 1e9`.
> *Note: "under your scheme" is not judgeable — many allocations use the minimum number of halls. Any real OA that asks part 2 pins the tie-break, and half the marks are in reading which one.*

**Q37** `[MODELLED]` · `H` — **Cable Merge Cost**
> `n` cable segments of lengths `L₁..Lₙ`. Joining segments of lengths `a` and `b` costs `a + b` and yields one segment of length `a + b`. Repeat until one segment remains. Minimum total cost?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ L_i ≤ 1e9`. *Overflow is a real risk.*

**Q38** `[PLATFORM]` LC · `M` — *Daily Temperatures*
**Q39** `[PLATFORM]` LC · `H` — *Largest Rectangle in Histogram*
**Q40** `[PLATFORM]` LC · `H` — *Sum of Subarray Minimums*

**Q41** `[MODELLED]` · `H` — **Skyline Billboard**
> `n` buildings stand in a row with heights `h₁..hₙ`, each 1 unit wide. An advertiser hangs one rectangular billboard flush against the skyline; it must fit entirely within the buildings' silhouette. Maximum area?
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ h_i ≤ 1e9`.

**Q42** `[PLATFORM]` LC · `M` — *K Closest Points to Origin*
**Q43** `[PLATFORM]` LC · `H` — *Find Median from Data Stream*
**Q44** `[PLATFORM]` LC · `H` — *Meeting Rooms II* (premium — otherwise use Q36)

**Q45** `[MODELLED]` · `H` — **Kitchen Order Queue**
> A cloud kitchen receives `n` orders; order `i` arrives at time `a_i` and needs `c_i` minutes of cooking. One chef, who may switch between orders freely at integer minutes. Minimise the total completion time across all orders.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ a_i, c_i ≤ 1e9`.

---

### 7.3 · ONE-OPERATION OPTIMISATION & TARGET-FORM TRANSFORMS · Q46–Q55
*Two of these rebuild real reported OA questions. They are here because the **pattern** is high-frequency across assessments — "you may perform at most one operation, maximise something" and "transform the input into a fixed target shape at minimum cost" both recur widely. The full disguise families are Q266–Q285.*

**Q46** `[MODELLED — based on reported question]` · `M` — **One Swap Sum**
> *Provenance: reconstructed from a question reported in an Infosys assessment (drive passed — retained as general OA training).*
> Array `a` of `n` integers. You may perform **at most one** swap of any two elements. Maximise the sum of elements sitting at **odd indices** (1-based).
> **Constraints:** `1 ≤ n ≤ 2e5`, `−1e9 ≤ a[i] ≤ 1e9`.
> *There are O(n²) possible swaps. Do not try them all. How many can possibly help?*

**Q47** `[MODELLED]` · `H` — **One Swap Sum II**
> As Q46, but maximise the sum of elements at odd indices **that are themselves odd numbers**, and the swap must be between an odd-indexed and an even-indexed position.

**Q48** `[MODELLED]` · `H` — **Remove One Segment**
> Array of `n` integers. Delete **at most one** contiguous block (possibly empty). Maximise the sum of what remains.
> **Constraints:** `1 ≤ n ≤ 2e5`, `−1e9 ≤ a[i] ≤ 1e9`.

**Q49** `[PLATFORM]` LC · `H` — *Maximum Subarray Sum with One Deletion*
**Q50** `[PLATFORM]` LC · `M` — *Best Time to Buy and Sell Stock III*

**Q51** `[MODELLED — based on reported question]` · `H` — **Log Line Normalizer**
> *Provenance: reconstructed from a question reported in an Infosys assessment (drive passed — retained as general OA training).*
> A log line is a string `s` over `{a, b}`. A **valid** line has the form `a⁺b⁺` — one or more `a`s followed by one or more `b`s, nothing else. You may delete any character at cost 1. Minimum total cost to make `s` valid.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.
> **Example:** `s = "bab"` → `1` (delete the leading `b`, leaving `ab`).
> *Two derivations exist and they are the same object. Find both.*

**Q52** `[MODELLED]` · `X` — **Log Line Normalizer II** *(with the splice costs you were actually given)*
> Same target form. Three operations: delete the **first** character (cost `p`), delete the **last** character (cost `q`), delete any **interior** character (cost `r`). Minimum total cost.
> **Constraints:** `1 ≤ |s| ≤ 2e5`, `1 ≤ p, q, r ≤ 1e9`.

**Q53** `[PLATFORM]` LC · `M` — *Flip String to Monotone Increasing*

**Q54** `[MODELLED]` · `H` — **Trim the Broadcast**
> A broadcast is `n` frames with quality scores. You may remove frames only from the **beginning** or the **end**. The remaining block must have average quality at least `t`. Maximise the number of frames kept.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ score ≤ 1e9`, `0 ≤ t ≤ 1e9`.
> *Reframe the operation before you write any code.*

**Q55** `[PLATFORM]` LC · `M` — *Minimum Number of Operations to Make Array Continuous*

---

### 7.4 · TREES · Q56–Q68

**Q56** `[PLATFORM]` LC · `M` — *Diameter of Binary Tree*
**Q57** `[PLATFORM]` LC/GFG · `M` — *Vertical Order Traversal*
**Q58** `[PLATFORM]` LC · `H` — *Binary Tree Maximum Path Sum*
**Q59** `[PLATFORM]` CSES · `M` — *Subordinates*
**Q60** `[PLATFORM]` CSES · `H` — *Tree Distances I*
**Q61** `[PLATFORM]` CSES · `H` — *Company Queries II*
**Q62** `[PLATFORM]` LC · `M` — *Lowest Common Ancestor of a Binary Tree*

**Q63** `[MODELLED]` · `H` — **Nearest Common Manager**
> A company org chart is a rooted tree of `n` employees; employee 1 is the CEO. `q` queries, each `(u, v)`: print the lowest-ranked employee who is a manager (direct or indirect) of both.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q64** `[MODELLED]` · `X` — **Tree of Space** *(general custom-data-structure training — see R4 for the reported original)*
> A rooted tree of `n` named nodes. Support three operations:
> - `lock(node, uid)` — succeeds only if no ancestor and no descendant of `node` is locked, and `node` itself is unlocked.
> - `unlock(node, uid)` — succeeds only if `node` is locked **by the same `uid`**.
> - `upgrade(node, uid)` — succeeds only if `node` is unlocked, **at least one** descendant is locked, and **every** locked descendant is locked by `uid`. On success, unlock all of them and lock `node`.
>
> Print `true`/`false` per operation.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ q ≤ 1e5`. *Naive descendant scans are O(n) per operation and will TLE. What counter fixes that?*

**Q65** `[MODELLED]` · `X` — **Tree of Space II**
> Same tree; additionally support `count_locked_in_subtree(node)` in `O(log n)`.

**Q66** `[MODELLED]` · `H` — **Team Reporting Depth**
> Rooted org tree of `n` employees. For each employee print the number of subordinates lying at most `k` levels below them.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k ≤ n`.

**Q67** `[PLATFORM]` LC · `M` — *Serialize and Deserialize Binary Tree*
**Q68** `[PLATFORM]` LC · `H` — *Count Good Nodes in Binary Tree* **and** *Path Sum III* (do both; they pair)

---

### 7.5 · GRAPH MODELLING · Q69–Q88
*You know these algorithms. The training here is seeing the graph, not running it.*

> For Q69–Q78, first produce **only the model** — what is a node, what is an edge, what is the weight — in under 10 minutes with no code. Then implement. The modelling step is the graded part.

**Q69** `[MODELLED]` · `M` — **Metro with Passes**
> A metro network has `n` stations and `m` bidirectional links; link `i` costs `c_i` rupees. You hold `k` free passes, each making one link free. Minimum cost from station 1 to station `n`?
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`, `0 ≤ k ≤ 10`, `1 ≤ c_i ≤ 1e9`.

**Q70** `[MODELLED]` · `H` — **Warehouse Robot Keys**
> A grid `r × c`. `.` floor, `#` wall, `S` start, `E` exit; lowercase `a`–`f` are keys and uppercase `A`–`F` are the matching locked doors, which open only if you already carry the key. Minimum moves from `S` to `E`?
> **Constraints:** `1 ≤ r, c ≤ 100`, at most 6 key types.

**Q71** `[MODELLED]` · `M` — **Toll Roads**
> `n` cities, `m` roads; each road is either free (0) or costs ₹1. Minimum toll from city 1 to city `n`?
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 5e5`. *Dijkstra works. Something faster and simpler exists.*

**Q72** `[MODELLED]` · `H` — **Currency Desk**
> `n` currencies and `m` directed conversion offers; offer `i` converts 1 unit of `u` into `r_i` units of `v`. Starting with 1 unit of currency 1, can you end with strictly more than 1 unit of currency 1? If yes, print the cycle.
> **Constraints:** `1 ≤ n ≤ 500`, `1 ≤ m ≤ 5000`. *Multiplication, not addition. What transform fixes that?*

**Q73** `[MODELLED]` · `M` — **Build Pipeline**
> `n` build tasks; task `i` takes `t_i` seconds. `m` dependency pairs `(a, b)`: `a` must fully finish before `b` starts. Unlimited parallel workers. Minimum total wall-clock time?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ m ≤ 5e5`.

**Q74** `[MODELLED]` · `M` — **Rumor Spread**
> A campus grid `r × c`. `#` blocked, `.` free, `R` a person who already knows. Each minute every knower tells all 4-adjacent free cells. Minutes until everyone knows, or `−1`.
> **Constraints:** `1 ≤ r, c ≤ 1000`.

**Q75** `[MODELLED]` · `H` — **Network Rollback**
> `n` servers, initially `m` links. Then `q` events, each removing one existing link. After each removal, print the number of connected components.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ m, q ≤ 2e5`. *DSU cannot un-merge. So what do you do about the order?*

**Q76** `[MODELLED]` · `H` — **Employee Referral Chain**
> Each of `n` employees referred exactly one other employee (possibly themselves). For each employee, print how many distinct employees are reachable by following referrals from them.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q77** `[MODELLED]` · `H` — **Flight Discount Desk**
> `n` cities, `m` one-way flights with prices. You hold one coupon that halves the price of **exactly one** flight (rounded down). Minimum cost from city 1 to city `n`?
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`.

**Q78** `[MODELLED]` · `X` — **Shift Roster**
> `n` staff, `m` shifts; staff `i` can work a given subset of shifts. Each shift needs exactly one person and each person works at most one shift. Can every shift be covered?
> **Constraints:** `1 ≤ n, m ≤ 500`, total pairs ≤ `1e5`.

**Q79** `[PLATFORM]` CSES · `M` — *Labyrinth*
**Q80** `[PLATFORM]` CSES · `M` — *Building Roads*
**Q81** `[PLATFORM]` CSES · `H` — *Flight Discount* — compare against your Q77
**Q82** `[PLATFORM]` CSES/LC · `H` — *Course Schedule II*
**Q83** `[PLATFORM]` CSES · `H` — *Longest Flight Route*
**Q84** `[PLATFORM]` CSES · `H` — *Cycle Finding*
**Q85** `[PLATFORM]` CSES · `X` — *Planets Queries I*
**Q86** `[PLATFORM]` LC · `H` — *Cheapest Flights Within K Stops*
**Q87** `[PLATFORM]` LC · `H` — *Word Ladder*
**Q88** `[PLATFORM]` LC · `X` — *Shortest Path Visiting All Nodes*

---

### 7.6 · DYNAMIC PROGRAMMING · Q89–Q110
*The Educational DP Contest (`atcoder.jp/contests/dp`) is the best DP resource that exists.*

**Q89** `[PLATFORM]` EDPC · `F` — *A · Frog 1*
**Q90** `[PLATFORM]` EDPC · `F` — *B · Frog 2*
**Q91** `[PLATFORM]` EDPC · `M` — *C · Vacation*
**Q92** `[PLATFORM]` EDPC · `M` — *D · Knapsack 1*
**Q93** `[PLATFORM]` EDPC · `H` — *E · Knapsack 2* — **the constraints moved. Why does that change the state?**
**Q94** `[PLATFORM]` EDPC · `M` — *F · LCS*
**Q95** `[PLATFORM]` EDPC · `H` — *H · Grid 1*
**Q96** `[PLATFORM]` EDPC · `H` — *I · Coins*
**Q97** `[PLATFORM]` EDPC · `H` — *L · Deque*
**Q98** `[PLATFORM]` EDPC · `X` — *N · Slimes*
**Q99** `[PLATFORM]` EDPC · `X` — *P · Independent Set*
**Q100** `[PLATFORM]` CSES · `M` — *Dice Combinations*
**Q101** `[PLATFORM]` CSES · `M` — *Removing Digits*
**Q102** `[PLATFORM]` CSES · `H` — *Book Shop*
**Q103** `[PLATFORM]` CSES · `H` — *Edit Distance*
**Q104** `[PLATFORM]` LC · `M` — *House Robber II*
**Q105** `[PLATFORM]` LC · `H` — *Longest Increasing Subsequence* — **both O(n²) and O(n log n)**
**Q106** `[PLATFORM]` LC · `H` — *Best Time to Buy and Sell Stock with Cooldown*

**Q107** `[MODELLED]` · `H` — **Ad Slot Revenue**
> `n` ad slots in a row; slot `i` pays `p_i`. Selling slot `i` blocks slots `i−1` and `i+1`. Additionally you may **ignore the blocking rule exactly once**, for one slot of your choice. Maximum revenue?
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ p_i ≤ 1e9`.

**Q108** `[MODELLED]` · `H` — **Subscription Tiers**
> `n` customers with willingness-to-pay `w_i`. You set exactly `k` price tiers. Each customer buys the highest tier not exceeding their `w_i`, paying that tier's price; a customer below every tier buys nothing. Choose the `k` prices to maximise revenue.
> **Constraints:** `1 ≤ k ≤ n ≤ 3000`, `1 ≤ w_i ≤ 1e9`. *Read the bound on `n` carefully — it is telling you the intended complexity.*

**Q109** `[MODELLED]` · `X` — **Rack Assembly**
> `n` servers must go into `n` rack positions. Placing server `i` at position `j` costs `c[i][j]`. Each server gets exactly one position. Minimum total cost?
> **Constraints:** `1 ≤ n ≤ 18`, `0 ≤ c[i][j] ≤ 1e6`. *The bound 18 is the entire hint.*

**Q110** `[MODELLED]` · `H` — **Terrain Crossing**
> A grid `r × c` of heights. Start top-left, end bottom-right, moving only right or down. The cost of a path is the **maximum absolute height difference** between consecutive cells on it. Minimise that cost.
> **Constraints:** `1 ≤ r, c ≤ 500`, heights up to `1e9`. *This is not pure DP. Read it twice.*

---

### 7.7 · TRIE, RANGE STRUCTURES, STRINGS, BITMASK · Q111–Q130

**Q111** `[PLATFORM]` LC · `M` — *Implement Trie (Prefix Tree)*
**Q112** `[PLATFORM]` LC · `H` — *Maximum XOR of Two Numbers in an Array*

**Q113** `[MODELLED]` · `H` — **Router Prefix Table**
> `n` routing rules, each a binary prefix string. Then `q` IP addresses as 32-bit binary strings. For each address, print the length of the **longest** rule that is a prefix of it, or `−1`.
> **Constraints:** `1 ≤ n, q ≤ 2e5`, total rule length ≤ `1e6`.

**Q114** `[PLATFORM]` CSES · `M` — *Dynamic Range Sum Queries*
**Q115** `[PLATFORM]` CSES · `H` — *Dynamic Range Minimum Queries*
**Q116** `[PLATFORM]` CSES · `H` — *Range Update Queries*
**Q117** `[PLATFORM]` LC · `H` — *Count of Smaller Numbers After Self*

**Q118** `[MODELLED]` · `H` — **Live Leaderboard**
> `n` players start at score 0. `q` operations, each either `UPDATE p s` (set player `p`'s score to `s`) or `RANK p` (print how many players currently have a strictly higher score than `p`).
> **Constraints:** `1 ≤ n, q ≤ 2e5`, `0 ≤ s ≤ 1e9`.

**Q119** `[MODELLED]` · `X` — **Sensor Range Alerts**
> `n` sensors in a line. `q` operations: `ADD l r x` (add `x` to every sensor in `[l, r]`) or `MAX l r` (print the maximum reading in `[l, r]`).
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q120** `[PLATFORM]` CSES · `H` — *Range Xor Queries* — decide prefix vs Fenwick and justify the choice
**Q121** `[PLATFORM]` LC · `H` — *Implement strStr()* — **then re-implement in O(n + m)**
**Q122** `[PLATFORM]` CSES · `H` — *String Matching*
**Q123** `[PLATFORM]` CSES · `H` — *Finding Borders*
**Q124** `[PLATFORM]` LC · `H` — *Longest Palindromic Substring* — centre expansion, then DP
**Q125** `[PLATFORM]` LC · `H` — *Palindrome Partitioning II*

**Q126** `[MODELLED]` · `H` — **Signature Scanner**
> An antivirus holds one signature `p`. Given a stream `s`, print every start index where `p` occurs in `s`. Overlapping occurrences count.
> **Constraints:** `1 ≤ |p| ≤ |s| ≤ 1e6`.

**Q127** `[MODELLED]` · `H` — **Playlist Symmetry**
> A playlist is a string of lowercase letters. Count the number of **distinct** substrings that are palindromes.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.

**Q128** `[PLATFORM]` LC · `X` — *Partition to K Equal Sum Subsets*
**Q129** `[PLATFORM]` EDPC · `X` — *O · Matching*

**Q130** `[MODELLED]` · `X` — **Campus Shuttle Route**
> `n` stops plus a depot (stop 0), with `dist[i][j]` given. A shuttle starts at the depot, visits every stop exactly once, and returns. Minimum total distance?
> **Constraints:** `1 ≤ n ≤ 15`.

---

### 7.8 · MIXED — DELIBERATELY UNRELATED · Q131–Q148

**Q131** `[MODELLED]` · `H` — **Parking Lot Revenue**
> A lot has `k` identical bays. `n` cars; car `i` arrives at `a_i` and leaves at `d_i`. A car that finds all bays full drives away. Cars are processed in arrival order. Revenue is ₹1 per minute per occupied bay. Total revenue?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k ≤ 1e5`, times up to `1e9`.

**Q132** `[MODELLED]` · `H` — **Fair Split**
> An array of `n` positive integers. Split into two **non-empty** groups (not necessarily contiguous) minimising the absolute difference of their sums.
> **Constraints:** `1 ≤ n ≤ 100`, `1 ≤ a_i ≤ 1000`.

**Q133** `[MODELLED]` · `M` — **Broken Keyboard**
> A string `s` and a set of `k` working keys. You may type only substrings composed of working keys. Length of the longest such substring?
> **Constraints:** `1 ≤ |s| ≤ 1e6`, lowercase only.

**Q134** `[MODELLED]` · `H` — **Token Refill**
> A bucket holds at most `C` tokens and starts full. `n` requests; request `i` at time `t_i` consumes `c_i` tokens. The bucket refills 1 token per second up to `C`. A request with insufficient tokens is rejected and consumes nothing. How many are served?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ C ≤ 1e9`, `t_i` strictly increasing.

**Q135** `[MODELLED]` · `X` — **Minimum Platform Rebuild**
> `n` trains; train `i` occupies `[a_i, d_i]`. You may **cancel at most one** train. Minimise the number of platforms needed.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q136** `[MODELLED]` · `H` — **Equalise the Shelves**
> `n` shelves with `a_i` books. One operation moves one book between adjacent shelves. Minimum operations to make all shelves equal, or `−1`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ a_i ≤ 1e9`.

**Q137** `[MODELLED]` · `H` — **Coupon Stacking**
> `n` items with prices. `m` coupons; coupon `j` gives `d_j`% off exactly one item. Each item takes at most one coupon and each coupon is used at most once. Minimise total spend.
> **Constraints:** `1 ≤ n, m ≤ 2e5`.

**Q138** `[MODELLED]` · `X` — **Version Rollback Tree**
> A document starts empty at version 0. `q` operations: `EDIT v c` creates a new version from version `v` by appending character `c`; `QUERY v k` prints the `k`-th character of version `v`.
> **Constraints:** `1 ≤ q ≤ 2e5`.

**Q139** `[MODELLED]` · `H` — **Sensor Calibration**
> `n` readings. In one operation you pick any element and change it to any value. Minimum operations to make the array strictly increasing?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ a_i ≤ 1e9`. *This is a famous problem wearing a hat.*

**Q140** `[MODELLED]` · `H` — **Balanced Deployment**
> A binary string of length `n` (`0` = staging, `1` = prod). Count substrings with equal numbers of `0`s and `1`s.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q141** `[PLATFORM]` CF · `H` — *Vanya and Lanterns* (~1200)
**Q142** `[PLATFORM]` CF · `H` — *Books* (~1300)
**Q143** `[PLATFORM]` CF · `X` — *Boredom* (~1500)
**Q144** `[PLATFORM]` CF · `X` — *Vacations* (~1400)
**Q145** `[PLATFORM]` AC · `H` — any recent **ABC problem C**
**Q146** `[PLATFORM]` AC · `X` — any recent **ABC problem D**
**Q147** `[PLATFORM]` LC · `X` — *Trapping Rain Water* — solve it **three** different ways
**Q148** `[PLATFORM]` LC · `X` — *Substring with Concatenation of All Words*

---

### 7.9 · OA-STYLE APPLIED PROBLEMS · Q149–Q168
*Written in the voice of real campus assessments — heavy story wrappers, business jargon, constraints buried in prose. The tag in brackets is the **business domain only**, never a hint at the technique and never a company target. The value of this block is that every story is doing its best to hide the algorithm underneath it.*

**Q149** `[MODELLED]` · `X` — **Lift Controller**
> A building has `f` floors and `e` lifts. `n` requests; request `i` is `(time, from, to)`. A lift moves 1 floor per second and takes 0 time to open or close. Each request is assigned to the lift that can reach `from` soonest (ties → lowest lift index). Print each request's completion time.
> **Constraints:** `1 ≤ f ≤ 200`, `1 ≤ e ≤ 10`, `1 ≤ n ≤ 1e5`.

**Q150** `[MODELLED]` · `X` — **Transaction Router**
> `n` payment gateways; gateway `i` has success rate `p_i` and cost `c_i`. `q` transactions, each with a minimum acceptable success rate `r`. Route each transaction to the cheapest gateway with `p_i ≥ r`; report the total cost. Gateways may be added or removed between transactions.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q151** `[MODELLED]` · `H` — **Inventory Rebalance** *(long-story, buried invariant)*
> `n` warehouses in a line with stock `s_i`. Moving one unit between adjacent warehouses costs ₹1. Every warehouse must end with at least `m` units. Minimum cost, or `−1`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ s_i ≤ 1e9`.

**Q152** `[MODELLED]` · `H` — **Ticket Escalation** *(rule that looks significant and isn't)*
> `n` tickets with priorities. Every hour, the highest-priority ticket is resolved and every remaining ticket's priority rises by 1. Print the resolution order.
> **Constraints:** `1 ≤ n ≤ 2e5`. *The +1 applies to everyone — does it actually change anything?*

**Q153** `[MODELLED]` · `H` — **Fulfilment Zones** *(logistics)*
> `n` warehouses on a 2D plane and `m` customers. Each customer must be served by a warehouse within distance `d`. Minimise the number of warehouses opened.
> **Constraints:** `1 ≤ n ≤ 20`, `1 ≤ m ≤ 1e5`.

**Q154** `[MODELLED]` · `H` — **Delivery Windows** *(logistics)*
> `n` deliveries; delivery `i` must happen within `[s_i, e_i]` and takes 1 hour. One van, integer start hours. Maximise deliveries completed.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q155** `[MODELLED]` · `M` — **Feed Dedup** *(social media)*
> `n` social posts as strings. Two posts are duplicates if one is an anagram of the other **after removing all non-alphabetic characters and lowercasing**. Print the number of distinct posts.
> **Constraints:** `1 ≤ n ≤ 1e5`, total length ≤ `1e6`.

**Q156** `[MODELLED]` · `H` — **Mention Windows** *(social media)*
> A stream of `n` mentions, each tagged with a brand ID. Find the shortest contiguous window containing at least one mention of **every** brand present in the stream.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q157** `[MODELLED]` · `H` — **Deployment Windows** *(devops)*
> `n` services; service `i` needs `t_i` minutes and must deploy inside a maintenance window `[l_i, r_i]`. One deployer, no overlap, no preemption. Can all services deploy?
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q158** `[MODELLED]` · `X` — **Pipeline Reliability** *(devops)*
> A deployment DAG of `n` stages; stage `i` has success probability `p_i`. The pipeline succeeds if **some** root-to-leaf path has all stages succeed. Maximise success probability by choosing the path.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q159** `[MODELLED]` · `M` — **Client Panel Scheduling** *(consulting)*
> `n` client meetings with `[start, end]` and value `v_i`. One consultant, no overlaps. Maximise total value.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ v_i ≤ 1e9`.

**Q160** `[MODELLED]` · `M` — **Cohort Bucketing** *(healthcare analytics)*
> `n` patients with an integer score. Bucket them into `k` contiguous score ranges so the largest bucket is as small as possible. Print that size.
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`.

**Q161** `[MODELLED]` · `H` — **Query Plan Cost** *(databases)*
> A query plan is a binary tree of `n` operators; leaf `i` costs `c_i`, and an internal node costs the sum of its children plus 1. Given only the leaf costs in order, choose the tree shape minimising total cost.
> **Constraints:** `1 ≤ n ≤ 3000`.

**Q162** `[MODELLED]` · `H` — **Shelf Restock** *(retail)*
> `n` shelves with current stock and capacity. A restock truck carries `T` units total. Distribute to maximise the **minimum** fill ratio across shelves.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ T ≤ 1e9`.

**Q163** `[MODELLED]` · `H` — **Trade Netting** *(finance)*
> `n` counterparties and `m` trades; trade `j` means `a` owes `b` amount `x`. Net all obligations within each connected group and report, per group, the minimum number of payments needed to settle everyone.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`.

**Q164** `[MODELLED]` · `X` — **Portfolio Rebalance** *(finance)*
> `n` assets with current and target weights. Each trade moves weight between two assets at cost proportional to the amount. Minimum total cost to hit all targets.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q165** `[MODELLED]` · `H` — **Layer Composite** *(graphics)*
> `n` rectangular layers on a canvas, drawn in order. Compute the number of pixels visible from the topmost layer only.
> **Constraints:** `1 ≤ n ≤ 2e5`, coordinates up to `1e9`.

**Q166** `[MODELLED]` · `H` — **Rule Shadowing** *(network security)*
> `n` firewall rules in priority order, each an IP range `[l, r]` with allow/deny. Rule `i` is *shadowed* if every address it matches is already matched by an earlier rule. Count shadowed rules.
> **Constraints:** `1 ≤ n ≤ 2e5`, ranges up to `2³²`.

**Q167** `[MODELLED]` · `M` — **Batch Allocation** *(training / HR)*
> `n` trainees with skill scores and `k` batches. Each batch takes a contiguous block after sorting. Minimise the sum over batches of (max − min) within the batch.
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`.

**Q168** `[MODELLED]` · `X` — **Signal Reconstruction** *(telemetry)*
> An array `a` of `n` values was corrupted: exactly one contiguous block was reversed. Knowing the original was strictly increasing, find the reversed block, or report impossible.
> **Constraints:** `1 ≤ n ≤ 2e5`.

---

### 7.10 · MATH, BITS, MATRICES, POINTERS, DESIGN · Q169–Q213

#### Math & number theory · Q169–Q178

**Q169** `[PLATFORM]` CSES · `F` — *Common Divisors*
**Q170** `[PLATFORM]` CSES · `M` — *Counting Divisors*
**Q171** `[PLATFORM]` CSES · `M` — *Exponentiation*
**Q172** `[PLATFORM]` LC · `F` — *Count Primes*

**Q173** `[MODELLED]` · `M` — **Gear Ratios**
> Two gears have `a` and `b` teeth. Print the number of full rotations of gear A before both return to their starting orientation simultaneously.
> **Constraints:** `1 ≤ a, b ≤ 1e18`. *Overflow is the whole difficulty.*

**Q174** `[MODELLED]` · `H` — **Seating Arrangements**
> `n` students and `r` chairs in a row. Print the number of ways to choose which students sit, modulo `1e9+7`. Answer `q` such queries.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q175** `[MODELLED]` · `H` — **Batch Prime Filter**
> For each of `q` queries `(l, r)`, print how many primes lie in `[l, r]`.
> **Constraints:** `1 ≤ l ≤ r ≤ 1e6`, `1 ≤ q ≤ 2e5`.

**Q176** `[MODELLED]` · `H` — **Parity Lock**
> A machine holds `n` counters. One operation picks any two and increments both by 1. Can all counters be made equal? Print `YES`/`NO`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ a_i ≤ 1e9`. *Do not simulate. What never changes?*

**Q177** `[MODELLED]` · `H` — **Lucky Token Count**
> Count integers in `[1, N]` whose digits sum to exactly `s`, modulo `1e9+7`.
> **Constraints:** `1 ≤ N ≤ 1e18`, `1 ≤ s ≤ 162`.

**Q178** `[MODELLED]` · `M` — **Fair Share**
> `n` people and `m` identical items. Distribute so the difference between the largest and smallest share is minimal. Print each share.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 1e18`.

#### Bit manipulation · Q179–Q184

**Q179** `[PLATFORM]` LC · `M` — *Single Number II*
**Q180** `[PLATFORM]` LC · `M` — *Subsets*
**Q181** `[PLATFORM]` LC · `F` — *Counting Bits*
**Q182** `[PLATFORM]` LC · `H` — *Bitwise AND of Numbers Range*

**Q183** `[MODELLED]` · `H` — **Sensor Fault Isolation**
> `n` sensor IDs. Every ID appears exactly twice except **two**, which appear once. Find those two, in `O(n)` time and `O(1)` extra space.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q184** `[MODELLED]` · `H` — **Permission Merge**
> `n` role masks over 30 permission bits. Count pairs `(i, j)`, `i < j`, whose combined mask grants **every** permission.
> **Constraints:** `1 ≤ n ≤ 2e5`.

#### Matrices & 2D implementation · Q185–Q188

**Q185** `[PLATFORM]` LC · `M` — *Rotate Image*
**Q186** `[PLATFORM]` LC · `M` — *Spiral Matrix*
**Q187** `[PLATFORM]` LC · `M` — *Set Matrix Zeroes* — the O(1) space version
**Q188** `[PLATFORM]` LC · `M` — *Search a 2D Matrix II*

#### Linked lists & pointer discipline · Q189–Q193

**Q189** `[PLATFORM]` LC · `F` — *Reverse Linked List* — iterative **and** recursive
**Q190** `[PLATFORM]` LC · `M` — *Linked List Cycle II*
**Q191** `[PLATFORM]` LC · `H` — *Merge k Sorted Lists*
**Q192** `[PLATFORM]` LC · `M` — *Reorder List*
**Q193** `[PLATFORM]` LC · `H` — *Copy List with Random Pointer*

#### Design & custom data structures · Q194–Q199

**Q194** `[PLATFORM]` LC · `H` — *LRU Cache*
**Q195** `[PLATFORM]` LC · `M` — *Min Stack*
**Q196** `[PLATFORM]` LC · `H` — *Insert Delete GetRandom O(1)*
**Q197** `[PLATFORM]` LC · `H` — *Time Based Key-Value Store*

**Q198** `[MODELLED]` · `X` — **Rate Limiter**
> Implement `allow(userId, timestamp)` returning whether a request is permitted. A user may make at most `k` requests in any rolling window of `w` seconds.
> **Constraints:** up to `1e6` calls, timestamps non-decreasing. *Memory matters — a per-user list of every timestamp will not fit.*

**Q199** `[MODELLED]` · `X` — **Undo–Redo Editor**
> Support `APPEND s`, `DELETE k` (remove the last `k` characters), `UNDO`, `REDO`, and `PRINT i` (the `i`-th character). All operations must be sub-linear in document length.
> **Constraints:** up to `2e5` operations.

#### Recursion & backtracking · Q200–Q204

**Q200** `[PLATFORM]` LC · `M` — *Permutations*
**Q201** `[PLATFORM]` LC · `M` — *Combination Sum*
**Q202** `[PLATFORM]` LC · `H` — *N-Queens*
**Q203** `[PLATFORM]` LC · `H` — *Word Search*

**Q204** `[MODELLED]` · `X` — **Circuit Test Vectors**
> `n` binary inputs and `m` constraints, each of the form "inputs `i` and `j` must differ" or "must match". Count satisfying assignments, modulo `1e9+7`.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`. *`n` is large — backtracking is the trap here, not the answer.*

#### Game theory & huge simulation · Q205–Q209

**Q205** `[PLATFORM]` LC · `H` — *Stone Game*

**Q206** `[MODELLED]` · `H` — **Coin Row Duel**
> `n` coins in a row with values. Two players alternate; each turn a player takes the leftmost or rightmost coin. Both play optimally. Print the first player's total.
> **Constraints:** `1 ≤ n ≤ 2000`.

**Q207** `[MODELLED]` · `X` — **Machine Cycle**
> A machine's state is an integer `x`. Each second `x ← f(x)`, where `f` is given as a lookup table over `0..n−1`. Starting from `s`, what is the state after `T` seconds?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ T ≤ 1e18`. *You cannot step `T` times.*

**Q208** `[MODELLED]` · `X` — **Population Model**
> A colony follows `p(t) = a·p(t−1) + b·p(t−2)`, with `p(0)`, `p(1)`, `a`, `b` given. Print `p(T) mod 1e9+7`.
> **Constraints:** `1 ≤ T ≤ 1e18`.

**Q209** `[MODELLED]` · `X` — **Odometer Count**
> Count integers in `[L, R]` containing no two equal adjacent digits.
> **Constraints:** `1 ≤ L ≤ R ≤ 1e18`.

#### Special techniques · Q210–Q213

**Q210** `[MODELLED]` · `X` — **Split the Load**
> `n` jobs with weights. Split into two groups minimising the absolute difference of group sums.
> **Constraints:** `1 ≤ n ≤ 40`, `1 ≤ w_i ≤ 1e9`. *40 is not 20 and not 100. That is deliberate.*

**Q211** `[MODELLED]` · `H` — **Antenna Placement**
> `n` houses on a line at positions `x_i`. Place one antenna at a real-valued position minimising the **sum of squared distances** to all houses. Print the minimum, to 6 decimals.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q212** `[MODELLED]` · `H` — **Duplicate Detector**
> Given `n+1` integers in `[1, n]`, find any value appearing more than once, in `O(n)` time and `O(1)` extra space, without modifying the array.
> **Constraints:** `1 ≤ n ≤ 1e5`.

**Q213** `[PLATFORM]` LC · `H` — *Basic Calculator II* — then extend it to handle parentheses

---

### 7.11 · CONSTRAINT FORENSICS · Q214–Q233
### *The bound IS the problem*

> **How to use this block.** For each question, before writing any code, answer in your log:
> **(a)** What complexity fits? **(b)** What does this bound rule *out*? **(c)** Why did the setter pick this exact number?
>
> **Q214–Q221 are four pairs of twins.** Each pair has a **near-identical statement** and a **different bound**. The bound alone forces a completely different algorithm. Solve both halves of a pair back to back — that contrast is the single sharpest constraint-reading drill in this document.

**Q214** `[MODELLED]` · `M` — **Component Assembly (small)**
> `n` components, each with a positive weight. Choose any subset whose total weight is exactly `W`. Print `YES`/`NO`.
> **Constraints:** `1 ≤ n ≤ 20`, `1 ≤ w_i ≤ 1e15`, `1 ≤ W ≤ 1e18`.

**Q215** `[MODELLED]` · `X` — **Component Assembly (medium)** *(twin of Q214)*
> Identical statement.
> **Constraints:** `1 ≤ n ≤ 40`, `1 ≤ w_i ≤ 1e15`, `1 ≤ W ≤ 1e18`.
> *Why is `40` not simply "a bit more than 20"?*

**Q216** `[MODELLED]` · `M` — **Component Assembly (large values, small sum)** *(twin of Q214)*
> Identical statement.
> **Constraints:** `1 ≤ n ≤ 1000`, `1 ≤ w_i ≤ 1000`, `1 ≤ W ≤ 1e6`.
> *Three twins, three different algorithms, one English sentence. This is the lesson.*

**Q217** `[MODELLED]` · `M` — **Route Cost (dense)**
> `n` cities, every pair connected by a road of given cost. Answer `q` queries for the cheapest route between two cities.
> **Constraints:** `1 ≤ n ≤ 400`, `1 ≤ q ≤ 1e5`.

**Q218** `[MODELLED]` · `H` — **Route Cost (sparse)** *(twin of Q217)*
> Same question, but roads are given as a list of `m` edges.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`, `1 ≤ q ≤ 10`.
> *The query count moved too. Why does that matter as much as `n`?*

**Q219** `[MODELLED]` · `M` — **Duplicate Scan (small values)**
> An array of `n` integers. For each of `q` queries `(l, r)`, print how many distinct values occur in `a[l..r]`.
> **Constraints:** `1 ≤ n, q ≤ 2e5`, `1 ≤ a_i ≤ 100`.

**Q220** `[MODELLED]` · `X` — **Duplicate Scan (large values)** *(twin of Q219)*
> Identical statement.
> **Constraints:** `1 ≤ n, q ≤ 2e5`, `1 ≤ a_i ≤ 1e9`.
> *`a_i ≤ 100` was doing enormous work in Q219. Name exactly what it bought you.*

**Q221** `[MODELLED]` · `H` — **Growth Projection**
> A quantity follows `f(t) = f(t−1) + f(t−2)` with `f(0) = f(1) = 1`. Print `f(T) mod 1e9+7`.
> **Constraints — solve all three separately:** (a) `T ≤ 1e6` (b) `T ≤ 1e18` (c) `T ≤ 1e18` and the recurrence has `k ≤ 50` terms.
> *One statement, three bounds, three algorithms.*

**Q222** `[MODELLED]` · `M` — **Tournament Seeding**
> `n` players with distinct skill ratings. Count orderings of all `n` players such that no player is immediately followed by someone rated more than `d` below them.
> **Constraints:** `1 ≤ n ≤ 10`, `1 ≤ d ≤ 1e9`. *What does `n ≤ 10` permit that nothing else would?*

**Q223** `[MODELLED]` · `H` — **Server Placement**
> `n` locations on a line. Place `k` servers at locations to minimise the maximum distance from any location to its nearest server.
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`, coordinates ≤ `1e9`.

**Q224** `[MODELLED]` · `M` — **Query Batch**
> `t` test cases. Each gives an array and asks for the maximum subarray sum.
> **Constraints:** `1 ≤ t ≤ 1e5`, **`Σn over all test cases ≤ 2e5`**.
> *Why is the sum bounded rather than each individual `n`? What does that forbid?*

**Q225** `[MODELLED]` · `H` — **Skill Pairing**
> `n` employees with skill levels. Count pairs whose skill difference is at most `d`.
> **Constraints — solve both:** (a) `n ≤ 2000`, (b) `n ≤ 1e6`.

**Q226** `[MODELLED]` · `X` — **Grid Reachability**
> A grid `r × c` with obstacles. Count paths from top-left to bottom-right moving only right/down, modulo `1e9+7`.
> **Constraints — solve both:** (a) `r, c ≤ 1000`, (b) `r, c ≤ 1e5` but **at most 2000 obstacles**.
> *(b) is the interesting one. When the grid is too big to visit, what are you actually iterating over?*

**Q227** `[MODELLED]` · `H` — **Team Formation**
> `n` candidates, each with a set of skills drawn from `k` possible skills. Find the smallest team covering every skill.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ k ≤ 18`.

**Q228** `[MODELLED]` · `M` — **Peak Detection**
> An array of `n` integers that first strictly increases then strictly decreases. Find the peak.
> **Constraints:** `1 ≤ n ≤ 1e6`, and you may make **at most 40 array accesses**.
> *The access budget, not `n`, is the constraint that matters.*

**Q229** `[MODELLED]` · `H` — **Warehouse Distance**
> `n` warehouses at integer coordinates on a line. For each warehouse print the sum of distances to all others.
> **Constraints:** `1 ≤ n ≤ 2e5`, coordinates ≤ `1e9`. *O(n²) is the obvious answer and it is forbidden. Where does the structure come from?*

**Q230** `[MODELLED]` · `X` — **Budget Allocation**
> `n` projects; project `i` needs `c_i` budget and returns `v_i`. Total budget `B`. Maximise return.
> **Constraints — solve both:** (a) `n ≤ 100`, `B ≤ 1e5`, `v_i ≤ 1e9`; (b) `n ≤ 100`, `B ≤ 1e18`, `v_i ≤ 1000`.
> *In (b) the budget cannot be a DP dimension. What can?*

**Q231** `[MODELLED]` · `M` — **Signal Windows**
> An array of `n` integers. For each of `q` queries `(l, r)`, print the maximum in `a[l..r]`. The array never changes.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ q ≤ 1e6`. *"Never changes" is the whole hint.*

**Q232** `[MODELLED]` · `H` — **Signal Windows II** *(twin of Q231)*
> Same, but interleaved with `UPDATE i v` operations. `1 ≤ n, q ≤ 2e5`.

**Q233** `[MODELLED]` · `X` — **Sequence Reconstruction**
> A hidden strictly increasing sequence of `n` integers in `[1, 1e18]`. You may ask "is the `i`-th element less than `x`?" Reconstruct the sequence in at most `n · 60` questions.
> **Constraints:** `1 ≤ n ≤ 1000`. *Why 60?*

---

### 7.12 · COVERAGE GAP-FILLERS · Q234–Q265
*Families that were absent or thin in v1. MST had **zero** questions despite appearing on the checklist.*

#### Minimum spanning trees & connectivity · Q234–Q240

**Q234** `[PLATFORM]` CSES · `M` — *Road Reparation*
**Q235** `[PLATFORM]` CSES · `M` — *Road Construction*
**Q236** `[PLATFORM]` LC · `M` — *Min Cost to Connect All Points*

**Q237** `[MODELLED]` · `H` — **Campus Fibre Network**
> `n` buildings; laying fibre between buildings `i` and `j` costs `d_ij`. Additionally, building `i` can install its own satellite uplink for cost `s_i`, which connects it to the network independently. Minimum cost so every building is connected to the network.
> **Constraints:** `1 ≤ n ≤ 2000`.
> *The satellite option looks like it breaks MST. It doesn't — but you must see why.*

**Q238** `[MODELLED]` · `H` — **One Free Cable**
> `n` nodes, `m` weighted edges. Build a spanning tree, but exactly one edge of your choice becomes free. Minimum total cost?
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`.

**Q239** `[MODELLED]` · `H` — **Critical Link Audit**
> `n` nodes, `m` weighted edges. For each edge, report whether it appears in **every** minimum spanning tree, **some** MST, or **no** MST.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`.

**Q240** `[MODELLED]` · `M` — **Island Merge**
> A grid of `1`s and `0`s. Count connected regions of `1`s; then report how many regions would merge if you flipped exactly one `0` to `1` (report the best such flip's resulting largest region size).
> **Constraints:** grid up to `1000 × 1000`.

#### Sweep line & interval reasoning · Q241–Q245

**Q241** `[MODELLED]` · `M` — **Billboard Coverage**
> `n` intervals on a line. Report the total length covered by at least one interval.
> **Constraints:** `1 ≤ n ≤ 2e5`, coordinates ≤ `1e9`.

**Q242** `[MODELLED]` · `H` — **Overlap Depth Histogram**
> `n` intervals. For each `d` from 1 to `n`, report the total length covered by exactly `d` intervals.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q243** `[MODELLED]` · `H` — **Conference Room Conflicts**
> `n` bookings, each `[s_i, e_i]` with a room ID. Detect whether any room is double-booked, and if so report the earliest conflicting pair.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q244** `[MODELLED]` · `X` — **Rectangle Union Area**
> `n` axis-aligned rectangles. Total area of their union.
> **Constraints:** `1 ≤ n ≤ 2e5`, coordinates ≤ `1e9`.

**Q245** `[MODELLED]` · `H` — **Staffing Level**
> `n` shifts, shift `i` covering `[s_i, e_i]` and requiring `w_i` staff simultaneously. Report the peak simultaneous staffing requirement and when it first occurs.
> **Constraints:** `1 ≤ n ≤ 2e5`.

#### Offline processing & coordinate compression · Q246–Q250

**Q246** `[MODELLED]` · `H` — **Retroactive Friendship**
> `n` people. `q` events, each either `ADD u v` (they become friends) or `QUERY u v` (are they connected right now?). All events are given up front.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q247** `[MODELLED]` · `X` — **Retroactive Friendship II** *(harder twin of Q246)*
> Same, but events may also be `REMOVE u v`. All events given up front.
> **Constraints:** `1 ≤ n, q ≤ 1e5`. *Offline is now mandatory, not merely convenient.*

**Q248** `[MODELLED]` · `H` — **Rank Snapshot**
> `n` values. `q` queries `(i, k)`: among `a[1..i]`, how many are ≤ `k`? All queries given up front.
> **Constraints:** `1 ≤ n, q ≤ 2e5`, values and `k` up to `1e9`.

**Q249** `[MODELLED]` · `H` — **Land Parcels**
> `n` rectangular parcels with corner coordinates up to `1e9`. Report how many distinct cells exist in the arrangement after compressing coordinates, and the area of the largest uncovered region.
> **Constraints:** `1 ≤ n ≤ 1000`.

**Q250** `[MODELLED]` · `M` — **Attendance Windows**
> `n` check-in/check-out events with timestamps up to `1e18`, and `q` queries asking how many people were present at a given instant. All queries given up front.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

#### Contribution counting · Q251–Q254

**Q251** `[MODELLED]` · `H` — **Total Peak Load**
> An array of `n` integers. Compute the sum, over all contiguous subarrays, of the **maximum** of that subarray.
> **Constraints:** `1 ≤ n ≤ 2e5`. *There are O(n²) subarrays. Do not enumerate them.*

**Q252** `[MODELLED]` · `X` — **Total Spread**
> Same array. Compute the sum, over all subarrays, of (max − min).
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q253** `[MODELLED]` · `H` — **Pairwise Distance Sum on a Tree**
> A tree of `n` nodes with unit edges. Compute the sum of distances over all unordered pairs of nodes.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q254** `[MODELLED]` · `H` — **Digit Contribution**
> Compute the sum of all digits of all integers from 1 to `N`.
> **Constraints:** `1 ≤ N ≤ 1e18`.

#### Expression parsing & simulation · Q255–Q258

**Q255** `[MODELLED]` · `H` — **Config Expression Evaluator**
> Evaluate a string containing non-negative integers, `+ - * /` (integer division truncating toward zero), and nested parentheses. No unary minus.
> **Constraints:** `1 ≤ |s| ≤ 1e5`.

**Q256** `[MODELLED]` · `H` — **Nested Archive Expansion**
> A string like `3[a2[bc]]` expands to `abcbcabcbcabcbc`. Given such an encoding, print the expanded string.
> **Constraints:** expanded length ≤ `1e6`, nesting depth ≤ 100.

**Q257** `[MODELLED]` · `M` — **Log Filter Language**
> Evaluate boolean expressions over `AND`, `OR`, `NOT` and parentheses, with variables given a truth assignment.
> **Constraints:** `1 ≤ |s| ≤ 1e5`.

**Q258** `[MODELLED]` · `H` — **Bracket Repair**
> A string of `(` and `)`. Minimum number of insertions to make it balanced, and one valid resulting string.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.

#### Probability, expectation, combinatorics · Q259–Q262

**Q259** `[MODELLED]` · `H` — **Retry Budget**
> A request succeeds with probability `p` on each attempt, independently. Expected number of attempts until the first success, printed to 6 decimals. Then: expected attempts if you give up after `k` failures.
> **Constraints:** `0 < p ≤ 1`, `1 ≤ k ≤ 1e6`.

**Q260** `[MODELLED]` · `H` — **Expected Distinct Coupons**
> `n` coupon types; you draw `k` coupons uniformly at random with replacement. Expected number of **distinct** types collected, to 6 decimals.
> **Constraints:** `1 ≤ n, k ≤ 1e6`. *Linearity of expectation makes this a one-liner. Finding that is the exercise.*

**Q261** `[MODELLED]` · `H` — **Lattice Routes with Blocked Cell**
> Count paths on an `r × c` grid from top-left to bottom-right moving right/down, avoiding one blocked cell, modulo `1e9+7`.
> **Constraints:** `1 ≤ r, c ≤ 1e6`.

**Q262** `[MODELLED]` · `X` — **Committee Selection**
> From `n` people choose a committee of any size ≥ 1 and designate one member as chair. Count the ways, modulo `1e9+7`. Then generalise: choose a committee and designate `j` chairs.
> **Constraints:** `1 ≤ n ≤ 1e6`.

#### Meet in the middle & matrix exponentiation · Q263–Q265

**Q263** `[MODELLED]` · `X` — **Load Balancer Split**
> `n` jobs with weights, split across two machines to minimise the maximum machine load.
> **Constraints:** `1 ≤ n ≤ 40`, `1 ≤ w_i ≤ 1e9`.

**Q264** `[MODELLED]` · `X` — **Password Space Search**
> `n` items each with a value; count subsets whose value-sum lies in `[L, R]`.
> **Constraints:** `1 ≤ n ≤ 36`, values up to `1e9`.

**Q265** `[MODELLED]` · `X` — **State Machine Steps**
> A system has `k` states and a transition matrix `M` where `M[i][j] = 1` if state `i` can move to state `j` in one step. Count paths of length exactly `T` from state 0 to state `k−1`, modulo `1e9+7`.
> **Constraints:** `1 ≤ k ≤ 50`, `1 ≤ T ≤ 1e18`.

---

### 7.13 · HIGH-FREQUENCY OA PATTERN FAMILIES · Q266–Q285
### *Reported questions, transferred properly*

> **Why these are here.** Two of these families were reconstructed from questions you actually met in an Infosys assessment. **That drive has passed and Infosys is not a target.** They survive because the *patterns* are high-frequency across assessments generally, and because they are the best evidence available about where your reasoning breaks: an operation-bounding argument you didn't find, and a split-point transform you didn't see.
>
> Two variants was not enough for transfer. Each family now carries six disguises varying story, constraints, input representation, required output, technique combination, and difficulty. **Spread them across weeks — never solve a family back to back.**

#### Family A — "at most one operation, maximise something"
*Core skeleton: bound the candidate set, then prefix/suffix decomposition. Base problems Q46, Q47. Provenance: reconstructed from an Infosys-reported question (historical).*
*Core skeleton: bound the candidate set, then prefix/suffix decomposition. Base problems are Q46, Q47.*

**Q266** `[MODELLED]` · `M` — **Shift Roster Swap** *(different story, different output)*
> `n` employees in a rota, each with a productivity score. You may **swap exactly two** employees' positions once. Report the **positions** to swap (not the value) that maximise the sum at even positions. If no swap helps, print `-1 -1`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `−1e9 ≤ score ≤ 1e9`.

**Q267** `[MODELLED]` · `H` — **One Swap, Two Objectives** *(combined technique)*
> Array of `n` integers. At most one swap. Maximise the sum at odd indices; among all swaps achieving that maximum, choose the one minimising the sum at even indices.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q268** `[MODELLED]` · `H` — **One Reversal** *(different operation, same skeleton)*
> Array of `n` integers. You may reverse **at most one** contiguous block. Maximise the sum at odd indices.
> **Constraints:** `1 ≤ n ≤ 2e5`. *A reversal is not a swap. Does the candidate-bounding argument survive?*

**Q269** `[MODELLED]` · `M` — **One Swap, Small n** *(constraint disguise)*
> Identical to Q46 but `1 ≤ n ≤ 2000`.
> *The intended solution changes completely. Notice that you now don't need the clever argument — and notice how tempting it is to write the clever one anyway.*

**Q270** `[MODELLED]` · `X` — **K Swaps** *(harder version)*
> Array of `n` integers. You may perform **at most k** swaps. Maximise the sum at odd indices.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k ≤ n`.

**Q271** `[MODELLED]` · `H` — **One Swap on a Tree** *(different input representation)*
> A rooted tree of `n` nodes with values. You may swap the values of **at most one** pair of nodes. Maximise the sum of values at nodes at even depth.
> **Constraints:** `1 ≤ n ≤ 2e5`.

#### Family B — "transform the input into a fixed target shape at minimum cost"
*Core skeleton: fix the split point; prefix cost + suffix cost. Equivalently small-state DP. Base problems are Q51, Q52.*

**Q272** `[MODELLED]` · `M` — **Sensor Stream Normalise** *(different story, different alphabet)*
> A stream of readings is a string over `{L, H}`. Valid form is `L⁺H⁺`. Each deletion costs 1. Minimum cost.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.

**Q273** `[MODELLED]` · `H` — **Three-Phase Form** *(harder — one more phase)*
> String over `{a, b, c}`. Valid form is `a⁺b⁺c⁺`. Deletion costs 1. Minimum cost.
> **Constraints:** `1 ≤ |s| ≤ 2e5`. *One extra split point. Does your Q51 method scale, or do you need the DP formulation?*

**Q274** `[MODELLED]` · `H` — **Replacement Instead of Deletion** *(different operation)*
> String over `{a, b}`. You may **replace** any character with the other at cost 1, but may not delete. Target form `a⁺b⁺`. Minimum cost.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.

**Q275** `[MODELLED]` · `H` — **Per-Character Costs** *(weighted version)*
> String over `{a, b}`. Deleting position `i` costs `w_i`. Target `a⁺b⁺`. Minimum cost.
> **Constraints:** `1 ≤ |s| ≤ 2e5`, `1 ≤ w_i ≤ 1e9`.

**Q276** `[MODELLED]` · `X` — **Target Form, Construct the Result** *(different output)*
> As Q51, but print the resulting valid string of minimum cost. If several tie, print the lexicographically smallest.
> **Constraints:** `1 ≤ |s| ≤ 2e5`.

**Q277** `[MODELLED]` · `X` — **Non-Decreasing with Costs** *(generalised target)*
> An array of `n` integers with values in `[1, 26]`. Deleting element `i` costs `w_i`. Make the remaining array non-decreasing at minimum cost.
> **Constraints:** `1 ≤ n ≤ 2e5`. *`a⁺b⁺` was the two-value case of exactly this.*

#### Family C — pattern printing & implementation stamina
*Reported as regularly asked across the high-volume Indian assessment platforms. These are free marks that candidates drop through carelessness, not difficulty. Time yourself: each should take under 6 minutes, first try, no debugging.*

**Q278** `[MODELLED]` · `F` — Print a hollow rectangle of `*` with `r` rows and `c` columns.
**Q279** `[MODELLED]` · `F` — Print an inverted right triangle of numbers where row `i` prints `i` repeated `i` times.
**Q280** `[MODELLED]` · `F` — Print a diamond of `*` of height `2n−1`.
**Q281** `[MODELLED]` · `F` — Print Pascal's triangle to `n` rows, right-aligned in a fixed-width field.
**Q282** `[MODELLED]` · `F` — Print an `n × n` spiral of the numbers `1..n²`.
**Q283** `[MODELLED]` · `M` — Print an `n × n` matrix filled in **diagonal** order, top-right to bottom-left.
**Q284** `[MODELLED]` · `M` — Given `n`, print the number pyramid where row `i` reads `1 2 … i … 2 1`, centred.
**Q285** `[MODELLED]` · `M` — Print a butterfly pattern of height `2n` with `*` and correct interior spacing.

---

### 7.14 · RESERVED — BLIND SET POOL · Q286–Q305
### 🔒 DO NOT SOLVE UNTIL A BLIND SET ASSIGNS THEM

> These exist **only** to be met cold, mixed, and unlabeled. Their entire value is that you have never seen them. Part 11 draws from here. If you work through them now, you have destroyed the only measurement instrument in this document.
>
> Statements are listed in Part 11 at the moment each set is issued, not here.

`Q286` `Q287` `Q288` `Q289` `Q290` `Q291` `Q292` `Q293` `Q294` `Q295`
`Q296` `Q297` `Q298` `Q299` `Q300` `Q301` `Q302` `Q303` `Q304` `Q305`

---

### 7.15 · RESERVED — MOCK POOL · Q306–Q320
### 🔒 DO NOT SOLVE UNTIL A MOCK ASSIGNS THEM

> Every mock in Part 12 contains at least two problems from this pool, so that no mock is a re-test of solved material. Statements appear in Part 12 with each mock paper.

`Q306` `Q307` `Q308` `Q309` `Q310` `Q311` `Q312` `Q313` `Q314` `Q315`
`Q316` `Q317` `Q318` `Q319` `Q320`

---
---

## PART 8 — REPORTED COMPANY QUESTIONS · R1–R34

**What these are:** questions candidates report having been asked, traced to specific interview-experience posts (sources in Appendix C). Trust them for **problem shape**. Wording and exact constraints are recalled after the fact, so treat those as approximate.

**What these are not:** verbatim transcripts. No legitimate source has those at scale.

> **Note on Juspay.** Juspay's drive has already passed. The questions below are retained **purely as general DSA training** — the functional-graph family (R1–R3) is one of the best-designed teaching sets available for that topic, and the locking-tree problem (R4) is an excellent custom-data-structure exercise. Treat them as you would any CSES section. There is no Juspay track in this plan and no Juspay week.

### 8.1 · Functional graph family
`[REPORTED]` · originally Juspay Round 1 · **now general DSA training**

> **One shared statement, three tasks.** Reported consistently across multiple colleges and years. This is a genuinely excellent teaching set: the same structure answers three different questions, which is exactly the transfer you are training for.
>
> **Shared statement.** A maze has `N` cells numbered `0..N−1`. Each cell may have many entry points but **at most one exit** — doors are one-way valves. You are given `Edge[]` of `N` integers: `Edge[i]` is the cell reachable from cell `i` in one step, or `−1` if cell `i` has no exit.

**R1** · `H` — **Maximum Weight Node**
> The weight of a node is the **sum of the node numbers of all nodes pointing to it**. Find the node number of maximum weight. On a tie, return the larger node number.

**R2** · `H` — **Largest Sum Cycle**
> There is at most one cycle in the graph. Find the **sum of node numbers in that cycle**. If there is no cycle, return `−1`.

**R3** · `X` — **Nearest Meeting Cell**
> Given two cells `C1` and `C2`, find the **nearest cell reachable from both** by following exits. Return `−1` if none exists.

### 8.2 · Custom data structures
`[REPORTED]` · originally Juspay Round 2 · **now general DSA training**

**R4** · `X` — **Tree of Space** — full statement at **Q64**; the extension is **Q65**.
> Worth doing well rather than merely passing: the reported follow-up round required candidates to reduce their own solution's complexity and make it thread-safe. That is a good discipline regardless of company.

**R5** · `M` — **Count stars between bars**
> A string of `*` and `|`. Answer range queries counting `*` strictly between bars within `[l, r]`.

**R6** · `F` — Check whether a binary tree is **height-balanced**; also return its height.
**R7** · `M` — **LCA** of two nodes in a binary tree. *(Same as Q62 — do it once.)*

### 8.3 · Sprinklr
`[REPORTED]` · 3 questions, HackerEarth, reported as 50/75/100 points with **partial marking**, >120 points to qualify

**R8** · `X` — **Maximise the product**
> Arrays `A` and `B`, both of size `n`. Perform **at most `n` operations**. Each operation picks an element `B[j]` and an index `i`, then sets `A[i] = A[i] + B[j]` **or** `A[i] = A[i] × B[j]`. Each `B[j]` may be used **at most once**; each `A[i]` may be chosen many times. Maximise the product of all elements of `A`.

**R9** · `M` — Number of **distinct pairs with sum K** in an array.
**R10** · `H` — An array of 0s and 1s; **flip exactly one contiguous portion** so the total number of 1s is maximised.
**R11** · `H` — Given task prerequisites, find the **minimum number of courses** needed to complete a given set of mandatory courses, or `−1` if impossible.
**R12** · `X` — Assign **primes below 100** to the vertices of a tree so that the sum of any two adjacent vertices is **not prime**. Count the number of ways.
**R13** · `M` — **IP validation**: classify a string as valid IPv4, valid IPv6, or neither.

### 8.4 · Amazon
`[REPORTED]` · 2 coding questions, 70–90 min, plus Work Simulation and Work Style Assessment

**R14** · `H` — **Burning Tree** — minimum time to burn an entire binary tree starting from a given node.
**R15** · `M` — **Overlapping Intervals** — merge, or count overlaps.
**R16** · `H` — **Longest Substring with At Least K Repeating Characters**.
**R17** · `M` — **Capacity To Ship Packages Within D Days**. *(Same as Q24 — do it once.)*

> **Reported and worth knowing:** passing all test cases does **not** guarantee advancing. Multiple candidates report rejections traced to the Work Simulation rather than the code.

### 8.5 · Walmart
`[REPORTED]` · reported campus format: Round 1 = 25 MCQs in 25 min; Round 2 = 2 coding questions in 90 min

**R18** · `H` — Reported only as "binary search + sorting + observation," medium difficulty. Modelled analogue: **Q223**.
**R19** · `M` — **Coin change combination** variation — counting the number of ways, not minimising coins.

### 8.6 · Goldman Sachs
`[REPORTED]` for R20–R21 · `[REPORTED-TITLE]` for R22–R25

**R20** · `M` — **Umbrella problem** — given umbrella capacities, find the **minimum number of umbrellas to cover exactly `M` people**, or `−1`.
**R21** · `H` — **Candies** — children in a row with ratings; each child gets at least 1 candy, and a child rated higher than an adjacent child must get more. Minimise total candies.

> **R22–R25 — honesty note.** The names **"Binary Tree Magic Number Sum," "Grid Operations," "Bird Singing," "Number Factors and Permutations"** and **"Planning District Layout"** appear in candidate reports for Goldman Sachs assessments, but **no usable problem statement survives in any source I could reach.** A name alone is not a solvable question, and I will not invent a statement and present it as theirs.
>
> What the names reliably tell you is the **topic mix**: tree path accumulation, grid simulation, factorisation plus combinatorics, and partition/layout DP. Train those with the modelled analogues below, which are honestly labelled as mine:

**R22** `[REPORTED-TITLE]` → analogue **Q68** (tree path sums) and **Q253** (tree contribution)
**R23** `[REPORTED-TITLE]` → analogue **Q226** (grid counting) and **Q240** (grid simulation)
**R24** `[REPORTED-TITLE]` → analogue **Q170** (divisor counting) and **Q262** (combinatorics)
**R25** `[REPORTED-TITLE]` → analogue **Q161** (layout/partition DP) and **Q167**

### 8.7 · Long-form assessment patterns
`[REPORTED]` · originally Infosys SP / DSE / HackWithInfy · **drive already passed — now general OA training**

> **Not a current target.** These are retained for two reasons, both about you rather than about Infosys. First, R28 and R29 are *your own* assessment questions — the single most accurate evidence in this document about where your reasoning actually fails. Second, the reported shape of this assessment (**3 questions in 3 hours, scored on efficiency rather than mere correctness**) is the shape most likely to expose the exact weakness this plan targets: you can reach a working brute force and still score nothing. Rehearsing that shape is worth doing no matter who sets the paper. Mock 6 and Mock 11 use it.

**R26** · `X` — **Gift boxes**
> `N` gifts of various types in a row. Pack them into **exactly `K` boxes**, where each box is a **contiguous** block. A box's value is the **number of distinct gift types inside it**. Maximise the total value across all boxes.

**R27** · `F` — **Pattern printing** — reported as regularly asked, to check logical flow. Trained by **Q278–Q285**.
**R28** · `H` — *(**your own assessment**)* odd numbers, one swap, maximise a sum → **Q46, Q47** and family **Q266–Q271**.
**R29** · `X` — *(**your own assessment**)* string → `a⁺b⁺` with removal and splice costs → **Q51, Q52** and family **Q272–Q277**.

> R28 and R29 are the highest-value entries in Part 8. You met them, you could not solve them, and both turned out to be one unstick move away — **bound the candidate set** (#13) and **fix the split point** (#5). Every time you fail a blind problem, check whether the miss belongs to the same two moves.

### 8.8 · Cradlepoint, Palo Alto Networks, and others

**R30** `[REPORTED]` · `M` — **Cradlepoint.** Reported OA format is unusual: **3 difficulty levels, 2 questions each, must solve at least one per level.** Reported interview content: linked-list manipulation, string operations, Fibonacci variants, and SQL `INNER JOIN`. Trained by **Q189–Q193** and **Q171**.

**R31** `[REPORTED]` · `M` — **Palo Alto Networks.** Reported OA: 2 easy/medium coding questions plus **30 aptitude MCQs**. Reported interview content: a string-manipulation question and a hashmap-based medium question, plus SQL and REST/DBMS discussion. Trained by **Q166, Q113, Q112**.

**R32** `[REPORTED]` · `M` — **DANFOSS** (on-campus 2025) — find subarrays with equal sum.
**R33** `[REPORTED]` · `F` — **ABB India** (off-campus 2025) — count symmetric integers in a range.
**R34** `[REPORTED]` · `M` — **YOKOGAWA** — repeatedly increment the smallest element to maximise the final product.

---
---

## PART 9 — COMPANY FORMAT REFERENCE
### Reference only. Not a preparation schedule.

> **Read this once, then leave it alone until a drive is actually announced.**
>
> **No company below is a current target.** These are companies that have recruited at DIT University historically. A published recruiter list tells you who *has* come, not who is coming — and I will not invent hiring information I do not have.
>
> **What changed from v2.0:** the previous version gave eleven companies a "Train with" column, which reads like eleven parallel prep tracks. It isn't, and it shouldn't look like one. The column below is now **"If a drive is announced"** — a pointer to skim in the days *after* you get the email, not work to do now.
>
> Company trivia is not the skill. General unseen-problem ability transfers to every row here; memorising this table transfers to none of them.

**Evidence grades:**
`REPORTED FORMAT` — candidates describe this structure consistently · `INFERRED` — deduced from few reports, treat as a guess · `NO DATA` — nothing reliable found; prepare generally

### 9.1 · Assessments reported as DSA-heavy

| Company | Format | Evidence | Reported focus | If a drive is announced |
|---|---|---|---|---|
| **Sprinklr** | 3 coding, HackerEarth, 50/75/100 pts, partial marking, >120 to qualify | `REPORTED FORMAT` | Hashing, arrays, greedy, prerequisite graphs, tree counting | R8–R13, Q155, Q156, Q133, Q251 |
| **Amazon** | 2 coding (70–90 min) + Work Simulation + Work Style | `REPORTED FORMAT` | Arrays/strings with prefix and window, hashing, trees, graphs; DP in harder slots | R14–R17, Q153, Q154, Q86, Q19–Q22 |
| **Goldman Sachs** | Coding + heavy aptitude | `REPORTED FORMAT` | Greedy, trees, grids, combinatorics | R20–R21, Q164, Q37, Q262 |
| **Walmart** | 25 MCQ / 25 min, then 2 coding / 90 min | `REPORTED FORMAT` | Binary search + sorting + observation; counting DP | R18–R19, Q162, Q223, Q100 |
| **Palo Alto Networks** | 2 coding + 30 aptitude MCQ | `REPORTED FORMAT` | Strings, hashmaps, ranges, SQL | R31, Q166, Q113, Q112 |
| **Cradlepoint** | 3 levels × 2 questions, ≥1 per level | `REPORTED FORMAT` | Linked lists, strings, Fibonacci, SQL | R30, Q189–Q193 |
| **Harness** | 2–3 coding | `INFERRED` | Scheduling, DAGs, intervals | Q157, Q158, Q36, Q73, Q241–Q245 |
| **Oracle** | 2–3 coding + SQL | `INFERRED` | Trees, DP | Q161, Q59, Q102, Q103 |
| **Adobe** | DSA + aptitude | `INFERRED` | Medium DSA, geometry-flavoured | Q165, Q131, Q41, Q244 |
| **Google / Directi** | 2 coding, hard | `INFERRED` | Mathematical observations, CF B/C level | Q168, Q147, Q110, Q233 |
| **Morgan Stanley / Nomura** | Coding + aptitude | `INFERRED` | Graphs, greedy, math | Q163, Q75, Q246 |

### 9.2 · Assessments reported as aptitude-heavy

| Company | Format | Evidence | If a drive is announced |
|---|---|---|---|
| **ZS Associates** | 75 min, **no sectional timer**; Quant / Logical / Verbal / **DI as its own section**. Coding section (reported 10–15 questions) **only for BTA & DSA profiles** | `REPORTED FORMAT` | **Part 10** — and note this is the one shape nothing else in the plan trains, which is why it holds priority 3 rather than 4 |
| **ThoughtWorks** | Logic-heavy, pair-programming round later | `INFERRED` | Q132, Q136, Q139, Q255–Q258 |
| **Deloitte / Accenture / IBM** | Cognitive + coding | `INFERRED` | Q167, Q151, Q104 + Part 10 |
| **TCS** (NQT / Digital / Prime), **Wipro** (Turbo / Elite), **Cognizant** (GenC / Next / Pro) | Aptitude-dominant; pattern printing, arrays, strings, basic DP | `INFERRED` | Q278–Q285, Q167, Part 10 |
| **JSW · UNO MINDA · Bosch · CIPLA · Nestlé · Reliance · Ashok Leyland · Yamaha** | Core/non-IT profiles, aptitude-dominant, light programming | `NO DATA` | Part 10, Q278–Q285 |
| **Daffodil / Flexcar / Encryption Consulting** | Standard medium DSA | `NO DATA` | Any Week 1–3 `M` |

### 9.3 · Historical — drives already passed

Listed for completeness so nothing looks like an omission. **Neither consumes preparation time.** Their questions live in Part 8 as general training, and they are genuinely good problems — that is the only reason they survive.

| Company | Status | Where the questions went |
|---|---|---|
| **Juspay** | Drive passed | R1–R7 → functional graphs, cycle detection, custom data structures. Q64, Q65, Q76 |
| **Infosys** | Drive passed | R26–R29 → Q46–Q52 and families Q266–Q285. **Includes your own two questions**, the best weakness evidence you have |

> **The moment a drive is actually announced,** tell me the company and date. I will re-plan within a day: skim that row, run one format-matched mock, and otherwise **keep doing exactly what this plan already says**. That is not a weakness of the plan — a general solver walks into any of these papers. A company-specific crammer walks into one.

---
---

## PART 10 — APTITUDE, LOGICAL REASONING & DATA INTERPRETATION · Z1–Z42
### The ZS Associates assessment shape

**Why this section holds priority 3, above other companies.** Not because a ZS drive is confirmed — **it is not**, and I have no information saying otherwise. It ranks above the rest of Part 9 for a structural reason: **nothing else in this document trains this shape at all.** Parts 2–8 build coding ability, which transfers across every DSA assessment you will ever sit. A 75-minute paper of quant, logic, verbal and data interpretation transfers to none of it. That gap is worth 42 items regardless of who is hiring, because the aptitude-heavy shape is common across Indian campus recruiting generally — Palo Alto (reported 30 MCQs), Walmart (reported 25 MCQs), Goldman, Deloitte, Accenture, IBM, TCS, Wipro and Cognizant all reportedly mix it in.

**The reported ZS assessment** is **75 minutes, no sectional timer**, covering **Quantitative Ability, Logical Reasoning, Verbal Ability, and Data Interpretation as a separate fourth section** — with a coding section only for BTA/DSA profiles.

**The structural trap: no sectional timer.** You can spend all 75 minutes on section one and score zero on the rest. Nothing stops you. That is the actual failure mode, and it is a time-management problem, not a knowledge problem.

**Budget for a 75-minute paper — set a phone timer per block and obey it:**

| Section | Minutes | Notes |
|---|---|---|
| Verbal | 12 | Fastest per-mark section. Do it **first** to bank marks |
| Quantitative | 22 | Skip anything not started within 60 seconds |
| Logical Reasoning | 18 | Puzzle sets — commit or abandon, never half-solve |
| **Data Interpretation** | 20 | Highest marks per minute *if* you read the chart correctly first |
| Buffer | 3 | Return to flagged questions |

This section is deliberately compact — it should not bloat the DSA bank. Work Z1–Z42 in four sittings, not daily.

### 10.1 · Quantitative Ability · Z1–Z12
*Topics reported: arithmetic, algebra, time & work, time-speed-distance, percentages, profit & loss, ratio, geometry, logarithms, permutations & combinations, probability.*

**Z1** `F` — Two pipes fill a tank in 12 and 18 minutes; a third empties it in 24. All open together — time to fill from empty?
**Z2** `F` — A train 240 m long passes a platform 360 m long in 30 s. Speed in km/h? Then: time to pass a man standing still?
**Z3** `M` — An item is marked up 40% then discounted 25%. Net profit percent? Then: what single discount on the marked price gives the same result?
**Z4** `M` — A and B can finish work in 12 and 15 days. They work alternately, A first. Days to complete?
**Z5** `M` — Mixture of 60 L milk and water in ratio 7:3. How much water to add to make it 3:2?
**Z6** `M` — Compound interest on ₹15,000 at 8% for 2 years, compounded half-yearly. Difference from simple interest?
**Z7** `M` — A boat covers 24 km downstream in 3 h and returns in 4 h. Speed of boat and stream?
**Z8** `H` — In how many ways can the letters of `ASSESSMENT` be arranged so no two `S` are adjacent?
**Z9** `H` — Two dice thrown. Probability that the sum is prime, given at least one die shows an even number?
**Z10** `H` — A circle is inscribed in a right triangle with legs 6 and 8. Radius?
**Z11** `H` — If `log₂(x) + log₄(x) + log₈(x) = 11`, find `x`.
**Z12** `H` — A sum doubles in 6 years at simple interest. In how many years does it triple? Then the same question for compound interest.

### 10.2 · Logical Reasoning · Z13–Z24

**Z13** `F` — Series: `3, 7, 16, 35, 74, ?`
**Z14** `F` — Series: `2, 6, 12, 20, 30, ?` — then state the general term.
**Z15** `M` — Blood relations: "Pointing to a photo, Ravi said, *That man's son is my father's only son's son.*" How is the man related to Ravi?
**Z16** `M` — Direction sense: walk 5 km north, turn right, 3 km, turn right, 8 km, turn left, 4 km. Distance and direction from start?
**Z17** `M` — Seating: eight people around a circular table, four facing centre. Six constraints given. Determine the arrangement.
**Z18** `M` — Coding-decoding: if `TRAINING` is written as `SQZHOJOH`, how is `PLACEMENT` written?
**Z19** `H` — Syllogism with three statements and four conclusions. Which follow?
**Z20** `H` — Puzzle: five consultants, five cities, five joining months, five practice areas. Twelve clues. Complete the grid.
**Z21** `H` — Input–output machine: given two steps of a sorting machine's output, produce step 5.
**Z22** `H` — Data sufficiency: a question plus two statements. Determine which alone or together suffice.
**Z23** `M` — Clocks: at what time between 4 and 5 o'clock are the hands at 90°? Both occurrences.
**Z24** `M` — Calendar: if 15 August 2026 is a Saturday, what day is 26 January 2030?

### 10.3 · Data Interpretation · Z25–Z36
**This is the section that carries ZS.** It is its own section in their paper, and it is the most trainable of the four.

> **Method — apply it to every set below.** Before touching any question: **(1)** read the chart title and both axis labels aloud; **(2)** identify the units and whether values are absolute or percentage; **(3)** note any footnote — footnotes exist to catch you; **(4)** *only then* read the questions. Most DI errors are reading errors, not arithmetic errors.

**Z25** `F` — Table: revenue of 5 divisions across 4 years. Compute year-on-year growth for one division.
**Z26** `F` — Bar chart: units sold by 4 products in 5 quarters. Which product had the highest percentage growth Q1→Q5?
**Z27** `M` — Pie chart of expenditure with a total given. Find the absolute value of two segments and their ratio.
**Z28** `M` — Line graph: two companies' profits over 6 years. In how many years did A exceed B by more than 20%?
**Z29** `M` — Table with a missing cell and a given total. Fill the cell, then answer two dependent questions.
**Z30** `H` — **Caselet DI** (paragraph, no chart): 400 employees across 3 departments with ratios and percentages given in prose. Build the table yourself, then answer.
**Z31** `H` — Two charts that must be combined: a pie of market share and a bar of total market size by year.
**Z32** `H` — Percentage-change chart where the values shown are *changes*, not absolutes. Reconstruct absolute values from a base year.
**Z33** `H` — Table with a footnote altering one row's units. Answer three questions where two depend on noticing the footnote.
**Z34** `M` — Mixed chart: bar for revenue, line overlay for margin percent. Compute absolute profit by year.
**Z35** `H` — DI with data sufficiency: chart plus two statements; decide what is answerable.
**Z36** `H` — Radar/spider chart across 6 metrics for 3 products. Rank by total and by weighted total.

### 10.4 · Verbal Ability · Z37–Z42

**Z37** `F` — Reading comprehension, ~400 words, 4 questions (main idea, inference, vocabulary in context, tone).
**Z38** `M` — Para-jumbles: six sentences to reorder into a coherent paragraph.
**Z39** `M` — Sentence correction: ten sentences with subject-verb agreement, modifier placement, parallelism, and tense errors.
**Z40** `M` — Fill in the blanks: ten two-blank sentences testing collocation and connectives.
**Z41** `M` — Critical reasoning: identify the assumption, then the statement that most weakens the argument.
**Z42** `H` — Reading comprehension, ~700 words on an analytics/consulting topic, 5 questions including one requiring synthesis across paragraphs.

### 10.5 · Practice sources for Z-series

I have written the *specifications* above rather than 42 full question texts, because aptitude and DI need **volume with fresh numbers**, which is exactly what published banks provide well and a static document provides badly. Work them at:

- **IndiaBix** — quantitative aptitude and logical reasoning, categorised by topic
- **PrepInsta** — ZS-specific and company-specific paper structures
- **FACE Prep** — ZS pattern practice
- **Any CAT DI-LR set** — harder than ZS and therefore excellent training; caselet DI in particular

**Ask me for a full timed ZS-format mock** (`mock ZS`) and I will generate one with actual numbers, charts described in text, and a 75-minute clock.

---
---

## PART 11 — BLIND SETS

**The rule that makes these work:** every problem below comes from the reserved pool (Q286–Q305). You have never seen them, they are not grouped by topic, they are not ordered by difficulty, and several are **deliberately ambiguous on first read** so that rung 1 (RESTATE) and rung 2 (ASK) actually cost you something.

**Protocol:** timer on · 25 minutes per problem · no hints, no lookups, no editorials · if you cannot find a direction in 10 minutes, move on and return with leftover time · after the set, classify every failure (Part 14) *before* checking Appendix A.

---

### BLIND SET 1 — end of Week 1 · 5 problems · 2 hours

**Q286** — **Queue Discipline**
> A support desk logs `n` tickets. Ticket `i` arrives at minute `a_i` and needs `s_i` minutes. One agent works on one ticket at a time and never idles while tickets wait. When the agent is free, they take the waiting ticket with the smallest `s_i`; on a tie, the smallest index. Print the minute each ticket is finished.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ a_i, s_i ≤ 1e9`, arrival times not necessarily sorted.

**Q287** — **Almost Palindrome**
> A string `s` of lowercase letters. You may delete **at most one** character. Decide whether the result can be a palindrome. Print `YES`/`NO`.
> **Constraints:** `1 ≤ |s| ≤ 1e6`.

**Q288** — **Shipping Manifest**
> `n` parcels with weights. A truck departs whenever the parcels loaded so far reach total weight ≥ `W`, taking exactly those parcels, then loading resumes from the next parcel. Parcels load in the given order. How many trucks depart, and how many parcels are left unshipped?
> **Constraints:** `1 ≤ n ≤ 1e6`, `1 ≤ w_i ≤ 1e9`, `1 ≤ W ≤ 1e18`.

**Q289** — **Distinct Window Count**
> An array of `n` integers and a fixed `k`. For every window of `k` consecutive elements, print the number of distinct values in it.
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`, values up to `1e9`.

**Q290** — **Budget Ceiling**
> `n` departments requested budgets `r_i`. The total budget is `B`. Choose a single cap `c` such that each department receives `min(r_i, c)` and the total distributed is as large as possible without exceeding `B`. Print the largest integer `c` that works; if all requests can be met, print the maximum request.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ r_i ≤ 1e9`, `1 ≤ B ≤ 1e18`.

---

### BLIND SET 2 — end of Week 2 · 5 problems · 2 hours

**Q291** — **Cascade Failure**
> A data centre has `n` machines. Machine `i` depends on machine `d_i` (or `d_i = −1` if it depends on nothing). If a machine fails, everything depending on it fails too, transitively. Given `q` independent scenarios each naming one initially failing machine, print how many machines fail in total in that scenario.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q292** — **Reorder to Match**
> Two arrays `a` and `b` of length `n`. You may reorder `a` freely. Maximise the number of indices `i` where `a[i] > b[i]`.
> **Constraints:** `1 ≤ n ≤ 2e5`, values up to `1e9`.

**Q293** — **Threshold Alarm**
> A stream of `n` readings. An alarm fires at index `i` if the sum of the previous `k` readings (indices `i−k .. i−1`) exceeds `T`. Print the number of alarms. Then, in the same run: the smallest `k` for which at least one alarm fires.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k < n`, readings non-negative up to `1e9`, `1 ≤ T ≤ 1e18`.

**Q294** — **Room Repaint**
> A corridor of `n` rooms, each currently one of 3 colours. Repainting a room costs `c[i][j]` to change room `i` to colour `j` (0 if already that colour). No two adjacent rooms may share a colour. Minimum total cost.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q295** — **Split the Difference**
> An array of `n` integers. Find the number of index pairs `(i, j)` with `i < j` such that `a[i] + a[j]` is divisible by `k`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k ≤ 1e5`, `−1e9 ≤ a[i] ≤ 1e9`.

---

### BLIND SET 3 — end of Week 4 · 5 problems · 2.5 hours

**Q296** — **Contamination Trace**
> A lab has `n` samples. `m` transfer records, each `(u, v, t)` meaning material moved from sample `u` to sample `v` at time `t`. Contamination flows only forward in time. Given one initially contaminated sample and its contamination time, how many samples end up contaminated?
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ m ≤ 2e5`, `1 ≤ t ≤ 1e9`.
> *The times matter. Think carefully about what "forward in time" does to the graph.*

**Q297** — **Fuel Stops**
> A road of length `L` with `n` fuel stations at positions `p_i`, each selling fuel at price `c_i` per litre. A car starts at position 0 with an empty tank of capacity `C` litres, consuming 1 litre per unit distance. Minimum cost to reach `L`, or `−1`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ L, C ≤ 1e9`.

**Q298** — **Matching Brackets, Weighted**
> A string of `(` and `)`. Removing the character at position `i` costs `w_i`. Minimum cost to make the string balanced.
> **Constraints:** `1 ≤ |s| ≤ 2e5`, `1 ≤ w_i ≤ 1e9`.

**Q299** — **Grid Toggle**
> An `n × m` grid of 0s and 1s. One operation flips every cell in a chosen row **or** every cell in a chosen column. Decide whether the grid can be made all-zero, and if so, give the minimum number of operations.
> **Constraints:** `1 ≤ n, m ≤ 1000`.

**Q300** — **Version Compatibility**
> `n` software packages; package `i` has a version number `v_i`. `m` compatibility rules, each stating that packages `a` and `b` must have versions differing by exactly `d`. Decide whether a consistent assignment exists.
> **Constraints:** `1 ≤ n, m ≤ 2e5`, `0 ≤ d ≤ 1e9`.

---

### BLIND SET 4 — end of Week 6 · 5 problems · 2.5 hours

**Q301** — **Frequency Rebalance**
> A string of lowercase letters. In one operation you may change any character to any other. Minimum operations so that **every** letter present appears the same number of times. (Letters absent from the result do not count.)
> **Constraints:** `1 ≤ |s| ≤ 1e5`.

**Q302** — **Staircase Ascent**
> A staircase of `n` steps. Step `i` has a cost `c_i` and you may climb 1, 2, or 3 steps at a time. Additionally, you may **skip payment on at most one step**. Minimum total cost to reach step `n` from the ground.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ c_i ≤ 1e9`.

**Q303** — **Query the Merge**
> An array of `n` integers. `q` queries, each `(l, r)`: report the second-largest **distinct** value in `a[l..r]`, or `−1` if fewer than two distinct values exist. The array never changes.
> **Constraints:** `1 ≤ n, q ≤ 2e5`.

**Q304** — **Meeting in the Middle**
> Two people stand at nodes `s` and `t` of a tree with `n` nodes and unit edges. They move simultaneously, one edge per second, and want to meet at a node in minimum time. Both move optimally toward each other. Print the meeting node and the time; if they must meet on an edge (odd distance), print the node closer to `s`.
> **Constraints:** `1 ≤ n ≤ 2e5`.

**Q305** — **Compression Ratio**
> A string `s`. Define its run-length encoding cost as the sum over maximal runs of `1 + digits(run length)`. You may delete **at most `k`** characters. Minimise the encoding cost.
> **Constraints:** `1 ≤ |s| ≤ 100`, `0 ≤ k ≤ |s|`.
> *Read the bound on `|s|`. It is unusually small for this document, and it is telling you something.*

---
---

## PART 12 — MOCK ASSESSMENTS

**Every mock contains at least two problems you have never seen** (drawn from the Q306–Q320 reserve). v1's mocks recycled solved questions, which measures nothing.

**Conditions:** phone in another room · one timer · no lookups, no editorials, no compiler help beyond your own template · **read every question in the first 5 minutes and rate it 1–5 before writing any code** · obey the time box.

**After every mock, before checking anything:** write the post-mortem — minutes per question, where you stalled, and a failure code (Part 14) per question. Then request `postmortem` and I will build your next targeted set.

**Mocks rehearse assessment *shapes*, not companies.** What actually varies between real papers is the clock-per-question, whether partial credit exists, whether efficiency is scored, and whether aptitude is mixed in. Those are the variables below. A company name would add nothing you can act on.

| # | When | Format | Paper | Shape being rehearsed |
|---|---|---|---|---|
| 1 | End Week 1 | **60 min / 3** | Q306 · Q307 · Q3 | **Sprint.** 17 min/question — no time to be clever, triage decides everything |
| 2 | End Week 2 | **90 min / 3** | Q308 · Q309 · Q29 | **Standard.** The most common shape you will meet |
| 3 | End Week 3 | **120 min / 4** | Q310 · Q311 · Q51 · Q63 | **Efficiency-scored.** Assume a passing brute force earns little — optimise or lose the marks |
| 4 | End Week 4 | **75 min / 3** | Q312 · Q313 · Q77 | **Split paper.** Budget as if 25 min were already spent on MCQs |
| 5 | End Week 5 | **90 min / 3** | Q314 · Q315 · Q107 | **Partial credit.** Submit a working brute force on every question before optimising any |
| 6 | End Week 6 | **180 min / 4** | Q316 · Q317 · Q52 · Q127 | **Endurance, efficiency-scored.** Three hours is a concentration test as much as a coding one |
| 7 | Week 7 | **60 min / 3** | Q318 · Q131 · Q140 | **Sprint**, second attempt — compare triage against Mock 1 |
| 8 | Week 7 | **120 min / 4** | Q319 · Q135 · Q137 · Q143 | **Wide difficulty spread.** One is far easier than it looks and one is far harder |
| 9 | Week 7 | **75 min** aptitude | Z-series set | **No sectional timer.** The failure mode is spending 75 minutes on section one (Part 10) |
| 10 | Week 8 | **90 min / 3** | Q320 · R8 · R26 | **Unknown paper.** Mixed sources, no theme, exactly like a company you have never heard of |
| 11 | Week 8 | **180 min / 4** | R1 · R2 · R3 · Q168 | **Shared-statement paper.** Three questions on one setup — a real and disorienting format |

### The reserved mock problems

> Do not read past this line except during the mock that assigns the problem.

**Q306** `M` — **Duplicate Charge Detector**
> `n` transactions, each with a customer ID and an amount. A duplicate charge is two transactions with the same customer and the same amount occurring within `k` positions of each other in the log. Count duplicate charges.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ k ≤ n`.

**Q307** `H` — **Elevation Profile**
> `n` checkpoints along a trail with elevations. A "climb" is a maximal strictly increasing run. Report the number of climbs and the total elevation gained across all climbs. Then: the single longest climb's length.
> **Constraints:** `1 ≤ n ≤ 1e6`, elevations up to `1e9` in absolute value.

**Q308** `H` — **Warehouse Picking**
> `n` items at positions on a line, and a picker starting at position 0. The picker can carry at most `c` items at a time and must return to position 0 to unload. Minimum total distance walked to collect all items.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ c ≤ n`, positions up to `1e9`, all positive.

**Q309** `X` — **Bandwidth Allocation**
> `n` users each request `r_i` Mbps. Total available is `B`. Allocate so that the **minimum** allocation is maximised, no user gets more than requested, and the whole of `B` is used if possible. Print each allocation.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ r_i ≤ 1e9`, `1 ≤ B ≤ 1e18`.

**Q310** `H` — **Assembly Line Defects**
> A production line produces `n` items, each marked `G` (good) or `D` (defective). A batch is any contiguous run. A batch is **shippable** if it contains at most `k` defectives. Count shippable batches, then report the longest one.
> **Constraints:** `1 ≤ n ≤ 2e5`, `0 ≤ k ≤ n`.

**Q311** `X` — **Course Credit Planning**
> `n` courses; course `i` has credit `c_i` and a list of prerequisites. You may take at most `m` courses per semester and a course only after all its prerequisites are complete. Minimum semesters to reach total credit ≥ `K`, or `−1`.
> **Constraints:** `1 ≤ n ≤ 2000`, `1 ≤ m ≤ n`, prerequisites form a DAG.

**Q312** `H` — **Sensor Drift Correction**
> `n` sensor readings that should be non-decreasing. You may add any non-negative integer to any reading (never subtract). Minimum total added to make the sequence non-decreasing.
> **Constraints:** `1 ≤ n ≤ 1e6`, values up to `1e9`.

**Q313** `M` — **Access Log Sessions**
> `n` timestamped access events for various users, given unsorted. A user's session ends when they are inactive for more than `g` seconds. Count total sessions across all users, and report the longest single session's duration.
> **Constraints:** `1 ≤ n ≤ 2e5`, timestamps up to `1e18`.

**Q314** `H` — **Delivery Route Merge**
> `n` delivery stops on a line, and `k` drivers each starting at position 0. Each driver covers a contiguous set of stops. Minimise the maximum distance any single driver travels (a driver travels from 0 to their furthest stop).
> **Constraints:** `1 ≤ k ≤ n ≤ 2e5`, positions up to `1e9`.

**Q315** `X` — **Inventory Expiry**
> `n` items, item `i` expires at time `e_i` and yields profit `p_i`. Processing one item takes exactly 1 unit of time and an item must be fully processed strictly before it expires. One processor. Maximise total profit.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ e_i ≤ 1e9`, `1 ≤ p_i ≤ 1e9`.

**Q316** `H` — **Text Justification Cost**
> `n` words with lengths `l_i`, and a line width `W`. Words go on lines in order; a line's badness is `(W − used)³` where `used` is the sum of word lengths plus one space between adjacent words. The last line has badness 0. Minimise total badness.
> **Constraints:** `1 ≤ n ≤ 5000`, `1 ≤ W ≤ 1e5`.

**Q317** `X` — **Network Latency Upgrade**
> `n` routers, `m` bidirectional links with latencies. You may upgrade **at most one** link, setting its latency to 0. Minimise the latency from router 1 to router `n`.
> **Constraints:** `1 ≤ n ≤ 1e5`, `1 ≤ m ≤ 2e5`.

**Q318** `M` — **Seat Reservation**
> A row of `n` seats, initially empty. `q` operations: `BOOK k` reserves the leftmost block of `k` consecutive free seats and prints its start index (or `−1` if impossible); `FREE i k` frees `k` seats starting at `i`.
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ q ≤ 2e5`.

**Q319** `X` — **Tournament Bracket**
> `2^k` players with distinct skill ratings in a single-elimination bracket; the higher-rated player always wins. You may reorder the initial bracket freely. For each player, decide whether some arrangement lets them reach the final.
> **Constraints:** `1 ≤ k ≤ 17`.

**Q320** `X` — **Supply Chain Bottleneck**
> A DAG of `n` facilities and `m` directed edges, each with a throughput capacity. Material flows from facility 1 to facility `n`. Find the maximum amount that can be pushed along **any single path** (i.e. maximise the minimum capacity on a path).
> **Constraints:** `1 ≤ n ≤ 2e5`, `1 ≤ m ≤ 5e5`.

---
---

## PART 13 — THE INTUITION AUDIT

**Why this is not a checklist.** A self-graded "can you do sliding window? ✓" measures confidence, not ability. This audit is **blind**: 18 problems, no topics, no difficulty, no grouping.

**The task is not to solve them.** For each, in **5 minutes maximum**, write in your log:

```
(a) Restate in one sentence, no story words
(b) The complexity budget the constraints allow
(c) The brute force and why it fails
(d) ONE named direction — the technique you would pursue
(e) Your confidence: certain / probable / guessing
```

Then check Appendix A. **Score:** correct direction with "certain" = 2 · correct with "probable/guessing" = 1 · wrong = 0. Out of 36.

| Score | Reading |
|---|---|
| **30–36** | Direction-finding is working. Push into contest problems |
| **22–29** | Solid. The gaps are specific — find them in the misses |
| **14–21** | The ladder works but rung 7 is slow. More blind volume |
| **< 14** | Rungs 1–3 are still breaking. Go back to statement-stripping drills |

**Run this three times: end of Week 2, end of Week 5, end of Week 8.** The trend matters far more than any single score.

### The 18 audit problems

Use these, in this order, **without looking at their section headings elsewhere in this document**:

`Q290` · `Q110` · `Q136` · `Q225` · `Q152` · `Q176` · `Q251` · `Q54` · `Q207` · `Q292` · `Q139` · `Q216` · `Q299` · `Q162` · `Q76` · `Q305` · `Q248` · `Q168`

They span: binary search on answer, invariants, contribution counting, reframing, functional graphs, greedy exchange, offline processing, LIS in disguise, constraint-driven algorithm choice, parity, and two problems where **the obvious technique is the wrong one**.

### The nine recognitions being tested

| Recognition | Audit questions |
|---|---|
| Binary search predicates | Q290, Q162, Q225 |
| Greedy exchange arguments | Q292, Q136 |
| Sliding-window conditions | Q54, Q225 |
| Graph states | Q76, Q207, Q299 |
| DP states | Q305, Q139 |
| Contribution formulas | Q251 |
| Offline processing | Q248 |
| Data-structure requirements | Q248, Q168 |
| Constraint-driven choice | Q216, Q305, Q110 |

---
---

## PART 14 — THE FAILURE LEDGER

Every wrong or slow answer gets exactly one code. **The distribution of codes selects your next practice set** — that is the entire point of this system.

| Code | Failure | What it actually means | The medicine |
|---|---|---|---|
| **M** | Modelling | Couldn't strip the story into a clean question. Rung 1–2 broke | Statement-stripping: rewrite 10 statements into 2 lines of maths **without solving any**. Fastest-improving weakness on this list |
| **C** | Constraint | Didn't read the bounds, or targeted the wrong complexity | Q214–Q233 (constraint forensics). Enforce: budget written before idea |
| **B** | Brute force / complexity | Couldn't state a brute force, or couldn't see why it failed | Always write it. In an OA, *code* it — it is your partial-credit floor |
| **O** | Missed observation | Had every tool, missed the key insight | Extract the ONE sentence → observation bank → re-derive D+3. Then name **which of the 18 unstick moves** would have found it |
| **K** | Knowledge gap | Genuinely didn't know the algorithm | Derive it on the spot → code → 2 disguised variants → 1 at D+7. Closed in ~5 problems, not 15 |
| **I** | Implementation bug | Idea right, code wrong | Write the loop invariant as a comment **before** the loop. Grow the template library |
| **D** | Debugging / testing | Knew it was wrong, couldn't find why | Part 5 stress-testing. Mechanical and fully fixable |
| **T** | Time management | Solvable, but you spent the time badly | Mock-specific. Enforce read-all-first, ratings, and hard time boxes |

### The ledger row

```
| Date | Q# | Code | The one sentence I missed | Unstick move that finds it | D+3 | D+10 | D+21 |
```

### How the distribution selects your next set

| Dominant code | Next set is drawn from |
|---|---|
| **M** | Q149–Q168 (heavy story wrappers), Q266–Q277 (disguise families) |
| **C** | Q214–Q233 (constraint forensics) — the whole block |
| **B** | Any `X` problem, but you must submit a working brute force first |
| **O** | Blind sets, plus Q251–Q254 and Q176 (observation-dependent) |
| **K** | Whatever the gap is, taught on the spot, then its family |
| **I** | Q185–Q193, Q278–Q285 (implementation stamina) |
| **D** | Rebuild the stress harness; then re-attempt three past failures cold |
| **T** | More mocks, fewer new problems. The problem is not knowledge |

**Progress signal:** codes should migrate from **M/O** (can't model, can't observe) toward **I/T** (can solve, execution slips) across the eight weeks. That migration *is* the improvement, and it is more informative than any solve count.

### Spaced revisit

A problem is finished when you can reproduce **rungs 1–9 from a blank page** — not when it is accepted.

| When | Task | Pass condition |
|---|---|---|
| D+1 | Rungs 1–8 from memory, outline only | 5 minutes, no notes |
| D+3 | Code from scratch, without looking at your old solution | Passes, in ≤60% of the original time |
| D+10 | A disguised variant from the same family | Solve it without recognising it as "that problem" |
| D+21 | It reappears inside a blind set, unlabeled | You don't notice it is a revisit |

Codes **M**, **O** and **K** get the full cycle. Everything else gets D+1 and D+21.

---
---

## PART 15 — THE ADAPTIVE SCHEDULE

**This schedule is a default, not a contract.** The ledger overrides it. If Week 2 ends with **M** dominant, Week 3 shifts toward story-heavy problems regardless of what the table says.

### Daily engine

| Block | 4h day | 6h day | 2h day | Purpose |
|---|---|---|---|---|
| **A** Derivation | 60 | 75 | 40 | One new problem, guided. A new algorithm enters *only* when a problem demands it |
| **B** Blind work | 75 | 120 | 45 | 2–3 unlabeled problems, timed |
| **C** Implement & debug | 60 | 90 | 20 | Code A and B properly. Stress test. Fix your own bugs |
| **D** Retrieval & log | 30 | 45 | 15 | 5 constraint flashcards · re-derive a problem from 3 days ago from a blank page · update logs |

**Weekly:** Mon–Fri the four blocks · Sat mock + 45-minute post-mortem · Sun deep post-mortem, re-derive red items, one contest virtual, re-plan from the ledger.

**Real OA day** replaces everything. Afterwards, 30 minutes writing every problem you saw into the derivation log — statement as remembered, what you tried, where you stalled. That is the single most valuable data source available to this plan.

**Missed days:** skip forward, never backfill. Miss three or more and we re-cut the remaining weeks from the ledger, keeping mocks and dropping the least urgent teaching. The plan bends; the mock track does not.

### The eight weeks

| Week | Theme | Core | Gap-fillers | Blind / mock |
|---|---|---|---|---|
| **1** | Install the ladder. Kill the hidden-test problem | Q1–Q22 | Q214–Q216, Q278–Q280 | Blind Set 1 · Mock 1 (60/3) |
| **2** | Monotonic predicates, greedy, stack, heap | Q23–Q45 | Q217–Q221, Q241–Q243 | Blind Set 2 · Mock 2 (90/3) · **Intuition Audit #1** |
| **3** | One-operation optimisation, target forms, trees | Q46–Q68 | Q266–Q271, Q281–Q283 | Mock 3 (120/4, efficiency-scored) |
| **4** | Graph **modelling** — not algorithms | Q69–Q88 | Q234–Q240, Q246–Q248 | Blind Set 3 · Mock 4 (75/3) |
| **5** | DP by derivation | Q89–Q110 | Q222–Q227, Q259–Q262 | Mock 5 (90/3) · **Intuition Audit #2** |
| **6** | Trie, range structures, strings, bitmask | Q111–Q130 | Q228–Q233, Q251–Q258 | Blind Set 4 · Mock 6 (180/4) |
| **7** | Blind mode. No topic labels exist | Q131–Q148 | Q263–Q265, Q272–Q277 | Mocks 7, 8, 9 · 3 contest virtuals |
| **8** | Applied OA problems + reported set | Q149–Q168 | Q284–Q285, ZS Part 10 | Mocks 10, 11 · **Intuition Audit #3** |

**Q169–Q213** (math, bits, matrices, pointers, design, backtracking, game theory) run at **5–6 per week throughout**, never as a block. Design and bit tricks appear in Week 1–2 OAs, so they cannot wait until Week 6.

### Notes on specific weeks

**Week 4 is ~85% modelling drills and 15% new algorithm.** You know every graph algorithm this week uses. Many exercises are model-only with no coding: convert story → nodes/edges/weights in under 10 minutes, then move to the next. The modelling is the graded part.

**Week 7 has zero scheduled teaching.** New algorithms appear only when a problem demands one, taught in 20 minutes, then immediately varied. This is where unseen-problem ability actually gets built — Weeks 1–6 are preparation for it.

### Contest integration

Rating is irrelevant. You are training observation-extraction from unfamiliar statements, which is precisely your gap, and contests are the densest available source.

| Platform | Use | Why it earns the slot |
|---|---|---|
| **AtCoder ABC** | A–D, virtual | Best OA proxy that exists. Clean English, story-flavoured; C/D map onto OA medium/hard. Start here |
| **Codeforces Div 3** | Full set, virtual | High volume of observation-not-algorithm problems; teaches Σn constraint reading |
| **Codeforces Div 2** | A/B → then C | C-level is where hard-OA lives |
| **CodeChef** | Div 3/4, Starters | Indian problem-setting style |

**Cadence:** 1 virtual/week in Weeks 1–4, 2/week in Weeks 5–8. Real timer, no editorial, **upsolve within 24 hours** — the upsolve is where the learning is; the contest is only the measurement.

### Checkpoints

| End of | Target |
|---|---|
| **Week 2** | Restate + budget + brute force within 3 minutes on anything unseen. 1/3 clean in a 60-minute mock. Stress testing automatic. Audit ≥ 14/36 |
| **Week 4** | **2/3 in a 60-minute mock.** Correct direction within 8 minutes on 70% of blind problems. Any story → graph model in 10 minutes |
| **Week 6** | **2/4 in a 120-minute mock, plus partial on a third.** ABC problem C reliable. Codes migrating M/O → I/T. Audit ≥ 24/36 |
| **Week 8** | **3/4 in a 180-minute mock.** ABC D sometimes. CF Div 2 B reliably, C occasionally. Audit ≥ 30/36 |

### Working commands

| Type this | You get |
|---|---|
| `session` | Block A — one guided derivation, questions not answers |
| `blind N` | N unlabeled problems, timed, no hints |
| `mock 90/3` | A full timed mock in any format |
| `mock ZS` | A 75-minute ZS-format paper with real numbers and DI sets |
| `stuck L1` / `L2` / `L3` | Escalating hint. L1 = which rung is wrong. L2 = the observation. L3 = observation + structure. **Never code** |
| `debug` | The debug protocol — I ask, you find it |
| `postmortem` | Mock analysis, ledger update, targeted follow-up set |
| `ledger` | Review the failure distribution, re-plan the week |
| `flash` | 5 constraint blocks with no statements — name the families |
| `strip` | 5 statements, rungs 1–3 only, no solving |
| `audit` | Run an Intuition Audit |
| `OA <company>` | Log a real OA; I convert it into training within 24 hours |

---
---
---

# APPENDIX A — TOPIC & INTUITION KEY

## ⚠️ SPOILERS. Do not read before attempting.

Each row gives the technique, the **key observation** (the one sentence that unlocks it), the expected complexity, and the intuition family. Read a row only after you have attempted or genuinely failed the problem.

<br><br><br><br><br><br><br><br><br><br><br><br>

### Q1–Q22 · Repeated work → structure

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q1, Q11 | HashSet | Only walk a run from its start; `x` is a start iff `x−1` absent. Total walk work is Σrun lengths = n | O(n) | Amortization |
| Q2, Q6 | Prefix + hashmap of **frequencies** | The same prefix value recurs and each occurrence is a distinct subarray — a set loses count | O(n) | Repeated work |
| Q3, Q22 | Monotonic deque | An element smaller than a later one can never be a future maximum — evict it forever | O(n) | Amortization |
| Q4, Q13 | Difference array | Range add + query only at the end means you never need the intermediate array | O(m + q) | Prefix/suffix |
| Q5 | Hashmap of last index | Only the most recent occurrence can satisfy a distance bound | O(n) | Hashing |
| Q7, Q10 | Prefix mod k + hashmap | Two prefixes with equal remainder bound a divisible subarray. In C++, `((x % k) + k) % k` | O(n) | Modular |
| Q8 | Prefix mod + **first** index | Length ≥ 2 requires the *earliest* index, not a count | O(n) | Repeated work |
| Q9, Q12 | Prefix + hashmap of **first occurrence** | For longest, store the earliest index; for count, store frequency. Same map, opposite policy | O(n) | Repeated work |
| Q14 | Prefix/suffix products | Every element's answer is left-product × right-product | O(n) | Prefix/suffix |
| Q15 | Single pass, last index | Track the previous 1's index only | O(n) | Implementation |
| Q16, Q17 | Sweep line ±1, or heap of ends | Sort events, not intervals; a start is +1 and an end is −1 | O(n log n) | Sweep line |
| Q18 | Prefix/suffix Kadane | Best subarray through a deleted index = best ending left + best starting right | O(n) | Prefix/suffix |
| Q19–Q21 | Window + violation counter | The window is valid iff violations ≤ k, and validity is monotone in window shrinkage | O(n) | Sliding window |

### Q23–Q45 · Monotonic predicate, greedy, intervals, stack, heap

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q23–Q30 | **Binary search on answer** | If capacity X works, X+1 always works — the predicate is monotone, so binary search it and check greedily | O(n log V) | Monotonic predicate |
| Q31 | Greedy + feasibility | If total gas ≥ total cost a solution exists; the start is just after the running minimum | O(n) | Invariant |
| Q32 | Greedy interval jumping | Think in BFS layers over reachable ranges | O(n) | Greedy |
| Q33 | Greedy + formula | Only the most frequent task's count and its tie-count matter | O(n) | Contribution |
| Q34 | Sorted multiset, `upper_bound` | Assign the largest ticket not exceeding the bid | O(n log n) | Greedy |
| Q35 | Greedy left-first | Falling left is never worse than falling right — exchange argument | O(n) | Exchange |
| Q36, Q44 | Sweep, or min-heap of ends | Rooms needed = maximum simultaneous overlap | O(n log n) | Sweep line |
| Q37 | Min-heap, Huffman merge | Always merge the two smallest; **use 64-bit** | O(n log n) | Exchange |
| Q38 | Monotonic stack (decreasing) | Pop while the incoming element is larger — each pop resolves one answer permanently | O(n) | Amortization |
| Q39, Q41 | Monotonic stack | For each bar, find the first smaller on each side; that span is its maximal rectangle | O(n) | Contribution |
| Q40 | Monotonic stack + **contribution** | Count how many subarrays have `a[i]` as their minimum: `(i−left)×(right−i)`. Never enumerate subarrays | O(n) | Contribution |
| Q42 | Heap of size k / quickselect | You never need the full sorted order | O(n log k) | Heap |
| Q43 | Two heaps | Max-heap for the lower half, min-heap for the upper; keep sizes within 1 | O(log n)/op | Heap |
| Q45 | SRTF with a min-heap | At every arrival, the shortest remaining job should be running | O(n log n) | Greedy |

### Q46–Q68 · One-operation optimisation, target forms, trees

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q46, Q47 | **Bound candidates** + prefix/suffix | Only a swap moving the largest even-index value into the smallest odd-index slot (or vice versa) can help — O(n) candidates, not O(n²) | O(n) | Prefix/suffix |
| Q48, Q49 | Prefix/suffix Kadane | Fix the removed block's boundary; join best-left and best-right | O(n) | Prefix/suffix |
| Q50 | Split point + prefix/suffix | Fix the day dividing the two transactions | O(n) | Fix one variable |
| Q51, Q53 | **Fix the split point** | Cost = (deletions to make everything left of i an `a`) + (right a `b`). Both are prefix scans. Equivalently `dp[i][0/1]` | O(n) | Fix one variable |
| Q52 | Split point, three cost tracks | First/last/interior costs mean the *position* of a deletion matters, so track from which end you are trimming | O(n) | Fix one variable |
| Q54 | **Reframe the operation** | Removing only from the ends = keeping a middle window. Average ≥ t ⟺ sum of `(score − t)` ≥ 0 over that window | O(n) | Reframing |
| Q55 | Sort + window on distinct | The kept elements must fit inside a value-window of width n | O(n log n) | Sliding window |
| Q56, Q58 | Tree DP | Each node returns best-downward; the answer combines the two best children at that node | O(n) | Tree DP |
| Q57 | DFS/BFS + column coordinate | Column index is the sort key; row order breaks ties | O(n log n) | Tree traversal |
| Q59, Q66 | Subtree aggregation | Post-order accumulation; for depth-bounded counts, an Euler tour plus a depth-indexed prefix array | O(n) | Tree DP |
| Q60 | **Rerooting** | Compute downward answers, then push parent contributions down in a second DFS | O(n) | Tree DP |
| Q61, Q63 | Binary lifting | Precompute `up[v][k] = 2^k`-th ancestor; lift both nodes to equal depth then jump together | O(n log n) | Binary lifting |
| Q62, R7 | LCA recursive | A node is the LCA if its two subtrees contain one target each | O(n) | Tree recursion |
| Q64, R4 | Tree + **descendant-locked counter** | Maintain per node a count of locked descendants and a locked-ancestor check by walking up; both are O(depth), and `upgrade` needs the set of locked descendants | O(depth)/op | Custom DS |
| Q65 | Euler tour + Fenwick | Subtree = a contiguous range in the Euler tour, so subtree counts become range sums | O(log n) | Range queries |
| Q67 | Preorder + null markers | Nulls are what make the serialization uniquely decodable | O(n) | Tree traversal |
| Q68 | DFS + running path prefix map | Path sums along a root-to-node path are prefix sums; undo the map entry on the way back up | O(n) | Repeated work |

### Q69–Q88 · Graph modelling

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q69, Q86, Q77, Q81 | **State-space graph** | The node is not the city — it is (city, resource used). Then run Dijkstra/BFS unchanged | O((n·k) log(n·k)) | Graph modelling |
| Q70, Q88 | BFS on (cell, key bitmask) | With ≤6 keys the state space is 64× the grid, which is trivially small | O(r·c·2^k) | Bitmask + BFS |
| Q71 | **0-1 BFS** | Costs of only 0 and 1 mean a deque replaces the priority queue | O(n + m) | Graph modelling |
| Q72 | Negative cycle | Take `−log(rate)`: a product > 1 becomes a negative sum, so Bellman–Ford detects it | O(n·m) | Transform |
| Q73, Q83 | Topological sort + DAG DP | Longest path in a DAG is well-defined; process in topological order | O(n + m) | DAG DP |
| Q74, Q79 | Multi-source BFS | Push every source at distance 0 simultaneously — one BFS, not many | O(r·c) | BFS |
| Q75 | **Reverse time** + DSU | DSU cannot un-merge, so process deletions backwards as additions | O((n + q) α) | Offline |
| Q76, Q85, R1–R3 | **Functional graph** | Exactly one outgoing edge per node ⇒ every component is a ρ: a tail feeding one cycle | O(n) | Functional graph |
| Q78 | Bipartite matching | Kuhn's augmenting paths; feasible iff matching size = m | O(V·E) | Matching |
| Q80, Q235 | DSU / DFS components | Edges needed = components − 1 | O(n α) | DSU |
| Q82 | Kahn's algorithm | A cycle exists iff fewer than n nodes are ever dequeued | O(n + m) | Topological sort |
| Q84 | Bellman–Ford | A node still relaxing on the n-th pass lies on or after a negative cycle | O(n·m) | Shortest paths |
| Q87 | Implicit graph + BFS | Edges are computed on demand, never stored | O(n·L·26) | Graph modelling |

### Q89–Q110 · Dynamic programming

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q89–Q91, Q100, Q101 | 1D DP | State = position; transition = the allowed moves | O(n·k) | DP state |
| Q92, Q102 | 0/1 knapsack | State = (item, capacity used) | O(n·W) | Knapsack |
| Q93 | **Value as the DP dimension** | Weight is too large to index but total value is small — so invert the table and store minimum weight per value | O(n·ΣV) | Constraint-driven |
| Q94, Q103 | 2D sequence DP | State = (prefix of A, prefix of B) | O(n·m) | Subsequence DP |
| Q95, Q226a | Grid DP | Paths to a cell = paths from above + paths from left | O(r·c) | Grid DP |
| Q96 | Probability DP | State = (coins used, number of heads) | O(n²) | Probability |
| Q97, Q205, Q206 | Interval game DP | `dp[i][j]` = best **margin** the player to move can force, not their raw score | O(n²) | Game theory |
| Q98 | Interval DP | Fix the last merge point; cost splits at it | O(n³) | Interval DP |
| Q99 | Tree DP, 2 states | Each node is taken or not; children constrain accordingly | O(n) | Tree DP |
| Q104 | Circular 1D DP | Run the linear version twice: excluding the first, and excluding the last | O(n) | 1D DP |
| Q105 | Patience + binary search | Maintain the smallest possible tail for each length | O(n log n) | LIS |
| Q106 | State machine DP | Three states — holding, just sold, resting | O(n) | DP state |
| Q107 | 1D DP + extra flag | Add a "skip already used?" dimension to house-robber | O(n) | DP state |
| Q108 | Sort + O(n²) DP | `n ≤ 3000` invites O(n²); state = (customer index, tiers placed) | O(n·k) | Constraint-driven |
| Q109, Q130 | **Bitmask DP** | `n ≤ 18` / `n ≤ 15` is the entire hint; state = set of used positions | O(2ⁿ·n) | Bitmask DP |
| Q110 | **Binary search on answer** + BFS | Not DP. Binary search the allowed difference; check reachability | O(r·c·log V) | Monotonic predicate |

### Q111–Q148 · Structures, strings, mixed

| Q | Technique | Key observation | Complexity | Family |
|---|---|---|---|---|
| Q111, Q113 | Trie | Shared prefixes are compared once, not repeatedly | O(total length) | Trie |
| Q112 | Binary trie, greedy | Walk from the top bit, always trying the opposite branch | O(n·32) | Trie + bits |
| Q114, Q118 | Fenwick | Point update + prefix query. For ranks, index the tree by *value* after compression | O(log n) | Range queries |
| Q115, Q119 | Segment tree (Q119 lazy) | Range add + range max needs lazy propagation | O(log n) | Range queries |
| Q116 | Fenwick on a difference array | Range update becomes two point updates | O(log n) | Difference array |
| Q117 | Fenwick + compression, right→left | Process from the right; query the count of already-inserted smaller values | O(n log n) | Offline |
| Q120 | Prefix XOR | No tree needed — XOR is invertible, so prefix arrays suffice. Recognising this *is* the question | O(1)/query | Prefix/suffix |
| Q121–Q123, Q126 | **KMP failure function** | `π[i]` = longest proper prefix that is also a suffix; on mismatch fall back rather than restart | O(n + m) | String matching |
| Q124 | Expand around centre | 2n−1 centres, each expanded outward | O(n²) | Palindrome |
| Q125 | Palindrome DP + partition DP | Precompute all palindromic substrings, then a 1D partition DP | O(n²) | Partition DP |
| Q127 | Eertree, or hashing + Manacher | Distinctness is the difficulty, not palindromicity | O(n) | Palindrome |
| Q128, Q129 | Bitmask DP over subsets | State = the set already assigned | O(2ⁿ·n) | Bitmask DP |
| Q131 | Event sweep + heap | Free bays at departure events before processing the next arrival | O(n log n) | Sweep line |
| Q132 | Subset-sum DP | Bounded by `n·maxA` = 1e5, so a boolean table fits | O(n²·maxA) | Knapsack |
| Q133 | Sliding window | Extend while all characters are permitted | O(n) | Sliding window |
| Q134 | Clamped simulation | Refill is `min(C, tokens + elapsed)` — the clamp is where people lose marks | O(n) | Simulation |
| Q135 | Sweep + prefix/suffix maxima | Removing one interval: precompute max overlap using only intervals before i and after i | O(n log n) | Prefix/suffix |
| Q136, Q151 | Prefix sums | Answer is Σ\|prefix_i − i·avg\|; impossible when sum mod n ≠ 0 | O(n) | Invariant |
| Q137 | Sort both descending | Pair the biggest discount with the biggest price — exchange argument | O(n log n) | Exchange |
| Q138 | Persistent structure / offline DFS | Versions form a tree; a DFS over it maintains the current string in place | O(q log q) | Offline |
| Q139 | **LIS in disguise** | Strictly increasing ⟺ `a[i] − i` non-decreasing; minimum changes = n − LIS of that transform | O(n log n) | LIS |
| Q140 | Prefix sum, 0 → −1 | Equal counts ⟺ equal transformed prefix sums | O(n) | Prefix + hashmap |
| Q141 | Max gap / binary search | The answer is half the largest gap, bounded by the ends | O(n log n) | Monotonic predicate |
| Q142 | Two pointers | The window is monotone in its right endpoint | O(n) | Two pointers |
| Q143 | 1D DP over value counts | Rewrite as house-robber over the value axis, not the index axis | O(maxV) | Reframing |
| Q144 | State machine DP | State = what you did yesterday | O(n) | DP state |
| Q147 | Three ways | Two pointers · prefix/suffix maxima · monotonic stack. Doing all three is the exercise | O(n) | Multiple |
| Q148 | Window with a need-map | Step by word length; maintain counts of required words | O(n·L) | Sliding window |

### Q149–Q168 · Applied OA problems

| Q | Technique | Key observation | Complexity |
|---|---|---|---|
| Q149 | Simulation + per-lift state | `e ≤ 10`, so scanning all lifts per request is fine | O(n·e) |
| Q150 | Segment tree over compressed rates | Query = minimum cost over the suffix of rates ≥ r | O(q log n) |
| Q151 | Prefix sums, adjacent transfer | Same object as Q136 | O(n) |
| Q152 | **Invariant** | Adding 1 to everyone changes no relative order — so it changes nothing. A plain max-heap suffices; simulating the increment is the trap | O(n log n) |
| Q153 | **Bitmask** set cover | `n ≤ 20` warehouses ⇒ enumerate subsets | O(2ⁿ·m) |
| Q154, Q315 | Greedy by deadline + heap | Process by deadline; when over capacity, drop the least profitable already taken | O(n log n) |
| Q155 | Canonical signature + hashset | A sorted-letter string (or 26-count vector) is the canonical form | O(total length) |
| Q156 | Window with distinct-count map | Shrink from the left while all brands remain present | O(n) |
| Q157 | Greedy by right endpoint | Sort by deadline; schedule earliest-deadline-first and verify feasibility | O(n log n) |
| Q158 | DAG DP maximising a product | Take logs to turn the product into a sum, or carry doubles carefully | O(n + m) |
| Q159 | Weighted interval scheduling | Sort by end, DP, binary search for the last compatible interval | O(n log n) |
| Q160, Q162 | **Binary search on answer** | Guess the bucket size / ratio; check greedily | O(n log V) |
| Q161 | Interval DP | `n ≤ 3000` is the tell; fix the last merge | O(n²) |
| Q163 | DSU + net balances | Within a group, payments needed = (count of non-zero balances) − 1 | O(m α) |
| Q164 | Two pointers over surplus/deficit | Match surpluses to deficits greedily | O(n log n) |
| Q165 | Sweep + segment tree | Sweep one axis, maintain covered length on the other | O(n log n) |
| Q166 | Interval union tracking | A rule is shadowed iff its range is already fully covered | O(n log n) |
| Q167 | Sort + DP over (index, batches) | After sorting, batches are contiguous | O(n·k) |
| Q168 | Single scan | Find the one descending run; verify that reversing it yields strict increase | O(n) |

### Q169–Q213 · Math, bits, matrices, pointers, design

| Q | Technique | Key observation | Complexity |
|---|---|---|---|
| Q169 | gcd of all + divisor count | Common divisors of a set = divisors of their gcd | O(n + √g) |
| Q170, Q172, Q175 | Sieve (+ prefix counts) | Precompute once; answer each query in O(1) | O(V log log V) |
| Q171 | Binary exponentiation | Square and multiply | O(log e) |
| Q173 | lcm via gcd | Compute `b / gcd(a,b)` **in that order** or you overflow | O(log) |
| Q174 | Factorials + modular inverse | Fermat: `a⁻¹ ≡ a^(p−2) mod p` | O(n + q log p) |
| Q176 | **Invariant** | Each operation adds exactly 2 to the total; parity of the sum plus the `n·max` relation decides feasibility | O(n) |
| Q177, Q209, Q254 | **Digit DP** | State = (position, accumulated value, tight flag) | O(digits·s·2) |
| Q178 | Division and remainder | `m/n` each, remainder distributed one extra apiece | O(n) |
| Q179 | Bit counts mod 3 | Every bit position's count is a multiple of 3 except the singleton's | O(32n) |
| Q180 | Bitmask enumeration | Iterate `0 .. 2ⁿ−1` | O(2ⁿ·n) |
| Q181 | DP on bits | `dp[i] = dp[i>>1] + (i&1)` | O(n) |
| Q182 | Common binary prefix | Shift both right until equal, then shift back | O(log V) |
| Q183 | XOR + **lowest set bit** | XOR of all = `x^y`; its lowest set bit differs between them, so partition on that bit | O(n) |
| Q184 | SOS DP / complement | Count masks whose union is full — sum over subsets | O(2³⁰) too big ⇒ count complements | 
| Q185 | Transpose then reverse rows | Rotation = transpose + reflect | O(n²) |
| Q186 | Four shrinking boundaries | Track top/bottom/left/right | O(r·c) |
| Q187 | Row 0 and column 0 as markers | The O(1) space trick; handle the first row/column separately | O(r·c) |
| Q188 | Staircase walk | Start top-right; left decreases, down increases | O(r + c) |
| Q189–Q193 | Pointer discipline | Q190 = **Floyd's tortoise and hare** plus the entry-point formula; Q193 = interleave copies then split | O(n) |
| Q194 | Hashmap + doubly linked list | O(1) needs both: the map for lookup, the list for order | O(1)/op |
| Q195 | Second stack of minima | Store the running minimum alongside, or store deltas | O(1)/op |
| Q196 | Map + array, swap-with-last | Deletion in O(1) requires giving up order | O(1)/op |
| Q197 | Sorted list + binary search | Timestamps are non-decreasing, so append and binary search | O(log n) |
| Q198 | **Deque per user** | Evict expired timestamps from the front — memory is bounded by `k`, not by call count | O(1) amortized |
| Q199 | Two stacks of **deltas** | Store operations, not snapshots, or memory explodes | O(1)/op |
| Q200–Q203 | Backtracking + pruning | Q202 needs column/diagonal occupancy sets; Q203 marks in place and restores | exponential |
| Q204 | **DSU with parity** | Not backtracking. "Differ/match" is a parity constraint; the answer is `2^(components)` if consistent | O(m α) |
| Q207 | **Functional graph ρ** | Walk to find tail length and cycle length; then `T` reduces mod the cycle | O(n) |
| Q208, Q265 | **Matrix exponentiation** | A linear recurrence is a matrix power; `T ≤ 1e18` leaves no alternative | O(k³ log T) |
| Q210, Q263, Q264 | **Meet in the middle** | `n ≤ 40` ⇒ 2²⁰ per half; enumerate both, sort one, binary search | O(2^(n/2)·n) |
| Q211 | Closed form | Sum of squared distances is minimised at the **mean** (absolute distances → median) | O(n) |
| Q212 | Floyd on an implicit graph | Treat values as `next` pointers; the duplicate is the cycle entry | O(n) |
| Q213, Q255–Q257 | Stack evaluation | Two stacks (values, operators) with precedence, or recursive descent | O(n) |

### Q214–Q233 · Constraint forensics

| Q | The bound | What it forces | Complexity |
|---|---|---|---|
| Q214 | `n ≤ 20` | Enumerate all 2ⁿ subsets | O(2ⁿ) |
| Q215 | `n ≤ 40` | **Meet in the middle** — 2²⁰ per half is the only reason 40 appears | O(2^(n/2)) |
| Q216 | `w ≤ 1000`, `W ≤ 1e6` | Subset-sum **DP over the sum axis**. Same sentence, third algorithm | O(n·W) |
| Q217 | `n ≤ 400`, `q ≤ 1e5` | All-pairs precompute — **Floyd–Warshall** | O(n³) |
| Q218 | `n ≤ 1e5`, `q ≤ 10` | Few queries ⇒ run Dijkstra per query instead | O(q·m log n) |
| Q219 | `a_i ≤ 100` | Only 100 possible values ⇒ 100 prefix-count arrays | O(100·n) |
| Q220 | `a_i ≤ 1e9` | Compression can't help enough — **Mo's algorithm** or offline BIT | O((n+q)√n) |
| Q221 | `T ≤ 1e6` / `1e18` / k-term | Iterate · matrix power 2×2 · matrix power k×k | O(T) / O(log T) / O(k³ log T) |
| Q222 | `n ≤ 10` | `10! = 3.6e6` — full permutation search is intended | O(n!) |
| Q223 | `n ≤ 2e5` | Binary search the distance + greedy placement check | O(n log V) |
| Q224 | **Σn ≤ 2e5** | Per-test must be near-linear; a quadratic pass on one big test kills you | O(Σn) |
| Q225 | `n ≤ 2000` vs `1e6` | O(n²) allowed vs sort + two pointers mandatory | O(n²) / O(n log n) |
| Q226 | `r,c ≤ 1e5`, ≤2000 obstacles | Iterate over **obstacles**, not cells — combinatorics with inclusion-exclusion | O(k² + r + c) |
| Q227 | `k ≤ 18` | Bitmask over skills, DP over masks | O(n·2^k) |
| Q228 | **≤40 accesses** | log₂(1e6) ≈ 20, so ternary/binary search is the only fit | O(log n) |
| Q229 | `n ≤ 2e5` | Sort, then prefix sums give each answer in O(1) | O(n log n) |
| Q230 | `B ≤ 1e18`, `v ≤ 1000` | Budget can't index — **DP over total value**, storing minimum cost | O(n·Σv) |
| Q231 | Static, `q ≤ 1e6` | **Sparse table** — O(1) per query beats O(log n) at this query count | O(n log n) build |
| Q232 | Updates present | Sparse table dies; segment tree | O(log n)/op |
| Q233 | `n·60` questions | 60 ≈ log₂(1e18) — binary search each element | O(n log V) |

### Q234–Q265 · Coverage gap-fillers

| Q | Technique | Key observation | Complexity |
|---|---|---|---|
| Q234, Q236 | **MST** (Kruskal / Prim) | Sort edges, union greedily; the cut property is why it works | O(m log m) |
| Q235, Q240 | DSU / flood fill | Components; for Q240 test each 0 against its distinct neighbouring region IDs | O(n α) |
| Q237 | **MST + virtual node** | Model the satellite as an edge from node `i` to a virtual node 0 with weight `s_i`. Then it is a plain MST | O(n² log n) |
| Q238 | MST, then per-edge | Making edge `e` free = MST of the graph with `w(e) = 0`; only edges in some MST can help | O(m log m) |
| Q239 | MST + bridges per weight class | Within equal-weight groups, an edge is in *every* MST iff it is a bridge in the graph of that class | O(m log m) |
| Q241, Q242 | Sweep line | Sort endpoints; track active count between consecutive events | O(n log n) |
| Q243 | Sort per room | Group by room, sort, check adjacency | O(n log n) |
| Q244 | Sweep + segment tree | Sweep x, maintain covered y-length under range add/remove | O(n log n) |
| Q245 | Weighted sweep | Events carry `+w` / `−w` rather than ±1 | O(n log n) |
| Q246 | DSU, forward | Additions only ⇒ plain DSU suffices | O(q α) |
| Q247 | **Offline + DSU rollback** | Removals ⇒ segment tree on time, DSU with union-by-rank and rollback | O(q log q α) |
| Q248 | **Offline** + Fenwick | Sort queries by `i`, insert as you sweep, query prefix counts | O((n+q) log n) |
| Q249 | **Coordinate compression** | Only 2n distinct x and y values matter; the grid is at most 2n × 2n | O(n²) |
| Q250 | Compression + prefix | Compress timestamps, difference-array the presence counts | O((n+q) log n) |
| Q251, Q252 | **Contribution counting** | Sum over subarrays of max = Σ over elements of (value × number of subarrays where it is max), found by monotonic stack | O(n) |
| Q253 | Tree contribution | Each edge contributes `size × (n − size)` to the total pairwise distance | O(n) |
| Q254 | Digit contribution / digit DP | Count each digit position's contribution independently | O(log N) |
| Q255–Q257 | Stack / recursive descent | Precedence climbing, or two stacks | O(n) |
| Q258 | Greedy counter | Track unmatched `(`; a `)` with none open needs an insertion | O(n) |
| Q259 | Geometric expectation | E = 1/p; truncated version is a finite geometric sum | O(1) / O(k) |
| Q260 | **Linearity of expectation** | E[distinct] = `n × (1 − ((n−1)/n)^k)` — sum per type, ignore dependence | O(log k) |
| Q261 | Combinatorics | Total paths − paths through the blocked cell, via binomials | O(r + c) |
| Q262 | Combinatorial identity | Σ k·C(n,k) = n·2^(n−1); the `j`-chair version is C(n,j)·2^(n−j) summed | O(n) |
| Q263, Q264 | Meet in the middle | Split, enumerate, sort, binary search / two pointers | O(2^(n/2)·n) |
| Q265 | Matrix exponentiation | Path counts of length T = `M^T`; exponentiate by squaring | O(k³ log T) |

### Q266–Q285 · High-frequency pattern families

| Q | Technique | Key observation |
|---|---|---|
| Q266 | Bound candidates + prefix/suffix | Same skeleton as Q46; the *output* changed, so you must track argmax indices, not just values |
| Q267 | Two-key comparison | Lexicographic objective — compare `(primary, −secondary)` |
| Q268 | Candidate bounding, re-derived | A reversal of length L permutes parities only when L is odd — the argument does **not** carry over unchanged |
| Q269 | Brute force O(n²) | `n ≤ 2000` makes the clever argument unnecessary. Recognising when *not* to be clever is the lesson |
| Q270 | Greedy exchange / matching | With k swaps, sort odd-index and even-index pools and swap greedily |
| Q271 | Tree + two pools | Depth parity partitions nodes into two multisets; the swap is between pools |
| Q272 | Fix the split point | Identical to Q51 with a relabelled alphabet |
| Q273 | 3-state DP | Two split points make the scan awkward; `dp[i][0..2]` is the clean formulation |
| Q274 | Prefix/suffix counts | Replacement, not deletion, so cost = (b's left of split) + (a's right of split) |
| Q275 | Weighted prefix/suffix | Same split point, weights instead of counts |
| Q276 | DP with reconstruction | Store the choice at each state and walk back; ties broken by preferring `a` |
| Q277 | **LIS-family DP** | Non-decreasing with deletions = keep a maximum-weight non-decreasing subsequence; values ≤ 26 makes it O(26n) |
| Q278–Q285 | Loop construction | No algorithm — index arithmetic and spacing. Q282 is four boundary pointers; Q283 walks anti-diagonals |

### Q286–Q305 · Blind set pool

| Q | Technique | Key observation | Complexity |
|---|---|---|---|
| Q286 | Event simulation + min-heap | Sort by arrival; at each free moment take the smallest `s_i` among those already arrived | O(n log n) |
| Q287 | Two pointers | On the first mismatch, try skipping left or right and check plain palindromicity | O(n) |
| Q288 | Single pass | Running sum reset per truck; the leftovers are whatever never reaches W | O(n) |
| Q289 | Sliding window + frequency map | Increment on entry, decrement on exit; distinct count changes only at 0↔1 | O(n) |
| Q290 | **Binary search on answer** | Total distributed is monotone non-decreasing in `c` | O(n log V) |
| Q291 | Reverse functional graph + subtree size | `d_i` is a single parent ⇒ a forest; the answer is the subtree size | O(n) |
| Q292 | Greedy two pointers | Sort both; match the smallest `a` that beats the smallest unbeaten `b` — exchange argument | O(n log n) |
| Q293 | Sliding window sum, then binary search | Window sums are monotone in k for non-negative values | O(n log n) |
| Q294 | 3-state DP | `dp[i][c]` = min cost with room `i` painted colour `c` | O(n) |
| Q295 | Remainder frequency counting | Pair remainders `r` and `k−r`; handle `r=0` and `r=k/2` separately | O(n + k) |
| Q296 | **Time-ordered DAG** | Sorting edges by time makes contamination a forward-only reachability; process edges in time order | O(m log m) |
| Q297 | Greedy + monotonic deque | At each station, buy only enough to reach the next cheaper station | O(n) |
| Q298 | Greedy with a min-heap | Scan; when a `)` is unmatched, drop the cheapest removable character seen so far | O(n log n) |
| Q299 | Parity / fix the first row | Once row 1's flips are chosen, everything else is forced. Try both options for cell (1,1) | O(n·m) |
| Q300 | **DSU with weights** | "Differ by exactly d" is a weighted union-find; inconsistency = contradiction on merge | O(m α) |
| Q301 | Try every target count | For each divisor-ish target frequency, greedily compute cost; only O(26) candidates matter | O(26·26) |
| Q302 | 1D DP + flag | `dp[i][used]` where `used` marks the free step already spent | O(n) |
| Q303 | Sparse table storing top-2 | Merge two (max, second) pairs associatively | O(n log n) |
| Q304 | LCA / BFS on a tree | Distance via LCA; meeting node is the midpoint along the path | O(n log n) |
| Q305 | **Interval DP** | `|s| ≤ 100` is the tell; `dp[i][k]` = min cost for suffix `i` with `k` deletions left | O(n³) |

### Q306–Q320 · Mock pool

| Q | Technique | Key observation | Complexity |
|---|---|---|---|
| Q306 | Sliding window + hashmap | Key on (customer, amount); window of size k | O(n) |
| Q307 | Single pass | Detect run boundaries; accumulate gains | O(n) |
| Q308 | Greedy, farthest-first | Always fetch the `c` farthest remaining items together; cost is `2 × farthest` per trip | O(n log n) |
| Q309 | **Binary search + water-filling** | Maximise the minimum: binary search the floor, then distribute the remainder | O(n log V) |
| Q310 | Sliding window with ≤k violations | Count of valid windows ending at each index accumulates the total | O(n) |
| Q311 | Topological layers + DP | Layer by prerequisite depth, then knapsack-style DP over semesters | O(n²) |
| Q312 | Greedy running maximum | Each element must be raised to at least the running max | O(n) |
| Q313 | Group, sort, scan gaps | Sort per user; a gap > g starts a new session | O(n log n) |
| Q314 | **Binary search on answer** | Guess the max distance; greedily assign contiguous stop blocks | O(n log V) |
| Q315 | Greedy + min-heap | Process by deadline; if oversubscribed, evict the least profitable taken so far | O(n log n) |
| Q316 | 1D DP over line breaks | `dp[i]` = min badness for the first `i` words; transition over the last line's start | O(n·W) |
| Q317 | **State graph** (node, upgraded?) | Dijkstra on 2n states — upgraded or not | O(m log n) |
| Q318 | Segment tree of maximal free runs | Merge left-run / right-run / best-run at each node | O(log n)/op |
| Q319 | Observation, not simulation | A player reaches the final iff they are top-2 overall, or can be bracketed away from everyone stronger — count how many players exceed them | O(2^k) |
| Q320 | **Binary search + reachability**, or max-min Dijkstra | Maximise the minimum edge: binary search the threshold and test reachability, or run a modified Dijkstra | O(m log V) |

### R1–R34 · Reported questions

| R | Technique | Key observation |
|---|---|---|
| R1 | Functional graph, in-degree contribution | Reverse the edges conceptually; one pass accumulating `i` into `Edge[i]`'s bucket |
| R2 | Functional graph cycle detection | Colour-marking (white/grey/black) or Floyd; sum the cycle's node numbers |
| R3 | Two-chain walk | Mark distances along `C1`'s chain, then walk `C2`'s chain to the first marked cell |
| R4 | Custom DS — see Q64 | Descendant-locked counters plus ancestor walk |
| R5 | Prefix counts + binary search | Count `*` up to each bar; queries reduce to locating bounding bars |
| R6 | Post-order returning (height, balanced) | A single traversal returns both |
| R8 | Greedy + sorting | Multiplying by a large `B[j]` beats adding it, except near 1 and 0 — verify with an exchange argument, and handle `B[j] = 1` and zeros explicitly |
| R9 | Hashmap of complements | Deduplicate pairs, not occurrences |
| R10 | Kadane on a transform | Flipping a window turns each 0 into +1 and each 1 into −1; maximise that subarray, add the original 1-count |
| R11 | Reverse-graph BFS/DFS on a DAG | From the mandatory set, walk prerequisites backwards; a cycle means −1 |
| R12 | Tree DP over prime assignment | Every prime above 2 is odd, so odd+odd is even and non-prime except 2 — the parity structure collapses the case analysis |
| R13 | String parsing | Validation rules, not an algorithm |
| R14 | Convert tree to graph, then BFS | Add parent pointers, then BFS from the target node |
| R15 | Sort + merge | Sort by start, merge overlapping |
| R16 | Divide and conquer on invalid chars | Split on characters that can never qualify; recurse |
| R18 | Sort + binary search + observation | See Q223 |
| R19 | Coin-change **counting** DP | Loop order decides combinations vs permutations — coins outer, amount inner |
| R20 | Unbounded coin-change / BFS | Exact target with minimum count |
| R21 | Two greedy passes | Left-to-right then right-to-left, taking the maximum at each position |
| R26 | DP over (position, boxes used) | `dp[i][j]` = best value using the first `i` gifts in `j` boxes; the transition needs a running distinct-count |
| R30 | Pointer + string manipulation | See Q189–Q193 |
| R31 | Hashmap frequency + strings | See Q166, Q113 |
| R32 | Prefix sums + hashmap | Equal-sum subarrays ⟺ equal prefix values |
| R33 | Digit manipulation | Bounded brute force with digit checks |
| R34 | Min-heap, greedy | Always increment the current smallest |

---

# APPENDIX B — COMPANY MAPPING

> **Reference only — no company here is a current target.** These are historical DIT recruiters. A recruiter list records who has come, not who is coming. Read a row when a drive is announced; otherwise ignore this appendix entirely and keep working Parts 7 and 11.

**Evidence grades:** `REPORTED` = consistent candidate reports · `INFERRED` = deduced from few reports, treat as a guess · `NO DATA` = nothing reliable found

| Company | Evidence | Format | Questions here |
|---|---|---|---|
| **Sprinklr** | `REPORTED` | 3 coding, HackerEarth, 50/75/100 pts, partial marking, >120 to qualify | R8–R13, Q155, Q156, Q133, Q251 |
| **Amazon** | `REPORTED` | 2 coding 70–90 min + Work Simulation + Work Style | R14–R17, Q153, Q154, Q86, Q19–Q22 |
| **Infosys** | `REPORTED` — **drive already passed** | 3 questions / 3 hours; scored on efficiency | Retained as general OA training: R26–R29, Q46–Q52, Q266–Q285 |
| **ZS Associates** | `REPORTED` | 75 min, no sectional timer; Quant/Logical/Verbal/**DI**; coding only for BTA & DSA profiles | **Part 10 (Z1–Z42)**, Q159, Q160, Q167 |
| **Walmart** | `REPORTED` | 25 MCQ/25 min, then 2 coding/90 min | R18–R19, Q162, Q223, Q100 |
| **Goldman Sachs** | `REPORTED` (R20–21) / `REPORTED-TITLE` (R22–25) | Coding + heavy aptitude | R20–R25, Q164, Q37, Q262 |
| **Palo Alto Networks** | `REPORTED` | 2 coding + 30 aptitude MCQ | R31, Q166, Q113, Q112 |
| **Cradlepoint** | `REPORTED` | 3 levels × 2 questions, ≥1 per level | R30, Q189–Q193, Q171 |
| **Harness** | `INFERRED` | 2–3 coding | Q157, Q158, Q36, Q241–Q245 |
| **Oracle** | `INFERRED` | 2–3 coding + SQL | Q161, Q59, Q102, Q103 |
| **Adobe** | `INFERRED` | DSA + aptitude | Q165, Q131, Q41, Q244 |
| **Google / Directi** | `INFERRED` | 2 coding, hard | Q168, Q147, Q110, Q233 |
| **Morgan Stanley / Nomura** | `INFERRED` | Coding + aptitude | Q163, Q75, Q246 |
| **ThoughtWorks** | `INFERRED` | Logic-heavy + pairing round | Q132, Q136, Q139, Q255–Q258 |
| **Deloitte / Accenture / IBM** | `INFERRED` | Cognitive + coding | Q167, Q151, Q104, Part 10 |
| **TCS / Wipro / Cognizant** | `INFERRED` | Aptitude-heavy, pattern & array coding | Q278–Q285, Q167, Part 10 |
| **Daffodil / Flexcar / Encryption Consulting** | `NO DATA` | — | Any Week 1–3 `M` |
| **JSW / UNO MINDA / Bosch / CIPLA / Nestlé / Reliance / Ashok Leyland / Yamaha** | `NO DATA` | Core profiles, aptitude-dominant | Part 10, Q278–Q285 |
| **Juspay** | `REPORTED` — **drive already passed** | Retained as general DSA only | R1–R7, Q64, Q65, Q76 |

---

# APPENDIX C — SOURCES & PROVENANCE

### `[REPORTED]` question sources

| Company | Sources |
|---|---|
| Functional graph family (R1–R7) | [GfG — Juspay On-Campus Batch 2025](https://www.geeksforgeeks.org/interview-experiences/juspay-on-campus-interview-experience-for-batch-2025/) · [TheJobOverflow — Converging Maze set](https://www.thejoboverflow.com/p/p1919/) · [LeetCode Discuss](https://leetcode.com/discuss/interview-question/3815224/JUSPAY-oror-SDE-Intern-+-PPO-oror-Maximum-Weight-Node-oror-Largest-Sum-Cycle-oror-Nearest-Meeting-Cell/) · [Unstop](https://unstop.com/blog/juspay-previous-papers) |
| Sprinklr (R8–R13) | [LeetCode Discuss — 2021 on-campus](https://leetcode.com/discuss/interview-question/1400545/sprinklr-online-assessment-questions-2021-on-campus/) · [GfG — Set 2 on-campus](https://www.geeksforgeeks.org/sprinklr-interview-experience-set-2-on-campus/) · [LeetCode Discuss — Sprinklr OA](https://leetcode.com/discuss/interview-question/3832166/Sprinklr-Online-Assessment-Questions/) |
| Amazon (R14–R17) | [GfG — SDE1 fresher](https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde1-fresher-off-campus/) · [Naukri Code360 — Sep 2025](https://www.naukri.com/code360/interview-experiences/amazon/amazon-interview-experience-sep-2025-exp-0-2-years) |
| Walmart (R18–R19) | [Medium — Walmart CodeHers 2024](https://medium.com/@vedikaagrawal53040/walmart-interview-experience-codehers-2024-9478823378b8) |
| Goldman Sachs (R20–R25) | [Medium — GS coding test questions](https://medium.com/@sargam123india/goldman-sachs-questions-asked-in-coding-test-and-interviews-selected-53f4f5cc9cc1) · [PrepInsta — GS coding](https://prepinsta.com/goldman-sachs/technical-test/coding-questions/) |
| Infosys (R26–R27) | [Great Learning — Infosys SP/DSE](https://www.mygreatlearning.com/blog/infosys-sp-dse-coding-questions-with-answers-2026/) · [PrepInsta — HackWithInfy](https://prepinsta.com/hackwithinfy/coding/) |
| Cradlepoint (R30) | [GfG — Cradlepoint SDE](https://www.geeksforgeeks.org/interview-experiences/cradlepoint-interview-experience-for-sde-off-campus/) |
| Palo Alto Networks (R31) | [GfG — Palo Alto SDE](https://www.geeksforgeeks.org/interview-experiences/palo-alto-networks-interview-experience-for-sde/) |
| Misc 2025 (R32–R34) | [TheJobOverflow](https://thejoboverflow.com/) |
| ZS format | [FACE Prep — ZS online test pattern](https://faceprep.in/article/zs-associates-placement-paper-zs-associates-online-test-face-prep/) |
| DIT recruiter list | [Shiksha](https://www.shiksha.com/university/dit-university-dehradun-25061/placement) · [CollegeDekho](https://www.collegedekho.com/colleges/dit-university-placement) |

### Platform links

LeetCode `leetcode.com/problemset` · CSES `cses.fi/problemset` · Educational DP Contest `atcoder.jp/contests/dp` · AtCoder `atcoder.jp/contests/` · Codeforces `codeforces.com/problemset` · IndiaBix, PrepInsta, FACE Prep for Z-series aptitude

### Accuracy caveats — stated plainly

- **LeetCode and CSES titles are stable.** Search by title and you will find them.
- **Codeforces and AtCoder problem IDs drift**, and I am more likely to misremember an ID than a title. I have given titles and rating bands. If one does not resolve, tell me and I will substitute.
- **`[REPORTED]` wording is approximate.** Candidates write from memory. Trust the shape; verify the constraints yourself.
- **`[REPORTED-TITLE]` means I have a name and nothing else.** R22–R25 are the only such entries and are marked as such.
- **`[MODELLED]` questions were written by me.** They resemble real OA problems by construction. They are not real OA problems and I never claim otherwise.

---

# APPENDIX D — FINAL COVERAGE AUDIT

### Question counts

| | Count |
|---|---|
| Coding questions Q1–Q320 | **320** |
| Reported company questions R1–R34 | **34** |
| Aptitude / DI / verbal Z1–Z42 | **42** |
| **Total** | **396** |

| Provenance | Count | Share |
|---|---|---|
| `[MODELLED]` — full statements, exist nowhere online | 165 | 47% |
| `[PLATFORM]` — standard public problems | 155 | 44% |
| `[REPORTED]` / `[REPORTED-TITLE]` | 34 | 9% |

*Of the 354 coding items, **199 (56%) are either written here or from real reported assessments** — meaning they cannot be looked up, have no editorial, and no tag list.*

| Difficulty | Count | Share | Target |
|---|---|---|---|
| `F` foundation | 58 | 18% | 20% |
| `M` medium | 128 | 40% | 40% |
| `H` hard-medium | 87 | 27% | 25% |
| `X` hard | 47 | 15% | 15% |

### Intuition family coverage

| Family | Questions | ✓ |
|---|---|---|
| Brute force → optimisation | Every `M`+ problem, via ladder rungs 5–6 | ✓ |
| Repeated work → structure | Q1–Q22, Q38–Q41, Q68 | ✓ |
| Prefix / suffix | Q13–Q18, Q46–Q50, Q135, Q229 | ✓ |
| Difference arrays | Q4, Q13, Q116, Q250 | ✓ |
| Hashing / frequency | Q1–Q12, Q155, Q295, Q301 | ✓ |
| Two pointers | Q19–Q21, Q142, Q147, Q287, Q292 | ✓ |
| Sliding window | Q19–Q22, Q133, Q156, Q289, Q310 | ✓ |
| Monotonic predicate → binary search | Q23–Q30, Q110, Q160, Q162, Q223, Q290, Q309, Q314, Q320 | ✓ |
| Sorting | Q34–Q37, Q137, Q167, Q292 | ✓ |
| Exchange argument | Q31, Q35, Q137, Q292, R8, R21 | ✓ |
| Greedy | Q31–Q37, Q157, Q297, Q312, Q315 | ✓ |
| Heap / priority queue | Q42–Q45, Q131, Q286, Q298, Q315 | ✓ |
| Monotonic stack | Q38–Q41, Q251, Q252 | ✓ |
| Contribution counting | Q40, Q41, Q251–Q254 | ✓ |
| Invariants | Q136, Q152, Q176, Q299, Q300 | ✓ |
| Graph modelling | Q69–Q88, Q296, Q317 | ✓ |
| BFS / DFS | Q70, Q74, Q79, Q87, Q240 | ✓ |
| Connected components | Q80, Q235, Q240, Q246 | ✓ |
| Cycle detection | Q84, R2, Q207, Q212, Q291 | ✓ |
| Topological sort | Q73, Q82, Q83, Q311, R11 | ✓ |
| Shortest paths | Q69, Q71, Q77, Q86, Q217, Q218, Q317 | ✓ |
| DSU | Q75, Q80, Q163, Q246, Q247, Q300, Q204 | ✓ |
| **MST** | **Q234–Q239** (was zero in v1) | ✓ |
| Functional graphs | Q76, Q85, Q207, Q291, R1–R3 | ✓ |
| State-space graphs | Q69, Q70, Q86, Q88, Q317 | ✓ |
| Tree recursion | Q56–Q58, Q67, Q68, R6 | ✓ |
| Tree DP | Q59, Q60, Q99, Q253, R12 | ✓ |
| LCA / binary lifting | Q61–Q63, Q85, Q304 | ✓ |
| Custom tree / data structures | Q64, Q65, Q194–Q199, Q318 | ✓ |
| Interval / sweep line | Q16, Q17, Q36, Q131, Q241–Q245, Q165 | ✓ |
| Offline / reverse processing | Q75, Q117, Q138, Q246–Q248 | ✓ |
| Coordinate compression | Q117, Q220, Q249, Q250, Q165 | ✓ |
| Fenwick | Q114, Q116, Q117, Q118, Q248 | ✓ |
| Segment tree | Q115, Q119, Q232, Q244, Q303, Q318 | ✓ |
| Range queries | Q114–Q120, Q231, Q232, Q303 | ✓ |
| DP state derivation | Q89–Q110, Q294, Q302, Q316 | ✓ |
| 1D DP | Q89–Q91, Q100, Q104, Q143, Q302 | ✓ |
| 2D DP | Q94, Q95, Q103, Q226 | ✓ |
| Knapsack | Q92, Q93, Q102, Q132, Q216, Q230 | ✓ |
| Partition DP | Q125, Q128, Q132, Q161, Q167 | ✓ |
| Subsequence DP | Q94, Q103, Q105, Q277 | ✓ |
| Interval DP | Q98, Q161, Q305 | ✓ |
| DAG DP | Q73, Q83, Q158, Q311, Q320 | ✓ |
| Bit manipulation | Q179–Q184 | ✓ |
| Bitmasking | Q70, Q180, Q227, Q153 | ✓ |
| Bitmask DP | Q109, Q128–Q130, Q227 | ✓ |
| Backtracking / pruning | Q200–Q204, Q222 | ✓ |
| **Meet in the middle** | **Q210, Q215, Q263, Q264** (was one in v1) | ✓ |
| String matching | Q121–Q123, Q126 | ✓ |
| Trie | Q111–Q113 | ✓ |
| Palindrome / string structure | Q124, Q125, Q127, Q287 | ✓ |
| **Expression parsing** | **Q213, Q255–Q258** (was one in v1) | ✓ |
| Modular arithmetic | Q7, Q10, Q171, Q174, Q295 | ✓ |
| gcd / lcm | Q169, Q173 | ✓ |
| **Combinatorics** | **Q174, Q226, Q261, Q262** (was thin in v1) | ✓ |
| **Probability / expectation** | **Q96, Q259, Q260, Q158** (was thin in v1) | ✓ |
| Digit DP | Q177, Q209, Q254 | ✓ |
| **Matrix exponentiation** | **Q208, Q221, Q265** (was one in v1) | ✓ |
| Cycle detection in huge simulation | Q207, Q221, Q212 | ✓ |
| Game theory | Q97, Q205, Q206, Q319 | ✓ |
| Mathematical observations | Q136, Q152, Q176, Q178, Q211, Q319 | ✓ |
| Implementation-heavy 2D | Q185–Q188, Q278–Q285 | ✓ |
| O(1)-space tricks | Q183, Q187, Q212 | ✓ |
| Linked list / pointer discipline | Q189–Q193 | ✓ |

**63 of 63 families covered.** Six were absent or thin in v1 and are marked in bold.

### Constraint-reading coverage

| Bound | Trained by |
|---|---|
| `n ≤ 10` | Q222 |
| `n ≤ 20` | Q109, Q214, Q153 |
| `n ≤ 40` | Q210, Q215, Q263, Q264 |
| `n ≤ 100` | Q132, Q217, Q230 |
| `n ≤ 2000` | Q206, Q225a, Q237, Q269, Q311 |
| `n ≤ 1e5` | The default across the bank |
| `n ≤ 1e6` | Q3, Q4, Q133, Q225b, Q307, Q312 |
| `value ≤ 100` | Q219, Q216 |
| `value ≤ 1e9` | Q220, Q249, Q250 |
| `T ≤ 1e18` | Q207, Q208, Q209, Q221, Q265 |
| `Σn ≤ 2e5` | Q224 |
| `q ≤ 2e5` | Q231, Q232, Q248, Q303 |
| Unusual budget (access count) | Q228, Q233 |

### Final self-check against the brief

| Requirement | Status |
|---|---|
| A real question bank, not a topic list | ✓ 396 items |
| More than 150 actual questions | ✓ 396 |
| Concrete enough to sit down and solve | ✓ All `[MODELLED]` carry statement, I/O, constraints; `[PLATFORM]` carry exact titles |
| Enough unseen / modelled questions | ✓ 165 modelled (47%) |
| Reported questions clearly marked | ✓ Three-tier provenance; R22–R25 downgraded honestly |
| Reported questions kept and generalised | ✓ Q46–Q52 + families Q266–Q285 (20 disguises), re-filed by pattern not company |
| **No company treated as current** | ✓ Juspay and Infosys marked historical; all others marked reference-only with no prep slots |
| **Priority order reflected in the document** | ✓ ~90% general ability · ZS shape at priority 3 because nothing else trains it · company formats demoted to a lookup table |
| ZS adequately represented | ✓ Part 10, 42 items across Quant/LR/DI/Verbal + time strategy |
| DIT recruiters represented | ✓ Appendix B, 25+ companies with evidence grades |
| Juspay no longer treated as current | ✓ No track, no week, no mock priority; retained as general DSA |
| All major intuition families covered | ✓ 63/63 |
| Topics hidden during blind solving | ✓ Everything in Appendix A only |
| Mixed blind sets | ✓ Part 11, 20 reserved problems, unordered and unlabeled |
| Realistic mocks | ✓ 11 mocks, 60/75/90/120/180 min, ≥2 unseen each |
| Hidden-test / debugging training | ✓ Part 5, stress harness + 11-class checklist |
| Constraint reasoning explicitly trained | ✓ Part 4 + Q214–Q233 including four twin pairs |
| Designed for transfer, not memorisation | ✓ Part 6.1 eight-axis disguise model |
| Modelled separated from reported | ✓ Tag on every question |
| Unnecessary repetition removed | ✓ Learn→disguise→blind→revisit→combine, ~5 problems per pattern |
| Gaps that could surprise you | ✓ Audited; six closed. **See the note below** |

### The honest residual risk

Three things could still surprise you in a hard OA, and you should know what they are rather than believe the coverage table is complete:

1. **Maximum flow / min cut beyond bipartite matching.** Q78 covers matching; genuine flow problems are not here. They are rare in campus OAs and expensive to learn. **Deliberate omission** — tell me if a target company is known to ask them.
2. **Heavy computational geometry.** Convex hull, line intersection, closest pair. Q244 and Q211 are the only geometric problems. Rare in Indian campus OAs. **Deliberate omission.**
3. **Advanced string structures** — suffix automaton, suffix array. Q127 brushes against this. Very rare at campus level. **Deliberate omission.**

Everything else on the standard OA surface is covered. If an unfamiliar problem defeats you and it is *not* one of these three, the failure was in the ladder, not in the bank — and that is exactly what the failure ledger is for.

---

## START HERE

1. Read **Part 2** (the ladder) and **Part 3** (the unsticking toolkit). Those two sections *are* the plan; everything else is scaffolding.
2. Set up your C++ template, the stress harness, and the four log files.
3. Type `session` to begin Week 1, or `audit` to run the Intuition Audit cold and get a baseline.

**When a drive is actually announced,** tell me the company and date. I will skim its row in Part 9, schedule one format-matched mock, and otherwise change almost nothing — because there is almost nothing worth changing. A general solver walks into any paper. That is the whole design.

**The test of this document is not whether it makes you feel prepared for a named company.** It is whether, on a morning when an unfamiliar company puts four unfamiliar questions in front of you, you can find a direction on two or three of them. Everything here is built for that morning.

*v2.1 · 9 Aug 2026*
