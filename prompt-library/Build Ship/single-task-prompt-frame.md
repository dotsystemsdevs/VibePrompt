---
title: Single Task Prompt Frame
---

## When to use
When starting each individual build loop task — use this frame to give the AI agent a focused, unambiguous task that leaves no room for interpretation or scope expansion.

## Prompt

```
You have one task for this session. Read every line of this prompt before writing any code.

TASK: [WRITE THE TASK IN ONE SENTENCE — e.g. "Build the API route that saves a new prompt to the database"]

WHAT TO BUILD:
[2-4 sentences describing exactly what to implement. Include the specific behavior, not just the feature name. Example: "Create a POST /api/prompts route handler in src/app/api/prompts/route.ts. It should accept a JSON body with title, content, and category fields, validate that all three are present, insert the record into the prompts table with the authenticated user's ID, and return the created record with a 201 status."]

FILES YOU MUST TOUCH (and only these):
- [EXACT FILE PATH 1] — [what to do in this file]
- [EXACT FILE PATH 2] — [what to do in this file]

FILES YOU MUST NOT TOUCH:
- [EXACT FILE PATH] — [reason, e.g. "contains auth logic — protected"]
- [EXACT FILE PATH] — [reason, e.g. "out of scope for this task"]
- All files not listed in the "must touch" list above

DONE CONDITION:
[One sentence that defines success. Must be testable by a human looking at the running app. Example: "When I POST to /api/prompts with a valid body and a valid auth token, the record appears in the database and the response is 201 with the created record."]

CONSTRAINTS:
- Do not install any new packages. Use only what is already in package.json.
- Do not modify the database schema. Use the existing tables as defined.
- Follow the naming conventions in AGENTS.md exactly.
- Use TypeScript with explicit types. No `any`.
- If you encounter something that requires touching a file outside the stated scope, STOP and tell me before proceeding.
- If anything in this task is unclear, ask now. Do not assume and build — ask first.

CONFIRMATION:
Before writing any code, reply with:
1. What you are going to build (in your own words)
2. The exact files you will touch
3. Any questions or blockers you have before starting

Wait for my confirmation before writing any code.
```
