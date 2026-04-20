# Prompt Playbook

39 prompts organized by workflow stage — from environment setup to post-launch iteration. Every prompt supports real shipping workflows, not just ideation.

## Categories

| Folder | Site label | What it covers |
|---|---|---|
| `Agent Setup/` | Context | AGENTS.md, CLAUDE.md, memory banks, session kickoff protocols |
| `Research Validate/` | Research | Demand validation, kill criteria, competitive landscape |
| `PRD Spec/` | PRD | Requirements, acceptance criteria, context engineering blueprints |
| `Architecture Stack/` | Stack | Stack decisions, system boundaries, implementation strategy |
| `Build Ship/` | Build | Atomic tasks, plan mode, commit loops, diffs |
| `Prompting Craft/` | Prompting | Prompt chains, output control, disagreement handling |
| `Testing Quality/` | Quality | Code review, security audits, pre-ship gates |
| `Launch Growth/` | Ship | Distribution plans, positioning, user feedback |
| `Ops Maintenance/` | Iterate | Cost reviews, incident runbooks, dependency checks |

## Prompt Format

Every prompt file uses this structure:

```markdown
---
title: Prompt Title
---

## When to use
One or two sentences on the exact situation this prompt is for.

## Prompt

\```
The prompt text. Use [BRACKETS] for placeholders the user fills in.
\```
```

## Quality Standard

A good prompt:
- Has a single clear use case (one job, one output)
- Uses `[BRACKETS]` for every variable the user needs to fill in
- Works without modification for its stated use case
- Includes `ultrathink` or explicit reasoning triggers where it matters

## Contributing a Prompt

1. Pick the right folder (check the table above)
2. Create a kebab-case `.md` file: `my-prompt-name.md`
3. Follow the format above exactly
4. Open a PR with prefix: `prompt(category): add prompt-name`
