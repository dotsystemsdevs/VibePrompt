# prompting-natlangtillkod-kontraktsmall

## Syfte
Skapa en kontraktsbaserad promptmall for natural-language-to-code dar krav, gransen och output ar explicit definierade.

## Input
- Problemformulering i naturligt sprak
- Malplattform/sprak
- Begransningar (prestanda, bibliotek, testnivaa)

## Instruktioner
1. Oversatt naturligt sprak till formella krav i punktform.
2. Definiera non-goals for att minska scope creep.
3. Satt exakt outputkontrakt: filer, funktioner, testfall, format.
4. Krav pa antagandelogg innan implementation.
5. Lagg in verifieringsblock med pass/fail-kriterier.
6. Begar rework-plan om kriterier inte uppfylls.

## Output-format
- `Requirements Contract`
- `Non-Goals`
- `Implementation Contract`
- `Assumptions Log`
- `Verification Contract`
- `Rework Plan`

## Kvalitetskriterier
- Tydlig kravtolkning
- Hog spaarbarhet mellan text och kod
- Mindre risk for hallucinerad implementation
- Klar att anvanda i CI-vanliga floden

## Varianter
- Variant A: En funktion, en fil, ett test
- Variant B: Flerfilsfeature med integrationstest och docs
