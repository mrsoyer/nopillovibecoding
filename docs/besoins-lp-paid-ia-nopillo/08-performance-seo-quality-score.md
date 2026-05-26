# 08 — Performance, SEO et Quality Score

## Vue d'ensemble

3 leviers d'optimisation imbriqués : la performance technique (Core Web Vitals) alimente directement le Quality Score Google Ads via la composante "landing page experience". Bien que paid only (noindex), les pages doivent respecter les standards SEO techniques car le crawler Google les évalue.

## Table des matières

- [Quality Score : ce qui compte vraiment en 2026](#quality-score--ce-qui-compte-vraiment-en-2026)
- [Core Web Vitals](#core-web-vitals)
- [URL et nomenclature](#url-et-nomenclature)
- [Indexation et SEO technique](#indexation-et-seo-technique)
- [Schema.org](#schemaorg)
- [Checklist de publication](#checklist-de-publication)

## Quality Score : ce qui compte vraiment en 2026

Le modèle IA Google 2026 ne juge plus seulement la technique. Il **lit le contenu de la page** et l'évalue contre l'intention du KW. 3 facteurs dominants :

### 1. Content relevance (poids ~40%)

- Le H1 reformule-t-il la requête ?
- Le contenu répond-il à l'intention ?
- Le vocabulaire correspond-il au niveau de l'audience ?
- La page est-elle thématiquement cohérente ?

### 2. Navigation clarity (poids ~20%)

- Y a-t-il un CTA évident ?
- Le visiteur sait-il quoi faire ?
- Pas de distractions inutiles ?

### 3. Ad-to-page consistency (poids ~25%)

- L'annonce promet X, la page parle de X ?
- Cohérence message annonce ⇄ landing
- Pas de bait-and-switch

### 4. Technical (poids ~15%)

- Mobile responsive
- HTTPS
- Core Web Vitals
- Pas d'éléments cassés

## Core Web Vitals

### Cibles 2026

| Métrique | Définition | Cible | Limite "needs improvement" | Échec |
|----------|------------|-------|---------------------------|-------|
| **LCP** (Largest Contentful Paint) | Temps d'affichage du plus grand élément visible | **< 2.5s** | 2.5s - 4s | > 4s |
| **CLS** (Cumulative Layout Shift) | Stabilité visuelle (shifts inattendus) | **< 0.1** | 0.1 - 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | Réactivité aux interactions | **< 200ms** | 200ms - 500ms | > 500ms |
| **FCP** (First Contentful Paint) | Premier élément affiché | **< 1.8s** | 1.8s - 3s | > 3s |
| **TTFB** (Time to First Byte) | Temps réponse serveur | **< 800ms** | 800ms - 1800ms | > 1800ms |

### Cible Nopillo démo

- **LCP mobile < 2s** (objectif ambitieux, justifié par paid traffic)
- **CLS < 0.1** strict
- **PageSpeed Insights mobile** : score > 85

### Leviers d'optimisation

#### LCP

- Image hero en **WebP/AVIF**, < 80kb, dimensions exactes
- `<img>` avec `fetchpriority="high"` pour hero
- Pas de lazy load sur hero
- Preload des fonts critiques
- Critical CSS inline
- CDN proche (Webflow OK, Cloudflare bonus)

#### CLS

- **Dimensions explicites** sur tous médias (`width`, `height` ou aspect-ratio)
- Pas d'injection de contenu après chargement
- Fonts : `font-display: optional` ou `swap` avec fallback metrics
- Trustpilot widget : réserver l'espace avant chargement

#### INP

- Pas de JS bloquant le main thread (> 50ms)
- Code splitting si script lourd
- Lazy load des scripts tiers non critiques (Hotjar, etc.)
- Debouncer les inputs simulateur

#### Webflow spécifique

- Désactiver les interactions non utilisées
- Limiter les fonts (max 2 familles)
- Compresser les images avant upload
- Activer Webflow CDN + Optimization

## URL et nomenclature

### Pattern URL démo

```
https://nopillo.fr/lp/{campagne-slug}/{kw-slug}
```

**Exemples** :
- `/lp/lmnp-exact/expert-comptable-lmnp`
- `/lp/lmnp-exact/expert-comptable-lmnp-paris`
- `/lp/lmnp-broad/calcul-amortissement-appartement`
- `/lp/expat/fiscalite-lmnp-non-resident`

### Règles de slug

- **kebab-case** uniquement
- Pas d'accents (`expat` pas `expatrié`)
- Pas de caractères spéciaux
- Longueur max 60 caractères
- Inclure le KW principal en début de slug

### Bénéfices

- **Quality Score** : Google Ads peut crawler l'URL et y trouver le KW
- **Tracking** : URL parlante dans GA4
- **A/B test** : tester `/lp/v2/` facilement
- **Maintenance** : URL stable indépendamment du contenu IA

## Indexation et SEO technique

### Indexation : noindex recommandé

**Pourquoi `noindex`** :
- Pages paid only, pas de valeur SEO
- Éviter cannibalisation avec pages SEO existantes
- Éviter pénalité "thin content" si IA génère du contenu jugé pauvre
- Volume de pages similaires risque pénalité programmatic SEO

**Implémentation** :
```html
<meta name="robots" content="noindex, follow">
```

`follow` permet de transmettre l'autorité interne si maillage avec pages indexées.

### robots.txt

```
User-agent: *
Disallow: /lp/

# Permettre AdsBot pour Quality Score check
User-agent: AdsBot-Google
Allow: /lp/
```

### Sitemap

- Sitemap dédié `sitemap-paid.xml` (si utile pour debug)
- **NE PAS** ajouter au sitemap principal
- **NE PAS** soumettre à Google Search Console

### Canonical

- Self-canonical pour chaque LP : `<link rel="canonical" href="{URL exacte}">`
- Pas de canonical vers la home (risque de mauvaise interprétation)

### Meta title et description

**Pattern** :
- Title : `{H1} — Nopillo` (max 60 caractères)
- Description : reformulation sous-titre, < 155 caractères, inclut CTA

**Exemple** :
- Title : `Expert-comptable LMNP à Paris en 24h — Nopillo`
- Description : `Trouvez votre expert-comptable LMNP à Paris pour 599€. Liasse 2031 prête en 15 min. ⭐ 4.7/5 sur Trustpilot.`

## Schema.org

Même en `noindex`, ajouter du schema bénéficie au QS (le crawler IA Google lit le markup).

### Schema recommandés

#### Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Expert-comptable LMNP",
  "provider": {
    "@type": "Organization",
    "name": "Nopillo",
    "url": "https://nopillo.fr"
  },
  "areaServed": "France",
  "offers": {
    "@type": "Offer",
    "price": "599",
    "priceCurrency": "EUR"
  }
}
```

#### FAQPage (si section FAQ présente)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte un expert-comptable LMNP ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez Nopillo, la liasse fiscale 2031 LMNP est facturée 599€ TTC..."
      }
    }
  ]
}
```

#### Organization (footer)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nopillo",
  "url": "https://nopillo.fr",
  "logo": "https://nopillo.fr/logo.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{trustpilot_score}",
    "reviewCount": "{trustpilot_count}"
  }
}
```

## Checklist de publication

Avant chaque mise en ligne d'une LP démo :

### Performance

- [ ] PageSpeed Insights mobile > 85
- [ ] LCP < 2s validé
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Images WebP/AVIF
- [ ] Pas de console error JS

### Contenu

- [ ] H1 reformule le KW/Search Term
- [ ] KW présent 2-3 fois max
- [ ] Pas de superlatif interdit
- [ ] CTA primaire visible above the fold
- [ ] Mentions légales footer
- [ ] Politique de confidentialité linkée

### Technique

- [ ] HTTPS
- [ ] `noindex` activé
- [ ] Canonical auto-référent
- [ ] Schema.org Service ajouté
- [ ] Schema.org FAQPage si applicable
- [ ] Meta title < 60 char
- [ ] Meta description < 155 char

### Tracking

- [ ] GTM container installé
- [ ] GA4 page_view fire
- [ ] Google Ads conversion linker actif
- [ ] HubSpot tracking actif
- [ ] Form submit déclenche conversion
- [ ] UTMs capturés dans formulaire
- [ ] Consent Mode v2 implémenté

### Intégrations

- [ ] Formulaire test → lead HubSpot reçu
- [ ] Champs UTM remontent dans HubSpot
- [ ] Trustpilot widget affiché et conforme
- [ ] Lien Trustpilot fonctionne
- [ ] Tel : et mailto : cliquables

### Mobile

- [ ] Test iPhone (Safari)
- [ ] Test Android (Chrome)
- [ ] Tap targets > 48px
- [ ] Pas de horizontal scroll
- [ ] Formulaire utilisable au pouce

## Sources

- [Foundry CRO — AI Max & Quality Score 2026](https://foundrycro.com/blog/google-ads-landing-page-best-practices-2026/), [DynaRes — Quality Score 2026](https://dynares.ai/resources/blog/what-google-quality-score-really-cares-about-in-2026-beyond-the-usual-nonsense), [Groas — Quality Score 2026](https://www.groas.com/post/google-ads-quality-score-optimization-2026-improve-expected-ctr-ad-relevance-landing-page), [Memorable.design — Programmatic SEO 2026](https://memorable.design/programmatic-seo-2026/), [Apexure — Dynamic LP 2026](https://www.apexure.com/blog/how-to-create-dynamic-landing-pages/)
