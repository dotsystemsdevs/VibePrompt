---
title: Commit Message Writer
---

## When to use
After completing and verifying a task — before committing to git, generate a message that future-you (or a collaborator) will actually understand.

## Prompt

```
Write a git commit message for the changes I just made. Follow these rules exactly.

What was built: [DESCRIBE WHAT YOU IMPLEMENTED IN 1-2 SENTENCES]
The PRD task this completes: [REFERENCE THE TASK NUMBER OR NAME FROM YOUR TASK LIST]
Files changed: [LIST THE FILES THAT WERE MODIFIED]

COMMIT MESSAGE FORMAT:

Line 1 (summary): One line, maximum 72 characters, imperative mood (start with a verb: Add, Fix, Remove, Update, Refactor, Wire, Implement — not "Added" or "Adds"). This line must stand alone and make sense without context. Do not include the word "and" — if you need "and," the commit is doing too much.

Line 2: Blank line.

Lines 3+: Bullet points explaining WHY these changes were made — not what the code does (the diff shows that), but why this approach was taken, what problem it solves, and what decision was made. Each bullet should be one sentence. Maximum 5 bullets.

RULES:
- No emoji in the commit message
- No "misc" or "various" or "cleanup" commits — be specific
- No co-author lines unless explicitly asked
- Do not summarize the diff — explain the reasoning
- If this commit completes a task, reference the task: "(Completes: Task 4 — Save prompt to database)"
- If this commit is part of a larger feature, note that: "(Part of: Prompt creation flow)"

EXAMPLE OF A GOOD COMMIT:
```
Add POST /api/prompts route with user-scoped insertion

- Route handler validates required fields before hitting the database
  to avoid unnecessary DB calls on bad input
- Records are scoped to the authenticated user ID from Clerk to prevent
  cross-user data access at the API layer rather than relying solely on RLS
- Returns 201 with full record so the frontend can update its cache
  without a separate fetch

(Completes: Task 4 — Save prompt to database)
```

EXAMPLE OF A BAD COMMIT (do not write this):
```
fixed stuff and updated the api route
```

Output only the commit message — no explanation, no alternatives. One message, ready to paste.
```
