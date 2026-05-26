# Conversion Tracking — GA4, Enhanced Conversions, Consent Mode V2

## Table des Matieres

1. [Vue d'ensemble du tracking 2026](#vue-densemble-du-tracking-2026)
2. [Setup GA4](#setup-ga4)
3. [Linker GA4 et Google Ads](#linker-ga4-et-google-ads)
4. [Enhanced Conversions](#enhanced-conversions)
5. [Consent Mode V2](#consent-mode-v2)
6. [Server-Side Tagging (avance)](#server-side-tagging-avance)
7. [Verification & QA](#verification--qa)
8. [Erreurs courantes](#erreurs-courantes)

## Vue d'Ensemble du Tracking 2026

Le tracking conversion est la **fondation** de tout Google Ads efficace. Sans tracking precis, Smart Bidding optimise pour de mauvais signaux et brule du budget.

### Pile Recommandee 2026

```
┌─────────────────────────────────────┐
│  Server-Side Tagging (optionnel)   │
│  ├─ Resilient to ad blockers       │
│  └─ Cookies first-party etendus    │
└─────────────────────────────────────┘
              ↑
┌─────────────────────────────────────┐
│  Consent Mode V2 (obligatoire EU)  │
│  ├─ analytics_storage              │
│  ├─ ad_storage                     │
│  ├─ ad_user_data (Nov 2023+)       │
│  └─ ad_personalization (Nov 2023+) │
└─────────────────────────────────────┘
              ↑
┌─────────────────────────────────────┐
│  Enhanced Conversions (+5-15%)     │
│  └─ Hashed first-party data        │
└─────────────────────────────────────┘
              ↑
┌─────────────────────────────────────┐
│  GA4 + Google Ads link (base)      │
│  └─ Auto-tagging activated         │
└─────────────────────────────────────┘
```

### Impact Mesure

- **Enhanced Conversions** : +5-15% de conversions reportees
- **Consent Mode V2 Advanced** : recupere ~30-50% des conversions perdues sur consent denied (vs 0% Basic)
- **Data-Driven Attribution** : meilleure allocation budget vs last-click (corrige sur-credit brand)

## Setup GA4

### Etape 1 — Creer la Property GA4

1. Google Analytics → **Admin** → **Create Property**
2. Configurer la **Data Stream** (Web)
3. Activer **Enhanced Measurement** (auto-track scrolls, outbound, search, video, downloads)
4. Recuperer le **Measurement ID** (commence par `G-XXXXXXX`)

### Etape 2 — Installer Google Tag (via GTM Recommande)

**Pourquoi GTM** : flexibilite, debug, server-side eventuel, pas de redeploy site.

```html
<!-- GTM container snippet, head + body -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Dans GTM :
1. Tag : "Google Analytics: GA4 Configuration"
2. Measurement ID : `G-XXXXXXX`
3. Trigger : "All Pages"
4. Publish container

### Etape 3 — Definir les Conversion Events

GA4 = event-based. Events conversion typiques :

| Type business | Events conversion |
|---------------|-------------------|
| **Ecommerce** | `purchase`, `begin_checkout`, `add_to_cart` |
| **Lead generation** | `generate_lead`, `contact`, `schedule_demo` |
| **SaaS** | `sign_up`, `subscription`, `first_value` |
| **Content / Media** | `complete_video`, `download`, `subscribe_newsletter` |

Marquer comme conversions : Admin → Events → toggle "Mark as conversion".

## Linker GA4 et Google Ads

### Process Standard

1. **GA4 Admin → Product Links → Google Ads Links**
2. Click **Link** → selectionner ton compte Google Ads
3. **Google Ads** : Settings → Account Settings → activer **Auto-tagging** (CRITIQUE)
4. **Google Ads** : Tools and Settings → Conversions → **Import GA4 conversions**

### Choix : Native vs GA4 Imported

**Critical** : ne PAS dupliquer.

| Source | Avantage | Inconvenient |
|--------|----------|--------------|
| **Google Ads native conversions** | Eligible bidding, latence faible | Pas de behavioral GA4 |
| **GA4 imported conversions** | Cross-channel attribution riche | Pas eligible bidding optimization |

**Recommandation 2026** :
- Conversions principales (purchase, signup) → **Google Ads native**
- Conversions secondaires (engagement) → **GA4 import en "Secondary"**

### Attribution Model

Defaut 2026 : **Data-Driven Attribution (DDA)**.
- Utilise ML pour distribuer le credit conversions
- Bien meilleur que last-click qui sur-credite brand
- Active dans Conversion Action settings

## Enhanced Conversions

### Principe

Enhanced Conversions hash des donnees first-party (email, phone, address) au moment de la conversion et envoient a Google. Google match avec son base d'utilisateurs loggés → recupere conversions perdues a cause des cookie restrictions, cross-device, ou delays.

**Impact** : "5% to 15% increase in reported conversions" (Google official + multiple agencies).

### Setup via GTM (Recommande)

#### Etape 1 — Activer dans Google Ads

1. Tools and Settings → **Conversions** → Settings
2. Click **Turn on enhanced conversions**
3. Accept **Customer Data Terms**
4. Selectionner **Google Tag Manager** comme implementation method

#### Etape 2 — Push User Data au Data Layer

Sur la page de confirmation conversion :

```javascript
dataLayer.push({
  'event': 'purchase',
  'user_data': {
    'email': 'customer@example.com',
    'phone_number': '+33612345678',
    'address': {
      'first_name': 'Jane',
      'last_name': 'Smith',
      'street': '123 Main St',
      'city': 'Paris',
      'region': 'IDF',
      'postal_code': '75001',
      'country': 'FR'
    }
  }
});
```

GTM hash automatiquement (SHA-256) avant envoi a Google.

#### Etape 3 — Variables GTM

Creer Data Layer Variables :
- `user_data.email`
- `user_data.phone_number`
- `user_data.address.first_name`
- `user_data.address.last_name`
- ... etc

Mapper dans le Conversion tag → section "User-provided data".

#### Etape 4 — Verification

- GTM Preview Mode : verifier user_data populated avec valeurs hashees
- Google Ads → Conversions → Diagnostics : "Enhanced conversions: Active" (apres 72h)
- Healthy : **50%+ enhanced conversions**. Below 30% = data capture problem.

### Enhanced Conversions for Leads

Pour B2B / lead gen (ou la conversion finale est offline) :
1. Configure Enhanced Conversions sur le form submit
2. Upload CRM data (lead → customer matching) via offline conversion import
3. Google optimise pour leads a haute probabilite de conversion

## Consent Mode V2

### Obligation Legale

> Consent Mode V2 est OBLIGATOIRE depuis Mars 2024 pour tout advertiser servant des users en EEA/UK utilisant Google products.

US-only : pas legalement requis, mais tres benefique (Safari/Firefox cookie restrictions, US state privacy laws qui se multiplient).

### Les 4 Consent Types

| Type | Controle |
|------|----------|
| **analytics_storage** | Cookies Google Analytics |
| **ad_storage** | Cookies Google Ads |
| **ad_user_data** | Envoi user data pour ads (Nov 2023+) |
| **ad_personalization** | Remarketing & personalized ads (Nov 2023+) |

### Basic vs Advanced Mode

| Mode | Comportement consent denied | Recovery |
|------|------------------------------|----------|
| **Basic** | Tags BLOCKED entierement | 0% data |
| **Advanced** | Cookieless pings → modeled conversions | ~30-50% data recuperee |

**Recommandation** : ALWAYS use Advanced Mode. Avec acceptance moyenne 31%, Basic = perdre 69% du data.

### Implementation

#### Etape 1 — Choisir un CMP Google-certifie

Options : CookieScript, Termly, Cookiebot, OneTrust, CookieYes, Iubenda.

Verifier : compatible **TCF v2.3** (migration Feb 2026).

#### Etape 2 — Default State (denied for EEA/UK)

Custom HTML tag dans GTM, **avant** tous les autres tags :

```javascript
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});
```

#### Etape 3 — Update on User Choice

Quand user accepte :

```javascript
gtag('consent', 'update', {
  'analytics_storage': 'granted',
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted'
});
```

La plupart des CMPs certifies Google gerent automatiquement.

#### Etape 4 — Verifier

- **Avant interaction** : GTM Preview / Tag Assistant → consent = denied
- **Apres acceptance** : consent = granted
- **Apres rejection** : Advanced Mode → cookieless pings visibles dans Network

### Conversion Modeling Requirements

Google modelise les conversions des unconsented users si :
- 700+ ad clicks / 7 jours / pays / domain
- 7 jours full de data
- Consent rate "raisonnable" (20%+ ideal)

## Server-Side Tagging (Avance)

### Quand l'Implementer

Pas pour tous. Indications :
- Pertes data ad blockers > 40% (audience tech-savvy)
- Audience Safari-heavy
- Spend > 10K€/mois ou la precision impacte materially le ROI
- Industrie data-sensitive (finance, sante)

### Comment ca Marche

```
Browser → Ton serveur (analytics.tonsite.com) → Google
                  ↓
              First-party cookie
              Pas affecte par ad blockers
              Cookies pre-set by server (cross-device etendu)
```

### Setup Overview

1. Creer **server container** GTM (different du web container)
2. Deploy sur GCP App Engine ou Cloud Run, ou managed (Stape ~20€/mois)
3. Configurer subdomain : `analytics.tonsite.com` ou `data.tonsite.com`
4. Update web container : envoyer GA4 events vers server URL
5. Configurer server-side tags : forward vers GA4 + Google Ads

### Cout

- **Self-hosted GCP** : 50-150€/mois pour 100K-500K sessions/mois
- **Stape managed** : 20€/mois pour low-traffic, 100€+ medium

## Verification & QA

### Real-Time Testing Checklist

#### GA4 Real-Time Report
- [ ] Open GA4 → Reports → Real-Time
- [ ] Load site (incognito tab)
- [ ] Trigger test conversion
- [ ] Page views et events visible en quelques secondes

#### GTM Preview Mode
- [ ] Click Preview dans GTM
- [ ] Naviguer site + test conversion
- [ ] Verify GA4 Configuration tag fires sur all pages
- [ ] Verify Conversion tag fires sur thank-you page
- [ ] Verify user_data variables populated
- [ ] Verify consent signals (denied → granted)

#### Google Ads Tag Diagnostics
- [ ] Tools and Settings → Conversions
- [ ] Click each conversion action → Diagnostics tab
- [ ] "Tag status: Active"
- [ ] "Enhanced conversions: Active" (apres 72h)
- [ ] No warnings/errors

#### Google Tag Assistant Extension
- [ ] Install extension Chrome
- [ ] Naviguer site
- [ ] Tags green = healthy
- [ ] Red/yellow = issues a fix

## Erreurs Courantes

### 1. Double-Counting

❌ Tracker meme conversion dans Google Ads native ET GA4 imported simultanement → chaque purchase counte 2x → CPA artificiellement /2.

✅ Une source of truth. Si GA4 imports, set Google Ads native a "Secondary".

### 2. Internal Traffic Pollution

❌ Visites employes / dev / QA inflent les data, surtout pour small businesses.

✅ GA4 → Admin → Data Streams → Define internal traffic (IPs office) → Filter active.

### 3. Enhanced Conversions Cassees

❌ User data pas capture (auto-detection fails sur custom layouts, mauvais data layer push, conversion tag fire avant data dispo).

✅ GTM Preview pour verifier user_data populated. Pour automatic detection : form fields avec names/IDs reconnaissables.

### 4. Auto-Tagging Disabled

❌ Sans auto-tagging, Google ne peut pas attribuer ad clicks aux conversions.

✅ Google Ads → Settings → Account Settings → enable Auto-tagging.

### 5. Consent Mode Mal Configure

❌ Pas de Consent Mode ou Basic mode → perte massive data sur consent denied.

✅ Advanced Mode + CMP certifie. Test default denied state + update granted.

### 6. Conversion Window Mismatch

❌ Window 30 jours par defaut → trop court pour B2B (cycle 60-90j) ou trop long pour ecommerce flash sale.

✅ Review actual time-to-conversion (Tools → Attribution → Paths). Set window pour capturer 90-95% conversions.

### 7. Last-Click Attribution

❌ Last-click sur-credite brand keywords + bottom-funnel, sous-credite discovery.

✅ Switch to **Data-Driven Attribution** (default 2026 pour new conversions).

## Priorite d'Implementation

```
1. GA4 + Google Ads link + Auto-tagging       [CRITIQUE]
2. Define conversions (events) + DDA           [CRITIQUE]
3. Enhanced Conversions (highest ROI/effort)   [HIGH]
4. Consent Mode V2 (obligatoire si EU)         [HIGH si EU]
5. Server-side tagging (si justifie)           [LOW]
```

## Sources

- [Google Ads Conversion Tracking Setup 2026 (Groas.ai)](https://groas.ai/post/google-ads-conversion-tracking-setup-2026-the-complete-guide-ga4-enhanced-conversions-consent-mode) — Guide complet
- [Enhanced Conversions setup (Stape)](https://stape.io/blog/ga4-and-google-ads-enhanced-conversions-tracking-setup-guide) — Implementation
- [Enhanced Conversions in GA (Google official)](https://support.google.com/analytics/answer/14252663?hl=en) — Doc Google
- [Maximize Conversions: Enhanced Tracking (Napkyn)](https://www.napkyn.com/blog/implementing-enhanced-conversions-in-google-ads-and-ga4) — Best practices
- [Google Ads + GA4 conversions best practices (Adswerve)](https://adswerve.com/blog/google-ads-ga4-conversions-best-practices-recommendations) — Approche pro
- [GA4 vs Google Ads Attribution 2026 (AnalyticsMates)](https://www.analyticsmates.com/post/how-ga4-vs-google-ads-attribution-uncovers-deeper-conversion-insights) — Comparaison
