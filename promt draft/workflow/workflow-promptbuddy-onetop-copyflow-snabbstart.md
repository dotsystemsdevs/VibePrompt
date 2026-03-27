# workflow-promptbuddy-onetop-copyflow-snabbstart

## Syfte
Skapa en prompt som optimerar ett flytande always-on-top arbetsflode dar prompts valjs och kopieras pa sekunder under aktiv kodning.

## Input
- Aktuell koduppgift
- Lista med favoritprompts
- Verktyg/IDE som anvands (Cursor, VS Code, Claude Code, etc.)

## Instruktioner
1. Prioritera de 3-5 mest relevanta prompts for uppgiften.
2. Ge en snabb ordning for anvandning: diagnos -> implementation -> verifiering.
3. Formulera copy-ready promptar i kort format utan utfyllnad.
4. Inkludera ett fallback-spor om forsta prompten inte ger onskat resultat.
5. Avsluta med nasta exakta prompt att kopiera direkt.

## Output-format
- `Task Context`
- `Top Prompt Picks`
- `Execution Order`
- `Fallback Prompt`
- `Copy Next`

## Kvalitetskriterier
- Snabb att anvanda i realtid
- Tydlig prioritering av prompts
- Ingen vaghet i nasta steg
- Hog signal, lag tokenbrus

## Varianter
- Variant A: Solo-bygg med max tempo
- Variant B: Teamflode med review-check efter varje prompt
