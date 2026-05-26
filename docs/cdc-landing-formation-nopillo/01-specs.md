# 01 — Specifications

## Table des Matieres

1. [Contexte & Objectif](#contexte--objectif)
2. [Cible](#cible)
3. [Promesse & message principal](#promesse--message-principal)
4. [Structure de la landing (8 sections)](#structure-de-la-landing-8-sections)
5. [Application du Design System Nopillo](#application-du-design-system-nopillo)
6. [Specs techniques Webflow MCP](#specs-techniques-webflow-mcp)
7. [SEO + Tracking + Conversion](#seo--tracking--conversion)
8. [Anti-patterns a eviter](#anti-patterns-a-eviter)

## Contexte & Objectif

**Contexte** : Thomas (formateur) propose une formation Webflow + Claude Code + MCP a Nopillo et autres agences. La landing doit servir de **page commerciale** pour generer des briefs (entretiens 30 min) qui deboucheront sur des contrats.

**Objectif business** : 5 briefs qualifies/mois → 1-2 contrats signes/mois.

**Objectif page** : taux de conversion >= 8% (top quartile B2B services), LCP < 2s mobile.

## Cible

**Persona principal** : decideur agence (CEO, Head of Design) avec 2-15 employes qui produit des landings pour des campagnes ads (Google + Meta) et veut accelerer/industrialiser.

**Persona secondaire** : freelance senior Webflow qui veut passer au niveau superieur avec Claude Code + MCP.

**Critere de qualification** : connait Webflow (basique mini), a deja entendu parler de Claude / IA generative, fait au moins 4 landings/mois.

## Promesse & message principal

**Hero headline** (test 3 variantes) :
- A : "Industrialisez vos landings ads avec Claude Code + Webflow MCP"
- B : "Produisez 2x plus de landings, sans 2x plus de travail"
- C : "Formation Webflow + Claude Code : du prompt a la landing publiee en 2h"

**Sub-headline** : "3 formats au choix (1, 2 ou 3 jours) — methode Documentation-First eprouvee. Premier livrable produit pendant la formation."

**CTA principal** : "Reserver un brief gratuit (30 min)"

## Structure de la landing (8 sections)

### Section 1 — Hero (above the fold)

**Pattern Z** : eye-tracking horizontal puis vertical.

| Element | Contenu |
|---|---|
| Headline H1 | Cf 3 variantes ci-dessus, max 10 mots |
| Sub | 1 phrase, benefice + format |
| CTA primary | "Reserver un brief gratuit" → modal Calendly ou form |
| CTA secondary | "Voir les 3 formats" → scroll vers section 4 |
| Visuel | Screen Claude Code + Webflow split-screen OR illustration isometrique style Nopillo |
| Trust badge | "16 docs reference + 6 skills custom + 27k lignes capitalisees" (preuve methode) |

**Specs techniques** :
- Layout 2 colonnes desktop (60% texte / 40% visuel), stack mobile
- Padding vertical : 96px desktop / 64px mobile
- Background : white OU indigo-100 (#DEDAFF) soft

Source : [docs/landing-page-best-practices/03-hero-above-the-fold.md](../landing-page-best-practices/03-hero-above-the-fold.md)

### Section 2 — Probleme (Problem-Agitate)

**Format** : 3 pain points en cards horizontales.

| Pain | Headline card | Sub |
|---|---|---|
| Lenteur | "Chaque landing prend 8-15h" | "Hero, form, tracking, anti-patterns... refait a chaque fois" |
| Pas capitalise | "Vos workflows ne se transmettent pas" | "Le savoir-faire reste dans la tete des seniors" |
| Qualite variable | "La conversion depend du dev assigne" | "Pas de standard ads-ready repetable dans l'equipe" |

**Visuel** : icones isometriques style Nopillo (calculator, chronometre, graphique).

Source : [docs/landing-page-best-practices/08-copywriting-framework.md](../landing-page-best-practices/08-copywriting-framework.md)

### Section 3 — Solution / Methodologie

**Pattern** : 4 etapes du pipeline Documentation-First.

```
1. ENQUETER          2. CADRER            3. CAPITALISER       4. EXECUTER
   /doc-maker     →     /cdc-maker      →    /skill-maker    →    Webflow MCP
```

| Etape | Headline | Sub | Icone |
|---|---|---|---|
| 1 | "Enqueter sur les concurrents" | "5 doc-maker en parallele : 5 docs en 10 min" | loupe |
| 2 | "Cadrer en CDC structure" | "30 taches reparties en 7 waves paralleles" | clipboard |
| 3 | "Capitaliser en skills" | "6 skills custom = workflow Nopillo standardise" | engrenage |
| 4 | "Executer via MCP" | "Webflow + HubSpot + Google Ads + Meta Ads" | flash |

Source : [docs/methodologie-documentation-first/](../methodologie-documentation-first/)

### Section 4 — 3 Formats (cards comparatives)

**Format** : 3 cards cote a cote (stack mobile), card centrale legerement plus grande + badge "Recommande".

| Card | 1 jour | **2 jours** (recommande) | 3 jours |
|---|---|---|---|
| Tarif | **950 € HT** | **1 900 € HT** | **2 850 € HT** |
| Promesse | "Decouverte + 1 landing live" | "Autonomie sur le workflow industrialise" | "Maitrise complete + alternatives Webflow" |
| Skills crees | 1 | **6** | 6-8 |
| Plateformes ads | Google | Google + Meta | Google + Meta |
| Sortir de Webflow | NON | NON | OUI |
| CTA card | "Decouvrir le 1j" | **"Choisir le 2 jours"** | "Decouvrir le 3j" |

**Specs visuelles** :
- Cards translucides (style Nopillo : white 30% + border indigo-100 + shadow `0 1px 10px rgba(0,0,0,.06)`)
- Card centrale : background indigo-100, border indigo-600, shadow plus marquee
- Boutons pill (border-radius 999px) primary indigo-600

Source : [docs/formation-nopillo/07-comparatif-recommandations.md](../formation-nopillo/07-comparatif-recommandations.md)

### Section 5 — Etude de cas We Invest

**Format** : split horizontal "Avant / Apres" avec metrics.

**Storytelling** : "Une landing produite par MCP brut. Score 4.1/10. Voici ce qui manquait, et comment la methode l'aurait evite."

| Metric | Avant (MCP brut) | Apres (methode) |
|---|---|---|
| Conversion | 0% (form absent) | >= 8% (top quartile) |
| Confiance | 2/10 | 9/10 |
| LCP mobile | non mesure | < 2.5s |
| Score global | 4.1/10 | 8.5+/10 |

**CTA** : "Voir le CDC complet" → lien vers `docs/cdc-landing-improvement/_index.md`

Source : [docs/cdc-landing-improvement/_index.md](../cdc-landing-improvement/_index.md)

### Section 6 — Social proof

**Format** : 3 quotes + logos clients (a fournir par Nopillo si applicable) + KPIs methode.

**KPIs methode (preuve par la documentation)** :
- 16 dossiers de documentation reference produits
- 27 755 lignes capitalisees, reutilisables
- 6 skills Claude Code custom
- 100% des docs a 20/20 audit qualite

**Quotes** : 3 quotes a recolter post-formation (laisser placeholders).

Source : [docs/landing-page-best-practices/05-social-proof-trust.md](../landing-page-best-practices/05-social-proof-trust.md)

### Section 7 — FAQ

**8 questions clefs** (collapsibles) :
1. Pour qui exactement ? (qualification)
2. Faut-il deja maitriser Claude Code ? (rassurance debutant)
3. La formation est-elle eligible CPF / OPCO ? (financement — a confirmer brief Nopillo)
4. Quel materiel m'apporter ? (acces Webflow + Claude Code installe)
5. Que se passe-t-il apres la formation ? (suivi 30j / 90j selon format)
6. Combien de personnes max ? (intra : sans limite, recommande 6-8 / 6 selon format)
7. C'est en presentiel ou en visio ? (les deux possibles, presentiel recommande 2j+)
8. Et si l'equipe est heterogene en niveau ? (binomage senior-junior)

Source : [docs/landing-page-best-practices/02-structure-sections.md](../landing-page-best-practices/02-structure-sections.md)

### Section 8 — CTA final + Form

**Format** : form 5 champs minimum + reassurance.

| Champ | Type | Required |
|---|---|---|
| Nom complet | text | OUI |
| Email pro | email | OUI |
| Entreprise | text | OUI |
| Taille equipe | select (1, 2-5, 6-15, 15+) | OUI |
| Format envisage | select (1j / 2j / 3j / je ne sais pas) | OUI |
| Message libre | textarea | NON |

**Bouton** : "Reserver mon brief gratuit (30 min)" — pill, indigo-600

**Reassurance sous le bouton** : "Pas de spam. Pas d'engagement. Reponse sous 24h."

**Apres submit** : redirection vers `/merci` avec lien Calendly + tracking conversion.

## Application du Design System Nopillo

Reference complete : [docs/design-system-extraction/nopillo-extracted/](../design-system-extraction/nopillo-extracted/)

| Token | Valeur | Usage landing |
|---|---|---|
| Couleur primaire | `#4033DB` (indigo-600) | CTAs primary, accents, badges |
| Couleur soft | `#DEDAFF` (indigo-100) | Backgrounds sections alternees |
| Brand black | `#09090B` (graycool-900) | Texte principal, headings |
| Couleur secondaire | `#0CC28C` (vert mint) | Highlights, checkmarks, "Recommande" badge |
| Police titre | Futura PT (Adobe Fonts) | H1-H6 |
| Police body | Splinesans ou system | Texte courant |
| Border-radius cards | 16px | Toutes les cards |
| Border-radius CTAs | 999px (pill) | Tous les boutons |
| Container max | 1120px (regular) | Sections content |
| Shadow signature | `0 1px 10px rgba(0,0,0,.06)` | Cards, modals |
| Pattern alternance | white / indigo-100 / indigo-10 | Sections successives |

**Import via MCP** : utiliser `tokens.css` et `09-tokens-dtcg.json` du dossier `nopillo-extracted/`.

## Specs techniques Webflow MCP

**Outils MCP utilises** (voir [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md)) :

| Famille | Outils utilises | Bridge App requis |
|---|---|---|
| Sites | List sites, Get details, Publish | Non |
| Pages | Create page, Update settings, Update static content | Non |
| Designer Variables | Create variable (Color, Size, Number), Manage collections | OUI |
| Designer Elements | Create element (section, div, heading, button), Set text/link | OUI |
| Designer Styles | Create style, Set breakpoint variant, Set pseudo-class | OUI |
| Components | List, Get content, Insert instance, Convert to component | OUI |
| Scripts | Register inline + apply to page (GA4, Pixel, Consent V2) | Non |

**Sequence MCP type pour 1 section** :
1. `Switch active page` → page landing
2. `Create element section` → wrapper
3. `Create element div` → conteneur centre (max-width 1120)
4. `Create element heading` (H2) → titre section
5. `Set element text` → contenu
6. `Create style` ou `Insert component instance` selon le cas

## SEO + Tracking + Conversion

**Meta** :
- Title (50-60 char) : "Formation Webflow + Claude Code + MCP — Nopillo"
- Description (150-160) : "Industrialisez vos landings ads avec Claude Code et le Webflow MCP. 3 formats au choix. Premier livrable produit pendant la formation."
- OG image : visuel hero (1200x630)
- Schema.org : `Course` + `Offer` (3 formats) + `Organization`

**Tracking** :
- GA4 : pageview + clicks CTA + form_start + form_submit + scroll 50% + scroll 100%
- Meta Pixel + CAPI dedupe (event_id) si Nopillo equipe
- Consent Mode V2 minimal (default denied EU, granted hors EU)

**Conversion event** : `formation_brief_request` (form submit + redirect /merci)

Source : [docs/google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md)

## Anti-patterns a eviter

(extraits de [docs/landing-page-best-practices/06-anti-patterns.md](../landing-page-best-practices/06-anti-patterns.md))

| Anti-pattern | Correction |
|---|---|
| Hero générique "Bienvenue chez Nopillo" | Headline = promesse claire + benefice |
| 10 CTAs differents en hero | 1 CTA primary + 1 secondary, c'est tout |
| Form 12 champs | 5 champs max + reassurance |
| Pas de social proof | KPIs methode + quotes (meme placeholders au launch) |
| Pas de mobile-first | Mobile drives 70%+ du trafic ads, designer mobile d'abord |
| LCP > 4s | Lazy load images, font-display swap, no video autoplay |
| FAQ vides ou rhetoriques | Vraies questions reellement posees |

Source : [docs/landing-page-best-practices/06-anti-patterns.md](../landing-page-best-practices/06-anti-patterns.md)

## Sources

- [docs/formation-nopillo/](../formation-nopillo/) — contenu des 3 formats + tarifs
- [docs/landing-page-best-practices/](../landing-page-best-practices/) — structure, hero, CTA, social proof, anti-patterns
- [docs/design-system-extraction/nopillo-extracted/](../design-system-extraction/nopillo-extracted/) — tokens DTCG + composants
- [docs/cdc-landing-improvement/](../cdc-landing-improvement/) — etude de cas We Invest
- [WEBFLOW-MCP.md](../../WEBFLOW-MCP.md) — outils MCP disponibles
- [docs/google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md) — tracking
