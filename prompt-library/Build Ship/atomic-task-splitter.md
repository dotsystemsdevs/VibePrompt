---
title: Atomic Task Splitter
---

## When to use
Before starting any build loop — break your PRD into one-prompt-per-task chunks that each fit in a single AI session with a clear done condition.

## Prompt

```
Break my PRD into atomic build tasks. Each task must be completable in a single AI coding session and must have a clear, binary done condition. I will give one task to the AI coding agent at a time in order.

My PRD / feature list:
[PASTE YOUR PRD OR FEATURE LIST HERE]

Tech stack: [YOUR STACK]
Current state of the codebase: [What already exists — e.g. "Next.js app initialized, Tailwind configured, Clerk auth installed and working, no other features built yet"]

Rules for breaking tasks into atomic units:

1. SINGLE SESSION RULE: Each task must be completable in one AI session. If a task would take more than 30-45 minutes for an experienced developer, it is too large. Split it.

2. FILE SCOPE RULE: Each task should touch at most 2-3 files. If a task requires more than 3 files to be modified, it is likely doing too much. Split it by layer (e.g. schema first, then API, then UI as separate tasks).

3. DEPENDENCY ORDER: Tasks must be sequenced so that each task only depends on work that is already done. No task should require another unfinished task to be complete first.

4. DONE CONDITION: Every task must have a single sentence done condition that is testable without running automated tests — something a human can verify by looking at the running app. Example: "User can click Submit and see a success message. The record appears in the database."

5. NO ORPHAN TASKS: Every task must result in working code. No task should leave the app in a broken state. If a task is foundational (e.g. setting up a schema), its done condition must confirm the foundation works.

Output format for each task:

---
TASK [N]: [SHORT TITLE]
Files to create or modify: [LIST EXACT FILE PATHS]
Files that must NOT be touched: [LIST ANY FILES THAT COULD BE TEMPTING BUT ARE OUT OF SCOPE]
What to build: [2-3 sentences describing exactly what to implement]
Done condition: [One testable sentence]
Depends on: [TASK N-1, or "no dependencies — can start immediately"]
---

After listing all tasks:
TOTAL TASK COUNT: [N]
ESTIMATED SESSIONS: [N]
FIRST TASK TO START: Task 1 — confirm this is truly unblocked and ready to build.
```
