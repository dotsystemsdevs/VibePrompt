# larande-bygg-och-forklara-kod

## Syfte
Gora varje kodforandring till larande genom att AI bade implementerar och forklarar vad som gjordes.

## Input
- Feature eller bugg
- Relevanta filer
- Onskat djup pa forklaring (kort/normal/djup)

## Instruktioner
Kopiera prompten nedan:

```text
Add [feature/fix], and explain what you are doing so I can learn.

Rules:
1) First: restate the task in one sentence.
2) Implement in small steps.
3) After each step, explain:
   - what changed
   - why this approach
   - one tradeoff or alternative
4) Keep explanation practical and tied to this codebase.
5) Do not dump theory unless I ask.
6) End with a short "how to verify" checklist.

Output format:
<Plan>...</Plan>
<Changes>...</Changes>
<Explanation>...</Explanation>
<Verify>...</Verify>
```

## Output-format
- Liten plan
- Implementationssteg
- Larandeforklaring per steg
- Verifieringschecklista

## Kvalitetskriterier
- Kod + forstaelse i samma flode
- Koncept forankrat i faktisk kod
- Enkel verifiering efterat
- Ingen onodig utfyllnad

## Varianter
- Variant A: "Explain in short" (max 3 bullets per steg).
- Variant B: "Teach mode" med extra minilektion efter varje steg.
