# Sources

Toutes les references utilisees pour construire le cours formation vibecoding J1.

## Docs internes au projet `webflowlanding`

### Pedagogie & format

| Fichier | Apport |
|---|---|
| [docs/pedagogie-formation/_index.md](../pedagogie-formation/_index.md) | Vue d'ensemble pedagogie atelier |
| [docs/pedagogie-formation/02-format-1-jour.md](../pedagogie-formation/02-format-1-jour.md) | Structure 1j, pre-work, courbe d'energie, pieges |
| [docs/pedagogie-formation/05-techniques-animation.md](../pedagogie-formation/05-techniques-animation.md) | Pair programming, demo+reproduce, code review collective |
| [docs/pedagogie-formation/06-evaluation.md](../pedagogie-formation/06-evaluation.md) | Skill check avant/apres |
| [docs/pedagogie-formation/07-materiel-pedagogique.md](../pedagogie-formation/07-materiel-pedagogique.md) | Materiel a fournir / imprimer |

### Programme formation existant

| Fichier | Apport |
|---|---|
| [docs/formation-nopillo/04-format-1-jour.md](../formation-nopillo/04-format-1-jour.md) | Programme initial 9h-17h30 (avant ce remaniement) |
| [docs/formation-nopillo/03-methodologie-formateur.md](../formation-nopillo/03-methodologie-formateur.md) | Pipeline doc-maker → cdc-maker → skill-maker |
| [docs/formation-nopillo/07-comparatif-recommandations.md](../formation-nopillo/07-comparatif-recommandations.md) | Comparatif 1j / 2j / 3j |

### Theorie Claude Code

| Fichier | Apport |
|---|---|
| [docs/claude-code-rules/_index.md](../claude-code-rules/_index.md) | Vue d'ensemble theorie |
| [docs/claude-code-rules/02-claude-md.md](../claude-code-rules/02-claude-md.md) | Best practices CLAUDE.md (< 80 lignes) |
| [docs/claude-code-rules/03-rules-directory.md](../claude-code-rules/03-rules-directory.md) | Structure .claude/rules/ |
| [docs/claude-code-rules/04-skills-vs-rules.md](../claude-code-rules/04-skills-vs-rules.md) | Decision tree skill/rule/MCP/hook (source principale theorie) |
| [docs/claude-code-rules/05-pattern-rules-landing.md](../claude-code-rules/05-pattern-rules-landing.md) | Patterns rules pour landing |
| [docs/claude-code-rules/06-anti-patterns.md](../claude-code-rules/06-anti-patterns.md) | Anti-patterns frequents |
| [docs/claude-code-rules/07-templates-rules.md](../claude-code-rules/07-templates-rules.md) | Templates de rules a reutiliser |

### Stack technique

| Fichier | Apport |
|---|---|
| [docs/stack-landing-claude-code/04-setup-astro-netlify.md](../stack-landing-claude-code/04-setup-astro-netlify.md) | Setup Astro + Netlify |
| [docs/stack-landing-claude-code/05-supabase-integration.md](../stack-landing-claude-code/05-supabase-integration.md) | Integration Supabase |
| [docs/stack-landing-claude-code/06-claude-code-workflow.md](../stack-landing-claude-code/06-claude-code-workflow.md) | Workflow Claude Code |
| [docs/stack-landing-claude-code/07-conversion-checklist.md](../stack-landing-claude-code/07-conversion-checklist.md) | Checklist conversion |

### Landing best practices (pour les exercices matin)

| Fichier | Apport |
|---|---|
| [docs/landing-page-best-practices/02-structure-sections.md](../landing-page-best-practices/02-structure-sections.md) | Structure 8 sections type |
| [docs/landing-page-best-practices/03-hero-above-the-fold.md](../landing-page-best-practices/03-hero-above-the-fold.md) | Hero — exercice 1 |
| [docs/landing-page-best-practices/05-social-proof-trust.md](../landing-page-best-practices/05-social-proof-trust.md) | Social proof — exercice 2 |
| [docs/landing-page-best-practices/06-anti-patterns.md](../landing-page-best-practices/06-anti-patterns.md) | Mobile-first — exercice 3 |

### Google Ads & Performance

| Fichier | Apport |
|---|---|
| [docs/google-ads/03-landing-page-quality-score.md](../google-ads/03-landing-page-quality-score.md) | LCP — exercice 5 |
| [docs/google-ads/07-conversion-tracking.md](../google-ads/07-conversion-tracking.md) | Tracking conversion |

### Skills existants (exemples pour le livrable PM)

| Skill | Apport |
|---|---|
| [.claude/skills/init-landing-stack/SKILL.md](../../.claude/skills/init-landing-stack/SKILL.md) | Skill avance (bootstrap 10-12 min) |
| [.claude/skills/apply-nopillo-ds/SKILL.md](../../.claude/skills/apply-nopillo-ds/SKILL.md) | Skill de transformation (DS) |
| [.claude/skills/context-guardian/SKILL.md](../../.claude/skills/context-guardian/SKILL.md) | Skill audit |
| [.claude/skills/rule-maker/SKILL.md](../../.claude/skills/rule-maker/SKILL.md) | Skill generation rules |
| [.claude/skills/connect-hubspot-form/SKILL.md](../../.claude/skills/connect-hubspot-form/SKILL.md) | Skill integration |
| [.claude/skills/extract-design-system/SKILL.md](../../.claude/skills/extract-design-system/SKILL.md) | Skill extraction |

### CDC references

| Fichier | Apport |
|---|---|
| [docs/cdc-landing-improvement/_index.md](../cdc-landing-improvement/_index.md) | Etude de cas We Invest 4.1/10 (a evoquer en demo) |
| [docs/cdc-skill-init-landing/_index.md](../cdc-skill-init-landing/_index.md) | CDC d'un skill complet (exemple pour PM) |
| [docs/cdc-nopillo-landing-exemple/_index.md](../cdc-nopillo-landing-exemple/_index.md) | CDC du repo template |

### Methodologie

| Fichier | Apport |
|---|---|
| [docs/methodologie-documentation-first/02-pipeline-doc-cdc-skill.md](../methodologie-documentation-first/02-pipeline-doc-cdc-skill.md) | Pipeline doc → cdc → skill (theorie demo) |
| [docs/methodologie-documentation-first/05-pattern-skills-recurrents.md](../methodologie-documentation-first/05-pattern-skills-recurrents.md) | Pattern skills recurrents |

## Repo template a cloner

[nopillo-landing-exemple/](../../nopillo-landing-exemple/) — Le repo que les participants vont cloner. Contient :
- `front/` (Astro 6 + Tailwind 4 + React islands)
- `supabase/` (migration leads + Edge Function contact-form)
- `.claude/skills/context-guardian/`
- `.claude/rules/{frontend,backend,claude-md}.md`
- `CLAUDE.md` < 80 lignes

## Sources externes (documentation officielle)

| URL | Apport |
|---|---|
| [code.claude.com/docs/en/sub-agents](https://code.claude.com/docs/en/sub-agents) | Format officiel des subagents |
| [platform.claude.com/docs/en/agents-and-tools/agent-skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills) | Skills authoring best practices |
| [code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices) | Best practices Claude Code |
| [docs.astro.build/en/guides/images/](https://docs.astro.build/en/guides/images/) | Astro Image (exercice 5) |
| [supabase.com/docs](https://supabase.com/docs) | Supabase docs |
| [netlify.com/docs](https://netlify.com/docs) | Netlify docs |

## Sources externes pedagogie

| URL | Apport |
|---|---|
| [Conducting a Workshop — Community Tool Box](https://ctb.ku.edu/en/table-of-contents/structure/training-and-technical-assistance/workshops/main) | Pedagogie workshop |
| [Workshop Length & Structure — Symonds Research](https://symondsresearch.com/workshop-structure-plan-length/) | Structure workshop |
| [How long should a workshop be — Workshop Butler](https://workshopbutler.com/blog/how-long-should-a-workshop-be/) | Format 1 jour |
