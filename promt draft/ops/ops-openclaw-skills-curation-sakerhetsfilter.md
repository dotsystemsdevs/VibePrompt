# ops-openclaw-skills-curation-sakerhetsfilter

## Syfte
Skapa en prompt som valjer och granskar OpenClaw-skills innan installation, med fokus pa nytta, kompatibilitet och sakerhet.

## Input
- Lista med kandidat-skills
- Malmiljo (workspace/global)
- Onskad funktion (automation, integration, workflow)

## Instruktioner
1. Ranka skills efter relevans mot malet.
2. Kontrollera beroenden, underhallssignal och dokumentationskvalitet.
3. Satt riskklass for varje skill (low/medium/high).
4. Blockera eller flagga skills med oklar kodkvalitet/sakerhetsrisk.
5. Rekommendera installationsordning och rollback-plan.
6. Ge en kort efterkontroll efter installation.

## Output-format
- `Skill Evaluation Table`
- `Risk Classification`
- `Install Order`
- `Rollback Steps`
- `Post-Install Checks`

## Kvalitetskriterier
- Nytta fore novelty
- Sakerhetsmedveten skill-curering
- Tydlig installation och avinstallation
- Ateranvandbar process for team

## Varianter
- Variant A: Conservative mode for production-like miljo
- Variant B: Experimental mode for snabb utforskning
