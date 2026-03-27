# workflow-iterativ-promptkedja-shipping

## Syfte
Bygga features via korta, sekventiella prompts i stallet for en stor one-shot.

## Input
- Featuremal
- Scopegranser
- Klar-definition

## Instruktioner
Kopiera prompten nedan:

```text
Implement this feature iteratively in small prompts.

Feature:
[insert feature]

Prompt chain:
1) Scaffold minimal UI/structure.
2) Add data/API integration.
3) Apply styling/design system alignment.
4) Add tests and edge-case handling.

Rules:
- Complete one stage before next.
- Verify each stage with a short checklist.
- Stop and report if stage fails.

Output format:
[Current Stage]
- ...

[Changes]
- ...

[Stage Verify]
- ...

[Next Stage]
- ...
```

## Output-format
- Stagebaserad exekvering
- Verifiering per steg
- Tydligt nasta steg

## Kvalitetskriterier
- Hogre leveranstempo med kontroll
- Mindre regressionsrisk
- Lat att backa vid fel

## Varianter
- Variant A: UI feature.
- Variant B: API feature.
