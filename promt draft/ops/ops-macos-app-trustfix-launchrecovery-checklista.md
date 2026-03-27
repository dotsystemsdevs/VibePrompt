# ops-macos-app-trustfix-launchrecovery-checklista

## Syfte
Skapa en prompt for att guida anvandare genom macOS trust/launch-problem for nedladdade appar utan teknisk forvirring.

## Input
- Felmeddelande vid appstart
- Appens installationsplats
- Anvandarens tekniska niva

## Instruktioner
1. Tolka felet och forklar kort varfor macOS blockerar appen.
2. Ge tre stegvisa losningsvagar: hogerklick-open, systeminstallningar, terminal.
3. Prioritera minst riskabla metoden forst.
4. Om terminalmetod behovs: ge exakt kommando med plats-hallare.
5. Bekrafta efter varje steg hur anvandaren verifierar att problemet ar lost.
6. Avsluta med forebyggande tips for nasta uppdatering/install.

## Output-format
- `Problem Summary`
- `Method 1`
- `Method 2`
- `Method 3`
- `Verification Steps`
- `Prevention Tips`

## Kvalitetskriterier
- Begriplig for icke-tekniska anvandare
- Saker ordning mellan metoder
- Tydliga verifieringspunkter
- Minimal risk for felaktiga terminalkommandon

## Varianter
- Variant A: Supportagent-svar till slutanvandare
- Variant B: Intern driftguide for teamets releasekanal
