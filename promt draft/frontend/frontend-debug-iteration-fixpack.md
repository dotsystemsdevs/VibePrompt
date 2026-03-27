# frontend-debug-iteration-fixpack

## Syfte
Snabbfixa vanliga AI-UI-problem via strukturerad iteration i stallet for random omgenerering.

## Input
- Trasigt beteende
- Nuvarande kod
- Forvantat resultat

## Instruktioner
Kopiera prompten nedan:

```text
Fix this UI using a targeted iteration workflow.

Issue:
[insert issue]

Current behavior:
[insert behavior]

Expected behavior:
[insert expected]

Run this sequence:
1) Diagnose root cause
2) Apply minimal fix
3) Verify on breakpoints
4) Verify accessibility
5) Verify performance-sensitive animations

Common issue templates:
- breakpoint overflow
- z-index layering conflicts
- weak loading/error states
- form validation UX gaps
- missing keyboard navigation
- dark mode inconsistencies
- janky animations
- scroll lock/position bugs

Output format:
[Diagnosis]
...

[Fix Applied]
...

[Verification Matrix]
- mobile:
- tablet:
- desktop:
- keyboard:
- dark mode:
```

## Output-format
- Diagnos
- Minimal fix
- Verifieringsmatris

## Kvalitetskriterier
- Mindre "regenerate all"
- Snabbare stabilisering av UI
- Tydlig bevisning att felet ar lost

## Varianter
- Variant A: Component-level fix.
- Variant B: Page-level fix.
