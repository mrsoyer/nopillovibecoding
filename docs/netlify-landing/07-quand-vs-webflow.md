# 07 — Quand utiliser Netlify vs Webflow

## Resume executive

| Tu veux... | Choisis |
|------------|---------|
| Livrer une landing en 2 jours, le client edite seul ensuite | **Webflow** |
| Lighthouse 100/100 et SEO technique parfait | **Netlify + Astro** |
| Le client paie un retainer mensuel sans modif tech | **Webflow** |
| Logique serveur custom (auth, A/B test serveur, integration profonde) | **Netlify + Astro** |
| Workflow Git/PR avec staging multi-env | **Netlify + Astro** |
| Dev velocity max sur design visuel | **Webflow** |
| Cout hosting < 5 EUR/mois/site | **Netlify + Astro** |
| Multi-langue avec routing complexe | **Netlify + Astro** |
| Site one-shot evenementiel (rapidite > tout) | **Webflow** ou Netlify + template |
| Equipe non-tech edite contenus | **Webflow** ou Netlify + Decap CMS |

## Matrice de decision detaillee

### 1. Profil equipe

| Equipe | Outil naturel |
|--------|---------------|
| 1 designer Webflow | Webflow |
| 1 dev front + designer | Netlify (avec design dans Figma) |
| 1 PM seul, pas de dev | Webflow |
| Equipe technique deja Git/CI | Netlify |

### 2. Profil client

| Client | Outil |
|--------|-------|
| PME qui veut editer titres/photos seul | Webflow |
| Client tech qui code avec son equipe | Netlify |
| Client marketing qui A/B test souvent | Netlify (Edge Functions) |
| Client qui change rarement | Netlify (moins cher) |
| Client qui veut blog visuel CMS | Webflow ou Netlify + Sanity/Tina |

### 3. Profil projet

| Projet | Outil |
|--------|-------|
| Landing single-page marketing | Webflow (sauf si perf critique) |
| Site corporate 5-15 pages avec blog | Egal (Webflow leger plus rapide a livrer) |
| Site multi-langue | Netlify (routing/i18n plus puissant) |
| Site avec dashboard auth | Netlify |
| Microsite evenementiel 24h | Webflow ou Netlify template clone |
| Site avec API tierce complexe | Netlify (Functions) |
| Reskin design system d'une marque sur 10 sites | Netlify (1 design system, 10 deploys) |

### 4. Profil performance

| Besoin | Outil |
|--------|-------|
| Lighthouse > 90 | Webflow OK avec optimisations |
| Lighthouse > 95 stable | Netlify + Astro |
| Lighthouse 100 obligatoire (Ads, SEO competitif) | **Netlify + Astro uniquement** |
| Core Web Vitals dans le vert sans effort | Netlify + Astro |
| TTFB < 200 ms worldwide | Netlify (CDN) ou Webflow Pro |

### 5. Budget

#### Cas A : 1 client, 1 site simple, vie 2 ans

| Plateforme | Cout total 24 mois |
|------------|--------------------|
| Webflow Site Plan Basic | 14 USD x 24 = **336 USD** |
| Netlify (free tier OK) | **0 USD** |
| Cloudflare Pages | 0 USD |

**Rapidite livraison** : Webflow 30 % plus rapide → economie ~ 4-8 heures dev.

#### Cas B : 10 clients, sites moyens, vie 3 ans

| Plateforme | Cout total 36 mois |
|------------|--------------------|
| Webflow Site Plan x 10 | 14 x 10 x 36 = **5 040 USD** |
| Netlify Pro (1 compte agence) + Astro | 19 x 36 = **684 USD** |
| **Economie Netlify** | **4 356 USD** |

Mais : il faut compter **+ 6-12h dev par site** (vs Webflow). A 80 EUR/h interne = 480-960 EUR par site = 4 800-9 600 EUR. **L'economie hosting est mangee par le surcout dev**, sauf si on a un design system reutilise ou un workflow tres optimise.

#### Cas C : 1 site, mais besoin de A/B serveur, perso geo, integrations CRM custom

Webflow : impossible sans dev externe + tools tiers (Optimizely 50+ USD/mois, Geotargetly 20 USD/mois, etc.) → **vite 100+ USD/mois**.

Netlify : Edge Functions inclus, perso et A/B en code → **0 surcout**, juste du dev initial.

### 6. Risque vendor lock-in

| Plateforme | Lock-in |
|------------|---------|
| Webflow | **Eleve** : sortir = exporter HTML/CSS plat, perdre le CMS visuel et les forms |
| Netlify | **Faible** : c'est juste du HTML+JS, deployable n'importe ou (Cloudflare, Vercel, OVH) |

Pour un client qui veut "etre proprietaire" de son site, Netlify est plus rassurant.

## Arbre de decision

```
Le projet a-t-il besoin de logique serveur custom (auth, A/B serveur, webhooks, perso geo, multi-CRM) ?
├── OUI ───────────────────────────────────────► NETLIFY + Astro
└── NON
    │
    Le client va-t-il editer le contenu lui-meme regulierement, sans dev ?
    ├── OUI
    │   │
    │   Designer/marketeur sans tech ?
    │   ├── OUI ────────────────────────────────► WEBFLOW
    │   └── NON (a l'aise Markdown/CMS technique) ► NETLIFY + Decap/Tina
    │
    └── NON (peu/pas de modifs apres livraison)
        │
        Score Lighthouse 100 obligatoire ?
        ├── OUI ────────────────────────────────► NETLIFY + Astro
        └── NON
            │
            Budget hosting serre OU multi-sites (5+) ?
            ├── OUI ────────────────────────────► NETLIFY + Astro
            └── NON ────────────────────────────► WEBFLOW (rapidite livraison)
```

## Cas hybrides (le meilleur des deux)

### Pattern 1 : Webflow pour design, export vers Netlify

1. Designer build dans Webflow.
2. Export HTML/CSS.
3. Heberger sur Netlify (gratuit).
4. Cleanup HTML, ajouter forms Netlify, scripts custom.
5. Deploy.

Avantage : design rapide + cout hebergement zero + perf decente.
Inconvenient : on perd le CMS visuel Webflow → si client veut editer, retour Webflow.

### Pattern 2 : Webflow CMS + Netlify front

1. Webflow heberge le CMS (collections).
2. Netlify build un site Astro qui fetch les collections via Webflow API au build.
3. Deploy quand contenu change (build hook).

Avantage : client edite dans CMS Webflow visuel + perf Astro/Netlify.
Inconvenient : double facturation (Webflow CMS + Netlify), complexite supplementaire.

### Pattern 3 : Netlify + Webflow embed
Garder Webflow pour la home, embed une partie sur Netlify (microsite, app, dashboard).

## Recommandation strategique pour Nopillo

**Garder Webflow comme outil par defaut** : 70-80 % des landings clients sont mieux servies par Webflow (rapidite design, autonomie client, equipe deja experte).

**Proposer Netlify + Astro pour 3 segments** :
1. **Clients tech** (SaaS, devtools, agencies) qui veulent du code.
2. **Sites perf-critical** (campagnes Ads gros budget, SEO competitif).
3. **Multi-sites bouquet** (un client avec 10 microsites pays/produits).

**Argumentaire commercial** :
- Pour Webflow : "design pixel-perfect en 1 sprint, autonomie d'edition pour l'equipe marketing".
- Pour Netlify : "performance maximale, A/B testing serveur, cout hosting divise par 10, code source proprietaire client".

**Outillage interne** :
- Skill Claude Code `/deploy-landing-netlify` pour scaffolding rapide (cf. fichier 08).
- Template Astro Nopillo reutilisable (design system, components, formulaire HubSpot pre-cable).
- Doc onboarding clients tech (workflow PR, accees Netlify, edit Markdown).

## A retenir

Webflow et Netlify ne sont **pas concurrents** dans la pratique : ils servent des profils projets/clients differents. La vraie question n'est pas "lequel est meilleur" mais "lequel pour ce projet". L'agence gagne a maitriser les deux et a savoir arbitrer.

## Sources

- [Netlify vs Webflow - Soft Galley 2026](https://www.softgalley.com/compare/netlify-vs-webflow) — comparatif feature par feature 2026
- [Compare Netlify vs Webflow - SoftwareSuggest May 2026](https://www.softwaresuggest.com/compare/netlify-vs-webflow) — pricing et cas d'usage
- [Webflow vs Netlify - StackShare](https://stackshare.io/stackups/netlify-vs-webflow) — adoption et stacks compares
- [Netlify CMS vs Webflow - TrustRadius](https://www.trustradius.com/compare-products/netlify-cms-vs-webflow) — retours utilisateurs
- [Using Webflow with Netlify - Merrick Christensen](https://www.merrickchristensen.com/articles/using-webflow-and-netlify) — pattern hybride export Webflow vers Netlify
- [Best Landing Page Builders for Digital Agencies 2026 - Leadpages](https://leadpages.com/blog/best-landing-page-builders-for-digital-agencies-2026) — perspective agences
- [Webflow Agency Comparison 2026 - Miyagi](https://www.getmiyagi.com/post/webflow-agency-comparison-guide) — analyses cas clients agence
