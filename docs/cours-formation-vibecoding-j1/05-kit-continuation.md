# 05 — Kit de continuation (1 page A4 par participant)

> A imprimer recto-verso A4 et distribuer a 17h15. **1 par participant**, personnalise avec leur nom et leurs URLs.

## Recto — Recap personnel

```
═════════════════════════════════════════════════════════════
RECAP FORMATION VIBECODING — [Nom du participant]
═════════════════════════════════════════════════════════════

CE QUE TU AS PRODUIT AUJOURD'HUI :
✓ Landing clonee et personnalisee : [url-netlify-personnelle]
✓ Repo GitHub : [github.com/user/projet]
✓ TON skill custom : .claude/skills/[nom-skill]/

CE QUE TU AS APPRIS :
□ Cloner + lancer un projet Astro + Supabase + Netlify
□ Differencier CLAUDE.md / Rule / Skill / MCP / Hook
□ Utiliser /doc-maker pour eviter les hallucinations
□ Utiliser /cdc-maker pour cadrer un projet
□ Creer ton propre skill .claude/skills/

═════════════════════════════════════════════════════════════
COACHING OFFERT 1H — DANS LES 14 JOURS
═════════════════════════════════════════════════════════════

📅 Reserver : [lien Calendly]

Prepare pour le coaching :
- 1 cas reel que tu veux faire bouger
- L'output de ton premier /context-guardian
- Tes 3 questions / blocages

═════════════════════════════════════════════════════════════
3 ACTIONS J+7 (a faire avant le coaching)
═════════════════════════════════════════════════════════════

□ Lancer /context-guardian sur ton vrai projet client
□ Creer 1 rule .claude/rules/front/[nom].md pour TON
  composant le plus modifie
□ Tester TON skill sur 1 cas reel et noter le gain

═════════════════════════════════════════════════════════════
QUESTIONS / AIDE / SIGNALER UN BUG
═════════════════════════════════════════════════════════════

📧 Thomas : thomas@feaderz.co
💬 Slack groupe formation : [lien Slack]
🗂️  Repo template : [github.com/[ton-org]/formation-vibecoding-template]
```

## Verso — Aide-memoire technique

```
═════════════════════════════════════════════════════════════
LES 5 MECANISMES CLAUDE CODE EN 1 LIGNE
═════════════════════════════════════════════════════════════

CLAUDE.md  Les regles globales (< 80 lignes)        Auto session
Rule       Ce qu'est UN fichier (paths: scope)      Auto match path
Skill      Comment faire UN workflow (verbes)       Trigger description
MCP        Outils externes (Supabase, Webflow...)   Boot session
Hook       Garantir une action (lint, audit)        Lifecycle event

═════════════════════════════════════════════════════════════
COMMANDES UTILES (a memoriser cette semaine)
═════════════════════════════════════════════════════════════

claude --version              # Version Claude Code
claude mcp list               # Lister MCPs installes
/doc-maker [sujet]            # Doc reference (web search)
/cdc-maker [projet]           # Cahier des charges structure
/rule-maker                   # Generer une rule
/context-guardian             # Audit sante du projet
/skill-maker                  # Generer un skill (a installer)

═════════════════════════════════════════════════════════════
STRUCTURE STANDARD D'UN PROJET LANDING
═════════════════════════════════════════════════════════════

mon-projet/
├── CLAUDE.md                 ← < 80 lignes, regles globales
├── front/                    ← Astro + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
├── supabase/                 ← Backend
│   ├── migrations/
│   └── functions/
├── .claude/
│   ├── rules/                ← Rules path-scoped
│   │   ├── frontend.md
│   │   └── backend.md
│   └── skills/               ← Skills custom
│       ├── context-guardian/
│       └── [ton-skill]/      ← TON skill !
├── netlify.toml
└── docs/                     ← Documentation projet

═════════════════════════════════════════════════════════════
LE DECISION TREE (quand utiliser quoi)
═════════════════════════════════════════════════════════════

Procedure repetable avec etapes ?           → SKILL
Fait permanent toutes sessions ?            → CLAUDE.md
Fait specifique a UN fichier ?              → RULE (paths:)
Action qui DOIT s'executer ?                → HOOK
Outil / API externe ?                       → MCP

═════════════════════════════════════════════════════════════
ANTI-PATTERNS TOP 3 A FUIR
═════════════════════════════════════════════════════════════

❌ CLAUDE.md > 80 lignes                    → Sortir dans docs/
❌ Skill sans triggers explicites           → "Use when X, Y, Z"
❌ Rule sans paths:                         → Toujours scoper

═════════════════════════════════════════════════════════════
RESSOURCES POUR APPROFONDIR
═════════════════════════════════════════════════════════════

📖 Doc officielle Claude Code
   code.claude.com/docs

📖 Skills authoring best practices
   platform.claude.com/docs/en/agents-and-tools/agent-skills

📖 Documentation projet template
   docs/claude-code-rules/ (dans le repo clone)

📺 Replay video (visio)
   [lien si applicable]

═════════════════════════════════════════════════════════════
CHANGELOG TON CONTRAT D'APRES-FORMATION
═════════════════════════════════════════════════════════════

Aujourd'hui  [date]     ← Tu repars avec landing + skill
J+7          [date]     ← TODO 3 actions a executer
J+14         [date]     ← Coaching 1h (a reserver)
J+30         [date]     ← Bilan : combien de skills crees ?
                          Combien de rules ? Score context-guardian ?

[FIN — Bonne route !]
```

## Personnalisation a faire avant impression

Pour chaque participant, remplir :
- `[Nom du participant]`
- `[url-netlify-personnelle]`
- `[github.com/user/projet]`
- `[nom-skill]`
- `[lien Calendly]` (un seul, peut etre commun)
- `[lien Slack]` (commun)
- `[github.com/[ton-org]/formation-vibecoding-template]` (commun)
- Les 4 dates `[date]` du changelog (J0, J+7, J+14, J+30)

## Format conseille

- **Recto-verso A4**, papier 120g pour la solidite
- Marges 1.5cm
- Police monospace pour les blocks (ils peuvent etre lus comme du code)
- Logo / nom de ta marque en pied de page

## Pourquoi c'est important

D'apres [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) :

> "Risque 'oubli total' J+7 : suivi post-formation = office hours offert"

Sans kit imprime, **80% du contenu est oublie a J+7**. Le kit sert de :
- **Ancre memorielle** (ils retrouvent vite les commandes)
- **Outil de vente interne** (ils le montrent a leur boss)
- **Contrat moral** (les 3 actions J+7 sont engageantes)

## Sources

- [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) — Materiel pedagogique 1 jour
- [docs/formation-nopillo/04-format-1-jour.md](../formation-nopillo/04-format-1-jour.md) — Kit de continuation
