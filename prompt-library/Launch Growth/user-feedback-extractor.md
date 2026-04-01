---
title: User Feedback Extractor
---

## When to use
After collecting user feedback from surveys, interviews, support emails, or social posts — extract the signal from the noise before deciding what to build next.

## Prompt

```
Analyze the following user feedback and extract actionable product signal. Your job is to separate what users say they want from what problem they actually have, and to tell me what to build — not just what was requested.

Source of feedback: [e.g. user interviews, support emails, Twitter mentions, in-app survey]
Number of responses: [HOW MANY USERS THIS COVERS]
Context: [e.g. "These are responses from users who churned in the first week" or "power users who have been active for 30+ days"]

Feedback to analyze:
[PASTE ALL FEEDBACK HERE — raw quotes, emails, survey responses, etc.]

Step 1 — SEPARATE REQUEST FROM PROBLEM:
For each distinct piece of feedback, identify:
- STATED REQUEST: What the user literally asked for
- UNDERLYING PROBLEM: The real frustration or unmet need behind the request
These are almost always different. A user who says "I want a dark mode" usually has a problem with eye strain during long sessions, not a preference for aesthetics.

Step 2 — GROUP BY THEME:
Cluster all feedback into themes. A theme is a shared underlying problem, not a shared feature request. Name each theme by the problem, not the solution. Example: "Hard to find previously saved items" not "Needs better search."

For each theme:
- THEME NAME: [the problem being described]
- USER QUOTES: 2-3 verbatim quotes that represent this theme
- FREQUENCY: How many distinct users mentioned this (exact count if possible, approximate if not)
- SEVERITY: Is this a deal-breaker that causes churn, a friction point that degrades experience, or a nice-to-have?

Step 3 — RANK THEMES:
Sort all themes by a combined score of frequency × severity. The top-ranked theme is the one to address first.

Step 4 — PRODUCT RECOMMENDATIONS:
For the top 3 themes, suggest one specific product change that addresses the root cause, not the stated request. Format:

THEME: [NAME]
ROOT CAUSE: [What's actually going wrong]
RECOMMENDED CHANGE: [Specific, implementable change — not "improve the UX" but "add a persistent search bar to the sidebar that queries all saved items in real time"]
WHAT NOT TO BUILD: [The surface-level request that would not actually solve the root cause]
SUCCESS SIGNAL: [How you'd know this change fixed the problem — what user behavior would change]

Step 5 — WHAT TO IGNORE:
List any feedback that represents a one-off request, a personal preference, or a request that contradicts the product's core direction. Explain why each item is noise rather than signal.
```
