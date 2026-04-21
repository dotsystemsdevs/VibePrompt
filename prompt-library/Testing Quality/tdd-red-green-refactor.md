---
title: TDD Red → Green → Refactor
---

## When to use
When implementing any feature with testable behavior. AI-generated tests written after the code always have the same blind spots as the code itself — they confirm what the AI did, not what you wanted. Writing tests first inverts this.

## Prompt

```
We are implementing the following using strict TDD. Do not write any implementation code until I tell you to.

Feature: [DESCRIBE THE FEATURE]
Acceptance criteria: [WHAT DOES "DONE" LOOK LIKE — BE SPECIFIC]

Work through these steps in order. Complete each step fully before moving to the next. Mark each step with [RED], [GREEN], or [REFACTOR] so I can track where we are.

---

STEP 1 — [RED] Write failing tests
Write the tests that verify the acceptance criteria above.
Rules:
- Tests must assert the desired behavior, not the implementation
- Tests must fail right now (we have not written the code yet)
- Use real assertions — not expect(true).toBe(true)
- Cover: the happy path, at least one edge case, and at least one error state
- Do NOT use 0 or empty string as the only test data for math or logic tests
- Do NOT write tests that pass trivially

Commit message when done: "test: [feature name] — failing tests"
Tell me: "Tests are written and failing. Ready to implement."

---

STEP 2 — [GREEN] Write the minimum code to make tests pass
Write only the code needed to make every test pass. Nothing extra.
Rules:
- Do NOT add features not tested
- Do NOT optimize, generalize, or future-proof
- Ugly code that passes tests is correct at this step

Commit message when done: "feat: [feature name] — tests passing"
Tell me: "All tests passing. Ready to refactor."

---

STEP 3 — [REFACTOR] Clean up without breaking tests
Improve the code quality. Run tests after every change.
Rules:
- Tests must still pass after every refactor
- Remove duplication
- Improve naming
- Split large functions
- Do NOT add new functionality

If any test breaks during refactor: STOP, show me which test and why, fix it before continuing.

Commit message when done: "refactor: [feature name] — clean implementation"
Tell me: "Refactor complete. All tests still passing."
```
