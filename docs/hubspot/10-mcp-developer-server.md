# HubSpot MCP — Developer Server (CLI local)

## Vue d'Ensemble

Le **Developer MCP Server** est un serveur MCP **local** qui tourne dans votre IDE et donne a votre assistant IA des outils specifiques au developpement sur la HubSpot Developer Platform : scaffolding d'apps, schemas, custom objects, modules CMS, deploy.

A ne pas confondre avec le Remote Server (qui sert a manipuler les donnees CRM).

## Prerequis

| Outil | Version |
|-------|---------|
| HubSpot CLI | >= 8.2.0 |
| Node.js | >= 18 |
| Client supporte | Claude Code, Codex CLI, Cursor, Gemini CLI, VS Code, Windsurf |

Installer/upgrader le CLI HubSpot :

```bash
npm install -g @hubspot/cli@latest
hs --version  # doit etre >= 8.2.0
```

## Setup : `hs mcp setup`

Une seule commande lance le wizard d'installation :

```bash
hs mcp setup
```

Le wizard pose 3 questions :

### 1. Selection des clients

Choisir avec les fleches + barre espace les clients dans lesquels installer le serveur :

```
? Select clients to install:
  [x] Claude Code
  [ ] Cursor
  [ ] VS Code
  [ ] Windsurf
  [ ] Codex CLI
  [ ] Gemini CLI
```

### 2. Mode standalone ou global

```
? How do you want to run the MCP server?
  > Use globally installed CLI (@hubspot/cli)
    Use standalone mode (npx @hubspot/cli)
```

**Standalone mode** est utile pour :
- Machines corporate qui interdisent les `npm install -g`
- Pinning d'une version specifique du CLI

```bash
# Standalone avec version pinned
hs mcp setup --standalone --version 8.2.0
```

### 3. Restart du client

Apres setup, **redemarrer le client** selectionne pour que la config MCP soit prise en compte.

## Verification de l'installation

| Client | Comment verifier |
|--------|-----------------|
| **Claude Code** | Taper `/mcp` dans le chat, voir `HubSpotDev` listed |
| **Cursor** | Settings → Cursor Settings → Tools & MCP → voir `HubSpotDev` |
| **VS Code** | Voir la liste des MCP servers dans la palette |
| **Windsurf** | Settings → MCP servers |

## Capacites du Developer Server

Le serveur fournit a l'IA des tools pour :

### Apps & Projects

- Scaffolder une nouvelle app HubSpot (Public ou Private)
- Lister/creer/supprimer des projets
- Deployer en sandbox
- Generer des manifests `app.json`

### CMS Development

- Scaffolder un module CMS (HubL templates)
- Generer des field groups
- Compiler/preview des modules
- Manipuler les fichiers du Design Manager

### Schemas & Custom Objects

- Generer un schema CRM custom object
- Definir des properties
- Generer des associations entre objets

### Workflows & Custom Code Actions

- Scaffolder une Custom Code Action
- Generer le boilerplate Operations Hub
- Pousser vers HubSpot

### Debug & Logs

- Lire les logs d'execution d'app
- Inspecter les requetes API faites par l'app
- Tester les serverless functions localement

## Note speciale VS Code

Avant de lancer `hs mcp setup`, installer le `code` command dans le PATH :

1. Ouvrir VS Code
2. Cmd+Shift+P (ou Ctrl+Shift+P)
3. Rechercher : "Shell command: Install 'code' command in PATH"
4. Confirmer
5. Relancer le terminal puis `hs mcp setup`

Sans ca, VS Code ne sera pas detectable par le wizard.

## Combinaison avec le Remote Server

Pattern courant pour les developpeurs :

```
┌─────────────────────────────────────────┐
│ IDE (Claude Code, Cursor, etc.)         │
│                                         │
│ ┌─────────────────┐  ┌────────────────┐ │
│ │ Developer MCP   │  │ Remote MCP     │ │
│ │ (local CLI)     │  │ (mcp.hubspot)  │ │
│ │                 │  │                │ │
│ │ - Scaffolding   │  │ - Test data    │ │
│ │ - Deploy        │  │ - Read/write   │ │
│ │ - Debug         │  │   CRM records  │ │
│ └─────────────────┘  └────────────────┘ │
└─────────────────────────────────────────┘
```

**Developer Server** pour coder l'app, **Remote Server** pour la tester sur des donnees reelles.

## Patterns Recommandes

- **Sandbox HubSpot dedie** : ne jamais developper directement contre la production. Creer un sandbox developer.
- **Standalone mode pour CI** : facilite la reproducibilite des builds.
- **Pinning de version** quand l'equipe doit etre alignee.
- **Verifier `/mcp` apres chaque update** du client : les configs MCP peuvent etre reset.
- **Ajouter `.hsmcp/` au .gitignore** : la config peut contenir des refs locales.

## Anti-Patterns

| Anti-Pattern | Probleme | Correction |
|-------------|----------|-----------|
| `npm install -g` sans permissions | Echec install corporate | Mode standalone |
| Setup contre la prod | Risque de casser donnees clients | Sandbox HubSpot |
| Pas de restart apres setup | Config MCP non chargee | Toujours restart le client |
| Utiliser les deux serveurs comme un seul | Confusion sur le tool a utiliser | Documenter : "deploy = Dev, lire deals = Remote" |
| Oublier le `code` command | VS Code introuvable | Installer via palette avant setup |

## Troubleshooting

| Probleme | Cause | Solution |
|----------|-------|----------|
| `hs mcp setup` introuvable | CLI < 8.2.0 | `npm install -g @hubspot/cli@latest` |
| Serveur non liste apres setup | Pas de restart du client | Quitter et relancer le client |
| `code` command not found (VS Code) | PATH pas configure | Cmd+Shift+P → "Install 'code' in PATH" |
| Permissions denied npm install | Machine restreinte | Mode standalone |
| Tools manquants apres update | Cache client | Vider cache MCP du client |

## Sources

- [Set up the developer MCP server (officiel)](https://developers.hubspot.com/docs/developer-tooling/local-development/mcp-server) — guide officiel complet
- [HubSpot MCP Server (officiel)](https://developers.hubspot.com/mcp) — overview des deux serveurs
- [HubSpot - Complete Cursor MCP Server Guide](https://cursormcp.dev/mcp-servers/595-hubspot) — setup specifique Cursor
- [How to connect your agents to a HubSpot MCP via Claude Code (Merge)](https://www.merge.dev/blog/hubspot-mcp-claude-code) — workflow Claude Code
