# workflow-awesome-vibekod-verktygsnavigator

## Syfte
Skapa en prompt som valjer ratt typ av AI-verktyg for uppgiften: kodassistent, AI-IDE, cloud builder eller pluginbaserad IDE.

## Input
- Uppgiftens mal
- Teknisk stack
- Teamets arbetssatt (solo/team, snabb prototyp eller produktion)

## Instruktioner
1. Klassificera uppgiften efter komplexitet, hastighetsbehov och risk.
2. Matcha uppgiften mot verktygskategori (assistant, AI-IDE, cloud tool, plugin-IDE).
3. Ge topp 3 rekommendationer med tydliga trade-offs.
4. Beskriv nar man bor byta verktyg mitt i flodet.
5. Inkludera en fallback om valt verktyg inte levererar.
6. Avsluta med ett konkret "borja har"-steg.

## Output-format
- `Task Profile`
- `Best-Fit Tool Categories`
- `Top 3 Options`
- `Switch Criteria`
- `Fallback Plan`
- `Start Here`

## Kvalitetskriterier
- Praktiskt beslutsstod, inte bara lista
- Tydliga trade-offs
- Enkel att tillampa i verkliga sprintar
- Robust vid verktygsbyte

## Varianter
- Variant A: Startup-tempo med fokus pa snabb shipping
- Variant B: Enterprise-tempo med fokus pa governance och kvalitet
