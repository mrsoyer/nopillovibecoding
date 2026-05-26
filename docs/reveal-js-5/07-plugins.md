# Reveal.js 5 — Plugins

## 6 plugins built-in

| Plugin | Objet | Path UMD | Path ESM |
|--------|-------|----------|----------|
| **Markdown** | Slides en markdown | `dist/plugin/markdown.js` | `dist/plugin/markdown.mjs` |
| **Highlight** | Coloration code | `dist/plugin/highlight.js` | `dist/plugin/highlight.mjs` |
| **Notes** | Speaker view | `dist/plugin/notes.js` | `dist/plugin/notes.mjs` |
| **Math** | Equations LaTeX | `dist/plugin/math.js` | `dist/plugin/math.mjs` |
| **Zoom** | Zoom Alt+click | `dist/plugin/zoom.js` | `dist/plugin/zoom.mjs` |
| **Search** | Recherche Ctrl+Shift+F | `dist/plugin/search.js` | `dist/plugin/search.mjs` |

## Enregistrement des plugins

### UMD (script tags)

```html
<script src="dist/reveal.js"></script>
<script src="dist/plugin/markdown.js"></script>
<script src="dist/plugin/highlight.js"></script>
<script src="dist/plugin/notes.js"></script>
<script>
  Reveal.initialize({
    plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
  });
</script>
```

### ES modules

```javascript
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';
import Highlight from 'reveal.js/plugin/highlight';
import Notes from 'reveal.js/plugin/notes';

Reveal.initialize({
  plugins: [Markdown, Highlight, Notes]
});
```

### API de gestion

```javascript
Reveal.hasPlugin('markdown');        // boolean
Reveal.getPlugin('markdown');        // instance
Reveal.getPlugins();                 // tous
```

## Plugin Markdown

### Markdown inline

```html
<section data-markdown>
  <textarea data-template>
    ## Titre
    - Item 1
    - Item 2

    Note: notes speaker ici.
  </textarea>
</section>
```

### Fichier externe

```html
<section data-markdown="slides.md"
         data-separator="^\n---\n$"
         data-separator-vertical="^\n--\n$"
         data-separator-notes="^Note:">
</section>
```

Le `data-separator` separe les slides horizontales, `data-separator-vertical` les sous-slides, `data-separator-notes` les notes.

### Options markdown

```html
<section data-markdown data-charset="utf-8"
         data-element-attributes="<!-- \.element: (.*) -->"
         data-attributes="<!-- \.slide: (.*) -->">
</section>
```

### Element attributes inline

```markdown
- Item 1 <!-- .element: class="fragment" -->
- Item 2 <!-- .element: class="fragment fade-up" -->
```

Permet d'ajouter classes/attributs depuis du markdown.

> **v5.0.2** : le plugin Markdown peut maintenant tourner sans instance Reveal (utile pour scripts de pre-rendering).

## Plugin Highlight

Coloration syntaxique via highlight.js.

```html
<section>
  <pre><code data-trim data-noescape class="language-javascript">
    function hello() {
      return "world";
    }
  </code></pre>
</section>
```

### Options par bloc

| Attribut | Effet |
|----------|-------|
| `data-trim` | Supprime indentation/whitespace |
| `data-noescape` | Pas d'escape HTML |
| `data-line-numbers` | Affiche numeros de ligne |
| `data-line-numbers="3,7-10"` | Highlight lignes specifiques |
| `data-line-numbers="|3|7-10"` | Animation : tout > ligne 3 > lignes 7-10 |
| `class="language-xxx"` | Langage (js, python, sql, etc.) |

### Animation pas a pas

```html
<pre><code data-line-numbers="|1|2-3|4-5" data-trim>
function add(a, b) {        // step 2
  const result = a + b;     // step 2
  console.log(result);      // step 3
  return result;            // step 3
}
</code></pre>
```

Chaque fragment de `data-line-numbers` est revele a chaque clic.

## Plugin Notes

Active la speaker view (touche **S**).

```html
<script src="dist/plugin/notes.js"></script>
<script>
  Reveal.initialize({ plugins: [RevealNotes] });
</script>
```

### Ecrire des notes

3 methodes (cf [03-markup-slides.md](03-markup-slides.md)) :

```html
<!-- 1. Aside -->
<section>
  <h2>Slide</h2>
  <aside class="notes">Ma note privee</aside>
</section>

<!-- 2. Attribut -->
<section data-notes="Note rapide">...</section>

<!-- 3. Markdown -->
<section data-markdown>
  <textarea data-template>
    Slide content

    Note: Note speaker
  </textarea>
</section>
```

### Pre-requis local

Pour le speaker view local : besoin d'un serveur HTTP (pas `file://`), donc `npm start` ou serveur statique.

## Plugin Math

Rendu d'equations LaTeX via MathJax.

### Variantes

| Variante | Description |
|----------|-------------|
| `RevealMath.KaTeX` | KaTeX (le plus rapide) |
| `RevealMath.MathJax2` | MathJax v2 |
| `RevealMath.MathJax3` | MathJax v3 (recommande) |

### Setup

```html
<script src="dist/plugin/math.js"></script>
<script>
  Reveal.initialize({
    plugins: [RevealMath.MathJax3],
    math: {
      mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
      tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    }
  });
</script>
```

### Equations dans les slides

```html
<section>
  <p>Inline : $E = mc^2$</p>
  <p>
    $$
    \int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
    $$
  </p>
</section>
```

> **v5.2.0** : Math plugin ignore les balises `<code>` par defaut (evite les conflits).

## Plugin Zoom

Alt+click pour zoomer sur un element.

```html
<script src="dist/plugin/zoom.js"></script>
<script>
  Reveal.initialize({ plugins: [RevealZoom] });
</script>
```

Aucune syntaxe HTML particuliere. Alt+click sur n'importe quel element zoome dessus.

## Plugin Search

Ctrl+Shift+F pour ouvrir la recherche dans toutes les slides.

```html
<script src="dist/plugin/search.js"></script>
<script>
  Reveal.initialize({ plugins: [RevealSearch] });
</script>
```

### API etendue (v5.2+)

```javascript
const search = Reveal.getPlugin('search');
search.toggleSearch();
search.closeSearch();
```

> **v5.0.3** : support des diacritiques et phrases completes.

## Plugins tiers populaires

| Plugin | Usage |
|--------|-------|
| `reveal.js-menu` | Menu lateral de navigation |
| `reveal-chalkboard` | Annotations manuscrites a l'ecran |
| `reveal.js-mermaid-plugin` | Diagrammes Mermaid |
| `reveal.js-fontawesome` | Icones Font Awesome |
| `reveal-pdfexport` | Export PDF amelior |

Cherchez sur npm avec `reveal.js-plugin`.

## Anti-patterns plugins

```javascript
// MAL : plugins chaines comme strings
Reveal.initialize({ plugins: ['markdown'] });  // FAUX

// BON : objets/classes plugin
Reveal.initialize({ plugins: [RevealMarkdown] });
```

```html
<!-- MAL : script plugin avant reveal.js -->
<script src="dist/plugin/markdown.js"></script>
<script src="dist/reveal.js"></script>

<!-- BON : reveal.js d'abord -->
<script src="dist/reveal.js"></script>
<script src="dist/plugin/markdown.js"></script>
```

## Sources

- [revealjs.com/plugins](https://revealjs.com/plugins/) — vue d'ensemble
- [revealjs.com/markdown](https://revealjs.com/markdown/) — plugin markdown
- [revealjs.com/code](https://revealjs.com/code/) — highlight code
- [revealjs.com/speaker-view](https://revealjs.com/speaker-view/) — notes
- [revealjs.com/math](https://revealjs.com/math/) — math plugin
