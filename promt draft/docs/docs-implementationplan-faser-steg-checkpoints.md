# docs-implementationplan-faser-steg-checkpoints

## Syfte
Skapa exakt byggordning i små testbara steg (1.1, 1.2, 2.1...) för förutsägbar leverans.

## Input
- PRD
- APP_FLOW
- TECH_STACK
- FRONTEND/BACKEND-guides

## Instruktioner
Kopiera prompten nedan:

```text
Create IMPLEMENTATION_PLAN.md with numbered build sequence.

Inputs:
- PRD summary:
- Key flows:
- Stack:

Plan rules:
1) Organize by phases (foundation, design system, backend, integration, QA, release)
2) Break every phase into small steps (e.g., 1.1, 1.2, 2.1)
3) For each step include:
   - duration estimate
   - goal
   - tasks
   - success criteria
   - dependencies
   - test checkpoint
4) Include staging deploy checkpoints at milestone boundaries

Output format:
[IMPLEMENTATION_PLAN]
...
```

## Output-format
- IMPLEMENTATION_PLAN.md med stegsekvens och checkpoints

## Kvalitetskriterier
- Ingen oklar byggordning
- Kontinuerlig validering
- Snabb upptäckt av blockerare

## Varianter
- Variant A: Solo sprint plan.
- Variant B: Team parallel tracks plan.
