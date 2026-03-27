# workflow-regler-till-skills-och-docs-migrering

## Syfte
Minska overlast i `CLAUDE.md` genom att flytta regler till battre hem: skills, docs eller taskprompt.

## Input
- Nuvarande regler i CLAUDE.md
- Lista over skills och docs
- Vanliga tasktyper

## Instruktioner
Kopiera prompten nedan:

```text
Audit CLAUDE.md and migrate rules to the correct context layer.

Routing policy:
- Keep only universal project constraints in CLAUDE.md.
- Move repeatable workflows to skills.
- Move domain/feature details to docs/.
- Keep one-off constraints in task prompts.

Tasks:
1) Classify each rule by destination.
2) Produce migration diff summary.
3) Define ownership for future updates.

Output format:
[Rule Routing Table]
- Rule:
  - Current location:
  - Target location:
  - Reason:

[Migration Plan]
1) ...
2) ...
3) ...

[Ownership Model]
- CLAUDE.md owner:
- Skills owner:
- Docs owner:
```

## Output-format
- Routing-tabell for regler
- Migreringsplan
- Agarskapsmodell

## Kvalitetskriterier
- Mindre global context-bloat
- Bättre ateranvandning via skills
- Klarare ansvar over tid

## Varianter
- Variant A: Light migration (10 viktigaste reglerna).
- Variant B: Full migration av hela styrsystemet.
