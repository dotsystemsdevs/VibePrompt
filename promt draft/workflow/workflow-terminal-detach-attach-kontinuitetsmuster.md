# workflow-terminal-detach-attach-kontinuitetsmuster

## Syfte
Skapa en prompt som bevarar arbetsflode och fokus nar terminalen flyttas mellan inbaddat och fristaende lage.

## Input
- Nuvarande terminallage (attached/detached)
- Aktiv session och uppgift
- Onskat lage efter flytt

## Instruktioner
1. Ta en session snapshot innan detach/attach.
2. Flytta terminalen utan att bryta paende promptkontext.
3. Bekrafta att output fortsatt streamar korrekt i nya laget.
4. Aterstall layoutpreferenser och promptyta efter flytt.
5. Om UI eller terminal blir inkonsistent: utfor snabb recover-sekvens.
6. Rapportera klart nar anvandaren kan fortsatta utan kontextforlust.

## Output-format
- `Pre-Move Snapshot`
- `Transition Steps`
- `Post-Move Health Check`
- `Layout State`
- `Recovery Actions` (vid behov)

## Kvalitetskriterier
- Ingen forlorad sessionhistorik
- Forutsagbar UX efter flytt
- Snabb detektion av rendering/fokusproblem
- Latt att repetera i dagligt arbete

## Varianter
- Variant A: Fokus pa maximal promptyta vid detached lage
- Variant B: Fokus pa stabil inbyggd panel for vardagligt arbete
