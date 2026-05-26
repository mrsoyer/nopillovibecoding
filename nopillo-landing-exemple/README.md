# nopillo-landing-exemple

Landing page de démonstration pour la stack Nopillo "LP auto par KW via IA".

Astro 6 + Tailwind 4 + Supabase + Netlify. Charte Nopillo. Connectée HubSpot via Edge Function.

## Stack

- **Frontend** : Astro 6 (SSG, 0KB JS par défaut) + Tailwind 4 + React (islands)
- **Backend** : Supabase Postgres + Edge Function `contact-form` (Deno)
- **Infra** : Netlify (deploy auto via netlify.toml)
- **Tracking** : GTM + GA4 + Google Ads (Consent Mode v2)
- **Keyword pilote** : `expert comptable LMNP`

## Quick start

```bash
cd front && npm run dev      # localhost:4321
```

## Deploy

```bash
netlify deploy --prod
```

## Documentation

- CDC : [docs/cdc-nopillo-landing-exemple/](../docs/cdc-nopillo-landing-exemple/)
- DS Nopillo : [docs/design-system-extraction/nopillo-extracted/](../docs/design-system-extraction/nopillo-extracted/)
- Besoins paid IA : [docs/besoins-lp-paid-ia-nopillo/](../docs/besoins-lp-paid-ia-nopillo/)

## Variables d'environnement

`front/.env` :
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Secrets Edge Function (via `supabase secrets set`) :
- `HUBSPOT_API_KEY` (token privé app HubSpot)
- `HUBSPOT_PORTAL_ID`

Variables Netlify (via `netlify env:set`) :
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
