# ui-hud-flightmode-speed-altitude-debugoverlay

## Syfte
Skapa en prompt for cockpit-HUD som visar flygstatus i realtid: mode, speed, altitude, heading, koordinater och debug-handelser.

## Input
- Vilka telemetry-falt som behovs
- Oonskad visuell stil (minimal, gamer, tactical)
- Felsokningsbehov under utveckling

## Instruktioner
1. Definiera vilka metriker som alltid maste vara synliga.
2. Satt tydliga visuella skillnader mellan manual och autopilot.
3. Bygg speed/altitude-indikatorer som reagerar i realtid.
4. Lagg in debug-overlay med nivakodad logg (info/warn/error).
5. Hall HUD lasbar trots mycket data.
6. Ge en plan for att toggla avancerad debug i produktion.

## Output-format
- `Core Telemetry`
- `Mode Visualization Rules`
- `Realtime Indicator Behavior`
- `Debug Overlay Spec`
- `Production Toggle Plan`

## Kvalitetskriterier
- Hög lasbarhet i fart
- Snabb felidentifiering
- Ingen visuell overbelastning
- Tydlig separation mellan spel-UI och debug-UI

## Varianter
- Variant A: Streamlined HUD for demo
- Variant B: Full diagnostic HUD for utveckling
