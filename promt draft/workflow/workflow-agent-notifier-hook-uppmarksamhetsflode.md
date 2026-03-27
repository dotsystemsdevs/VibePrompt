# workflow-agent-notifier-hook-uppmarksamhetsflode

## Syfte
Skapa notifieringshook for AI-kodagent som larmar vid input-vantan, permissions, fel och vanliga statusuppdateringar.

## Input
- Hook-event payload (JSON)
- Plattform (macOS/Windows/Linux)
- Onskade notifieringskanaler (desktop/sound/log)

## Instruktioner
Kopiera prompten nedan:

```text
Build a notification hook that reads JSON events from stdin and alerts the developer.

Event format:
{
  "message": "..."
}

Required behavior:
1) Classify message intent by keywords:
   - waiting/input -> pending user action
   - permission/confirm -> approval needed
   - error/failed -> warning
   - else -> normal update
2) Prefix message with a visual indicator (emoji/severity tag).
3) Trigger desktop notification with sound where available.
4) Use platform-specific fallback when primary notifier is unavailable.
5) Fail gracefully and log errors to stderr.

Output format:
[Hook Logic]
...

[Message Classification Table]
- keyword -> notification type

[Platform Strategy]
- macOS:
- Windows:
- Linux:

[Failure Handling]
- ...
```

## Output-format
- Hooklogik
- Klassificeringsregler
- Plattformsspecifik notifieringsstrategi

## Kvalitetskriterier
- Missar inte viktiga agentstopp
- Tydlig signal pa vilken typ av atgard som behovs
- Robust fallback och tydlig felrapportering

## Varianter
- Variant A: Desktop-only notiser.
- Variant B: Desktop + Slack/Discord webhook escalation.
