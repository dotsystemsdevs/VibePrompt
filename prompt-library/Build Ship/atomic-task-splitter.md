---
title: Atomic Task Splitter
---

## When to use
Before starting any build loop — break your PRD into one-task-per-session chunks that each have a clear done condition and a git commit point.

## Prompt

```
Break my PRD into atomic build tasks. Each task must be completable in a single AI coding session, touch at most 3 files, and end with a git commit.

My PRD / feature list:
[PASTE YOUR PRD OR FEATURE LIST HERE]

Tech stack: [YOUR STACK]
Current codebase state: [What already exists — e.g. "Next.js initialized, Tailwind configured, Clerk auth working, no other features built"]

Rules for atomic tasks:

1. SINGLE SESSION RULE
Each task must fit in one AI session. If it would take more than 30-45 minutes for an experienced developer, split it. One session = one context window = one commit.

2. FILE SCOPE RULE
Each task should modify at most 3 files. If more files are needed, split by layer: schema first → API → UI as separate tasks.

3. DEPENDENCY ORDER
Sequence tasks so each one only depends on already-completed work. No task should require an unfinished task.

4. DONE CONDITION
Every task must have a single testable done condition — something verifiable by looking at the running app. Example: "User clicks Submit and sees a success message. The record appears in the database."

5. NO BROKEN STATE RULE
Every task must result in working code. No task should leave the app in a broken state. Foundational tasks must confirm their foundation works.

6. COMMIT RULE
After every completed and verified task: git commit with conventional format (feat: / fix: / chore:). Each commit is a rollback point. List the exact commit message for each task.

7. TASK.MD RULE
For each task, write the entry that goes in TASK.md: task title, date to add, done condition, and files to touch.

Output format for each task:

---
TASK [N]: [SHORT TITLE]
TASK.md entry: "[title] — added [date placeholder]"
Files to create or modify: [EXACT FILE PATHS — max 3]
Files to NOT touch: [Any files that could be tempting but are out of scope]
What to build: [2-3 sentences — exactly what to implement]
Done condition: [One testable sentence]
Commit message: [e.g. "feat: add login page with Clerk sign-in component"]
Depends on: [TASK N-1, or "no dependencies"]
---

After all tasks:
TOTAL TASKS: [N]
FIRST TASK: Task 1 — confirm this is unblocked and ready to start.
```
