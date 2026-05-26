# 07 — Slides theorie : structure detaillee

> 18 slides pour le module theorique de 40 min (13h50-14h30). 27 min de presentation slides + 13 min de demos live terminal. Les slides 14-15 presentent **TA methodologie Documentation-First** : c'est le fil rouge de toute la formation.

## Vue d'ensemble

| # | Section | Titre slide | Duree |
|---|---|---|---|
| 1 | Intro | Skill / Rule / MCP / Hook — couvrir | 30s |
| 2 | Intro | Le probleme : Claude oublie tout | 2 min |
| 3 | Concepts | Les 5 mecanismes en 1 tableau | 2 min |
| 4 | CLAUDE.md | CLAUDE.md — le contexte permanent | 2 min |
| 5 | CLAUDE.md | La regle d'or : < 80 lignes | 1 min |
| 6 | Rules | Rules — la connaissance scopee | 2 min |
| 7 | Rules | Anatomie d'une rule (exemple Hero) | 2 min |
| 8 | Skills | Skills — les competences workflow | 2 min |
| 9 | Skills | Les 4 elements d'un bon skill | 2 min |
| 10 | MCP | MCP — les outils externes | 2 min |
| 11 | Hooks | Hooks — l'enforcement deterministe | 1 min |
| 12 | Decision | Le decision tree | 3 min |
| 13 | Decision | Cas concrets : quoi choisir | 1 min |
| **14** | **Methodo** | **Ma methode : Documentation-First** | **2 min** |
| **15** | **Methodo** | **Le pipeline en pratique (4 etapes)** | **2 min** |
| 16 | Anti-patterns | Top 7 anti-patterns | 2 min |
| 17 | Transition | On passe en live — mon pipeline en demo | 30s |
| 18 | Recap | A retenir : 5 lignes + ma methodo | 1 min |

**Total slides** : 27 min
**Total demos live** (apres slide 17) : 13 min
**Total module** : 40 min

> Les slides 14-15 sont **les plus importantes** : c'est la methode signature de Thomas. Les demos qui suivent (17) illustrent directement ces 2 slides. Ne pas couper ces slides meme si tu manques de temps.

## Format conseille pour chaque slide

- **1 idee par slide** — jamais 2
- **Titre court** : 3-7 mots max
- **Pas de paragraphes** — bullets ou code ou diagramme
- **Code en monospace** — police >= 18pt projetee
- **Pas plus de 7 lignes de texte** — apres 7, on coupe
- **Ratio texte/visuel : 50/50 minimum** — utiliser tableaux, diagrammes
- **Couleur** : reprendre le DS Nopillo (indigo #4033DB, white, gray-900)

## Outil conseille

- **Keynote / PowerPoint / Google Slides** : si tu veux du polish visuel
- **Marp** : si tu veux du markdown → slides (technique, te ressemble)
- **Figma Slides** : si tu maitrises Figma deja
- **Pitch** : si tu veux du collab cloud

**Mon vote : Marp** (markdown direct, versionnable git, copy-paste depuis cette doc).

---

## SLIDES — Detail

### Slide 1 — Titre

```
═══════════════════════════════════════════════
SKILL / RULE / MCP / HOOK
═══════════════════════════════════════════════

Les 4 mecanismes pour ancrer Claude
dans la realite de TON projet.

Formation Vibecoding — Jour 1
Thomas (Feaderz)
```

**Notes orales** :
- "Apres 40 min, vous saurez quand utiliser chaque mecanisme."
- "Vous allez l'appliquer immediatement en creant VOTRE skill."

**Visuel** : grand titre, sous-titre, nom + date.
**Duree** : 30s.

---

### Slide 2 — Le probleme

```
LE PROBLEME

A chaque conversation, Claude oublie :

  ✗ Tes conventions de code
  ✗ L'architecture de ton projet
  ✗ Tes workflows recurrents
  ✗ Tes regles de qualite

→ Tu retape tout a chaque session
→ Resultats incoherents entre dev
→ L'IA "hallucine" faute de contexte
```

**Notes orales** :
- "Question : qui a deja vu Claude faire un truc qui n'a rien a voir ?"
- "Cause #1 : il n'a pas le contexte de ton projet."
- "Solution : 4 mecanismes pour persister le contexte."

**Visuel** : icone cerveau qui oublie / boites grisees.
**Duree** : 2 min.

---

### Slide 3 — Vue d'ensemble des 5 mecanismes

```
LES 5 MECANISMES DE CLAUDE CODE

┌──────────┬─────────────────────┬──────────────────┐
│ Mecanisme│ Quand               │ Comment c'est    │
│          │                     │ charge           │
├──────────┼─────────────────────┼──────────────────┤
│ CLAUDE.md│ Regles globales     │ Auto chaque      │
│          │ projet              │ session          │
├──────────┼─────────────────────┼──────────────────┤
│ Rule     │ CE QUE fait UN      │ Auto si match    │
│          │ fichier/dossier     │ paths:           │
├──────────┼─────────────────────┼──────────────────┤
│ Skill    │ COMMENT faire UN    │ A la demande     │
│          │ workflow            │ (trigger)        │
├──────────┼─────────────────────┼──────────────────┤
│ MCP      │ Outils externes     │ Au boot session  │
│          │ (Supabase, etc.)    │                  │
├──────────┼─────────────────────┼──────────────────┤
│ Hook     │ Action qui DOIT     │ Lifecycle event  │
│          │ s'executer          │                  │
└──────────┴─────────────────────┴──────────────────┘
```

**Notes orales** :
- "Skill = competence (verbe). Rule = doc d'un fichier (nom)."
- "C'est le truc le plus important de la journee. On le repete."
- "On va voir chacun en detail."

**Visuel** : tableau projete grand. Surligner les 2 colonnes "Quand" et "Charge".
**Duree** : 2 min.

---

### Slide 4 — CLAUDE.md

```
CLAUDE.md — LE CONTEXTE PERMANENT

📄 Fichier : CLAUDE.md a la racine du projet
🔄 Charge : automatiquement chaque session
🎯 Contenu : conventions globales

Exemple (nopillo-landing-exemple) :

  # CLAUDE.md
  ## Stack
  - Astro 6 + Tailwind 4 + Supabase + Netlify
  ## Conventions
  - PUBLIC_* pour env client
  - Composants .astro statique, .tsx pour islands
  ## Cibles
  - Lighthouse >= 95
  - LCP < 2s
```

**Notes orales** :
- "C'est la **fiche d'identite** de votre projet."
- "Stack, conventions, cibles de qualite."
- "Charge dans CHAQUE conversation, sans rien faire."

**Visuel** : capture du vrai CLAUDE.md du repo.
**Duree** : 2 min.

---

### Slide 5 — La regle d'or des 80 lignes

```
CLAUDE.md : LA REGLE DES 80 LIGNES

  ┌─────────────────────────────────────┐
  │ < 80 lignes  →  Claude suit         │
  │ > 80 lignes  →  Adherence chute     │
  └─────────────────────────────────────┘

Si tu depasses :

  →  Sortir le detail dans docs/
  →  Linker depuis CLAUDE.md
  →  Verifier avec /context-guardian

Source : test reel sur 100+ projets
```

**Notes orales** :
- "C'est verifie en pratique. > 80 lignes, Claude ignore."
- "Concept : recence + primacy. Trop d'info = dilution."
- "Si t'as 200 lignes de regles, c'est que t'as 3 rules et 1 skill cachee dedans."

**Visuel** : graphique "adherence vs taille CLAUDE.md".
**Duree** : 1 min.

---

### Slide 6 — Rules

```
RULES — LA CONNAISSANCE SCOPEE

📄 Fichier : .claude/rules/[nom].md
🔄 Charge : auto si match paths:
🎯 Contenu : ce que fait UN fichier / dossier

  .claude/rules/
  ├── frontend.md     ← regles frontend globales
  ├── backend.md      ← regles backend globales
  ├── front/
  │   ├── hero.md     ← regle scopee a Hero.astro
  │   └── form.md     ← regle scopee a Form.tsx
  └── back/
      └── contact-form.md
```

**Notes orales** :
- "Une rule = doc d'un fichier specifique."
- "Pas charge tout le temps. Seulement quand Claude touche au fichier."
- "C'est ton historique : 'qu'est-ce que fait ce composant ? Pourquoi ?'."

**Visuel** : arborescence .claude/rules/ projetee.
**Duree** : 2 min.

---

### Slide 7 — Anatomie d'une rule

```
RULE : EXEMPLE CONCRET (Hero.astro)

  ---
  paths:
    - "front/src/components/Hero.astro"
  ---

  # Hero — composant LCP

  ## Role
  Premiere section visible. Element LCP du Lighthouse.

  ## Contraintes
  - <Image> Astro, loading="eager"
  - Texte CTA depuis front/.env (HERO_CTA)
  - Pas d'animation framer-motion (CLS)

  ## Dependencies
  - HeroBackground.tsx
  - CTAButton.astro
```

**Notes orales** :
- "paths: c'est le scope. Sans paths:, charge tout le temps = pollution."
- "Sections classiques : Role / Contraintes / Dependencies."
- "Quand Claude touche Hero.astro, il sait pourquoi telle decision."

**Visuel** : code highlighted (frontmatter en jaune, sections en gras).
**Duree** : 2 min.

---

### Slide 8 — Skills

```
SKILLS — LES COMPETENCES WORKFLOW

📄 Fichier : .claude/skills/[verbe]/SKILL.md
🔄 Charge : a la demande (trigger description)
🎯 Contenu : procedure repetable avec etapes

Skill = un VERBE.

  /deploy-staging        deployer
  /audit-lcp             auditer
  /clone-section         cloner
  /generate-favicon      generer
  /scan-broken-links     scanner

→ "Je tape les memes etapes 3x ?" Cree un skill.
```

**Notes orales** :
- "Skill = competence. Toujours un verbe."
- "Trigger : Claude detecte un mot-cle dans ta phrase → lance le skill."
- "C'est ce que vous allez creer cet apres-midi."

**Visuel** : liste skills en gros + arborescence .claude/skills/.
**Duree** : 2 min.

---

### Slide 9 — Les 4 elements d'un bon skill

```
ANATOMIE D'UN BON SKILL

  ┌──────────────────────────────────────────┐
  │ ① name           Verbe kebab-case clair  │
  │ ② description    "Use when X, Y, Z"      │
  │ ③ etapes         5-8 etapes numerotees   │
  │ ④ sortie         Qu'est-ce que je recois │
  └──────────────────────────────────────────┘

  ---
  name: audit-lcp
  description: Audit Lighthouse + propose 3
    optimisations LCP. Use when "audit perf",
    "verifier LCP", "optimiser performance".
  allowed-tools: Read Write Bash
  model: sonnet
  ---

  1. cd front && npm run build → OK ?
  2. npm run preview & lighthouse → score
  3. Identifier 3 issues prioritaires
  4. Output : docs/audit-[date].md
```

**Notes orales** :
- "Description avec triggers explicites = c'est CRITIQUE."
- "Sans 'Use when X, Y, Z', Claude ne sait pas quand lancer."
- "5-8 etapes max. 20 = decoupe en 2 skills."

**Visuel** : structure en boites + code skill highlighted.
**Duree** : 2 min.

---

### Slide 10 — MCP

```
MCP — LES OUTILS EXTERNES

MCP = Model Context Protocol

  Skill        =  procedure (Claude suit etapes)
  MCP          =  outil concret (Claude appelle fonction)

Exemples MCP installes :

  ✓ mcp__claude_ai_supabase__*  (execute SQL, deploy)
  ✓ mcp__playwright__*          (browser automation)
  ✓ mcp__webflow__*             (Designer + Data API)

Un skill peut UTILISER un MCP :

  ---
  allowed-tools: mcp__claude_ai_supabase__apply_migration
  ---
  1. apply_migration via MCP
  2. execute_sql SELECT count(*) pour verifier
```

**Notes orales** :
- "MCP c'est les outils dispos pour Claude (Supabase, Webflow, Playwright)."
- "Comme des fonctions JS, mais cote serveur."
- "Tape `claude mcp list` dans ton terminal pour voir ce qui est dispo."

**Visuel** : diagramme Claude ↔ MCP servers ↔ APIs externes.
**Duree** : 2 min.

---

### Slide 11 — Hooks

```
HOOKS — L'ENFORCEMENT DETERMINISTE

Quand : une action DOIT s'executer (lint, audit).

  Skill = Claude decide d'appeler (peut oublier)
  Hook  = Le harness execute (oubli impossible)

.claude/settings.json :

  {
    "hooks": {
      "PostToolUse": [{
        "matcher": "Edit|Write",
        "command": "cd front && npm run lint -- --fix"
      }]
    }
  }

→ Apres CHAQUE Edit ou Write, lint se lance.
```

**Notes orales** :
- "Hook = enforcement, garanti."
- "Skill : Claude peut oublier. Hook : c'est le systeme qui force."
- "Useful pour : lint apres edit, audit avant commit, ..."

**Visuel** : code settings.json + fleche "trigger".
**Duree** : 2 min.

---

### Slide 12 — Decision tree

```
LE DECISION TREE

Q1: Procedure repetable avec etapes ?
    OUI → SKILL (.claude/skills/[verbe]/)
    NON → Q2

Q2: Fait permanent toutes sessions ?
    OUI → CLAUDE.md (< 80 lignes)
    NON → Q3

Q3: Fait specifique a UN fichier ?
    OUI → RULE (.claude/rules/ avec paths:)
    NON → Q4

Q4: Action qui DOIT s'executer ?
    OUI → HOOK (settings.json)
    NON → Q5

Q5: Outil / API externe ?
    OUI → MCP (claude mcp add ...)
    NON → Pas besoin d'ajouter de contexte
```

**Notes orales** :
- "Vous avez UN doute ? Vous prenez ce tree."
- "C'est la slide a photographier MAINTENANT avec votre tel."
- "On va l'appliquer sur des cas concrets."

**Visuel** : decision tree en diagramme + emojis.
**Duree** : 3 min.

---

### Slide 13 — Cas concrets : quoi choisir

```
CAS CONCRETS — QUEL MECANISME ?

┌──────────────────────────────────────┬──────────┐
│ Cas                                  │ Choix    │
├──────────────────────────────────────┼──────────┤
│ "Resume ce que fait Hero.astro"      │ Rule     │
│ "TypeScript strict partout"          │ CLAUDE.md│
│ "Deploy Netlify + Lighthouse"        │ Skill    │
│ "Lint auto apres Edit"               │ Hook     │
│ "Connecter a Supabase"               │ MCP      │
│ "Convention naming kebab-case"       │ CLAUDE.md│
│ "Audit cross-browser"                │ Skill    │
│ "Brief de la page Pricing"           │ Rule     │
└──────────────────────────────────────┴──────────┘

→ Vous trouvez l'intuition tres vite.
```

**Notes orales** :
- "Question piege : 'Audit cross-browser'. Skill ou hook ?"
- "Skill : tu l'appelles quand tu veux. Hook : ca se fait apres chaque edit."
- "Posez les questions, on debat."

**Visuel** : tableau projete + 2 minutes de Q/R.
**Duree** : 1 min (+2 min Q/R si interaction).

---

### Slide 14 — Ma methode : Documentation-First

```
MA METHODE : DOCUMENTATION-FIRST

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │   Je ne code RIEN avant d'avoir saoule          │
  │   Claude de contexte.                           │
  │                                                 │
  └─────────────────────────────────────────────────┘

Le principe :

  Plus Claude a de contexte → moins il hallucine
  Plus Claude est cadre    → moins de bugs
  Plus c'est documente     → plus c'est reproductible

Mon stack mental :

  1. EN-QUETER  (creer beaucoup de docs)
  2. CADRER     (transformer en plan d'action)
  3. CAPITALISER (industrialiser en skills)
  4. EXECUTER   (coder avec contexte riche)
```

**Notes orales** :
- "Si vous retenez UN truc de la journee : ce slide."
- "Je ne lance JAMAIS un projet sans avoir saoule Claude de docs avant."
- "C'est exactement ce que vous avez fait ce matin : je vous ai donne le repo + docs + rules + skills. Resultat : vous avez code direct."
- "Sans ca : Claude invente, vous corrigez 50% du temps."

**Visuel** :
- Slide tres visuelle, encadre indigo gros
- Flèche temporelle 4 etapes en bas
- Mot "Documentation-First" en gros

**Duree** : 2 min.

---

### Slide 15 — Le pipeline en pratique

```
LE PIPELINE EN PRATIQUE (4 ETAPES)

┌──────────────────┬──────────────────┬─────────────────┐
│ ① ENQUETER       │ ② CADRER         │ ③ CAPITALISER   │
│                  │                  │                 │
│ /doc-maker       │ /cdc-maker       │ /skill-maker    │
│                  │                  │                 │
│ 5-10 doc-maker   │ 1 CDC structure  │ 1 skill par     │
│ en parallele     │ 20-30 taches     │ workflow        │
│                  │ avec dependances │ recurrent       │
│ → docs/[sujet]/  │ → docs/cdc-X/    │ → .claude/      │
│                  │                  │   skills/[X]/   │
│ 10 min           │ 15 min           │ 20-30 min       │
└──────────────────┴──────────────────┴─────────────────┘
                          │
                          ▼
              ┌─────────────────────────┐
              │ ④ EXECUTER              │
              │                         │
              │ Claude code DANS un     │
              │ contexte riche :        │
              │   - docs/             │
              │   - rules/            │
              │   - skills/           │
              │   - MCP connectes     │
              │                         │
              │ → Le bug n'est plus    │
              │   Claude. C'est le brief│
              └─────────────────────────┘
```

**Notes orales** :
- "Etape 1 : je lance 5-10 /doc-maker EN PARALLELE sur concurrents, stack, best practices, anti-patterns."
- "Etape 2 : avec ces docs, /cdc-maker structure un CDC en 15 min."
- "Etape 3 : je repere les workflows recurrents → 1 skill par workflow."
- "Etape 4 : la, Claude code avec TOUT le contexte. Resultat : 0 hallucination."
- "Sur ce projet de formation : 25 docs, 1 CDC, 6 skills. Resultat : la landing est solide."

**Interaction** :
- "Combien de docs sur un nouveau projet client ? Devinez."
- Reponse : "Moi je tape souvent 10-15 docs avant la premiere ligne de code."

**Visuel** :
- 4 boites avec fleches sequentielles
- Couleurs : enqueter (jaune), cadrer (orange), capitaliser (vert), executer (indigo)
- Logos /doc-maker, /cdc-maker, /skill-maker visibles

**Duree** : 2 min.

---

### Slide 16 — Top 7 anti-patterns

```
TOP 7 ANTI-PATTERNS A FUIR

❌ CLAUDE.md > 80 lignes
   → Sortir le detail dans docs/

❌ Skill sans triggers explicites
   → Ajouter "Use when X, Y, Z" dans description

❌ Rule sans paths:
   → Toujours scoper avec paths:

❌ Skill = "fait un truc avec X"
   → 1 verbe, 1 livrable concret

❌ Skill avec 20 etapes
   → Decouper en 2 skills

❌ Hook qui formate sans confirmation
   → Limiter aux operations non destructives

❌ Secrets dans CLAUDE.md
   → Variables d'env + .gitignore
```

**Notes orales** :
- "Ce sont les 7 trucs qui cassent le truc."
- "Si vous en evitez 5 sur 7, vous etes deja meilleurs que 80% des devs Claude Code."

**Visuel** : croix rouges + texte court.
**Duree** : 2 min.

---

### Slide 17 — Transition vers demos

```
ON PASSE EN LIVE — MON PIPELINE EN DEMO

Vous allez VOIR les 3 etapes que je viens de decrire :

  ① /doc-maker      ENQUETER (etape 1)
                    Sujet propose par vous : libre
                    Objectif : voir Claude generer 5+ docs
                    en parallele avec web search

  ② /cdc-maker      CADRER (etape 2)
                    Sur le brief perso d'un participant
                    Objectif : voir le CDC structure
                    avec taches + dependances

  ③ /rule-maker     CAPITALISER (preview etape 3)
                    Cible : composant Hero du projet
                    Objectif : voir une rule generee
                    automatiquement

→ A 14h30, vous attaquez VOTRE skill custom.
```

**Notes orales** :
- "Plus de slides. On bascule terminal."
- "On va voir le pipeline en LIVE, pas en concept."
- "Quelqu'un veut proposer un sujet pour /doc-maker ?"
- "L'objectif : que vous voyiez que c'est REEL et REPRODUCTIBLE."

**Visuel** :
- Enorme fleche "→" pointant vers un screenshot du terminal
- Mapping visuel : demo ① = etape 1 du pipeline, etc.

**Duree** : 30s.

---

### Slide 18 — A retenir (slide finale)

```
A RETENIR

  ╔═══════════════════════════════════════════════════╗
  ║                                                   ║
  ║  LES 5 MECANISMES                                 ║
  ║   1. CLAUDE.md   = regles globales (< 80 lignes)  ║
  ║   2. Rule        = CE qu'est un fichier           ║
  ║   3. Skill       = COMMENT faire un workflow      ║
  ║   4. MCP         = outils externes                ║
  ║   5. Hook        = garantir une action            ║
  ║                                                   ║
  ║  MA METHODE                                       ║
  ║   1. /doc-maker  → enqueter (creer du contexte)   ║
  ║   2. /cdc-maker  → cadrer (plan d'action)         ║
  ║   3. /skill-maker → capitaliser (workflows)       ║
  ║   4. Coder       → executer avec contexte riche   ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝

Votre skill cet apres-midi :
  1 verbe + 1 livrable + 5-8 etapes

Photographiez cette slide maintenant.
```

**Notes orales** :
- "Si vous repartez avec ces 9 lignes, la journee est gagnee."
- "Le top : 5 mecanismes (vocabulaire) + 4 etapes methodo (action)."
- "Sortez vos tels, photo de la slide."
- "Pause de 5 min, on repart en mode hands-on sur VOTRE skill."

**Visuel** :
- Encadre indigo, slide pleine page, gros texte
- 2 zones distinctes : "MECANISMES" et "METHODE"
- Design soigne, c'est la slide qu'ils vont garder

**Duree** : 1 min.

---

## Conseils animation des slides

### Rythme
- **1 slide / 1-2 min** en moyenne — pas plus rapide (perte)
- **Pause 2 sec** apres chaque transition de slide (laisser lire)
- **Question ouverte** tous les 3-4 slides pour reveiller

### Interaction
- Slide 2 (probleme) : demander "qui a deja vu Claude halluciner ?"
- Slide 5 (80 lignes) : demander une estimation de leur CLAUDE.md actuel
- Slide 8 (skills) : demander un verbe / workflow recurrent
- Slide 13 (cas concrets) : interactif, debat ouvert
- **Slide 14 (methodo)** : demander "combien de docs avant de coder sur un nouveau projet ?"
- **Slide 15 (pipeline)** : montrer un EXEMPLE reel (le projet de la formation : 25 docs, 1 CDC, 6 skills)
- Slide 17 (transition) : recolter le sujet /doc-maker

### Si Q/R deborde
- Cap a **3 min de Q/R par slide max**
- "Bonne question, on traite ca a 14h30 sur ton skill"

### Si participant decroche
- Demander un exemple concret de leur metier
- Sur slide 12 (decision tree), faire un cas "live"

## Checklist avant la formation

- [ ] 18 slides creees (Marp ou autre)
- [ ] Slide 1 personnalisee (nom + date)
- [ ] Slide 4 utilise vrai CLAUDE.md du repo template
- [ ] Slide 7 utilise vrai exemple Hero.astro
- [ ] Slide 9 utilise un skill existant en exemple
- [ ] Slide 10 : tester `claude mcp list` la veille
- [ ] Slide 12 : photo HD pour qu'ils puissent zoomer
- [ ] **Slide 14 : preparer 2-3 exemples chiffres** ("sur ce projet : 25 docs, 1 CDC, 6 skills")
- [ ] **Slide 15 : avoir le diagramme pipeline propre** (Figma / Excalidraw)
- [ ] **Slide 17 : sequence des demos preparees** (sujets sous le coude au cas ou personne ne propose)
- [ ] Slide 18 : design soigne (ils vont la photographier)

## Si Marp (markdown → slides)

Installation :
```bash
npm install -g @marp-team/marp-cli
```

Utilisation :
```bash
marp slides-theorie.md --output slides.pdf
# ou pour preview live :
marp -p slides-theorie.md
```

Theme conseille : `gaia` (clean, professional) ou custom avec DS Nopillo.

## Sources

- [docs/cours-formation-vibecoding-j1/02-theorie.md](02-theorie.md) — Contenu source
- [docs/claude-code-rules/04-skills-vs-rules.md](../claude-code-rules/04-skills-vs-rules.md) — Theorie source
- [docs/pedagogie-formation/05-techniques-animation.md](../pedagogie-formation/05-techniques-animation.md) — Animation slides
- [docs/pedagogie-formation/07-materiel-pedagogique.md](../pedagogie-formation/07-materiel-pedagogique.md) — Materiel pedagogique
- [Marp documentation](https://marp.app/) — Markdown to slides
