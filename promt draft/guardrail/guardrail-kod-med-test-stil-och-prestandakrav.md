# guardrail-kod-med-test-stil-och-prestandakrav

## Syfte
Satta inbyggda kvalitetsgrindar direkt i prompten for att minska regressionsrisk.

## Input
- Uppgift
- Sprakversion
- Stilregler
- Prestandamal

## Instruktioner
Kopiera prompten nedan:

```text
Generate code with strict guardrails.

Task:
[insert task]

Guardrails:
1) Include unit tests for 3 edge cases.
2) Follow style guide: [insert style guide]
3) List external dependencies and why needed.
4) Ensure compatibility with: [runtime/version]
5) Keep algorithmic complexity at or below: [target]

Output format:
[Implementation]
...

[Tests]
...

[Dependency Notes]
- ...

[Complexity Note]
- ...
```

## Output-format
- Implementation med inbyggda krav
- Tester
- Dependencies + complexity note

## Kvalitetskriterier
- Kvalitet byggs in fran start
- Fewer hidden regressions
- Bättre deploy-beredskap

## Varianter
- Variant A: Conservative guardrails.
- Variant B: High-performance guardrails.
