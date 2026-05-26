---
paths:
  - "nopillo-landing-exemple/front/**"
---

# Regles frontend generiques — nopillo-landing-exemple

> Regles transverses au dossier `nopillo-landing-exemple/front/`. Pour les regles specifiques par fichier (Hero, ContactForm, etc.) voir `.claude/rules/front/*.md`.

## Stack
Astro 6 + Tailwind 4 + React (islands) + TypeScript strict.

## Composants
- 1 fichier `.astro` = 1 section de landing. React `.tsx` UNIQUEMENT pour islands interactifs.
- Hydratation defaut : `client:visible`. `client:load` reserve aux above-the-fold critiques (DKIHero).
- Sections dans `src/components/sections/`, layouts dans `src/layouts/`, libs dans `src/lib/`.

## Design System Nopillo
- Tokens CSS dans `src/styles/tokens.css` (charge depuis `global.css`).
- Couleurs : `--color-brand-black` (#09090B), `--color-indigo-600` (#4033DB), `--color-indigo-100` (#DEDAFF), `--color-secondary-600` (#0CC28C).
- Boutons : `.btn-primary` (NOIR pill 999px), `.btn-secondary` (indigo), `.btn-ghost` (transparent), `.btn-outline`.
- Cards : `.card-nopillo` (translucide 30% + border indigo-100 + shadow signature).
- Container : `.container-regular` (1120px) ou `.container-navbar` (1408px).
- Sections alternees : `.section-white`, `.section-soft` (indigo 60%), `.section-accent`, `.section-cta`.
- Font : Adobe Typekit Futura PT (charge dans `Base.astro`).

## Performance (cible Lighthouse >= 95)
- Bundle JS client < 50 KB.
- LCP < 2s : pas d'image hero lourde, `fetchpriority="high"` si image, dimensions explicites.
- Pas de carrousel, framer-motion, ou Google Fonts CDN (Typekit OK car preconnect).

## DKI (Dynamic Keyword Insertion)
- Lib : `src/lib/dki.ts` (`readDKI()`, `capitalize()`, FRENCH_CITIES regex).
- Composants DKI : utiliser dans React island avec `useEffect`.
- Fallback statique obligatoire (SSR HTML), DKI surcharge a l'hydration.

## Forms
- Toujours via Edge Functions (`/functions/v1/contact-form` ou `/functions/v1/hubspot-form-submit`).
- Jamais de query Postgres direct cote client.
- Honeypot `name="website"` obligatoire (CSS off-screen).
- Champs caches DKI auto-remplis depuis `readDKI()` au submit.

## Tracking
- Helpers dans `src/lib/tracking.ts` : `trackCTAClick`, `trackFormSubmit`, `trackConversion`.
- Consent Mode v2 init dans `Base.astro` (denied par defaut).
- GTM via `PUBLIC_GTM_ID` env var.

## A ne pas faire
- Pas de `client:load` sans raison documentee dans rule path-scoped.
- Pas de `<img>` brut sans width/height (CLS).
- Pas de classes Tailwind arbitraires `w-[742px]` sans justification.
- Pas d'exposition de `SUPABASE_SERVICE_ROLE_KEY` ou `HUBSPOT_API_KEY` cote client.
