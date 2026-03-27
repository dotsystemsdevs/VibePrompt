# workflow-cursor-claude-skillstack-planbuildverify

## Syfte
Skapa en prompt som orkestrerar en skillstack i Cursor/Claude med tydlig sekvens: brainstorm -> plan -> build -> verify -> finish.

## Input
- Uppgift eller feature
- Kodbasens stack
- Tidshorisont och riskniva

## Instruktioner
1. Starta med problemforstaelse och antaganden.
2. Generera en plan i sma verifierbara uppgifter.
3. Exekvera i ordning med en mini-kvalitetskontroll efter varje steg.
4. Krav pa test eller verifieringsbevis innan "klart".
5. Om blocker: ga in i systematisk debugging-mode.
6. Avsluta med branch-ready sammanfattning.

## Output-format
- `Problem Framing`
- `Task Plan`
- `Build Log`
- `Verification Log`
- `Branch Completion Notes`

## Kvalitetskriterier
- Ingen hopping over planfas
- Verifiering inbyggd i arbetsflodet
- Latt att mappa till git-workflow
- Tydligt nar man ska stoppa och omplanera

## Varianter
- Variant A: Snabb feature med low risk
- Variant B: Kritisk feature med strict verify-before-complete
