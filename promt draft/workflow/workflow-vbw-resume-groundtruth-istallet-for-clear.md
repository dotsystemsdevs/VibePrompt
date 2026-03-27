# workflow-vbw-resume-groundtruth-istallet-for-clear

## Syfte
Skapa en prompt som aterbygger projektkontext fran ground truth-filer efter avbrott, istallet for att nollstalla allt.

## Input
- Tillgangliga projektartefakter (state, roadmap, plan, summary)
- Senaste kanda steg innan avbrott
- Eventuella fel eller ofullstandiga delar

## Instruktioner
1. Las artefakter i ordning: state -> roadmap -> plans -> summaries.
2. Identifiera vad som faktiskt ar klart vs vad som bara var planerat.
3. Markera mismatch mellan exekveringstillstand och verkliga resultat.
4. Foresla exakt aterupptagspunkt med lagsta risk.
5. Skriv en kort "continuation prompt" som kan koeras direkt.
6. Undvik full omstart om inte artefakter ar korrupta.

## Output-format
- `Recovered Context`
- `Completed vs Pending`
- `State Mismatches`
- `Recommended Resume Point`
- `Continuation Prompt`

## Kvalitetskriterier
- Ingen gissning om tillstand
- Tydlig separation mellan fakta och antaganden
- Snabb aterstart utan att forlora historik
- Robust mot avbrutna sessioner

## Varianter
- Variant A: Minimal recovery for snabba sessions
- Variant B: Djup recovery med mismatch-analys och riskklassning
