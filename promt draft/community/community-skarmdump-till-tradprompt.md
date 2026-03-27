# community-skarmdump-till-tradprompt

## Syfte
Omvandla skarmdumpad chatt/kommentartext till en strukturerad prompt som kan ateranvandas for nya inlagg och konversationer.

## Input
- OCR/text fran skarmdump
- Plattform
- Malresultat (engagemang, humor, support, diskussion)
- Onskad langd pa traden

## Instruktioner
Kopiera prompten nedan:

```text
You convert messy screenshot chat text into a reusable high-quality prompt.

Inputs:
- Raw screenshot text (OCR or pasted):
- Platform:
- Goal:
- Desired thread length:

Steps:
1) Extract key trigger, conflict, humor beats, and linguistic quirks.
2) Separate signal from noise (remove UI junk, duplicated text, timestamps if irrelevant).
3) Infer conversation archetype (support, roast, correction, meme escalation, etc.).
4) Build a reusable prompt that can generate similar but fresh threads.
5) Add control knobs (tone intensity, slang level, conflict level, civility level).

Return format:
<ExtractedInsights>
- Trigger:
- Emotional arc:
- Language markers:
- What made it engaging:
</ExtractedInsights>

<ReusablePrompt>
[Final copy-paste prompt to generate new threads with same vibe]
</ReusablePrompt>

<PromptControls>
- ToneIntensity: 1-5
- SlangDensity: 1-5
- MemeLevel: 1-5
- CivilityGuardrails: strict|balanced|loose
</PromptControls>
```

## Output-format
- Insight-extrakt
- Ateranvandbar masterprompt
- Justerbara reglage for stilnivå

## Kvalitetskriterier
- Rensar bort brus fran OCR/chatdump
- Bevarar vibe men undviker copy-paste-kansla
- Producerar tydlig prompt som ar enkel att ateranvanda
- Kontrollerbar ton och riskniva

## Varianter
- Variant A: "Brand safe" med hog civility och lag konflikt.
- Variant B: "Meme turbo" med hog energi men inga policybrott.
