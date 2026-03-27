# compiler-promptformat-context-output-strict

## Syfte
Standardisera promptfiler med strikt `Context`/`Output`-kontrakt så generatorn inte hallucinerar filer.

## Input
- Promptuppgift
- Kontextfiler
- Exakta outputfiler

## Instruktioner
Kopiera prompten nedan:

```text
Create a strict prompt-stack file for code generation.

Task:
[insert task]

Use this exact structure:
# [Stage Title]
[clear task details]

## Context: [file1, file2, ...]
## Output: [path/to/fileA]
## Output: [path/to/fileB]

Rules:
1) Generate ONLY files listed in Output directives.
2) Assume ONLY Context and Output files exist.
3) Keep changes minimal and elegant.
4) Preserve syntax safety (escaped quotes, closed objects, valid strings).

Output format:
[Prompt File Draft]
...
```

## Output-format
- Strict prompt stage draft

## Kvalitetskriterier
- Färre oönskade filer
- Mindre syntaxbrott i generation
- Högre determinism i buildsteg

## Varianter
- Variant A: Feature stage.
- Variant B: Test stage.
