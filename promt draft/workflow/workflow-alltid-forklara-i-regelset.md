# workflow-alltid-forklara-i-regelset

## Syfte
Gora "forklara medan du kodar" till en permanent regel i arbetsflodet, sa man slipper skriva det manuellt varje gang.

## Input
- Vald kodassistent
- Regelplats (system prompt, rules, context-fil)
- Onskad detaljniva (kort/normal)

## Instruktioner
Kopiera prompten nedan:

```text
Create a persistent coding assistant rule:
"When implementing code changes, always include a short explanation of what changed, why, and how to verify."

Rule requirements:
1) Keep explanations concise by default.
2) Expand only when user asks for deeper teaching mode.
3) Include a verification checklist after changes.
4) If uncertain, state uncertainty and suggest a validation step.

Return:
- Final rule text (copy-paste ready)
- Short version (token-saving)
- Deep-learning version
```

## Output-format
- Regeltext i tre versioner
- Direkt copy-paste till assistant-regler

## Kvalitetskriterier
- Konsekvent larande i varje session
- Mindre manuell promptfriktion
- Tokenmedveten standardniva

## Varianter
- Variant A: Solo builder (mycket kort regeltext).
- Variant B: Teamregel (inkluderar kodgranskningskrav och verifieringsstandard).
