---
title: Memory Bank Setup
---

## When to use
Once per project, after writing your PRD and before your first build session. Sets up the memory-bank/ folder that every AI session will read from — replaces copy-pasting context into every chat.

## Prompt

```
Set up a memory-bank/ folder for my project. This folder is the persistent context layer every AI session reads before starting. Create all files listed below with real content — no placeholders.

Project details:
- Project name: [PROJECT NAME]
- Tech stack: [e.g. Next.js 15, TypeScript, Tailwind, Supabase, Clerk]
- PRD summary: [PASTE YOUR PRD OR DESCRIBE YOUR PROJECT IN 3-5 SENTENCES]
- Current codebase state: [What exists — e.g. "Fresh Next.js app, nothing built yet" or "Auth working, dashboard skeleton done"]

Create the following files:

memory-bank/@architecture.md
Mark this file with @ — it must be read before every session. Include:
- Full directory tree with one-line descriptions of each folder and its purpose
- Every existing file that does real work, with one sentence describing what it does
- Any files that must never be modified (protected list)
- The naming conventions used throughout the project
Update this file after every session that adds new files or changes the structure.

memory-bank/@design-doc.md
Mark this file with @ — it must be read before every session. Include:
- Project goal (1 sentence)
- Target user (1 sentence, specific person with specific situation)
- Problem being solved (1 sentence, no solution in it)
- MVP features (max 5, specific and testable)
- Out-of-scope list (at least 3 explicit exclusions)
- Success criteria (testable conditions, not vague goals)
This is your PRD in condensed form. Never modify it without user approval.

memory-bank/implementation-plan.md
The ordered task list for the full MVP. Each entry: task number, title, files to touch (max 3), done condition, commit message. Number them 001 through [N]. Leave status as [ ] until complete.

memory-bank/progress.md
Track completed sessions. Format per entry:
- Date
- Tasks completed (reference task numbers from implementation-plan.md)
- Files changed
- Current state of the build
- What the next session should start with
Update this at the end of every session.

After creating all four files, tell me:
1. The total task count in implementation-plan.md
2. The first task to start
3. Any gaps or questions in the design-doc that need answering before building
```
