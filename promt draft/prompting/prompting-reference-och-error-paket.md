# prompting-reference-och-error-paket

## Syfte
Fa mer exakta svar genom reference-driven stil och fullstandig error-kontext.

## Input
- Referenssnutt eller stilmall
- Felmeddelande/logg
- Kod som utloser felet

## Instruktioner
Kopiera prompten nedan:

```text
Use both reference and error context.

Reference style/code:
[paste reference snippet]

Error context:
- Error/log:
[paste]
- Triggering code:
[paste]

Tasks:
1) Reproduce likely failure path from provided context.
2) Propose fix aligned with reference style/patterns.
3) Explain why this fix matches both behavior and style.

Output format:
[Failure Path]
- ...

[Fix Proposal]
- ...

[Style Alignment Notes]
- ...

[Verification]
- ...
```

## Output-format
- Failure path
- Fix aligned med referensstil
- Verifieringssteg

## Kvalitetskriterier
- Mindre generiska fixar
- Bättre consistency mot kodbasens stil
- Snabbare felsokning med full kontext

## Varianter
- Variant A: Backend error context.
- Variant B: Frontend + API integration error.
