# OA Portal

A local practice judge for campus placement online assessments, plus the
training plan it is built from.

- **`OA Master Plan.md`** — the 8-week plan: 396 questions (Q1–Q320, R1–R34,
  Z1–Z42), the failure ledger, blind sets and mocks. Also available as
  `.pdf` and `.docx`.
- **`oa-portal/`** — the judge. Problems modelled from the plan, with hidden
  tests, real time limits, and C++ and Java support.

Everything runs on your own machine. Nothing is uploaded anywhere.

---

## Setup

You need these on `PATH` first:

| Tool | Why | Check |
|---|---|---|
| **Node.js 18+** | runs the server and the tooling | `node -v` |
| **g++** (MinGW-w64) | compiles your C++ | `g++ --version` |
| **JDK 17+** | compiles your Java | `javac -version` |
| MongoDB *(optional)* | stores code and progress | — |

MongoDB is genuinely optional. Without it everything is stored in files under
`oa-portal/.data/` and works identically.

Then, from this folder, in PowerShell:

```powershell
.\run.ps1
```

That is the whole setup. It installs packages, builds the frontend, starts the
server, and opens the portal in your browser. The first run takes a couple of
minutes while npm downloads packages; after that it starts in seconds.

The hidden test data is in the repo, so there is nothing to generate.

Sign in as **`Subhodeep` / `123456`** or **`kashish` / `123456`**.

### Options

```powershell
.\run.ps1 -Stop       # stop the server
.\run.ps1 -Rebuild    # force a fresh frontend build
.\run.ps1 -Tests      # regenerate and re-validate all test data
.\run.ps1 -NoOpen     # start without opening a browser
.\run.ps1 -Port 5000  # use a different port
```

---

## Your work is yours

`oa-portal/workspace/` (your code) and `oa-portal/.data/` (your progress) are
**not tracked by git**. Pulling an update can never overwrite them, and your
solutions never end up in someone else's clone.

To pick up new problems:

```powershell
git pull
.\run.ps1
```

`run.ps1` picks up the new problems and leaves everything else alone.

---

## Using it

Open a problem, read the statement on the left, write your code on the right.

- **Run** (`Ctrl` + `'`) — the visible sample tests only
- **Submit** (`Ctrl` + `Enter`) — the full hidden suite

Compile errors show the file, line and column, and clicking one jumps the
cursor there. A wrong answer shows the first differing token, and names the
cause when it can — 32-bit overflow, for instance, is reported as overflow
rather than left looking like a logic bug.

Every problem hands you a function stub with the input parsing already
written, the same way a real OA does. The **Reset** button restores it (a
timestamped copy goes to `workspace/.backup/` first).

You can edit the same files in VS Code instead if you prefer — open
`oa-portal/workspace/`. The portal and the folder are the same files.

---

## A note on `oa-portal/problems/*/solutions/`

Those are the reference solutions, and they are in the repo because
`run.ps1` needs them to generate the test data. They are the answers. Don't
open them for a problem you have not solved yet — the entire point of the
plan is deriving the approach rather than recognising it.

---

## Checking it still works

```powershell
cd oa-portal
node tools/verify_all.js
```

Runs the whole battery: judge verdicts, every reference solution against its
full hidden suite, a deliberately wrong solution per problem to prove the
tests discriminate, both toolchains end to end, the HTTP API, session
persistence, and catalogue integrity.

Each problem's reference solution is also checked against an *independent*
brute force over hundreds of random cases before its tests are accepted, and
every sample is verified against the answer printed in its statement.
