# workflow-vbw-effort-autonomy-matris-for-beslutsniva

## Syfte
Skapa en prompt som valjer ratt kombination av effort och autonomy per uppgift, sa att tempo och riskniva matchar verkligt behov.

## Input
- Uppgiftstyp (feature, fix, refactor, infra, incident)
- Riskniva (lag, medel, hog)
- Omgivning (prototyp, staging, produktion)

## Instruktioner
1. Klassificera uppgiften pa komplexitet och konsekvens.
2. Rekommendera effort-niva (turbo/fast/balanced/thorough) med motivering.
3. Rekommendera autonomy-niva (cautious/standard/confident/pure-vibe) med motivering.
4. Definiera vilka grindar som maste passeras (plan approval, QA, UAT).
5. Om vald kombination ar farlig for kontexten: foresla sakrare fallback.
6. Leverera en "go/no-go"-regel innan exekvering.

## Output-format
- `Task Classification`
- `Recommended Effort`
- `Recommended Autonomy`
- `Required Gates`
- `Go/No-Go Rule`

## Kvalitetskriterier
- Tydliga trade-offs mellan fart och sakerhet
- Konsekvent motivering
- Praktiskt anvandbar for dagliga beslut
- Enkel att operationalisera i teamrutiner

## Varianter
- Variant A: Solobygge med hog leveranstakt
- Variant B: Teamdrift med strikt riskkontroll
