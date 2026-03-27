# security-vbw-bashguard-destructive-command-firewall

## Syfte
Skapa en security-prompt som blockerar destruktiva kommandon tidigt och tvingar sakrare alternativ innan exekvering.

## Input
- Bash-/CLI-kommando att koras
- Miljo (dev/stage/prod)
- Lista pa skyddade resurser (DB, volymer, credentials)

## Instruktioner
1. Klassificera kommandot: sakert, risk, destruktivt.
2. Matcha mot destruktiva monster (drop/reset/flush/prune/truncate/wipe).
3. Om destruktivt: blockera standard och foresla 2 sakrare alternativ.
4. Krav pa explicit override-signal innan destruktivt kommando far passera.
5. Logga alltid beslut: command, riskniva, motiv, rekommenderad nasta handling.
6. Prioritera dataintegritet och aterstallbarhet over hastighet.

## Output-format
- `Risk Classification`
- `Matched Pattern` (om nagon)
- `Decision` (Allow/Block/Require Override)
- `Safer Alternatives`
- `Audit Log Entry`

## Kvalitetskriterier
- Falska negatives ska vara sallsynta
- Beslut ska vara forklarbara
- Sakerhetsregler ska vara enkla att utoka med lokala monster
- Override far aldrig vara implicit

## Varianter
- Variant A: Strikt (blockera allt riskklassat i prod)
- Variant B: Utbildande (visa varfor + larande forslag i dev)
