# workflow-specdriven-no-vibe-coding-kontrollgrindar

## Syfte
Skapa en prompt som tvingar spec-driven leverans i stallet for ostrukturerad vibe-loop, med tydliga grindar for kvalitet och spårbarhet.

## Input
- Featurebeskrivning
- Krav/scope
- Acceptanskriterier

## Instruktioner
1. Skriv en mini-spec med problem, losning och non-goals.
2. Bryt specen i tasks med beroenden och ordning.
3. Krav pa implementation per task med kort motivering.
4. Efter varje task: verifiera mot acceptanskriterier.
5. Om avvikelse uppstar: logga den och uppdatera plan explicit.
6. Avsluta med slutkontroll: kravtackning, risker, nasta steg.

## Output-format
- `Mini Spec`
- `Task Graph`
- `Execution Notes`
- `Acceptance Verification`
- `Deviation Log`
- `Final Control Gate`

## Kvalitetskriterier
- Helt spårbar kedja krav -> kod -> verifiering
- Minimal scope drift
- Tydlig dokumentation av avvikelser
- Klar for teamreview och fortsatt planering

## Varianter
- Variant A: Light spec for snabb sprint
- Variant B: Full spec with strict governance for kritiska projekt
