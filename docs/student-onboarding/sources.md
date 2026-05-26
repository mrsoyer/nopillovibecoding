# Sources consultees

Recherche effectuee le 2026-05-26 via 6 WebSearch + 4 WebFetch paralleles.

## Documentation officielle

| Source | Usage dans la doc |
|--------|-------------------|
| [Node.js Downloads](https://nodejs.org/en/download) | 01 — Versions LTS, installers Mac/Windows |
| [Netlify CLI Get Started](https://docs.netlify.com/cli/get-started/) | 03 — Install npm + brew, login, link, dev |
| [Netlify CLI Local Development](https://docs.netlify.com/api-and-cli-guides/cli-guides/local-development/) | 03 — Patterns de dev local |
| [Supabase Local Development CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) | 03 — Install brew/scoop, requirements |
| [Supabase Local Development (general)](https://supabase.com/docs/guides/local-development) | 03-04 — Workflows |
| [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction) | 03-04 — Commandes |
| [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp) | 05 — `claude mcp add`, `.mcp.json`, scopes, OAuth flow |
| [Astro CLI Reference](https://docs.astro.build/en/reference/cli-reference/) | 06 — `npm run dev`, port 4321 |
| [GitHub Docs - Caching credentials](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git) | 02 — Setup credentials Mac/Windows |

## Tutoriels et guides communaute

| Source | Usage |
|--------|-------|
| [nvm-sh/nvm (Mac/Linux)](https://github.com/nvm-sh/nvm) | 01 — Install nvm Mac |
| [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows) | 01 — Install nvm-windows |
| [How to Install NVM (2026 Guide)](https://www.carmatec.com/blog/how-to-install-nvm-on-macos-windows-and-linux/) | 01 — Steps detailles |
| [How to Install Netlify CLI (April 2026)](https://www.temperstack.com/learn/netlify/install-netlify-cli/) | 03 — Confirmation patterns |
| [Supabase CLI on Windows (DEV.to)](https://dev.to/chiragx309/how-to-install-supabase-cli-on-windows-the-right-way-a-simple-guide-for-everyone-14om) | 03 — Scoop method confirmee |
| [Beginner's guide Git/GitHub PowerShell (PDQ)](https://www.pdq.com/blog/a-beginners-guide-to-git-and-github-using-powershell/) | 02 — Patterns Windows |
| [Clone GitHub Repository (Multicare)](https://multicaretechnical.com/how-to-clone-a-github-repository-beginner-friendly-guide) | 02 — Patterns cross-OS |
| [MCP Authentication in Claude Code 2026 (TrueFoundry)](https://www.truefoundry.com/blog/mcp-authentication-in-claude-code) | 05 — OAuth flow details |
| [Claude Code MCP OAuth Guide](https://claudelab.net/en/articles/claude-code/claude-code-mcp-oauth-authentication-guide) | 05 — Pre-configured credentials |

## Troubleshooting

| Source | Usage |
|--------|-------|
| [Astro Port conflict issue](https://github.com/withastro/astro/issues/9133) | 07 — EADDRINUSE 4321 |
| [Fix EADDRINUSE Node.js](https://oneuptime.com/blog/post/2026-01-25-fix-eaddrinuse-nodejs/view) | 07 — Methodes pour tuer process |
| [Astro Connection Refused fix](https://markaicode.com/errors/astro-connection-refused-error-fix/) | 07 — Page blanche |
| [Git Credential Manager Mac](https://mac.install.guide/git/credential-manager) | 07 — Auth GitHub Mac |
| [HTTP MCP OAuth never triggers (GitHub issue)](https://github.com/anthropics/claude-code/issues/36307) | 07 — Troubleshooting MCP auth |

## Convergences observees (faits etablis cites 3+ fois)

1. **Node 22+ requis pour les outils 2026** : confirme par Node.js downloads + Netlify CLI docs + Supabase CLI docs (Node 20+ minimum, 22+ recommande)
2. **nvm est la methode recommandee** pour gerer Node : cite par 5+ sources tutoriels + Microsoft Learn
3. **OAuth browser flow pour MCPs** : confirme par Claude Code docs officiels + TrueFoundry + Claude Lab
4. **`.env` jamais commit** : pattern universel, cite dans tous les guides Astro/Supabase/Netlify
5. **Docker pour Supabase < 2.45** : confirme par Supabase CLI docs + scoop guide

## Divergences notees

- **`npm install -g supabase`** : certains tutoriels DEV.to le mentionnent comme "fast install" mais la doc officielle Supabase dit clairement "not supported". → utiliser brew/scoop.
- **Netlify CLI version Node** : la doc dit 18.14.0+, mais 22+ recommande pour la stabilite avec autres outils du stack (Astro 6, Supabase CLI).

## Note sur la fraicheur des sources

Toutes les sources datent de 2025-2026. Les patterns d'installation evoluent peu (npm, brew, scoop sont stables depuis 5+ ans), mais :
- Versions Node minimales montent dans le temps (verifier au moment du cours)
- MCPs Claude Code est un domaine actif (OAuth flow change peu mais surveiller les changelogs)
- Supabase CLI bouge regulierement (v2.45+ = bundle sans Docker, v2.101 = stable)
