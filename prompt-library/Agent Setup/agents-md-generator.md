---
title: AGENTS.md Generator
---

## When to use
Before starting any AI-assisted project, or when your current AGENTS.md is missing, incomplete, or out of date with your actual stack.

## Prompt

```
Generate a complete AGENTS.md file for my project. Use the details below and fill in every section — no TBD, no placeholders left empty.

Project name: [PROJECT NAME]
Tech stack: [TECH STACK — e.g. Next.js 15, TypeScript, Tailwind, Supabase, Clerk]
Database: [DATABASE — e.g. Postgres via Supabase]
Deployment target: [e.g. Vercel]
Primary language: TypeScript

The AGENTS.md must include the following sections:

1. PROJECT SUMMARY (3 sentences max): What this product does, who it's for, and what problem it solves. No fluff.

2. TECH STACK: List every technology with its pinned version. Include frontend framework, UI library, database, ORM, auth provider, deployment, and testing framework.

3. FOLDER STRUCTURE: Show the full directory tree with a one-line description of what belongs in each folder. Flag any folders that are auto-generated and should never be manually edited.

4. NAMING CONVENTIONS: File naming (kebab-case, PascalCase, etc.), component naming, database table naming, environment variable naming. One rule per line.

5. PROTECTED FILES: List every file the AI must never modify without explicit written instruction from the user. Include: all config files, migration files, environment files, and any file containing auth logic.

6. CODING RULES: Maximum 10 rules. Each rule must be a single actionable sentence. Examples: "Never use any. Always type explicitly." "Never install a new package without user approval." "Never modify a file outside the stated task scope."

7. CURRENT STATE: What is built and working. What is in progress. What has not been started. Keep this honest and up to date.

8. SESSION PROTOCOL: What the AI must do at the start of every session (read this file, summarize understanding, state what it will and won't do). What the AI must do before ending a session (list files changed, confirm task is complete, flag anything unresolved).

Output the full file as a valid markdown document I can save directly as AGENTS.md.
```
