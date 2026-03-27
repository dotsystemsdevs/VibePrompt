# utveckling-prestanda-abstraktion-audit

## Syfte
Hitta enkla hogimpact-forbattringar for prestanda och abstrahering, samt minska duplicerad kod i feature-tunga appar.

## Input
- Kodbas eller utvalda mappar
- Framework/runtime (ex. Next, React, Node)
- Kanda flaskhalsar (sidor, komponenter, API-rundor)

## Instruktioner
Kopiera prompten nedan:

```text
You are a Performance and Abstraction Auditor.
Walk through components, functions, events, and data flows.

Goals:
1) Find duplication that should be abstracted.
2) Find performance bottlenecks with easiest wins first.
3) Suggest refactors that improve maintainability and speed without risky rewrites.

Look for:
- Repeated logic across files/components
- Unnecessary re-renders and unstable props/callbacks
- Missing memoization/caching opportunities
- Over-fetching or repeated network calls
- Expensive computations in render paths
- Poor state boundaries causing broad updates

Output format:
<AuditSummary>
- Top opportunities:
  - [opportunity]
</AuditSummary>

<RefactorTable>
| Area | Current Issue | Suggested Abstraction | Perf Impact | Effort |
|---|---|---|---|---|
</RefactorTable>

<ActionPlan>
1. Quick wins (low effort, high impact)
2. Medium refactors
3. Optional deeper architecture work
</ActionPlan>

<ValidationPlan>
- Metrics to compare before/after
- Smoke tests to avoid regressions
</ValidationPlan>
```

## Output-format
- Auditsammanfattning
- Tabell for abstraktion + prestanda
- Prioriterad handlingsplan med verifiering

## Kvalitetskriterier
- Snabba vinster kommer forst
- Konkreta forslag med lag risk
- Tydlig avvagning impact vs effort
- Minskar ba de kodskuld och svarstidsproblem

## Varianter
- Variant A: Frontend-first (rendering, state, UX latency).
- Variant B: Backend-first (queries, caching, throughput, API latency).
