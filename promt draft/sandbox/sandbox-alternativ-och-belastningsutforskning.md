# sandbox-alternativ-och-belastningsutforskning

## Syfte
Utforska alternativ och stressa losningar innan implementation fastlasning.

## Input
- Problem
- Miljo/constraints
- Bedomningskriterier (latency, complexity, maintainability)

## Instruktioner
Kopiera prompten nedan:

```text
Explore alternatives in sandbox mode before implementation.

Problem:
[insert problem]

Tasks:
1) Propose 3 alternative approaches.
2) Compare trade-offs (complexity, performance, maintainability).
3) Simulate one failure scenario per approach.
4) Recommend one approach for current constraints.

Output format:
[Alternatives]
- Option 1:
- Option 2:
- Option 3:

[Trade-off Table]
| Option | Complexity | Performance | Maintainability | Risk |
|---|---|---|---|---|

[Failure Simulations]
- ...

[Recommendation]
...
```

## Output-format
- Tre alternativ
- Trade-off tabell
- Failure simulations + rekommendation

## Kvalitetskriterier
- Bättre designbeslut fore kod
- Synliga risker tidigt
- Mindre dyra omsvangar

## Varianter
- Variant A: Algorithm choice.
- Variant B: Architecture choice.
