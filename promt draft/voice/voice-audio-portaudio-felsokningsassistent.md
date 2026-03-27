# voice-audio-portaudio-felsokningsassistent

## Syfte
Lösa vanliga ljudproblem (PortAudio, input device, permissions) snabbt och stegvis.

## Input
- OS
- Felmeddelande
- Installerade paket
- Device-lista (om finns)

## Instruktioner
Kopiera prompten nedan:

```text
Troubleshoot voice input/audio dependency issues step-by-step.

Context:
- OS:
- Error:
- Installed packages:
- Device info:

Tasks:
1) Identify likely root cause category:
   - missing system audio libs
   - permission issue
   - wrong input device
   - driver/service issue
2) Provide exact fix commands for this OS.
3) Provide validation script/commands.
4) Provide rollback or alternative path.

Output format:
[Likely Cause]
...

[Fix Steps]
1) ...
2) ...

[Validation]
...

[Alternative Path]
...
```

## Output-format
- Rotorsakskategori
- Exakta fixsteg
- Validering + alternativ

## Kvalitetskriterier
- Snabb återställning av ljudflöde
- Minimerar trial-and-error
- OS-specifika instruktioner

## Varianter
- Variant A: Windows setup.
- Variant B: Linux/macOS setup.
