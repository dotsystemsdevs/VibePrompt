# translator-sprak-schema-och-modellkonvertering

## Syfte
Konvertera mellan sprak, schema och systemrepresentationer utan att tappa semantik.

## Input
- Kallformat (kod/schema/pseudocode/json)
- Malsystem (sprak/ORM/SQL/GraphQL)
- Begransningar

## Instruktioner
Kopiera prompten nedan:

```text
Translate this artifact while preserving intent and constraints.

Source:
[paste source]

Target:
[insert target format]

Requirements:
1) Preserve functionality and data meaning.
2) Add comments where mapping is non-obvious.
3) Note assumptions and possible incompatibilities.

Output format:
[Translated Output]
...

[Mapping Notes]
- ...

[Assumptions]
- ...

[Potential Mismatches]
- ...
```

## Output-format
- Konverterad artefakt
- Mapping notes
- Antaganden + mismatch-risker

## Kvalitetskriterier
- Semantisk trohet
- Tydlig transparens i mapping
- Mindre migrationsfel

## Varianter
- Variant A: Language-to-language.
- Variant B: Data schema transformation.
