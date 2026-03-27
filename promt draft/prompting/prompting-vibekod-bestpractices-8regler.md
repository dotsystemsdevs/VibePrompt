# prompting-vibekod-bestpractices-8regler

## Syfte
Skapa en universalprompt som tillampar de viktigaste vibe-coding-reglerna: specificitet, kontext, action verbs, format, exempel, langd, ton och iteration.

## Input
- Maluppgift
- Oonskat sprak/ramverk
- Eventuella constraints (prestanda, tidsram, stil)

## Instruktioner
1. Skriv en exakt uppgiftsbeskrivning med tydligt mal.
2. Lagg in kontext: stack, beroenden, miljo och begransningar.
3. Anvand action-verb for varje delmoment.
4. Definiera onskat output-format explicit.
5. Bifoga ett mini-exempel pa onskat beteende.
6. Satt langdgrans och tonalitet.
7. Krav pa sjalvkontroll: identifiera svaga punkter i svaret.
8. Ge en iterativ forbattringsversion om forsta svaret ar svagt.

## Output-format
- `Prompt v1`
- `Self-Check`
- `Refined Prompt v2`
- `Expected Output Shape`

## Kvalitetskriterier
- Hog precision i instruktioner
- Minimal tolkningsrisk
- Enkelt att iterera utan att borja om
- Ateranvandbar across flera uppgiftstyper

## Varianter
- Variant A: Kort "speed prompt" for vardagskodning
- Variant B: Full "high-control prompt" for kritiska leveranser
