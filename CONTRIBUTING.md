# Contributing to VibePrompt

VibePrompt uses GitHub as the source of truth for public prompts. Every prompt is a Markdown file reviewed and merged by maintainers — just like code.

---

## The prompt format

Every prompt must follow the canonical format defined in [`prompt-library/TEMPLATE.md`](prompt-library/TEMPLATE.md).

### Required sections (in order)

| Section | Required | Purpose |
|---|---|---|
| Frontmatter (`title`) | Yes | Display title |
| Frontmatter (`source`) | If applicable | Credit original source |
| H1 title | Yes | Matches frontmatter title |
| One-line tagline | Yes | Shown on browse cards |
| `## When to use` | Yes | 2–4 concrete trigger conditions |
| `## Input` | Yes | One bullet per `[PLACEHOLDER]` in the prompt |
| `## Instructions` | Yes | The copy-paste prompt block |

### The Instructions block

The `## Instructions` section must contain **exactly one fenced code block** with the copy-paste prompt. This is what users copy. Everything outside the code block in this section is instructions *for the user*, not the prompt itself.

````
## Instructions
Copy the prompt below and fill in the [brackets]:

```
[YOUR ACTUAL PROMPT HERE]
```
````

**Placeholder rules:**
- Use `[UPPER_SNAKE_CASE]` for every variable — e.g., `[PRODUCT_NAME]`, `[TARGET_AUDIENCE]`
- Every placeholder must have a matching bullet point in `## Input`
- No placeholder should require knowledge the user can't reasonably have

---

## How to submit a prompt

1. Fork the repo
2. Copy `prompt-library/TEMPLATE.md` into the right category folder
3. Name the file with lowercase kebab-case: `my-prompt-name.md`
4. Fill in all required sections
5. Open a PR with the title: `Add: [prompt title]`

### Category folders

| Folder | Use for |
|---|---|
| `Research Validate/` | Validating ideas, finding competitors, kill criteria |
| `PRD Spec/` | Requirements, scope decisions, planning documents |
| `Architecture Stack/` | Stack choices, system design, API contracts |
| `Agent Setup/` | AGENTS.md, CLAUDE.md, memory, multi-agent patterns |
| `Build Ship/` | Feature implementation, UI, code generation |
| `Prompting Craft/` | Prompt techniques, output control, context engineering |
| `Testing Quality/` | Code review, security, testing, pre-merge checks |
| `Launch Growth/` | Distribution, positioning, launch execution |
| `Ops Maintenance/` | Reliability, monitoring, incident response, scaling |

---

## Quality bar

PRs will be rejected if:

- The `## Instructions` section has no code block (no copy-paste prompt)
- Placeholders in the prompt don't match the `## Input` section
- The prompt is vague ("help me build X") with no structure or output requirements
- The `## Output Format` says "a good response" or equivalent
- The prompt is a duplicate of an existing one

PRs will be accepted faster if:

- The prompt solves a specific, named pain (not a generic task)
- The Instructions block is self-contained — no external files needed to run it
- Variants cover a real lighter use case and a real heavier one
- You've tested it and included the model you used in the PR description

---

## Questions

Open an issue or start a discussion.
