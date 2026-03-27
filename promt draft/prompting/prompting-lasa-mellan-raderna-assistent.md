# prompting-lasa-mellan-raderna-assistent

## Syfte
Fa mer hjalpsamma svar dar modellen inte bara besvarar ordagrant, utan ocksa pekar ut vad anvandaren sannolikt egentligen behov er.

## Input
- Fraga eller uppgift
- Kontext (om finns)
- Mal (vad du vill uppna)

## Instruktioner
Kopiera prompten nedan:

```text
Answer what I asked, then also tell me what I probably need but did not ask explicitly.

Rules:
1) Start with a direct answer to my exact question.
2) Then add "What you likely need next" with practical next actions.
3) If my request is vague, propose 2 clarified versions and proceed with the most likely one.
4) Be honest about uncertainty.
5) Keep it useful, not preachy.

Output format:
[Direct Answer]
...

[What You Likely Need Next]
- ...
- ...
- ...

[Assumptions]
- ...
```

## Output-format
- Direkt svar
- "Du behover troligen detta ocksa"
- Antaganden

## Kvalitetskriterier
- Mer proaktivt hjalpfullt svar
- Mindre missforstand i nasta steg
- Tydlig osakerhetsmarkering

## Varianter
- Variant A: Kort svar (max 5 bullets totalt).
- Variant B: Coach-lage med tydlig stegplan.
