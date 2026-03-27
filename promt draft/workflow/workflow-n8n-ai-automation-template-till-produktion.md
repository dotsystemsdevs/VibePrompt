# workflow-n8n-ai-automation-template-till-produktion

## Syfte
Skapa en prompt som tar en n8n-template fran ide till driftbar AI-automation med tydliga valideringssteg.

## Input
- Automationsmal
- Trigger- och datakallor
- Onskat resultat/utfall

## Instruktioner
1. Kartlagg workflow i steg med indata/utdata per nod.
2. Definiera felhantering och retries for kritiska noder.
3. Satt observability-punkter: loggning, alerts, fail-cases.
4. Krav pa testkorningsscenario med minst 3 edge cases.
5. Identifiera cost hotspots i AI-anrop och foresla optimering.
6. Avsluta med deployment-checklista.

## Output-format
- `Workflow Blueprint`
- `Failure Handling Plan`
- `Test Scenarios`
- `Cost Optimization Notes`
- `Deployment Checklist`

## Kvalitetskriterier
- Stabil korningsmodell
- Tydlig felsokbarhet
- Kostnadsmedveten AI-anvandning
- Klar for overlamning till drift

## Varianter
- Variant A: Intern teamautomation
- Variant B: Kundnara automation med hogre tillforlitlighetskrav
