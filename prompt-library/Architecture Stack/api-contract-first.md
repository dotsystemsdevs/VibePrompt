---
title: API Contract First
---

## When to use
Before implementing any backend endpoint or frontend data fetch — define the contract first so frontend and backend can be built in parallel without integration surprises.

## Prompt

```
Before writing any implementation code, define the API contract for the following feature. No code will be written until this contract is reviewed and explicitly approved.

Feature: [DESCRIBE THE FEATURE THAT REQUIRES THIS API]
Who calls this API: [e.g. the React frontend, a webhook handler, a cron job]
Auth context: [e.g. Clerk authenticated user, public endpoint, service-to-service]

For each endpoint required by this feature, define the following. Be precise — this is a contract, not a sketch.

---

ENDPOINT: [NUMBER]

Method: [GET / POST / PUT / PATCH / DELETE]
Path: [e.g. /api/prompts/:id]
Auth required: [Yes / No / Optional — and what happens if missing]
Rate limited: [Yes / No — and what the limit is]

Request:
- Path params: [name: type — description, or "none"]
- Query params: [name: type — description, or "none"]
- Body: [JSON schema of the request body, or "none for GET"]
  ```json
  {
    "field": "type — description, required/optional"
  }
  ```

Response (success):
- Status code: [e.g. 200, 201]
- Body:
  ```json
  {
    "field": "type — description"
  }
  ```

Error cases:
| Status | Condition | Response body |
|--------|-----------|---------------|
| 400    | [condition] | { "error": "[message]" } |
| 401    | [condition] | { "error": "[message]" } |
| 404    | [condition] | { "error": "[message]" } |
| 500    | [condition] | { "error": "[message]" } |

Side effects: [What else happens when this endpoint is called — DB writes, emails sent, cache invalidated, events emitted]

---

[Repeat for each endpoint]

After defining all endpoints:

1. CONSISTENCY CHECK: Are naming conventions consistent across all endpoints? Do they follow the conventions in AGENTS.md?

2. MISSING ENDPOINTS: Are there any operations implied by the feature that don't have an endpoint defined yet?

3. FRONTEND CONTRACT: For each endpoint, specify what the frontend component that calls it needs to know — the exact fetch call signature, how to handle loading state, how to handle each error case.

Do not write any implementation code. Output the contract only. I will review and approve before any code is written.
```
