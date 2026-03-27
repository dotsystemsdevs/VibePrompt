# docs-techstack-versionlasta-beslutslogg

## Syfte
Låsa teknikval med exakta versioner, kompatibilitet och trade-offs för reproducerbar utveckling.

## Input
- Produktkrav
- Teamkompetens
- Driftmiljö

## Instruktioner
Kopiera prompten nedan:

```text
Create TECH_STACK.md with exact versions and rationale.

Include sections:
1) Architecture pattern and deployment model
2) Frontend stack (framework, state, styling, forms, types)
3) Backend stack (runtime, framework, DB, auth, caching, storage)
4) DevOps (CI/CD, hosting, version control strategy)
5) Security and observability dependencies
6) Upgrade policy and breaking change rules

Rules:
- No "latest" versions.
- Justify each key choice.
- List alternatives considered and why rejected.
- Include install/setup snippets.

Output format:
[TECH_STACK]
...
```

## Output-format
- TECH_STACK.md med versionslås

## Kvalitetskriterier
- Reproducerbar setup
- Mindre stack-drift mellan miljöer
- Tydlig beslutslogg för framtida ändringar

## Varianter
- Variant A: Startup stack.
- Variant B: Enterprise-compliant stack.
