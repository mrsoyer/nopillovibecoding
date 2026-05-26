# 01 — Vision stratégique et objectifs

## Vue d'ensemble

Nopillo veut industrialiser la création de landing pages dédiées à chaque mot-clé Google Ads. Objectif business : **réduire le CPC en boostant la composante "landing page experience" du Quality Score**, qui pèse plus lourd que "ad relevance" dans le calcul Google.

## Vision stratégique

### Le Quality Score, levier de coût

Le Quality Score Google Ads (1-10) repose sur 3 piliers :

1. **Expected CTR** (clickthrough rate attendu)
2. **Ad relevance** (pertinence sémantique annonce ⇄ KW)
3. **Landing page experience** (pertinence + UX de la page de destination)

Selon les données 2026, les annonces avec landing page experience et ad relevance "Above average" voient **leur CPC chuter de 36%** par rapport à la moyenne. Le pilier "landing page" est désormais évalué par un modèle IA Google qui lit le contenu de la page et le compare à l'intention du mot-clé.

### Pourquoi 1 LP par KW

Google évalue le landing page experience **par mot-clé et par groupe d'annonce**. Une page générique qui matche "rien en particulier" obtient un score inférieur à une page qui matche chirurgicalement le KW. Conséquence : générer 1 LP par KW (ou par cluster de KW très proches) permet d'atteindre **Quality Score 10/10** sur les KW exacts et faire baisser le CPC payé à position égale.

### Le levier IA

L'IA permet de :
- Générer en masse des pages dédiées à chaque KW à coût marginal proche de zéro
- Adapter dynamiquement le contenu selon le **Search Term réel** (pas juste le KW configuré)
- Personnaliser selon variables contextuelles (ville, régime fiscal, pays expat)
- Tenir la fraîcheur du contenu (avis Trustpilot, témoignages, stats)

## Objectifs business

| Objectif | Métrique | Cible |
|----------|----------|-------|
| Réduire le coût d'acquisition | CPC moyen | -20% à -30% |
| Améliorer la qualité du trafic | Taux de conversion LP | > 8% |
| Industrialiser la production | LP / jour générées | 50+ |
| Activer le levier expat | Couverture pays | 5+ pays |
| Capter les Broad Match | Search Terms couverts | 80%+ |

## Objectifs opérationnels

1. **Générer des LP en automatique** et les publier (Webflow prioritaire)
2. **Grouper le traitement des KW à QS faible** pour générer auto les annonces + URL au KW (si possible directement dans plateforme Google Ads)
3. **Connecter le formulaire de contact** de la LP à HubSpot

## Métrique nord-étoile

**Coût par lead qualifié (CPL SQL)** = la baisse du CPC doit se traduire en baisse du CPL sans dégradation de la qualité (taux SQL/lead stable ou en hausse).

## Hypothèses à valider sur la démo

| Hypothèse | Méthode de validation |
|-----------|----------------------|
| LP dédiée KW = QS 10/10 | Comparaison QS avant/après sur 1 KW pilote |
| Matching H1 ⇄ Search Term = +60% conversion | A/B test page dynamique vs page statique |
| IA produit du contenu vendeur sans hallucination | Review humaine des 10 premières variantes |
| Stack Webflow tient la charge | Test publication 50 pages via API |
| HubSpot reçoit bien les leads avec UTM intacts | Test 5 leads avec UTM différents |

## Anti-objectifs (ce qu'on ne fait PAS sur la démo)

- ❌ Industrialiser tout de suite à 1000+ pages — d'abord 1 LP démo
- ❌ Couvrir tous les types de campagnes — focus Search Exacte sur démo
- ❌ Référencer en SEO les pages — paid only, `noindex`
- ❌ Refaire le design system — appliquer le DS Nopillo existant
- ❌ Construire un back-office complet — script + Webflow CMS suffisent pour démo

## Sources

- [Google Ads Quality Score 2026 — Groas](https://www.groas.com/post/google-ads-quality-score-optimization-2026-improve-expected-ctr-ad-relevance-landing-page) — Pondération des piliers et impact CPC
- [Foundry CRO — AI Max & Quality Score 2026](https://foundrycro.com/blog/google-ads-landing-page-best-practices-2026/) — Modèle IA Google qui lit le contenu
