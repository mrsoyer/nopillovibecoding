# 07 — Materiel pedagogique

> Tous les supports materiels d'un workshop tech : slides, prompts pre-ecrits, repo templates, checklists, cheatsheets. Avec templates reutilisables.

## Inventaire materiel par format

| Support | 1 jour | 2 jours | 3 jours |
|---------|--------|---------|---------|
| Slide deck | 20-30 | 40-60 | 50-80 |
| Repo template | 1 niveau | 2 niveaux | 3 niveaux (reproduce/adapt/projet) |
| Prompts pre-ecrits | 5-10 | 15-25 | 30-50 |
| Checklist QC livrable | 1 | 2 | 1 par jour + 1 projet final |
| Cheatsheet | optionnel | 1-2 pages | 2-4 pages |
| Recording demos | post-workshop | post-workshop | post-workshop |
| Skill check pre/post | obligatoire | obligatoire | obligatoire (Kirkpatrick complet) |
| Office hours | 1h offert | 2h offert | 4h offert |

## 1. Slide deck

### Regles slides workshop tech

| Regle | Pourquoi |
|-------|----------|
| Max 1h cumulee de slide par jour | Respect 70-20-10 (10% theorie) |
| 1 idee par slide | Evite cognitive overload |
| Code = capture image, pas texte CSS | Lisibilite + zoom |
| Pas de slide "sommaire" complete | Inutile, on a l'agenda projete |
| Toujours un titre verbal action | "Comment X" pas "X" |

### Structure deck type

```
1. Slides intro (5-8 slides)
   - Bienvenue, formateur, objectifs
   - Programme jour par jour
   - Ground rules (questions, pauses, slack)

2. Slides theorie (10-30 slides selon format)
   - 1 concept par slide
   - Schemas > texte
   - 1 exemple concret par concept

3. Slides demo (5-10 slides)
   - Brief de la demo a venir
   - Etapes attendues
   - Resultat cible (screenshot)

4. Slides cheatsheet recap (3-5 slides)
   - A re-voir apres workshop
   - Liens vers la doc

5. Slide fin
   - Skill check post
   - NPS
   - Office hours + ressources
```

### Outils

| Outil | Usage |
|-------|-------|
| Slidev (markdown) | Slides as code, version git |
| Google Slides | Collaboration + commentaires |
| Keynote | Si demos integrees video natives |

## 2. Repo template

Le repo template est **livre au participant** au debut du workshop. C'est leur point de depart.

### Structure type

```
[workshop-name]/
├── README.md                    # Quickstart + checklist setup
├── docs/                        # Reference rapide
│   ├── 01-prompts.md
│   ├── 02-cheatsheet.md
│   └── 03-troubleshooting.md
├── exercises/                   # Repertoire par bloc
│   ├── bloc-01-reproduce/
│   │   ├── start/               # Etat de depart
│   │   ├── solution/            # Solution attendue
│   │   └── README.md
│   ├── bloc-02-adapt/
│   └── bloc-03-project/
├── templates/                   # Templates reutilisables
│   ├── skill-template/
│   ├── prompt-templates.md
│   └── cdc-template.md
└── .claude/                     # Setup Claude Code
    ├── skills/
    └── commands/
```

### Branches alternatives (3 jours)

- `main` : etat de depart vide
- `solutions-j1` : solution livrable J1
- `solutions-j2` : solution livrable J2
- `template-projet-final` : base projet J3

## 3. Prompts pre-ecrits

Eviter de **taper en live** des prompts complexes (faute de frappe, demo qui plante).

### Bibliotheque type Nopillo

```markdown
# Prompts workshop Nopillo

## P1 — Generer une page Webflow basique
```
Use Webflow MCP : cree une nouvelle page dans le site [siteId].
Hero : titre H1 "[texte]", sous-titre "[texte]", CTA "[texte]" -> /contact.
Section features : 3 cards, lire dans le CMS "features".
Footer standard Nopillo.
Sortie : URL de preview.
```

## P2 — Connecter form HubSpot
```
Use HubSpot MCP : recupere les forms du portal [portalId].
Genere le code embed pour le form [formId] dans une page Webflow.
Configure les events GA4 (form_view, form_submit) et Meta Pixel.
Mappe les champs : [mapping].
```

## P3 — Audit landing
```
Audite la landing [url] :
- Performance Lighthouse
- Accessibilite WCAG AA
- Tracking detecte (GA4, Meta, GTM)
- Forms detectes
- Anti-patterns observes
Sortie : docs/audit-[url]/audit.md avec score /100.
```
[...]
```

### Format de chaque prompt

- **ID** unique (P1, P2, ...)
- **Titre** verbal action
- **Variables entre crochets** clairs
- **Sortie attendue** explicite
- **Pre-requis** (MCP, comptes, fichiers)

## 4. Checklist QC livrable

Une checklist par livrable du workshop. Le participant **s'auto-valide** avant code review.

### Template

```markdown
# Checklist QC — Livrable [nom]

## Fonctionnel
- [ ] La page se charge sans erreur console
- [ ] Tous les CTAs cliquent et menent au bon endroit
- [ ] Le form est connecte (test avec email perso)
- [ ] Le form genere bien un contact dans HubSpot
- [ ] Les events GA4 sont detectes (DebugView)

## Design
- [ ] Conforme aux tokens du DS Nopillo
- [ ] Responsive verifie 320px / 768px / 1440px
- [ ] Pas d'overflow horizontal
- [ ] Typographie respecte la hierarchie

## Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Pas d'image > 200 ko non optimisee
- [ ] Pas de JS bloquant > 1s

## Documentation
- [ ] README explique comment reproduire
- [ ] Prompts utilises documentes
- [ ] Captures du livrable + URL de preview

Note auto-eval : ___ / 24 cases cochees
```

## 5. Cheatsheet

Document **post-workshop** principal. 1-4 pages PDF, imprimable.

### Structure cheatsheet type

```
PAGE 1 — Le pipeline (schema visuel des 4 etapes)
PAGE 2 — Les commandes / prompts cles (referencement rapide)
PAGE 3 — Les pieges + fix (anti-patterns)
PAGE 4 — Resources (liens doc, communaute, office hours)
```

Imprimable A4 ou A3 plie. Garder visuelle, pas de paragraphes.

## 6. Recording des demos

Pour permettre au participant de **re-voir** apres workshop.

### Format conseille

- 1 video par demo (15-25 min chacune)
- Hosted prive (Loom, Vimeo prive, drive interne)
- Acces 6 mois minimum
- Index par theme dans le repo template

### Outils recording

| Outil | Avantage |
|-------|----------|
| Loom | Cloud, partage instant |
| OBS | Local, qualite max, gratuit |
| Quicktime + Camo | Mac, qualite micro |

## 7. Communication post-workshop

Mail systematique J+1 et J+7 :

### Mail J+1

```
Bonjour [prenom],

Merci pour ces [1/2/3] jours ensemble.
Voici les ressources :

- Repo template : [lien]
- Recordings : [lien]
- Cheatsheet : [PDF attache]
- Office hours : [lien calendly]
- Slack/Discord : [invite]

Skill check post : [lien typeform]
Merci de le remplir avant vendredi.

A bientot,
[formateur]
```

### Mail J+7

```
Bonjour [prenom],

7 jours ! As-tu commence a appliquer ?

Petit rappel des 3 actions a faire dans le mois :
1. [...]
2. [...]
3. [...]

Office hours toujours dispo : [lien]
Une question rapide ? Reponds a ce mail.

A bientot
```

## Templates pretelechargeables

A fournir aux participants en debut de session :

| Template | Format | Usage |
|----------|--------|-------|
| Brief perso pre-workshop | Markdown | Brief leur cas reel |
| CDC project template | Markdown | Cadrer le projet final |
| Skill template | Folder + SKILL.md | Creer leurs propres skills |
| Pull request template | Markdown | Convention commits/PR equipe |

## Sources

- [Workshop Training — Workshopper](https://www.workshopper.com/post/how-to-run-a-workshop)
- [Designing Technology for Adult Learners — US Dept of Education](https://lincs.ed.gov/professional-development/resource-collections/profile-1020)
- [Conducting a Workshop — Community Tool Box](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main)
