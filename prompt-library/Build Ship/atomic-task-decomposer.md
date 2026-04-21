---
title: Atomic Task Decomposer
---

## When to use
When you have a feature to build and want to break it into the smallest possible independent tasks before starting. Each task must be completable in one session, testable independently, and revertable without touching anything else.

## Prompt

```
Break down the following feature into atomic tasks before we write any code.

Feature to build: [DESCRIBE THE FEATURE]

Rules for task breakdown:
- Each task must be completable independently — it should not require another task to be partially done first
- Each task must be testable: I should be able to confirm it works before moving to the next
- Each task must be revertable: if it breaks something, I can undo it without losing other work
- Tasks must follow this dependency order: database/schema changes → backend/server logic → API layer → frontend/UI
- Maximum 5 tasks per feature. If you need more, flag it — the feature is too large and should be split

For each task, provide:
1. Task name (verb + noun, e.g. "Add user_role column to profiles table")
2. What it does (one sentence)
3. What files it touches (list specific files or folders)
4. How to confirm it works (one testable check)
5. Dependencies (what must be done before this task — use task names)

After the breakdown, tell me:
- Which task to do first
- Which tasks can technically be done in parallel (if any)
- Any risks or surprises you expect in this feature

Do NOT start implementing until I approve the breakdown.
```
