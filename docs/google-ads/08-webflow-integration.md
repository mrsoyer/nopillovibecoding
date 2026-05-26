# Webflow + Google Ads — Integration Native 2026

## Vue d'Ensemble

En **Janvier 2026**, Webflow et Google ont lance une integration native disponible sur le **Webflow Marketplace**. Elle permet de gerer les campagnes Google Ads directement depuis Webflow, avec un focus particulier sur Performance Max et la personnalisation des landing pages.

**Promesse** : eliminer le platform-switching en unifiant site, traffic acquisition, et performance analytics dans une seule plateforme.

## Capacites de l'Integration

### Types de Campagnes Supportees

L'integration permet de creer et gerer :
- **Search**
- **YouTube**
- **Display**
- **Gmail**
- **Maps**
- **Performance Max** (highlight de l'integration)

### Features Cles

| Feature | Description |
|---------|-------------|
| **Unified Campaign Management** | Build/manage/optimize campagnes from Webflow |
| **Performance Max powered by AI** | Adaptation continue au comportement utilisateur |
| **AI-driven personalization** | Personalization tools natifs Webflow + AI Google Ads |
| **Seamless landing page flow** | Reduit friction, ameliore conversion potential |
| **Real-time feedback loops** | Marketers ajustent creatives/site selon perf actuelle |
| **Conversion signals integration** | Data conversion → decisions site + campagne |

### Incentive de Lancement

Nouveaux advertisers eligibles : **500 USD** de credit Google Ads quand ils depensent leurs premiers 500 USD dans 60 jours.

## Architecture de l'Integration

```
┌──────────────────────────────────────────────┐
│           Webflow Designer                   │
│  ┌──────────────────────────────────────┐   │
│  │  Site & Landing Pages                │   │
│  │  + AI personalization                │   │
│  │  + Webflow CMS                       │   │
│  └──────────────────────────────────────┘   │
│                    ↕                          │
│  ┌──────────────────────────────────────┐   │
│  │  Google Ads for Webflow App          │   │
│  │  (depuis Marketplace)                │   │
│  │  + Performance Max setup             │   │
│  │  + Asset feed sync                   │   │
│  │  + Conversion signals                │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
                    ↕
┌──────────────────────────────────────────────┐
│           Google Ads (cloud)                 │
│  + AI optimization                           │
│  + Cross-channel delivery                    │
│  + Conversion tracking                       │
└──────────────────────────────────────────────┘
```

## Setup de l'Integration

### Etape 1 — Installer l'App

1. Webflow Marketplace → **Google Ads for Webflow**
2. Click **Install** sur ton site
3. Authoriser OAuth Google Ads → connection MCC

### Etape 2 — Configurer les Conversions

L'integration aide a setup :
- **URL-based conversions** (thank-you pages)
- Form-based conversions (Webflow forms native)
- Ecommerce events (Webflow Ecommerce sync)

Voir [07-conversion-tracking.md](07-conversion-tracking.md) pour le detail GA4 + Enhanced Conversions.

### Etape 3 — Product Feed (Ecommerce)

Pour ecommerce :
- Sync **Webflow products → Google Merchant Center** (via integration native)
- Permet PMax ecommerce avec product feeds
- Retargeting visiteurs qui ont vu produits specifiques

### Etape 4 — Creer Campagne PMax

Depuis l'app Webflow Google Ads :
- Selectionner asset groups (avec creatives Webflow)
- Definir audience signals
- Connecter conversion goals
- Lancer

## Personnalisation Webflow + Google Ads

L'integration native ne fait PAS DKI automatiquement. Tu dois toujours implementer Dynamic Keyword Insertion via custom JS (voir [05-personalization-dynamic-content.md](05-personalization-dynamic-content.md)).

### Ce que l'integration apporte

- Cohérence : tag GA4 + Google Ads pre-configures
- Conversion tracking simplifie via Webflow forms
- Product feed automation (ecommerce)
- Data flow seamless pour PMax learning

### Ce que tu dois encore faire toi-meme

- Dynamic Keyword Insertion sur landing pages (custom JS)
- Personnalisation par segment (geo, device, returning)
- A/B tests structures (Webflow Optimize ou Optimizely)
- Optimisation page speed (LCP, CLS, INP)
- Enhanced Conversions data layer push

## Pattern Recommande pour Projet Webflow + Google Ads

### Architecture Page

```
/landing-formation                    → Static, SEO + organic
/landing-ads-formation                → DKI active, Google Ads only
/landing-ads-formation?keyword=...    → DKI replace dynamiquement
```

### Conversion Tracking Webflow

1. **Webflow Site Settings** → **Custom Code** → installer GTM head + body
2. **GTM** : config GA4 + Google Ads tags
3. **Webflow Forms** : custom event sur submit success
4. **Thank-you page** dediee `/thank-you-formation` → fire conversion
5. **Enhanced Conversions** : data layer push email/phone du form

### Workflow Optimisation

```
Semaine 1: Setup
├─ Install integration Webflow + GA
├─ Configure GTM + GA4 + Google Ads
├─ Implement DKI sur landing dediees
├─ Setup Enhanced Conversions
└─ Launch PMax campaign

Semaine 2-4: Learning
├─ Smart Bidding apprend (laisser stable)
├─ Daily check anomalies (script)
└─ Weekly review search terms + negatives

Semaine 4+: Optimisation
├─ A/B test landing variants
├─ Asset performance review (PMax script)
├─ Quality Score audit (via MCP Claude)
└─ Iterate
```

## Bonnes Pratiques Specifiques Webflow

### Performance

- Activer **Asset minification** (Site Settings)
- Utiliser **Webflow CDN** pour images
- **Lazy load** images via attribut natif
- Eviter custom code lourd avant `</body>`
- **Defer** scripts non-critiques

### Custom Code Discipline

- **Site-wide custom code** = head/body pour tags tracking, CMP
- **Page-level custom code** = pour DKI specifique landing
- **Component-level** = composants reutilisables avec data attrs

### Webflow Forms + Google Ads

- Form submit → success state → fire conversion event
- Push email / phone / data au dataLayer pour Enhanced Conversions
- Use **redirect to thank-you page** (mieux pour tracking) plutot que message inline

### CMS Dynamique pour Landing Variants

Possibilite : creer une **CMS Collection "Landing Variants"** avec :
- Slug par campagne
- Headline / subhead / CTA par variante
- Asset images dedies

→ 1 template, N landings via CMS, URL clean type `/lp/[campaign-slug]`.

## Limitations de l'Integration 2026

- **Pas de DKI native** : custom JS necessaire
- **Pas de personalization engine pousse** : pas equivalent Adobe Target
- **Pas de scripts custom Google Ads management** depuis Webflow (faut aller sur Google Ads UI)
- **Tracking Enhanced Conversions** : pas auto-config, faut pousser data layer manuellement
- **PMax UI limitee** : pour fine-tuning, retourner a Google Ads UI

## Stack Reference Recommande

```
LAYER          | OUTIL
---------------|---------------------------
Site builder   | Webflow
Tag management | GTM (head + body Webflow)
Analytics      | GA4
Ads            | Google Ads (via Webflow app + UI)
Personalization| Custom JS (DKI) + Webflow CMS variants
A/B testing    | Webflow Optimize ou Optimizely
Performance    | Webflow CDN + minification + lazy load
Compliance     | CookieScript ou Cookiebot (CMP)
Automation     | Claude Code + MCP Google Ads
```

## Sources

- [Introducing Google Ads for Webflow (Webflow Blog)](https://webflow.com/blog/google-ads-integration) — Annonce officielle Janvier 2026
- [Webflow + Google Ads Integration Boosts Performance (TechIntelPro)](https://techintelpro.com/news/marketing/ai/webflow-google-ads-integration-boosts-campaign-performance) — Analyse impact
- [Webflow and Google Ads Press Release (PR Newswire)](https://www.prnewswire.com/news-releases/webflow-and-google-ads-collaborate-to-launch-an-integration-for-smarter-campaign-performance-302668643.html) — Communique officiel
- [Integrate Google Ads with Webflow (Webflow)](https://webflow.com/integrations/google-ads) — Doc setup
- [Integrate Google Analytics with Webflow (Webflow)](https://webflow.com/integrations/google-analytics) — GA4 Webflow
- [Webflow + Google Ads launch coverage (MarTech360)](https://martech360.com/mobile-tech/digital-advertising/webflow-and-google-ads-launch-integrated-advertising-experience/) — Synthese
