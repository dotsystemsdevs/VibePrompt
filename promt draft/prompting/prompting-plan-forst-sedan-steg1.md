# prompting-plan-forst-sedan-steg1

## Syfte
For komplexa andringar: analysera beroenden, foresla plan, exekvera endast steg 1.

## Input
- Stor uppgift
- Berorda systemdelar
- Riskkrav

## Instruktioner
Kopiera prompten nedan:

```text
Handle this in plan-first mode.

Task:
[insert task]

Process:
1) Analyze dependencies and impact.
2) Propose a phased plan.
3) Execute ONLY phase 1.
4) Return evidence and gate to continue.

Output format:
[Dependency Analysis]
- ...

[Phased Plan]
Phase 1:
Phase 2:
Phase 3:

[Phase 1 Execution]
...

[Gate for Phase 2]
- pass criteria:
- remaining risks:
```

## Output-format
- Beroendeanalys
- Fasplan
- Exekverat steg 1 + gate

## Kvalitetskriterier
- Minskar stora misstag
- Bättre kontroll pa komplexa migrationer
- Tydlig stoppunkt mellan steg

## Varianter
- Variant A: Server component migration.
- Variant B: Databas/arkitekturbyte.
