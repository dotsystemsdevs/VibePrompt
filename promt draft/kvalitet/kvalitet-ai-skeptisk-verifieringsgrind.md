# kvalitet-ai-skeptisk-verifieringsgrind

## Syfte
Motverka overtro pa AI-output genom att krava verifieringsbevis innan forslag accepteras.

## Input
- AI-forslag/svar
- Kod eller faktaunderlag
- Risknivaa pa beslutet

## Instruktioner
Kopiera prompten nedan:

```text
Treat the previous AI output as a hypothesis, not truth.

Tasks:
1) Extract all major claims.
2) Classify each as:
   - Verified by evidence
   - Plausible
   - Unverified/high-risk
3) For unverified claims, provide the fastest validation test.
4) Block final recommendation until critical claims are validated.

Output format:
[Claim Register]
- Claim:
  - Status:
  - Evidence:
  - Validation test:

[Release Gate]
- Can proceed? yes/no
- Blocking reasons:

[Next Actions]
1) ...
2) ...
```

## Output-format
- Claimregister med status
- Release gate
- Nasta verifieringssteg

## Kvalitetskriterier
- Ingen blind tillit
- Snabb riskreducering
- Tydlig go/no-go signal

## Varianter
- Variant A: Kodbeslut.
- Variant B: Produkt/strategibeslut.
