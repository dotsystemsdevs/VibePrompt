# prompting-vibekod-work-vs-avoid-audit

## Syfte
Bedoma om en prompt sannolikt fungerar eller faller platt, och skriva om den till en hogsignal-version.

## Input
- Ursprunglig prompt
- Onskat resultat
- Teknikstack (om känd)

## Instruktioner
Kopiera prompten nedan:

```text
Audit this prompt and classify it as:
- Likely to work
- Risky
- Likely to fail

Prompt:
[insert prompt]

Task:
1) Explain why the prompt falls in that class.
2) Identify missing context (language/framework, constraints, I/O examples, success criteria).
3) Rewrite it into a stronger version.
4) Provide one short variant and one detailed variant.

Output format:
[Classification]
...

[Why]
- ...

[Missing Context]
- ...

[Rewritten Prompt - Short]
...

[Rewritten Prompt - Detailed]
...
```

## Output-format
- Klassificering av promptkvalitet
- Gap-analys
- Omskriven prompt i tva versioner

## Kvalitetskriterier
- Tydlig skillnad mellan svag/stark prompt
- Praktisk omskrivning, inte teori
- Direkt anvandbar i nasta steg

## Varianter
- Variant A: Coding tasks.
- Variant B: Learning/explainer tasks.
