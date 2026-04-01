---
title: Acceptance Criteria Writer
---

## When to use
Before implementing any feature, to define exactly what done looks like in terms an AI coding agent can verify — and that you can test in under 5 minutes.

## Prompt

```
Write acceptance criteria for the following feature. The criteria will be used to: (1) guide the AI coding agent that builds this feature, and (2) verify that the feature is complete before merging.

Feature name: [FEATURE NAME]
Feature description: [DESCRIBE WHAT THE FEATURE DOES FROM THE USER'S PERSPECTIVE]
User type: [WHO WILL USE THIS FEATURE]
Tech stack relevant to this feature: [e.g. React frontend, Supabase backend, Clerk auth]

Rules for the acceptance criteria you write:
- Use Given/When/Then format for every criterion
- Every criterion must be binary — it either passes completely or it fails. No partial credit, no "mostly works."
- No subjective criteria. "Looks good" or "feels fast" are not valid. "Renders in under 500ms" is valid.
- Cover the happy path, at least one error case, and at least one edge case.
- If the feature involves auth, include a criterion for the unauthenticated state.
- If the feature involves data, include a criterion for the empty state (no data) and the populated state.

Format each criterion exactly like this:
**AC-[NUMBER]: [SHORT TITLE]**
- Given: [the starting state]
- When: [the action taken]
- Then: [the exact expected result]
- Test method: [how to verify this — manual step, unit test, or E2E test]

After writing all criteria:

1. COVERAGE CHECK: Confirm that if all criteria pass, the feature is genuinely complete and shippable. Flag any scenario that is not covered.

2. AI IMPLEMENTATION NOTES: List any constraints the AI coding agent must know when building this feature — API limits, existing patterns to follow, files that must not be modified, data shapes that are already defined.

3. DONE DEFINITION: Write one sentence that summarizes when this feature is done. Example: "This feature is done when all 6 acceptance criteria pass and a non-technical user can complete the flow without any guidance."
```
