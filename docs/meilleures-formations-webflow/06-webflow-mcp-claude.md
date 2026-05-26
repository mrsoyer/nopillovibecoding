# Webflow MCP + Claude — Automatisation par IA

> Lancé le **9 février 2026**, le serveur MCP Webflow connecte Claude directement à un site Webflow via Designer API et Data API. Permet de manipuler CMS, structure et style en langage naturel depuis Claude Desktop, Claude Code, Cursor ou Windsurf.

## Sommaire

- [Qu'est-ce que le MCP Webflow](#quest-ce-que-le-mcp-webflow)
- [Installation par client AI](#installation-par-client-ai)
- [Capacités disponibles](#capacités-disponibles)
- [5 use cases de production](#5-use-cases-de-production)
- [Limitations et bonnes pratiques](#limitations-et-bonnes-pratiques)
- [Configuration multi-sites avec Claude Code](#configuration-multi-sites-avec-claude-code)

## Qu'est-ce que le MCP Webflow

**MCP** (Model Context Protocol) est le standard ouvert d'Anthropic pour connecter des AI agents à des sources de données et systèmes externes.

Le **serveur Webflow MCP** implémente ce protocole pour exposer :

| API | Capacités |
|-----|-----------|
| **Designer API** | Modifier layouts, styles, structure des éléments, créer/éditer composants |
| **Data API** | Opérations CMS bulk, métadonnées SEO, sites, collections, pages |

**Repo officiel** : [github.com/webflow/mcp-server](https://github.com/webflow/mcp-server) (129 stars)
**URL serveur** : `https://mcp.webflow.com/mcp`

### Sans le MCP vs Avec le MCP

| Sans MCP | Avec MCP |
|----------|----------|
| Écrire les API calls manuellement | Décrire en langage naturel |
| Gérer l'auth OAuth en code | OAuth automatique, transparent |
| Parser les réponses JSON | Claude lit/écrit directement |
| Tester les requêtes en isolation | Tout dans le flow conversationnel |

## Installation par client AI

**Prérequis** : Node.js 22.3.0+ (pour `mcp-remote` en installations manuelles).

Setup ~5 minutes total.

### Claude Desktop (manuel)

Éditer le fichier de config Claude Desktop :

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.webflow.com/mcp"]
    }
  }
}
```

Redémarrer Claude Desktop, puis :
1. Le navigateur s'ouvre automatiquement pour OAuth Webflow
2. Choisir les sites/Workspaces à autoriser
3. Lancer la **Webflow MCP Bridge App** dans le Designer (touche `E`)
4. Commencer à prompter

### Claude Code (CLI)

Installation en une commande :

```bash
claude mcp add --transport http webflow https://mcp.webflow.com/mcp
```

Puis :

```bash
/mcp list   # liste les MCP installés
# Suivre le flow OAuth qui s'ouvre
```

**Avantage Claude Code** : flag `-s project` pour configuration **par dossier**, donc auth isolée par site Webflow.

### Cursor (manuel)

```json
{
  "mcpServers": {
    "webflow": {
      "url": "https://mcp.webflow.com/mcp"
    }
  }
}
```

Plugin officiel disponible aussi via le marketplace Cursor.

### Windsurf

Disponible via le **MCP marketplace** Windsurf intégré, en 1 clic.

### Configuration locale (avancée)

Si vous voulez gérer l'auth via un token API plutôt qu'OAuth :

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@latest"],
      "env": {
        "WEBFLOW_TOKEN": "<YOUR_WEBFLOW_TOKEN>"
      }
    }
  }
}
```

Token générable depuis l'**API Playground** Webflow.

**Reset du token** : `rm -rf ~/.mcp-auth`

### Webflow MCP Bridge App
Application installée automatiquement lors de l'OAuth, fournit l'intégration niveau Designer. **Pas disponible sur le marketplace public Webflow** — c'est l'agent qui la pousse via OAuth.

## Capacités disponibles

### Côté Designer API
- Créer de nouveaux éléments
- Mettre à jour les styles existants
- Modifier la hiérarchie des pages
- Créer des sections responsive (hero, features, etc.)
- Gérer les composants

### Côté Data API
- Lister les collections et leurs structures de champs
- Audits de sites (broken links, alt text manquants, meta descriptions incomplètes)
- Bulk CMS operations
- Gestion SEO (meta titles, descriptions, slugs)
- Migration de contenu

### Exemples de prompts qui fonctionnent

```
"List all my collections and show me their field structures"

"Create a responsive hero section with a headline, description, 
and CTA button"

"Audit my site for broken links, missing alt text, 
and incomplete meta descriptions"

"Generate 10 blog posts about no-code, formatted like my 
existing 'Webflow vs Squarespace' article"

"Find all CSS classes that are duplicates and propose a 
naming standardization"
```

## 5 use cases de production

D'après l'analyse [Noqode — Claude Webflow MCP Automatisation](https://www.noqode.fr/en/blog/claude-webflow-mcp-automatisation) :

### 1. Génération de contenu à l'échelle
**Avant** : 4-6 heures pour rédiger et publier un article CMS.
**Après** : Claude analyse la structure d'articles existants, génère un nouveau contenu cohérent, le pousse en CMS dans la même session.

**Exemple réel** : article « Webflow vs Squarespace » complet et publié en CMS en **une seule session**.

### 2. Bulk SEO Auditing
Identifier et corriger en masse :
- Meta titles > 60 caractères
- Keywords manquants dans les slugs
- Descriptions génériques/dupliquées

**Gain mesuré** : 4-6h de travail manuel par audit, ramené à **moins d'1 heure** avec validation humaine.

### 3. Génération de pages localisées
**Cas concret** : créer des pages par ville (Paris, Lyon, Marseille, etc.) à partir d'un template pillar.

| Avant | Après |
|-------|-------|
| 30-60 min par page | ~5 min par page |
| Risque de doublons content | Adaptation contextuelle automatique |

Couplé au **CMS Webflow**, devient un générateur de landings programmatiques.

### 4. Migration de contenu
- Conversion shortcodes WordPress → format Webflow
- Reformatage des tags
- Génération de listes de **redirections 301** automatiques

Pour des migrations vers Webflow, fait gagner des semaines.

### 5. Audit de design system
- Scan de toutes les CSS classes et variables
- Détection de doublons, naming incohérents, valeurs hardcodées
- Génération d'un rapport **avant** correction

Permet de standardiser un site en gros chantier de refonte.

## Limitations et bonnes pratiques

### Limitations connues

| Limite | Impact |
|--------|--------|
| **Pas d'upload d'images** | Les assets doivent être ajoutés manuellement à la media library |
| **Static pages — locale par défaut non éditable** | Updates du locale principal renverront une erreur ; seuls les locales secondaires sont éditables |
| **Déconnexions de session** | Sur opérations longues, faut parfois reprendre |
| **Rate limiting** | Sites avec 500+ items CMS subissent des throttles |
| **Beta status** | Fonctionnalités peuvent évoluer avec breaking changes |

### Workflow d'approbation — CRITIQUE

Choix entre :
- **Mode automatique** : Claude exécute directement
- **Mode approbation manuelle** : Claude propose, vous validez avant exécution

**Recommandation** : **toujours en mode manuel pour la production**. Claude peut commettre des erreurs factuelles ou de ton qui passent inaperçues sans review.

### Bonnes pratiques

```
✅ DO
- Utiliser l'approbation manuelle en prod
- Faire des dry-runs sur staging d'abord
- Versionner via Webflow Backups avant gros changements
- Reviewer le ton/factualité avant publication
- Limiter les rate limits par batches de < 100 items

❌ DON'T
- Lancer un bulk update direct sur prod sans backup
- Faire confiance aveuglément aux contenus générés
- Mélanger plusieurs sites dans une même session
- Exécuter des migrations larges sans plan de rollback
```

## Configuration multi-sites avec Claude Code

Claude Code permet une configuration **par dossier projet** via le flag `-s project`. Très utile pour gérer plusieurs sites Webflow avec des credentials séparés :

```bash
# Site client A
cd ~/projects/client-a
claude mcp add --transport http -s project webflow-client-a https://mcp.webflow.com/mcp

# Site client B  
cd ~/projects/client-b
claude mcp add --transport http -s project webflow-client-b https://mcp.webflow.com/mcp
```

Chaque dossier garde son contexte d'auth. Pas de confusion entre sites.

## Coût et accès

- **Connecteur Webflow** : disponible **directement dans Claude** (Connectors menu)
- **Activation** : ~3 minutes
- **Subscription Claude requise** : Pro 20 USD/mois minimum (selon Noqode)
- **Côté Webflow** : compte standard suffit, pas de plan spécial

## Roadmap et évolutions

Selon le changelog officiel Webflow ([2026-01-13](https://developers.webflow.com/home/changelog/2026/1/13)) :

- ✅ **Claude Code support** complètement documenté
- ✅ **Webflow Skills documentation** disponible
- ✅ **OAuth via /mcp list** dans Claude Code
- 🚧 Beta features supplémentaires « soon »

## Quand utiliser le MCP plutôt qu'autre chose

| Situation | Outil recommandé |
|-----------|------------------|
| Petite landing à éditer ponctuellement | Designer Webflow direct |
| 50+ articles CMS à créer | **MCP + Claude** |
| Refonte design system complète | **MCP + Claude** + review humaine |
| Site critique en prod | MCP en mode manuel + backups |
| Test/staging environment | MCP en mode auto, freedom |
| Migration WordPress → Webflow | **MCP + Claude** + scripts custom |

## Sources

- [Webflow MCP — Getting started](https://developers.webflow.com/mcp/reference/getting-started) — doc officielle
- [Webflow MCP server — Overview](https://developers.webflow.com/mcp/reference/overview) — capabilities
- [GitHub webflow/mcp-server](https://github.com/webflow/mcp-server) — repo source
- [Webflow Updates — Use the Webflow connector in Claude](https://webflow.com/updates/use-the-webflow-connector-in-claude) — annonce 9 février 2026
- [Noqode — Claude × Webflow MCP automatisation](https://www.noqode.fr/en/blog/claude-webflow-mcp-automatisation) — 5 use cases prod
- [Webflow Integrations — Anthropic Claude](https://webflow.com/integrations/anthropic-claude) — page intégration
- [Composio — Webflow Claude Code](https://composio.dev/toolkits/webflow/framework/claude-code) — setup détaillé
- [Webflow Changelog 2026-01-13](https://developers.webflow.com/home/changelog/2026/1/13) — Claude Code support
