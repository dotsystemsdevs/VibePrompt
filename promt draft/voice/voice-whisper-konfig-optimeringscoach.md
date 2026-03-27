# voice-whisper-konfig-optimeringscoach

## Syfte
Optimera Whisper-inställningar för rätt balans mellan hastighet, kvalitet och hårdvarukapacitet.

## Input
- Hårdvara (CPU/GPU)
- Språk
- Latencykrav
- Nuvarande fel/problem

## Instruktioner
Kopiera prompten nedan:

```text
Recommend optimal Whisper config for my setup.

Inputs:
- Hardware:
- Language:
- Speed vs quality priority:
- Current issues:

Tune these fields:
- device (cpu/cuda)
- compute_type (int8/int16/float16/float32)
- model_size (tiny/base/small/medium/large)
- beam_size
- language (auto or fixed)
- vad_filter settings

Output format:
[Recommended Config]
{
  ...
}

[Why These Settings]
- ...

[Fallback Config]
{
  ...
}

[Validation Steps]
- ...
```

## Output-format
- Rekommenderad config
- Fallback config
- Verifieringssteg

## Kvalitetskriterier
- Stabil transkribering
- Förutsägbar prestanda
- Lätt att felsöka vid degradering

## Varianter
- Variant A: CPU-low-end.
- Variant B: CUDA-high-accuracy.
