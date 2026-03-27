# prompting-orealistiskt-mal-till-matbar-spec

## Syfte
Forvandla vaga/orealistiska mal till realistiska, matbara leveranskriterier.

## Input
- Ursprungligt mal
- Tidsram
- Resursniva
- Riskprofil

## Instruktioner
Kopiera prompten nedan:

```text
Translate this goal into a realistic, measurable spec.

Goal:
[insert goal]

Tasks:
1) Identify what is unrealistic or non-measurable.
2) Rewrite into SMART-style criteria.
3) Define acceptance tests.
4) Suggest a phased path (MVP -> improvement).

Output format:
[Unrealistic Parts]
- ...

[Measurable Spec]
- ...

[Acceptance Tests]
- ...

[Phased Path]
- MVP:
- Next:
- Later:
```

## Output-format
- Orealistiska delar markerade
- Matbar kravspec
- Acceptanstester + fasad plan

## Kvalitetskriterier
- Tydliga forvantningar
- Minskar missnöje och scope drift
- Latt att verifiera framsteg

## Varianter
- Variant A: Produktmal.
- Variant B: Teknikmal (prestanda, kvalitet, stabilitet).
