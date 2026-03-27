# analys-githistorik-featurefix-forhallande

## Syfte
Mata om arbetsflodet faktiskt skalar genom att analysera commit-historik, feature/fix-ratio och stabilitet over tid.

## Input
- Git-logg
- Tidsperiod
- Kategoriseringsregler (feature/fix/refactor/docs/config)

## Instruktioner
Kopiera prompten nedan:

```text
Analyze repository history to evaluate AI-assisted development quality.

Tasks:
1) Classify commits into: feature, fix, refactor, docs, config.
2) Compute:
   - feature-to-fix ratio
   - average files touched per commit
   - net LOC trend per week
   - bug-fix frequency trend
3) Highlight scaling signals and warning signals.
4) Recommend 3 process changes based on the data.

Output format:
[Metrics]
- Feature/Fix ratio:
- Avg files/commit:
- Weekly LOC trend:
- Fix frequency trend:

[Interpretation]
- Scaling signals:
- Risk signals:

[Recommended Changes]
1) ...
2) ...
3) ...
```

## Output-format
- KPI-sammanstallning
- Tolkning av signaler
- Datadrivna processforandringar

## Kvalitetskriterier
- Objektiv uppfoljning av arbetssatt
- Tidig varning for kvalitetsdrift
- Beslutsstod for iterering av agentregler

## Varianter
- Variant A: Solo builder.
- Variant B: Team med sprint- och releaseuppfoljning.
