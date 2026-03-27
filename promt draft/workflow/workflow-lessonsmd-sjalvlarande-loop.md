# workflow-lessonsmd-sjalvlarande-loop

## Syfte
Fa agenten att lagra larande mellan uppgifter genom en explicit `lessons.md`-rutin.

## Input
- Uppgiftstyp
- Fel/avvikelser under arbetet
- Slutligt resultat

## Instruktioner
Kopiera prompten nedan:

```text
Before closing any task, update lessons.md with what was learned.

Rules for lessons.md entry:
1) Trigger: what happened
2) Root cause: why it happened
3) Fix applied: what worked
4) Prevention rule: what to do next time
5) Scope: where this lesson applies

Constraints:
- Keep each lesson concise (max 8 lines).
- Prefer concrete code/process lessons over vague advice.
- Do not duplicate existing lessons; merge when similar.

Output format:
[Lesson Entry]
- Date:
- Trigger:
- Root cause:
- Fix:
- Prevention:
- Scope:

[Task Closeout]
- Verification done:
- Remaining risks:
```

## Output-format
- Standardiserad lesson-entry
- Closeout med verifiering och risk

## Kvalitetskriterier
- Explicit skrivning innan task stangs
- Konkret ateranvandbart larande
- Mindre upprepade misstag

## Varianter
- Variant A: Per-task logging.
- Variant B: Batch logging i slutet av dagen.
