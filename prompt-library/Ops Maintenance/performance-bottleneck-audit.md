---
title: Performance Bottleneck Audit
---

## When to use
When pages are slow, API responses are lagging, users are reporting performance issues, or you're about to onboard significantly more users and want to find problems before they find you.

## Prompt

```
Audit the following code for performance bottlenecks. I need specific, actionable findings — not general advice about performance. For each issue found, give me the exact file and function, why it's a problem, and the specific fix.

Tech stack: [YOUR STACK]
Reported symptoms (if any): [e.g. "homepage takes 4 seconds to load," "API /api/prompts times out under load," "user reports sluggish scroll"]
Current scale: [e.g. "~500 users, ~200 requests/minute at peak"]

Code to audit:
[PASTE THE RELEVANT CODE — include database queries, API routes, and React components for the slow areas]

AUDIT CATEGORIES:

1. N+1 DATABASE QUERIES:
Identify any pattern where a query runs inside a loop, or where a list of records is fetched and then each record triggers an additional query. This is the single most common cause of slow APIs in small applications.
For each N+1 found: show the pattern, explain why it causes N queries instead of 1, and provide the fixed query that fetches everything in a single round trip.

2. MISSING DATABASE INDEXES:
Review every WHERE clause, ORDER BY clause, and JOIN condition in the queries. Identify any column that is filtered or sorted on but does not have an index.
For each missing index: name the table and column, explain how many rows a full table scan would touch at current scale, and provide the exact CREATE INDEX statement.

3. UNOPTIMIZED IMAGES:
Identify any <img> tags or Image components that are loading images without size constraints, without lazy loading, or in formats that haven't been optimized (uncompressed PNG where WebP would work).
For each finding: the component file, the specific element, and the fix.

4. BLOCKING OPERATIONS ON THE MAIN THREAD (frontend):
Identify any expensive synchronous operations in React component render paths — large array transformations, heavy regex, unfiltered .filter().map() chains on large datasets running on every render.
For each finding: the component, the operation, and whether it should be memoized, moved to a server component, or paginated.

5. MISSING PAGINATION:
Identify any API endpoint that returns a list without a LIMIT clause or pagination parameters. Any endpoint that returns an unbounded list is a future outage waiting to happen.
For each endpoint: the route, the query, and the pagination implementation to add.

6. UNNECESSARY RE-RENDERS (React):
Identify components that re-render when their props haven't changed. Look for: objects or arrays created inline in JSX (new reference on every render), missing useCallback on handlers passed to child components, missing useMemo on expensive derived values, context providers that re-render their entire tree on unrelated state changes.

7. LARGE BUNDLE SIZE:
Identify any import that brings in a large library when only a small part is needed: full lodash import, entire icon libraries imported by name, heavy libraries that have lighter alternatives.
For each: the import statement, the estimated bundle cost, and the tree-shakeable or lighter alternative.

OUTPUT: A prioritized list.
- CRITICAL (causing current slowness): Fix immediately
- HIGH (will cause slowness at 2x current scale): Fix this sprint
- LOW (good hygiene): Fix when in the area

End with: ESTIMATED IMPACT — if the top 3 critical issues were fixed, what improvement in response time or bundle size would you expect?
```
