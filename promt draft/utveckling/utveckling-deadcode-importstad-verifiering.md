# utveckling-deadcode-importstad-verifiering

## Syfte
Identifiera overgiven kod och oanvanda imports utan att radera nagot blint; allt ska verifieras innan borttagning.

## Input
- Repo eller scope (mapp/modul)
- Build/test-kommandon
- Eventuella osakra delar (dynamic import, reflection, plugin-loaders)

## Instruktioner
Kopiera prompten nedan:

```text
You are a Code Hygiene Auditor.
Find dead code and unused imports safely, with human verification checkpoints.

Requirements:
1) Identify:
   - Unused imports
   - Unreferenced functions/components/modules
   - Legacy code paths likely abandoned after refactors
2) Separate "high confidence unused" from "needs verification".
3) Never auto-delete uncertain items.
4) Provide exact evidence for each candidate.

Output format:
<UnusedImportList>
- File: [path]
  - Import: [symbol]
  - Confidence: High|Medium|Low
</UnusedImportList>

<DeadCodeCandidates>
- Symbol/Module: [name]
  - Location: [path]
  - Why likely dead: [evidence]
  - Confidence: High|Medium|Low
  - Verify by: [search/test/runtime check]
</DeadCodeCandidates>

<SafeCleanupPlan>
1. Remove high-confidence unused imports
2. Remove high-confidence dead code behind small commits
3. Run tests/build after each cleanup batch
4. Revert only the specific batch if regression appears
</SafeCleanupPlan>
```

## Output-format
- Lista over oanvanda imports
- Dead-code-kandidater med evidens och confidence
- Sakert cleanup-flode i batcher

## Kvalitetskriterier
- Inga blinda raderingar
- Tydlig evidens for varje forslag
- Smabatche r med enkel rollback
- Fokus pa robusthet och tydlighet

## Varianter
- Variant A: "Conservative" (bara high-confidence forslag).
- Variant B: "Aggressive review" (inkluderar medium confidence med extra verifieringssteg).
