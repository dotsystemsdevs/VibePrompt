---
title: Plain English Rewrite Debug
---

## When to use
When the AI insists the code is correct but it's not behaving the way you expect. Forces the AI to prove it understands what the code actually does — not what it intended it to do. The gap between the two descriptions is almost always where the bug lives.

## Prompt

```
Do not touch any code. Do not suggest fixes. Just explain.

Walk me through what this code does in plain English — as if you are describing it to someone watching it execute in real time, step by step.

Code to explain:
[PASTE THE RELEVANT FUNCTION, COMPONENT, OR CODE BLOCK]

Rules for your explanation:
- Describe what actually happens, not what was intended
- Be specific about every step: what value goes in, what transformation happens, what comes out
- If a variable could be null, undefined, or unexpected at any step — say so
- If a condition branches, trace BOTH paths
- Do NOT use the phrase "this will" or "this should" — only "this does"
- Do NOT summarize — trace every meaningful line

After the walkthrough, answer these questions:
1. Is there any step where the code assumes something that might not be true?
2. Is there any step where a value could be different from what the code expects?
3. Is there anything the code claims to do that it does not actually do?

If your walkthrough reveals a discrepancy from what I told you the code is supposed to do: describe the exact line where the behavior diverges and why.

Only after the walkthrough is complete should you suggest a fix — and only if you found a specific problem.
```
