# Screenshots — non disponibles

Le MCP Playwright (`mcp__playwright__browser_*`) n'etait **pas accessible** dans la session d'audit du 2026-05-05.

Aucun screenshot binaire n'a pu etre genere. L'audit a ete realise via :
- `WebFetch` (analyse DOM rendu)
- `curl` (HTML brut + CSS publiee)
- Cross-check avec le DS deja extrait dans `/Users/thomas/webflowlanding/docs/design-system-extraction/nopillo-extracted/assets/` qui contient les screenshots Playwright pris precedemment

Pour regenerer les screenshots :
1. Activer le MCP Playwright dans la config Claude Code
2. Re-executer le workflow demande dans le prompt initial
3. Sauvegarder `nopillo-desktop.png`, `landing-desktop.png`, `nopillo-mobile.png`, `landing-mobile.png` dans ce dossier
