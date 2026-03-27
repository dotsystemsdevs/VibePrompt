# workflow-promptdebug-commenttrace-regel

## Syfte
Införa en prompt-trace kommenteringsregel för att se vilken promptinstruktion som drev varje kodblock.

## Input
- Kodgenereringstask
- Promptsnuttar att spåra
- Teamets debugbehov

## Instruktioner
Kopiera prompten nedan:

```text
Apply prompt-trace commenting for generated code.

Rule:
- For generated logic blocks, add a single comment format:
  // PROMPT: <relevant prompt snippet>
- Do not add other comment styles when trace mode is enabled.

Requirements:
1) Keep snippets concise and specific.
2) Place trace comment immediately above relevant block.
3) Preserve code readability and avoid noisy duplication.

Output format:
[Trace Comment Policy]
...

[Example Mapping]
- prompt snippet -> code block location

[When to Enable]
- debugging:
- audit/review:
- disable in production exports:
```

## Output-format
- Trace comment policy
- Mappingexempel
- Aktiveringsregler

## Kvalitetskriterier
- Snabbare prompt→kod felsökning
- Bättre auditability i generation
- Kontrollerad kommentarvolym

## Varianter
- Variant A: Full trace mode.
- Variant B: Selective trace mode (critical paths only).
