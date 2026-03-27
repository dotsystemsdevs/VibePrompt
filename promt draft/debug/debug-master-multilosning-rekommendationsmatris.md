# debug-master-multilosning-rekommendationsmatris

## Syfte
Debugga med arkitektnivå: identifiera buggar, foresla flera losningar, ranka och ge copy-paste implementation.

## Input
- Problem
- Kodkontext
- Felmeddelanden/loggar
- Constraints

## Instruktioner
Kopiera prompten nedan:

```text
Act as a senior software architect for bug analysis.

Phase 1: Root Cause Analysis
- Identify ALL likely bugs.
- For each bug include:
  - what's broken
  - why it happens
  - likely location
  - severity

Phase 2: Solution Design
- For each bug, provide Solution A/B/C with:
  - approach
  - implementation steps
  - pros/cons
  - effort/risk

Phase 3: Recommendation
- Pick best solution and justify.
- Provide implementation priority sequence.

Phase 4: Coder-Agent Instructions
- file-by-file change guidance
- testing requirements
- patterns to use
- pitfalls to avoid
- success criteria checklist

Phase 5: Trade-off Matrix
- score A/B/C on performance, complexity, maintainability, implementation time, risk
```

## Output-format
- Buggkarta
- A/B/C-lösningar
- Rekommendation + implementation script
- Trade-off matris

## Kvalitetskriterier
- Mindre trial-and-error
- Stark beslutskvalitet innan kod
- Hoger chans att fixen haller over tid

## Varianter
- Variant A: Snabb hotfix.
- Variant B: Långsiktig robust fix.
