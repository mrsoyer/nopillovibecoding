# Besoins LP PAID auto via l'IA — Nopillo

> Cahier des charges complet pour landing page de démo : génération auto de LP par mot-clé via IA, alignée Google Ads, connectée HubSpot, hébergée Webflow.

## Contexte

Use case Nopillo : automatiser la création de landing pages dédiées à chaque mot-clé Google Ads pour maximiser le Quality Score (composante "landing page experience") et acheter le trafic moins cher que la concurrence à position égale. Cible démo : prouver la stack `Data → IA → LP dynamique` sur 1 cas concret avant industrialisation.

## Index des fichiers

| Fichier | Contenu |
|---------|---------|
| [01-vision-objectifs.md](01-vision-objectifs.md) | Vision stratégique, objectifs, métrique nord-étoile |
| [02-architecture-campagnes.md](02-architecture-campagnes.md) | 6 types de campagnes Google Ads + stratégies IA par campagne |
| [03-structure-lp-sections.md](03-structure-lp-sections.md) | Sections obligatoires de la LP + matrice d'optimisation |
| [04-copywriting-variables-ia.md](04-copywriting-variables-ia.md) | Variables dynamiques, patterns de copywriting, prompts IA |
| [05-stack-technique.md](05-stack-technique.md) | Choix technique (Webflow, génération, runtime/batch) |
| [06-integrations.md](06-integrations.md) | Google Ads, HubSpot, Trustpilot, Webflow CMS API |
| [07-tracking-analytics.md](07-tracking-analytics.md) | GA4, conversions, CAPI, dédup, server-side |
| [08-performance-seo-quality-score.md](08-performance-seo-quality-score.md) | Core Web Vitals, URL, noindex, schema.org |
| [09-livrables-kpis-decisions.md](09-livrables-kpis-decisions.md) | KPIs démo, livrables attendus, décisions à trancher |
| [sources.md](sources.md) | Sources web 2026 consultées |

## Périmètre démo (1 cas pilote)

- **1 landing page publiée** sur Webflow avec contenu dynamique selon KW
- **1 KW pilote** sélectionné parmi Search Exacte (recommandation : `expert comptable LMNP`)
- **Formulaire connecté** à HubSpot (lead test créé)
- **Tracking validé** : GA4 + Google Ads conversion + UTMs ValueTrack
- **Preuve de variabilité** : 2-3 variantes générées sur 2-3 KW différents

## Métriques cibles

| Métrique | Avant | Cible démo |
|----------|-------|------------|
| Quality Score | 5-7/10 | 9-10/10 |
| CPC | Référence | -20% à -30% |
| Taux conversion LP | À mesurer | > 8% |
| LCP mobile | À mesurer | < 2s |
| Lead → HubSpot | Manuel | 100% auto |

Sources : 6 pages web consultées le 2026-05-26 (voir [sources.md](sources.md))
