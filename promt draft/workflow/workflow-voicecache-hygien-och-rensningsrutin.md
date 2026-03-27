# workflow-voicecache-hygien-och-rensningsrutin

## Syfte
Hålla voice-to-prompt systemet stabilt via cache-inspektion, kontrollerad rensning och återställningsplan.

## Input
- Cache-status
- Diskutrymme
- Modellproblem (korrupt cache, lång startup, misslyckad download)

## Instruktioner
Kopiera prompten nedan:

```text
Create a cache hygiene and cleanup workflow for voice coding tools.

Tasks:
1) Inspect cache health and size.
2) Classify cleanup urgency (low/medium/high).
3) Propose safe cleanup sequence:
   - info only
   - confirmed cleanup
   - force cleanup (last resort)
4) Add recovery steps after cleanup.

Output format:
[Cache Health]
- ...

[Cleanup Plan]
1) ...
2) ...

[Recovery Steps]
- ...

[Prevention Routine]
- weekly:
- monthly:
```

## Output-format
- Hälsorapport
- Rensningsplan
- Recovery + preventionsrutin

## Kvalitetskriterier
- Mindre driftstopp från cacheproblem
- Förutsägbar startup/prestanda
- Säker cleanup utan onödiga risker

## Varianter
- Variant A: Conservative cleanup.
- Variant B: Aggressive cleanup under low disk pressure.
