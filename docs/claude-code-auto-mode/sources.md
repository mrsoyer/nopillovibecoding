# Sources consultees

Liste consolidee des 16 pages web utilisees pour cette documentation, consultees le 26 mai 2026.

## Documentation officielle Anthropic

- [Choose a permission mode](https://code.claude.com/docs/en/permission-modes) — Les 6 modes detailles, timeline auto-mode, protected paths
- [Configure permissions](https://code.claude.com/docs/en/permissions) — Syntax allow/deny/ask, wildcards Bash, patterns gitignore, managed settings
- [Claude Code settings](https://code.claude.com/docs/en/settings) — Schema complet de settings.json, locations, precedence
- [Automate workflows with hooks](https://code.claude.com/docs/en/hooks-guide) — Hooks PermissionRequest, PreToolUse, PostToolUse avec exemples
- [Development containers](https://code.claude.com/docs/en/devcontainer) — Devcontainer officiel avec firewall

## Posts Anthropic engineering

- [Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode) — Architecture classifier, metriques performance, threat model

## Bug reports et issues GitHub

- [Issue #36168 — Bypass broken since v2.1.78](https://github.com/anthropics/claude-code/issues/36168) — Bug confirmed, workaround downgrade v2.1.77
- [Issue #29026 — Desktop app ignores settings](https://github.com/anthropics/claude-code/issues/29026) — defaultMode bypassPermissions sans effet macOS
- [Issue #34923 — defaultMode bypassPermissions no effect](https://github.com/anthropics/claude-code/issues/34923) — Prompts apparaissent malgre config
- [Issue #11972 — WebFetch domain wildcard not working](https://github.com/anthropics/claude-code/issues/11972) — www subdomain pas matche
- [Issue #27139 — Broad wildcard permissions not respected](https://github.com/anthropics/claude-code/issues/27139) — Bash(*) ignore en Desktop
- [Issue #39057 — Permission mode resets mid-session](https://github.com/anthropics/claude-code/issues/39057) — Bypass -> Edit automatically en cours

## Analyses techniques tierces

- [Claude Code Just Broke Bypass Permissions — Roborhythms](https://www.roborhythms.com/claude-code-bypass-permissions-broken-2026/) — Analyse du changement intentionnel, 93% approval stat
- [Claude Code Yolo Mode security research — hartphoenix](https://gist.github.com/hartphoenix/698eb8ef8b08ad2ce6a99cf7346cd7cc) — Layered defense, honest limits
- [claude-safe-yolo design doc — vladolaru](https://gist.github.com/vladolaru/2154aa7c6d743d3c376c0418790ba4b9) — Sandbox + settings overlay
- [How Hooks Automate Permission Management — bswen](https://docs.bswen.com/blog/2026-03-21-claude-code-hooks-auto-permissions/) — Patterns hooks pour auto-approve

## Guides communaute

- [Claude Code Permissions Explained — Frontend Master](https://allahabadi.dev/blogs/ai/claude-code-permissions-settings-explained/) — Tous les wildcards detailles
- [Claude Code Permissions — Pete Freitag](https://www.petefreitag.com/blog/claude-code-permissions/) — Exemples pratiques
- [Safe vs Fast Development Modes — claudefa.st](https://claudefa.st/blog/guide/development/permission-management) — Comparaison modes
- [Bypass permissions default mode notes — daniel rosehill](https://github.com/danielrosehill/Claude-Code-Notes/blob/main/notes/bypass-permissions-default-mode.md) — Config user-level
- [Auto Mode replaced Permission-Skipping — Charles Jones](https://charlesjones.dev/blog/claude-code-auto-mode-vs-dangerously-skip-permissions) — Retour terrain
- [Auto Mode safer than dangerously-skip — Claude Code AI](https://claudecodeai.blog/claude-code-auto-mode/) — Vulgarisation
- [Stop Using --dangerously-skip-permissions — Medium](https://medium.com/@kumaran.isk/claude-code-stop-using-dangerously-skip-permissions-8e0e45c162ae)
- [Claude Code Autonomous Mode Guide — Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/141/claude-code-dangerously-skip-permissions-guide-autonomous-mode) — Guide /loop et /schedule
- [YOLO Mode Explained — CodeAgentSwarm](https://www.codeagentswarm.com/en/guides/claude-code-yolo-mode-explained)
- [Auto Mode on Max, Team, Enterprise — claudefa.st](https://claudefa.st/blog/guide/development/auto-mode) — Availability par plan
- [Configuration: Permissions, Models, YOLO Mode — developertoolkit](https://developertoolkit.ai/en/claude-code/quick-start/configuration/)
- [Claude Code Bypass Permissions: How to Enable It — Kanaries](https://docs.kanaries.net/topics/AICoding/claude-code-desktop-bypass-permissions)

## Devcontainer et sandbox

- [anthropics/claude-code/.devcontainer — GitHub](https://github.com/anthropics/claude-code/tree/main/.devcontainer) — Reference implementation
- [init-firewall.sh — GitHub](https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh) — Script firewall officiel
- [Claude Code Docker — DataCamp](https://www.datacamp.com/tutorial/claude-code-docker) — Tutoriel Docker
- [DevContainer Practical Guide — Claude Lab](https://claudelab.net/en/articles/claude-code/claude-code-devcontainer-secure-isolated-environment) — Setup detaille
- [Safe AI Agents in DevContainer — codewithandrea](https://codewithandrea.com/articles/run-ai-agents-inside-devcontainer/) — Best practices
- [con/yolo — GitHub](https://github.com/con/yolo) — Podman sandbox YOLO
- [Sandboxing AI Coding Agents — mfyz](https://mfyz.com/ai-coding-agent-sandbox-container/) — Firewall + restricted shell
- [How to Run Claude Code in YOLO Mode — amazingcto](https://www.amazingcto.com/dev-containers-sandbox-claude-code/)

## Hooks complementaires

- [Claude Code Hooks: 12 Lifecycle Events — claudefa.st](https://claudefa.st/blog/tools/hooks/hooks-guide) — Tous les events
- [Hooks PreToolUse, PostToolUse, Stop — pixelmojo](https://www.pixelmojo.io/blogs/claude-code-hooks-production-quality-ci-cd-patterns) — CI patterns
- [CLAUDE.md and Hooks Guide — Mustafa Morbel](https://medium.com/becoming-for-better/taming-claude-code-a-guide-to-claude-md-and-hooks-ed059879991c) — Hooks pratiques
- [Configure Claude Code Hooks — gend.co](https://www.gend.co/blog/configure-claude-code-hooks-automation)
- [Claude Code Hooks Complete Guide — Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/657/claude-code-hooks-complete-guide)
- [Intercept agent behavior — Anthropic agent-sdk docs](https://platform.claude.com/docs/en/agent-sdk/hooks)
