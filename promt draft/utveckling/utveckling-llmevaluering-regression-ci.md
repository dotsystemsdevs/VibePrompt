# utveckling-llmevaluering-regression-ci

## Syfte
Satta upp ett robust eval- och regressionstank for LLM/RAG-system sa kvalitet kan skyddas over tid.

## Input
- Produktens use cases
- Exempelkonversationer/frågor
- Risktyper (hallucination, policyfel, latency, cost)
- CI-miljo

## Instruktioner
Kopiera prompten nedan:

```text
You are an LLM quality engineer.
Create an evaluation and regression testing framework for my LLM/RAG application.

Tasks:
1) Define evaluation dimensions:
   - correctness
   - groundedness/citations
   - safety/policy
   - latency
   - cost
2) Build a golden test set strategy:
   - seed cases
   - edge cases
   - adversarial cases
3) Propose quality gates for CI/CD.
4) Define fail conditions and rollback triggers.

Output format:
<EvalDimensions>
- Metric:
  - Why it matters:
  - How to measure:
</EvalDimensions>

<GoldenSetPlan>
- Category:
  - Example test:
  - Expected behavior:
</GoldenSetPlan>

<CIGates>
- Gate name:
  - Threshold:
  - Block release when:
</CIGates>

<RegressionWorkflow>
1. Pre-merge checks
2. Nightly runs
3. Alerting + triage
</RegressionWorkflow>
```

## Output-format
- Evaldimensioner med matmetoder
- Golden set-plan
- CI-gates med tydliga thresholds

## Kvalitetskriterier
- Mattbar kvalitet
- Tydliga releaseblockers
- Tacker bade precision och driftkostnad
- Enkel att automationskoppla

## Varianter
- Variant A: Lean setup for litet team.
- Variant B: Enterprise setup med fler riskklassningar och formaliserad triage.
