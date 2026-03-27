# ui-ux-ai-verktygsurval-fidelitypipeline

## Syfte
Skapa en prompt som valjer ratt AI-UX/UI-verktyg beroende pa om du startar fran text, wireframe, screenshot eller figma.

## Input
- Startunderlag (text/skiss/screenshot/designfil)
- Onskad fidelity (low, mid, high)
- Krav pa kodexport och redigerbarhet

## Instruktioner
1. Identifiera startunderlagets kvalitet och begransningar.
2. Välj verktygskedja for snabbast väg till redigerbar design.
3. Definiera overgangar mellan fidelity-nivaer.
4. Lagg in quality gates for usability och consistency.
5. Om malet ar kod: specificera handoff-krav till frontend.
6. Ge en iterativ loop for feedback -> designfix -> ny export.

## Output-format
- `Input Diagnostic`
- `Toolchain Recommendation`
- `Fidelity Transition Plan`
- `Quality Gates`
- `Design-to-Code Handoff`
- `Iteration Loop`

## Kvalitetskriterier
- Ratt verktyg till ratt startpunkt
- Tydlig handoff utan informationsforlust
- Fokus pa anvandbarhet, inte bara estetik
- Latt att iterera med teamfeedback

## Varianter
- Variant A: Snabb prototypdemo
- Variant B: Produktionsnara designsystemflode
