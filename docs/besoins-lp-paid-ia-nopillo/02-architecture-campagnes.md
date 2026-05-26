# 02 — Architecture des campagnes Google Ads

## Vue d'ensemble

6 types de campagnes structurent le compte Google Ads Nopillo. Chaque type appelle une stratégie LP IA différente. Cette doc décrit les besoins par campagne et la matrice d'éléments LP commune à toutes.

## Table des matières

- [Vue d'ensemble du compte](#vue-densemble-du-compte)
- [A. Campagne Search Exacte](#a-campagne-search-exacte)
- [B. Campagne Search Broad](#b-campagne-search-broad)
- [C. Campagne Marque](#c-campagne-marque)
- [D. Campagne Broad All Countries (Expatriés)](#d-campagne-broad-all-countries-expatriés)
- [E. Campagne Pmax Générique](#e-campagne-pmax-générique)
- [F. Campagne Demand Gen](#f-campagne-demand-gen)
- [Priorisation pour la démo](#priorisation-pour-la-démo)

## Vue d'ensemble du compte

| Campagne | Match Type | Audience | Objectif LP |
|----------|-----------|----------|-------------|
| Search Exacte | [Exact Match] | Prospect mature cherchant solution précise | Hyper-pertinence 1:1, QS 10/10 |
| Search Broad | [Broad Match] | Intention large | Contextualisation selon Search Term |
| Marque | [Exact / Phrase] | Connaît Nopillo / cherche avis | Réassurance & autorité |
| Pmax Générique | Cross-Channel (AI) | Prospection froide + retargeting | Continuité créative annonce ⇄ LP |
| Demand Gen | Social / Lookalike | Audiences similaires (YouTube, Discover, Gmail) | Hook engagement (douleur fiscale) |
| Broad All Countries | [Broad Match] International | Expatriés non-résidents | Transcréation locale |

## A. Campagne Search Exacte

### Caractéristiques

- **Match type** : Exact Match
- **KW exemples** : `liasse fiscale 2031`, `télétransmission LMNP`, `expert comptable LMNP`
- **Intention** : transactionnelle haute, prospect mature

### Stratégie IA

- Génération d'une LP **ultra-technique**
- H1 confirme la solution au problème immédiat
- Pas de "découverte" : aller droit au CTA

### Copywriting type

- H1 : `"Votre liasse 2031 prête en 15 min pour 599€"`
- Mise en avant **conformité** + **prix fixe**
- CTA : `"Démarrer ma liasse"` ou `"Prendre RDV expert"`

### Impact QS

- Expérience utilisateur maximale (page répond au besoin administratif urgent)
- Quality Score cible : **10/10**

## B. Campagne Search Broad

### Caractéristiques

- **Match type** : Broad Match
- **KW exemples** : `comment payer moins d'impôts immobilier`, `investir en meublé`
- **Intention** : large, exploratoire

### Stratégie IA

L'IA analyse le **Search Term réel** (différent du KW configuré) via `{search_term}` ValueTrack et adapte le bloc principal :

| Search Term détecté | Bloc principal LP |
|---------------------|-------------------|
| `calcul amortissement appartement` | Simulateur d'amortissement Nopillo en haut |
| `LMNP vs SCI` | Comparatif dynamique LMNP vs SCI |
| `défiscalisation locative` | Guide des dispositifs (Pinel, LMNP, Denormandie) |
| `expert comptable immobilier` | Présentation experts dédiés + tarifs |

### Variables techniques

- ValueTrack `{searchterm}` capturé en URL param
- Si non disponible : fallback sur `{keyword}` (KW configuré)

## C. Campagne Marque

### Caractéristiques

- **Match type** : Exact / Phrase
- **KW exemples** : `Nopillo`, `avis Nopillo`, `Nopillo prix`
- **Intention** : bottom-of-funnel, recherche de validation

### Stratégie IA

- **Personnalisation preuve sociale** : injection des avis clients les plus récents
- Mise en avant : `"Déjà 24 millions d'€ économisés par nos clients"`
- Focus accompagnement par experts dédiés (réassurance)
- CTA principal : `"Prendre RDV gratuit"`

### Particularités

- Pas de variabilité par KW (pages quasi statiques)
- Mise à jour dynamique : compteur €, dernier avis Trustpilot

## D. Campagne Broad All Countries (Expatriés)

### Caractéristiques

- **Match type** : Broad Match international
- **KW exemples** : `investir en France depuis Dubaï`, `fiscalité LMNP non-résident`
- **Intention** : expat avec besoins fiscaux spécifiques

### Stratégie IA — Transcréation

Adaptation du contenu selon :

- **Zone géographique détectée** (via IP ou langue)
- **Régulations non-résidents** : cotisations sociales, prélèvements de solidarité, conventions fiscales

### Variables dynamiques

- `{country}` détecté
- Mention de la convention fiscale France-pays
- Langue : français (cible expat francophone)
- Réassurance : `"Experts spécialisés non-résidents"`

## E. Campagne Pmax Générique

### Caractéristiques

- **Stratégie** : Cross-Channel AI-Driven
- **Audience** : prospection froide + retargeting sur tout l'inventaire Google
- **Particularité** : Pmax pousse l'utilisateur via vidéo, display, search, YouTube, Gmail, Discover, Maps

### Stratégie IA — Continuité créative

- **Alignement du texte LP sur les assets visuels** de l'annonce
- Si annonce vidéo "économiser sur l'impôt" → LP avec hero vidéo + même promesse
- Cohérence visuelle annonce ⇄ LP (couleurs, slogan, visuel)

### Besoins techniques

- Capture du `{creative_id}` ou `{asset_id}` via ValueTrack
- Mapping `creative_id → variante LP` (table de correspondance)

## F. Campagne Demand Gen

### Caractéristiques

- **Audience** : lookalike clients sur YouTube, Discover, Gmail
- **Intention** : froide, curiosité non-formulée

### Stratégie IA — Hook & engagement

- Contenu axé **douleur fiscale** (`"Vous payez encore plein pot ?"`)
- Hook par **simulateur** en hero (curiosité activée)
- Pas de jargon : copy grand public

### Particularités

- Pas de KW (audience-driven), donc pas de matching sémantique
- Variabilité par segment audience (à définir)

## Priorisation pour la démo

| Campagne | Priorité démo | Justification |
|----------|---------------|---------------|
| Search Exacte | 🟢 P0 | Le plus parlant pour démontrer matching 1:1 → QS 10/10 |
| Search Broad | 🟡 P1 | Permet de prouver l'adaptation au Search Term (différenciant) |
| Marque | ⚪ P3 | Faible variabilité, moins intéressant pour la démo |
| Broad All Countries | 🟡 P2 | Transcréation = wow effect, mais complexe |
| Pmax | ⚪ P3 | Continuité visuelle = effort design lourd |
| Demand Gen | ⚪ P3 | Audience-driven, peu de matching KW |

**Recommandation** : démo sur **Search Exacte** (1 KW pilote) + variantes pour 2 KW supplémentaires pour prouver la variabilité.

## Sources

- [Apexure — Dynamic Keyword Insertion Guide 2026](https://www.apexure.com/blog/best-practices-for-creating-google-dynamic-ad-landing-pages) — Patterns Search Broad / Exacte
- [Google Ads ValueTrack documentation](https://support.google.com/google-ads/answer/2375447?hl=en) — Liste paramètres dont `{searchterm}`, `{keyword}`
- Notion Nopillo — "USECASE LP PAID auto via l'IA" — Structure compte Google Ads
