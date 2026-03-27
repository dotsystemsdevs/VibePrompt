# prompting-roll-och-insats-scenariostyrning

## Syfte
Forbattra kvaliteten genom att ge modellen tydlig roll, scenario och konsekvensniva.

## Input
- Roll (t.ex. incident lead, staff engineer, legal reviewer)
- Scenario
- Insats/stakes (vad riskeras om fel beslut tas)
- Mal

## Instruktioner
Kopiera prompten nedan:

```text
Act in this context:
- Role: [role]
- Scenario: [situation]
- Stakes: [what is at risk]
- Goal: [desired outcome]

Produce guidance that is:
1) practical under the stated constraints
2) prioritized by risk and urgency
3) explicit about assumptions

Output format:
[Priority Actions]
1) ...
2) ...
3) ...

[Assumptions]
- ...

[Failure Modes]
- ...

[Next Checkpoint]
- what to verify in 15-30 minutes
```

## Output-format
- Prioriterade atgarder
- Antaganden
- Failure modes + nasta checkpoint

## Kvalitetskriterier
- Scenarioanpassat svar
- Battre prioritering under press
- Tydlig riskhantering

## Varianter
- Variant A: Incident response.
- Variant B: Produktstrategi med affarsrisk.
