# kvalitet-hardgates-antimonster-incidentexempel

## Syfte
Harda upp agentens kvalitet med explicita gates, anti-monster och konkreta incidentexempel.

## Input
- Bygg/test/lint-kommandon
- Kanda haverityper
- Projektets riskzoner

## Instruktioner
Kopiera prompten nedan:

```text
Convert vague agent instructions into enforceable quality controls.

Create:
1) Hard Gates (must pass before done)
2) Anti-Patterns (explicitly forbidden)
3) Incident Examples (real failure -> prevention rule)

Requirements:
- Gates must be binary and machine-checkable.
- Anti-patterns must be concrete, not philosophical.
- Incidents must include trigger and future guard.

Output format:
[Hard Gates]
- Gate:
  - Pass condition:
  - Fail action:

[Anti-Patterns]
- Never do:
  - Why harmful:
  - Safer alternative:

[Incident Library]
- Incident:
  - What happened:
  - Prevention rule:
  - Detection check:
```

## Output-format
- Binara hard gates
- Anti-monsterlista
- Incidentbibliotek med prevention

## Kvalitetskriterier
- Farre falska "done"
- Mindre regressionsrisk
- Hogre forutsagbarhet i leverans

## Varianter
- Variant A: Webapp-team.
- Variant B: API/backendsystem med hogre driftrisk.
