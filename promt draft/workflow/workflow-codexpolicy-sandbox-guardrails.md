# workflow-codexpolicy-sandbox-guardrails

## Syfte
Skapa ett tydligt policylager for tillatna, promptade och forbjuda kommandon i agentfloden.

## Input
- Riskprofil
- CI/CD-krav
- Kommandofamiljer som maste skyddas

## Instruktioner
Kopiera prompten nedan:

```text
Design a codex policy with command-level guardrails.

Requirements:
1) Define allow rules for safe read-only commands.
2) Define prompt-required rules for risky git/network actions.
3) Define forbidden rules for destructive operations.
4) Add rationale for each rule.
5) Include emergency override process.

Output format:
[Allow Rules]
- command pattern:
- rationale:

[Prompt Rules]
- command pattern:
- rationale:

[Forbidden Rules]
- command pattern:
- rationale:

[Override Procedure]
- ...
```

## Output-format
- Policystruktur (allow/prompt/forbidden)
- Motivering per regel
- Override-rutin

## Kvalitetskriterier
- Mindre oavsiktliga destruktiva actions
- Tydliga riskgranser
- Latt att underhalla policy over tid

## Varianter
- Variant A: Conservative policy.
- Variant B: High-autonomy policy med fler promptgates.
