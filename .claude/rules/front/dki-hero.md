---
paths:
  - "nopillo-landing-exemple/front/src/components/DKIHero.tsx"
---

# Rule : DKIHero.tsx (island React, Dynamic Keyword Insertion)

## Role
Island React qui s'hydrate `client:load` pour remplacer le H1 statique par un H1 + sub-line dynamiques selon les URL params Google Ads (utm_term, searchterm, city extraite).

## Type
Island React (.tsx), hydratation `client:load`.

## Inputs (URL params lus via readDKI)
- `utm_term` ou `keyword` → keyword affiche dans la sub-line (avec `capitalize()`)
- `searchterm` ou `search_term` → fallback pour keyword + extraction city
- `city` deduit depuis searchterm (regex FRENCH_CITIES dans lib/dki.ts)

## Output (DOM rendu)
- H1 statique fixe : `"Simplifiee. / Optimisee."` (couleur indigo-600 sur "Optimisee.")
- Sub-line dynamique :
  - Si keyword : `"Votre {Keyword} a {City}, en ligne."` (city optionnelle)
  - Sinon (fallback) : `"Votre declaration fiscale LMNP."`
- Paragraphe description statique

## Dependances entrantes
- `nopillo-landing-exemple/front/src/components/sections/Hero.astro` (importe et instancie)

## Dependances sortantes
- `../lib/dki.ts` : `readDKI()`, `capitalize()`, `DKIContext` type
- React hooks : `useState`, `useEffect`

## Contraintes
- **`client:load` obligatoire** : hydratation immediate sinon le user voit "Votre declaration fiscale LMNP." par defaut quelques ms avant que le DKI prenne effet (flash de contenu).
- **Fallback SSR statique** : le HTML rendu cote serveur affiche le contenu fallback. Important pour LCP + SEO (meme si noindex, Google Ads bot inspecte le HTML).
- **Pas de fetch dans useEffect** : tout est lu depuis `window.location.search` (synchrone). Pas d'appel API.
- **Capitalize special** : LMNP et SCI restent en MAJUSCULES (geres dans `capitalize()` de lib/dki.ts).

## A surveiller
- Si ajout de nouvelles villes : editer `FRENCH_CITIES` dans `lib/dki.ts`, pas ce composant.
- Le H1 "Simplifiee. / Optimisee." est en dur car identite Nopillo. Ne pas le rendre dynamique sans confirmation produit.
- Style inline (`<style>` template literal) : limite a ce composant pour rester self-contained. Si style commun a d'autres islands, factor dans global.css.
