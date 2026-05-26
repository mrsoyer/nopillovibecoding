# Skills vs Rules vs Subagents — Quand Utiliser Quoi

## Le Probleme du Choix

Claude Code offre 3 mecanismes proches qui peuvent porter a confusion : skills, rules, subagents. Cette page tranche.

## La Distinction Fondamentale

| Mecanisme | Repond a | Charge | Cible |
|-----------|----------|--------|-------|
| **CLAUDE.md / rules** | "Quelles sont les regles ?" | Auto (session ou matching paths) | Contexte permanent |
| **Skills** | "Comment fait-on X ?" | A la demande (trigger description) | Workflow/procedure |
| **Subagents** | "Qui delegue cette tache ?" | Delegation explicite | Contexte isole |
| **Hooks** | "Garantir qu'une action s'execute" | Lifecycle events | Enforcement deterministe |

## Definition Operationnelle (pour ce projet)

> **Les skills sont des competences pour lancer un workflow.**
> **Les rules sont de la doc pour resumer ce que fait une page/block (front) ou une edge function (back).**

Concretement, dans ce projet :

```
.claude/
├── skills/               # COMPETENCES (verbes : lancer un workflow)
│   ├── init-landing-stack/      # Bootstrap projet landing
│   ├── connect-hubspot-form/    # Connecter form HubSpot
│   ├── apply-nopillo-ds/        # Appliquer DS Nopillo
│   └── skill-maker/             # Generer des skills (futur)
└── rules/                # CONNAISSANCES (noms : ce QUI existe)
    ├── front/
    │   ├── hero.md                # Resume du composant Hero
    │   ├── contact-form.md        # Resume du block ContactForm
    │   ├── pages-index.md         # Resume de la page index
    │   └── pages-pricing.md       # Resume de la page pricing
    └── back/
        ├── contact-form.md        # Resume de l'edge function
        ├── newsletter.md          # Resume de l'edge function newsletter
        └── leads-migration.md     # Resume de la migration leads
```

## Decision Tree

```
Tu veux ajouter du contexte a Claude.

Q1: Est-ce une procedure repetable avec etapes (deploy, audit, scaffold) ?
  OUI -> SKILL  (.claude/skills/[verbe-kebab]/SKILL.md)
  NON -> Q2

Q2: Est-ce un fait permanent qui doit etre vrai a chaque session ?
  OUI -> CLAUDE.md (court, < 80 lignes)
  NON -> Q3

Q3: Est-ce un fait specifique a UN fichier / UN dossier / UNE feature ?
  OUI -> RULE  (.claude/rules/[nom].md avec paths:)
  NON -> Q4

Q4: Est-ce une recherche/exploration lourde qui floode le contexte ?
  OUI -> SUBAGENT (delegation Task tool)
  NON -> Q5

Q5: Est-ce une action qui DOIT s'executer (lint, format, security check) ?
  OUI -> HOOK (settings.json PreToolUse / PostToolUse)
  NON -> Reconsiderer ; rarement justifie d'ajouter du contexte.
```

## Comparatif Detaille

### Skills

**Format** :
```yaml
---
name: deploy-landing
description: Deploy une landing Astro vers Netlify avec validation Lighthouse. Use when "deploy", "ship to prod", "push landing", "publier la landing".
allowed-tools: Read Write Bash mcp__supabase__*
model: sonnet
effort: medium
---

# Deploy Landing Workflow

1. Verifier build OK : cd front && npm run build
2. Snapshot bundle size
3. netlify deploy --prod
4. Lighthouse check (cible 95+)
5. Report markdown
```

**Quand** :
- "Je tape les memes etapes dans le chat plusieurs fois"
- "Cette procedure a 5+ etapes avec ordre strict"
- "Cette action doit gerer des erreurs / retry / validation"

**Pas pour** :
- Du contexte permanent (utilise CLAUDE.md ou rule)
- Un simple "rappel" (utilise rule)

### Rules (`.claude/rules/`)

**Format** :
```yaml
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
- Pas d'animation framer-motion

## Dependencies
- HeroBackground.tsx (image de fond)
- CTAButton.astro
```

**Quand** :
- "Claude doit savoir CE QUE fait ce fichier quand il y touche"
- "Cette regle ne vaut que pour `front/**` ou `supabase/**`"
- "Un nouveau dev aurait besoin de cette info pour bosser sur ce fichier"

**Pas pour** :
- Une procedure (utilise skill)
- Une regle universelle (utilise CLAUDE.md)

### Subagents (`.claude/agents/`)

**Format** :
```yaml
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS)
- Authentication and authorization flaws
- Secrets or credentials in code
```

**Quand** :
- "Cette tache va lire 50+ fichiers et flood mon contexte"
- "J'ai besoin d'un fresh-context pour une review impartiale"
- "Je veux un model moins cher pour le grunt work"

**Pas pour** :
- Une simple regle (utilise rule)
- Un workflow utilisateur (utilise skill)

### Hooks

**Format** (`.claude/settings.json`) :
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "command": "cd front && npm run lint -- --fix"
    }]
  }
}
```

**Quand** :
- "Cette action DOIT s'executer sans exception"
- "Le modele peut oublier mais le hook ne peut pas"
- "Audit, lint, format, validation"

**Pas pour** :
- Du contexte (utilise rule)
- Une procedure complexe (utilise skill)

## Decision rapide par cas d'usage (projets landing)

| Cas | Choix | Fichier |
|-----|-------|---------|
| "Resume ce que fait le block Hero" | Rule | `rules/front/hero.md` |
| "Resume cette edge function leads" | Rule | `rules/back/leads.md` |
| "Convention global TypeScript strict" | CLAUDE.md | `CLAUDE.md` |
| "Generer un nouveau skill" | Skill | `skills/skill-maker/SKILL.md` |
| "Audit Lighthouse cross-browser" | Skill | `skills/lighthouse-audit/SKILL.md` |
| "Stripe API doc pour integration" | Subagent (research) | `agents/stripe-researcher.md` |
| "Lint auto apres edit" | Hook | `settings.json` PostToolUse |

## Sources

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) — Quand utiliser quoi
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — SKILL.md detaille
- [Claude Code Skills, Subagents, Hooks and Plugins](https://medium.com/@mishra.shashank35/claude-code-skills-subagents-hooks-and-plugins-a-practical-overview-572de7cedb20) — Comparatif pratique
- [A Mental Model for Claude Code](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) — Modele mental
