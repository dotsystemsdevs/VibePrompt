# workflow-verktygsval-prompting-uppgiftstyp

## Syfte
Valja ratt verktyg for prompting baserat pa uppgiftstyp och kontextbehov.

## Input
- Uppgiftstyp
- Krav pa filkontext
- Krav pa visuell feedback
- Krav pa autonom filupptackt

## Instruktioner
Kopiera prompten nedan:

```text
Recommend the best tool/workflow for this prompting task.

Task profile:
- Task type:
- Context depth needed:
- Visual iteration needed:
- File reference precision needed:

Compare:
- Cursor (explicit file-context workflows)
- Windsurf (deep context discovery)
- Bolt-like visual builder flows (instant visual feedback)

Output format:
[Tool Recommendation]
- Primary:
- Secondary:
- Why:

[How to Prompt in This Tool]
- Step 1:
- Step 2:
- Step 3:

[Risk Notes]
- ...
```

## Output-format
- Primart verktygsval
- Promptflode i vald miljo
- Risknoteringar

## Kvalitetskriterier
- Ratt verktyg till ratt uppgift
- Mindre friktion i execution
- Hoger precision i resultat

## Varianter
- Variant A: Code-heavy task.
- Variant B: UI-heavy task.
