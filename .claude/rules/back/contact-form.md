---
paths:
  - "nopillo-landing-exemple/supabase/functions/contact-form/index.ts"
---

# Rule : Edge Function contact-form

## Role
Recoit les submissions du formulaire principal (`ContactForm.tsx`). Valide email/honeypot, insere dans `public.leads` (Supabase), push vers HubSpot CRM via Contacts API (`POST /crm/v3/objects/contacts`), retourne `{ ok: true, leadId, hubspotContactId }`.

## Type
Edge Function Supabase (Deno).

## Endpoint
`POST https://kamazblxybkukpkvznkv.supabase.co/functions/v1/contact-form`
Auth : aucune (verify_jwt=false, endpoint public).

## Inputs (JSON body)
- `email` (required, validate via regex)
- `name`, `phone`, `message` (optional strings)
- `source` (default `landing-home`)
- `utm: { source, medium, campaign, term, content }` (optional)
- `gclid, search_term, match_type, device, landing_page_url` (optional)
- `hutk` (optional cookie hubspotutk)
- `honeypot` (anti-spam, si non vide → silent ok)

## Outputs
- 200 : `{ ok: true, leadId: uuid, hubspotContactId: string | null }`
- 400 : `{ error: "Email invalide" | "Nom invalide" }`
- 405 : Method not allowed (non-POST)
- 500 : `{ error: "Erreur serveur, reessayez" }`

## Side effects
1. INSERT dans `public.leads` (Supabase, via service_role)
2. POST HubSpot `/crm/v3/objects/contacts` :
   - Si 409 (exists) → search by email + PATCH (upsert)
   - Non-bloquant : si HubSpot fail, Supabase insert continue

## Secrets utilises (Deno.env.get)
- `SUPABASE_URL` (auto-injecte)
- `SUPABASE_SERVICE_ROLE_KEY` (auto-injecte)
- `HUBSPOT_API_KEY` (optionnel, `supabase secrets set HUBSPOT_API_KEY=...`)

## Dependances entrantes
- `nopillo-landing-exemple/front/src/components/sections/ContactForm.tsx` via `lib/supabase.ts::submitContactForm()`

## Dependances sortantes
- `jsr:@supabase/supabase-js@2`
- HubSpot API : `api.hubapi.com/crm/v3/objects/contacts`
- Table : `public.leads` (19 colonnes, voir migration `20260526155522_create_leads.sql`)

## Contraintes
- **CORS restreint** : `ALLOWED_ORIGINS` liste localhost + nopillo-landing-exemple.netlify.app. JAMAIS `*`.
- **Honeypot silent ok** : si `body.honeypot` rempli, retourner 200 sans rien faire (pas d'erreur visible au bot).
- **`service_role_key` jamais loggee** : check les `console.error` ne contiennent pas les credentials.
- **`pushToHubSpot` retourne null silencieusement** : si HubSpot fail, on accepte (lead sauve en Supabase). Pas de retry pour l'instant (TODO P2).
- **Split `name` → `firstname/lastname`** : fragile (`split(' ')` premier mot = firstname). Voir `docs/hubspot/forms-api/06-analyse-form-projet.md`.

## A surveiller
- Si volume > 50 req/10s par IP : passer a l'endpoint authentifie HubSpot.
- Si migration vers Forms Submissions API : remplacer `pushToHubSpot()` par `submitToHubSpotForm()` (cf migration doc).
- Si on ajoute des champs au form : update `leadData` build + migration DB pour les colonnes.
- Logs structures JSON suggeres (event/status/latency/hutk) — actuellement console.error simple.
