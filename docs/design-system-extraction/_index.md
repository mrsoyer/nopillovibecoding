# Aspirer un Design System depuis un Site Web

> Documentation operationnelle pour Nopillo : methode, outils et workflow Claude Code pour reproduire des Design Systems premium dans Webflow.

---

## Contexte Nopillo

Nopillo concoit des sites Webflow premium pour des clients qui apportent souvent des references visuelles : Stripe, Linear, Vercel, Framer, Apple, Notion, des concurrents directs, des sites primes Awwwards. Le besoin n'est pas de copier ces sites mais de **distiller leur Design System** (DS) — couleurs, typographie, espacements, ombres, rayons, micro-interactions — pour le reinjecter dans une identite originale dans Webflow.

Cette documentation decrit la methode complete : du moment ou on recoit une URL de reference jusqu'au Design System operationnel dans Webflow Variables.

---

## Sommaire

| # | Fichier | Sujet |
|---|---------|-------|
| 1 | [01-overview.md](./01-overview.md) | Pourquoi aspirer un DS, cas d'usage Nopillo, ROI |
| 2 | [02-outils-extraction.md](./02-outils-extraction.md) | Stack outils : DevTools, CSS Stats, Project Wallace, Whatfont, Dembrandt, designlang |
| 3 | [03-tokens-extraction.md](./03-tokens-extraction.md) | Categories de tokens : couleurs, typo, spacing, shadows, radius |
| 4 | [04-workflow-claude-code.md](./04-workflow-claude-code.md) | Prompts Claude Code, screenshots, MCP Chrome |
| 5 | [05-import-webflow.md](./05-import-webflow.md) | Import dans Webflow Variables via app et MCP |
| 6 | [06-anti-patterns-legal.md](./06-anti-patterns-legal.md) | Risques juridiques, copyright, trademark, "look and feel" |
| 7 | [07-skill-extract-design-system.md](./07-skill-extract-design-system.md) | Specs du skill `/extract-design-system` pour Claude Code |
| - | [sources.md](./sources.md) | Sources et references externes |

---

## TL;DR : Pipeline en 5 Etapes

```
URL reference
    |
    v
[1] Audit visuel (DevTools + Whatfont + ColorZilla)
    |
    v
[2] Extraction automatisee (Dembrandt OU designlang OU extract-design-system)
    |    --> tokens.json (DTCG) + tokens.css
    |
    v
[3] Curation Claude Code (Opus, prompt structure)
    |    --> selection des tokens reellement utiles + renommage semantique
    |
    v
[4] Import Webflow (Variable Importer App OU Webflow MCP)
    |    --> Variables organisees par Collections
    |
    v
[5] Construction composants (Webflow MCP component_builder)
     --> Buttons, cards, sections appliquant les variables
```

---

## Regle d'Or Nopillo

> **Aspirer pour comprendre, pas pour reproduire.** On extrait des decisions de design (echelles, ratios, contrastes, hierarchies) — pas une identite. Le client doit avoir SON DS, pas une photocopie.

Voir [06-anti-patterns-legal.md](./06-anti-patterns-legal.md) pour les limites legales precises.

---

## Public Cible

- Designers Webflow Nopillo (junior et senior)
- Developpeurs Nopillo intervenant sur les builds Webflow
- Agents Claude Code utilises en interne (ce document est lu par les LLMs)

---

## Statut

- **Version** : 1.0
- **Date** : 2026-05-05
- **Maintainer** : equipe Nopillo
- **Stack** : Webflow + Claude Code + MCP Webflow + Chrome DevTools
