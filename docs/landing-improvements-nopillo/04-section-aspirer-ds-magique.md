# 04 - Section "Aspirer un Design System en 10 minutes"

> Section a AJOUTER. Position : APRES section "Skills" (cf. 03), AVANT section "Choisissez le format".

---

## Pourquoi cette section est P0

C'est le **PLUS GROS WTF** de la formation, et il n'est pas raconte sur la landing actuelle.

Le formateur a aspire le DS de **nopillo.com en 10 min** via le skill `/extract-design-system`. La preuve est dans le repo : **`docs/design-system-extraction/nopillo-extracted/`** avec 88 variables, tokens DTCG, screenshots, logo SVG, composants documentes.

Une fois cette section ajoutee, le decideur Nopillo pense :

> "Attends, tu as aspire NOTRE DS en 10 min ? Et la landing que je suis en train de regarder utilise ce DS aspire automatiquement ? OK, je veux que mon equipe sache faire ca."

**Effet "wow" immediat + auto-demo de la promesse**.

---

## Headline + sub propose

```
H2 : "Cette landing utilise votre DS, aspire de nopillo.com en 10 minutes."
Sub : "88 variables CSS extraites, tokens DTCG generes, composants identifies (Header, Footer, CTA, cards), prets a importer dans Webflow.
       C'est exactement ce que votre equipe saura faire en sortant de la formation."
```

---

## Format propose : 1 grande section storytelling + preuves

### Bloc 1 — La promesse

```
[Texte intro — 2 paragraphes]

"Vous regardez cette landing en pensant 'pas mal'. Sachez qu'elle a ete construite
en utilisant VOTRE design system, aspire de nopillo.com en 10 minutes via le skill
`/extract-design-system`.

Les 88 variables CSS, la palette indigo + headband orange + brand black,
les boutons pill (radius 999px), les cards translucides, le logo Nopillo —
tout vient d'un audit Playwright + Dembrandt MCP automatise."
```

---

### Bloc 2 — Preuve par les chiffres

Tableau "Ce qui a ete extrait en 10 minutes" :

| Categorie | Nombre | Exemples |
|---|---|---|
| Variables CSS | 88 | `--indigo-600 #4033DB`, `--graycool-900 #09090B`, `--orange-100 #FFF3DF` |
| Tokens DTCG (3 layers) | 80 (cap fixe) | primitive, semantic, component |
| Composants identifies | 9 | Buttons (primary, accent, outline), Cards translucides, Navbar, Footer, Headband, Form, Section-CTA |
| Screenshots Playwright | 5 | hero, navbar, cards, footer, mobile |
| Polices identifiees | 2 | Futura PT (Adobe Typekit), Splinesans |
| Assets logo | 1 SVG | `nopillo-logo-final.svg` |
| Container max-width | 1408px (nav) / 1120px (content) | Webflow standard |
| Border-radius dominant | 16px (cards) / 999px (pills) | Pattern signature |
| Shadow signature | `0 1px 10px rgba(0,0,0,0.06)` | Cards, modals |

**Source citation** : `docs/design-system-extraction/nopillo-extracted/_index.md` ligne 26-39 (TL;DR).

---

### Bloc 3 — Preuve par le pipeline

```
[Box "Comment ca marche" — 6 etapes]

1. Setup + extraction Dembrandt MCP -> nopillo.com-raw.json (12 KB)
2. Audit visuel Chrome DevTools MCP -> 5 screenshots + css-vars.json
3. Curation Claude Opus -> 80 tokens (sur 188 detectes)
4. Adaptation client -> palette swap, OKLCH scale, contrast WCAG AA
5. Generation webflow-import.css -> :root variables ready to paste
6. Import Webflow MCP variable_tool -> 88 variables creees automatiquement

Validation gates : JSON > 1KB, 50-80 tokens, WCAG AA pass, valid CSS.
```

**Source citation** : `.claude/skills/extract-design-system/SKILL.md` ligne 16-26 et `docs/design-system-extraction/04-workflow-claude-code.md` ligne 9-18 (pipeline 7 etapes).

---

### Bloc 4 — La regle d'or (positionnement ethique + legal)

A inclure (renforce trust + rassure les decideurs) :

```
[Box rouge / disclaimer]

REGLE D'OR : Aspirer pour comprendre, pas pour reproduire.

On extrait des decisions de design (echelles, ratios, contrastes, hierarchies),
pas une identite. Le client doit avoir SON DS, jamais une photocopie.

Le skill bloque automatiquement les copies 1:1 :
- Refuse si le brief dit "exactly like X" sans 3+ adaptations
- Audit WCAG AA sur tous les pairs text/background
- Alerte si polices payantes (Sohne, GT Walsheim, Tiempos)
- Document chaque substitution dans final/adaptations.md
```

**Source citation** : `docs/design-system-extraction/_index.md` ligne 56-58 :

> "**Aspirer pour comprendre, pas pour reproduire.** On extrait des decisions de design (echelles, ratios, contrastes, hierarchies) — pas une identite. Le client doit avoir SON DS, pas une photocopie."

Et `.claude/skills/extract-design-system/SKILL.md` operating rules ligne 64-72.

---

### Bloc 5 — Cas d'usage Nopillo (3 scenarios)

```
[Tableau "Quand utiliser /extract-design-system"]
```

| Scenario Nopillo | Action | Output |
|---|---|---|
| Brief client : "j'aime bien le DS de Stripe" | `/extract-design-system --url stripe.com --client acme` | docs/ds-stripe/ -> tokens curates avec adaptation client (palette swap rose Acme) |
| Refonte d'un site ancien d'un client | `/extract-design-system --url old-site.com --client retro` | tokens du site existant -> migration progressive vers Webflow |
| Comparaison 2 references | `/extract-design-system --compare linear.app stripe.com` | rapport comparatif tokens + recommandations hybride |

**Source citation** : `.claude/skills/extract-design-system/SKILL.md` ligne 28-36 (inputs + flags `--client`, `--compare`, `--resume`).

---

### Bloc 6 — Lien vers la preuve concrete (CTA technique secondaire)

```
[CTA secondaire ou box link]

"Voir le dossier complet aspire de nopillo.com :
docs/design-system-extraction/nopillo-extracted/

Vous y trouverez :
- 88 variables dans tokens.css (a coller dans Webflow Project Settings)
- Tokens DTCG dans 09-tokens-dtcg.json (Variable Importer App ready)
- Specs composants : 05-composants-buttons.md, 06-composants-navbar-footer.md, 07-composants-cards-sections.md
- 5 screenshots Playwright assets/
- Logo Nopillo SVG officiel"
```

**Source citation** : `docs/design-system-extraction/nopillo-extracted/_index.md` ligne 9-22 (sommaire complet).

---

## Pourquoi cette section convertit

1. **Effet "wow" immediat** : la landing utilise le DS du client, raconte qu'elle l'a aspire
2. **Preuve dans le repo** : pas un argument marketing, un dossier reel `nopillo-extracted/`
3. **Demystifie l'aspiration** par un pipeline lisible (6 etapes)
4. **Renforce le trust** par la regle d'or ethique/legal (rassure les decideurs)
5. **3 cas d'usage Nopillo** = se projette dans des projets reels de l'agence
6. **Lien tangible** vers le dossier = invite a aller verifier (faible barriere)

**Effet psychologique** : le decideur Nopillo va checker `docs/design-system-extraction/nopillo-extracted/` (s'il a acces au repo) ou demander la preuve au brief gratuit. Dans les deux cas = engagement augmente.

---

## CTA fin de section

```
"Apprendre a aspirer un DS en 10 min en formation 2 jours"
-> ancre vers section formats
```

---

## Specs Webflow MCP

```
Layout : 1 colonne pleine largeur, container 1120px
Background : alternance #DEDAFF (indigo-100) ou white selon section precedente
Hero block : H2 + sub + photo screenshot Nopillo aspire (mockup style "carte de visite")

Tableau DS extracted : grid 2 colonnes, padding 24px, background white sur fond indigo-100
Pipeline 6 etapes : timeline vertical avec icones steps (loupe, oeil, sparkle, palette, code, check)
Box "Regle d'or" : border-left 4px #DB3352 (rouge erreur), background #FFE5E5
Tableau scenarios : grid 3 colonnes, cards translucides
CTA secondaire link : button outline #4033DB hover -> filled
```

**Outils MCP** :
- `webflow:de_page_tool` : Switch active page
- `webflow:element_tool` : Create section, headings, paragraphs, tableau
- `webflow:variable_tool` : Use indigo-600 #4033DB pour titres, graycool-900 #09090B pour body
- `webflow:asset_tool` : Upload mini-screenshots Playwright (depuis `nopillo-extracted/assets/`)
- `webflow:component_builder` : Reutiliser components Nopillo (Card, CTA-section)

---

## Sources

- `docs/design-system-extraction/_index.md` — pipeline 5 etapes + regle d'or
- `docs/design-system-extraction/nopillo-extracted/_index.md` — TL;DR + sommaire complet du dossier preuve
- `docs/design-system-extraction/04-workflow-claude-code.md` — pipeline 7 etapes detaille + prompts type
- `.claude/skills/extract-design-system/SKILL.md` — workflow + inputs + outputs + operating rules
- `docs/audit-landing-vs-nopillo/_index.md` — confirmation que le DS Nopillo aspire est complet (88 variables, ecarts identifies)
