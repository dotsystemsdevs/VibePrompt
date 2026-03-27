# prompting-ai-generate-enhance-beskrivning-till-finalprompt

## Syfte
Bygga en prompt som tar en enkel beskrivning och levererar en stark slutprompt via generate + enhance-loop.

## Input
- Kort naturlig beskrivning av behovet
- Malmodell eller agenttyp
- Oonskat tonlage och constraints

## Instruktioner
1. Generera en forsta promptversion fran beskrivningen.
2. Granska svagheter: otydlighet, scope-glapp, saknade grindar.
3. Forbattra prompten i minst ett enhance-pass.
4. Jamfor fore/efter och motivera varfor nya versionen ar battre.
5. Leverera en slutlig copy-paste version plus kort variant.

## Output-format
- `Draft Prompt`
- `Weakness Scan`
- `Enhanced Prompt`
- `Before/After Diff`
- `Final Copy Prompt`

## Kvalitetskriterier
- Klar for direkt anvandning
- Tydligt mal, tydlig output, tydliga begransningar
- Minimal hallucinationsrisk genom precision
- Kort och lang variant for olika situationer

## Varianter
- Variant A: Snabb generate-only for enkla uppgifter
- Variant B: Full generate+enhance+contrast for kritiska uppgifter
