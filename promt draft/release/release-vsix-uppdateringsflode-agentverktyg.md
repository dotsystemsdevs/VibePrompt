# release-vsix-uppdateringsflode-agentverktyg

## Syfte
Skapa en release-prompt for extensioner/agentverktyg dar uppdateringar, kompatibilitet och regressionsrisk kontrolleras innan distribution.

## Input
- Nuvarande version och planerad ny version
- Andringslista (features, fixes, breaking changes)
- Malmiljoer (VS-versioner, arkitektur, providerkombinationer)

## Instruktioner
1. Sammanfatta vad som andras och vem som paverkas.
2. Definiera testmatris for kritiska floden (start, providerbyte, filbilagor, diff).
3. Identifiera hognivarisken for regression och lagg in checkpunkter.
4. Skriv release notes i tydliga, anvandarnara punkter.
5. Ge rollback-strategi om uppdatering skapar driftproblem.
6. Avsluta med go/no-go-bedomning.

## Output-format
- `Release Scope`
- `Compatibility Matrix`
- `Regression Checklist`
- `Release Notes Draft`
- `Rollback Plan`
- `Go / No-Go`

## Kvalitetskriterier
- Klar och verifierbar releasebeskrivning
- Riskdrivna tester fore "happy path"-tester
- Tydlig rollback utan tvetydighet
- Begripligt for bade utvecklare och slutanvandare

## Varianter
- Variant A: Snabb patchrelease med minimalt blast radius
- Variant B: Stor funktionsrelease med stegvis utrullning
