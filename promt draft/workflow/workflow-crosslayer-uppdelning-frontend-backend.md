# workflow-crosslayer-uppdelning-frontend-backend

## Syfte
Undvika "fix everything everywhere" genom att dela upp cross-layer jobb i kontrollerade steg.

## Input
- Ursprunglig broad request
- Berorda lager (frontend/backend/db)
- Acceptanskriterier

## Instruktioner
Kopiera prompten nedan:

```text
Do not execute cross-layer changes in one pass.
Split this request into sequential layers:

Request:
[insert request]

Layers:
1) Backend/domain changes
2) API contract updates
3) Frontend integration
4) End-to-end verification

For each layer:
- scope
- exact changes
- tests/checks
- rollback note

Output format:
[Layer Plan]
Layer 1 ...
Layer 2 ...

[Current Layer Execution]
...

[Gate to Next Layer]
- pass/fail criteria
```

## Output-format
- Lagerplan
- Tydlig gate mellan stegen
- Mindre regressionsrisk

## Kvalitetskriterier
- Ingen okontrollerad cross-layer drift
- Lattare felsokning
- Forutsagbar integration

## Varianter
- Variant A: FE+BE.
- Variant B: FE+BE+DB migration.
