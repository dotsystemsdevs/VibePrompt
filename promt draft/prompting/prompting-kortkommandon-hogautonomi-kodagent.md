# prompting-kortkommandon-hogautonomi-kodagent

## Syfte
Anvanda superkorta prompts som styr mot handling utan att overstyra implementationen.

## Input
- Uppgift eller buggrapport
- Kodkontext
- Kvalitetskrav

## Instruktioner
Kopiera prompten nedan:

```text
Use terse command prompts with strict completion standards.

Examples:
- "Fix." [paste bug report]
- "Grill me on these changes; no PR until I pass."
- "Knowing what you know now, scrap this and implement the elegant solution."

Execution rules:
1) Clarify scope in one line.
2) Execute independently.
3) Show evidence before claiming done.
4) If blocked, ask one focused question only.

Output format:
[Scope]
...

[Actions Taken]
...

[Proof]
- tests/checks
- before/after behavior

[Next Risk]
...
```

## Output-format
- Minimal styrning
- Tydlig handling + bevis
- Riskrad i slutet

## Kvalitetskriterier
- Hog autonomi utan kaos
- Mindre promptoverhead
- Stark done-definition

## Varianter
- Variant A: Debug incident.
- Variant B: Refactor/architecture reset.
