---
paths:
  - "nopillo-landing-exemple/front/src/layouts/Base.astro"
---

# Rule : Base.astro layout

## Role
Layout racine de la landing. Injecte les meta tags SEO/OG, charge Adobe Typekit (Futura PT), initialise Consent Mode v2 (denied par defaut) et embed le GTM container.

## Type
Layout Astro statique (template wrapper avec `<slot />`).

## Structure
- `<head>` :
  - Meta : `noindex, nofollow` (paid only)
  - Adobe Typekit : `https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css`
  - `<script is:inline>` Consent Mode v2 init (denied par defaut sur ad_storage, analytics_storage, ad_user_data, ad_personalization)
  - `<script is:inline>` GTM loader (utilise `PUBLIC_GTM_ID` env var)
- `<body>` : `<noscript>` GTM iframe + `<slot />`

## Props
- `title: string` (required)
- `description: string` (required)
- `ogImage?: string` (default `/og.png`)

## Dependances entrantes
- `nopillo-landing-exemple/front/src/pages/index.astro`

## Dependances sortantes
- `nopillo-landing-exemple/front/src/styles/global.css` (Tailwind 4 + tokens Nopillo)
- `import.meta.env.PUBLIC_GTM_ID` (fallback `GTM-XXXXXX`)
- `import.meta.env.PUBLIC_GA4_MEASUREMENT_ID` (fallback `G-XXXXXXXXXX`)
- Adobe Typekit (CDN externe)

## Contraintes
- **Consent Mode v2 obligatoire AVANT GTM** : sans cette init, Google Ads ne respecte pas RGPD.
- **GTM_ID via env var** : ne jamais hardcoder l'ID GTM (pour permettre dev/staging/prod).
- **noindex** : ne pas retirer sans confirmation (page paid only).
- **Adobe Typekit preconnect** : indispensable pour LCP < 2s.
- **Pas de `<script>` synchrones** dans `<head>` : tout doit etre `is:inline` (Astro) ou async/defer.

## A surveiller
- Si on ajoute un second layout (ex: page legal), facto les meta tags dans un `<MetaTags />` component.
- Si tracking snippet HubSpot ajoute (pour `hubspotutk`) : `<script src="https://js-eu1.hs-scripts.com/26173790.js" async defer>` apres GTM.
- Le Consent Mode `wait_for_update: 500` bloque les tags 500ms : si banner cookies tarde, augmenter.
