---
title: Architecture Health Check
---

## When to use
Before adding a major new feature to a project that's been growing for a few weeks. Also use when bugs keep appearing in unexpected places, when the codebase feels hard to reason about, or when you're worried the AI has been quietly making the structure worse.

## Prompt

```
Do not write any code. This is a read-only audit.

I need an honest architecture health check before I continue building. The project has been growing and I want to catch structural problems before they compound.

Project context: [DESCRIBE YOUR APP — what it does, main tech stack, rough size]
Main concern: [WHAT FEELS WRONG OR UNCERTAIN]

---

AUDIT CHECKLIST

Read the codebase and assess each of these. For each item, give: STATUS (healthy / warning / critical) and a one-line explanation.

1. File size — any files over 300 lines that should be split?
2. Coupling — components or modules that know too much about each other's internals?
3. Data flow — is state lifted to the right level, or is data being drilled 3+ levels deep?
4. Duplication — logic that exists in more than one place and will diverge?
5. Dead code — files, functions, or components that are imported but never used?
6. API contracts — are the frontend and backend in agreement on data shapes?
7. Error handling — are there silent failures or missing error states?
8. Security surface — any exposed secrets, unvalidated inputs, or missing auth checks?
9. Naming consistency — do naming conventions hold across the codebase?
10. Test coverage — what critical paths have no tests?

---

REPORT FORMAT

After the checklist, give me:

CRITICAL (fix before adding anything new):
- [issue] → [exact file/location] → [what to do]

WARNINGS (fix soon, won't block):
- [issue] → [exact file/location] → [what to do]

HEALTHY:
- [list what's solid]

RECOMMENDATION:
One paragraph on whether it's safe to keep building, or whether I should schedule a cleanup session first.

Be direct. Do not soften findings to be encouraging.
```
