# Sources Consolidees

Documentation generee le 2026-05-26 a partir de 13 sources web (docs officielles Claude Code + best-practices community).

## Documentation officielle (Anthropic)

| Source | Contenu utilise |
|--------|-----------------|
| [How Claude remembers your project](https://code.claude.com/docs/en/memory) | Specs CLAUDE.md + `.claude/rules/` + auto memory, hierarchie, imports |
| [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | Patterns CLAUDE.md, anti-patterns, structure recommandee |
| [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | SKILL.md frontmatter, progressive disclosure, naming conventions |
| [Create custom subagents](https://code.claude.com/docs/en/sub-agents) | Subagents YAML, isolation contexte, modeles |
| [Extend Claude with skills](https://code.claude.com/docs/en/skills) | Skills Claude Code, allowed-tools, model/effort |
| [Skill creator (anthropic/skills)](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) | Description "pushy", iteration A/B Claude |

## Issues GitHub (bugs connus)

| Source | Sujet |
|--------|-------|
| [Issue #16299](https://github.com/anthropics/claude-code/issues/16299) | Path-scoped rules charges globalement |
| [Issue #16853](https://github.com/anthropics/claude-code/issues/16853) | Path-scoped rules non charges sur fichier matchant |
| [Issue #22170](https://github.com/anthropics/claude-code/issues/22170) | `paths:` dans `~/.claude/rules/` ignore |
| [Issue #23478](https://github.com/anthropics/claude-code/issues/23478) | Rules chargees sur Read mais pas Write |
| [Issue #23569](https://github.com/anthropics/claude-code/issues/23569) | Rules ignorees via git worktree |

## Guides community

| Source | Contenu utilise |
|--------|-----------------|
| [Claude Code Rules Directory: Modular Instructions That Scale](https://claudefa.st/blog/guide/mechanics/rules-directory) | Patterns d'organisation rules, exemples concrets |
| [Context Engineering with Claude Code](https://claudefa.st/blog/guide/mechanics/context-engineering) | 6 pillars framework, failure modes |
| [How Claude Code rules actually work](https://joseparreogarcia.substack.com/p/how-claude-code-rules-actually-work) | Comportement reel rules, verification |
| [The Complete Guide to CLAUDE.md](https://medium.com/@n913239/the-complete-guide-to-claude-md-make-claude-code-truly-understand-your-project-d9d026b808f1) | Templates concrets CLAUDE.md, hierarchie 3 couches |
| [My CLAUDE.md Was Eating 42,000 Tokens](https://medium.com/@cem.karaca/my-claude-md-was-eating-42-000-tokens-per-conversation-heres-how-i-fixed-it-85ffba809bd4) | Token budget reel, refactoring skills-based |
| [Your CLAUDE.md is eating your token budget](https://medium.com/@kjramsy/your-claude-md-is-eating-your-token-budget-heres-how-to-fix-it-b8d6c4d1c986) | Anti-patterns CLAUDE.md, 200-line rule |
| [SKILL.md Spec: Every Field and Frontmatter Key](https://www.agensi.io/learn/skill-md-format-reference) | Reference complete frontmatter SKILL.md |
| [Claude Code Skills, Subagents, Hooks and Plugins](https://medium.com/@mishra.shashank35/claude-code-skills-subagents-hooks-and-plugins-a-practical-overview-572de7cedb20) | Comparatif et decision tree |
| [A Mental Model for Claude Code](https://levelup.gitconnected.com/a-mental-model-for-claude-code-skills-subagents-and-plugins-3dea9924bf05) | Modele mental skills/agents/plugins |

## Recherches effectuees

8 recherches WebSearch en parallele :
1. `Claude Code CLAUDE.md best practices 2026 site:docs.claude.com`
2. `Claude Code subagents skills hooks plugins documentation 2026`
3. `Claude Code memory file CLAUDE.md size limit token budget best practices`
4. `Claude Code path-scoped rules conditional context loading frontmatter`
5. `Claude Code project context per-feature documentation rules structure`
6. `Claude Code skills SKILL.md frontmatter format examples 2026`
7. `anthropic Claude Code import @file syntax CLAUDE.md context engineering`
8. `Claude Code anti-patterns mistakes context engineering common errors`

12 WebFetch en parallele sur les meilleures sources retenues.

## Methodologie

1. **Cadrage** : scope clarifie via question utilisateur (tous types de rules Claude Code, focus landing)
2. **Analyse contexte** : lecture du skill `init-landing-stack` + templates `claude-rules`
3. **Recherche** : 8 WebSearch paralleles couvrant doc officielle + community + bugs
4. **Extraction** : 12 WebFetch paralleles avec prompts adaptes (doc officielle vs blog vs anti-patterns)
5. **Synthese** : cross-references entre sources, convergence = fait etabli, divergence = noter les deux
6. **Generation** : 6 fichiers structures + index + sources

## Convergences fortes (faits etablis)

- **CLAUDE.md target < 200 lignes** (Anthropic + multiple guides)
- **Description SKILL.md = trigger fuzzy match** (Anthropic + skill-creator)
- **`.claude/rules/` paths frontmatter** existe mais a des bugs (5 issues ouverts)
- **Skills body < 500 lignes** (Anthropic officiel)
- **Progressive disclosure** : metadata pre-loaded, body on-demand, references conditional
- **CLAUDE.md hierarchie** : managed > user > project > local

## Divergences notees

- **Taille optimale CLAUDE.md** : Anthropic dit < 200, ce projet impose < 80 (context-guardian)
- **Path-scoped rules fiabilite** : doc officielle implique fiable, issues GitHub montrent flakiness
- **Rules vs Skills** : doc officielle separe clairement, certains guides confondent
