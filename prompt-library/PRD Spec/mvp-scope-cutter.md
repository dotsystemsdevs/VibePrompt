---
title: MVP Scope Cutter
---

## When to use
When your feature list has grown beyond 5 items and you need to cut ruthlessly before handing it to an AI coding agent — more features means more drift, more bugs, and longer time to ship.

## Prompt

```
I need to cut my feature list down to a true MVP. Apply the MVP filter ruthlessly. The goal is to ship the smallest possible version that lets a real user complete the core value loop and tell me if this product is worth building.

My product: [DESCRIBE WHAT IT DOES IN ONE SENTENCE]
Core value loop: [Describe the single most important thing a user does in your product — the action that delivers the primary value]

My current feature list:
1. [FEATURE 1]
2. [FEATURE 2]
3. [FEATURE 3]
4. [FEATURE 4]
5. [FEATURE 5]
6. [FEATURE 6]
... [add all features]

For each feature, apply this filter and label it KEEP, CUT, or LATER:

KEEP: This feature is required for a user to complete the core value loop. Without it, the product cannot demonstrate its primary value at all.

CUT: This feature is not required for the core value loop. It may be nice to have, but removing it does not prevent a user from experiencing the product's core value. Cut it from the MVP entirely.

LATER: This feature is genuinely valuable but belongs in V2. It enhances the experience but is not required for the core loop. Add it to a LATER list, not the current build.

For each label, provide a one-line reason explaining the decision.

After labeling all features:

1. CONFIRM THE CORE LOOP: Verify that the remaining KEEP features are sufficient for a user to complete the core value loop end to end. If not, flag what is missing.

2. SCOPE CHECK: If more than 5 features are labeled KEEP, apply the filter again more aggressively. A true MVP should have 3-5 features maximum.

3. HIDDEN COMPLEXITY WARNING: Flag any KEEP feature that is deceptively complex to build — features that look simple but likely require significant backend work, third-party integrations, or data modeling. These are scope traps.

4. FINAL MVP LIST: Output the final KEEP list as a clean numbered list — this becomes the feature set for the PRD.
```
