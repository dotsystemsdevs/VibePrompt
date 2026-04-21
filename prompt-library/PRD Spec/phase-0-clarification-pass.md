---
title: Phase 0 Clarification Pass
---

## When to use
Before writing a single line of spec or code — force the AI to surface every ambiguous assumption. The most cited workflow unlock in the vibe coding community: half of all rewrite loops are caused by unknowns that a good question would have caught.

## Prompt

```
Before we plan or build anything, we are doing Phase 0.

Your job is to ask me every question that could cause problems if left unanswered. Read what I've given you below, then generate up to 20 clarifying questions — the ones that, if I answered them now, would prevent the most rework later.

What I want to build:
[PASTE YOUR IDEA, BRAIN DUMP, OR ROUGH DESCRIPTION HERE]

Rules for your questions:
- Ask only questions where my answer would actually change what you build
- Prioritize: edge cases, authentication/permissions, data ownership, error states, third-party dependencies, mobile vs desktop assumptions, and out-of-scope decisions I haven't made yet
- Do NOT ask questions you can reasonably infer from context
- Do NOT ask about styling preferences or naming conventions
- Do NOT ask multiple questions that are really the same question
- Group your questions by theme: User Flows, Data & State, Auth & Permissions, Integrations, Edge Cases, Out of Scope

After I answer, summarize what you've learned in 5 bullet points, flag any remaining open questions, and confirm you're ready to move to the PRD.
```
