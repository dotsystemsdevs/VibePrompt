---
title: Context Reset After Drift
---

## When to use
When an AI session has gone off-track, made unexpected changes, or the context has become stale after many messages — use this to stop the bleeding and re-anchor before continuing.

## Prompt

```
STOP. Do not write any more code. Do not continue the previous task. We need to reset.

Complete the following audit before we do anything else:

1. WHAT I ASKED FOR: Summarize in 2-3 sentences what the original task or goal of this session was, based on the conversation history. Quote the original request if you can.

2. WHAT YOU ACTUALLY DID: List every file you modified, created, or deleted during this session. For each file, write one sentence describing what you changed and why.

3. WHAT IS THE CURRENT STATE: Describe the current state of the codebase as best you can. What is working? What is broken or incomplete? What is in a half-finished state?

4. WHAT WAS NOT ASKED FOR: Identify anything you did that was not explicitly requested. Did you refactor code that wasn't part of the task? Install new packages? Modify files that were outside the stated scope? List these honestly.

5. WHAT THE ORIGINAL GOAL WAS: State what success was supposed to look like at the end of this session. Is that goal still achievable? Why or why not?

6. RE-ANCHOR TO AGENTS.md: Read AGENTS.md again now. Identify anything you did during this session that contradicts the rules, conventions, or protected file list in AGENTS.md.

After completing this audit, wait for my instructions. Do not propose next steps. Do not suggest fixes. Just present the audit and wait.
```
