# CDC — Skill `init-landing-stack`

> Cahier des charges pour la creation d'un skill Cowork qui bootstrap un projet de landing page complet (Astro/Vite + Tailwind + Supabase + Netlify) en posant les bonnes questions et en automatisant le scaffolding, la connexion Supabase, le deploy Netlify et la generation du contexte Claude Code.

## Resume executif

**Skill cible** : `init-landing-stack`

**Mission** : faire passer l'utilisateur d'une idee de landing a une **landing en ligne sur Netlify avec backend Supabase fonctionnel** en une seule commande slash, en moins de 15 minutes.

**Sorties attendues** :
- Dossier projet pret a coder, avec dependencies installees
- Projet Supabase cree (ou link a existant) + table `leads` + Edge Function `contact-form`
- Site Netlify cree via CLI + extension Supabase x Netlify activee + premier deploy en ligne
- `CLAUDE.md` court (< 80 lignes) + `.claude/rules/` + skill `context-guardian` reference
- Structure : `front/` (code landing) + `supabase/functions/` (Edge Functions) + `docs/`

## Scope

**Inclus dans le skill** :
- Interview en 6-8 questions adaptees au profil de la landing
- Scaffolding Astro 6 (defaut) OU Vite + React/Vue (alternative)
- Setup Tailwind 4 + design tokens
- Init Supabase + migration leads + Edge Function `contact-form`
- Init Netlify via CLI + connect Git + first deploy
- Generation `CLAUDE.md` + `.claude/rules/` + reference context-guardian
- Verification finale (Lighthouse + test form + context-guardian score)

**Exclus** :
- Design system custom (le skill `extract-design-system` est appele si besoin)
- Tracking GA4/Meta avance (le skill `connect-hubspot-form` ou les landing-*-ads sont appeles a part)
- Auth utilisateur (hors scope landing, c'est une feature app)
- Multi-page complexe (le skill genere 1 page index + pricing optionnel)

## Stack detecte (projet hote)

| Couche | Techno |
|--------|--------|
| Frontend | Astro 6 (defaut) ou Vite 7 + React/Vue (alternative) |
| Styling | Tailwind CSS 4 |
| Backend | Supabase (Postgres + Edge Functions Deno) |
| Infra | Netlify (hosting + CI/CD + extension Supabase) |
| Outils | Claude Code + skills Cowork + MCPs (Supabase, Netlify, Playwright) |

Source detaillee : [docs/stack-landing-claude-code/](../stack-landing-claude-code/_index.md)

## Phases du skill

| Phase | Description | Effort utilisateur | Effort skill |
|-------|-------------|--------------------|--------------|
| 1. Interview | 6-8 questions guidees | 3-5 min | scaffold mental model |
| 2. Scaffolding | Creation dossier + install deps | Aucun (skill execute) | 2 min |
| 3. Supabase | Project create/link + migration + Edge Function | 1 click OAuth | 3 min |
| 4. Netlify | Site create + git connect + first deploy | 1 click OAuth | 3 min |
| 5. Context Claude Code | CLAUDE.md + rules + skill context-guardian | Aucun | 1 min |
| 6. Verification | Lighthouse + test form + context-guardian | Lecture rapport | 1 min |
| **Total** | | **5-7 min utilisateur** | **10-12 min execution** |

## Index

| Fichier | Contenu |
|---------|---------|
| [01-specs.md](01-specs.md) | Specifications fonctionnelles : flow interview, etapes, livrables par phase |
| [02-architecture.md](02-architecture.md) | Architecture technique du skill : structure fichiers, references, scripts, agents |
| [03-taches.md](03-taches.md) | Decoupage en taches pour creer le skill avec executeurs et dependances |
| [sources.md](sources.md) | Docs referencees + decisions architecture |

## Documentation referencee

Le skill s'appuie sur la doc existante (pas de duplication) :

| Doc | Usage par le skill |
|-----|---------------------|
| [docs/stack-landing-claude-code/01-overview.md](../stack-landing-claude-code/01-overview.md) | Justification stack + arbre de decision |
| [docs/stack-landing-claude-code/04-setup-astro-netlify.md](../stack-landing-claude-code/04-setup-astro-netlify.md) | Template setup Astro |
| [docs/stack-landing-claude-code/03-setup-vite-netlify.md](../stack-landing-claude-code/03-setup-vite-netlify.md) | Template setup Vite (alternative) |
| [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md) | Patterns Edge Function + extension Netlify |
| [docs/stack-landing-claude-code/06-claude-code-workflow.md](../stack-landing-claude-code/06-claude-code-workflow.md) | Template CLAUDE.md court |
| [docs/stack-landing-claude-code/07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) | Checklist post-deploy executee a la fin |
| [.claude/skills/context-guardian/SKILL.md](../../.claude/skills/context-guardian/SKILL.md) | Verification finale du contexte Claude Code |

## Critere de succes du skill (definition de done)

Apres execution complete du skill, l'utilisateur doit obtenir :

1. URL Netlify de production accessible (HTTPS, page hero visible)
2. Soumission form de test inseree dans `public.leads` Supabase
3. Lighthouse Performance >= 90 (desktop) sur la page deployee
4. `CLAUDE.md` < 80 lignes, score context-guardian >= 60/80
5. Repo git initial commit avec structure conventionnelle
6. README projet avec commandes utiles (dev, build, deploy, supabase)

## Prochaine etape recommandee

Lire [03-taches.md](03-taches.md) puis invoquer `/skill-maker` avec ce CDC en input :

```
/skill-maker Crée le skill `init-landing-stack` en suivant
@docs/cdc-skill-init-landing/_index.md et notamment
@docs/cdc-skill-init-landing/03-taches.md pour la liste des taches.
```
