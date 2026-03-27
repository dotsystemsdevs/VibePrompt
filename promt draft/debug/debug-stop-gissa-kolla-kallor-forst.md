# debug-stop-gissa-kolla-kallor-forst

## Syfte
Stoppa AI-loopar med gissningar genom att tvinga verktygsdriven verifiering innan fixforslag.

## Input
- Felmeddelande/logg
- Relevanta filer
- Reproduceringssteg

## Instruktioner
Kopiera prompten nedan:

```text
STOP guessing. Verify first.

Task:
[insert bug report]

Rules:
1) Do not propose a fix before gathering evidence.
2) Show what was checked (files, logs, commands, docs).
3) List top 2 hypotheses only after evidence review.
4) Propose minimal fix for most likely hypothesis.
5) Provide proof checks before declaring resolved.

Output format:
[Evidence Collected]
- ...

[Hypotheses]
1) ...
2) ...

[Minimal Fix]
- ...

[Proof Checklist]
- [ ] Repro no longer fails
- [ ] No regression in related flow
```

## Output-format
- Evidenslogg
- Hypoteser
- Minimal fix + bevischecklista

## Kvalitetskriterier
- Mindre hallucinerad felsokning
- Snabbare verklig rotorsak
- Falska "fixed" minskar

## Varianter
- Variant A: Frontend issue.
- Variant B: API/backend issue.
