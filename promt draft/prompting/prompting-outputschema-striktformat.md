# prompting-outputschema-striktformat

## Syfte
Minska redigeringstid genom att tvinga modellen till exakt svarsmall.

## Input
- Problemtyp
- Onskade sektioner
- Eventuella faltkrav

## Instruktioner
Kopiera prompten nedan:

```text
Respond using this exact schema and no extra sections:

[Problem]
...

[Root Cause]
...

[Fix]
...

[Prevention]
...

Rules:
- If data is missing, write "Missing: <field>".
- Keep each section under 5 bullet points.
- Do not include intro/outro text.
```

## Output-format
- Exakt schema
- Inget extra fluff

## Kvalitetskriterier
- Konsekvent struktur
- Snabb vidarebearbetning
- Fungerar for automation

## Varianter
- Variant A: Debug schema.
- Variant B: Strategy schema (Goal, Constraints, Options, Decision, Next Step).
