# Claude Code Rules — Documentation Reference

> Bonnes pratiques pour creer des rules dans Claude Code (CLAUDE.md, .claude/rules/, skills, subagents, hooks) — Reference pour le futur `/skill-maker`.

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble : 5 mecanismes de contexte + decision matrix |
| [02-claude-md.md](02-claude-md.md) | CLAUDE.md : hierarchie, taille, imports, structure |
| [03-rules-directory.md](03-rules-directory.md) | `.claude/rules/` : path-scoped, frontmatter, bugs connus |
| [04-skills-vs-rules.md](04-skills-vs-rules.md) | Quand utiliser skills vs rules vs subagents |
| [05-pattern-rules-landing.md](05-pattern-rules-landing.md) | Pattern concret pour landing : `rules/front/` + `rules/back/` |
| [06-anti-patterns.md](06-anti-patterns.md) | Anti-patterns et erreurs courantes |
| [07-templates-rules.md](07-templates-rules.md) | Templates concrets + exemples par type de fichier |
| [sources.md](sources.md) | Sources consolidees |

**Cible** : alimenter `/skill-maker` pour generer des rules par page/block (front) et par edge function (back) dans les projets landing scaffoldes par `/init-landing-stack`.

Sources : 13 pages web consultees le 2026-05-26 (docs officielles Claude Code + best-practices community).
