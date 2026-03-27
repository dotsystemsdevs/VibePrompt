# workflow-claudemd-minimalistisk-styrfil

## Syfte
Skapa en kort och skarp styrfil for kodagenten i stallet for lang mikro-management.

## Input
- Repo-kontext
- Teamregler
- Kvalitetskrav

## Instruktioner
Kopiera prompten nedan:

```text
Create a minimalist CLAUDE.md-style instruction file for this repository.

Constraints:
- Keep it under 120 lines.
- Prefer principles over long step-by-step scripts.
- Optimize for autonomy with safety.

Must include:
1) Mission and non-goals
2) Coding standards (naming, tests, linting)
3) Change protocol (small diffs, verify before done)
4) Risk controls (security, secrets, destructive actions)
5) Definition of done
6) Escalation conditions (when the agent must ask)

Output format:
[CLAUDE.md Draft]
...

[Rationale]
- Why this stays short
- What complexity was intentionally excluded
```

## Output-format
- Kort styrfil
- Kort motiv till designen

## Kvalitetskriterier
- Hogsig naloch latt att folja
- Minskar babysitting
- Bevarar tydliga guardrails

## Varianter
- Variant A: Solo builder.
- Variant B: Team setup med reviewkrav.
