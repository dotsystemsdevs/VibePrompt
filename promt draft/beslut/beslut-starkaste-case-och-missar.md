# beslut-starkaste-case-och-missar

## Syfte
Ta battre beslut genom att fa starkaste argument for varje alternativ och tydliggora vad folk oftast missar.

## Input
- Beslutet (X)
- Tillgangliga alternativ
- Begransningar (tid, budget, risk)

## Instruktioner
Kopiera prompten nedan:

```text
I need to decide [X].
Give me the strongest case for each option, then tell me what most people miss in this decision.

Constraints:
- Context: [insert]
- Time horizon: [insert]
- Risk tolerance: [low/medium/high]

Output format:
[Option Map]
- Option A: strongest case
- Option B: strongest case
- Option C: strongest case

[What Most People Miss]
- ...

[Decision Heuristic]
- If [condition], choose ...
- If [condition], choose ...

[First Step After Decision]
- ...
```

## Output-format
- Stalman for varje alternativ
- Missade fallgropar
- Enkel beslutsheuristik

## Kvalitetskriterier
- Rattvis jamforelse
- Praktisk beslutslogik
- Minskar bias och tunnelseende

## Varianter
- Variant A: Personliga beslut.
- Variant B: Team-/affarsbeslut med riskmatris.
