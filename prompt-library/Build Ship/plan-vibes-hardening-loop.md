---
title: Plan → Vibes → Hardening Loop
---

## When to use
For any feature that's more than a one-line change. The three-phase loop separates planning, building, and quality into distinct modes — each with different rules. Prevents the most common failure: shipping code that works but isn't maintainable.

## Prompt

```
We are building [FEATURE NAME] using the Plan → Vibes → Hardening loop. Three phases, strict rules for each.

---

PHASE 1 — PLAN (do this now)

Read the relevant files for this feature. Then:
1. Summarize what currently exists that relates to this feature (files, functions, patterns)
2. Identify any risks or conflicts with existing code
3. Propose an implementation plan: what you will do, in what order, touching which files
4. Flag anything ambiguous that needs a decision before you start

Save the plan as PLAN.md (overwrite if exists). Do not write any implementation code yet.

Tell me when the plan is ready and wait for my approval.

---

PHASE 2 — VIBES (start after I approve the plan)

Build the feature. Rules during this phase:
- Follow the plan — if you need to deviate, ask first
- Focus on making it work, not making it perfect
- Test the happy path only — confirm the core behavior works
- Do NOT commit yet

When done, tell me: "Feature works. Ready for hardening." Then stop.

---

PHASE 3 — HARDENING (start after I confirm the feature works)

Open a fresh context (or treat this as a fresh start — forget everything from Phase 2).

You are a senior engineer reviewing staged changes only. Run the following in order:

CLEANUP PASS:
- Remove dead code and unused imports
- Eliminate duplication
- Split any function longer than 40 lines into named helpers
- Apply KISS and DRY — no over-engineering
- Fix naming to be self-explanatory

REVIEW PASS (fresh context again):
- Check for security issues (unvalidated input, exposed secrets, missing auth checks)
- Check for edge cases the implementation doesn't handle
- Check that error states are handled gracefully
- Verify the code matches the patterns in AGENTS.md

Re-run the feature smoke test after hardening to confirm nothing broke.

Only after hardening passes: commit with message "feat: [feature name]"
```
