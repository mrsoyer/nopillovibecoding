# 02 — Objectifs de Campagne & Advantage+ Shopping

## Vue d'Ensemble

Meta Ads Manager propose 6 objectifs (depuis ODAX) : Awareness, Traffic, Engagement, Leads, App Promotion, Sales. Pour Nopillo, les 3 objectifs strategiques pour les landings clients sont **Sales, Leads et Engagement**. Advantage+ Shopping Campaigns (ASC) est la solution premium pour ecommerce avec catalogue produits.

## Concepts Cles

### Les 6 Objectifs ODAX

| Objectif | Use case | Optimisation |
|----------|----------|--------------|
| Awareness | Notoriete, top funnel | Reach, Brand Awareness, Video Views |
| Traffic | Drive vers landing | Link Clicks, Landing Page Views |
| Engagement | Interactions, messages | Post Engagement, Messages, Conversations |
| Leads | Generation prospects | Lead Form, Conversions, Calls |
| App Promotion | Install/use app | App Installs, App Events |
| Sales | Achat | Conversions, Catalog Sales (ASC) |

### Optimization Event vs Campaign Objective
- **Objective** : ce que tu dis a Meta vouloir accomplir (Sales).
- **Optimization event** : signal precis envoye au Pixel/CAPI (ex: `Purchase`, `Lead`, `CompleteRegistration`).
- L'algorithme optimise sur l'event ; choisir un event a haut volume (50+/semaine) pour sortir du learning phase.

### Advantage+ Shopping Campaigns (ASC)
Campagne purchase-optimized full-IA pour ecommerce :
- Algorithme gere ciblage, placement, creative selection et budget.
- Annonceur controle : budget, creatives, catalogue, exclusions.

## Patterns Recommandes

### ASC : Specs Techniques 2026

| Parametre | Valeur recommandee |
|-----------|-------------------|
| Budget minimum efficace | $100/jour (technique : $50, optimisation : $100+) |
| Budget recommande PME | $150-300/jour |
| Budget brand etablie | $500-2,000+/jour |
| Conversions/semaine cible | 50+ purchases |
| Creatives actives min ($300/j) | 20-30 |
| Refresh creatif hebdo ($300/j) | 5-8 nouvelles |
| Augmentation budget max | +20% tous les 3-4 jours |
| ROAS cible top niches | 4-8x |

### Structure Compte ASC < $1,000/jour
- 2-3 campagnes au total
- ASC primary revenue driver (70-80% budget)
- Retargeting (15-20%)
- Testing (5-10%, optionnel)

> **Insight clef** : "Une campagne a $500/jour surperforme 5 campagnes a $100/jour chacune" — concentration de la donnee = apprentissage superieur.

### Lead Generation
Deux variantes :
- **Lead Form (Instant Form)** : formulaire natif Meta, pre-rempli, jamais quitter l'app.
- **Conversion vers landing** : Pixel/CAPI sur formulaire externe (Webflow + CRM).
Voir [05-lead-forms.md](./05-lead-forms.md) pour le comparatif detaille.

### Bid Strategy
- **Conversion Optimization** : maximiser le nombre de conversions (produits AOV constant).
- **Value Optimization** : maximiser revenu (catalogue varie, requiert 100+ purchases/7j).

## Anti-Patterns

| Anti-pattern | Risque | Solution |
|--------------|--------|----------|
| Optimiser sur Purchase avec < 50 conv/sem | Learning phase infinie | Optimiser higher-funnel (AddToCart, Lead) |
| 5 campagnes a $50/j | Budget fragmente, pas d'apprentissage | 1-2 campagnes consolidees |
| Cibler 10 pays dans 1 campagne | Algorithme disperse | 1 pays, prouver, expandre |
| Restreindre age sans raison legale | Reduit la pool d'optimisation | Laisser broad sauf obligation |

## Mises a Jour Mars 2026

- Possibilite de **definir un primary conversion event + secondary event** pour l'algorithme.
- Cap pourcentage du budget alloue aux **existing customers** dans ASC.
- Reporting "total store impact" pour mieux mesurer l'attribution post iOS 14.

## Sources

- [Meta Advantage+ Shopping Campaigns Guide — Adligator](https://adligator.com/blog/meta-advantage-plus-shopping-campaigns-guide)
- [Meta Ads Best Practices 2026 — OptiFOX](https://optifox.in/blog/meta-ads-best-practices-2026/)
- [About the Advantage+ Campaign Experience — Meta Business Help](https://www.facebook.com/business/help/1292656978738967)
- [Meta Advantage+ Shopping — Stackmatix](https://www.stackmatix.com/blog/meta-advantage-plus-shopping-campaigns)
