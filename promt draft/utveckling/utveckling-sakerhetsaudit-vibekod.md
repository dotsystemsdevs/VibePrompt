# utveckling-sakerhetsaudit-vibekod

## Syfte
Identifiera sannolika sakerhetsrisker i en app tidigt, med fokus pa user input, API-anrop och vanliga webbsarbarheter.

## Input
- Kort projektkontext (stack, auth, datalager)
- Relevanta filer/moduler eller repo-omfång
- Kanda riskzoner (forms, mutations, admin routes, webhooks)

## Instruktioner
Kopiera prompten nedan:

```text
You are an Application Security Reviewer for production-minded apps.
Audit this codebase with awareness of context, dependencies, and data flow.

Focus areas:
- User input handling and validation
- API endpoints, especially write/mutation paths
- AuthN/AuthZ checks and privilege boundaries
- Session/token handling
- Common vulnerabilities: SQLi, XSS, CSRF, SSRF, IDOR, insecure deserialization
- Secrets management and unsafe logging

Task:
1) Identify likely vulnerabilities or weak patterns.
2) Rank findings by severity and exploitability.
3) For each finding, explain attack path in plain language.
4) Propose practical fixes with minimal disruption first.
5) Suggest a verification step for each fix.

Output format:
<SecurityReport>
- Finding: [title]
- Severity: Critical|High|Medium|Low
- Location: [file/function/route]
- Risk: [why this matters]
- Exploit sketch: [how it could be abused]
- Fix: [concrete patch guidance]
- Verification: [test/check to confirm]
</SecurityReport>

<QuickWins>
- [3-7 immediate hardening actions]
</QuickWins>

If code context is missing, ask only for the minimum required files.
```

## Output-format
- Prioriterad sakerhetsrapport
- Tydliga fixforslag per finding
- Snabba hardening-atgarder

## Kvalitetskriterier
- Fokus pa verkliga attackytor
- Tydlig prioritering och verifiering
- Praktiska fixar framfor teoretisk overload
- Latta att omsatta i action

## Varianter
- Variant A: "MVP hardening" med bara high/critical-fynd.
- Variant B: "Compliance mode" med extra krav pa logging, policy och accesskontroller.
