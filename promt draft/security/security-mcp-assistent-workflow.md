# security-mcp-assistent-workflow

## Syfte
Använda MCP-kompatibel assistent för att skanna, fixa och följa upp säkerhetsproblem i ett samtalsflöde.

## Input
- Repo-URL
- Tillgängliga MCP-tools
- Triage-policy

## Instruktioner
Kopiera prompten nedan:

```text
Use MCP security tools to run this workflow end-to-end.

Repository:
[insert repo]

Tool flow:
1) Start scan
2) Poll status until complete
3) Fetch findings
4) Generate fix plan/task list
5) Execute fixes in severity order
6) Re-scan and compare delta

Assistant behavior:
- Report progress transparently
- Ask confirmation before risky operations
- Keep a live task checklist

Output format:
[MCP Tool Calls Plan]
...

[Progress Updates]
...

[Fix Execution Summary]
...

[Re-scan Delta]
- before:
- after:
```

## Output-format
- MCP-verktygsplan
- Progresslogg
- Re-scan delta

## Kvalitetskriterier
- Full spårbarhet i assistentflöde
- Mindre manuellt koordinationsarbete
- Verifierad förbättring efter fixes

## Varianter
- Variant A: Read-only audit mode.
- Variant B: Active remediation mode.
