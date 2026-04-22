---
title: Connect Frontend to Backend
---

## When to use
When you have a working frontend and a working backend but they aren't talking to each other — or when UI state isn't updating from server data, API calls are disconnected from components, or data fetched from the server never reaches the screen.

## Prompt

```
I need you to wire the frontend to the backend for this feature. Do not rewrite either side — only connect them.

Feature to connect: [DESCRIBE THE FEATURE]
Frontend location: [FILE/COMPONENT PATH]
Backend location: [API ROUTE / SERVER ACTION / ENDPOINT PATH]
What should happen: [USER ACTION → API CALL → UI UPDATE]

---

STEP 1 — Map the current data flow

Before writing any code, read both files and document:

Frontend side:
- What does the component currently show? (static data, mock data, nothing?)
- Where would the API call go? (useEffect, form submit, server component, etc.)
- What state or props would hold the response data?

Backend side:
- What does the endpoint return? (exact shape of the response)
- What does it expect as input? (method, body/params, auth headers needed?)
- What can go wrong? (error states, empty states)

Write this out before touching anything. Show me the map.

---

STEP 2 — Implement the connection

Wire them together following this order exactly:
1. Add the API call in the frontend (fetch/action/query)
2. Handle loading state
3. Handle error state  
4. Handle success — update the UI with real data
5. Remove any mock/static data that was previously hardcoded

---

STEP 3 — Verify end-to-end

Write a short checklist I can run manually to confirm the connection works:
- [ ] Action I take in the UI
- [ ] Network request I should see in DevTools (method, URL, payload)
- [ ] Response I should see (status, shape)
- [ ] UI change that confirms the data arrived

Rules:
- Do not rewrite the API — only call it as it exists
- Do not redesign the component — only add the data wiring
- If the API and frontend expect different data shapes, tell me before bridging them
- One feature connection per session — do not wire multiple things at once
```
