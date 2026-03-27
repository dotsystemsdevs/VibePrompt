# github-issuefixer-plan-create-test-pr

## Syfte
Losa GitHub-issues systematiskt via PLAN -> CREATE -> TEST -> PR.

## Input
- Issue-nummer
- Repo-kontext
- Testkommandon

## Instruktioner
Kopiera prompten nedan:

```text
Resolve GitHub issue # [number] with a structured workflow.

Workflow:
1) PLAN
 - read issue details
 - gather context
 - break into tasks
 - document approach

2) CREATE
 - create feature branch
 - implement in small commits
 - follow project conventions

3) TEST
 - run targeted tests
 - run full suite
 - report pass/fail evidence

4) OPEN PR
 - create PR with clear title/body
 - link issue (Fixes #...)
 - include test evidence

Output format:
[Plan]
...

[Implementation Log]
...

[Test Evidence]
...

[PR Draft]
...
```

## Output-format
- Plan till PR-utkast
- Testevidens
- Spårbar implementationlogg

## Kvalitetskriterier
- Minskar slarviga fixes
- Stark testdisciplin
- Tydlig reviewer-kontext i PR

## Varianter
- Variant A: Bug fix.
- Variant B: Enhancement issue.
