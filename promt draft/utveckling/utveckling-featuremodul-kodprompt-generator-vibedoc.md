# utveckling-featuremodul-kodprompt-generator-vibedoc

## Syfte
Generera hogkvalitativa kodprompts per featuremodul sa implementation kan ske systematiskt.

## Input
- Modulnamn
- Kontext
- Krav
- Teknikstack
- Constraints

## Instruktioner
Kopiera prompten nedan:

```text
Create implementation-ready coding prompts for this feature module.

Feature:
[module name]

Context:
[where it lives in the product]

Requirements:
- [req 1]
- [req 2]

Tech Stack:
- [stack]

Constraints:
- [perf/security/platform constraints]

Expected Output from the coding model:
- [code artifacts required]

Generate:
1) Primary implementation prompt
2) Debug prompt for likely failures
3) Test-generation prompt (unit/integration)
4) Refactor/performance prompt

Output format:
[Implementation Prompt]
...

[Debug Prompt]
...

[Test Prompt]
...

[Refactor Prompt]
...
```

## Output-format
- 4-prompt paket per feature

## Kvalitetskriterier
- Hojer first-pass kvalitet
- Tacker livscykeln build->debug->test->refactor

## Varianter
- Variant A: Backend/API modul.
- Variant B: Frontend/UI modul.
