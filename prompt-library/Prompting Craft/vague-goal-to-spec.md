---
title: Vague Goal to Spec
---

## When to use
When you have a fuzzy idea and need to turn it into a prompt precise enough for an AI coding agent to execute without guessing — before writing any task prompts.

## Prompt

```
I have a vague goal that I want to turn into a precise, executable prompt for an AI coding agent. Help me sharpen it by asking the right questions and then writing the refined prompt.

My vague goal: "[PASTE YOUR VAGUE GOAL HERE — e.g. 'add a search feature' or 'make the dashboard better' or 'let users save things']"

Step 1 — INTERROGATE THE GOAL:
Ask me each of the following questions. Wait for my answers before proceeding to Step 2.

1. What is the EXACT INPUT? What does the user provide, type, click, or upload to trigger this? Be specific — a text string, a file, a button click on a specific element.

2. What is the EXACT EXPECTED OUTPUT? What does the user see, receive, or get as a result? Describe the output precisely — a list of items, a redirect to a URL, a confirmation message, a file download.

3. Where does this happen? Which page, route, or component? If it's a new page, what is the URL path?

4. What data is involved? What reads from or writes to the database? Which tables and columns?

5. What are the CONSTRAINTS? What must this NOT do? What existing behavior must it not break? Are there files it must not touch?

6. What is the DONE CONDITION? How will you know, by looking at the running app, that this is complete and correct?

7. What is EXPLICITLY OUT OF SCOPE for this task? Name 2-3 things that might seem related but should not be built as part of this.

Step 2 — WRITE THE REFINED PROMPT:
After I answer all 7 questions, synthesize my answers into a precise, executable task prompt using this structure:

- TASK: [One sentence]
- WHAT TO BUILD: [2-4 sentences with exact behavior]
- FILES TO TOUCH: [Exact file paths]
- FILES NOT TO TOUCH: [Exact file paths]
- DONE CONDITION: [One testable sentence]
- CONSTRAINTS: [Bulleted list]

The refined prompt must be specific enough that an AI coding agent could implement it correctly with no follow-up questions.
```
