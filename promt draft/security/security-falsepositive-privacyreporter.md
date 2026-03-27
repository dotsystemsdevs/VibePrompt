# security-falsepositive-privacyreporter

## Syfte
Rapportera false positives med minimal datadelning och tydlig privacy-grans.

## Input
- Rule ID
- Sprak
- Reason category
- Intern notering (lokal, ej skickas)

## Instruktioner
Kopiera prompten nedan:

```text
Prepare a privacy-safe false positive report payload.

Finding:
- rule_id:
- language:
- reason_category:

Rules:
1) Include only minimal metadata required.
2) Exclude all source code, file paths, repository URLs, and line numbers.
3) Show exactly what will be sent before submission.
4) Require explicit human confirmation before sending.

Output format:
[Preview Payload]
{
  ...
}

[Excluded Data]
- code snippets
- file paths
- repo URL
- line numbers

[Confirmation Prompt]
...
```

## Output-format
- Preview payload
- Exklusionslista
- Bekräftelsesteg

## Kvalitetskriterier
- Starkt integritetsskydd
- Transparens före rapportering
- Lägre risk för dataexponering

## Varianter
- Variant A: Strict privacy mode.
- Variant B: Team mode with audit trail.
