# prompting-rollprompt-abtest-cargocultcheck

## Syfte
Validera om rollprompting faktiskt hjalper i ett konkret case, i stallet for att anta att det alltid gor det.

## Input
- Samma uppgift
- Version A utan rollprompt
- Version B med roll+stakes
- Bedomningskriterier

## Instruktioner
Kopiera prompten nedan:

```text
Run an A/B prompt test on the same task.

Task:
[insert task]

Prompt A:
- neutral instruction, no role framing

Prompt B:
- includes role + stakes framing

Evaluate outputs on:
1) correctness
2) relevance
3) actionability
4) unnecessary constraints introduced

Return:
[A vs B Scorecard]
- Correctness:
- Relevance:
- Actionability:
- Constraint side-effects:

[Winner + Why]
...

[Recommendation]
- Use role framing for this task type? yes/no/conditional
```

## Output-format
- A/B-scorecard
- Vinnare med motivering
- Rekommendation per tasktyp

## Kvalitetskriterier
- Datadrivet val av promptstil
- Minskar cargo-cult-beteende
- Battr e precision i fortsatt prompting

## Varianter
- Variant A: Kodning/debug.
- Variant B: Strategi/skrivande.
