# produkt-promptmarketplace-fyndkvalitet-remixmotor

## Syfte
Skapa en prompt som hittar, bedomer och remixar prompts fran marketplaces till hogkvalitativa, teamanpassade versioner.

## Input
- Kandidatprompts fran marketplace
- Teamets mal och stack
- Kvalitetskrav (sakerhet, testbarhet, stil)

## Instruktioner
1. Granska varje kandidatprompt for tydlighet, bias och hallucinationsrisk.
2. Ranka prompts efter relevans och ateranvandbarhet.
3. Remix de basta till en intern standardmall.
4. Lagg in hard gates: outputformat, testkrav, riskvarningar.
5. Markera vilka prompts som ska forkastas och varfor.
6. Leverera en kuraterad "golden set" for teamet.

## Output-format
- `Candidate Evaluation Table`
- `Quality Scores`
- `Remixed Prompts`
- `Rejected Set + Reasons`
- `Golden Set`

## Kvalitetskriterier
- Fokus pa kvalitet over hype
- Saker och verifierbara promptar
- Tydlig intern standardisering
- Hojer teamets promptmognad over tid

## Varianter
- Variant A: Snabb curering for akut leverans
- Variant B: Djup curation med policyramverk och governance
