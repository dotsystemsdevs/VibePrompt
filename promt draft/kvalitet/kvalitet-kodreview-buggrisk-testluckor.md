# kvalitet-kodreview-buggrisk-testluckor

## Syfte
Fa hogsignal kodreview som prioriterar buggar, regressionsrisk och saknade tester framfor ytlig stilkommentar.

## Input
- Diff eller kodblock
- Berord modul
- Kritiska flows

## Instruktioner
Kopiera prompten nedan:

```text
Review this code with a production-risk mindset.

Priority order:
1) correctness bugs
2) security risks
3) behavioral regressions
4) performance traps
5) maintainability issues
6) missing tests

Rules:
- Cite concrete evidence for each finding.
- Rank findings by severity.
- If no high-severity findings, say so explicitly.
- End with a focused test plan.

Output format:
[Findings]
- Severity:
  - Issue:
  - Evidence:
  - Suggested fix:

[Open Questions]
- ...

[Test Plan]
- ...
```

## Output-format
- Severity-rankade findings
- Oppna fragor
- Koncis testplan

## Kvalitetskriterier
- Fokus pa verklig risk
- Tydlig evidens
- Actionbar feedback

## Varianter
- Variant A: PR review.
- Variant B: Incident-hotfix review.
