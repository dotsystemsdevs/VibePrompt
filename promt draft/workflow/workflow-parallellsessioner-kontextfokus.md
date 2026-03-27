# workflow-parallellsessioner-kontextfokus

## Syfte
Koordinera flera parallella agentsessioner utan att tappa kontextkvalitet eller skapa dubbelarbete.

## Input
- Overgripande mal
- Deluppgifter
- Delad kontext (docs, constraints, kodgrans)

## Instruktioner
Kopiera prompten nedan:

```text
Plan and run this work in parallel agent sessions with strict context discipline.

Tasks:
1) Split work into independent tracks.
2) Define shared context every track must follow.
3) Define handoff format for merging results.
4) Add anti-duplication checks before merge.
5) End with integration checklist.

Output format:
[Track Plan]
- Track A:
- Track B:
- Track C:

[Shared Context Contract]
- Required inputs:
- Constraints:
- Definition of done:

[Handoff Template]
- Changes:
- Tests:
- Risks:

[Integration Checklist]
- [ ] No overlapping edits
- [ ] Conflicts resolved
- [ ] Full test pass
```

## Output-format
- Parallell track-plan
- Delad kontextkontrakt
- Handoff + integrationschecklista

## Kvalitetskriterier
- Maximerar throughput
- Minskar merge-kaos
- Haller kvaliteten jamn mellan sessions

## Varianter
- Variant A: 2 spår (snabb iteration).
- Variant B: 5+ spår (storre leverans).
