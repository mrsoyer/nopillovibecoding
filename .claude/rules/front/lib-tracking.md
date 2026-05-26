---
paths:
  - "nopillo-landing-exemple/front/src/lib/tracking.ts"
---

# Rule : lib/tracking.ts (GTM + GA4 + Google Ads helpers)

## Role
Helpers TypeScript pour pousser des events vers `window.dataLayer` (GTM) et firer des conversions Google Ads. Compatible Consent Mode v2 (initialise dans `Base.astro`).

## Type
Module utilitaire (.ts), pas de composant.

## Exports
- `trackCTAClick(ctaId, position)` → event `cta_click`
- `trackSimulatorStart()` → event `simulator_start`
- `trackSimulatorComplete(resultValue)` → event `simulator_complete`
- `trackFormStart(formId)` → event `form_start`
- `trackFormSubmit(formId, keyword, matchType)` → event `form_submit` (avec keyword/matchType pour attribution)
- `trackConversion(leadId, value=50)` → fire Google Ads conversion via `gtag('event', 'conversion', ...)` avec `transaction_id` pour dedup

## Dependances entrantes
- `nopillo-landing-exemple/front/src/components/sections/ContactForm.tsx`
- `nopillo-landing-exemple/front/src/components/sections/Simulator.tsx`
- (potentiel) Hero.astro inline script

## Dependances sortantes
- `window.dataLayer` (GTM, initialise dans Base.astro)
- `window.gtag` (defini par GTM apres Consent Mode update)
- `import.meta.env.PUBLIC_GOOGLE_ADS_CONVERSION_ID` (format `AW-XXX/abc`)

## Contraintes
- **`typeof window === 'undefined'` check obligatoire** : tracking fonctions appelees uniquement cote client (les islands React s'hydratent client-side). Le check evite les crashes SSR.
- **Conversion ID validation** : si `PUBLIC_GOOGLE_ADS_CONVERSION_ID` contient `XXX`, ne pas firer (placeholder dev). Logger console.warn.
- **`transaction_id` = leadId** : indispensable pour dedup Google Ads. Sans, double-comptage possible.
- **Pas de `console.log` en prod** : actuellement 1 log si conversion non configuree. Acceptable car non-bloquant.

## A surveiller
- Si ajout d'un nouveau type d'event (ex: `phone_click`, `scroll_75`) : creer une nouvelle fonction `track*` plutot que pusher inline.
- Si migration vers GA4 measurement protocol (server-side) : ces helpers restent (client-side baseline), ajouter en plus.
- Si Consent Mode passe a `granted` cote user, GTM unblocque les tags automatiquement. Pas de modif requise ici.
- `gtag` n'est defini qu'apres que GTM ait charge. Si la fonction est appelee avant (tres tot dans la vie de la page), `trackConversion` no-op proprement (check `!window.gtag`).
