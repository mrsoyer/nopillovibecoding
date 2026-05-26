---
name: connect-hubspot-form
description: Use this skill when the user wants to connect a HubSpot form to a Webflow page with full tracking (GA4 + Meta Pixel + CAPI deduplicated). Generates embed code, configures tracking events, injects via Webflow MCP, and validates contact creation in HubSpot.
---

# connect-hubspot-form

Automatise la connexion d'un form HubSpot a une page Webflow avec tracking complet (GA4, Meta Pixel + CAPI dedupliques par event_id) et validation end-to-end.

## Quand activer

L'utilisateur demande "connecter form HubSpot Webflow", "embed HubSpot tracking", "ajouter form HubSpot avec GA4 et Meta Pixel", "tracking conversion lead form", ou fournit un portalId + formId + URL Webflow.

## Inputs requis

| Param | Format | Source |
|---|---|---|
| `portalId` HubSpot | numerique (ex: `12345678`) | Settings -> Account |
| `formId` HubSpot | UUID (ex: `abc12345-...`) | Marketing -> Forms |
| URL page Webflow | `https://site.webflow.io/contact` | Site live |
| `gtag` ou GTM container | `G-XXXX` ou `GTM-XXXX` | GA4 / Tag Manager |
| Meta Pixel ID | numerique (ex: `987654321`) | Events Manager |
| Meta CAPI access token | `EAA...` | Events Manager -> CAPI |
| HubSpot Private App token | `pat-na1-...` | Settings -> Integrations |

Demander les manquants avant de proceder.

## Workflow

### 1. Choisir le mode

| Mode | Quand | Reference |
|---|---|---|
| **Embed** (HubSpot script) | UX HubSpot OK, rapide | `references/embed-webflow.md` |
| **Custom form** (API) | Design custom, controle total | `references/hubspot-api.md` |

Par defaut : **embed** (90% des cas). Custom seulement si design contraint.

### 2. Generer le code

- **Embed** : snippet `hbspt.forms.create({...})` avec callback `onFormSubmit` qui genere `event_id` (UUID v4) et fire GA4 + Pixel.
- **Custom** : POST direct sur `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}` (lire `references/hubspot-api.md`).

Toujours :
- Generer `event_id = crypto.randomUUID()` AVANT le submit.
- Capturer `fbclid` + `gclid` depuis `URLSearchParams` et les passer en hidden fields HubSpot (custom properties `fbclid`, `gclid` dans HubSpot).
- Pousser au dataLayer avec `user_data` hashe pour Enhanced Conversions GA4.

### 3. Injecter via Webflow MCP

Utiliser le serveur MCP Webflow (cf. `WEBFLOW-MCP.md`) :

```
1. mcp__webflow__data_scripts_tool : register inline script (HubSpot loader + tracking)
2. mcp__webflow__data_scripts_tool : apply script to page (URL fournie)
3. mcp__webflow__data_pages_tool : update page si embed div manquant
4. mcp__webflow__data_sites_tool : publish site
```

Lire `references/embed-webflow.md` pour les snippets exacts a registrer.

### 4. Configurer tracking events

Lire `references/tracking-events.md` pour :
- Event GA4 `generate_lead` avec `user_data` hashe (Enhanced Conversions).
- Event Meta Pixel `Lead` avec `eventID`.
- Endpoint server-side Meta CAPI (Edge Function ou worker) qui POST le meme `event_id` -> dedup 48h.

### 5. Tester

- Soumettre un test depuis la page Webflow live (incognito).
- Verifier dans HubSpot : Contacts -> recherche email test (cree dans les 30s).
- Verifier GA4 : DebugView -> event `generate_lead` visible.
- Verifier Meta : Events Manager -> Test Events -> 1 event Pixel + 1 event CAPI fusionnes (deduplique).
- Verifier EMQ : doit etre >= 7.5 pour Lead.

Si erreur : lire `references/troubleshooting.md` (CORS, double counting, EMQ bas, fbclid manquant).

## Livrables attendus en fin de skill

1. Code embed/custom genere et injecte sur la page Webflow.
2. Script tracking enregistre via Webflow MCP.
3. Server-side endpoint CAPI (template) si demande.
4. Checklist de validation cochee (HubSpot + GA4 + Meta Test Events).
5. Rapport : portalId/formId, page URL, event_id pattern, EMQ initial.

## Securite

- JAMAIS commiter le HubSpot Private App token, le Meta CAPI token, ou les API keys (format `pat-na1-*` detecte par GitGuardian).
- CAPI access token doit vivre cote serveur uniquement (Edge Function, Vercel, Cloudflare Worker).
- Hasher email/phone en SHA-256 (lowercase, trim) AVANT envoi CAPI. Ne JAMAIS hasher `fbp`/`fbc`.
