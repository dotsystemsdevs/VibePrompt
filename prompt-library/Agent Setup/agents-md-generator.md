---
title: AGENTS.md Generator
---

## When to use
Before starting any AI-assisted project, or when your AGENTS.md is missing, incomplete, or out of date with your actual stack.

## Prompt

```
Generate a complete AGENTS.md file for my project. Use the details below and fill in every section — no TBD, no placeholders left empty.

Project name: [PROJECT NAME]
Tech stack: [e.g. Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Clerk]
Database: [e.g. Postgres via Supabase]
Deployment: [e.g. Vercel]

The AGENTS.md must include all of the following sections:

1. PROJECT SUMMARY (3 sentences max)
What this product does, who it's for, and what problem it solves. No fluff.

2. TECH STACK
List every technology with its pinned version. Include frontend framework, UI library, database, ORM, auth provider, deployment, and test framework.

3. FOLDER STRUCTURE
Show the full directory tree with a one-line description of each folder. Flag any auto-generated folders that must never be manually edited.

4. NAMING CONVENTIONS
File naming, component naming, database table naming, environment variable naming. One rule per line.

5. PROTECTED FILES
Every file the AI must never modify without explicit written instruction. Include all config files, migration files, .env files, and any file containing auth logic.

6. CODING RULES (maximum 10 rules, one actionable sentence each)
Must include these four non-negotiable rules:
- Never create a file longer than 500 lines. If approaching the limit, refactor into modules.
- Never delete or overwrite existing code unless explicitly instructed to do so.
- Every new feature requires 3 tests: one expected-use case, one edge case, one failure case.
- Always update TASK.md after completing a task — mark it done with today's date.

7. TASK.MD PROTOCOL
Explain how TASK.md is maintained: check it before starting, add the task with today's date if not listed, mark it done immediately after completing, add a "Discovered During Work" section for tasks that surface mid-session.

8. MEMORY BANK
List any files in memory-bank/ that must be read before every session. Mark with @ prefix for files that are always required:
- @architecture.md — file map, always read
- @design-doc.md — PRD summary, always read
- progress.md — completed steps so far
- implementation-plan.md — ordered task list

9. CURRENT STATE
What is built and working. What is in progress. What has not been started. Keep this honest.

10. SESSION PROTOCOL
What the AI must do at the start of every session: read this file, read memory-bank/@architecture.md and memory-bank/@design-doc.md, summarize understanding, state what it will and won't touch.
What the AI must do before ending: list every file changed, confirm the task is complete, flag anything unresolved.

Output the full file as valid markdown I can save directly as AGENTS.md.
```
