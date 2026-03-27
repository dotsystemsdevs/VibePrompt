# ops-vbw-tokeneffektiv-shellfirst-kostnadskontroll

## Syfte
Skapa en ops-prompt som maximerar leverans per token genom shell-first automation, smart routing och lattare koordinationsoverhead.

## Input
- Fas/uppgift som ska koeras
- Kostnadstak eller budgetprofil
- Prioritet: kvalitet, balans eller budget

## Instruktioner
1. Bryt ut repetitiv logik till shell/script-steg dar det ar mojligt.
2. Anvand dyrare modeller bara for steg med hogt resonemangsbehov.
3. Reducera kontextduplicering mellan agenter genom rollanpassad kontext.
4. Sammanfatta tokenrisker fore exekvering och foresla billigare fallback.
5. Efter korning: rapportera kostnadsutfall och forslag for nasta optimering.
6. Om kvalitet riskeras av for aggressiv budget: signalera tydligt.

## Output-format
- `Execution Strategy`
- `Model/Agent Routing`
- `Token Risk Forecast`
- `Cost Guardrails`
- `Post-Run Optimization Notes`

## Kvalitetskriterier
- Matbar kostnadsmedvetenhet
- Inga dolda trade-offs
- Balans mellan kvalitet och budget
- Ateranvandbara shell-monstrer

## Varianter
- Variant A: API-kostnadsminimering for hog fasvolym
- Variant B: Kvalitetsforst med kostnadsrapportering som sekundart mal
