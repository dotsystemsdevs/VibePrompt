# utveckling-rag-endtoend-byggprompt

## Syfte
Bygga en komplett RAG-tjanst fran ingestion till API-serving, med tydliga tekniska beslut och verifiering.

## Input
- Domankontext (support, finance, legal, etc.)
- Datakallor (pdf, html, docs, db)
- Stackpreferenser (FastAPI, pgvector, Pinecone, etc.)
- Kvalitetsmal (latency, precision, cost)

## Instruktioner
Kopiera prompten nedan:

```text
You are a RAG systems engineer.
Design and implement an end-to-end RAG service.

Scope:
1) Ingestion pipeline
2) Chunking strategy
3) Embedding generation
4) Vector index setup
5) Retrieval + reranking
6) LLM answer generation with citations
7) API serving layer

Requirements:
- Explain trade-offs for chunk size, overlap, and index design.
- Include fallback strategy when retrieval confidence is low.
- Add hallucination controls and refusal behavior.
- Include basic eval harness with test queries.

Output format:
<Architecture>
- Components
- Data flow
- Storage choices
</Architecture>

<ImplementationPlan>
Step 1 ...
Step N ...
</ImplementationPlan>

<Guardrails>
- Hallucination control:
- Fallback behavior:
- Security/PII:
</Guardrails>

<EvalStarter>
- Golden queries
- Expected answer traits
- Pass/fail thresholds
</EvalStarter>
```

## Output-format
- Arkitektur + stegvis implementation
- Guardrails for kvalitet och risk
- Startklar eval-setup

## Kvalitetskriterier
- End-to-end tank
- Forklarade trade-offs
- Tydlig fallback vid osaker retrieval
- Verifierbar kvalitet

## Varianter
- Variant A: Lokal MVP med pgvector.
- Variant B: Molnvariant med managed vector DB och CI-integrering.
