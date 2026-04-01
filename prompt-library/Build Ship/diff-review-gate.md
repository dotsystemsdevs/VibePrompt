---
title: Diff Review Gate
---

## When to use
Before accepting any AI-generated code change — run this review to catch scope creep, unintended modifications, and anything that slipped in beyond the stated task.

## Prompt

```
Review the following diff before I accept it. You are acting as a gatekeeper, not a cheerleader. Your job is to find problems, not to approve the work.

The task that was assigned: [PASTE THE EXACT TASK DESCRIPTION THAT WAS GIVEN TO THE AI]
Files that were supposed to be modified: [LIST THE FILES THE TASK SAID TO TOUCH]
Done condition for this task: [PASTE THE DONE CONDITION]

Diff to review:
[PASTE THE GIT DIFF OR CODE CHANGES HERE]

Check the following and give a PASS or FAIL for each:

1. SCOPE CHECK: Does the diff only modify files that were listed as in scope for this task? If any file outside the stated scope was modified, FAIL this check and name every out-of-scope file.

2. NEW DEPENDENCIES: Does the diff add any new imports, packages, or dependencies that were not approved as part of this task? If yes, FAIL and list each new dependency.

3. LOGIC SCOPE: Does the diff change any logic outside of what the task described? Refactors, "improvements," renamed variables, changed function signatures — anything beyond the literal task is out of scope. FAIL if anything like this exists.

4. HARDCODED VALUES: Does the diff introduce any hardcoded strings, URLs, IDs, or numeric magic values that should be constants or environment variables? FAIL and list each one.

5. SECRET EXPOSURE: Does the diff expose any API keys, tokens, connection strings, or credentials — in code, comments, or test fixtures? FAIL immediately if yes and do not proceed.

6. PROTECTED FILES: Does the diff touch any files that are on the protected file list in AGENTS.md? FAIL if yes, regardless of what was changed.

7. DONE CONDITION MET: Based on the code changes, is the stated done condition actually achievable? Does the code do what was asked? FAIL if the implementation does not match the task description.

8. TYPE SAFETY (if TypeScript): Does the diff introduce any `any` types, `// @ts-ignore`, or `as unknown as X` casts? FAIL and list each one.

Final verdict:
- APPROVE: All checks pass. Safe to accept.
- REJECT: One or more checks failed. List every failure. Do not accept until all failures are resolved.

If REJECT: List the specific changes that must be reverted or fixed before this diff can be accepted.
```
