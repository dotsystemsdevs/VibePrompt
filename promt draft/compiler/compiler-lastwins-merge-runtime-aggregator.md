# compiler-lastwins-merge-runtime-aggregator

## Syfte
Aggregera stage-artifacts till en aktuell körbar runtime med Last-Wins merge-strategi.

## Input
- Stage output paths
- Mergeordning
- Konfliktpolicy

## Instruktioner
Kopiera prompten nedan:

```text
Design a Last-Wins merge aggregator for staged compiler outputs.

Requirements:
1) Keep all stage outputs for git/history inspection.
2) Merge staged artifacts into a single "current" runtime directory.
3) Resolve conflicts by stage order (latest stage wins).
4) Emit merge report with overwritten files.

Output format:
[Merge Strategy]
...

[Conflict Resolution Rules]
...

[Current Runtime Contract]
- required files:
- optional files:

[Merge Report Format]
- file:
  - previous stage:
  - winning stage:
```

## Output-format
- Merge strategy
- Conflict rules
- Merge report format

## Kvalitetskriterier
- Spårbar runtime-evolution
- Förutsägbara konfliktlösningar
- Enkel rollback per stage

## Varianter
- Variant A: Code-only merge.
- Variant B: Code + tests + docs merge.
