# prompting-beteendefokus-mal-over-metod

## Syfte
Beskriva onskat beteende och upplevelse i stallet for att overstyra implementation i onodan.

## Input
- User outcome
- UX-forvantning
- Teknisk kontext

## Instruktioner
Kopiera prompten nedan:

```text
Design and implement for behavior first, not implementation micromanagement.

Goal:
[insert user-facing goal]

Context:
[insert stack/module info]

Behavior requirements:
- What should happen:
- Performance feel:
- Error behavior:

Tasks:
1) Propose the simplest implementation that achieves behavior.
2) Mention one alternative approach.
3) Implement preferred approach.

Output format:
[Behavior Spec]
- ...

[Implementation Choice]
- Selected:
- Alternative:
- Why selected:

[Implementation]
...

[Behavior Verification]
- ...
```

## Output-format
- Beteendespec
- Vald implementation med alternativ
- Verifiering mot malbeteende

## Kvalitetskriterier
- Starkare produktresultat
- Mindre overdetaljerad styrning
- Utrymme for battre tekniska val

## Varianter
- Variant A: UX-fokuserad uppgift.
- Variant B: API-beteende med SLA/latencykrav.
