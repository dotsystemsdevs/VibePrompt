# simulering-drone-flightphysics-inertia-bankning-loop

## Syfte
Skapa en prompt som bygger en browserbaserad drone-simulator med mjuk inertia, bankning och responsiv kontrollkansla.

## Input
- Oonskad spelkansla (arcade, semi-realistic, realistic)
- Miljo (stad, terrang, rymd-overgang)
- Kontrollschema (tangentbord/mus/scroll)

## Instruktioner
1. Definiera fysikstate: position, heading, tilt, speed, target values.
2. Implementera acceleration/friktion med mjuk damping.
3. Skapa tydlig skillnad mellan manuell flygning och stabiliseringslagen.
4. Lagg in altitude-granser och smooth interpolation for hogd.
5. Ge visuella indikatorer for roll/pitch for att forstarka feedback.
6. Avsluta med tuning-parametrar som enkelt kan justeras.

## Output-format
- `Physics Model`
- `Control Mapping`
- `Update Loop`
- `HUD Signals`
- `Tuning Parameters`

## Kvalitetskriterier
- Kanner responsiv utan att bli jittery
- Enkel att kalibrera
- Spelbar med standardtangentbord
- Stabil fps-loop utan hopp

## Varianter
- Variant A: Arcade-mode med snabb respons
- Variant B: Cinematic mode med mjukare rörelser
