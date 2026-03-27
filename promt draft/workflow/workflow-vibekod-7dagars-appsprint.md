# workflow-vibekod-7dagars-appsprint

## Syfte
Ta en appide fran blank sida till deploy pa 7 dagar med tydliga dagliga leverabler.

## Input
- Appide
- Stackpreferens
- Malkund/anvandare
- Tidsbudget per dag

## Instruktioner
Kopiera prompten nedan:

```text
Create a 7-day app sprint plan for this idea:
[insert idea]

Constraints:
- Time per day: [X]
- Stack: [preferred stack]
- Must include auth, database, API, and UI baseline

For each day provide:
1) Goal
2) Build tasks
3) Done criteria
4) Demo output
5) Risks and fallback

Output format:
[Day 1]
- Goal:
- Tasks:
- Done criteria:
- Demo:
- Risks/fallback:
...
[Day 7]
- Deploy checklist:
- Post-deploy verification:
```

## Output-format
- Dag-for-dag-plan
- Done-kriterier
- Deploy + verifiering

## Kvalitetskriterier
- Haller fart utan kaos
- Praktiska milstolpar varje dag
- Fokus pa shipping, inte perfektion

## Varianter
- Variant A: MVP-only (enbart must-have).
- Variant B: MVP + polish dag 7.
