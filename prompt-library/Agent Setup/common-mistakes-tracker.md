---
title: Common Mistakes Tracker
---

## When to use
Set this up once, then reference it in every new feature prompt. The single most effective way to stop the same AI mistake from happening twice — more reliable than CLAUDE.md rules because it's grounded in what you've actually observed.

## Prompt

```
Read MISTAKES.md before starting any work this session.

MISTAKES.md is a log of patterns that have caused problems in this project before. Every item in it represents something that went wrong and cost time to fix. Treat every entry as a hard rule — not a suggestion.

---

If MISTAKES.md does not exist yet, create it now using this template:

---
# MISTAKES.md
*Patterns this AI has gotten wrong in this project. Updated after every incident.*

## Format
Each entry: what happened, what it should have done instead, and which files or areas it applies to.

---

## Mistakes Log

### [DATE] — [SHORT TITLE]
**What happened:** [Describe what the AI did wrong]
**What to do instead:** [The correct behavior]
**Applies to:** [Files, folders, or areas of the codebase]
**Trigger:** [What kind of prompt or task tends to cause this]

---
*Add new entries at the top. Never delete entries — they are a permanent record.*

---

After creating or reading MISTAKES.md: list every active mistake entry as a numbered reminder before we begin the session.

Going forward: when you finish a task that caused a problem or required a correction, add a new entry to MISTAKES.md automatically — do not wait for me to ask.
```
