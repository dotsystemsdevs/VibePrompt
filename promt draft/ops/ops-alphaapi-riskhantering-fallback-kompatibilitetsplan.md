# ops-alphaapi-riskhantering-fallback-kompatibilitetsplan

## Syfte
Skapa en prompt som hanterar riskerna med alpha/experimentella API:er genom fallback-logik, feature flags och tydlig rollback-plan.

## Input
- Experimentell API-funktionalitet
- Kritiska beroenden i appen
- Krav pa tillganglighet/stabilitet

## Instruktioner
1. Identifiera vilka funktioner som beror pa alpha-API.
2. Klassificera riskniva per funktion (låg/medel/hög).
3. Designa fallback-beteende nar API-funktion saknas eller bryts.
4. Lagg in feature flags for snabb av/på kontroll.
5. Definiera monitorering och feltrösklar for rollback.
6. Leverera en kommunikationsplan for anvandare vid degraderat lage.

## Output-format
- `Alpha Dependency Map`
- `Risk Matrix`
- `Fallback Behavior`
- `Feature Flag Plan`
- `Rollback Criteria`
- `User Communication Notes`

## Kvalitetskriterier
- Tydlig driftbarhet trots experimentell stack
- Snabb rollback utan panikfixar
- Anvandaren far begriplig status
- Latt att underhalla over API-andringar

## Varianter
- Variant A: Demo-first med accepterad instabilitet
- Variant B: Production-lean med strikt degradation policy
