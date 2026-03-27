# compiler-pluginstack-static-och-dynamic

## Syfte
Kombinera statiska och dynamiska plugins för att styra promptkvalitet och runtime-beteende.

## Input
- Stacknamn
- Pluginmål
- Timeoutkrav

## Instruktioner
Kopiera prompten nedan:

```text
Design plugin handling for a prompt compiler.

Requirements:
1) Static plugins (.md):
   - append in alphabetical order
   - provide reusable constraints/style context
2) Dynamic plugins (.js):
   - execute async in alphabetical order
   - timeout protection per plugin
   - context object includes config, stack, prompt number/content, working dir
3) On plugin failure:
   - log error
   - skip plugin
   - continue execution

Output format:
[Plugin Architecture]
...

[Execution Order Rules]
...

[Failure Handling Policy]
...

[Plugin Context Contract]
...
```

## Output-format
- Pluginarkitektur
- Körordningsregler
- Failure policy + context contract

## Kvalitetskriterier
- Robust plugin-exekvering
- Stabil build även vid pluginfel
- Tydlig extension-yta

## Varianter
- Variant A: Static-only setup.
- Variant B: Full hybrid setup.
