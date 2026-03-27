# workflow-programming-by-prompt-idea-till-commit

## Syfte
Bygga en prompt som driver hela programming-by-prompt-kedjan fran ide till verifierad kodandring.

## Input
- Ide/problemformulering
- Kodbasens kontext
- Definition av klart (DoD)

## Instruktioner
1. Omvandla iden till en tydlig specifikation med scope-granser.
2. Bryt arbetet i sma exekverbara steg med verifiering efter varje steg.
3. Krav pa kodexempel, testforlag och kort implementationmotivering.
4. Tvinga edge-case-kontroll innan markering som klar.
5. Skapa commit-klar sammanfattning med vad/varfor/risk.
6. Ge nasta prompt for fortsatt iteration eller hardening.

## Output-format
- `Spec`
- `Step Plan`
- `Implementation Output`
- `Verification Notes`
- `Commit Draft`
- `Next Prompt`

## Kvalitetskriterier
- Tydlig progression utan scope creep
- Verifiering inbyggd i flodet
- Latt att oversatta till faktiska commits
- Stabil for flera iterationer

## Varianter
- Variant A: Enkel feature i en sprint
- Variant B: Komplex feature med flera delsteg och review-gates
