# workflow-nychatt-handoff-kontinuitet

## Syfte
Behalla fart och kvalitet nar man maste starta ny chatt/session mitt i utvecklingen.

## Input
- Vad som redan fungerar
- Vad som ar trasigt/aterstar
- Berorda filer

## Instruktioner
Kopiera prompten nedan:

```text
We are continuing work from a previous session.

Project status:
- What is done:
- What works:
- What is broken:
- Next target:
- Relevant files:

Your tasks:
1) Restate current state in 5 bullets max.
2) Confirm next smallest shippable change.
3) Implement only that change.
4) Return verification steps and remaining risks.

Output format:
[State Recap]
- ...

[Next Change]
- ...

[Verification]
- ...

[Remaining Risks]
- ...
```

## Output-format
- Kort state recap
- Nasta minsta leveransbara steg
- Verifiering + risklista

## Kvalitetskriterier
- Mindre context loss mellan sessioner
- Fortsatt fokus pa små leveranser
- Snabbare restart

## Varianter
- Variant A: Solo rapid mode.
- Variant B: Team handoff mode.
