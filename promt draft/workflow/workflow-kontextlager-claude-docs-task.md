# workflow-kontextlager-claude-docs-task

## Syfte
Bygga en tydlig 3-lagers kontextmodell sa agenten far ratt signal pa ratt niva.

## Input
- Projektets regler och mal
- Feature- eller domanspecifika monster
- Aktuell uppgift

## Instruktioner
Kopiera prompten nedan:

```text
Design and enforce a 3-layer context system for this AI coding workflow.

Layer 1 (Global): CLAUDE.md
- Shared architecture principles
- Coding conventions
- Non-negotiable safety constraints

Layer 2 (Feature): docs in relevant subdirectories
- Domain-specific patterns
- Feature constraints
- Local trade-offs

Layer 3 (Task): current prompt
- Exact goal
- Acceptance criteria
- Done checks

Tasks:
1) Define what belongs in each layer.
2) Detect misplaced rules and move them to the correct layer.
3) Produce a short checklist for validating layer hygiene weekly.

Output format:
[Layer Contract]
- Global:
- Feature:
- Task:

[Misplaced Rules]
- Rule:
  - Current place:
  - Correct place:
  - Why:

[Weekly Hygiene Checklist]
- ...
```

## Output-format
- Layer-kontrakt
- Flyttlista for felplacerade regler
- Veckochecklista for kontexthygien

## Kvalitetskriterier
- Mindre gissning av agenten
- Ratt detaljniva pa ratt plats
- Stabilare output over tid

## Varianter
- Variant A: Litet solo-projekt.
- Variant B: Stor monorepo med flera team.
