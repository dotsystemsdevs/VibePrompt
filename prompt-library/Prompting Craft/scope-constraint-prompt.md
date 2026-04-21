---
title: Scope Constraint Prompt
---

## When to use
Append this to any implementation prompt when you need the AI to stay inside a specific boundary. Prevents the most common vibe coding frustration: Claude "helpfully" refactoring unrelated code, renaming things you didn't ask about, or adding features you didn't request.

## Prompt

```
SCOPE CONSTRAINT — READ BEFORE STARTING:

You are working on exactly one thing: [DESCRIBE THE SPECIFIC TASK IN ONE SENTENCE].

Hard limits:
- Touch ONLY these files: [LIST THE FILES]
- Do NOT modify any file not listed above — even if you think it would improve it
- Do NOT refactor code that is not directly part of this task
- Do NOT rename variables, functions, or components outside the task scope
- Do NOT add error handling, logging, or validation beyond what the task requires
- Do NOT improve code style, formatting, or organization in files you pass through
- Do NOT add comments, documentation, or TODO notes unless explicitly asked

If completing this task correctly requires touching a file not listed above:
STOP. Tell me which file and why. Do not touch it until I confirm.

If you notice something unrelated that should be fixed:
Add it to a "Noticed but not touched" list at the end of your response. Do not fix it now.

Confirm you have read and understood this constraint before starting.
```
