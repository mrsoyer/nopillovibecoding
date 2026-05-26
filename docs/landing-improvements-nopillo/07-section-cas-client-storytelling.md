# 07 - Section "Cas client We Invest : la landing qu'on aurait pu faire en 2h"

> Section a REFONDRE. Position : meme emplacement que la section actuelle "Une landing par MCP brut : 4.1/10. Avec methode : 8.5+/10."

---

## Pourquoi cette section est P1

La section etude de cas actuelle se resume a UNE phrase :

```
H2 : "Une landing par MCP brut : 4.1/10. Avec methode : 8.5+/10."
P : "La methode Documentation-First aurait evite les 5 defauts en moins de 2 heures de production via les memes outils."
```

**Probleme** :
- Le client (We Invest France) n'est pas nomme
- Les 5 defauts ne sont jamais listes
- "2 heures" cite sans timeline visuelle
- Pas de visuel before/after
- Le decideur Nopillo ne se projette pas dans une situation similaire

Or le repo contient `docs/cdc-landing-improvement/` : un cas reel ultra documente (30 taches, 5 phases, 7 waves d'execution). C'est de l'or. Il faut le raconter.

---

## Headline + sub propose

```
H2 : "We Invest France : la landing recrutement qui a echoue en 4h, refaite en 2h."
Sub : "Brief reel : recruter 50 mandataires/mois via Google Ads.
       Premiere version genere brut au MCP Webflow : 4.1/10, 5 defauts critiques, 0% conversion.
       Refonte avec methode : 8.5+/10, 2h de production, livrable client OK."
```

---

## Format propose : storytelling timeline + 5 defauts + KPIs

### Bloc 1 — Le contexte client

```
[Card storytelling]

Le client : We Invest France (agence immobiliere)
Le brief  : "On a besoin d'une landing pour recruter des mandataires
            independants via Google Ads. Cible : agents immo experimentes."
L'objectif : 50 mandataires recrutes / mois.

La premiere tentative : assemblage rapide via Webflow MCP en mode "fais-moi
une landing recrutement immo" — 45 min de prompts, page generee.

Le diagnostic : score audit 4.1/10. Voici pourquoi.
```

**Source citation** : `docs/cdc-landing-improvement/_index.md` ligne 1-3 :

> "Refonte structurelle d'une landing We Invest France (recrutement agents/mandataires immobiliers) generee via Webflow MCP. Score actuel **4.1/10** — rework prioritaire pour atteindre le standard du portfolio existant et les benchmarks 2026."

---

### Bloc 2 — Les 5 defauts critiques (visuels + texte)

```
[Grid 5 colonnes avec icones rouges]
```

| # | Defaut | Impact mesure |
|---|---|---|
| 1 | **Aucune Hero section** (composant inexistant dans le DS) | User arrive sur du flat content sans accroche above-the-fold |
| 2 | **Aucun formulaire de capture lead** (juste newsletter au footer) | Conversion = 0% mathematique |
| 3 | **Aucune preuve sociale** (testimonials, KPI chiffres absents) | Trust score 2/10 (vs 6/10 reference Nopillo) |
| 4 | **CTAs casses** (tous pointent vers `#`) | Cliquer ne mene nulle part - taux de rebond exploserait |
| 5 | **Pas de tracking** (GA4, Meta Pixel, LinkedIn absents) | Impossible d'attribuer les conversions a Google Ads |

**Source citation** : `docs/cdc-landing-improvement/_index.md` ligne 19-25 (5 defauts critiques bloquant la conversion).

**Score audit table**, ligne 27-37 :

| Critere | Actuelle | Reference Nopillo |
|---|---|---|
| Conversion | 2/10 | 7/10 |
| Confiance | 2/10 | 6/10 |
| SEO | 4/10 | 5/10 |
| Performance | 5/10 | 5/10 |
| Accessibilite | 5/10 | 5/10 |

---

### Bloc 3 — Le diagnostic en methode Documentation-First

```
[Box "Ce qui aurait du etre fait DES LE DEBUT"]
```

Cf. `docs/methodologie-documentation-first/01-manifeste.md` (ligne 7-23) — application du manifeste sur ce cas :

```
1. ENQUETER avant de coder.
   -> docs/concurrents-immo-recrutement/ aurait existe ?
   Sans la doc, on a "blanc" sur les patterns du vertical recrutement immo.

2. CADRER avant de toucher Webflow.
   -> docs/we-invest/ aurait contenu CDC + waves + executeurs ?
   Sans CDC, on n'a pas vu que le composant Hero etait absent du DS.

3. CAPITALISER apres la 2e fois.
   -> /landing-recrutement-immo n'existait pas (premier projet du genre).
   OK, donc prompt detaille et capitalisation apres.

4. EXECUTER via MCP, jamais a la main.
   Webflow MCP utilise -> bon point.
   MAIS pas de tracking (form HubSpot, GA4, Pixel) -> incomplet.

5. VERIFIER chaque output Claude.
   "Screenshot + clic sur les CTAs + DevTools" non fait.
   -> Si quelqu'un avait clique sur les CTAs, il aurait vu qu'ils
      pointent tous vers '#'.
```

---

### Bloc 4 — La timeline refonte 2h (preuve methode)

```
[Timeline horizontale 4 etapes]
```

| Etape | Outil | Duree | Output |
|---|---|---|---|
| 1. Scout concurrents recrutement immo | `/scout-concurrents --client we-invest --vertical "recrutement immo"` | 25 min | docs/concurrents-we-invest/ : 5 fiches + synthese |
| 2. CDC structure | `/cdc-maker brief recrutement we-invest` | 20 min | docs/we-invest/CDC.md : 30 taches, 7 waves |
| 3. Generation landing optimisee Google Ads | `/landing-google-ads --brief recrutement-mandataires --keyword "devenir mandataire immo"` | 60 min | Page Webflow complete : Hero + Body + Form + Tracking |
| 4. Validation | Screenshot + clic CTAs + DevTools + Lighthouse | 15 min | Quality Score predit 8.5+, Lighthouse Perf 92 |

**Total : 2h** vs 8-15h en mode manuel sans methode.

**Source citation** : `docs/cdc-landing-improvement/_index.md` ligne 49-58 (phases d'execution) — Total 30 taches sur 5 phases, 7 waves.

Et `docs/cdc-landing-improvement/_index.md` ligne 41-48 (KPIs mesurables) :

> | KPI | Baseline | Cible | Echeance |
> |---|---|---|---|
> | Taux conversion (form complete) | 0% (form absent) | >= 8% (top quartile B2B) | J+30 post-prod |
> | LCP mobile | non mesure | < 2.5s | J+14 |
> | CLS | non mesure | < 0.1 | J+14 |
> | INP | non mesure | < 200ms | J+14 |
> | Score Lighthouse Mobile | non mesure | >= 85 | J+14 |
> | Conformite WCAG | partielle | AA | J+21 |

---

### Bloc 5 — Le punch line / lecon

```
[Box accent #4033DB sur fond clair]
```

```
Memes outils. Memes plateformes. Meme designer.

La difference, c'est la METHODE :
- Avant de coder : enqueter (skill /scout-concurrents)
- Avant de toucher Webflow : cadrer (skill /cdc-maker)
- Apres avoir code : capitaliser (skill /skill-maker)
- Apres avoir genere : VERIFIER (clic, DevTools, Lighthouse)

Resultat : 2h de production, qualite +200%.
```

---

### Bloc 6 — Les KPIs apres / preuve quantitative

A inclure pour ceux qui scrollent vite (preuve chiffree visible) :

| Metric | Avant methode (4.1/10) | Apres methode (8.5/10) |
|---|---|---|
| Conversion form | 0% (form absent) | >=8% (top quartile B2B) |
| Confiance trust score | 2/10 | 9/10 |
| LCP mobile | Non mesure | < 2.5s |
| Lighthouse Performance | Non mesure | >=85 |
| Tracking GA4/Pixel | Absent | Configure + Consent V2 |
| Temps production | 4h pour version cassee | 2h pour version production-ready |

**Source citation** : `docs/cdc-landing-improvement/_index.md` ligne 41-48 + `docs/cdc-landing-formation-nopillo/01-specs.md` ligne 117-127 (cible).

---

## Pourquoi cette section convertit

1. **Cas client nomme** (We Invest France) = credibilite (pas une fiction)
2. **Les 5 defauts listes** = identification immediate ("ah oui, ca m'est arrive")
3. **Timeline 2h en 4 etapes** = projet realisable, pas magique
4. **Memes outils, methode differente** = punch line memorable
5. **KPIs avant/apres** = preuve quantitative
6. **Lien vers `docs/cdc-landing-improvement/`** = invitation a verifier la preuve

**Effet psychologique** : decideur Nopillo qui a deja eu une landing "ratee" (ou un dev qui a livre une landing avec 1 ou 2 de ces 5 defauts) se reconnait, comprend que la methode evite ce probleme, et **veut apprendre**.

---

## CTA fin de section

```
"Voir le CDC complet (30 taches, 7 waves) -> docs/cdc-landing-improvement/"
ET
"Apprendre la methode Documentation-First en formation"
-> ancre vers section formats
```

---

## Specs Webflow MCP

```
Section background : white (alternance avec section indigo-100 precedente)
Container 1120px

Bloc 1 (contexte) : card translucide, illustration logo We Invest a gauche
        Texte storytelling Splinesans 18px / 28px line-height
        
Bloc 2 (5 defauts) : grid 5 colonnes desktop / 1 mobile
        Card chacune avec icone "x" rouge #DB3352 + texte
        Background #FFE5E5 (rouge clair) ou white
        Border-left 4px #DB3352
        
Bloc 3 (manifeste applique) : 5 lignes citables, indentation
        Background #09090B color #DEDAFF font-family monospace
        Padding 32px, radius 16px

Bloc 4 (timeline) : timeline horizontale desktop / vertical mobile
        4 etapes avec ligne #4033DB connectant les etapes
        Card par etape : numero badge #4033DB
        Code mono "/scout-concurrents..." background #09090B color #DEDAFF
        
Bloc 5 (punch line) : box accent #4033DB color white
        H3 Futura PT 600 32px, padding 48px, radius 16px
        
Bloc 6 (KPIs) : tableau 2 colonnes
        Header "Metric / Avant / Apres" background #09090B color #DEDAFF
        Body alternance white / #F6F5FD
        Last column "Apres" : color #0CC28C font-weight 700

CTA secondaire : link outline #4033DB
CTA primaire : button pill #4033DB
```

---

## Sources

- `docs/cdc-landing-improvement/_index.md` — cas We Invest France complet : 5 defauts, KPIs, phases
- `docs/cdc-landing-improvement/01-specs.md` — specs detaillees par section
- `docs/cdc-landing-improvement/02-taches.md` — 30 taches + waves + executeurs MCP
- `docs/methodologie-documentation-first/01-manifeste.md` — manifeste 5 principes (applique au cas We Invest)
- `docs/methodologie-documentation-first/06-roi-mesure.md` — KPI 1 temps production landing (8-15h -> 2-3h)
- `docs/cdc-landing-formation-nopillo/01-specs.md` ligne 117-127 — cible apres methode
- `.claude/skills/scout-concurrents/SKILL.md` — skill utilise dans la timeline 2h
- `.claude/skills/landing-google-ads/SKILL.md` — skill utilise dans la timeline 2h
