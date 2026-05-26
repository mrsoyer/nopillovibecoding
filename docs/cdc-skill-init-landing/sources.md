# Sources et decisions

## Documentation interne du projet (referencee par le skill)

| Source | Usage |
|--------|-------|
| [docs/stack-landing-claude-code/_index.md](../stack-landing-claude-code/_index.md) | Vue d'ensemble stack |
| [docs/stack-landing-claude-code/01-overview.md](../stack-landing-claude-code/01-overview.md) | Justification stack + arbre de decision |
| [docs/stack-landing-claude-code/02-comparatif-frameworks.md](../stack-landing-claude-code/02-comparatif-frameworks.md) | Arbre decision Astro vs Vite (Q3 interview) |
| [docs/stack-landing-claude-code/03-setup-vite-netlify.md](../stack-landing-claude-code/03-setup-vite-netlify.md) | Template scaffolding Vite |
| [docs/stack-landing-claude-code/04-setup-astro-netlify.md](../stack-landing-claude-code/04-setup-astro-netlify.md) | Template scaffolding Astro |
| [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md) | Patterns Edge Function + extension Netlify |
| [docs/stack-landing-claude-code/06-claude-code-workflow.md](../stack-landing-claude-code/06-claude-code-workflow.md) | Template CLAUDE.md court |
| [docs/stack-landing-claude-code/07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) | Checklist post-deploy (rapport final) |

## Skills existants references

| Skill | Role par rapport au nouveau skill |
|-------|------------------------------------|
| [.claude/skills/context-guardian/](../../.claude/skills/context-guardian/SKILL.md) | Verification finale du contexte (phase 6) |
| `~/.claude/skills/skill-maker/` (global) | Outil pour creer le skill (taches 1.2, 1.3, 4.x, 5.2) |
| `.claude/skills/connect-hubspot-form/` | Suggere en post-bootstrap si Q7 = HubSpot |
| `.claude/skills/landing-google-ads/` | Suggere en post-bootstrap pour optimisation Google Ads |
| `.claude/skills/landing-meta-ads/` | Suggere en post-bootstrap pour optimisation Meta Ads |
| `.claude/skills/extract-design-system/` | Suggere si l'utilisateur a un site de reference a aspirer |
| `.claude/skills/apply-nopillo-ds/` | Specifique Nopillo, mentionne si pertinent |

## MCPs utilises par le skill

| MCP | Usage |
|-----|-------|
| `mcp__claude_ai_supabase__create_project` | Phase 3 si nouveau projet |
| `mcp__claude_ai_supabase__apply_migration` | Phase 3 migration leads |
| `mcp__claude_ai_supabase__deploy_edge_function` | Phase 3 deploy contact-form |
| `mcp__claude_ai_supabase__execute_sql` | Phase 6 verif insert leads |
| `mcp__claude_ai_supabase__get_project_url` | Phase 3 recup URL |
| `mcp__claude_ai_supabase__get_publishable_keys` | Phase 3 recup anon key |
| `mcp__claude_ai_supabase__list_projects` | Phase 3 si link a existant |
| `mcp__playwright__browser_navigate` | Phase 6 test E2E |
| `mcp__playwright__browser_snapshot` | Phase 6 verification visuelle |

## Decisions clefs

### D1 — Stack par defaut : Astro 6

**Decision** : Astro est le defaut, Vite est l'alternative.

**Source** : benchmarks chiffres dans [02-comparatif-frameworks.md](../stack-landing-claude-code/02-comparatif-frameworks.md) — Astro envoie 96 % de moins de JS, LCP 2x plus rapide.

**Override** : utilisateur peut choisir Vite-React ou Vite-Vue en Q3 si raison metier (equipe React-only, beaucoup d'interactivite).

### D2 — Structure `front/` + `supabase/` racine

**Decision** : code landing dans `front/` (sous-projet npm autonome), backend dans `supabase/` (convention CLI).

**Source** : demande utilisateur explicite ("toutes les pages du la landing ou block seront stoqué dans un dossier front") + obligation CLI Supabase (`supabase functions deploy` cherche dans `supabase/functions/`).

**Compromis** : si l'utilisateur veut absolument `edges/`, on cree un symlink `edges → supabase/functions/`.

### D3 — Interview en 8 questions

**Decision** : 6-8 questions max, 1 a la fois, avec defaults intelligents.

**Source** : best practice prompting interactif — l'utilisateur abandonne au-dela de 10 questions ou avec des questions en batch.

**Trade-off** : moins de questions = moins d'options custom. Compense par les defaults qui couvrent 80 % des cas.

### D4 — Sonnet plutot qu'Opus

**Decision** : `model: sonnet`.

**Source** : le skill execute une suite d'actions techniques scriptees, sans raisonnement profond requis.

**Cout** : Sonnet est ~5x moins cher qu'Opus, et 2-3x plus rapide. Aligne avec l'objectif "10-12 min execution".

### D5 — `effort: high`

**Decision** : effort high.

**Source** : 23 taches, ~10 min execution + OAuth manuels. C'est lourd pour un skill, justifie de prevenir l'utilisateur.

### D6 — Templates separes par framework

**Decision** : 3 dossiers de templates separes (`astro/`, `vite-react/`, `vite-vue/`) plutot qu'un seul avec branches conditionnelles.

**Source** : maintenance plus simple, lisibilite, evite les conditions imbriquees dans les .tmpl.

**Cout** : duplication partielle (CLAUDE.md.tmpl est tres similaire entre les 3). Acceptable car les templates evolueront separement.

### D7 — Extension Netlify x Supabase reste manuelle (OAuth)

**Decision** : le skill ne tente PAS d'automatiser l'install de l'extension via API. Il guide l'utilisateur vers l'URL dashboard.

**Source** : l'extension Netlify x Supabase necessite OAuth user-level (cf. [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md)). Tenter de l'automatiser via API casserait souvent.

**Compromis** : 1 click OAuth utilisateur (~30 sec) reste acceptable.

### D8 — Pas d'integration tracking dans le skill

**Decision** : Q7 collecte le besoin tracking mais le skill ne fait qu'ajouter des placeholders.

**Source** : skills dedies existent (`connect-hubspot-form`, `landing-google-ads`, `landing-meta-ads`) et sont matures. Dupliquer = maintenance double.

**Flow utilisateur** : bootstrap d'abord, puis "appel" suggere `/connect-hubspot-form` ou autre en post.

## CDCs et docs lies (croisees)

- [docs/cdc-claude-code-audit/](../cdc-claude-code-audit/_index.md) — audit existant Claude Code
- [docs/cdc-landing-improvement/](../cdc-landing-improvement/_index.md) — CDC ameliorations landing
- [docs/cdc-landing-formation-nopillo/](../cdc-landing-formation-nopillo/_index.md) — CDC specifique Nopillo
- [docs/methodologie-documentation-first/](../methodologie-documentation-first/_index.md) — methodologie globale du projet
