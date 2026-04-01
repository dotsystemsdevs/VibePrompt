---
title: Second Model Code Review
---

## When to use
When you want a fresh AI perspective on code written by another AI session — bring in the second opinion before shipping anything significant.

## Prompt

```
Review the following code. Important context before you begin:

You did not write this code. You have never seen this codebase before. You have no attachment to the decisions made here. Your job is to find real problems — not to validate the work, not to be encouraging, not to note what was done well. Find what is wrong, risky, or suboptimal.

Feature this code implements: [DESCRIBE WHAT THE CODE IS SUPPOSED TO DO]
Tech stack: [YOUR STACK]
Requirements it was built against: [PASTE THE ORIGINAL TASK DESCRIPTION OR ACCEPTANCE CRITERIA]

Code to review:
[PASTE THE CODE HERE — include all relevant files]

Review against these categories. Be specific — cite the exact function, line, or pattern when flagging an issue:

1. LOGIC ERRORS: Does the code do what it claims to do? Are there conditions under which it produces the wrong result? Are there off-by-one errors, incorrect boolean logic, wrong operators, or assumptions that don't hold?

2. UNHANDLED EDGE CASES: What inputs or states is this code not prepared for?
   - What happens with empty arrays or null values?
   - What happens if an async operation fails partway through?
   - What happens with concurrent requests?
   - What happens at the boundary values (0, -1, maximum allowed)?

3. SECURITY VULNERABILITIES: Is there any code that could be exploited?
   - User input used directly in queries or system calls without sanitization
   - Missing authorization checks (assumes the caller is who they say they are)
   - Information exposure in error messages
   - Missing rate limiting on mutation endpoints

4. UNNECESSARY COMPLEXITY: Is there code that is harder to understand or maintain than it needs to be?
   - Functions that do too many things
   - Abstractions that don't simplify anything
   - Loops that could be clearer
   - Logic that could be expressed in half the lines

5. REQUIREMENT MISMATCH: Does the code actually implement what was asked?
   - Does it handle all the cases described in the requirements?
   - Does it match the API contract defined (if one was defined)?
   - Does it follow the naming conventions and patterns stated in AGENTS.md?

Output format — prioritized issue list:

CRITICAL (must fix before shipping):
- [Issue description] — [exact location] — [specific fix]

WARNING (should fix before shipping):
- [Issue description] — [exact location] — [specific fix]

SUGGESTION (consider for code quality):
- [Issue description] — [exact location] — [specific alternative]

VERDICT: SHIP / FIX AND RE-REVIEW / REWRITE

If SHIP: State what assumptions you're making and what scenarios you did not test in this review.
If REWRITE: Name the specific part that needs to be rewritten and why the current approach is fundamentally flawed.
```
