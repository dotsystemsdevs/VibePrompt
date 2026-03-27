# voice-spokentotask-promptnormaliserare

## Syfte
Konvertera rösttranskription till skarp, körbar kodprompt med rätt scope och constraints.

## Input
- Rå transkription (från Whisper eller liknande)
- Projektkontext
- Mål (feature/bug/refactor/review)

## Instruktioner
Kopiera prompten nedan:

```text
Transform this spoken transcript into an execution-ready coding prompt.

Transcript:
[paste transcript]

Project context:
[insert context]

Task type:
[feature|bug|refactor|review|explain]

Tasks:
1) Remove filler words and ambiguity.
2) Extract explicit objective, constraints, and acceptance criteria.
3) Add missing technical context questions only if critical.
4) Output one short prompt and one detailed prompt.

Output format:
[Normalized Intent]
...

[Short Prompt]
...

[Detailed Prompt]
...

[Critical Clarifications]
- ...
```

## Output-format
- Normaliserad intent
- Kort + detaljerad prompt
- Kritiska följdfrågor

## Kvalitetskriterier
- Minimerar "voice noise"
- Håller tekniskt fokus
- Snabb från tal till implementation

## Varianter
- Variant A: Fast mode (minimal questions).
- Variant B: Safe mode (extra validation questions).
