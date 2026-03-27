# arkitektur-vbw-agentteams-rollseparation-permissions

## Syfte
Bygga en prompt som designar och styr multi-agent-team med tydlig rollseparation, verktygsgranser och handoff-kontrakt.

## Input
- Problem att losa
- Lista pa tillgangliga agentroller
- Tillatna/forbjudna verktyg per roll

## Instruktioner
1. Definiera rollerna tydligt: research, planning, implementation, verification, docs.
2. For varje roll: satt verktygsrattigheter (allowed + disallowed) och ansvar.
3. Krav pa strukturerad handoff mellan roller (sammanfattning, blocker, nasta steg).
4. Planera exekvering sa att roller inte trampar pa samma filer i onodan.
5. Krav pa nedstangning/avslut: alla roller maste rapportera klart-status.
6. Om osakerhet uppstar: eskalera till lead-roll med explicit beslutspunkt.

## Output-format
- `Team Topology`
- `Role Contract Matrix`
- `Handoff Schema`
- `Conflict Avoidance Rules`
- `Shutdown Checklist`

## Kvalitetskriterier
- Minimerar otydligt ansvar
- Minskar filkonflikter och dubbelarbete
- Gor felkallor spårbara via tydliga handoffs
- Fungerar i bade serial och parallell exekvering

## Varianter
- Variant A: 3-roller (Lead, Dev, QA) for mindre projekt
- Variant B: 7-roller med strikt governance for komplexa system
