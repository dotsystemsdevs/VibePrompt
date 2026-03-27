# workflow-providerbyte-utan-konteksttapp-vsextension

## Syfte
Bygga en prompt som gor providerbyte snabbt men kontrollerat, sa att paende arbete och status inte tappas.

## Input
- Nuvarande provider och mal-provider
- Aktiv uppgift och senaste output
- Eventuella sessionsflaggor (permissions, full-auto, mode)

## Instruktioner
1. Fa en snabb snapshot av aktuell session innan byte.
2. Avsluta nuvarande provider med korrekt exit-metod.
3. Starta ny provider med motsvarande eller kompatibla flaggor.
4. Aterspela arbetskontext i komprimerad form till nya providern.
5. Verifiera att terminalen ar fungerande efter byte innan fortsattning.
6. Om byte misslyckas, rulla tillbaka till senaste stabila provider.

## Output-format
- `Pre-Switch Snapshot`
- `Switch Procedure`
- `Context Replay Block`
- `Post-Switch Verification`
- `Rollback Plan`

## Kvalitetskriterier
- Ingen onodig omstart av hela arbetsflodet
- Stabil overgang mellan providers
- Tydlig plan B vid misslyckat byte
- Reproducerbar process for team

## Varianter
- Variant A: Sakerhetsfokus (extra verifiering fore/efter byte)
- Variant B: Hastighetsfokus (minimalt antal steg)
