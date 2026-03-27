# arkitektur-ultradeep-discovery-research-design

## Syfte
Kora en rigoros arkitekturprocess: discovery -> research -> design -> implementation guide -> failure analysis.

## Input
- Produktide
- Driftskrav
- Sakerhetskrav
- Budget/tidsram

## Instruktioner
Kopiera prompten nedan:

```text
Enter ultra-deep architecture mode.

Phase 1: Discovery (mandatory)
- Extract all requirements.
- Ask clarifying questions on:
  - core functionality
  - user access patterns
  - persistence
  - external integrations
  - performance
  - security/compliance
  - budget constraints

Phase 2: Research
- Compare at least 3 options per major component.
- Validate maintenance status of key libraries.
- Identify security risks for proposed stack.

Phase 3: Design Document
Produce exact sections:
1) Executive Summary
2) Technology Stack with trade-offs
3) Project Structure
4) Data Models
5) API Contracts
6) Security Architecture
7) Error Handling Strategy
8) Testing Strategy
9) Performance Plan
10) Deployment Architecture

Phase 4: Coder-Agent Instructions
- Exact implementation order
- package list
- critical rules
- verification checklist

Phase 5: Stress Test
- 3 likely production failures
- prevention per failure
- 2 rejected alternatives and why
```

## Output-format
- Komplett arkitekturdokument + implementeringsguide

## Kvalitetskriterier
- Full spårbarhet beslut->trade-off->implementation
- Security/perf inbyggt, inte eftertanke
- Junior-dev ska kunna implementera utan gissning

## Varianter
- Variant A: Startup MVP.
- Variant B: Enterprise system med compliance.
