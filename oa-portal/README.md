# OA Portal — local practice judge

A local OA simulator for the **modelled** problems in `OA Master Plan.md`.
Real statements, real hidden tests, real time limits, real verdicts.

Everything runs on this machine. Nothing is uploaded anywhere.

---

## Start it

```bash
cd oa-portal
npm start                 # API + portal on http://localhost:4321
```

Open **http://localhost:4321** and sign in.

| Username | Password |
|---|---|
| `Subhodeep` | `123456` |
| `kashish` | `123456` |

> First time only, if `frontend/dist` or `problems/*/tests` are missing:
> ```bash
> npm run setup            # installs frontend deps, builds tests, builds the UI
> ```

---

## The two ways to work

**In the portal** — statement on the left, editor on the right, Run / Submit, verdicts with per-test timings.

**In VS Code** — open `oa-portal/workspace/` and edit `m1_q2.cpp` directly. The portal reads
and writes *the same file*, so you can type in VS Code and press Run in the browser.
Nothing to copy, nothing to sync.

There is also a CLI if you never want to open a browser:

```bash
node tools/solve.js              # list everything
node tools/solve.js m1           # print the statement
node tools/solve.js m1 run       # samples only
node tools/solve.js m1 submit    # every test
```

---

## What's in it

**7 modelled problems**, each with a full OA-style statement and a hidden test suite:

| | Doc | Title | Difficulty | Tests |
|---|---|---|---|---|
| m1 | Q2 | Refund Reconciliation | Medium | 26 |
| m2 | Q3 | Server Heartbeat Windows | Hard | 26 |
| m3 | Q4 | Campus Gate Passes | Hard | 24 |
| m4 | Q11 | Warehouse Bay Audit | Medium | 26 |
| m5 | Q12 | Loyalty Streak | Hard | 30 |
| m6 | Q17 | Meeting Room Heatmap | Medium | 29 |
| m7 | Q18 | Splice Cost | Hard | 40 |

**15 platform problems** (Q1, Q5–Q10, Q13–Q16, Q19–Q22) appear on the home checklist with a
direct link to LeetCode / CSES and a tick box, so Week 1 lives in one place.

---

## Verdicts

| | Meaning |
|---|---|
| `AC` | Accepted — every test passed |
| `WA` | Wrong answer — the first differing token is reported |
| `TLE` | Exceeded the time limit; the process is killed |
| `RE` | Crashed — exit code and stderr shown |
| `CE` | Compile error — **line, column and message**, click to jump to the line |
| `OLE` | Output exceeded 64 MB |

**Run** uses samples only. **Submit** runs the whole suite and stops at the first failure,
like a real assessment. Hidden test inputs are never revealed — only the verdict and timing.

Keyboard: `Ctrl+Enter` = Run, `Ctrl+Shift+Enter` = Submit.

---

## How the tests are trusted

Test data is not hand-written. For every problem there is a reference solution *and* an
independent brute force, and `npm run build:tests`:

1. checks each sample reproduces the answer printed in the statement,
2. runs **~500 random small cases per problem** through both solutions and requires them to
   agree on every single one,
3. generates the expected outputs from the validated reference,
4. reports the reference's slowest run as a percentage of the time limit.

Current state: **3,950 stress comparisons, 0 disagreements.** Every reference runs at
1–4 % of its limit, so a correct-but-not-optimal solution is not failed unfairly, while an
O(n²) brute force is comfortably killed.

Re-verify any time:

```bash
npm run build:tests      # regenerate + revalidate everything
npm run test:judge       # prove AC / WA / TLE / RE / CE all fire
npm run test:api         # 20 end-to-end API checks
```

---

## Storage

Defaults to JSON files in `.data/` — zero setup, zero dependencies.

To use MongoDB Atlas instead (for cross-device history):

```bash
npm install mongodb
set MONGODB_URI=mongodb+srv://...        # PowerShell: $env:MONGODB_URI="..."
npm start
```

Either way **the file in `workspace/` stays the source of truth** for what gets judged.
The database mirrors saves and submissions; it never overwrites your file behind your back.
That is deliberate — it is what keeps VS Code editing working.

---

## A toolchain note

This machine has MinGW GCC 8.1.0, whose `<filesystem>` header is broken. Because
`<bits/stdc++.h>` pulls that in under `-std=c++17`, compiling would fail on almost every
competitive-style submission.

The judge compiles with `-std=gnu++17`, detects that specific header failure, and silently
retries under `-std=gnu++14`. You never see the toolchain's error — only your own.

---

## Layout

```
oa-portal/
├── server/          API, judge, compiler, storage adapter, catalogue
├── problems/        statement.md, problem.json, solutions/, samples/, tests/
├── workspace/       ← your code. Open this folder in VS Code.
├── frontend/        Vite + React portal
├── tools/           build_tests, test_judge, test_api, solve (CLI)
└── .data/           local storage (gitignored)
```

`problems/*/tests/` and `problems/*/solutions/` contain the answers — don't read them
before attempting, for obvious reasons.
