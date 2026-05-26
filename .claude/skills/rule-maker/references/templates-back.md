# Template Back — Rule pour Edge Function

> Template a utiliser a l'etape 6 du workflow `rule-maker` pour une edge function Supabase. Substituer toutes les variables avec les donnees extraites aux etapes 1-5.

## Template Edge Function

Pour `supabase/functions/{function-name}/index.ts`. Fichier rule : `.claude/rules/back/{function-name}.md`.

```yaml
---
paths:
  - "supabase/functions/{function-name}/**"
---

# Edge function : {function-name}

## Role
{1-3 phrases : ce que fait cette function dans le systeme}

## Endpoint
`POST ${SUPABASE_URL}/functions/v1/{function-name}`

## Inputs attendus
{Schema d'input detecte (Zod, parsing JSON, etc.)}
| Champ | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | oui | regex stricte |
| name | string | oui | 2-80 chars |
| message | string | oui | 10-2000 chars |
| utm_source | string | non | - |
| _honey | string | - | doit etre vide (honeypot) |

## Validations
{Liste des validations cote serveur}
- Email regex stricte
- Honeypot non-vide -> 200 OK silencieux (anti-spam)
- Rate limit : {X}/min/IP (Deno KV) si present
- {Autres validations specifiques}

## Outputs
{Status codes et structure de reponse}
- `200` : `{ ok: true, id: <uuid> }`
- `400` : `{ error: "validation_failed", details: [...] }`
- `429` : `{ error: "rate_limited" }`
- `500` : `{ error: "internal" }` + `console.error` contexte

## Side effects
{Operations DB / webhooks / autres effets de bord}
- INSERT dans `public.{table}`
- Webhook {SERVICE} (si `{ENV_VAR}` set)
- {Audit log, email, push notification...}

## Variables d'env consommees
{Resultat de la detection `Deno.env.get(...)`}
- `SUPABASE_URL` (auto-injecte)
- `SUPABASE_SERVICE_ROLE_KEY` (auto-injecte, JAMAIS cote client)
- `{HUBSPOT_API_KEY}` (optionnel, secret custom)
- `ALLOWED_ORIGINS` (CORS)

## Securite
{Contraintes securite detectees ou attendues}
- CORS restreint a `ALLOWED_ORIGINS` (env) — JAMAIS `*` en prod
- `SERVICE_ROLE_KEY` via `Deno.env.get()` uniquement
- Logs sans email/message (PII RGPD)
- {Rate limiting si present}

## Dependances entrantes
{Resultat grep "/functions/v1/{function-name}" dans front/}
- `front/src/components/ContactForm.tsx` (hook useContactForm)
- `front/src/components/NewsletterForm.tsx` (variante)

## Dependances sortantes
{Tables touchees, services externes, autres functions}
- Table `public.{table}` (INSERT via service role)
- Webhook {SERVICE} (si env present)
- Deno KV pour rate limiting

## A surveiller
{Pieges et risques de regression}
- Schema d'input = schema Zod cote front (synchroniser les deux)
- Si ajouter un champ obligatoire : migration `public.{table}`
- Si modifier le rate limit : verifier impact campagnes Ads
- Si retirer le honeypot : risque spam

## Logs et monitoring
{Si pertinent}
- Logs visibles via `mcp__claude_ai_supabase__get_logs`
- Erreurs : `console.error` avec contexte (sans PII)
- Metriques : invocations/min via Supabase Dashboard
```

## Notes specifiques aux edge functions

### Detecter le honeypot
Chercher des patterns comme :
- Champ avec nom `_honey`, `_hp`, `honeypot`, `botfield`
- Reponse 200 OK silencieuse si rempli (pas d'erreur, anti-bot detection)

Si present → mentionner dans "Securite" ET "A surveiller".

### Detecter le rate limiting
Chercher des patterns comme :
- `Deno.openKv()` + comptage
- `setInterval` avec compteur
- Header `X-RateLimit-*`
- Library Upstash redis

Si present → documenter limite exacte (`X req/min/IP`) dans "Validations".

### Detecter le CORS
Chercher des patterns comme :
- Header `Access-Control-Allow-Origin`
- Env `ALLOWED_ORIGINS`
- Fonction `corsHeaders()`

Si `*` en dur → ANTI-PATTERN. Documenter en "A surveiller" comme issue a corriger.

### Detecter SECURITY DEFINER (si RPC PostgreSQL)
Si le fichier est en fait une migration `.sql` avec une fonction PL/pgSQL :
- Detecter `CREATE OR REPLACE FUNCTION ... SECURITY DEFINER`
- Documenter en "Securite" : "RPC privilegiee, bypass RLS — justifier dans la rule"
- Ce template ne couvre PAS les RPC SQL (hors scope MVP). Demander a l'user de creer la rule manuellement ou ignorer.

### Detecter les webhooks sortants
Chercher des patterns comme :
- `fetch("https://...")` vers domaine externe
- Library Stripe, HubSpot, Resend, etc.

Documenter chaque webhook dans "Side effects" avec :
- URL/service appele
- Variable env conditionnelle (`if (HUBSPOT_API_KEY)`)
- Comportement si env absente (skip silencieux ou erreur ?)
