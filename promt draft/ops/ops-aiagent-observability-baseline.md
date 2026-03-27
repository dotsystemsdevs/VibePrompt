# ops-aiagent-observability-baseline

## Syfte
Skapa en praktisk baseline for drift av AI/LLM-tjanster med loggning, metrics, tracing och alerting.

## Input
- Tjanstetyp (RAG API, voice agent, assistant)
- SLO-mal (latency, uptime, error budget)
- Miljo (dev/staging/prod)

## Instruktioner
Kopiera prompten nedan:

```text
You are an AI service reliability engineer.
Design an observability baseline for my production LLM/RAG service.

Include:
1) Logging strategy (structured logs, correlation IDs, redaction rules)
2) Metrics (request rate, latency, error rate, token usage, retrieval hit rate)
3) Tracing (request path across retrieval -> model -> response)
4) Alerting (critical vs warning)
5) Dashboard layout for fast incident triage

Constraints:
- Include PII-safe logging guidance.
- Keep setup practical for small teams.
- Define what to monitor first vs later.

Output format:
<MonitoringSpec>
- Signals:
- Collection method:
- Owner:
</MonitoringSpec>

<Alerts>
- Alert:
  - Trigger:
  - Severity:
  - Runbook first action:
</Alerts>

<Dashboards>
- Executive dashboard
- On-call dashboard
- Model quality dashboard
</Dashboards>
```

## Output-format
- Baseline-spec for observability
- Prioriterade larm och runbook-forsta steg
- Dashboard-plan for olika behov

## Kvalitetskriterier
- Snabb incidentdetektering
- PII-saker loggning
- Praktiskt for mindre team
- Tydlig prioritering av signaler

## Varianter
- Variant A: Minimal setup (logs + 5 kritiska metrics).
- Variant B: Full setup (metrics + traces + SLO-baserad alerting).
