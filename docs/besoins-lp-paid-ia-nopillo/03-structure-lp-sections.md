# 03 — Structure de la landing page et sections

## Vue d'ensemble

La LP démo doit inclure 6 éléments obligatoires définis par la matrice Nopillo, organisés pour maximiser à la fois le Quality Score et le taux de conversion. Mobile-first, LCP < 2s, message-match au KW.

## Table des matières

- [Matrice des éléments obligatoires](#matrice-des-éléments-obligatoires)
- [Sections détaillées](#sections-détaillées)
- [Hiérarchie au-dessus de la ligne de flottaison](#hiérarchie-au-dessus-de-la-ligne-de-flottaison)
- [Variantes par campagne](#variantes-par-campagne)

## Matrice des éléments obligatoires

Issue du brief Nopillo :

| Élément LP | Optimisation spécifique Nopillo |
|------------|--------------------------------|
| **Hero dynamique** suivant le KW | H1 : `"Passez au Régime Réel et payez 0€ d'impôts sur vos revenus"` + `[Ville du mot-clé]` si présent |
| **Simulateur** | Formulaire de contact intégré |
| **Contenu sémantique** | Glossaire dynamique des termes fiscaux liés au KW |
| **Social proof** | Témoignages d'investisseurs |
| **Avis** | Dynamique via Trustpilot |
| **Nomenclature URL** | KW intégré dans le slug |

## Sections détaillées

### Section 1 — Hero (above the fold)

**Contenu** :
- H1 dynamique (cf. [04-copywriting-variables-ia.md](04-copywriting-variables-ia.md))
- Sous-titre : bénéfice chiffré (`"Économisez en moyenne 4 800€ d'impôts/an"`)
- CTA primaire : `"Simuler mon économie"` ou `"Prendre RDV expert"`
- Bandeau réassurance : `"Note Trustpilot 4.7/5"` + `"24M€ économisés"`
- Visuel : illustration ou photo expert (cohérence DS Nopillo)

**Contraintes** :
- LCP < 2s → image hero optimisée (WebP/AVIF, lazy après le viewport)
- Au-dessus du fold mobile : H1 + sous-titre + CTA + 1 élément réassurance MAX
- Pas de carrousel (impact CLS + INP)

### Section 2 — Bandeau confiance

**Contenu** :
- Logos presse / partenaires (BFM, Capital, Les Échos…)
- Note Trustpilot live
- "Recommandé par X experts"

**Format** : bande horizontale, défilement subtil ou statique

### Section 3 — Simulateur fiscal

**Contenu** :
- Formulaire interactif court (3-5 questions)
- Calcul JS de l'économie d'impôts estimée
- CTA en fin : `"Recevoir ma simulation détaillée"`

**Spécificités démo** :
- Version mockée acceptable (résultat scripté pour la démo)
- En prod : connexion à un moteur de calcul Nopillo

**Tracking** :
- Event `simulator_start` (GA4)
- Event `simulator_complete` (GA4)
- Event `simulator_submit` (conversion Google Ads = lead)

### Section 4 — Bloc problème / solution dynamique

**Contenu** :
- Si Search Term détecté : bloc spécifique
- Sinon : bloc générique "Pourquoi le régime réel ?"

**Exemples Broad Match** :

| Search Term | Bloc affiché |
|-------------|--------------|
| `LMNP vs SCI` | Comparatif tableau |
| `amortissement appartement` | Simulateur amortissement |
| `expert comptable LMNP` | Présentation experts |
| Aucun (fallback) | "Les 3 atouts du régime réel" |

### Section 5 — Preuve sociale (témoignages)

**Contenu** :
- 3 à 6 témoignages d'investisseurs
- Filtres dynamiques par profil (ville, régime, profil)
- Si possible : témoignage matchant le profil détecté

**Format** :
- Photo + nom + ville + régime + témoignage
- Star rating
- Mention `"Avis vérifié"` (conformité)

### Section 6 — Avis Trustpilot dynamiques

**Contenu** :
- Widget officiel Trustpilot (TrustBox) OU appel API
- Note globale obligatoire (conformité)
- 3-5 derniers avis affichés

**Choix démo** :
- Widget officiel = plus rapide à intégrer
- API = plus flexible mais nécessite cache

### Section 7 — Glossaire sémantique

**Contenu** :
- 4-8 définitions de termes fiscaux liés au KW
- Génération IA des définitions

**Objectif** :
- **Quality Score** : enrichit le contenu sémantique de la page (le crawler Google AI lit le contenu)
- **UX** : aide le visiteur à comprendre les termes techniques

**Exemple pour KW "expert comptable LMNP"** :
- LMNP (Loueur en Meublé Non Professionnel)
- Liasse fiscale 2031
- Amortissement
- Régime réel vs micro-BIC
- Télétransmission

### Section 8 — Pricing / offre

**Contenu** :
- Tarif fixe (`"Liasse 2031 à 599€"`)
- Ce qui est inclus (3-5 points)
- CTA secondaire

**Note** : pricing peu variable, peut être statique

### Section 9 — FAQ

**Contenu** :
- 5-8 questions générées par IA selon le KW
- Format accordéon (UX) + schema.org FAQPage (SEO bonus même si noindex)

**Exemple pour KW "expert comptable LMNP"** :
- Combien coûte un expert-comptable LMNP ?
- Pourquoi prendre un expert pour LMNP ?
- Quelle différence avec micro-BIC ?
- Faut-il un expert dès le 1er bien ?

### Section 10 — Formulaire de contact final

**Contenu** :
- Champs minimaux : nom, email, téléphone, message
- Champs cachés : `utm_source`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `keyword`, `search_term`, `match_type`, `device`
- Mention RGPD + lien politique de confidentialité

**Cible** : HubSpot via embed form OU API

### Section 11 — Footer

**Contenu standard** :
- Mentions légales expert-comptable (ordre, n° inscription)
- Politique de confidentialité
- CGV
- Contact

## Hiérarchie au-dessus de la ligne de flottaison

Sur mobile (priorité 1) :

1. Logo Nopillo (compact)
2. **H1 dynamique**
3. Sous-titre bénéfice chiffré
4. **CTA primaire**
5. Réassurance courte (note Trustpilot OU compteur €)

**À EXCLURE du fold** : navigation complète, carrousel, vidéo autoplay

## Variantes par campagne

| Campagne | Hero adapté | Section additionnelle | Tonalité copy |
|----------|-------------|----------------------|---------------|
| Search Exacte | H1 = KW résolu | Pricing en haut | Technique, direct |
| Search Broad | H1 = Search Term reformulé | Bloc adapté au Search Term | Pédagogique |
| Marque | H1 = preuve sociale | "Pourquoi nous" + équipe | Réassurance |
| Broad All Countries | H1 + mention pays | Bloc spécificités non-résident | Transcréation |
| Pmax | H1 aligné asset visuel | Vidéo cohérente | Émotionnel |
| Demand Gen | H1 = hook douleur | Simulateur en hero | Émotionnel/curieux |

## Anti-patterns

- ❌ **Carrousel hero** : impact CLS, INP, et perd les visiteurs
- ❌ **Trop de CTA différents** : 1 CTA primaire + 1 secondaire max
- ❌ **Formulaire long en haut de page** : tuer le taux de complétion
- ❌ **Pages génériques pour tous les KW** : annule le bénéfice QS
- ❌ **Stocker 100 versions statiques** : ingérable, préférer génération auto
- ❌ **Texte généré IA non relu** : risque hallucination fiscale (sensible)

## Sources

- [Foundry CRO — Google Ads Landing Page Best Practices 2026](https://foundrycro.com/blog/google-ads-landing-page-best-practices-2026/) — Sections obligatoires + mobile-first
- [Apexure — Dynamic Landing Pages 2026](https://www.apexure.com/blog/how-to-create-dynamic-landing-pages/) — Hiérarchie au-dessus du fold
- [Landingi — Quality Score factors](https://landingi.com/digital-advertising/google-ads-quality-score/) — Impact contenu sémantique
- Notion Nopillo — Matrice éléments LP
