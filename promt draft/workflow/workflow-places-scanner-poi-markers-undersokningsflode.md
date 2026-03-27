# workflow-places-scanner-poi-markers-undersokningsflode

## Syfte
Skapa en prompt for POI-scanning runt droneposition med resultatlista, klickbara markorer och snabb fly-to-target.

## Input
- Sokterm (ex pizza, gas, museum)
- Aktuell position
- Max antal resultat

## Instruktioner
1. Sok efter POI med bias runt nuvarande position.
2. Rensa tidigare markorer och lista innan ny scan.
3. Rendera resultat i panel med namn, adress och snabbtarget.
4. Skapa 3D-markorer for varje resultat med klick-event.
5. Koppla klick till fly-to-flow med tydlig feedback i HUD/logg.
6. Hantera nollresultat och API-fel utan att bryta sessionen.

## Output-format
- `Search Request`
- `Result List`
- `Marker Strategy`
- `Interaction Events`
- `Error/Empty Handling`

## Kvalitetskriterier
- Snabb och begriplig scanning
- Ingen markor-ackumulering mellan sokningar
- Tydlig koppling mellan lista och karta
- Stabilt beteende vid fel

## Varianter
- Variant A: Utforskningsmode med bred sokradie
- Variant B: Precision mode med fa hogrelevanta resultat
