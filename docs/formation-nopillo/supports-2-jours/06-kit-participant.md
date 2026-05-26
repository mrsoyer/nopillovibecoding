# 06 — Kit participant (deliverables a remettre)

> Liste exhaustive des deliverables a remettre aux participants. A preparer avant J1, distribuer J1 + J2 + post.

## Vue d'ensemble

Le kit participant contient 4 categories :
1. **Materiel pendant** (slides, exercices, prompts)
2. **Materiel produit** (skills, landings, CDC)
3. **Materiel reference** (cheatsheet, doc)
4. **Materiel post** (recordings, office hours, suivi)

## 1. Materiel pendant la formation

### A distribuer J1 matin

| Item | Format | Distribution |
|------|--------|--------------|
| Programme imprime J1 + J2 | A4 1 page | Imprime (presentiel) + PDF (visio) |
| Cheatsheet "Pipeline Doc-First" | A4 1 page | Imprime + PDF |
| Cheatsheet "MCP Webflow 18 categories" | A4 recto/verso | Imprime + PDF |
| Acces repo template formation | URL + invite Git | Slack workshop |
| Convention Qualiopi signee | PDF | Mail individuel |
| Feuille emargement | A4 | Imprime (presentiel) |

### A distribuer J2 matin

| Item | Format | Distribution |
|------|--------|--------------|
| Cheatsheet "HubSpot integration" | A4 1 page | Imprime + PDF |
| Cheatsheet "Tracking complet" (GA4 + Pixel + CAPI + Consent V2) | A4 recto/verso | Imprime + PDF |
| Cheatsheet "Meta vs Google Ads" (comparatif) | A4 1 page | Imprime + PDF |

### Prompts pre-ecrits (Slack workshop)

A poster en debut de chaque module dans le canal Slack :

```
# Prompts workshop Nopillo

## P1 — Generer une page Webflow basique
Use Webflow MCP : cree une nouvelle page dans le site [siteId].
Hero : titre H1 "[texte]", sous-titre "[texte]", CTA "[texte]" -> /contact.
Section features : 3 cards.
Footer Nopillo standard.
Sortie : URL preview.

## P2 — Connecter form HubSpot
Use HubSpot MCP : recupere les forms du portal [portalId].
Genere code embed pour form [formId] dans page Webflow [pageId].
Configure events GA4 (form_view, form_submit) et Meta Pixel.
Mappe les champs.

## P3 — Audit landing
Audite la landing [url] :
- Lighthouse
- Accessibilite WCAG AA
- Tracking detecte
- Forms detectes
- Anti-patterns
Sortie : docs/audit-[slug]/audit.md avec score /100.

## P4 — Setup tracking ads complet
Setup GA4 + Pixel + CAPI + Consent V2 sur landing [url].
Verifier en DebugView.
Sortie : config + screenshots de validation.

## P5 — Variante Meta Ads
A partir de la landing [url], produire variante Meta Ads :
- Vertical-first (image/video 9:16)
- Hook visible < 1.7s
- Form Lead embed ou Lead Form Meta natif
- Tracking Pixel + CAPI dedupe
Sortie : URL preview variante.

## P6 — Audit reverse engineering
Analyse la landing concurrente [url] :
- USP
- Hero structure
- CTA flow
- Form approach
- Tracking detecte
- Pourquoi ca convertit (estimation)
Sortie : docs/concurrents-[client]/[concurrent]/analyse.md.
```

## 2. Materiel produit pendant la formation

A la fin J2, chaque participant a produit (a remettre formellement dans un mail recap) :

### Skills custom (6)

| Skill | Module | Verification |
|-------|--------|--------------|
| `/apply-nopillo-ds` | M4 J1 | Test sur site sandbox |
| `/landing-google-ads` | M4 J1 | Landing produite + Lighthouse > 80 |
| `/audit-landing` | M4 J1 | Audit sur 1 URL existante |
| `/connect-hubspot-form` | M5 J2 | Contact cree dans HubSpot |
| `/setup-tracking-ads` | M6 J2 | Tous events DebugView OK |
| `/landing-meta-ads` | M7 J2 | Variante produite + responsive OK |

### Landings produites (2-3)

- 1 landing "Google Ads" (J1 module 4)
- 1 landing "Meta Ads variant" (J2 module 7)
- (Optionnel) 1 landing du brief perso participant

### Documentation produite

- 5 dossiers `docs/concurrents-[client]/` (Exo 2.2 J1)
- 1 CDC `docs/[client]/cdc.md` (Exo 3.1 J1)
- 1 audit landing `docs/audit-[url]/audit.md` (Exo 4.3 J1)

### Repo Git push

- 6 skills committed dans `.claude/skills/`
- 1 README global `.claude/skills/README.md`
- 1 PR ouverte vers main (Exo 8.1)

## 3. Kit avance bonus (distribue fin J2)

Comme indique dans `formation-nopillo/05-format-2-jours.md` (ligne 175) :

### 5 templates landing ads-ready

| Template | Vertical | Format |
|----------|----------|--------|
| `template-saas` | B2B SaaS | Webflow Workspace clone-ready |
| `template-recrutement` | Recrutement | Webflow Workspace clone-ready |
| `template-ecommerce` | E-commerce | Webflow Workspace clone-ready |
| `template-local` | Local / commerce de proximite | Webflow Workspace clone-ready |
| `template-leadgen-b2b` | Lead-gen B2B | Webflow Workspace clone-ready |

Chaque template contient :
- Structure complete (Hero, USP, Social proof, Form, Footer)
- Variables Nopillo pre-injectees
- Form HubSpot pre-configure
- Tracking GA4 + Pixel pre-installe
- Cheatsheet specifique vertical (1 page)

### Convention de nommage skills (PDF)

Document de reference Nopillo :
- Prefixes officiels (apply-, landing-, audit-, connect-, setup-, scrape-)
- Convention semver
- Convention commit messages
- Convention README skill

### Checklist onboarding nouveau dev (1 page)

A garder dans le repo `.claude/skills/onboarding.md` :

```
# Onboarding nouveau dev Nopillo

## J1 (3-4h)
- [ ] Cloner repo Nopillo
- [ ] Installer Claude Code + plan Pro
- [ ] Installer Webflow MCP + HubSpot MCP
- [ ] Lire SKILL.md des 6 skills clefs
- [ ] Faire le tutoriel `apply-nopillo-ds` sur site sandbox
- [ ] Faire le tutoriel `audit-landing` sur 1 URL existante

## J2-3
- [ ] Pair avec un senior sur 1 vraie landing
- [ ] Lire docs/methodologie-documentation-first/
- [ ] Lire docs/formation-nopillo/03-methodologie-formateur.md

## J4-5
- [ ] Produire sa 1ere landing solo
- [ ] Code review par senior
- [ ] Push 1ere PR

## J+30
- [ ] 5 landings produites
- [ ] 1 skill propre cree (rule of two)
```

### Repertoire template `docs/concurrents-{client}/`

Structure pre-pretee pour scout concurrent rapide :

```
docs/concurrents-[client]/
├── README.md  (qui sont les concurrents, pourquoi)
├── concurrent-1/
│   ├── overview.md
│   ├── usp.md
│   ├── pricing.md
│   ├── design-notes.md
│   └── takeaways.md
├── concurrent-2/
└── ...
```

## 4. Materiel post-formation

### Mail J+1

Voir `docs/pedagogie-formation/07-materiel-pedagogique.md` (template ligne 224).

Contenu :
- Repo template (lien)
- Recordings demos (lien Loom prive)
- Cheatsheet PDF (en piece jointe)
- Office hours (calendly)
- Slack workshop (invite definitif)
- Lien skill check post + NPS

### Mail J+7

Voir `docs/pedagogie-formation/07-materiel-pedagogique.md` (template ligne 246).

Contenu :
- Rappel des 3 actions a faire dans le mois
- Office hours toujours dispo
- Question rapide ?

### Mail J+30 (Niveau 3 Kirkpatrick)

Voir `docs/pedagogie-formation/06-evaluation.md` (template ligne 116).

### Mail J+90 (Niveau 4 Kirkpatrick)

Voir `docs/pedagogie-formation/06-evaluation.md` (template ligne 148).

### Office hours

- 2h offert apres formation 2 jours
- Booking via calendly Thomas
- Format : 30 min slot, 1-to-1 ou pair max
- Validite : 90 jours apres formation

### Acces Slack workshop

- Canal #workshop-nopillo-[date]
- Validite : 6 mois apres formation
- Reglement : un dev nopillo aide les autres en priorite, formateur en backup

## Tableau recapitulatif livrables

| Quand | Quoi | Format |
|-------|------|--------|
| J1 9h | Programme + cheatsheets J1 | Imprime + PDF |
| J1 module 4 | Prompts pre-ecrits | Slack |
| J2 9h | Cheatsheets J2 | Imprime + PDF |
| J2 17h | Kit avance (5 templates + conventions) | Repo Git + PDF |
| J+1 | Mail recap + acces post | Mail |
| J+7 | Mail rappel | Mail |
| J+30 | Mail Niveau 3 | Mail |
| J+90 | Mail Niveau 4 | Mail |

## Sources

- `docs/formation-nopillo/05-format-2-jours.md` (ligne 184 materiel fourni)
- `docs/pedagogie-formation/07-materiel-pedagogique.md` (toutes les sections)
- `docs/pedagogie-formation/06-evaluation.md` (mails J+30, J+90)
