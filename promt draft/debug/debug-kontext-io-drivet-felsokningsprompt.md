# debug-kontext-io-drivet-felsokningsprompt

## Syfte
Forbattra debugghjalp genom att alltid inkludera kontext + input/output-exempel for snabbare rotorsak.

## Input
- Kodsnutt
- Felmeddelande
- Input som anvands
- Forvantat vs faktiskt output

## Instruktioner
Kopiera prompten nedan:

```text
Help me debug this issue using context and I/O evidence.

Code:
[paste code]

Error:
[paste error]

Input:
[paste input]

Expected output:
[paste expected]

Actual output:
[paste actual]

Tasks:
1) Identify the most likely root cause.
2) Show the exact problematic line/pattern.
3) Provide minimal fix first.
4) Provide one prevention tip to avoid this class of bug.

Output format:
[Diagnosis]
...

[Root Cause]
...

[Minimal Fix]
...

[Prevention Tip]
...
```

## Output-format
- Diagnos
- Rotorsak med evidens
- Minimal fix + prevention

## Kvalitetskriterier
- Kontexttung felsokning
- Minskar gissningar
- Snabb validering av fix

## Varianter
- Variant A: Frontend runtime error.
- Variant B: Backend/API exception.
