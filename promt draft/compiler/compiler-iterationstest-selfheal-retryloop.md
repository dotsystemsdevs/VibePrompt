# compiler-iterationstest-selfheal-retryloop

## Syfte
Självläkande kodgenerering: fånga testfel, injicera feedback i nästa iteration och retrya kontrollerat.

## Input
- Testkommando
- Max iterationer
- Stageprompt

## Instruktioner
Kopiera prompten nedan:

```text
Add iteration-based self-healing to this generation stage.

Rules:
1) Run stage output against test command.
2) If test fails, capture stdout/stderr.
3) Re-run stage prompt with captured test output as feedback context.
4) Repeat up to [iterations].
5) If all iterations fail, exit with error and report diagnostics.

Output format:
[Iteration Policy]
...

[Feedback Injection Strategy]
...

[Failure Report Template]
- iteration:
- failing tests:
- key error lines:
- likely causes:
```

## Output-format
- Iterationspolicy
- Feedbackinjektion
- Failure report template

## Kvalitetskriterier
- Högre first-pass stabilitet över tid
- Snabbare fix av testbrott
- Tydlig felrapport vid max-fail

## Varianter
- Variant A: 2-iteration quick mode.
- Variant B: 5-iteration hardening mode.
