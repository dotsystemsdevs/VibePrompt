# workflow-stor-begaran-till-smastag-plan

## Syfte
Bryta ner overkomplexa one-shot prompts till en sekvens av leveransbara steg.

## Input
- Stor begaran (t.ex. "bygg fullstack app med allt")
- Tidsram
- Prioriteringar

## Instruktioner
Kopiera prompten nedan:

```text
This request is too large for one shot.
Decompose it into a staged implementation plan.

Request:
[insert big request]

Constraints:
- Time:
- Stack:
- Must-have features:
- Nice-to-have features:

Tasks:
1) Split into phases with clear boundaries.
2) Define deliverable and done criteria for each phase.
3) Identify dependencies and risks.
4) Start with the smallest shippable phase.

Output format:
[Phase Plan]
Phase 1 ...
Phase 2 ...

[Dependencies]
- ...

[Risks]
- ...

[Start Now]
- first smallest shippable change
```

## Output-format
- Fasindelad plan
- Beroenden och risker
- Konkret startpunkt

## Kvalitetskriterier
- Ingen one-shot overload
- Tidig leveransbar output
- Battr e kontroll pa scope

## Varianter
- Variant A: MVP app build.
- Variant B: Refactor/migration project.
