# workflow-langchain-promptkedjor-agentorkestrering

## Syfte
Skapa en prompt som designar robusta promptkedjor och agentorkestrering for komplexa uppgifter med flera steg.

## Input
- Affarsuppgift eller use case
- Datakallor och verktyg
- Onskad output och kvalitetsniva

## Instruktioner
1. Bryt uppgiften i delsteg med tydliga in/ut-kontrakt.
2. Definiera vilka steg som bor vara chain och vilka som bor vara agent-beslut.
3. Satt validering mellan steg for att stoppa felpropagering.
4. Lagg in retry- och fallbackstrategier for misslyckade noder.
5. Definiera observability: logs, metrics, error taxonomy.
6. Leverera en enkel orkestreringsplan som kan implementeras stegvis.

## Output-format
- `Task Decomposition`
- `Chain vs Agent Decision`
- `Inter-Step Validation`
- `Retry/Fallback Rules`
- `Observability Plan`
- `Implementation Roadmap`

## Kvalitetskriterier
- Latt att debugga vid fel
- Minskar kedjefel och dataforlust
- Skalbar for fler use cases
- Tydliga beslutspunkter mellan deterministic och agentic mode

## Varianter
- Variant A: Enkel 3-stegs kedja for MVP
- Variant B: Full agentisk orkestrering med kvalitetsgrindar
