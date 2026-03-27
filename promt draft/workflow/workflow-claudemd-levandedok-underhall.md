# workflow-claudemd-levandedok-underhall

## Syfte
Behandla `CLAUDE.md` som en levande styrfil som uppdateras systematiskt av incidenter och framgangsmönster.

## Input
- Nuvarande CLAUDE.md
- Senaste misstag/fel/loopar
- Monster som fungerat bra

## Instruktioner
Kopiera prompten nedan:

```text
Maintain CLAUDE.md as a living document, not static rules.

Update policy:
1) When the model fails, add a prevention rule.
2) When a pattern succeeds repeatedly, codify it.
3) Keep rules concrete and testable.
4) Remove stale or conflicting rules monthly.

For each proposed CLAUDE.md change include:
- Trigger event
- Rule text
- Expected behavior change
- Verification signal

Output format:
[Proposed CLAUDE.md Updates]
- Trigger:
- Rule:
- Expected impact:
- Verify by:

[Conflicts or Redundancies]
- ...

[Prune Candidates]
- ...
```

## Output-format
- Kandidatuppdateringar med trigger och bevissignal
- Konfliktlista
- Pruning-kandidater

## Kvalitetskriterier
- Kort men skarp styrfil
- Fler forebyggande regler, mindre reaktiv fire-fighting
- Hogre precision i framtida prompts

## Varianter
- Variant A: Veckovis underhall.
- Variant B: Incidentdrivet underhall efter varje blockerare.
