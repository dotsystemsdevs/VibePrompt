---
title: Database Schema Review
---

## When to use
Before running any migrations or writing database queries — catch schema problems now when they cost nothing, not after you have production data.

## Prompt

```
Review the following database schema before I run any migrations. I need you to act as a critical database reviewer — not as a helper who approves whatever I've written. Find real problems.

My database: [e.g. Postgres via Supabase]
ORM / migration tool: [e.g. Drizzle ORM, Prisma, raw SQL]
Expected query patterns: [Describe the most common queries — e.g. "fetch all prompts by user, sorted by created_at" or "look up a user's subscription status on every page load"]

Schema to review:
[PASTE YOUR SCHEMA HERE — table definitions, column types, constraints, indexes]

Review for the following categories of problems. For each issue found, state: the table and column it affects, why it's a problem, and the specific fix:

1. MISSING INDEXES: Check every foreign key column — is it indexed? Check every column that appears in a WHERE clause based on my stated query patterns — is it indexed? Missing indexes on high-traffic queries will cause full table scans at scale.

2. NULLABLE COLUMNS THAT SHOULD HAVE DEFAULTS: Identify columns that are nullable but logically should always have a value. Nullable columns that shouldn't be nullable cause null-check bugs throughout the codebase. Suggest the appropriate default.

3. CASCADE RULES: Review all foreign key relationships. What happens when a parent record is deleted — does the child row orphan, cascade delete, or set null? For each relationship, state whether the current cascade rule is correct for this application's needs.

4. NAMING CONVENTION CONSISTENCY: Are table names consistent (plural vs singular)? Are column names consistent (snake_case vs camelCase)? Are boolean columns named with is_ or has_ prefixes? Flag every inconsistency.

5. DATA TYPE CORRECTNESS: Are UUIDs stored as uuid type (not varchar)? Are timestamps stored as timestamptz (not timestamp without timezone)? Are monetary values stored as integer cents (not float)? Flag any type that will cause bugs.

6. MISSING CONSTRAINTS: Are there columns that should have unique constraints but don't? Are there columns with value ranges that should be enforced with check constraints? Are there required relationships that should be foreign keys but are stored as plain IDs?

7. ROW LEVEL SECURITY (if using Supabase): Are RLS policies defined for every table? Does every table that stores user data have a policy that restricts access to the owning user? Flag any table with no RLS policy.

8. SOFT DELETE PATTERN: If any table uses a deleted_at or is_deleted column, are there indexes on this column? Are queries written to filter deleted rows efficiently?

Output a prioritized issue list:
- CRITICAL: Will cause data loss, security vulnerability, or production outage
- HIGH: Will cause bugs or performance problems at scale
- LOW: Inconsistency or style issue — fix before launch but not urgent

End with: SCHEMA VERDICT — READY TO MIGRATE, NEEDS FIXES, or DO NOT MIGRATE YET.
```
