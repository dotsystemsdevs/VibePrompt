# docs-frontend-guidelines-designtokens-komponentregler

## Syfte
Låsa designsystem och komponentregler så AI bygger konsekvent UI enligt spec.

## Input
- Brandstil
- Komponentbehov
- A11y-krav

## Instruktioner
Kopiera prompten nedan:

```text
Create FRONTEND_GUIDELINES.md as a strict design system spec.

Must include:
1) Design principles
2) Design tokens (colors, typography, spacing, radius)
3) Usage rules for tokens
4) Component specs (button/input/card/modal etc.)
5) Variant/state rules (default/hover/focus/error/disabled/loading)
6) Accessibility standards (WCAG level + keyboard behavior)
7) Code examples for each core component

Rules:
- Use explicit token values.
- Define when to use each component variant.
- Keep classes and naming conventions consistent.

Output format:
[FRONTEND_GUIDELINES]
...
```

## Output-format
- FRONTEND_GUIDELINES.md med tokens + komponentregler

## Kvalitetskriterier
- Visuell konsekvens
- Färre AI-genererade UI-avvikelser
- Stark a11y-bas

## Varianter
- Variant A: Tailwind-based system.
- Variant B: CSS variables + component library system.
