---
title: Prompt Chain Builder
---

## When to use
When a task is too complex for one prompt and needs to be broken into sequential steps where each output feeds the next — design the chain before running any step.

## Prompt

```
Help me design a prompt chain for a complex task. I need to break this into sequential steps where each step's output is the verified input for the next step. Do not start executing any step — design the full chain first.

The complex task: [DESCRIBE THE FULL TASK — e.g. "Build a complete user onboarding flow: sign up, email verification, profile setup, and first-run tutorial"]

Why it can't be one prompt: [EXPLAIN WHY — e.g. "Too many files, multiple system layers, requires decisions at each step before proceeding"]

Design a prompt chain with the following structure for each step:

---
STEP [N] of [TOTAL]: [SHORT TITLE]

INPUT: What does this step receive as its input?
- If it's the first step: describe the starting state (e.g. "empty Next.js project with Clerk installed")
- If it's a later step: describe the exact output from the previous step that this step consumes

TRANSFORMATION: What does this step do? Describe the specific action, decision, or implementation that happens in this step. 2-4 sentences.

OUTPUT: What does this step produce? Be precise — a file, a decision, a schema, a working UI component, an API contract. This output must be concrete enough to verify before moving to the next step.

VERIFICATION: How do you confirm this step is complete and correct before moving to Step N+1? This must be a testable check — not "looks right" but "TypeScript compiles with zero errors" or "route returns 200 with the expected JSON shape."

ROLLBACK: If this step produces bad output, what do you undo before retrying? Name the specific files or changes to revert.

CAN THIS STEP BE SKIPPED? [Yes, if X condition is already met / No, always required]
---

After designing all steps:

1. DEPENDENCY MAP: Draw a simple text dependency diagram showing which steps must complete before which others can start. Flag any steps that could be parallelized.

2. FAILURE POINTS: Identify the 2-3 steps most likely to produce bad output or require iteration. Explain why.

3. TOTAL SCOPE CHECK: Count the total number of files touched across all steps. If the total exceeds 10 files, flag this — the task may need to be broken into multiple separate features rather than one chain.

4. FIRST PROMPT: Write the literal prompt for Step 1, ready to paste into the AI coding agent.
```
