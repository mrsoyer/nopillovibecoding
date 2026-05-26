# Google Ads — Best Practices Campagnes 2026

## Table des Matieres

1. [Architecture du compte](#architecture-du-compte)
2. [Choix du type de campagne](#choix-du-type-de-campagne)
3. [Strategie keywords](#strategie-keywords)
4. [Strategie d'enchères](#strategie-denchères)
5. [Creatives et assets](#creatives-et-assets)
6. [Budget et scaling](#budget-et-scaling)
7. [Optimisation continue](#optimisation-continue)

## Architecture du Compte

### Principe : Less is More en 2026

L'epoque des comptes hyper-segmentes est revolue. Avec Smart Bidding, **chaque campagne a besoin de volume de donnees**. La fragmentation tue l'apprentissage algorithmique.

**Regle d'or** : 30-50 conversions/mois minimum par campagne pour Smart Bidding efficace.

### Structure Recommandee

```
COMPTE
├── Campagne 1 — Brand (Search)
│   ├── Ad Group : Marque + variantes
│   └── Ad Group : Marque + concurrents
│
├── Campagne 2 — Non-Brand Core (Search ou AI Max)
│   ├── Ad Group : Theme produit/service A
│   └── Ad Group : Theme produit/service B
│
├── Campagne 3 — Performance Max
│   ├── Asset Group : Audience 1 + creatives
│   └── Asset Group : Audience 2 + creatives
│
└── Campagne 4 — Demand Gen (optionnel)
    └── Ad Groups par audience cible
```

**Demarrage** : 2-4 campagnes core, puis expansion progressive selon budget et conversions.

### Anti-Pattern : Sur-Segmentation

Une fragmentation excessive (10+ campagnes pour un budget moyen) divise les donnees, empêche Smart Bidding d'apprendre, et augmente le CPA de 40-60% selon les agences.

## Choix du Type de Campagne

### Decision Tree

| Objectif | Type recommande |
|----------|-----------------|
| Capter intent search direct | **Search** ou **AI Max Search** |
| Convertir demande haute intention multi-canal | **Performance Max** |
| Construire awareness | **Demand Gen** |
| Vendre un catalogue ecommerce | **PMax** (avec product feed) |
| Retargeter visiteurs site | **Display Remarketing** ou **PMax avec audiences** |

### Performance Max : Mode d'Emploi

**Avantages** :
- 35% de conversions de plus, 20% de CPA en moins (Google Q1 2026)
- Apprentissage automatique sur Search, YouTube, Display, Gmail, Maps
- Asset Groups remplacent Ad Groups

**Pieges** :
- Black box : difficile a diagnostiquer
- Tendance a "cherry-pick" du brand traffic (gonfle artificiellement le ROAS)
- Necessite product feed propre (ecommerce) ou pages clean (lead gen)

**Recommandation** : exclure les keywords brand de PMax via la fonction "Brand exclusions" pour eviter le cannibalisme.

## Strategie Keywords

### Match Types en 2026

| Match Type | Usage 2026 |
|------------|------------|
| **Broad Match** | DEFAUT, combine avec Smart Bidding |
| **Phrase Match** | Pour controler scope sur sujets sensibles |
| **Exact Match** | Brand terms, mots-cles a haute valeur |
| **Negative Keywords** | OBLIGATOIRE et continu |

### Negative Keywords : Discipline Critique

**Sans negatives, Broad Match brule du budget.**

Process recommande :
1. Audit hebdomadaire du Search Terms Report
2. Identifier termes avec spend sans conversion
3. Ajouter en negative au niveau campagne ou ad group
4. Maintenir une liste de **shared negatives** au niveau compte (concurrents, geographies exclues, intentions non-commerciales)

### Audiences : Layer "Observation" en Smart Bidding

Au lieu de targeting strict, ajouter audiences (In-Market, Affinity, Custom) en **mode Observation**. Cela enrichit Smart Bidding sans restreindre la portee.

## Strategie d'Enchères

### Choix de la Bid Strategy

| Strategy | Quand l'utiliser | Prerequis |
|----------|------------------|-----------|
| **Maximize Conversions** | Demarrage, pas encore de tCPA fiable | 0+ conversions |
| **Target CPA** | CPA cible connu et stable | 30+ conversions/30j |
| **Maximize Conversion Value** | Ecommerce, valeurs variables | Tracking value-based |
| **Target ROAS** | ROAS cible connu | 50+ conversions value-based/30j |
| **Manual CPC** | RARE en 2026, cas tres specifiques | - |

### Apprentissage et Stabilite

- **Learning period** : 1-2 semaines apres changement majeur
- **Eviter** : changer de bid strategy < 2 fois/mois (reset l'apprentissage)
- **Buffer budget** : 2-3x le tCPA en budget journalier minimum

## Creatives et Assets

### Responsive Search Ads (RSA) — Standard 2026

Format unique en 2026. Fournir :
- **15 headlines** (max 30 caracteres chacun)
- **4 descriptions** (max 90 caracteres)
- **Pinning** strategique : pin le headline 1 sur l'USP principale, mais laisser flexibilite sur les autres

### Sitelink Assets

- **Minimum** : 4 sitelinks par campagne (recommandation Google)
- **Optimal** : 6 sitelinks (meilleure chance d'affichage etendu)
- Inclure descriptions sous chaque sitelink

### Asset Mix pour PMax

Performance Max requiert un asset group complet :
- 5 headlines (30 char)
- 5 long headlines (90 char)
- 5 descriptions (90 char)
- 1 logo carre + 1 logo paysage
- 4+ images carrees + 4+ images paysage
- 1 video (Google peut auto-generer si absent, mais qualite mediocre)

## Budget et Scaling

### Allocation

```
Budget mensuel total : 100%
├── Brand campaigns       : 10-15% (defensive)
├── Non-Brand Search/AI Max : 35-45% (acquisition)
├── Performance Max       : 30-40% (scale)
└── Demand Gen / Test     : 10-15% (top funnel)
```

### Scaling Progressif

Regle 20% : ne jamais augmenter un budget de campagne **performante** de plus de 20% par 7 jours, sinon reset partiel de l'apprentissage Smart Bidding.

### Anti-Pattern : Budget Fragmente

Repartir 1 000€/mois sur 15 campagnes = chaque campagne a < 70€ et < 5 conversions/mois. Smart Bidding ne peut pas apprendre. Consolider.

## Optimisation Continue

### Cadence d'Optimisation Recommandee

| Frequence | Actions |
|-----------|---------|
| **Quotidien** | Verifier alertes (broken URLs, anomalies) via scripts |
| **Hebdomadaire** | Search Terms Report + ajout negatives, ajustement assets perf |
| **Mensuel** | Review tCPA/tROAS, retirer ad copies low-perf, ajout sitelinks |
| **Trimestriel** | Audit structure compte, A/B test landing pages |

### KPIs a Suivre

- **CTR** (par ad group)
- **CPA** (par campagne, vs target)
- **ROAS** (ecommerce)
- **Quality Score** (par keyword, voir [03-landing-page-quality-score.md](03-landing-page-quality-score.md))
- **Search Impression Share** (concurrence)
- **Conversion rate** (landing page perf)

## Sources

- [Google Ads Best Practices for 2026 (LeadsBridge)](https://leadsbridge.com/blog/google-ads-best-practices/) — Best practices generales
- [The 2026 Guide to the Perfect Google Ads Account Structure (WordStream)](https://www.wordstream.com/blog/google-ads-account-structure) — Architecture compte
- [Mastering Google Performance Max 2026 (JumpFly)](https://www.jumpfly.com/blog/mastering-google-performance-max-a-2026-strategy-guide/) — PMax detaille
- [Google Ads 2026 strategy: 5 levers (Knewledge)](https://www.knewledge.com/en/google-ads-2026-strategy/) — Strategie 2026
- [Google Ads Advanced Tactics for 2026 (ALM Corp)](https://almcorp.com/blog/google-ads-advanced-tactics-to-maximize-roas-for-2026/) — Tactiques avancees
