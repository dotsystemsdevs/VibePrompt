# tooling-visualstudio-aihub-multiprovider-terminal

## Syfte
Skapa en masterprompt for en Visual Studio-baserad AI-hub dar flera CLI-assistenter kan koras i samma terminalyta med tydligt providerbyte.

## Input
- Vald IDE-miljo (Visual Studio)
- Tillgangliga providers (ex Claude, Codex, Cursor Agent, Qwen, Open Code)
- Arbetskatalog/workspace

## Instruktioner
1. Initiera en enhetlig terminalupplevelse med samma grundflode oavsett provider.
2. Beskriv hur providerbyte ska ske utan att forlora arbetskontext.
3. Definiera fallback om en provider saknas eller inte ar installerad.
4. Satt regler for nar native Windows eller WSL-variant ska valjas.
5. Ge tydliga instruktioner for snabbstart i en ny solution.
6. Hall output handlingsbar, inte konceptuell.

## Output-format
- `Provider Matrix` (namn, krav, startkommando, fallback)
- `Session Flow` (start -> prompt -> svar -> byte)
- `Workspace Rules`
- `Failure Recovery`
- `Operator Checklist`

## Kvalitetskriterier
- Samma mentala modell for alla providers
- Latt att felsoka startproblem
- Minimal friktion vid providerbyte
- Tydlig skillnad mellan native och WSL-floden

## Varianter
- Variant A: Nyborjarlage med guider och extra verifiering
- Variant B: Poweruserlage med kortkommandon och snabbvaxling
