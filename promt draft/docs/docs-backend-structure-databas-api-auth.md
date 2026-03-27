# docs-backend-structure-databas-api-auth

## Syfte
Definiera backendarkitektur, databasschema och API-kontrakt i detalj före implementation.

## Input
- Domänmodeller
- Behörighetskrav
- API-användning

## Instruktioner
Kopiera prompten nedan:

```text
Create BACKEND_STRUCTURE.md for this project.

Include:
1) Backend architecture overview
2) Database schema with exact field types and constraints
3) Relationships and indexing strategy
4) Authentication + session strategy
5) API endpoint contracts (request/response/errors)
6) Validation rules and error schema
7) Caching and versioning strategy

Rules:
- Use exact data types and constraints.
- Separate DB schema from API abstraction.
- Include security requirements for auth and sensitive data.

Output format:
[BACKEND_STRUCTURE]
...
```

## Output-format
- BACKEND_STRUCTURE.md med schema + API-spec

## Kvalitetskriterier
- Mindre backend-hallucination
- Tydliga kontrakt mellan frontend och backend
- Robust auth/data-integritet

## Varianter
- Variant A: Monolith API.
- Variant B: Service-oriented backend.
