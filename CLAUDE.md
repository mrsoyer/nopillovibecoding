# CLAUDE.md — webflowlanding workspace

## Regles critiques (lire en premier)
- **MCP Supabase** : utiliser `mcp__supabase__*` pour migrations/deploy/queries — jamais `psql` direct prod.
- **Secrets** : `SUPABASE_SERVICE_ROLE_KEY` et `HUBSPOT_API_KEY` UNIQUEMENT cote Edge Function. Jamais dans le bundle client.
- **PUBLIC_*** : seules les vars prefixees `PUBLIC_` sont autorisees cote client (Astro convention).

## Workspace
Mono-repo de R&D pour landing pages paid + Nopillo. Contient :
- `nopillo-landing-exemple/` — projet landing actif (Astro 6 + Supabase + Netlify)
- `docs/` — documentation interne (DS, CDC, best practices, hubspot-forms-api...)
- `.claude/skills/` — skills locaux (init-landing-stack, apply-nopillo-ds, hubspot-edge-form, rule-maker, context-guardian, doc-maker, cdc-maker, skill-maker)
- `.claude/rules/` — rules path-scoped (charge auto par Claude Code)
- `.mcp.json` — MCPs projet (supabase, hubspot, webflow)

## Projet actif : nopillo-landing-exemple
- **Stack** : Astro 6 + Tailwind 4 + React (islands) + TypeScript strict + Supabase (Postgres + Edge Functions) + Netlify
- **DS** : Nopillo (Adobe Typekit Futura PT, indigo #4033DB, pill CTAs)
- **Tracking** : GTM + GA4 + Google Ads + Consent Mode v2
- **URL prod** : https://nopillo-landing-exemple.netlify.app

## Project IDs
- Supabase project ref : `kamazblxybkukpkvznkv` (EU region)
- HubSpot portal : `26173790` (region eu1)
- HubSpot form pilote : `107536bf-c2cb-44de-89ea-8c3101f83870`

## Conventions
- 1 fichier `.astro` = 1 section landing. React `.tsx` UNIQUEMENT pour islands (DKI, form, simulator).
- Hydratation defaut `client:visible`. `client:load` reserve aux above-the-fold critiques.
- noindex obligatoire (paid only).
- DKI : lire URL params via `nopillo-landing-exemple/front/src/lib/dki.ts`.
- Forms : passer par Edge Functions, jamais Postgres direct cote client.

## Commandes utiles
- `cd nopillo-landing-exemple/front && npm run dev` — local port 4321
- `cd nopillo-landing-exemple/front && npm run build` — build prod
- `cd nopillo-landing-exemple && supabase functions deploy <name> --no-verify-jwt --project-ref kamazblxybkukpkvznkv`
- `cd nopillo-landing-exemple && netlify deploy --prod --dir=front/dist`

## Cibles de performance
- Lighthouse Performance >= 95
- LCP < 2s, CLS < 0.1, INP < 200ms
- Bundle JS client < 50 KB

## Documentation
- CDC projet : @docs/cdc-nopillo-landing-exemple/
- DS Nopillo : @docs/design-system-extraction/nopillo-extracted/
- HubSpot Forms API : @docs/hubspot/forms-api/
- Rules path-scoped : @.claude/rules/{front,back}/
- Skills locaux : @.claude/skills/

## MCPs configures (.mcp.json racine)
- `mcp__supabase__*` : projet kamazblxybkukpkvznkv
- `mcp__hubspot__*` : portail 26173790
- `mcp__webflow__*` : pour extraction DS

## Rappels critiques (recency)
- Verifier ce CLAUDE.md regulierement via `/context-guardian` (cible >= 70/80).
- Jamais commit de secret (`HUBSPOT_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, DB password).
- MCP Supabase pour toute query SQL prod (pas psql, pas SDK service_role en local).
