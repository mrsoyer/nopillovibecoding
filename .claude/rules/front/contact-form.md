---
paths:
  - "nopillo-landing-exemple/front/src/components/sections/ContactForm.tsx"
---

# Rule : ContactForm.tsx (island, lead capture)

## Role
Formulaire principal de capture lead. Island React hydrate `client:visible`. Valide les inputs, capture DKI/UTMs/GCLID, submit vers Edge Function `contact-form` (Supabase) qui insere en DB + push HubSpot CRM, puis fire tracking GTM/Google Ads.

## Type
Island React (.tsx) avec state machine `idle | sending | sent | error`.

## Champs visibles (4 max)
- `name` (text, optional, autoComplete given-name)
- `email` (email, required, autoComplete email)
- `phone` (tel, optional, autoComplete tel)
- `message` (textarea 3 rows, optional)

## Champs caches (auto-remplis depuis DKI au submit)
- UTMs : utm_source, utm_medium, utm_campaign, utm_term, utm_content
- gclid, search_term, match_type, device
- landing_page_url, hutk (cookie hubspotutk, optionnel)
- honeypot field `name="website"` (CSS off-screen)

## Submit flow
1. `e.preventDefault()` → status `sending`
2. `submitContactForm(payload)` → POST `/functions/v1/contact-form`
3. Si succes : `trackFormSubmit()` + `trackConversion(leadId)` + reset form + status `sent`
4. Si erreur : afficher message + status `error` (button re-enabled)

## Dependances entrantes
- `nopillo-landing-exemple/front/src/pages/index.astro` (section `#contact`)

## Dependances sortantes
- `../../lib/supabase.ts` : `submitContactForm()`, type `ContactFormPayload`
- `../../lib/dki.ts` : `readDKI()`, type `DKIContext`
- `../../lib/tracking.ts` : `trackFormStart`, `trackFormSubmit`, `trackConversion`
- Endpoint : `${PUBLIC_SUPABASE_URL}/functions/v1/contact-form`

## Contraintes
- **Honeypot `name="website"`** : ne pas renommer (l'Edge Function check `body.honeypot`). Style `position:absolute; left:-9999px`.
- **`noValidate` sur form** : on gere la validation cote serveur (Edge Function), pas via HTML5.
- **`onFocus` trigger trackFormStart** : 1 seule fois grace a `startedRef`. Ne pas le wrapper dans `onInput` (multi-fire).
- **State `sent` affiche un mini-success screen** : pas de redirect. Si redirect souhaite plus tard, ajouter `window.location` apres timeout.
- **`mailto` fallback en erreur** : message "ou contactez-nous a contact@nopillo.fr" — verifier que l'adresse existe avant prod.

## A surveiller
- Si on ajoute des champs : updater `Payload` type dans `lib/supabase.ts` + Edge Function `contact-form/index.ts` + schema DB `leads` (migration).
- Si on migre vers Forms Submissions API HubSpot : remplacer endpoint par `hubspot-form-submit` Edge Function + capture hutk obligatoire.
- Si validation client souhaitee (react-hook-form, zod) : a ajouter avant submit. Garder le `noValidate` server-first.
