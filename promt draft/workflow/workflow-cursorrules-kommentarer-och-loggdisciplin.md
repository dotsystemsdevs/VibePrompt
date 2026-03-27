# workflow-cursorrules-kommentarer-och-loggdisciplin

## Syfte
Skapa ett personligt ruleset for tydlig kodkommentering och konsekvent loggdisciplin i större kodflöden.

## Input
- Sprak/stack
- Loggramverk
- Teamets kommenteringsstandard

## Instruktioner
Kopiera prompten nedan:

```text
Create a practical coding ruleset for comments and logging.

Include:
1) Commenting standard
   - focus on why/how, not obvious what
   - use JSDoc-style docs for exported functions/classes
   - preserve useful existing comments

2) Logging standard
   - central logger module
   - log levels by event type
   - required checkpoints for workflow transitions
   - never log secrets/PII

3) Missing context behavior
   - if required files/context missing, ask for those first

Output format:
[Commenting Rules]
...

[Logging Rules]
...

[Do/Don't List]
...

[Starter Logger Contract]
...
```

## Output-format
- Teamredo ruleset for comments + logs

## Kvalitetskriterier
- Latt att felsoka i efterhand
- Tydliga kommentarer som hjalper framtida underhall
- Minskar bullriga/onyttiga loggar

## Varianter
- Variant A: Node + Winston.
- Variant B: Python + structlog/loguru.
