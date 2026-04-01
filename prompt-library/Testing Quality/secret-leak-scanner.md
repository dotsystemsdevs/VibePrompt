---
title: Secret Leak Scanner
---

## When to use
Before any commit that involves API integrations, environment configuration, auth logic, or any file that has touched credentials — make this a non-negotiable step.

## Prompt

```
Scan the following code diff for leaked secrets, credentials, and sensitive configuration. Be thorough and paranoid — false positives are fine, false negatives are not.

Diff or files to scan:
[PASTE THE GIT DIFF OR FILE CONTENTS HERE]

Scan for every item in the following list. For each category, report every match with the exact file name, line number, and the matched string (redacted after the first 4 characters if it looks real):

PATTERN CATEGORIES TO SCAN:

1. API KEYS AND TOKENS:
   - Strings starting with: sk-, pk-, rk-, ak-, tok_, api_, key_
   - Strings matching patterns: [A-Za-z0-9]{32,} (long random strings that look like tokens)
   - Authorization headers with Bearer tokens hardcoded
   - Strings containing "API_KEY" or "API_SECRET" as variable values (not names)

2. PASSWORDS AND SECRETS:
   - Variables named password, passwd, pwd, secret, private_key assigned a non-empty string literal
   - Any string that looks like a password (mixed case, numbers, special chars, 8+ chars) assigned to a variable
   - JWT secrets hardcoded as string literals

3. DATABASE CONNECTION STRINGS:
   - postgresql://, mysql://, mongodb://, redis:// URLs with credentials embedded
   - Any connection string containing a username:password@ pattern

4. CLOUD CREDENTIALS:
   - AWS access key patterns: AKIA[A-Z0-9]{16}
   - GCP service account JSON fragments
   - Azure connection strings

5. PRIVATE URLS AND INTERNAL ENDPOINTS:
   - Internal service URLs with credentials in query params (?key=, ?token=, ?secret=)
   - Supabase URLs paired with service role keys (not anon keys — service role keys have full access)

6. ENVIRONMENT VARIABLE VALUES HARDCODED:
   - Any place where process.env.SOME_SECRET is replaced with a hardcoded string
   - Any .env file contents pasted into source code

7. COMMENTS CONTAINING CREDENTIALS:
   - Commented-out code that contains any of the above patterns
   - TODO comments referencing credentials: "// TODO: move this key to env"

OUTPUT FORMAT:
For each finding:
FINDING [N]:
- Category: [which category above]
- File: [filename]
- Line: [line number]
- Pattern matched: [describe what matched without exposing the full value]
- Risk level: CRITICAL (real credential) / WARNING (looks like a credential but may be a placeholder) / INFO (pattern match but likely benign)
- Recommended fix: [move to env var / remove entirely / replace with placeholder]

If nothing is found:
SCAN RESULT: CLEAN — no secrets or credentials detected in the provided diff.

Do not give me a summary without the details. If you find anything, I need the exact location.
```
