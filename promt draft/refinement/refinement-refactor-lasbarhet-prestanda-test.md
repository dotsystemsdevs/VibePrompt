# refinement-refactor-lasbarhet-prestanda-test

## Syfte
Forbattra existerande kod med fokus pa lasbarhet, testbarhet och prestanda utan beteendebrott.

## Input
- Kodblock eller fil
- Flaskhals/problem
- Icke-funktionella krav

## Instruktioner
Kopiera prompten nedan:

```text
Refine this code without changing intended behavior.

Code:
[paste code]

Tasks:
1) Improve readability and structure.
2) Increase testability (smaller units, clearer boundaries).
3) Suggest one performance improvement.
4) Provide before/after rationale.

Constraints:
- Preserve behavior unless explicitly noted.
- Keep changes incremental.

Output format:
[Refactor Plan]
- ...

[Refined Code]
...

[Behavior Safety Notes]
- ...

[Tests to Add]
- ...
```

## Output-format
- Refactorplan
- Forbattrad kod
- Safety notes + testforslag

## Kvalitetskriterier
- Tydligare kod med samma beteende
- Battr e underhallbarhet
- Enkla verifieringssteg

## Varianter
- Variant A: Readability-first.
- Variant B: Performance-first.
