# prompting-vibekod-5golden-rules-master

## Syfte
Samla de fem gyllene prompting-reglerna i en enda masterprompt for konsekvent hog kvalitet.

## Input
- Uppgift
- Berorda filer
- Malbeteende
- Begransningar

## Instruktioner
Kopiera prompten nedan:

```text
Use this 5-rule prompting protocol for the task below.

Task:
[insert task]

Context files:
[@file1 @file2 ...]

Desired behavior:
[insert expected behavior]

Rules:
1) Be explicit with context (reference exact files/modules).
2) Focus on behavior/outcome before implementation details.
3) For complex work: plan first, then execute step 1.
4) Use role framing only when it improves judgment.
5) Prefer iterative delivery over one giant change.

Output format:
[Task Understanding]
- ...

[Behavior Target]
- ...

[Step Plan]
1) ...
2) ...

[Execute Step 1]
...

[Verify]
- ...
```

## Output-format
- Taskforstaelse
- Beteendemal
- Plan + forsta exekveringssteg
- Verifiering

## Kvalitetskriterier
- Tydlig kontext och avgransning
- Mindre one-shot missar
- Stabilt iterativt arbetssatt

## Varianter
- Variant A: Kortlage (max 5 bullets totalt).
- Variant B: Djupmode med risklista och rollback-plan.
