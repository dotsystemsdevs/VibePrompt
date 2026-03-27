# workflow-instruction-reflector-agentsmd-evolution

## Syfte
Forbattra `AGENTS.md` iterativt baserat pa verkliga sessionsfel och framgangsmönster.

## Input
- Chat/sessionhistorik
- Nuvarande AGENTS.md
- Observerade missforstand

## Instruktioner
Kopiera prompten nedan:

```text
Analyze conversation history and propose AGENTS.md improvements.

Steps:
1) Identify instruction failures and ambiguities.
2) Propose precise instruction changes.
3) Explain expected behavior improvements.
4) Apply only approved changes.
5) Output a complete updated AGENTS.md draft.

Output format:
[Analysis]
- issue:
  - evidence:
  - impact:

[Proposed Improvements]
- section:
  - new text:
  - why:

[Final AGENTS Draft]
...
```

## Output-format
- Evidensbaserad analys
- Forbattrade instruktioner
- Full ny AGENTS-draft

## Kvalitetskriterier
- Färre återkommande missar
- Tydligare agentbeteende
- Högre träffsäkerhet över tid

## Varianter
- Variant A: Conservative edits only.
- Variant B: Aggressive refactor of instruction set.
