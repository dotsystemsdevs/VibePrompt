# security-repo-scan-till-fix-orchestrator

## Syfte
Kora ett komplett security-flode: scan -> triage -> fix -> verify -> sammanfattning.

## Input
- Repo-URL
- Kritikalitetsgrans (vilka severities som maste fixas)
- Tech stack

## Instruktioner
Kopiera prompten nedan:

```text
Run a full security remediation workflow for this repository.

Repository:
[insert GitHub repo URL]

Goals:
- Find vulnerabilities
- Prioritize by severity
- Fix systematically
- Verify no regressions

Workflow:
1) Run security scan(s)
2) Summarize findings by severity (critical/high/medium/low)
3) Build a task list grouped by vulnerability class
4) Fix issues one by one, highest severity first
5) Verify each fix with tests/checks
6) Produce final remediation report

Output format:
[Scan Summary]
- ...

[Task List]
- ...

[Fix Log]
- issue:
  - fix:
  - verification:

[Final Report]
- resolved:
- remaining risks:
- next actions:
```

## Output-format
- Scan-sammanfattning
- Prioriterad fixlista
- Verifierad fixlogg + slutrapport

## Kvalitetskriterier
- Severity-driven arbete
- Spårbar fixhistorik
- Bevisad förbättring före avslut

## Varianter
- Variant A: Fast triage (critical/high only).
- Variant B: Full hardening (all severities).
