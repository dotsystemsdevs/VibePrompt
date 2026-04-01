---
title: One-Page PRD Generator
---

## When to use
When you need to write a PRD before starting to build with AI — this is the document your AGENTS.md will reference and your AI coding agent will read to understand scope.

## Prompt

```
Generate a tight one-page PRD for my product. Every section must be filled in — no TBD, no vague language. This document will be read by an AI coding agent, so precision matters more than polish.

Use this information to fill in the PRD:
- Product name: [PRODUCT NAME]
- What it does: [ONE SENTENCE]
- Who it's for: [DESCRIBE THE SPECIFIC USER]
- The core problem: [ONE SENTENCE]
- What you have in mind for the MVP: [ROUGH IDEA OF FEATURES]

Generate the PRD with these exact sections:

---

# PRD: [PRODUCT NAME]
Version: 1.0 | Date: [DATE]

## Target User
[One specific person, not a demographic. Describe their job, their workflow, the exact moment they encounter this problem. Example: "A solo developer who has just shipped their first side project and is manually checking analytics across 4 different tabs every morning."]

## Problem
[One sentence. No solution language. Quantify the pain if possible. See: problem-statement-sharpener prompt.]

## MVP Features
[Exactly 3-5 features. Each feature is one sentence describing user-observable behavior — not implementation details. Format: "User can [action] so that [outcome]."]
1.
2.
3.
4. (optional)
5. (optional)

## Out of Scope (MVP)
[Minimum 5 explicit exclusions. Be specific — name the features you are NOT building. This list prevents scope creep when the AI is building.]
- NOT building:
- NOT building:
- NOT building:
- NOT building:
- NOT building:

## Done Condition
[One testable statement that defines when the MVP is complete. It must be binary — either true or false. Example: "A new user can sign up, complete the core action, and see the result within 5 minutes, without any help from the founder."]

## Constraints
- Tech stack: [LIST YOUR STACK]
- Timeline: [TARGET DATE OR WEEK COUNT]
- Budget: [MAX SPEND ON INFRA/TOOLS]
- Must not require: [any dependency or approach that is off-limits]

## Success Metric
[One specific number that will tell you the MVP worked. Example: "10 users complete the core loop within 2 weeks of launch."]

---

After generating the PRD, flag any section where my input was too vague for the AI to work from. Tell me exactly what to clarify before handing this to a coding agent.
```
