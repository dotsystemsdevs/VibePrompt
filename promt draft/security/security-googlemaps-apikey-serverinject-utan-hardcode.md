# security-googlemaps-apikey-serverinject-utan-hardcode

## Syfte
Skapa en säkerhetsprompt som skyddar Google Maps API-nycklar via server-side injektion istallet for hardkodning i klienten.

## Input
- Servermiljo (Node/Express)
- Frontendfil med API placeholder
- Nyckelmiljo i `.env`

## Instruktioner
1. Las in API-nyckel fran miljovariabel pa serversidan.
2. Injektera nyckeln i HTML vid request-time via placeholder replacement.
3. Blockera start om nyckeln saknas och ge tydligt felmeddelande.
4. Tydlig separering mellan statisk filserver och root-route injektion.
5. Ge rekommendationer for key restrictions i Google Cloud.
6. Avsluta med en kort security-checklista for deployment.

## Output-format
- `Threat Model`
- `Secure Injection Flow`
- `Failure Modes`
- `Cloud Key Restrictions`
- `Deployment Checklist`

## Kvalitetskriterier
- Nyckeln exponeras inte i repo
- Fail-fast vid felkonfiguration
- Enkel lokal utveckling utan osaker workaround
- Produktionsnara säkerhetsniva

## Varianter
- Variant A: Lokal dev med enkel env-hantering
- Variant B: Produktion med strikt doman- och API-restriktion
