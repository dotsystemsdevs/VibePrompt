# security-masterfixprompt-generator-severityordning

## Syfte
Generera en enda masterprompt som fixar flera sårbarheter systematiskt i severity-ordning.

## Input
- Findings-lista (med fil, rad, CWE/CVE, severity)
- Projektkontext
- Testkommandon

## Instruktioner
Kopiera prompten nedan:

```text
Generate a single master fix prompt for all security findings.

Input findings:
[paste findings]

Requirements:
1) Deduplicate overlapping findings.
2) Group by vulnerability type.
3) Order by severity: critical -> high -> medium -> low.
4) For each finding include:
   - vulnerable pattern
   - exact fix pattern
   - verification step
5) Add final checklist for regression and security re-scan.

Output format:
[Master Fix Prompt]
...

[Deduplicated Findings Table]
- ...

[Verification Checklist]
- ...
```

## Output-format
- Master fix prompt
- Dedupliceringsöversikt
- Slutverifiering

## Kvalitetskriterier
- Färre dubbeljobb
- Klar ordning vid stora finding-mängder
- Hög chans till “first-pass correct” fixar

## Varianter
- Variant A: API/backend security issues.
- Variant B: Fullstack security issues.
