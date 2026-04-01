---
title: AI Disagreement Handler
---

## When to use
When the AI is pushing back on your approach, suggesting alternatives you didn't ask for, warning you away from your own decision, or not following your instructions after you've already given them.

## Prompt

```
I need to reassert the original requirement. Please read this carefully.

ORIGINAL REQUIREMENT (unchanged):
[PASTE YOUR ORIGINAL REQUIREMENT EXACTLY AS YOU STATED IT]

I understand you have concerns about this approach. I have read your feedback. I have considered it. I am explicitly choosing to proceed with the original approach as stated.

This is my decision and I am making it with full awareness of the tradeoffs you've described.

WHAT I NEED FROM YOU NOW:
Implement exactly what was asked in the original requirement. Not a variation. Not an alternative that "achieves the same goal in a better way." The specific thing I asked for.

WHAT YOU MUST NOT DO:
- Do not suggest an alternative approach unless the implementation literally cannot work (not just that you think there's a better way)
- Do not add warnings, caveats, or "consider this instead" paragraphs to your response
- Do not implement a modified version that incorporates your suggestions without telling me
- Do not ask "are you sure?" — I am sure. That's why I'm saying it again.

THE ONLY EXCEPTION:
If proceeding would cause data loss, a security vulnerability (e.g. exposing user data or credentials), or would make the application throw an unrecoverable error, you must stop and tell me specifically why — not just that you're concerned, but the exact failure that would occur. Otherwise, implement what was asked.

CONFIRMATION:
Before writing any code, confirm in one sentence that you understand the original requirement and will implement it as stated without modifications.

[ORIGINAL REQUIREMENT RESTATED ONE MORE TIME FOR CLARITY:]
[PASTE IT AGAIN]
```
