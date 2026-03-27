# larande-ai-forklaring-faktakontroll

## Syfte
Minska risken att lara in fel nar AI forklarar kod, genom inbyggd faktakontroll och verifieringssteg.

## Input
- Kodandring eller forklaring fran AI
- Projektets docs/kallor (om finns)
- Onskad niva pa bevis (snabb/strikt)

## Instruktioner
Kopiera prompten nedan:

```text
Before I trust your explanation, verify it against code behavior.

Tasks:
1) For each major claim, attach evidence:
   - code location
   - runtime behavior expectation
   - any uncertainty
2) Mark each claim as:
   - Verified
   - Plausible but unverified
   - Uncertain
3) Provide a quick test/check for each unverified claim.
4) If docs are relevant, cite what should be checked in official docs.

Output format:
<ClaimsAudit>
- Claim:
  - Status:
  - Evidence:
  - Verification step:
</ClaimsAudit>

<DoNotAssume>
- [things that might sound true but are not confirmed]
</DoNotAssume>
```

## Output-format
- Claim-audit med status
- Konkreta verifieringssteg
- Tydlig osakerhetsmarkering

## Kvalitetskriterier
- Inga blinda antaganden
- Latt att upptacka hallucinationer
- Forstarker korrekt inlarning

## Varianter
- Variant A: Snabbkontroll (bara topp 3 claim-risker).
- Variant B: Strikt kontroll (alla claims krav pa evidens).
