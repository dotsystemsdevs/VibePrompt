---
title: Session Kickoff Protocol
---

## When to use
At the start of every new AI coding session, before any code is written. Ensures the AI reads current context, understands the project state, and doesn't operate on stale assumptions.

## Prompt

```
Before we write any code, complete the following session kickoff. Do not skip any step.

1. READ CONTEXT FILES
Read the following files in this order:
- AGENTS.md (full file)
- memory-bank/@architecture.md
- memory-bank/@design-doc.md
- TASK.md (the current task list)
- Any other files listed in AGENTS.md as required reading

Confirm you have read them by listing their file names.

2. SUMMARIZE YOUR UNDERSTANDING
In 5 bullet points or fewer: what is this project, what does it do, who is it for, and what is the current state of the build? Be specific — no generic descriptions.

3. STATE THE CURRENT STATUS
Based on AGENTS.md, memory-bank, and code you can see:
- What is complete and working
- What is partially built or broken
- What has not been started yet

4. CHECK TASK.MD
- What is the current open task in TASK.md?
- If no task is listed for today, tell me so I can add it before we start.
- Mark any tasks that appear complete.

5. STATE WHAT YOU WILL DO THIS SESSION
Describe exactly what you plan to do for today's task. List the specific files you expect to touch. Maximum 3 files — if the task requires more, flag it and we'll split the task before starting.

6. STATE WHAT YOU WILL NOT DO THIS SESSION
List what is out of scope: protected files from AGENTS.md, any functionality not related to today's task, and anything that would require starting a new chat first.

7. FLAG ANY RISKS
If you notice anything that could cause problems — dependency conflicts, schema mismatches, naming inconsistencies, files approaching 500 lines — flag it now. Not after writing code.

Only after completing all 7 steps should you ask me what the task is for this session.
```
