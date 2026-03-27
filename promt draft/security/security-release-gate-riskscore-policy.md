# security-release-gate-riskscore-policy

## Syfte
Definiera release-gate baserat på säkerhetsscore, severity-fördelning och riskacceptans.

## Input
- Senaste scanresultat
- Teamets riskpolicy
- Deadline-tryck

## Instruktioner
Kopiera prompten nedan:

```text
Evaluate if this build can be released based on security posture.

Inputs:
- security score:
- critical/high/medium/low counts:
- fixed vs remaining findings:
- compensating controls:

Policy:
1) Critical findings block release.
2) High findings require explicit risk sign-off.
3) Medium/low can defer with documented remediation plan.

Output format:
[Release Decision]
- go/no-go:
- rationale:

[Blocking Issues]
- ...

[Required Actions Before Release]
- ...

[Deferred Risk Register]
- finding:
  - owner:
  - due date:
```

## Output-format
- Go/no-go beslut
- Blockers
- Deferred risk register

## Kvalitetskriterier
- Konsistent releasebeslut
- Tydlig ansvarsfördelning
- Mindre “ship now, regret later”

## Varianter
- Variant A: Startup fast-release.
- Variant B: Enterprise compliance-release.
