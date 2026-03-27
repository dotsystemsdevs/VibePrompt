# prompting-steelman-motargumentstest

## Syfte
Stress-testa svar innan beslut genom att framtvinga starkaste motargument.

## Input
- Ursprungligt svar eller plan
- Beslutskontext
- Risktolerans

## Instruktioner
Kopiera prompten nedan:

```text
Critique the previous answer as strongly and fairly as possible.

Tasks:
1) Steelman the best counter-argument.
2) Identify hidden assumptions and weak evidence.
3) List scenarios where the original answer fails.
4) Propose a revised recommendation after critique.

Output format:
[Best Counter-Argument]
...

[Weak Assumptions]
- ...

[Failure Scenarios]
- ...

[Revised Recommendation]
...
```

## Output-format
- Stark motposition
- Svaga antaganden
- Reviderad rekommendation

## Kvalitetskriterier
- Avslojar blind spots tidigt
- Battre beslutskvalitet
- Mindre overconfidence

## Varianter
- Variant A: Produktbeslut.
- Variant B: Arkitektur- eller incidentbeslut.
