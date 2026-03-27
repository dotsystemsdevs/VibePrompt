# ui-design2code-vibeflod-skiss-till-prodkod

## Syfte
Skapa en prompt som tar UI-idé, skiss eller screenshot till strukturerad, implementerbar frontendkod via AI-designverktyg och kodassistenter.

## Input
- UI-referens (text, skiss eller screenshot)
- Malsystem (web/mobile)
- Designkrav (komponentstil, tillganglighet, responsivitet)

## Instruktioner
1. Extrahera layout, komponenter och interaktioner fran underlaget.
2. Oversatt designen till komponentplan (sektioner, states, props).
3. Satt kvalitetskrav for tillganglighet och responsivitet.
4. Generera kodstruktur i tydliga steg: scaffold -> styling -> beteende.
5. Definiera review-gate innan implementation anses klar.
6. Ge forslag pa hur designen finjusteras efter första render.

## Output-format
- `Design Extraction`
- `Component Map`
- `Implementation Plan`
- `Quality Gates`
- `Refinement Loop`

## Kvalitetskriterier
- Spårbarhet mellan design och kod
- God UX-bas och tillganglighet
- Ingen overgenerisk "AI-slop"-layout
- Klar for praktisk vidareutveckling

## Varianter
- Variant A: Snabb MVP-render for validering
- Variant B: Produktionsredo UI med strikt designsystemdisciplin
