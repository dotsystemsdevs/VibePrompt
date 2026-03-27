# workflow-desktop-webapp-handoff-tauri-nextjs-saas

## Syfte
Skapa en prompt som synkar desktopappens promptflow med webappens konton, licenser och backend sa att helheten blir sammanhallen.

## Input
- Desktopfunktioner (lokal prompt-hantering)
- Webappfunktioner (auth, license, billing, backend)
- Miljokrav och deploymentmal

## Instruktioner
1. Kartlagg ansvar mellan desktop och webapp utan overlap.
2. Definiera vilka data som ar lokala vs molnbaserade.
3. Satt handoff-punkter mellan klientinteraktion och SaaS-backend.
4. Beskriv felhantering nar desktop ar offline eller licensstatus ar oklar.
5. Ge en implementationstakt i faser: MVP, hardening, scale.
6. Avsluta med en tydlig integrationschecklista.

## Output-format
- `Responsibility Split`
- `Data Boundary Rules`
- `Desktop-Web Handoff Flow`
- `Failure Modes & Recovery`
- `Integration Checklist`

## Kvalitetskriterier
- Tydlig systemgrans mellan appdelar
- Mindre risk for dubbelkallor av sanning
- Realistisk fasindelning
- Driftbar och supportbar arkitektur

## Varianter
- Variant A: Offline-first desktop med sen synk
- Variant B: License-first webkontrollerad desktopupplevelse
