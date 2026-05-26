# Reveal.js 5 — Vue d'Ensemble

## Qu'est-ce que c'est

Reveal.js est un framework de presentations HTML qui transforme un document HTML en slideshow interactif. Chaque slide est une balise `<section>`. Le moteur JS gere la navigation, les transitions, les fragments, le scaling responsive et l'export PDF.

Auteur : Hakim El Hattab ([hakimel/reveal.js](https://github.com/hakimel/reveal.js)).
Stack : HTML + CSS + JavaScript vanilla (zero dependance runtime).
Licence : MIT.

## Quand l'utiliser

| Cas d'usage | Pourquoi Reveal.js |
|-------------|-------------------|
| Pitch deck commercial | Slides versionnables (Git), partage par URL |
| Conference technique | Code highlighte, animations CSS, export PDF |
| Cours/formation en ligne | Markdown + math + fragments incrementaux |
| Slides generes par IA/script | HTML programmable, theming par CSS variables |
| Presentation dans une SPA | Mode `embedded`, multiple decks par page |

## Quand ne pas l'utiliser

- Presentation collaborative temps reel : utiliser Slides/PowerPoint
- Slides riches en transitions 3D complexes : Keynote/After Effects mieux outilles
- Audience non-tech qui modifie les slides : pas de WYSIWYG

## Architecture (v5)

```
reveal.js/
  dist/
    reveal.js          # UMD bundle
    reveal.mjs         # ES module bundle
    reveal.css         # CSS de base (layout, animations)
    theme/
      black.css        # 12 themes built-in
      white.css
      ...
    plugin/
      markdown.js      # 6 plugins built-in
      highlight.js
      notes.js
      math.js
      zoom.js
      search.js
```

Chaque plugin a aussi sa version `.mjs` pour ES modules.

## Philosophie

1. **HTML d'abord** : une slide = un `<section>`. Pas de DSL custom.
2. **CSS pour le style** : themes via CSS variables `--r-*`, override standard.
3. **JS pour l'orchestration** : `Reveal.initialize()` est le point d'entree unique.
4. **Pas de build obligatoire** : un fichier HTML + 2 CDN suffit (cf [propalgarcia/index.html](/Users/thomas/webflowlanding/propalgarcia/index.html)).

## Nouveautes majeures v5 (vs v4)

| Feature | Version | Description |
|---------|---------|-------------|
| Scroll View | 5.0.0 | Vue scrollable au lieu de pagination, auto < 435px |
| Lightbox | 5.2.0 | `data-preview-image` / `data-preview-video` |
| Speaker-only controls | 5.2.0 | `controls: 'speaker-only'` |
| Search API etendue | 5.2.0 | `closeSearch`, `toggleSearch` |
| Fullscreen trigger | 5.1.0 | Classe `.enter-fullscreen` sur tout element |
| Video backgrounds continus | 5.1.0 | Lecture seamless entre slides |
| iOS viewport fix | 5.2.0 | `100dvh` au lieu de `100vh` |

Detail complet : [10-changelog-v5.md](10-changelog-v5.md).

## Exemple minimal

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="dist/reveal.css">
    <link rel="stylesheet" href="dist/theme/black.css">
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
      </div>
    </div>
    <script src="dist/reveal.js"></script>
    <script>Reveal.initialize();</script>
  </body>
</html>
```

## Sources

- [revealjs.com — Accueil](https://revealjs.com/) — vision d'ensemble du framework
- [GitHub hakimel/reveal.js](https://github.com/hakimel/reveal.js) — repo officiel
- [Releases page](https://github.com/hakimel/reveal.js/releases) — changelog v5.x
