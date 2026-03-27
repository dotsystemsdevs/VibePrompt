# debugging-edgecase-simuleringspaket

## Syfte
Felsoka robust med edge cases och scenariobaserad simulering i stallet for enbart snabb patch.

## Input
- Kod
- Felmeddelande
- Reproduceringssteg
- Forvantat vs faktiskt beteende

## Instruktioner
Kopiera prompten nedan:

```text
Debug this systematically and include edge-case simulation.

Inputs:
- Code:
- Error:
- Repro steps:
- Expected:
- Actual:

Tasks:
1) Explain likely root cause.
2) Simulate 3 edge cases and expected outcomes.
3) Provide minimal fix first.
4) Add one hardening improvement.

Output format:
[Root Cause]
...

[Edge Case Simulation]
1) ...
2) ...
3) ...

[Minimal Fix]
...

[Hardening]
...
```

## Output-format
- Rotorsak
- Edge-case simulering
- Minimal fix + hardening

## Kvalitetskriterier
- Mindre patch-and-pray
- Fler upptackta svagheter tidigt
- Stabilare fixar

## Varianter
- Variant A: UI bug.
- Variant B: Data/API bug.
