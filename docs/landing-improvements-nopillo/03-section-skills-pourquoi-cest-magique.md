# 03 - Section "Vos workflows recurrents en 1 mot"

> Section a AJOUTER. Position : APRES la section "MCPs" (cf. 02), AVANT "Choisissez le format".

---

## Pourquoi cette section est P0

Le mot **skill** apparait 6 fois dans la landing actuelle. Reduit a "workflows reutilisables transformes en commandes" — vague.

Le decideur Nopillo a besoin de voir, sur UN cas concret, **le AVANT** (effort cognitif + temps de prompt detaille) et **L'APRES** (1 mot, 1 commande, output complet).

C'est CETTE difference qui fait dire "OK, je veux que mon equipe sache faire ca."

Le repo contient deja **6 skills concrets** dans `.claude/skills/`. Cette section les met en scene.

---

## Headline + sub propose

```
H2 : "Vos workflows recurrents Nopillo, en 1 mot."
Sub : "Au lieu de re-ecrire le meme prompt detaille 30 fois, vous tapez `/connect-hubspot-form`.
       Au bout de 3 mois, votre equipe a 6-14 skills capitalises = 40+ heures gagnees par mois."
```

---

## Format : 6 cartes "AVANT / APRES"

Chaque carte = 1 skill :
- Nom du skill (en mono)
- Le PROBLEME avant (liste numerotee des etapes manuelles + temps total)
- L'invocation skill (1 ligne)
- Le RESULTAT (liste output + temps)

---

### Carte 1 — `/connect-hubspot-form`

> Embed un form HubSpot dans une page Webflow + tracking GA4 + Meta Pixel/CAPI dedupes par event_id, avec validation contact dans HubSpot.

**AVANT (sans skill) — 30-45 min** : recuperer portalId HubSpot, generer formId, copier embed, inserer dans Webflow custom code, tester contact, configurer GA4 form_submit, Meta Pixel + CAPI server-side (event_id dedupe), valider via DebugView + Test Events, verifier EMQ >= 7.5.

**APRES (avec skill) — 2 min** :

```
/connect-hubspot-form --portalId 12345678 --formId abc123-uuid --page /contact
```

**RESULTAT** : code embed avec callback onFormSubmit + event_id UUID v4, capture fbclid/gclid en hidden fields, script registre via Webflow MCP (data_scripts_tool), staging publie, test contact cree dans HubSpot (28s), GA4 event `generate_lead` detecte, Meta Test Events : Pixel + CAPI fusionnes (dedupe), EMQ initial 8.1.

**Source citation** : `.claude/skills/connect-hubspot-form/SKILL.md` ligne 14-25 (inputs + workflow).

---

### Carte 2 — `/extract-design-system`

> Aspire les couleurs, typographie, spacing, composants d'un site reference et genere des tokens DTCG importables dans Webflow Variables.

**AVANT (sans skill) — 1 jour** : DevTools sur site reference, inspecter ~50 elements (hex, font, sizes), screenshots hero/footer/nav/form, Excel des tokens, contraste WCAG manuel, curation, renommage semantique, CSS variables a la main, import Webflow 1 par 1.

**APRES (avec skill) — 10 min** :

```
/extract-design-system --url https://www.nopillo.com --client nopillo
```

**RESULTAT** : pipeline 6 etapes (Dembrandt MCP -> raw.json 12 KB, Chrome DevTools MCP -> 5 screenshots, curation 80 tokens sur 188, adaptation client, webflow-import.css RGB+OKLCH, import variable_tool -> 88 variables creees). Output : `docs/ds-nopillo/` avec source/screenshots/, curated/tokens-curated.json (DTCG 3-layer), final/contrast-audit.md (WCAG AA pass), final/webflow-import.css, REPORT.md.

**Source citation** : `.claude/skills/extract-design-system/SKILL.md` ligne 16-26 (workflow 6 etapes).

**PREUVE** : le repo contient deja **`docs/design-system-extraction/nopillo-extracted/`** avec 88 variables, tokens DTCG, screenshots, logo SVG. C'est la **preuve incarnee** que ce skill marche.

---

### Carte 3 — `/landing-google-ads`

> Genere une landing complete optimisee Google Ads (Quality Score 8+, LCP < 2s, mobile-first, DKI URL params, GA4 + Google Ads conversion).

**AVANT (sans skill) — 8-15h** : lire BP Google Ads, definir structure, designer hero (H1 message-match), designer body, coder DKI JS (sanitization XSS, fallback), configurer GA4 + Google Ads conversion + Enhanced Conv, Consent Mode V2, optimiser perf LCP < 2s, tester mobile 375px, Lighthouse, audit message-match, publier staging.

**APRES (avec skill) — 1h** :

```
/landing-google-ads --brief "formation webflow agences 2j" --keyword "formation webflow paris" --cta "reserver brief gratuit"
```

**RESULTAT** : pipeline 7 etapes (structure validee, page `/lp-formation-webflow-paris` creee, hero H1 message-match + CTA pill, 4 sections body avec proof + CTAs, DKI JS injecte, GA4 + Google Ads conversion + Consent V2, validation : LCP 1.4s, Lighthouse Perf 92, mobile 375px OK, test DKI `?keyword=formation+lyon`). **Quality Score predit : 8.5+**.

**Source citation** : `.claude/skills/landing-google-ads/SKILL.md` ligne 19-26 (livrable) et 70-79 (ROI mesure).

---

### Carte 4 — `/landing-meta-ads`

> Genere une landing optimisee Meta Ads (mobile-first 9:16, hook < 1.7s, message-match au creative, Pixel + CAPI dedupes).

**AVANT (sans skill) — 4-6h** : adapter landing en mobile-first 9:16, designer hook < 1.7s, verifier message-match avec creative ad, reduire form a 3-5 champs, setup Pixel base, coder JS event_id UUID v4 + capture fbclid cookie _fbc, setup CAPI server-side, tester Pixel Helper, tester dedup event_id, verifier EMQ, webhook CRM speed-to-lead < 60s.

**APRES (avec skill) — 45 min** :

```
/landing-meta-ads --offer "formation webflow nopillo" --creative "tu fais 8h par landing ? on a 2j pour passer a 1h"
```

**RESULTAT** : decision Lead Form vs Landing (Landing pour cycle B2B), structure mobile-first 9:16 (375x812), hero hook 1.4s, form 4 champs, Pixel inject + event Lead avec event_id UUID v4 + fbclid capture, CAPI server-side via webhook Make.com -> Meta Graph API. Validation : PageSpeed mobile 87, Pixel Helper PageView + Lead OK, dedup OK, EMQ initial 8.4, speed-to-lead 32s.

**Source citation** : `.claude/skills/landing-meta-ads/SKILL.md` ligne 19-26 (livrable) et 83-92 (ROI mesure).

---

### Carte 5 — `/scout-concurrents`

> Lance 5 a 10 doc-maker en parallele pour produire un dossier complet de fiches concurrents en 30 min.

**AVANT (sans skill) — 10h+** : identifier 5 concurrents, visiter chaque site, screenshots, analyser hero/sections/form/DS/tracking, synthese transverse, tableau comparatif 10x5.

**APRES (avec skill) — 25 min** :

```
/scout-concurrents --client "we-invest" --vertical "recrutement immobilier France"
```

**RESULTAT** : 5 doc-maker en parallele lances (jagger.com, capifrance.com, megagence.com, safti.fr, iadfrance.fr) + 1 synthese transverse = `docs/concurrents-we-invest/` avec _index.md (tableau 10x5 + top 5 patterns + top 5 anti-patterns) en 23 min total (vs 10h manuel = x24).

**Source citation** : `.claude/skills/scout-concurrents/SKILL.md` ligne 60-65 :

> "**5-10 doc-maker en parallele** : 10 min + 15 synthese. Gain net : x12 a x20 sur le temps, qualite stable, capitalisation reutilisable pour futurs clients du meme vertical."

---

### Carte 6 — `/apply-nopillo-ds`

> Applique le DS Nopillo (88 variables + Header/Footer/CTA composants partages) a une nouvelle page Webflow.

**AVANT (sans skill) — 4h** : lire doc DS, inserer Header/Footer/CTA, remplacer hex/px hardcodes par variables CSS sur tous les elements, tester responsive 4 breakpoints, verifier coherence visuelle.

**APRES (avec skill) — 1h** :

```
/apply-nopillo-ds --pageId 67abc... --mode refactor
```

**RESULTAT** : lecture page (47 elements styles), diagnostic ecarts (12 couleurs hardcodees, 8 tailles hardcodees, font Arial herite, Header/Footer/CTA absents), application variables sur 47 elements, insertion 3 composants partages, validation 4 breakpoints (tiny 320 / small 480 / medium 991 / main 1280+), publication staging. **Status : 47 ecarts corriges, 0 erreur.**

**Source citation** : `.claude/skills/apply-nopillo-ds/SKILL.md` ligne 26-44 (workflow 5 etapes).

---

## Pour completer la section : tableau "ROI cumule equipe"

A ajouter sous les 6 cartes (preuve quantifiee) :

Cite `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md` ligne 23-77 :

| Skill | Frequence usage typique | Gain par usage | ROI annuel (10 landings/an) |
|---|---|---|---|
| `/connect-hubspot-form` | 80% des projets | 1h30 | ~24h/an |
| `/extract-design-system` | Chaque nouveau client | 7h | ~35h/an |
| `/landing-google-ads` | 100% projets Google | 7h | ~70h/an |
| `/landing-meta-ads` | 60% projets Meta | 4h | ~24h/an |
| `/scout-concurrents` | Chaque nouveau client | 9h30 | ~47h/an |
| `/apply-nopillo-ds` | 100% projets | 3h | ~30h/an |
| **Total ROI 6 skills** | - | - | **~230h/an** |

Cite `docs/formation-nopillo/06-format-3-jours.md` (apport 3 jours) :

> "**Livrable participant** : 1 projet client complet de A a Z + 6-8 skills + maitrise alternative Webflow"

---

## Pourquoi cette section convertit

1. **Demystifie le mot "skill"** par 6 demos ultra concretes
2. **L'invocation en 1 ligne** est visuellement frappante (2 min vs 30 min)
3. **Le RESULTAT mockup** montre que c'est pas magique : c'est un pipeline de validations
4. **Source des skills citees du repo** = le formateur **a deja fait** ce qu'il vend
5. **Tableau ROI cumule** = ROI tangible (~230h/an = 1.4 mois homme)
6. **Le skill `/apply-nopillo-ds` mentionne "Nopillo"** = personnalisation directe au lecteur

---

## CTA fin de section

```
"Voir les 14 skills agency type que nous co-construisons en 2 jours"
-> ancre vers section formats
```

---

## Specs Webflow MCP

```
Layout : 3 colonnes desktop / 1 colonne mobile, gap 24px
6 Cards translucides #DEDAFF border, padding 32/24px
Headline : Futura PT 600 24px
Code mono : background #09090B, color #DEDAFF, font-family monospace
Tag "AVANT" : badge orange #FFC192 / "APRES" : badge vert mint #0CC28C
Pill button radius 999px sur CTA fin de section
```

---

## Sources

- `.claude/skills/connect-hubspot-form/SKILL.md` — workflow + livrables
- `.claude/skills/extract-design-system/SKILL.md` — pipeline 6 etapes
- `.claude/skills/landing-google-ads/SKILL.md` — workflow 7 etapes + ROI
- `.claude/skills/landing-meta-ads/SKILL.md` — workflow 8 etapes + ROI
- `.claude/skills/scout-concurrents/SKILL.md` — pattern fan-out parallele
- `.claude/skills/apply-nopillo-ds/SKILL.md` — workflow 5 etapes
- `docs/methodologie-documentation-first/05-pattern-skills-recurrents.md` — 14 skills agency type + priorisation
- `docs/methodologie-documentation-first/06-roi-mesure.md` — ROI mesure avant/apres
