---
paths:
  - "nopillo-landing-exemple/supabase/functions/hubspot-form-submit/index.ts"
---

# Rule : Edge Function hubspot-form-submit

## Role
Forwarde des submissions vers le form HubSpot `107536bf-c2cb-44de-89ea-8c3101f83870` (portal `26173790`, region eu1) via Forms Submissions API v3 publique. Valide les inputs typed (enums dropdowns + email), sanitize hutk, retourne `{ ok, hubspotMessage }`.

## Type
Edge Function Supabase (Deno). Genere par skill `/hubspot-edge-form`.

## Endpoint
`POST https://kamazblxybkukpkvznkv.supabase.co/functions/v1/hubspot-form-submit`
Auth : aucune (verify_jwt=false).

## Inputs (JSON body)
- `email` (optional, validate format)
- `maturite_du_projet` (optional, enum 4 valeurs)
- `date_du_projet_estime` (optional, enum 4 valeurs)
- `type_de_projet_envisage` (optional, enum 5 valeurs)
- `hutk` (optional, sanitize via regex `^[a-f0-9]{32}$`)
- `pageUri`, `pageName` (optional, contexte HubSpot)
- `honeypot` (anti-spam)

## Enums autorises (extracted from form definition)
- ENUM_MATURITE : "Je débute ma réflexion", "J'ai un projet d'achat mais rien de signé", "J'ai une promesse de vente", "J'ai déjà un bien à louer ou déjà loué"
- ENUM_DATE : "Moins de 3 mois", "3 à 6 mois", "Plus de 6 mois", "Je ne sais pas"
- ENUM_TYPE : "LMNP / Meublé", "Location nue", "SCI", "Autre", "Je ne sais pas"

## Outputs
- 200 : `{ ok: true, hubspotMessage, redirectUri }`
- 400 : `{ ok: false, error }` (validation echouee : email, enum, payload vide, JSON invalide)
- 502 : `{ ok: false, error, details }` (HubSpot a rejete ou erreur reseau)
- 429 : `{ ok: false, error }` (rate limit HubSpot)

## Side effects
- POST vers `api-eu1.hsforms.com/submissions/v3/integration/submit/26173790/107536bf-...`
- Retry exponential backoff sur 429/5xx (max 3, delais 0.8s → 1.6s → 3.2s)
- Logs JSON structures : `event`, `status`, `latencyMs`, `fieldsCount`, `hutkPresent`

## Dependances entrantes
- Aucune cote landing actuelle (genere mais pas encore branche au front)
- Sera utilise pour formulaires multi-champs avec workflows HubSpot

## Dependances sortantes
- HubSpot Forms API : `api-eu1.hsforms.com/submissions/v3/integration/submit/...`
- Aucune dependance Supabase (pas d'insert local)
- `Deno.env.get('x-forwarded-for')` pour `context.ipAddress`

## Contraintes
- **Region EU dans l'URL** : `api-eu1.hsforms.com`. Ne pas changer en `api.hsforms.com` (pourrait rediriger mais latence +).
- **`sanitizeHutk` obligatoire** : HubSpot retourne `INVALID_HUTK` si format incorrect. Le filtre regex 32 hex evite le rejet de la submission entiere.
- **CORS restreint** : meme pattern que contact-form (localhost + prod URL).
- **Honeypot silent ok** : si rempli, NE PAS forwarder a HubSpot.
- **Au moins 1 champ requis** : sinon retourne 400 "Aucun champ rempli". Sinon HubSpot crearait un contact vide.
- **`skipValidation: false` (default)** : on laisse HubSpot valider en plus de nos enums.

## A surveiller
- Si nouveaux champs ajoutes au form HubSpot UI : regenerer via `/hubspot-edge-form <url>` pour re-fetch les enums.
- Si le form est archived ou supprime : 404 cote HubSpot → retour 502 avec details.
- Si activation OAuth secure endpoint (rate limit superieur) : changer URL en `/secure/submit/` + header `Authorization: Bearer pat-...`.
- Si workflow HubSpot attache au form fail : visible dans HubSpot UI → Forms → Performance.
