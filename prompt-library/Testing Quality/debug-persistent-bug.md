---
title: Debug Persistent Bug (AI Keeps Failing)
---

## When to use
When the AI has "fixed" a bug multiple times but it keeps coming back — or when it says "Done" and the bug still exists. Also use when tests pass but the feature is still broken in the browser or runtime.

## Prompt

```
Stop. Do not touch any code yet.

We have a bug that has survived multiple fix attempts. I need you to actually solve it this time, not patch around it.

The bug: [DESCRIBE EXACTLY WHAT HAPPENS — input, action, expected output, actual output]
How to reproduce: [EXACT STEPS]
What has already been tried: [LIST EVERY FIX THAT WAS ATTEMPTED]

---

PHASE 1 — Reproduce before you touch anything

Before writing a single line of code:
1. Read the relevant files and trace the code path from the user action to the failure
2. Write out the full execution flow step by step — what calls what, what data moves where
3. At each step, state: "I expect X — do I see X?" If not, that step is the candidate
4. Identify the 3 most likely root causes, ranked by probability
5. Tell me your #1 hypothesis and why — do NOT fix anything yet

I will confirm before you proceed.

---

PHASE 2 — Isolate (after I confirm)

For each hypothesis, starting with #1:
1. Write the smallest possible test or log that would confirm or deny it
2. Tell me exactly what to run and what output would prove it
3. Do not fix — only observe

---

PHASE 3 — Fix (after we have confirmed the root cause)

Only after we agree on the actual root cause:
1. Write the minimal fix — change only what caused the failure
2. Explain what was wrong and why this fix addresses the root cause (not the symptom)
3. Tell me how to verify the fix worked

Rules:
- Do not say "this should work" — show me why it will
- Do not refactor, clean up, or improve anything outside the bug scope
- If the fix requires touching more than 3 files, stop and ask me first
```
