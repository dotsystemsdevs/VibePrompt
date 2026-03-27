# prompting-50starter-archetype-router

## Syfte
Routa en koduppgift till ratt prompt-archetype for snabbare och stabilare resultat.

## Input
- Uppgift
- Teknikstack
- Onskat resultat
- Riskniva

## Instruktioner
Kopiera prompten nedan:

```text
You are a prompt archetype router for coding tasks.
Classify the request into ONE primary archetype:
- scaffold
- refinement
- debugging
- translator
- sandbox
- collaborator
- guardrail
- utility

Task:
[insert task]

Context:
- Stack:
- Constraints:
- Deadline:

Rules:
1) Pick one primary archetype and one optional secondary.
2) Explain why in max 3 bullets.
3) Generate the best prompt template for that archetype.
4) Include success criteria and a verify checklist.

Output format:
[Archetype Selection]
- Primary:
- Secondary (optional):
- Why:

[Prompt Template]
...

[Success Criteria]
- ...

[Verify Checklist]
- ...
```

## Output-format
- Val av archetype
- Fardig prompttemplate
- Success criteria + verify

## Kvalitetskriterier
- Snabb routing till ratt arbetssatt
- Minskar slentrianprompting
- Hogre konsekvens i kvalitet

## Varianter
- Variant A: Nyborjare (forklarar val tydligare).
- Variant B: Senior (kort val + direkt template).
