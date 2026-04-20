---
title: Plan Mode Protocol
---

## When to use
Before executing any non-trivial task in Claude Code or Cursor. Forces the AI to plan before touching code — the single habit that prevents the most regressions.

## Prompt

```
DO NOT write any code yet. We are in plan mode.

Task: [DESCRIBE THE TASK IN ONE SENTENCE]

Before touching a single file, I need you to:

1. RE-READ CONTEXT
Read AGENTS.md, memory-bank/@architecture.md, and TASK.md. Confirm you have read them.

2. UNDERSTAND THE TASK
Restate the task in your own words. What is the exact end state when this task is done? What does the done condition look like from the user's perspective?

3. LIST FILES TO TOUCH
List every file you will create, modify, or delete. Maximum 3 files. If you need more than 3 files, tell me — we will split the task before proceeding.

4. LIST FILES TO NOT TOUCH
List any files that could be tempting but are explicitly out of scope for this task. Include all protected files from AGENTS.md.

5. DESCRIBE YOUR APPROACH
In 3-5 sentences, describe exactly what you plan to implement. No code yet — just the approach. If there are two ways to do it, describe both and tell me which you recommend and why.

6. FLAG RISKS
Identify anything that could go wrong: files approaching 500 lines that may need refactoring first, dependencies that need to be installed, schema changes that require a migration, or any change that can't be easily rolled back.

7. STATE YOUR CONFIDENCE
On a scale of 1-10: how confident are you that this plan will produce working code in one pass without requiring changes to files outside the 3-file scope? If below 7, tell me what information you need to raise it.

Only after I approve this plan will you write any code.

ultrathink before responding.
```
