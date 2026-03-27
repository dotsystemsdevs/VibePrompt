# prompting-kontext-filreferenser-precis

## Syfte
Minska missforstand genom att tvinga explicit filkontext i varje koduppgift.

## Input
- Bugg eller feature
- Exakta filer/moduler
- Reproducering eller acceptanskrav

## Instruktioner
Kopiera prompten nedan:

```text
Use explicit file context for this task.

Task:
[insert task]

Relevant files:
[@fileA @fileB @fileC]

Requirements:
1) Explain how each referenced file is involved.
2) Make changes only where justified by context.
3) If another file is needed, state why before editing.

Output format:
[Context Map]
- file -> role

[Planned Changes]
- file -> change

[Execution]
...

[Verification]
- ...
```

## Output-format
- Context map
- Filspecifik andringsplan
- Exekvering + verifiering

## Kvalitetskriterier
- Exakt scopekontroll
- Farliga sidospår minskar
- Bättre precision i andringar

## Varianter
- Variant A: Buggfix.
- Variant B: Feature implementation.
