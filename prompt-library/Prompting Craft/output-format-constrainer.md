---
title: Output Format Constrainer
---

## When to use
When AI responses are inconsistent, too long, padded with caveats, or not in the format you need — append these constraints to any prompt to lock the output shape.

## Prompt

```
I need you to follow strict output constraints for everything you produce in this session. Read and confirm each constraint before responding to any request.

OUTPUT FORMAT CONSTRAINTS — APPLY TO EVERY RESPONSE:

FORMAT: [Choose one and delete the others]
- Plain prose, no headers or bullets
- Numbered list only — no prose
- Bulleted list only — no prose
- JSON — valid, parseable, no trailing commas
- Markdown with headers and code blocks
- Code only — no explanation outside of comments in the code itself

MAXIMUM LENGTH: [Choose one]
- Maximum 100 words
- Maximum 5 bullet points or list items
- Maximum 20 lines of code per file shown
- Maximum 3 paragraphs
- One sentence only

WHAT TO ALWAYS INCLUDE:
- [e.g. File path at the top of every code block]
- [e.g. A one-line rationale for every decision]
- [e.g. The done condition restated at the end]

WHAT TO NEVER INCLUDE:
- No "Great question!" or any opener phrase — start with the answer
- No "I hope this helps" or closing pleasantry
- No alternative approaches unless I specifically ask for alternatives
- No caveats about what I should "consider" or "keep in mind" unless it is a security or data-loss risk
- No explanation of what the code does if the code is self-evident — only explain non-obvious decisions
- No suggestions to add features I didn't ask for
- No "Note that..." paragraphs at the end

CONFIRMATION REQUIRED:
Reply with "Output constraints acknowledged" and then list back the specific constraints I've set. Do not add any commentary. Then wait for my first request.

---

[OPTIONAL — append this to any existing prompt to add output constraints on the fly:]

APPEND TO YOUR EXISTING PROMPT:

Output format for this response only:
- Format: [JSON / numbered list / code only]
- Maximum length: [X lines / X words / X items]
- Do not include: [explanations / alternatives / caveats]
- Must include: [file path / rationale / done condition]
```
