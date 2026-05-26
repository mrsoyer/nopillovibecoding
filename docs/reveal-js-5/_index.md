# Reveal.js 5 — Documentation Reference

> Framework de presentations HTML/JS. Slides ecrites en `<section>`, transitions/fragments/themes/plugins integres, export PDF natif.

## Index des fichiers

| Fichier | Contenu |
|---------|---------|
| [01-overview.md](01-overview.md) | Vue d'ensemble, cas d'usage, philosophie |
| [02-installation.md](02-installation.md) | 3 modes d'installation (basic, full, npm) |
| [03-markup-slides.md](03-markup-slides.md) | Structure HTML, slides horizontales et verticales |
| [04-configuration.md](04-configuration.md) | Initialisation + 60 options de config |
| [05-fragments-transitions.md](05-fragments-transitions.md) | Fragments, transitions, Auto-Animate |
| [06-themes.md](06-themes.md) | 12 themes built-in + creation theme custom |
| [07-plugins.md](07-plugins.md) | Markdown, Highlight, Notes, Math, Zoom, Search |
| [08-speaker-pdf.md](08-speaker-pdf.md) | Speaker view + export PDF |
| [09-api-reference.md](09-api-reference.md) | API JavaScript complete |
| [10-changelog-v5.md](10-changelog-v5.md) | Releases 5.0.0 -> 5.2.1 |
| [11-anti-patterns.md](11-anti-patterns.md) | Erreurs frequentes a eviter |
| [sources.md](sources.md) | Toutes les sources web consultees |

## Demarrage rapide

```bash
# Option 1 : ZIP (zero dependance)
curl -L https://github.com/hakimel/reveal.js/archive/master.zip -o reveal.zip

# Option 2 : npm
npm install reveal.js

# Option 3 : CDN (utilise dans propalgarcia/)
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
```

## Convention de cette doc

- Code marque `[v5+]` = fonctionnalite ajoutee en v5
- Code sans marque = disponible v4 et v5
- Lignes < 300 par fichier, autonomes

Sources : 14 pages officielles + GitHub releases consultees le 2026-05-26
