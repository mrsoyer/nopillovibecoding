# 06 — Meta Pixel + Conversions API (CAPI)

## Table des Matieres

- [Vue d'Ensemble](#vue-densemble)
- [Concepts Cles](#concepts-cles)
- [Patterns Recommandes](#patterns-recommandes)
- [Anti-Patterns](#anti-patterns)
- [Sources](#sources)

## Vue d'Ensemble

Le Pixel client-only n'est plus suffisant en 2026. iOS privacy, ad blockers, consent banners et browser tracking prevention font perdre **plus de 50% des conversions** avec un setup Pixel-only. Meta recommande explicitement le **dual setup Pixel + CAPI** avec deduplication par event_id. C'est le standard pour toutes les landings produites par Nopillo.

## Concepts Cles

### Pixel (client-side)
- Snippet JS browser-side.
- Capture pageview, scroll, interactions temps reel.
- Bloque par : iOS ITP, Safari, Firefox tracking protection, ad blockers, consent refus.

### Conversions API (CAPI, server-side)
- POST events server-to-server vers Meta Graph API.
- Bypass browser restrictions.
- Permet d'envoyer **offline conversions** (CRM, telephone, point de vente).
- Match keys hashes pour identifier user.

### Dual Tracking
Pixel + CAPI ensemble + deduplication via `event_id` -> donnees completes.

### Event Match Quality (EMQ)
Score 0-10 attribue par Meta sur la qualite du matching identite. Plus haut = mieux attribue.

| EMQ score | Impact |
|-----------|--------|
| < 6.0 | Standard insuffisant |
| 6.0-7.0 | OK avec email seul |
| 7.0-8.0 | Email + phone + fbp/fbc |
| 8.0+ | Tous parametres + advanced matching |
| 9.0+ | Excellent, conversions attribuees +15-25% vs < 6.0 |

## Patterns Recommandes

### Methodes d'Implementation

| Methode | Setup time | Cost / mois | Cas d'usage |
|---------|-----------|-------------|-------------|
| **CAPI Gateway** (no-code Meta) | 2-4h | $10-400+ | Annonceurs Meta-only, simple |
| **GTM Server-Side** | 4-8h | $10-50 | Multi-plateforme (Meta + Google + TikTok) |
| **Manual API direct** | 20-40h dev | $500-5,000+ dev | Custom, offline events, funnels complexes |
| **Plugins Webflow** (PixelFlow, Stape) | 30 min | $9-99 | Webflow sites, agences |

### Parametres Requis dans payload CAPI

```json
{
  "data": [{
    "event_name": "Purchase",
    "event_time": 1714900000,
    "event_id": "uuid-v4-unique-id",
    "action_source": "website",
    "event_source_url": "https://client.com/checkout",
    "user_data": {
      "em": "sha256_hashed_email",
      "ph": "sha256_hashed_phone_e164",
      "fn": "sha256_hashed_firstname_lower",
      "ln": "sha256_hashed_lastname_lower",
      "external_id": "sha256_hashed_user_id",
      "fbp": "fb.1.1714900000.1234567890",
      "fbc": "fb.1.1714900000.IwAR0...",
      "client_ip_address": "203.0.113.1",
      "client_user_agent": "Mozilla/5.0..."
    },
    "custom_data": {
      "currency": "EUR",
      "value": 99.00,
      "content_ids": ["sku_123"],
      "content_type": "product"
    }
  }]
}
```

### Hashing Rules

| Parametre | Hash ? | Format |
|-----------|--------|--------|
| em (email) | SHA256 | lowercase, trimmed |
| ph (phone) | SHA256 | E.164 sans `+`, ex: `33612345678` |
| fn / ln | SHA256 | lowercase |
| external_id | SHA256 | string user id |
| **fbp** | **JAMAIS** | format `fb.1.<timestamp>.<random>` |
| **fbc** | **JAMAIS** | format `fb.1.<timestamp>.<fbclid>` |
| client_ip_address | jamais | IP brute |
| client_user_agent | jamais | UA brut |

> **CRITIQUE** : hasher fbp ou fbc casse totalement le matching.

### Event Deduplication

1. Generer un **UUID v4** (ou ULID) par conversion.
2. Passer cet ID au Pixel : `fbq('track', 'Purchase', {value: 99}, {eventID: 'uuid-v4'})`.
3. Passer le **meme** ID dans le payload CAPI : `event_id: 'uuid-v4'`.
4. Meta deduplique sur `event_name + event_id` dans une fenetre de **48h**.

> Tout mismatch (case, whitespace, encoding) casse la dedup -> double comptage.

### EMQ Optimization Levers

1. **Email** hashe sur chaque event = +4 points EMQ (lever #1).
2. **Phone** hashe = +3 points.
3. **fbp + fbc** non hashes (cookies depuis le browser).
4. **Advanced Matching** active dans Events Manager.
5. **External_id** (CRM ID) pour identite continue.

### Cibles EMQ par Event

| Event | EMQ cible |
|-------|-----------|
| Purchase | 8.8-9.3 |
| AddToCart | 8.0+ |
| Lead | 7.5+ |
| PageView | 6.5-7.5 |

### CRM Integration Critique

> "You must capture and store the fbclid value with the contact record in your CRM at the time of initial form submission."

- Recuperer `fbclid` depuis URL params au form submit.
- Stocker dans le CRM (HubSpot, Salesforce, Zoho).
- Quand le lead change de stage (MQL -> SQL -> Customer), envoyer un event CAPI avec le fbclid d'origine.
- Cela alimente l'algo Meta avec des **signaux qualifies downstream**, pas juste form fills.

### Native Integrations
- **HubSpot** : built-in CAPI integration, nécessite Pixel + lifecycle stages mappes.
- **Stape.io / Datahash / LeadsBridge** : bridge tools pour Salesforce, Zoho, Pipedrive.
- **Webhook custom** : option DIY universelle.

## Anti-Patterns

| Anti-pattern | Consequence | Fix |
|--------------|-------------|-----|
| Hasher fbp/fbc | Match casse, EMQ chute | Envoyer raw |
| Fabriquer fbc sans vrai fbclid | Donnees fake, sanctions Meta | Capturer reel uniquement |
| Event_id mismatch (case sensitive) | Double comptage | UUID v4 normalise |
| Action_source incorrect | Attribution faussee | "website" web, "system_generated" CRM, "physical_store" offline |
| Pixel sans CAPI | Perte > 50% conversions | Dual obligatoire |
| Pas de fbclid en CRM | Pas de downstream attribution | Capturer au form submit |
| Envoyer events differes > 7j | Rejected par Meta | Real-time |
| EMQ < 6.0 sans action | -15 a -25% conversions attribuees | Hash email + phone partout |

## Deprecation Importante

**Offline Conversions API** : permanently discontinued en mai 2025 (Graph API v17.0+). Tout offline tracking utilise maintenant standard CAPI avec `action_source` approprie.

## Monitoring

- **Events Manager > Diagnostics** : verifier coverage, EMQ, dedup.
- **Test Events tab** : envoyer des events de test avec `test_event_code` pour valider.
- EMQ update : toutes les **48h**, impact perf visible en **2-4 semaines**.

## Sources

- [How to Set Up Meta Conversions API 2026 — DataAlly](https://www.dataally.ai/blog/how-to-set-up-meta-conversions-api)
- [Meta Pixel and Conversions API April 2026 AI Updates — Segwise](https://segwise.ai/blog/meta-pixel-conversions-api-ai-updates-2026)
- [Meta CAPI Setup Guide 2026 — Ingest Labs](https://ingestlabs.com/blogs/meta-capi-setup-complete-implementation-guide-for-facebook-conversion-api-2026/)
- [Facebook CAPI 2026 — Triple Whale](https://www.triplewhale.com/blog/facebook-capi)
- [Meta Conversions API Setup — AdsUploader](https://adsuploader.com/blog/meta-conversions-api)
- [Meta Pixel + Conversions API Setup Guide — FunnelFox](https://blog.funnelfox.com/meta-pixel-and-conversions-api/)
