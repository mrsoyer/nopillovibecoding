# 06 — Intégrations externes

## Vue d'ensemble

4 systèmes externes à brancher sur la LP démo : Google Ads (côté trafic), HubSpot (côté lead), Trustpilot (côté preuve), Webflow CMS (côté contenu). Chaque intégration doit être validée individuellement avant publication.

## Table des matières

- [Google Ads](#google-ads)
- [HubSpot](#hubspot)
- [Trustpilot](#trustpilot)
- [Webflow CMS API](#webflow-cms-api)
- [Schéma de bout en bout](#schéma-de-bout-en-bout)

## Google Ads

### Besoin 1 : URL avec KW dans la nomenclature

**Pattern URL** :
```
https://nopillo.fr/lp/{campagne-slug}/{kw-slug}
```

Exemple :
```
https://nopillo.fr/lp/lmnp-exact/expert-comptable-lmnp-paris
```

**Configuration Google Ads** :
- Final URL : URL spécifique par groupe d'annonce
- Tracking Template : `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignname}&utm_term={keyword}&utm_content={creative}&matchtype={matchtype}&device={device}&gclid={gclid}&network={network}`

### Besoin 2 : Capture ValueTrack côté LP

**Paramètres à capturer en URL params** :

| Param URL | Valeur ValueTrack | Usage |
|-----------|-------------------|-------|
| `utm_term` | `{keyword}` | KW Google Ads |
| `searchterm` | `{searchterm}` | Search Term réel (Broad) |
| `matchtype` | `{matchtype}` | Exact / Phrase / Broad |
| `device` | `{device}` | mobile / desktop / tablet |
| `gclid` | `{gclid}` | Click ID conversion |
| `creative` | `{creative}` | ID annonce (Pmax) |
| `network` | `{network}` | search / display |
| `location` | `{loc_physical_ms}` | Code lieu Google |

### Besoin 3 : Conversion tracking

**Configuration** :
- Google Ads conversion gtag installé sur LP
- Événement conversion : `form_submit` au moment de submit HubSpot
- Valeur conversion : optionnelle (ex : valeur lead estimée 50€)

**Code type** :
```js
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXX/abcdef',
  'value': 50.0,
  'currency': 'EUR'
});
```

### Besoin 4 : Tracking Template au compte

Recommandé : appliquer le Tracking Template au **niveau compte** Google Ads pour ne pas l'oublier sur chaque campagne :
```
Settings → Account → Tracking → URL options
```

## HubSpot

### Besoin 1 : Formulaire de contact connecté

**3 méthodes possibles** :

| Méthode | Pour | Contre |
|---------|------|--------|
| **HubSpot embed form** | Setup 5 min, tracking auto | Moins de contrôle CSS |
| **Webflow native form + API HubSpot** | Design 100% maîtrisé | Code custom + risque délai sync |
| **App HubSpot pour Webflow (officielle)** | Sync automatique champs | Limites de mapping |

**Recommandé démo** : HubSpot embed form (rapide à valider).

### Besoin 2 : Champs à mapper

**Champs standards** :
- `firstname`, `lastname`, `email`, `phone`, `message`

**Champs custom Nopillo à créer dans HubSpot** :

| Propriété | Type | Source | Usage |
|-----------|------|--------|-------|
| `utm_source` | string | URL param | Reporting |
| `utm_campaign` | string | URL param | Reporting |
| `utm_term` | string | URL param (= KW) | Segmentation |
| `utm_content` | string | URL param (= creative) | A/B test |
| `gclid` | string | URL param | Import conversion Google Ads |
| `search_term` | string | URL param | Analyse intention |
| `match_type` | string | URL param | Segmentation |
| `device` | string | URL param | Analyse |
| `landing_page_url` | URL | window.location | Attribution |
| `landing_kw` | string | URL param | Segmentation |

### Besoin 3 : Déduplication

**Règle HubSpot** : dédup par email actif par défaut. Vérifier que :
- Email obligatoire dans formulaire
- Pas de doublon créé si email existe déjà → mise à jour des propriétés

### Besoin 4 : Workflows HubSpot post-lead

- **Workflow 1** : Notification équipe commerciale (immédiat)
- **Workflow 2** : Email de confirmation au lead (immédiat)
- **Workflow 3** : Lead scoring selon `search_term` + `match_type`
- **Workflow 4** : Si `gclid` présent → import conversion vers Google Ads (Offline Conversion Import)

### Besoin 5 : Tracking site HubSpot

- Installer le **HubSpot tracking code** sur la LP (via app Webflow officielle ou snippet manuel)
- Permet attribution multi-touch côté HubSpot
- Permet d'utiliser les workflows basés sur visite/page vue

## Trustpilot

### Besoin 1 : Affichage de la note + avis

**3 options** :

| Option | Pour | Contre |
|--------|------|--------|
| **TrustBox widget officiel** | Setup 5 min, auto-update, conformité OK | Iframe = LCP impact |
| **API Trustpilot + render custom** | Performance + design maîtrisé | Plan API payant (B2B Business) |
| **Cache statique** | LCP rapide | Pas en temps réel |

**Recommandé démo** : TrustBox widget (suffisant pour démo).

### Besoin 2 : Conformité affichage

Obligatoire selon CGU Trustpilot :
- Affichage de la **note globale** (pas juste un avis cherry-picked)
- Mention `"Avis vérifiés Trustpilot"`
- Lien vers la fiche Trustpilot Nopillo
- Pas de modification des avis

### Besoin 3 : Filtrage par profil (avancé)

Pour personnalisation : afficher les avis matchant le profil détecté (ville, régime, persona).
**Démo** : pas nécessaire. **Industrialisation** : nécessite API Business.

## Webflow CMS API

### Besoin 1 : Collection "Landing pages dynamiques"

**Champs Collection** :

| Champ | Type | Source |
|-------|------|--------|
| `Name` | Plain text | Auto (KW + campagne) |
| `Slug` | Slug | Généré depuis KW |
| `KW` | Plain text | Input |
| `Campaign` | Reference (Collection Campaigns) | Mapping |
| `H1` | Plain text | IA |
| `Subtitle` | Plain text | IA |
| `Hero image` | Image | Statique ou variable |
| `Dynamic block title` | Plain text | IA |
| `Dynamic block body` | Rich text | IA |
| `Glossary` | Rich text (JSON) | IA |
| `FAQ` | Rich text (JSON) | IA |
| `Testimonials filter` | Multi-reference | Mapping |
| `Meta title` | Plain text | IA |
| `Meta description` | Plain text | IA |
| `Published date` | Date | Auto |
| `KW slug` | Plain text | Pour matching URL |

### Besoin 2 : Authentification API

- **Site API Token** Webflow (Site Settings → Integrations → API)
- Stocker dans variable d'env serveur (jamais exposer client-side)
- Rotation périodique recommandée

### Besoin 3 : Publication automatique

- API : `POST /collections/{collection_id}/items` puis `POST /collections/{collection_id}/items/{item_id}/publish`
- Ou : créer en `_draft` puis publish en batch

### Besoin 4 : Limites à connaître

- **60 requêtes/minute** (read + write)
- **8 items/seconde** en création
- **Plan CMS** : vérifier limite items totale (Standard = 2000, Pro = 10 000, +)

## Schéma de bout en bout

```
[1. Google Ads click]
    │
    │ URL : nopillo.fr/lp/{campagne}/{kw}?utm_term=...&searchterm=...&gclid=...
    ▼
[2. Webflow LP servie statique]
    │
    │ Bundle JS lit URL params + injecte dans formulaire (champs cachés)
    │ Widget Trustpilot chargé async
    ▼
[3. Visiteur remplit formulaire]
    │
    ├──> [HubSpot embed form] reçoit submit
    │         │
    │         ├──> Lead créé avec champs UTM + GCLID
    │         ├──> Workflow notification équipe
    │         └──> Workflow Offline Conversion → Google Ads
    │
    └──> [gtag/GA4] fire conversion event
              │
              ├──> Google Ads voit la conversion (gclid match)
              └──> GA4 enregistre event
```

## Sources

- [Webflow — HubSpot forms integration](https://help.webflow.com/hc/en-us/articles/33961418215059-HubSpot-forms-integration) — App officielle
- [Composite — HubSpot Webflow Integration guide](https://www.composite.global/news/the-complete-guide-for-integrating-hubspot-into-webflow) — 3 méthodes comparées
- [Tripledart — HubSpot Form Tracking GA4](https://www.tripledart.com/marketing-analytics/hubspot-form-tracking-in-ga4-using-google-tag-manager) — Setup GTM
- [Google Ads — ValueTrack setup](https://support.google.com/google-ads/answer/6305348?hl=en) — Tracking Template
- [Mavlers — Webflow HubSpot Form Sync](https://www.mavlers.com/blog/webflow-hubspot-form-integration/) — Form Sync feature
