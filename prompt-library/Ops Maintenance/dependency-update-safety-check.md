---
title: Dependency Update Safety Check
---

## When to use
Before updating any npm package — especially major version bumps — to understand what you're actually changing and whether your tests would catch a regression.

## Prompt

```
Review the following proposed dependency update and give me a GO or NO-GO recommendation with specific evidence.

Package being updated: [PACKAGE NAME]
Current version: [CURRENT VERSION — e.g. 3.4.2]
Proposed version: [NEW VERSION — e.g. 4.0.0]
Why I'm considering this update: [e.g. security patch, new feature I need, automated Dependabot PR]

How I use this package in my project:
[DESCRIBE HOW YOUR CODE USES THIS PACKAGE — e.g. "We import useForm and Controller from react-hook-form in 8 form components. We use the register function and formState.errors on every form."]

Relevant code that uses this package:
[PASTE 2-3 REPRESENTATIVE EXAMPLES OF HOW YOU CALL THIS LIBRARY]

Perform the following analysis:

1. BREAKING CHANGES AUDIT:
Review the changelog between [CURRENT VERSION] and [NEW VERSION]. List every breaking change. For each breaking change:
- What changed (API renamed, removed, behavior changed)
- Whether my described usage pattern is affected
- What migration step is required if affected

2. API SURFACE DIFF:
Identify any function, hook, prop, or import that I use (based on my description above) that has changed signature, been renamed, or been removed. List each one with the old and new form.

3. MIGRATION EFFORT ESTIMATE:
Based on the breaking changes and my described usage, estimate the migration effort:
- TRIVIAL: 1-2 find-and-replace operations, no logic changes
- MODERATE: Multiple files to update, some logic changes, 30-60 minutes of work
- SIGNIFICANT: Architecture-level changes, multiple components need rethinking, 2+ hours
- AVOID: Breaking changes are fundamental enough that the update is not worth it at this time

4. REGRESSION RISK:
Given my tech stack and test coverage, would my existing tests catch a regression introduced by this update? What specific behavior is at risk of breaking silently (i.e., no test would fail but the user experience would be wrong)?

5. SECURITY CONTEXT:
Is this update motivated by a security fix? If yes, what is the CVE, what is the severity, and what attack vector does it close? If security is the reason for the update, what is the risk of NOT updating?

6. ROLLBACK PLAN:
If I update and something breaks in production, how do I roll back? Is this as simple as reverting package.json, or are there data migrations or API changes that make rollback complicated?

RECOMMENDATION:
GO: Update now. Migration steps are: [LIST STEPS]
GO WITH CAUTION: Update, but test these specific things first: [LIST]
NO-GO: Do not update yet. Reason: [SPECIFIC REASON]. Revisit when: [CONDITION]
```
