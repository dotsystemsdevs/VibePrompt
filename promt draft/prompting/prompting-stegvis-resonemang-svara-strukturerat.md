# prompting-stegvis-resonemang-svara-strukturerat

## Syfte
Fa battre svar pa komplexa uppgifter genom att modellen arbetar metodiskt innan den levererar ett tydligt slutsvar.

## Input
- Problem eller fraga
- Kontext och begransningar
- Onskat beslutskriterium

## Instruktioner
Kopiera prompten nedan:

```text
Solve this carefully before answering.

Task:
[insert task]

Constraints:
[insert constraints]

Instructions:
1) Analyze the problem methodically.
2) Evaluate at least two plausible approaches.
3) Select the best approach based on constraints.
4) Return only:
   - Final answer
   - Brief rationale (3 bullets max)
   - Risks/unknowns

Output format:
[Final Answer]
...

[Brief Rationale]
- ...
- ...
- ...

[Risks or Unknowns]
- ...
```

## Output-format
- Slutsvar
- Kort motivering
- Risker/osakerheter

## Kvalitetskriterier
- Mindre impulsiva svar
- Tydlig beslutslinje
- Kort och anvandbar redovisning

## Varianter
- Variant A: Beslutsmode (jamfor 2-3 alternativ med trade-offs).
- Variant B: Debugmode (visa sannolikaste rotorsak + verifiering).
