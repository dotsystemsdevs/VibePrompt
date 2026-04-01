---
title: Pre-Ship Quality Gate
---

## When to use
Before merging any feature branch or deploying to production — run every item on this gate and do not ship until everything is PASS.

## Prompt

```
Run through the pre-ship quality gate for the changes I'm about to deploy. Check each item and report PASS, FAIL, or SKIP (with reason for skip). Do not summarize — give me the full gate output.

Feature being shipped: [DESCRIBE THE FEATURE]
Branch or commit being reviewed: [BRANCH NAME OR COMMIT HASH]
Environment deploying to: [production / staging]

QUALITY GATE CHECKLIST:

1. TYPESCRIPT BUILD
Check: Does the TypeScript compiler pass with zero errors?
How to verify: Run `tsc --noEmit` and report the exact output.
PASS condition: Zero type errors. Zero.
FAIL condition: Any type error, even in files not directly related to this feature.

2. LINT
Check: Does the linter pass with zero errors?
How to verify: Run the project's lint command (check package.json scripts) and report output.
PASS condition: Zero lint errors. Warnings are acceptable but must be listed.

3. SECRET AND CREDENTIAL SCAN
Check: Are any secrets, API keys, tokens, or credentials present in the diff?
How to verify: Review every changed file for hardcoded strings matching: sk-, pk-, Bearer, password=, secret=, api_key=, DATABASE_URL with credentials, any base64-encoded strings in source.
PASS condition: Zero secrets found in source code.
FAIL condition: Any credential found anywhere in source — even in comments or test fixtures.

4. SCOPE VERIFICATION
Check: Do the changed files match the stated feature scope?
How to verify: List every file changed in this diff. For each file, confirm it was an expected part of this feature.
PASS condition: Every changed file was necessary for this feature. No opportunistic refactors or drive-by fixes.
FAIL condition: Any file changed that was not required by this feature.

5. OUT-OF-SCOPE LIST COMPLIANCE
Check: Does the implementation avoid everything on the project's out-of-scope list?
How to verify: Read the out-of-scope list in the PRD or AGENTS.md. Check the diff against each item.
PASS condition: Nothing from the out-of-scope list was built.
FAIL condition: Any out-of-scope item implemented, even partially.

6. PRIMARY USER FLOW — MANUAL SMOKE TEST
Check: Can a real user complete the primary value loop end to end in the current build?
How to verify: Walk through the steps manually in the running app.
Steps to test: [LIST THE STEPS OF YOUR CORE USER FLOW HERE]
PASS condition: Every step completes without error. The end state is correct.
FAIL condition: Any step fails, throws an error, or produces unexpected output.

7. ERROR STATES
Check: Do error states display correctly and not expose internal information?
How to verify: Trigger at least one error condition (bad input, network failure simulation, unauthorized access) and confirm the error message shown to the user is appropriate.
PASS condition: Error messages are user-friendly and do not expose stack traces, database errors, or internal paths.

8. BROWSER CONSOLE
Check: Are there zero console errors in the browser on the pages affected by this feature?
How to verify: Open the browser dev console and navigate through the affected pages.
PASS condition: Zero console errors. Console warnings must be listed and explained.

GATE RESULT:
- ALL PASS: Ship it.
- ANY FAIL: Do not ship. List every failure. Fix and re-run the gate.
```
