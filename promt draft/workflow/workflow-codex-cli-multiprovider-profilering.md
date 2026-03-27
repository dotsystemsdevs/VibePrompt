# workflow-codex-cli-multiprovider-profilering

## Syfte
Valja och konfigurera ratt Codex-profil (GitHub proxy, ChatGPT, Azure, OpenRouter) for tasktyp, kostnad och kvalitet.

## Input
- Uppgiftstyp
- Budget
- Sekretesskrav
- Latencykrav

## Instruktioner
Kopiera prompten nedan:

```text
Design a Codex CLI profile strategy for this workflow.

Inputs:
- Task type:
- Cost sensitivity:
- Privacy/compliance constraints:
- Speed vs quality preference:

Tasks:
1) Recommend a primary model provider profile.
2) Recommend one fallback profile.
3) Set approval policy and sandbox mode.
4) Set reasoning effort + summary level by task type.
5) Add when-to-switch rules.

Output format:
[Primary Profile]
- Provider:
- Why:
- Suggested settings:

[Fallback Profile]
- Provider:
- Trigger to switch:

[Policy Settings]
- approval_policy:
- sandbox_mode:
- network_access:

[Reasoning Settings]
- simple tasks:
- complex tasks:
```

## Output-format
- Primar + fallback profil
- Policy/sandbox beslut
- Resonemangsinställningar per task

## Kvalitetskriterier
- Stabil kvalitet till ratt kostnad
- Snabb eskalering vid blockerare
- Mindre ad hoc modellhoppande

## Varianter
- Variant A: Solo maker.
- Variant B: Team med compliancekrav.
