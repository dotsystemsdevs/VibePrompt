---
title: Data Flow Diagram
---

## When to use
When your codebase has grown beyond a few files and you suspect drift, duplication, or architectural inconsistency. Visualizing the architecture surfaces issues that are invisible in the code — duplicate implementations, bypassed layers, orphaned endpoints, and broken data ownership.

## Prompt

```
Map the architecture of this codebase as it exists right now. Do not describe what it should be — only what it actually is.

Produce the following three diagrams. For each, create the output as a .drawio XML file I can open in draw.io. Name the files ARCHITECTURE.drawio, DATA-FLOW.drawio, and OWNERSHIP.drawio.

---

DIAGRAM 1 — ARCHITECTURE.drawio
System components and their relationships.
Include:
- Every major layer (client, server, database, external services, auth)
- Every external dependency (third-party APIs, auth providers, storage, payment processors)
- The direction of communication between each component
- Any component that appears to have no callers or be duplicated

---

DIAGRAM 2 — DATA-FLOW.drawio
How data moves through the system for the primary user action.
Primary action: [DESCRIBE THE MAIN THING A USER DOES — e.g. "user submits a form and sees the result"]
Include:
- Every step from user input to final output
- Every function, handler, or service the data passes through
- Where data is validated, transformed, or persisted
- Where the flow could fail and what happens

---

DIAGRAM 3 — OWNERSHIP.drawio
Who owns what data and who can access it.
Include:
- Every database table or collection
- Which user roles can read/write each table
- Where Row Level Security or equivalent policies are enforced
- Any table with missing or unclear ownership

---

After creating the diagrams, write a FINDINGS.md with:
1. Duplicate implementations — code that does the same thing in multiple places
2. Bypassed layers — data or logic that skips the expected path
3. Orphaned code — endpoints, functions, or services with no callers
4. Missing ownership — data accessible to users who shouldn't have it
5. Anything that surprised you

Be specific: name files, function names, and line numbers where possible.
```
