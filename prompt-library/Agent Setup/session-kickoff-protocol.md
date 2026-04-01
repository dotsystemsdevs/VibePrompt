---
title: Session Kickoff Protocol
---

## When to use
At the start of every new AI coding session, before any code is written, to ensure the AI understands the current project state and does not operate on stale context.

## Prompt

```
Before we write any code, complete the following session kickoff protocol. Do not skip any step.

1. READ: Read AGENTS.md in full. Then read any other context files listed in AGENTS.md (PRD, schema, etc.). Confirm you have read them by listing their file names.

2. SUMMARIZE YOUR UNDERSTANDING: In 5 bullet points or fewer, describe what this project is, what it does, who it's for, and what the current state of the build is. Be specific — no generic descriptions.

3. STATE THE CURRENT STATUS: Based on AGENTS.md and any code you can see, tell me:
   - What is complete and working
   - What is partially built or broken
   - What has not been started yet

4. STATE WHAT YOU WILL DO THIS SESSION: Based on the task I'm about to give you, describe exactly what you plan to do. List the specific files you expect to touch. If you are unsure about anything, ask now — not after you've started writing code.

5. STATE WHAT YOU WILL NOT DO THIS SESSION: Explicitly list what is out of scope for this session. Include the protected files from AGENTS.md and any functionality not related to today's task.

6. FLAG ANY RISKS: If you notice anything in the current codebase that could cause problems with today's task — dependency conflicts, schema mismatches, naming inconsistencies — flag it now.

Only after completing all 6 steps should you ask me what the task is for this session.
```
