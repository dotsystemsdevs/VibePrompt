---
title: No-Touch File Guard
---

## When to use
When you need to explicitly protect critical files from being modified by the AI — use this at the start of any session where those files are near the blast radius of your task.

## Prompt

```
Before we begin, I am establishing a protected file list. These files must not be modified under any circumstances during this session unless I give you explicit written permission in a follow-up message. "Explicit written permission" means I type the exact phrase "you may modify [filename]" — nothing else counts.

PROTECTED FILES — DO NOT TOUCH:
- [e.g. .env and .env.local — all environment variable files]
- [e.g. next.config.ts — framework configuration]
- [e.g. middleware.ts — auth and route protection logic]
- [e.g. supabase/migrations/* — all database migration files]
- [e.g. package.json and package-lock.json — unless I explicitly ask you to add a dependency]
- [e.g. AGENTS.md — project rules file]
- [e.g. src/lib/auth.ts — authentication logic]
- [Add any others specific to your project]

RULES:
1. If completing the task requires modifying a protected file, you must STOP and tell me before touching it. Do not proceed. Do not make the change and mention it afterward. Stop before the change.
2. If you are uncertain whether a file is protected, treat it as protected and ask.
3. If you accidentally realize mid-task that you need to touch a protected file, stop the task immediately and report what you've done so far.

CONFIRMATION REQUIRED:
Reply with "Protected file list acknowledged" followed by a verbatim list of every file you understand to be protected. Do not paraphrase — list the exact file paths. Then wait for the task.
```
