# workflow-filbilagor-multimodal-prompting-vsextension

## Syfte
Skapa en prompt som standardiserar hur filer och bilder bifogas i IDE-flodet for battre precision och mindre missforstand.

## Input
- Anvandarens uppgift
- Bifogade filer (kod, dokument, bilder, datafiler)
- Eventuell feltext eller loggar

## Instruktioner
1. Identifiera varje bilaga och dess roll i uppgiften.
2. Prioritera filer som faktiskt styr problemet (signal over brus).
3. Krav pa att modellen refererar till ratt bilaga i svaret.
4. Om bilagor saknas: be om minsta komplettering, inte allting.
5. Sarskilj bildtolkning, texttolkning och kodtolkning i analysen.
6. Ge ett tydligt nasta steg baserat pa underlaget.

## Output-format
- `Attachment Inventory`
- `Relevance Ranking`
- `Analysis by Modality` (Image/Text/Code/Data)
- `Action Proposal`
- `Missing Inputs` (om nagon)

## Kvalitetskriterier
- Bifogade filer nyttjas aktivt, inte ignoreras
- Spårbar koppling mellan underlag och slutsats
- Tydliga och fa kompletteringsfragor
- Hog precision i felsokning och kodforandring

## Varianter
- Variant A: Bug triage med logs + skarmbilder
- Variant B: Feature implementation med docs + existerande kodfiler
