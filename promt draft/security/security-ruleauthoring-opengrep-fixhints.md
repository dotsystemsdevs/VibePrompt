# security-ruleauthoring-opengrep-fixhints

## Syfte
Utöka scannerskyddet med nya regler och matchande AI-fix hints för snabb remediation.

## Input
- Ny sårbarhetstyp
- Målspråk
- Detektionsmönster
- Fixstrategi

## Instruktioner
Kopiera prompten nedan:

```text
Create a new scanner rule + AI fix hint pair.

Inputs:
- vulnerability class:
- language:
- vulnerable pattern examples:
- safe replacement pattern:

Tasks:
1) Draft an Opengrep rule for detection.
2) Add validation checklist for rule quality.
3) Write corresponding AI fix hint template:
   - what is wrong
   - why it matters
   - exact fix pattern
   - verification step
4) Add test cases:
   - should match
   - should not match

Output format:
[Rule Draft]
...

[Fix Hint Template]
...

[Validation Plan]
...

[Test Cases]
...
```

## Output-format
- Rule draft
- AI fix hint
- Validering + testfall

## Kvalitetskriterier
- Färre falska positiva/negativa
- Hög remediation-kvalitet
- Snabb onboarding av nya vuln-klasser

## Varianter
- Variant A: Web app vulns.
- Variant B: Smart contract/web3 vulns.
