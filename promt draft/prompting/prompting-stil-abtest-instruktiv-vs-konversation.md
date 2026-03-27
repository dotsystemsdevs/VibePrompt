# prompting-stil-abtest-instruktiv-vs-konversation

## Syfte
Hitta vilken promptstil som fungerar bast for en given uppgift: instruktiv, konversationell eller exempelstyrd.

## Input
- Uppgift
- Onskat resultat
- Bedomningskriterier

## Instruktioner
Kopiera prompten nedan:

```text
Run an A/B/C style test for the same task.

Task:
[insert task]

Style A: Instructive
Style B: Conversational
Style C: Example-driven

Evaluate each output on:
1) correctness
2) clarity
3) actionability
4) token efficiency

Output format:
[Style Outputs]
- A:
- B:
- C:

[Scorecard]
- Correctness:
- Clarity:
- Actionability:
- Token efficiency:

[Winner]
- Best style:
- Why:
- Reusable template for this task type:
```

## Output-format
- Tre stilvarianter
- Scorecard
- Vinnande template for aterbruk

## Kvalitetskriterier
- Datadrivet stilval
- Mindre "prompting pa kansla"
- Hogre stabilitet mellan uppgifter

## Varianter
- Variant A: Coding implementation task.
- Variant B: Learning/explanation task.
