---
title: Session Handover Generator
---

## When to use
At the end of every coding session, before closing your editor. Prevents the "what was I even doing?" restart that kills momentum — the next session opens with full context instead of zero.

## Prompt

```
We are ending this session. Before we stop, complete the full session handover. Do not skip any step.

STEP 1 — UPDATE DOCS
Review every file we touched or discussed this session. For each file that has relevant documentation:
- Update the corresponding entry in PROJECT.md (or create it if it doesn't exist)
- If a function changed behavior, update any comments that describe the why
- If a new pattern was established, add it to AGENTS.md under the relevant section

List every doc you updated and what you changed.

STEP 2 — GIT COMMIT
Stage all working changes and commit with a message that follows the project's commit convention.
If there are any uncommitted changes that are broken or incomplete, list them separately and do NOT include them in the commit.

STEP 3 — HANDOVER NOTE
Write a handover note to be saved as HANDOVER.md (overwrite the previous one). The next session will read this file first. Include:

**Current state:** What is working right now, tested and confirmed.
**What we were doing:** The exact task we were in the middle of, with enough detail that zero context is needed to continue.
**Next step:** The single most important thing to do when the next session opens. One task only.
**Parking lot:** Any ideas, improvements, or features that came up this session that we deliberately did NOT act on. Keep these for later.
**Open questions:** Anything unresolved that needs a decision before continuing.
**Files to read first:** The 3-5 files most relevant to the next session's task.

STEP 4 — CONFIRM
Tell me: "Session closed. Next session starts at: [NEXT STEP]."
```
