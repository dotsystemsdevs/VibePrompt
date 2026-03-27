# ops-live-diff-overvakning-aikodning-i-realtid

## Syfte
Bygga en prompt for realtidsgranskning av AI-genererade kodandringar via diff-flode, sa att risker upptacks tidigt.

## Input
- Andrade filer i arbetsytan
- Baseline (git eller annan jamforelsepunkt)
- Nuvarande uppgift/mal

## Instruktioner
1. Overvaka andringar kontinuerligt och gruppera efter filtyp och risk.
2. Markera nya filer, modifierade filer och potentiellt farliga mönster.
3. Prioritera granskning av auth, config, migration och buildrelaterat.
4. Ge korta review-kommentarer med konkret atgard per fynd.
5. Om stora andringar sker snabbt: foresla stoppunkt och mini-qa.
6. Ge en "safe to continue?"-signal efter varje granskningsrunda.

## Output-format
- `Change Summary`
- `Risk Hotspots`
- `Review Comments`
- `Mini QA Gate`
- `Continue / Pause Decision`

## Kvalitetskriterier
- Snabb feedback utan att blockera momentum
- Fokus pa regressionsrisk
- Tydlig koppling till mal/scope
- Praktisk for manuell uppfoljning

## Varianter
- Variant A: Aggressiv granskningsniva for kritiska brancher
- Variant B: Latt granskningsniva for snabb prototypiteration
