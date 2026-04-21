---
title: Security Pre-Launch Audit
---

## When to use
Before your app goes live with real users or real data. AI-generated code has predictable security blind spots — this audit covers the ones that appear most often in vibe-coded apps.

## Prompt

```
Run a security audit on this codebase before launch. Work through every check below. Report PASS, FAIL, or NEEDS REVIEW for each item. Do not skip any check — if you cannot verify it, say so.

Tech stack: [YOUR STACK]
Auth provider: [CLERK / AUTH0 / SUPABASE AUTH / CUSTOM / NONE]
Database: [SUPABASE / POSTGRES / MYSQL / OTHER]
Handles payments: [YES / NO]
Stores user data: [YES / NO — describe what kind]

---

SECTION 1: SECRETS & CREDENTIALS
1.1 — Scan every file in the codebase for hardcoded API keys, tokens, passwords, or credentials. Any string matching: sk-, pk-, Bearer, _SECRET, _KEY, password=, DATABASE_URL with credentials, base64-encoded blobs in source.
1.2 — Verify .env is listed in .gitignore and has never been committed (check git history).
1.3 — Confirm all secret access is server-side only. No environment variables prefixed NEXT_PUBLIC_ should contain secrets.

SECTION 2: DATABASE SECURITY
2.1 — If using Supabase: verify Row Level Security (RLS) is ENABLED on every table that stores user data. List any table with RLS disabled.
2.2 — Verify RLS policies exist and are non-empty. "RLS enabled" with zero policies = no access to anyone, but the service_role key bypasses it entirely — check if service_role is used client-side.
2.3 — Confirm users can only read and modify their own data. Walk through the access pattern: authenticated user → their rows only.
2.4 — Check for any query that uses a user-supplied ID without verifying ownership (IDOR risk).

SECTION 3: INPUT VALIDATION
3.1 — Identify every form, API route, and server action that accepts user input. For each: confirm validation happens server-side, not only client-side.
3.2 — Check for any input that is inserted into a database query without parameterization.
3.3 — Check for any input that is rendered as HTML without escaping (XSS risk).

SECTION 4: AUTHENTICATION & AUTHORIZATION
4.1 — Verify every protected route checks authentication before rendering or returning data.
4.2 — Verify every API route and server action checks that the authenticated user is authorized for the specific resource — not just that they are logged in.
4.3 — Confirm auth tokens are not stored in localStorage (use httpOnly cookies instead).

SECTION 5: DEPENDENCIES
5.1 — Run npm audit (or equivalent) and list any high or critical vulnerabilities.
5.2 — List any packages that have not been updated in 12+ months and have known CVEs.

SECTION 6: HTTPS & TRANSPORT
6.1 — Confirm the app forces HTTPS in production.
6.2 — Confirm sensitive API calls are not made over HTTP anywhere.

---

FINAL REPORT:
List every FAIL and NEEDS REVIEW item with a specific fix recommendation.
Prioritize by risk: Critical → High → Medium.
Do not list PASS items in the final report.
```
