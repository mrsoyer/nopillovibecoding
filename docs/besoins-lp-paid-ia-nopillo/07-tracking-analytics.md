# 07 — Tracking, analytics et conversions

## Vue d'ensemble

3 objectifs tracking : (1) attribuer chaque lead à son KW d'origine, (2) reporter dans Google Ads pour optimiser les enchères, (3) mesurer le funnel pour itérer le copy/design. Server-side tracking recommandé pour la dédup et la résistance aux bloqueurs.

## Table des matières

- [Tag management](#tag-management)
- [Événements GA4](#événements-ga4)
- [Conversions Google Ads](#conversions-google-ads)
- [Server-side tracking](#server-side-tracking)
- [Déduplication](#déduplication)
- [Conformité RGPD](#conformité-rgpd)

## Tag management

### Recommandation : Google Tag Manager (GTM)

**Pour** :
- Centralise tous les tags (GA4, GAds, HubSpot, Meta Pixel, etc.)
- Permet d'ajouter/retirer sans déployer
- Compatible avec server-side container (GTM SS)

**Configuration démo** :
- 1 container GTM par site (Nopillo)
- Tags installés :
  - GA4 Configuration
  - Google Ads conversion linker
  - Google Ads conversion tracking
  - HubSpot tracking code
  - Meta Pixel (si retargeting)

## Événements GA4

### Événements essentiels

| Event | Trigger | Paramètres |
|-------|---------|------------|
| `page_view` | Auto | `page_location`, `page_referrer` |
| `scroll` | 50% / 75% / 90% scroll | `percent_scrolled` |
| `cta_click` | Click sur CTA primaire/secondaire | `cta_id`, `cta_position` |
| `simulator_start` | Premier input simulateur | `simulator_step` |
| `simulator_complete` | Submit simulateur | `result_value` |
| `form_start` | Premier focus champ form | `form_id` |
| `form_submit` | Submit formulaire HubSpot | `form_id`, `keyword`, `match_type` |
| `phone_click` | Click sur lien `tel:` | `phone_number` |
| `outbound_click` | Click vers domaine externe | `link_url` |

### Paramètres custom à envoyer

Sur chaque event, attacher si dispo :
- `keyword` (= utm_term)
- `match_type`
- `search_term`
- `campaign`
- `landing_variant` (slug LP)
- `device`

### Dimensions custom GA4

Créer dans GA4 → Admin → Custom definitions :
- `keyword` (event-scoped)
- `match_type` (event-scoped)
- `search_term` (event-scoped)
- `landing_variant` (event-scoped)

## Conversions Google Ads

### Conversion principale : Form submit

**Setup** :
1. Créer conversion dans Google Ads : `lp_form_submit`
2. Catégorie : `Submit lead form`
3. Modèle d'attribution : Data-driven (recommandé 2026)
4. Valeur : optionnelle (50€ par lead, par exemple)

**Implémentation** :

```js
// Fire conversion sur callback HubSpot form submit
window.addEventListener('message', event => {
  if (event.data.type === 'hsFormCallback' &&
      event.data.eventName === 'onFormSubmitted') {
    gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXX/abcdef',
      'value': 50.0,
      'currency': 'EUR',
      'transaction_id': event.data.id // pour dédup
    });
  }
});
```

### Conversions secondaires

- `simulator_complete` (micro-conversion)
- `phone_click` (intention forte)
- Scroll 75% (engagement)

### Enhanced Conversions (recommandé)

Activer Enhanced Conversions for Leads dans Google Ads :
- Permet d'envoyer email/téléphone hashés
- Améliore attribution multi-device
- Compatible avec Offline Conversion Import depuis HubSpot

### Offline Conversion Import (industrialisation)

Pour reporter à Google Ads la **qualification du lead** :
1. HubSpot capture `gclid`
2. Lead progresse vers MQL / SQL
3. Webhook HubSpot → script → Google Ads Conversions API
4. Conversion `lead_qualified` importée avec valeur réelle

Bénéfice : Google Ads optimise sur les leads qualifiés, pas juste les formulaires remplis.

## Server-side tracking

### Recommandation industrialisation

**Stack** :
- GTM Server-Side container (hébergé sur Cloud Run / App Engine)
- Endpoint : `https://gtm.nopillo.fr`
- Tags server :
  - GA4 (event API)
  - Google Ads conversion (Conversion API)
  - Meta Conversions API (CAPI)
  - HubSpot API

### Bénéfices

| Bénéfice | Détail |
|----------|--------|
| **Résistance aux bloqueurs** | Tags fired server-side ne sont pas bloqués par adblockers/ITP |
| **Cookies first-party** | Cookies servis depuis le même domaine = durée prolongée |
| **Dédup** | Event ID unique partagé client/server pour éviter double-count |
| **Latence** | Tags lourds déportés serveur = page plus rapide |
| **Sécurité** | Tokens API serveur jamais exposés client |

### Pour la démo

Server-side **optionnel** mais recommandé si :
- Volume de leads > 100/jour
- Trafic mobile élevé (ITP impact)
- Meta Ads en parallèle (CAPI obligatoire)

## Déduplication

### Côté Google Ads

- Conversion `transaction_id` unique (ID HubSpot du lead)
- Évite double-comptage si user submit 2x

### Côté HubSpot

- Dédup native par email
- Activé par défaut

### Côté Meta CAPI (si Meta Pixel)

- `event_id` partagé Pixel client + CAPI server
- Sinon : double-count des conversions

## Conformité RGPD

### Consentement obligatoire

- Banner cookies (Cookiebot / Axeptio / autre) avant tout firing tag tracking
- Google Consent Mode v2 obligatoire depuis mars 2024
- États : `granted` / `denied` pour :
  - `ad_storage`
  - `analytics_storage`
  - `ad_user_data`
  - `ad_personalization`

### Implémentation Consent Mode

```js
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// Après acceptation user
gtag('consent', 'update', {
  'ad_storage': 'granted',
  'analytics_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted'
});
```

### Sans consentement

- Avec Consent Mode v2 : Google Ads continue à fire un "ping" anonyme = données agrégées modeled
- Sans Consent Mode : 100% de la donnée est perdue

### Mentions obligatoires

- Lien "Politique de confidentialité" dans footer + formulaire
- Mention au-dessus du bouton submit : `"En soumettant ce formulaire, j'accepte que mes données soient traitées par Nopillo conformément à la politique de confidentialité."`
- Mention RGPD pour transferts hors UE (si HubSpot US)

## Reporting cible démo

Dashboard minimal à monter pour valider la démo :

| Métrique | Source | Cible |
|----------|--------|-------|
| Impressions LP | GA4 page_view | Baseline |
| Taux de scroll 75% | GA4 scroll event | > 40% |
| Taux clic CTA | GA4 cta_click / page_view | > 15% |
| Taux start form | GA4 form_start / page_view | > 10% |
| Taux complétion form | GA4 form_submit / form_start | > 60% |
| **Conversion globale** | form_submit / page_view | **> 8%** |
| Quality Score | Google Ads (par KW) | 9-10/10 |
| CPC moyen | Google Ads | -20% vs baseline |
| Coût par lead | Google Ads | À mesurer |

## Sources

- [Tripledart — HubSpot Form Tracking GA4 via GTM](https://www.tripledart.com/marketing-analytics/hubspot-form-tracking-in-ga4-using-google-tag-manager) — Setup callback onFormSubmitted
- [Zyxware — Maximizing Conversion HubSpot GA4](https://www.zyxware.com/article/6481/how-to-track-conversion-of-hubspot-forms-in-your-website-on-ga4-using-gtm) — Conversion mapping
- [BrixTemplates — Webflow form submissions GTM GA4](https://brixtemplates.com/blog/how-to-track-webflow-form-submissions-with-gtm-and-ga4) — Patterns GTM
- [Google Ads Help — ValueTrack tracking setup](https://support.google.com/google-ads/answer/6305348?hl=en) — Conversion linker
