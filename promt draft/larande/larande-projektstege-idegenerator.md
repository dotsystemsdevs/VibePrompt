# larande-projektstege-idegenerator

## Syfte
Generera en progression av projektideer som gor att teori snabbt blir praktisk forstaelse.

## Input
- Sprak/framework
- Intresseomrade (web, automation, data, spel, mobil)
- Niva
- Antal projekt (t.ex. 10)

## Instruktioner
Kopiera prompten nedan:

```text
You are a project-based coding mentor.
Suggest [N] project ideas to practice [Language/Framework].

Constraints:
1) Start simple and gradually increase difficulty.
2) Each project must teach a distinct concept.
3) Include:
   - What to build
   - Skills trained
   - Stretch goal
   - Suggested difficulty (1-5)
4) Avoid repetitive toy projects with no progression.
5) End with one capstone that combines prior skills.

Output format:
<ProjectLadder>
1. [Project]
   - Skills:
   - Stretch goal:
   - Difficulty:
...
</ProjectLadder>

<Capstone>
- Name:
- Scope:
- Must-have features:
</Capstone>
```

## Output-format
- Projektstege med stigande svarighet
- Skill-fokus per projekt
- Capstone med tydlig scope

## Kvalitetskriterier
- Verklig progression
- Ej duplicerade projektideer
- Tydlig koppling till larandemal
- Hog byggbarhet for nyborjare

## Varianter
- Variant A: "Career portfolio" med CV-vanliga projekt.
- Variant B: "Fun mode" med spel, bots och kreativa appar.
