---
title: E2E Test Writer
---

## When to use
After implementing a primary user flow, to write the Playwright test that serves as your shipping gate — if this test breaks, you don't ship.

## Prompt

```
Write a Playwright E2E test for the primary user flow I'm about to describe. This test is the shipping gate — it must fail loudly if the core value loop breaks.

Primary user flow to test: [DESCRIBE THE FULL FLOW — e.g. "User signs up, creates their first prompt, saves it, and sees it appear in their library"]

Tech details:
- Framework: [e.g. Next.js 15]
- Auth: [e.g. Clerk — describe how to handle auth in tests, e.g. bypass with test user]
- Base URL for tests: [e.g. http://localhost:3000]
- Test user credentials (for local testing): [e.g. use environment variable TEST_USER_EMAIL and TEST_USER_PASSWORD]

Write the test with these requirements:

1. PAGE OBJECT PATTERN: Create a page object class for each page involved in the flow. The test spec file should use these page objects, not raw Playwright selectors. This makes the test resilient to minor UI changes.

2. STARTING STATE: The test must start from a logged-out state and complete auth as part of the flow — or explicitly set up the auth state using Playwright's storageState. Document which approach you're using and why.

3. HAPPY PATH: The test must walk through the complete happy path from start to the success condition. Every meaningful step must have an assertion — do not just click through and assert only at the end.

4. SUCCESS ASSERTION: The final assertion must verify the success condition precisely. Not just "page is visible" but the actual outcome — a record exists, a count changed, a confirmation message contains specific text.

5. ONE ERROR CASE: Write one additional test case that covers the most important error scenario — the thing that would break the most users if it failed silently. Example: submitting with invalid data, hitting an auth wall on a protected resource, or duplicate submission.

6. TEST ISOLATION: The test must clean up after itself or use a test-specific data strategy so it can run multiple times without leaving dirty state. Describe the cleanup strategy used.

File structure to create:
- tests/e2e/[feature-name].spec.ts — the test spec
- tests/e2e/pages/[page-name].page.ts — one file per page object

Include in the test file:
- A comment at the top explaining what flow this tests and why it's the primary gate
- Descriptive test names using the format: "should [outcome] when [condition]"
- Explicit waits with meaningful error messages — never use arbitrary `waitForTimeout`

After writing the tests, state:
1. How to run this test locally
2. What environment variables must be set for the test to run
3. What this test does NOT cover (so I know what gaps remain)
```
