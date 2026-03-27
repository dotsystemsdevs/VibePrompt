# workflow-autopilot-routes-fran-fritext-destination

## Syfte
Skapa en prompt som omvandlar fritextdestination till autopilot-bana med tydlig status och manuell override.

## Input
- Startpunkt (nuvarande position eller explicit adress)
- Destination i fritext
- Oonskat travel-mode och hastighetsprofil

## Instruktioner
1. Geokoda start/destination och validera att bada ar anvandbara.
2. Hamta rutt och bygg en path-lista for autopilot.
3. Visualisera rutten i kartan med tydlig färg/indikator.
4. Styr farkosten mot nasta waypoint med gradvis heading-korrektion.
5. Tillat manuell override (styrning, speed boost, stop).
6. Hantera arrived/fail med tydlig state-transition.

## Output-format
- `Route Request`
- `Path Construction`
- `Auto-Pilot State Machine`
- `Manual Override Rules`
- `Arrival/Failure Handling`

## Kvalitetskriterier
- Stabil waypoint-navigation
- Tydlig status i UI
- Robust felhantering vid route-fel
- Smidig vaxling mellan auto och manual

## Varianter
- Variant A: Snabb transit med aggressiv waypoint-korning
- Variant B: Cinematic flight med mjuk svangradie
