# prompting-hardlimits-kortprecis

## Syfte
Fa korta, precisa svar genom explicita hard limits i stallet for vaga instruktioner.

## Input
- Onskad langd (meningar, bullets, ord)
- Prioriteringskriterium
- Malpublik

## Instruktioner
Kopiera prompten nedan:

```text
Answer with hard limits:
- Max 3 sentences total
- Exactly 5 bullet points
- Max 12 words per bullet

Topic:
[insert topic]

Rules:
- No intro sentence.
- No repetition.
- Highest-impact points first.
```

## Output-format
- Hard-limited svar enligt satta regler

## Kvalitetskriterier
- Forutsagbar langd
- Hog signal
- Mindre promptfriktion i iterationer

## Varianter
- Variant A: Exec summary (3 bullets).
- Variant B: Tech brief (7 bullets + 1 riskrad).
