# `.claude/rules/` — Path-Scoped Rules

## Table des Matieres
1. [Concept](#concept)
2. [Structure du dossier](#structure-du-dossier)
3. [Frontmatter paths](#frontmatter-paths)
4. [Patterns glob supportes](#patterns-glob-supportes)
5. [Bugs connus](#bugs-connus)
6. [Bonnes pratiques](#bonnes-pratiques)
7. [Exemples concrets](#exemples-concrets)

## Concept

`.claude/rules/` est l'alternative modulaire a un CLAUDE.md monolithique. Chaque `.md` dans ce dossier devient automatiquement contexte projet, **avec la meme priorite haute que CLAUDE.md**.

Difference cle :
- **Sans `paths:` frontmatter** → charge a chaque session (comme CLAUDE.md)
- **Avec `paths:` frontmatter** → charge UNIQUEMENT quand Claude touche un fichier matchant

## Structure du Dossier

Toutes les organisations sont supportees (decouverte recursive) :

```
.claude/rules/
├── code-style.md         # Global (pas de paths:)
├── security.md           # Global
├── testing.md            # Global
├── frontend.md           # Scope front/** (avec paths:)
├── backend.md            # Scope supabase/** (avec paths:)
├── front/
│   ├── hero.md           # Scope front/src/components/Hero.astro
│   ├── contact-form.md   # Scope front/src/components/ContactForm.tsx
│   └── pages-index.md    # Scope front/src/pages/index.astro
└── back/
    ├── contact-form.md   # Scope supabase/functions/contact-form/**
    ├── leads.md          # Scope supabase/migrations/*_leads.sql
    └── auth.md           # Scope supabase/functions/auth/**
```

Convention pour ce projet :
- `.claude/rules/front/{nom-page-ou-block}.md` → contexte specifique a une page/block frontend
- `.claude/rules/back/{nom-fonction}.md` → contexte specifique a une edge function

## Frontmatter paths

```yaml
---
paths:
  - "front/src/components/Hero.astro"
---

# Hero — composant landing principal

## Role
LCP element. Premiere section visible.

## Contraintes
- Image hero : <Image> d'Astro, loading="eager", fetchpriority="high"
- Texte CTA : variable {{HERO_CTA}} dans front/.env
- Pas d'animation framer-motion (kill LCP)

## Endpoint cible
- Le bouton CTA scrolle vers #contact-form (section ContactForm)
```

Une rule avec `paths:` se declenche quand Claude **lit ou modifie** un fichier matchant le pattern.

## Patterns Glob Supportes

| Pattern | Matche |
|---------|--------|
| `**/*.ts` | Tous les TS, recursif |
| `src/**/*` | Tous les fichiers sous `src/` |
| `*.md` | MD a la racine projet |
| `src/components/*.tsx` | Components directs (non recursif) |
| `front/src/components/{Hero,Footer,Header}.astro` | Brace expansion |

Patterns multiples :

```yaml
---
paths:
  - "front/src/components/Hero.astro"
  - "front/src/components/HeroBackground.tsx"
---
```

Brace expansion combinee :

```yaml
---
paths:
  - "supabase/functions/{contact-form,newsletter}/**"
  - "supabase/migrations/*_{leads,subscribers}.sql"
---
```

## Bugs Connus

A jour 2026-05, plusieurs issues ouvertes sur le repo `anthropics/claude-code` :

| Issue | Symptome | Workaround |
|-------|----------|------------|
| [#16299](https://github.com/anthropics/claude-code/issues/16299) | Rules `paths:` chargees globalement au demarrage | Ne pas y mettre de contenu sensible globalement |
| [#16853](https://github.com/anthropics/claude-code/issues/16853) | Rules `paths:` parfois non chargees sur fichier matchant | Verifier avec `/memory` en session |
| [#22170](https://github.com/anthropics/claude-code/issues/22170) | `paths:` dans `~/.claude/rules/` ignore | Utiliser project-level rules |
| [#23478](https://github.com/anthropics/claude-code/issues/23478) | Rules chargees sur Read mais pas Write | Lire le fichier d'abord en plan mode |
| [#23569](https://github.com/anthropics/claude-code/issues/23569) | Rules ignorees via git worktree | Ne pas se reposer sur cela en worktree |

**Recommandation** : verifier en debut de session que tes rules sont chargees via `/memory` ou en demandant a Claude de lister les rules actives.

## Bonnes Pratiques

### 1 fichier = 1 sujet
Un nom de fichier descriptif (`hero.md`, `contact-form.md`, `leads.md`) plutot que `misc.md` ou `notes.md`.

### Reserver les rules SANS paths a l'essentiel
Rules globales = chargees a chaque session. Reserve aux :
- Standards baseline (formatage, typing, testing)
- Contraintes non negociables (security, RGPD)
- Hypotheses projet partagees

### Eviter les rules globales pour
- Workflow steps (→ skill)
- Instructions specifiques a un dossier (→ paths:)
- Pratiques evolutives (→ paths: ou skill)
- Choix techniques en cours d'arbitrage

### Strategie 2-couches
1. **Rules `paths:`** previennent les "erreurs locales" (un fichier specifique a une contrainte specifique)
2. **CLAUDE.md / rules globales** previennent les "malentendus globaux"

### Symlinks pour partager
```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

## Exemples Concrets

### Rule globale (sans paths:)
```markdown
# code-style.md

# Style de code

- TypeScript strict, pas de `any` implicite
- Imports nommes (jamais default sauf framework)
- 2-space indentation
- Arrow functions pour callbacks, function pour top-level
```

### Rule page front
```markdown
# .claude/rules/front/pages-index.md

---
paths:
  - "front/src/pages/index.astro"
---

# Page index (landing principale)

## Role
Page de conversion. Trafic Google Ads + organique.

## Structure
1. Hero (above-the-fold)
2. Social proof (logos clients)
3. Features (3 cards)
4. Pricing
5. FAQ (accordion island)
6. ContactForm (island)
7. Footer

## SEO
- Title : 50-60 chars, mot-cle principal en premier
- Meta description : 150-160 chars
- Schema.org Organization + Product (JSON-LD)

## Performance
- Toutes les sections sauf ContactForm/FAQ en .astro pur (zero JS)
- LCP element = image Hero (loading="eager")

## Lien vers backend
- ContactForm POST vers /functions/v1/contact-form
- UTM extraction obligatoire avant submit
```

### Rule edge function
```markdown
# .claude/rules/back/contact-form.md

---
paths:
  - "supabase/functions/contact-form/**"
---

# Edge function : contact-form

## Role
Reception des leads depuis ContactForm. Insert dans table `leads`.

## Inputs attendus
- email (string, regex valide)
- name (string, 2-80 chars)
- message (string, 10-2000 chars)
- utm_source, utm_medium, utm_campaign (optional)
- _honey (honeypot, doit etre vide)

## Validations
- Email regex stricte
- Honeypot non-vide → 200 OK silencieux (anti-spam)
- Rate limit 5/min/IP (Deno KV)

## Outputs
- 200 : { ok: true, id: <uuid> }
- 400 : { error: "validation_failed", details: [...] }
- 429 : { error: "rate_limited" }
- 500 : { error: "internal" } + console.error contexte

## Securite
- CORS restreint a ALLOWED_ORIGINS (env)
- SERVICE_ROLE_KEY uniquement via Deno.env.get
- Logs sans email/message (PII)

## Lien vers frontend
- Appelee par front/src/components/ContactForm.tsx
- Format de retour consume par useContactForm hook
```

## Sources

- [How Claude remembers your project](https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/) — Specs officielles `.claude/rules/`
- [Claude Code Rules Directory: Modular Instructions That Scale](https://claudefa.st/blog/guide/mechanics/rules-directory) — Guide approfondi
- [How Claude Code rules actually work](https://joseparreogarcia.substack.com/p/how-claude-code-rules-actually-work) — Comportement reel
- [Bug #16299](https://github.com/anthropics/claude-code/issues/16299) — Path-scoped rules loaded globally
- [Bug #16853](https://github.com/anthropics/claude-code/issues/16853) — Path-scoped rules not loaded
