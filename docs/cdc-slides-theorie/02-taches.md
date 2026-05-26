# 02 — Decoupage en taches

## Table des Matieres

1. [Vue d'ensemble](#vue-densemble)
2. [P0 — Setup](#p0--setup)
3. [P1 — Slides Intro (1-3)](#p1--slides-intro-1-3)
4. [P2 — Slides Concepts (4-11)](#p2--slides-concepts-4-11)
5. [P3 — Slides Decision & Methodo (12-15)](#p3--slides-decision--methodo-12-15)
6. [P4 — Slides Final (16-18)](#p4--slides-final-16-18)
7. [P5 — QA & Livraison](#p5--qa--livraison)
8. [Diagramme de dependances](#diagramme-de-dependances)
9. [Waves d'execution paralleles](#waves-dexecution-paralleles)
10. [Chemin critique](#chemin-critique)
11. [Estimation effort](#estimation-effort)

## Vue d'ensemble

**Total** : 25 taches reparties sur 6 phases (P0 a P5).

| Phase | Description | Taches | Effort | Parallelisation |
|---|---|---|---|---|
| **P0** | Setup structure + theme + reveal.js | 4 | 30 min | 2 waves |
| **P1** | Slides 1-3 (intro) | 3 | 20 min | 1 wave parallele |
| **P2** | Slides 4-11 (concepts) | 8 | 50 min | 4 waves paralleles |
| **P3** | Slides 12-15 (decision + methodo) ⭐ | 4 | 30 min | 2 waves |
| **P4** | Slides 16-18 (final) | 3 | 20 min | 1 wave parallele |
| **P5** | QA + PDF + README | 3 | 30 min | sequentiel |

**Total effort** : ~2h30 en parallele, ~4-5h sequentiel.

**Priorites** :
- P0 : bloquantes (tout depend d'elles)
- P3 (slides 14-15 methodo) : critiques (signature Thomas)
- P5 : finalisation (sans QA, le livrable n'est pas fini)

## P0 — Setup

### 0.1 — Creer structure dossier `slide/`

| Champ | Valeur |
|---|---|
| **ID** | 0.1 |
| **Description** | Creer `slide/` a la racine + sous-dossiers `theme/`, `assets/`, `notes/` |
| **Executeur** | Claude Code direct (Bash mkdir) |
| **Dependances** | Aucune |
| **Livrable** | `slide/`, `slide/theme/`, `slide/assets/`, `slide/notes/` existent |
| **Priorite** | P0 |
| **Effort** | 2 min |

**Commande** :
```bash
mkdir -p slide/theme slide/assets slide/notes
```

### 0.2 — Copier `tokens.css` du DS Nopillo

| Champ | Valeur |
|---|---|
| **ID** | 0.2 |
| **Description** | Copier `tokens.css` (88 variables) depuis le skill apply-nopillo-ds vers `slide/theme/tokens.css` |
| **Executeur** | Claude Code direct (Bash cp) |
| **Dependances** | 0.1 |
| **Livrable** | `slide/theme/tokens.css` existe et contient les 88 tokens |
| **Priorite** | P0 |
| **Effort** | 1 min |

**Commande** :
```bash
cp .claude/skills/apply-nopillo-ds/assets/tokens.css slide/theme/tokens.css
```

### 0.3 — Creer `slide/theme/nopillo.css` (theme custom reveal.js)

| Champ | Valeur |
|---|---|
| **ID** | 0.3 |
| **Description** | Theme CSS personnalise qui override reveal.js base avec tokens Nopillo (couleurs, typo, cards, tableaux, code blocks) |
| **Executeur** | Claude Code direct (Write) |
| **Dependances** | 0.2 |
| **Livrable** | `slide/theme/nopillo.css` avec styles complets (cf 01-specs.md section "Theme custom Nopillo") |
| **Priorite** | P0 |
| **Effort** | 15 min |

**Source contenu** : [01-specs.md section "Theme custom Nopillo"](01-specs.md#theme-custom-nopillo).

### 0.4 — Creer `slide/index.html` squelette

| Champ | Valeur |
|---|---|
| **ID** | 0.4 |
| **Description** | Squelette HTML avec head (CDN reveal.js + theme tokens + nopillo + typekit) + body `.reveal > .slides` vide + init Reveal.initialize |
| **Executeur** | Claude Code direct (Write) |
| **Dependances** | 0.3 |
| **Livrable** | `slide/index.html` s'ouvre sans erreur (page vide mais reveal.js initialise) |
| **Priorite** | P0 |
| **Effort** | 10 min |

**Verification** : `open slide/index.html` → ouvre Safari → reveal.js loaded (DevTools console clean).

**Source contenu** : [01-specs.md section "Squelette HTML reveal.js"](01-specs.md#squelette-html-revealjs).

## P1 — Slides Intro (1-3)

### 1.1 — Slide 1 : Titre formation

| Champ | Valeur |
|---|---|
| **ID** | 1.1 |
| **Description** | Slide titre avec logo Nopillo, h1 "Skill / Rule / MCP / Hook", subtitle, meta + speaker notes |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec class `slide-titre`, logo visible, layout centre, notes presentes |
| **Priorite** | P0 |
| **Effort** | 5 min |

**Source contenu** : [07-slides-theorie.md slide 1](../cours-formation-vibecoding-j1/07-slides-theorie.md).

**Assets requis** : copier `logo.svg` du skill apply-nopillo-ds vers `slide/assets/logo-nopillo.svg`.

### 1.2 — Slide 2 : Le probleme

| Champ | Valeur |
|---|---|
| **ID** | 1.2 |
| **Description** | Slide "Le probleme : Claude oublie tout" avec liste pain points + conclusion |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec h2, 4 bullets avec X (✗), 3 consequences, speaker notes |
| **Priorite** | P0 |
| **Effort** | 5 min |

**Source contenu** : [07-slides-theorie.md slide 2](../cours-formation-vibecoding-j1/07-slides-theorie.md).

### 1.3 — Slide 3 : Les 5 mecanismes en tableau

| Champ | Valeur |
|---|---|
| **ID** | 1.3 |
| **Description** | Slide tableau de synthese des 5 mecanismes (CLAUDE.md, Rule, Skill, MCP, Hook) |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec tableau HTML 3 colonnes (Mecanisme / Quand / Charge), style Nopillo |
| **Priorite** | P0 |
| **Effort** | 10 min |

**Source contenu** : [07-slides-theorie.md slide 3](../cours-formation-vibecoding-j1/07-slides-theorie.md).

## P2 — Slides Concepts (4-11)

### 2.1 — Slide 4 : CLAUDE.md contexte permanent

| Champ | Valeur |
|---|---|
| **ID** | 2.1 |
| **Description** | Slide CLAUDE.md avec icones, exemple code (extrait du repo template), speaker notes |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec `<pre><code class="language-markdown">` montrant CLAUDE.md exemple, syntax highlight |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 2.2 — Slide 5 : La regle des 80 lignes

| Champ | Valeur |
|---|---|
| **ID** | 2.2 |
| **Description** | Slide visuelle avec encadre "< 80 / > 80 lignes" + raison |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec encadre indigo, comparaison visuelle, source "test reel" |
| **Priorite** | P0 |
| **Effort** | 5 min |

### 2.3 — Slide 6 : Rules connaissance scopee

| Champ | Valeur |
|---|---|
| **ID** | 2.3 |
| **Description** | Slide rules avec arborescence .claude/rules/ visible |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec arborescence pre + icones, explication "paths:" |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 2.4 — Slide 7 : Anatomie d'une rule (exemple Hero)

| Champ | Valeur |
|---|---|
| **ID** | 2.4 |
| **Description** | Slide code exemple complet d'une rule (paths: + Role + Contraintes + Dependencies) |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec code yaml+markdown highlight, sections soulignees |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 2.5 — Slide 8 : Skills competences workflow

| Champ | Valeur |
|---|---|
| **ID** | 2.5 |
| **Description** | Slide skills avec liste de verbes/skills exemples + arbo .claude/skills/ |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec liste de 5 skills en gros + question "tu tapes les memes etapes 3x ?" |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 2.6 — Slide 9 : Les 4 elements d'un bon skill

| Champ | Valeur |
|---|---|
| **ID** | 2.6 |
| **Description** | Slide 4 elements (name, description, etapes, sortie) + exemple code complet skill audit-lcp |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec 4 boites numerotees + code yaml SKILL.md |
| **Priorite** | P0 |
| **Effort** | 10 min |

### 2.7 — Slide 10 : MCP outils externes

| Champ | Valeur |
|---|---|
| **ID** | 2.7 |
| **Description** | Slide MCP avec exemples MCPs installes + difference vs skill + exemple skill qui utilise MCP |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec liste MCPs (Supabase, Playwright, Webflow) + code skill avec allowed-tools |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 2.8 — Slide 11 : Hooks enforcement

| Champ | Valeur |
|---|---|
| **ID** | 2.8 |
| **Description** | Slide hooks avec exemple settings.json + difference skill vs hook |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec code json highlight + fleche "trigger" |
| **Priorite** | P0 |
| **Effort** | 6 min |

## P3 — Slides Decision & Methodo (12-15) ⭐

> Phase critique. Slides 14-15 sont la **signature methodologique de Thomas**. Soin particulier au design (encadre indigo, diagramme pipeline).

### 3.1 — Slide 12 : Decision tree

| Champ | Valeur |
|---|---|
| **ID** | 3.1 |
| **Description** | Decision tree visuel Q1-Q5 → mechanism choisi |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec arbre de decision ASCII ou SVG, slide claire et photographique |
| **Priorite** | P0 |
| **Effort** | 12 min |

**Note** : slide a photographier par les participants. Design soigne.

### 3.2 — Slide 13 : Cas concrets

| Champ | Valeur |
|---|---|
| **ID** | 3.2 |
| **Description** | Tableau cas concrets → quel mecanisme choisir |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec tableau 8 lignes (cas / choix), pret pour debat Q/R |
| **Priorite** | P0 |
| **Effort** | 6 min |

### 3.3 — Slide 14 : Ma methode Documentation-First ⭐

| Champ | Valeur |
|---|---|
| **ID** | 3.3 |
| **Description** | Slide signature methodo avec encadre indigo, "Je ne code RIEN avant d'avoir saoule Claude" |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec class `slide-methodo`, encadre indigo radius 24px, design distinctif |
| **Priorite** | **P0 critique** |
| **Effort** | 12 min |

**Note critique** : design distinctif obligatoire (cf. checklist slide 14 dans 07-slides-theorie.md). C'est la slide marqueuse.

### 3.4 — Slide 15 : Pipeline en pratique ⭐

| Champ | Valeur |
|---|---|
| **ID** | 3.4 |
| **Description** | Diagramme pipeline 4 etapes (Enqueter → Cadrer → Capitaliser → Executer) |
| **Executeur** | Claude Code direct (Edit) + asset SVG |
| **Dependances** | 0.4 |
| **Livrable** | Section avec diagramme propre (SVG ou HTML/CSS), 4 boites + fleches, exemples chiffres |
| **Priorite** | **P0 critique** |
| **Effort** | 15 min |

**Asset a creer** : `slide/assets/diagram-pipeline.svg` (4 boites + fleches) OU layout HTML/CSS pur avec grid + couleurs distinctes par etape.

## P4 — Slides Final (16-18)

### 4.1 — Slide 16 : Top 7 anti-patterns

| Champ | Valeur |
|---|---|
| **ID** | 4.1 |
| **Description** | Slide liste des 7 anti-patterns avec croix rouges + corrections |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec 7 anti-patterns, format X / fleche / correction |
| **Priorite** | P0 |
| **Effort** | 8 min |

### 4.2 — Slide 17 : Transition demos

| Champ | Valeur |
|---|---|
| **ID** | 4.2 |
| **Description** | Slide transition vers demos terminal — 3 demos prevues (/doc-maker, /cdc-maker, /rule-maker) |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec 3 boites demos + mapping etapes pipeline + fleche "→ terminal" |
| **Priorite** | P0 |
| **Effort** | 5 min |

### 4.3 — Slide 18 : Recap ⭐

| Champ | Valeur |
|---|---|
| **ID** | 4.3 |
| **Description** | Slide recap finale : 5 mecanismes + 4 etapes methodo, design distinctif |
| **Executeur** | Claude Code direct (Edit) |
| **Dependances** | 0.4 |
| **Livrable** | Section avec class `slide-recap`, frame indigo radius 24px, 2 zones distinctes |
| **Priorite** | **P0 critique** |
| **Effort** | 10 min |

**Note critique** : slide a photographier. Design parfait obligatoire.

## P5 — QA & Livraison

### 5.1 — Test browser local

| Champ | Valeur |
|---|---|
| **ID** | 5.1 |
| **Description** | Tester la presentation dans Chrome, Safari, Firefox. Verifier navigation, transitions, mode speaker (touche S), responsive |
| **Executeur** | Claude Code direct (Bash open + manuel) |
| **Dependances** | 4.1, 4.2, 4.3 (toutes les slides creees) |
| **Livrable** | Rapport texte court : 3 browsers OK / fix necessaires |
| **Priorite** | P0 |
| **Effort** | 15 min |

**Checks** :
- [ ] Navigation fleches OK
- [ ] Transitions douces (pas saccadees)
- [ ] Code blocks coloriques
- [ ] Tableaux lisibles
- [ ] Speaker view OK (touche S)
- [ ] Numero slide visible (`c/t`)
- [ ] Logo Nopillo charge
- [ ] Futura PT charge (Adobe Typekit)
- [ ] Aucune erreur console DevTools

### 5.2 — Test export PDF

| Champ | Valeur |
|---|---|
| **ID** | 5.2 |
| **Description** | Tester URL `slide/index.html?print-pdf` + Cmd+P + Save as PDF avec settings recommandes |
| **Executeur** | Claude Code direct (Bash open + manuel) |
| **Dependances** | 5.1 |
| **Livrable** | `slide/presentation.pdf` genere, 18 pages, lisible |
| **Priorite** | P0 |
| **Effort** | 10 min |

**Settings PDF** : A4 paysage, no margins, background graphics ON, scale 100%.

### 5.3 — Creer `slide/README.md`

| Champ | Valeur |
|---|---|
| **ID** | 5.3 |
| **Description** | README explicatif : comment ouvrir, naviguer, editer, exporter PDF, deployer Netlify |
| **Executeur** | Claude Code direct (Write) |
| **Dependances** | 5.2 |
| **Livrable** | `slide/README.md` clair, < 80 lignes |
| **Priorite** | P1 |
| **Effort** | 5 min |

**Contenu type** :
- Section "Demarrage" : `open slide/index.html`
- Section "Navigation" : raccourcis clavier reveal.js
- Section "Edition" : ou modifier le contenu, comment ajouter slide
- Section "Export PDF" : URL + settings
- Section "Deploy Netlify" : `netlify deploy --dir=slide --prod`

## Diagramme de dependances

```
                    ┌──────┐
                    │ 0.1  │  Creer structure
                    └───┬──┘
                        │
                  ┌─────┴─────┐
                  ▼           ▼
              ┌──────┐    (parallele)
              │ 0.2  │  Copier tokens.css
              └───┬──┘
                  │
                  ▼
              ┌──────┐
              │ 0.3  │  Creer nopillo.css
              └───┬──┘
                  │
                  ▼
              ┌──────┐
              │ 0.4  │  Creer index.html squelette
              └───┬──┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
   ┌────────┐           ┌────────┐
   │ Slides │           │ Slides │
   │ 1-11   │ ───────── │ 12-18  │   (toutes paralleles entre elles)
   └───┬────┘           └────┬───┘
       │                     │
       └─────────┬───────────┘
                 ▼
            ┌──────┐
            │ 5.1  │  QA browser
            └───┬──┘
                ▼
            ┌──────┐
            │ 5.2  │  Test PDF
            └───┬──┘
                ▼
            ┌──────┐
            │ 5.3  │  README
            └──────┘
```

**Conclusion** : 4 taches sequentielles dans P0 (0.1 → 0.2 → 0.3 → 0.4), puis MASSIVE PARALLELISATION sur les 18 slides (taches independantes entre elles), puis 3 taches sequentielles en P5.

## Waves d'execution paralleles

| Wave | Taches | Mode | Duree estimee |
|---|---|---|---|
| **1** | 0.1 | Solo | 2 min |
| **2** | 0.2 | Solo | 1 min |
| **3** | 0.3 | Solo | 15 min |
| **4** | 0.4 | Solo | 10 min |
| **5** | 1.1, 1.2, 1.3 + 2.1, 2.2 | Parallele x5 | ~10 min (max slide) |
| **6** | 2.3, 2.4, 2.5, 2.6, 2.7 | Parallele x5 | ~10 min |
| **7** | 2.8, 3.1, 3.2, 4.1, 4.2 | Parallele x5 | ~12 min |
| **8** | 3.3, 3.4, 4.3 ⭐ | Parallele x3 (soin special) | ~15 min |
| **9** | 5.1 | Solo (manuel) | 15 min |
| **10** | 5.2 | Solo (manuel) | 10 min |
| **11** | 5.3 | Solo | 5 min |

**Total** : 9 waves d'execution.

**Pourquoi Wave 8 separee** : slides 14, 15, 18 sont les plus importantes (signature methodo + recap). Les faire EN DERNIER en concentration totale, sans melanger avec les slides "rapides".

## Chemin critique

```
0.1 → 0.2 → 0.3 → 0.4 → [wave parallele 18 slides] → 5.1 → 5.2 → 5.3
```

**Duree chemin critique (sequentiel pur)** :
- 0.1 : 2 min
- 0.2 : 1 min
- 0.3 : 15 min
- 0.4 : 10 min
- Slides : 15 min (max parallele)
- 5.1 : 15 min
- 5.2 : 10 min
- 5.3 : 5 min

**Total chemin critique** : ~1h13.

**Avec parallelisation optimale** : ~1h30 wall-clock time.

## Estimation effort

| Categorie | Effort cumule |
|---|---|
| Setup (P0) | 28 min |
| Slides intro (P1) | 20 min |
| Slides concepts (P2) | 56 min |
| Slides decision/methodo (P3) ⭐ | 45 min |
| Slides final (P4) | 23 min |
| QA + livraison (P5) | 30 min |
| **TOTAL** | **3h22** |

**Avec parallelisation** : ~1h30-2h wall-clock.

**Repartition** :
- Code/Edit : 80% du temps
- Tests/QA : 15% du temps
- Documentation : 5% du temps

## Critere de finalisation

Le CDC est considere complete quand :

- [ ] 18 sections existent dans `slide/index.html`
- [ ] Theme Nopillo applique visuellement (indigo, Futura PT)
- [ ] Chaque slide a un `<aside class="notes">` avec script formateur
- [ ] Export PDF fonctionne (`?print-pdf`)
- [ ] 3 browsers OK (Chrome, Safari, Firefox)
- [ ] `slide/README.md` present et clair
- [ ] Slides 14, 15, 18 design distinctif (encadre indigo)
- [ ] Aucune erreur console DevTools
- [ ] Chargement < 3 secondes

## Prochaine etape

Demarrer **Wave 1** : tache 0.1.

```
mkdir -p slide/theme slide/assets slide/notes
```

Puis enchainer 0.2 → 0.3 → 0.4 (wave 2-3-4).

Puis lancer Wave 5 en parallele : 5 slides en meme temps.

## Sources

- [_index.md](_index.md) — Vue d'ensemble CDC
- [01-specs.md](01-specs.md) — Specifications techniques
- [07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) — Contenu integral des 18 slides
