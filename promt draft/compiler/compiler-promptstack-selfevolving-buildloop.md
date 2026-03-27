# compiler-promptstack-selfevolving-buildloop

## Syfte
Bygga ett prompt-stack system som evolverar kod stegvis (001, 002...) med self-improving compile-loop.

## Input
- Basimplementation
- Stacklista
- Outputstruktur

## Instruktioner
Kopiera prompten nedan:

```text
Design a self-evolving prompt compiler workflow.

Requirements:
1) Process numbered prompt stages sequentially (001, 002, ...).
2) If a stage generates a new compiler file, use it for subsequent stages.
3) Save stage outputs for traceability.
4) Maintain a merged "current runtime" output.

Output format:
[Stage Pipeline Design]
...

[Evolution Rules]
- ...

[Output Directory Contract]
- staged outputs:
- current merged output:
```

## Output-format
- Stage pipeline design
- Evolution rules
- Output contracts

## Kvalitetskriterier
- Tydlig självförbättrande loop
- Reproducerbar historik per stage
- Låg risk för okontrollerad drift

## Varianter
- Variant A: Single stack (core).
- Variant B: Multi-stack (core + tests + plugins).
