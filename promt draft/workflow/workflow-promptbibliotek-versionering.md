# workflow-promptbibliotek-versionering

## Syfte
Undvika prompt-kaos genom att spara, versionshantera och markera teststatus for prompts som om de vore kod.

## Input
- Lista av befintliga prompts
- Anvandningsomraden
- Testresultat/noteringar

## Instruktioner
Kopiera prompten nedan:

```text
Help me organize my prompts like code.

Tasks:
1) Create a folder taxonomy by category and use case.
2) Propose a file naming convention.
3) Define version tags (v1, v1.1, v2) and changelog style.
4) Add metadata template:
   - purpose
   - input shape
   - output format
   - tested on
   - pass/fail notes
5) Suggest a weekly maintenance routine.

Output format:
[Folder Structure]
...

[Naming Convention]
...

[Metadata Template]
...

[Weekly Maintenance]
...
```

## Output-format
- Struktur for promptbibliotek
- Versionsregel + metadata
- Veckorutin

## Kvalitetskriterier
- Lat att hitta ratt prompt
- Spårbar evolution av prompts
- Mindre duplicering och glomska

## Varianter
- Variant A: Solo workflow i markdown.
- Variant B: Team workflow med Git + review process.
