---
paths:
  - "nopillo-landing-exemple/supabase/**"
---

# Regles backend generiques — nopillo-landing-exemple

> Regles transverses au dossier `nopillo-landing-exemple/supabase/`. Pour les regles specifiques par Edge Function voir `.claude/rules/back/*.md`.

## Stack
Supabase (Postgres + Edge Functions Deno) sur projet `kamazblxybkukpkvznkv` (EU region).

## Migrations
- 1 migration = 1 fichier `<YYYYMMDDHHMMSS>_<description>.sql`.
- Toujours `CREATE TABLE IF NOT EXISTS` pour idempotence.
- RLS active par defaut : `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`.
- Aucune policy publique sans justification ecrite en commentaire SQL.
- Application via :
  - `mcp__supabase__apply_migration` (preferentiel, traceable)
  - OU Supabase Management API `/v1/projects/{ref}/database/query`
  - JAMAIS `psql` direct sur prod.

## Edge Functions
- Runtime Deno, imports via `jsr:` ou `npm:`.
- 2 functions actives : `contact-form`, `hubspot-form-submit` (voir rules `back/`).
- Validation inputs systematique (email regex, longueur, enum check).
- CORS restreint a `ALLOWED_ORIGINS` (localhost + prod). JAMAIS `*`.
- Honeypot anti-spam (`honeypot` field) → silent ok si rempli.
- Deploy : `supabase functions deploy <name> --no-verify-jwt --project-ref kamazblxybkukpkvznkv`.
- CLI Supabase >= 2.45 requise (bundle sans Docker).

## Schema leads (table publique principale)
- 19 colonnes : id, email, name, phone, message, source, utm_*, gclid, search_term, match_type, device, landing_page_url, hubspot_contact_id, payload (jsonb), created_at.
- Index sur created_at DESC, email, source, utm_term, gclid.
- RLS active, pas de policy publique → insertion via service_role uniquement (Edge Function).

## Secrets (Deno.env)
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` : auto-injectes dans Edge Function.
- `HUBSPOT_API_KEY` : set via `supabase secrets set HUBSPOT_API_KEY=pat-... --project-ref kamazblxybkukpkvznkv`.
- JAMAIS dans le code source, les logs, les README.

## A ne pas faire
- Pas de `SELECT *` en RPC publique (over-fetching).
- Pas de CORS `*` en production.
- Pas de `service_role_key` dans logs, code client, README.
- Pas de migration sans `IF NOT EXISTS` (idempotence).
- Pas de `psql` direct sur prod (pas traceable).

## Decouvrir le schema actuel
```bash
mcp__supabase__list_tables --schemas '["public"]'
```
ou via Management API : voir docs/hubspot/forms-api/ pour le pattern Bearer Token.
