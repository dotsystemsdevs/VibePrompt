---
title: Context Engineering PRD
---

## When to use
When you want to implement a specific feature and need the AI to research your codebase, pull relevant docs, and produce a fully-specified implementation blueprint before writing a single line of code. The most reliable pattern for complex features.

## Prompt

```
I want to implement the following feature. Before writing any code, research the codebase and produce a complete implementation blueprint (PRP — Product Requirements Prompt).

Feature request:
[DESCRIBE WHAT YOU WANT TO BUILD IN 2-5 SENTENCES]

Step 1: RESEARCH THE CODEBASE
Search for existing patterns relevant to this feature:
- Which files handle similar functionality?
- What naming conventions are in use?
- What components, hooks, or utilities already exist that this feature should use?
- Are there any existing patterns this feature should follow for consistency?
List every file you found that is relevant, with one sentence describing why it's relevant.

Step 2: IDENTIFY WHAT'S MISSING
What does this feature need that doesn't exist yet?
- New files to create
- New dependencies to install (confirm they exist before listing them)
- Schema changes or migrations
- New API routes or server actions

Step 3: FETCH EXTERNAL DOCS
If this feature uses any library or API, list the specific documentation sections that are relevant. Note any version-specific behavior or known gotchas.

Step 4: WRITE THE IMPLEMENTATION BLUEPRINT
Produce a complete PRP using this structure:

Goal: [End state in one sentence]
Why: [Business value — who benefits and what metric improves]
What: [User-visible behavior and technical requirements]

Success Criteria:
- [ ] [Testable condition 1]
- [ ] [Testable condition 2]
- [ ] [Testable condition 3]

Context:
- Files to reference: [list with why]
- Patterns to follow: [specific examples from codebase]
- Gotchas: [known issues, version quirks, edge cases]
- Codebase before: [relevant current structure]
- Codebase after: [expected structure after implementation]

Implementation tasks (ordered):
001. [Task title] — [files to touch, max 3] — [done condition]
002. [Task title] — [files to touch, max 3] — [done condition]
...

Validation gates (run these to confirm success):
- [Command 1]
- [Command 2]

Step 5: SCORE YOUR CONFIDENCE
Rate this blueprint 1-10 for one-pass implementation success. If below 8, list what additional information would raise it.

ultrathink before producing the blueprint.
```
