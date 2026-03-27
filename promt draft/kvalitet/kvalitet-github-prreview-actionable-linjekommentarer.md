# kvalitet-github-prreview-actionable-linjekommentarer

## Syfte
Gora skarpa PR-reviews med enbart actionabla, linjespecifika förbättringar.

## Input
- PR-nummer
- Repo-kontext
- Kodstandard

## Instruktioner
Kopiera prompten nedan:

```text
Review PR # [number] with an actionable-only policy.

Focus areas:
1) correctness
2) security
3) regressions
4) performance
5) test coverage
6) maintainability

Rules:
- No summary fluff.
- Provide concrete line-level suggestions.
- Prioritize critical findings first.

Output format:
[Critical Issues]
- file:
  - line:
  - issue:
  - fix suggestion:

[Important Suggestions]
- ...

[Minor Improvements]
- ...
```

## Output-format
- Severity-sorterade, actionabla findings

## Kvalitetskriterier
- Hoger signal i review
- Mindre brus
- Snabbare merge-kvalitet

## Varianter
- Variant A: Security-heavy PR.
- Variant B: Performance-heavy PR.
