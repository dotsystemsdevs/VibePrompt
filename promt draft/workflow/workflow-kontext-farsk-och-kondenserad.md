# workflow-kontext-farsk-och-kondenserad

## Syfte
Halla AI-kontext "farsk och kondenserad" sa kvaliteten inte faller over langa sessioner.

## Input
- Aktuell task
- Tidigare session-sammanfattning
- Kritiska filer/regler

## Instruktioner
Kopiera prompten nedan:

```text
Keep context fresh and condensed.

Before answering:
1) Summarize current task in <=5 bullets.
2) List only the critical context needed now.
3) Drop stale details not needed for this step.
4) If context is too long, produce a compact handoff summary.

Output format:
[Task Snapshot]
- ...

[Critical Context Only]
- ...

[Dropped Context]
- ...

[Next Action]
- ...
```

## Output-format
- Kompakt task snapshot
- Endast kritisk kontext
- Nasta steg

## Kvalitetskriterier
- Mindre context bloat
- Hogre precision per svar
- Battr e kontinuitet mellan sessioner

## Varianter
- Variant A: Solo builder.
- Variant B: Team handoff med kort statusblock.
