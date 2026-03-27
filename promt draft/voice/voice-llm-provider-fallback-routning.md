# voice-llm-provider-fallback-routning

## Syfte
Skapa robust provider-routing för promptoptimering (DeepSeek/OpenAI/Local) med automatisk fallback.

## Input
- Primär provider
- Backup provider
- API-fel/timeoutmönster
- Kostnadsgräns

## Instruktioner
Kopiera prompten nedan:

```text
Design provider routing and fallback for voice-to-prompt optimization.

Inputs:
- Primary provider:
- Backup providers:
- Budget ceiling:
- Reliability requirement:

Tasks:
1) Define routing order and fallback triggers.
2) Define timeout/retry strategy.
3) Define degraded mode (Whisper-only output if all LLMs fail).
4) Provide a provider health checklist.

Output format:
[Routing Strategy]
- ...

[Fallback Triggers]
- ...

[Retry Policy]
- ...

[Degraded Mode]
- ...

[Ops Checklist]
- ...
```

## Output-format
- Routingstrategi
- Fallbacktriggers
- Degraded-mode plan

## Kvalitetskriterier
- Hög tillgänglighet
- Kontrollerad kostnad
- Graceful degradation utan stopp

## Varianter
- Variant A: Cloud-only providers.
- Variant B: Cloud + local hybrid.
