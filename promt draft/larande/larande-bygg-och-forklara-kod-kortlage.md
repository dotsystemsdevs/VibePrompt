# larande-bygg-och-forklara-kod-kortlage

## Syfte
Behalla larandet utan att branna for mycket tokens genom korta, hogsignal-forklaringar.

## Input
- Uppgift
- Kodkontext
- Tidsbudget/tokenbudget (valfritt)

## Instruktioner
Kopiera prompten nedan:

```text
Implement [task] and explain briefly so I can learn without long outputs.

Compression rules:
- Keep explanations short (max 3 bullets per step).
- Focus on "what changed" and "why it matters".
- Skip generic best-practice lectures.
- Use code references instead of long prose.

Required output:
<Step>
- Change:
- Why:
- Verify:
</Step>

Repeat only for meaningful steps.
```

## Output-format
- Kompakt stegformat
- Fokus pa andring, motiv, verifiering

## Kvalitetskriterier
- Hog signal, lag brus
- Larande kvarstar trots kort format
- Snabbt att lasa och validera

## Varianter
- Variant A: Ultra-kort (1 bullet per del).
- Variant B: Standard-kort (3 bullets per del).
