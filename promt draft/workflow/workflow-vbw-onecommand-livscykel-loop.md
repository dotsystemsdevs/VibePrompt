# workflow-vbw-onecommand-livscykel-loop

## Syfte
Gora en enda styrprompt som driver hela byggloopen med init -> vibe -> qa/verify -> archive utan att hoppa over tillstand.

## Input
- Projektmal i 1-3 meningar
- Nuvarande status (greenfield eller befintlig kodbas)
- Eventuella harda constraints (tid, stack, compliance)

## Instruktioner
1. Arbeta i tydliga steg: setup, scope, plan, execute, verify, archive.
2. Innan varje steg, visa varfor steget behovs och vad "klart" betyder.
3. Om information saknas, stall max 3 precisa fragor och fortsatt sedan.
4. Hall koll pa tillstand mellan steg (vad som redan ar gjort, vad som aterstar).
5. Vid risk eller blocker: foresla minsta sakra workaround, inte total omskrivning.
6. Om allt ar klart: ge "next invocation" i en rad (ex: koer nasta fas).

## Output-format
- `State Snapshot` (kort)
- `Current Step` (vad du gor nu)
- `Action Plan` (3-7 punkter)
- `Verification Gate` (pass/fail + varfor)
- `Next Command` (en rad)

## Kvalitetskriterier
- Kontext bevaras mellan steg
- Ingen blandning av planering och exekvering i samma block utan motiv
- Tydliga stop/go-kriterier
- Minimal fluff, maximal styrbarhet

## Varianter
- Variant A: Snabbloop for prototyp (fa kontroller, hogt tempo)
- Variant B: Produktionsloop med tuffa grindar och strikt verifiering
