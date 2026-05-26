# 01 — Specifications techniques

## Table des Matieres

1. [Architecture du dossier `slide/`](#architecture-du-dossier-slide)
2. [Squelette HTML reveal.js](#squelette-html-revealjs)
3. [Theme custom Nopillo](#theme-custom-nopillo)
4. [Typographie : Futura PT](#typographie--futura-pt)
5. [Plugins reveal.js a utiliser](#plugins-revealjs-a-utiliser)
6. [Conventions slides](#conventions-slides)
7. [Speaker notes](#speaker-notes)
8. [Export PDF](#export-pdf)
9. [Mapping contenu source -> slides](#mapping-contenu-source---slides)
10. [Anti-patterns a eviter](#anti-patterns-a-eviter)

## Architecture du dossier `slide/`

```
slide/
├── index.html                  # Entry point reveal.js, contient les 18 sections
├── theme/
│   ├── nopillo.css             # Theme custom (override theme reveal.js)
│   └── tokens.css              # Copie tokens DS Nopillo (88 variables)
├── assets/
│   ├── logo-nopillo.svg        # Logo (copie de apply-nopillo-ds/assets/logo.svg)
│   ├── screen-claude-md.png    # Screenshot CLAUDE.md (slide 4)
│   ├── screen-rule.png         # Screenshot rule (slide 7)
│   ├── screen-skill.png        # Screenshot skill (slide 9)
│   └── diagram-pipeline.svg    # Diagramme pipeline (slide 15)
├── notes/
│   └── speaker-notes.md        # Notes formateur (backup hors slide)
└── README.md                   # How to run + edit + deploy
```

**Pourquoi tout dans `index.html`** : la doc reveal.js [03-markup-slides.md](../reveal-js-5/03-markup-slides.md) recommande sections inline pour < 50 slides. Multi-fichiers (`data-markdown`) ajoute de la complexite sans benefice pour notre cas. Edit facile, git diff lisible.

**Pourquoi un dossier dedie `slide/`** : separation claire du projet landing. Deployable independamment sur sous-domaine (`slides.nopillo.com`) si besoin.

## Squelette HTML reveal.js

Base inspiree de [docs/reveal-js-5/02-installation.md](../reveal-js-5/02-installation.md) (mode CDN).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Formation Vibecoding J1 - Skill / Rule / MCP / Hook</title>

  <!-- Reveal.js 5 core CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reset.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">

  <!-- Theme base white (sera override par nopillo.css) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/white.css" id="theme">

  <!-- Theme custom Nopillo -->
  <link rel="stylesheet" href="theme/tokens.css">
  <link rel="stylesheet" href="theme/nopillo.css">

  <!-- Futura PT via Adobe Typekit -->
  <link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">

  <!-- Plugin Highlight.js theme pour code blocks -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/monokai.css">
</head>
<body>

  <div class="reveal">
    <div class="slides">

      <!-- Slide 1 — Titre -->
      <section class="slide-titre">
        <img src="assets/logo-nopillo.svg" class="logo" alt="Nopillo">
        <h1>Skill / Rule / MCP / Hook</h1>
        <p class="subtitle">Les 4 mecanismes pour ancrer Claude dans la realite de TON projet.</p>
        <p class="meta">Formation Vibecoding — Jour 1 · Thomas (Feaderz)</p>
        <aside class="notes">
          Apres 40 min, vous saurez quand utiliser chaque mecanisme.
          Vous allez l'appliquer immediatement en creant VOTRE skill.
        </aside>
      </section>

      <!-- ... slides 2 a 18 ... -->

    </div>
  </div>

  <!-- Reveal.js 5 core + plugins -->
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/notes/notes.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/highlight.js"></script>

  <script>
    Reveal.initialize({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      transitionSpeed: 'default',
      controls: true,
      progress: true,
      center: true,
      touch: true,
      plugins: [ RevealNotes, RevealHighlight ]
    });
  </script>

</body>
</html>
```

**Decisions cles** :
- `hash: true` : URL pointe la slide (deeplink possible)
- `slideNumber: 'c/t'` : afficher `5/18` en bas (utile pour formateur)
- `transition: 'slide'` : transition douce, pas distraite
- `center: true` : verticalement centre par defaut
- `touch: true` : navigation tactile (utile en projection tablette)

## Theme custom Nopillo

**Strategie** : importer les tokens DS Nopillo + overrider les classes reveal.js essentielles.

Fichier `slide/theme/nopillo.css` :

```css
/* ========================================================================
   Nopillo Theme for Reveal.js 5
   Override du theme white.css avec tokens DS Nopillo
   ======================================================================== */

/* Backgrounds */
.reveal-viewport {
  background: var(--color-brand-white) !important;
}

.reveal {
  font-family: 'Splinesans', 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--color-graycool-900);
  font-size: 32px;
  line-height: 1.4;
}

/* Headings : Futura PT */
.reveal h1,
.reveal h2,
.reveal h3,
.reveal h4 {
  font-family: 'futura-pt', 'Futura', sans-serif;
  font-weight: 600;
  color: var(--color-graycool-900);
  text-transform: none;
  letter-spacing: -0.02em;
  margin-bottom: 0.4em;
}

.reveal h1 { font-size: 2.4em; }
.reveal h2 { font-size: 1.8em; }
.reveal h3 { font-size: 1.4em; }

/* Links + accents */
.reveal a {
  color: var(--color-brand-primary);
  text-decoration: none;
  border-bottom: 2px solid var(--color-indigo-100);
}

.reveal a:hover {
  border-bottom-color: var(--color-brand-primary);
}

/* Code blocks */
.reveal pre {
  background: var(--color-graycool-900);
  color: var(--color-brand-white);
  padding: 1.2em;
  border-radius: 16px;
  font-size: 0.55em;
  line-height: 1.5;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
}

.reveal code {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  background: var(--color-indigo-50);
  color: var(--color-brand-primary);
  padding: 0.1em 0.3em;
  border-radius: 6px;
}

.reveal pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

/* Tableaux */
.reveal table {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-indigo-100);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
  font-size: 0.7em;
}

.reveal table th {
  background: var(--color-indigo-100);
  color: var(--color-indigo-900);
  font-family: 'futura-pt', sans-serif;
  font-weight: 600;
  text-align: left;
  padding: 0.6em 1em;
}

.reveal table td {
  padding: 0.5em 1em;
  border-bottom: 1px solid var(--color-indigo-50);
}

.reveal table tr:last-child td {
  border-bottom: none;
}

/* CTAs / buttons (slides interactives) */
.reveal .btn-pill {
  display: inline-block;
  padding: 0.6em 1.4em;
  border-radius: 999px;
  background: var(--color-brand-primary);
  color: var(--color-brand-white);
  font-family: 'futura-pt', sans-serif;
  font-weight: 600;
}

/* Cards / encadres */
.reveal .card {
  background: var(--color-brand-white);
  border: 1px solid var(--color-indigo-100);
  border-radius: 16px;
  padding: 1.5em;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.06);
}

.reveal .card-soft {
  background: var(--color-indigo-100);
  border-color: var(--color-brand-primary);
}

/* Slide titre (custom layout) */
.reveal .slide-titre h1 {
  font-size: 3.2em;
  color: var(--color-brand-primary);
}

.reveal .slide-titre .logo {
  height: 60px;
  margin-bottom: 2em;
}

.reveal .slide-titre .subtitle {
  font-size: 1.1em;
  color: var(--color-graycool-700);
  margin-top: 0.6em;
}

.reveal .slide-titre .meta {
  font-size: 0.6em;
  color: var(--color-graycool-500);
  margin-top: 3em;
}

/* Slide recap (slide 18) */
.reveal .slide-recap {
  background: linear-gradient(135deg, var(--color-indigo-50) 0%, var(--color-brand-white) 100%);
}

.reveal .slide-recap .frame {
  background: var(--color-brand-white);
  border: 3px solid var(--color-brand-primary);
  border-radius: 24px;
  padding: 2em;
  box-shadow: 0 4px 24px rgba(64, 51, 219, 0.1);
}

/* Bullets : pill bleu */
.reveal ul li::marker {
  color: var(--color-brand-primary);
}

/* Slide controls (fleches) en indigo */
.reveal .controls .navigate-left.enabled,
.reveal .controls .navigate-right.enabled {
  color: var(--color-brand-primary);
}

.reveal .progress {
  color: var(--color-brand-primary);
}

/* Print PDF : adapter les couleurs */
@media print {
  .reveal pre,
  .reveal code {
    background: var(--color-graycool-50) !important;
    color: var(--color-graycool-900) !important;
  }
}
```

**Pourquoi override le theme `white.css`** : reveal.js demande de partir d'un theme base. White est le plus neutre. On override les classes ciblees, on ne reecrit pas tout.

## Typographie : Futura PT

Source : [.claude/skills/apply-nopillo-ds/assets/adobe-typekit.html](../../.claude/skills/apply-nopillo-ds/assets/adobe-typekit.html)

```html
<link rel="stylesheet" href="https://use.typekit.net/c1b0b72bff15bb9715f23b2ce31c51654439d865.css">
```

Famille : `futura-pt` (poids 400, 500, 600, 700).

**Fallback** : si pas d'acces Typekit, remplacer dans `nopillo.css` :
```css
font-family: 'Futura', 'futura-pt', 'Avenir Next', system-ui, sans-serif;
```

Sur Mac la fallback est tres proche (Futura native). Sur Windows, dergad mais lisible.

## Plugins reveal.js a utiliser

Source : [docs/reveal-js-5/07-plugins.md](../reveal-js-5/07-plugins.md)

| Plugin | Pourquoi | Activation |
|---|---|---|
| **RevealNotes** | Speaker view (touche `S`) avec notes formateur | Inclus par defaut |
| **RevealHighlight** | Coloration syntaxique des `<pre><code class="hljs">` | Inclus par defaut |
| ~~RevealMarkdown~~ | Pas necessaire si on ecrit HTML direct | Non utilise |
| ~~RevealMath~~ | Pas necessaire (pas de formules) | Non utilise |
| ~~RevealZoom~~ | Optionnel (`alt+click` pour zoomer) | Optionnel |

## Conventions slides

### Structure de chaque slide

```html
<section class="slide-[type]">
  <h2>[Titre slide]</h2>

  <!-- Contenu : bullets, code, tableau, ou layout custom -->

  <aside class="notes">
    [Notes orales pour le formateur, visibles en mode speaker]
  </aside>
</section>
```

### Classes utilitaires (a definir dans nopillo.css)

| Classe | Usage |
|---|---|
| `.slide-titre` | Slide 1 (layout centre, gros titre) |
| `.slide-recap` | Slide 18 (frame indigo, design soigne) |
| `.card` | Encadre standard (white + border indigo-100) |
| `.card-soft` | Encadre indigo (background indigo-100) |
| `.btn-pill` | Pill style CTA |
| `.center` | Texte centre |
| `.fragment` | Element avec animation fragment (reveal.js native) |

### Limites de contenu par slide

D'apres [07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) :
- **Max 7 lignes de texte** par slide
- **1 idee par slide** — jamais 2
- **Ratio texte/visuel** : 50/50 minimum
- **Code blocks** : 10 lignes max

## Speaker notes

Chaque slide DOIT avoir un `<aside class="notes">` avec les notes orales du formateur.

Source : [07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) — section "Notes orales" de chaque slide.

Activation pendant la presentation : touche `S` ouvre la fenetre speaker view dans un nouvel onglet.

**Pourquoi obligatoire** : Thomas n'a pas a memoriser. Slides = visuels participants, notes = script formateur.

## Export PDF

Reveal.js supporte l'export PDF natif via URL parameter :

```
http://localhost:8000/slide/?print-pdf
```

Puis : `Cmd+P` (Mac) ou `Ctrl+P` (Windows) → Save as PDF.

**Settings PDF recommandes** :
- Format : A4 paysage ou Letter paysage
- Margins : None
- Background graphics : ON (pour les couleurs)
- Scale : 100%

Resultat : 1 page PDF par slide, vectoriel (texte selectionnable).

Voir [docs/reveal-js-5/08-speaker-pdf.md](../reveal-js-5/08-speaker-pdf.md) pour le detail.

## Mapping contenu source -> slides

Le contenu integral des 18 slides est dans :
[docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md)

Chaque slide dans `slide/index.html` reprend :
- **Le bloc code/contenu** : converti en HTML (ASCII art → tableau HTML, code → `<pre><code>`)
- **Les notes orales** : dans `<aside class="notes">`
- **Le visuel suggere** : implemente avec classes nopillo

**Conversion type ASCII → HTML** :

```
ASCII (dans 07-slides-theorie.md) :

  ┌──────────┬─────────────────────┐
  │ Mecanisme│ Quand               │
  ├──────────┼─────────────────────┤
  │ CLAUDE.md│ Regles globales     │
  └──────────┴─────────────────────┘

→ HTML :

  <table>
    <thead>
      <tr><th>Mecanisme</th><th>Quand</th></tr>
    </thead>
    <tbody>
      <tr><td><code>CLAUDE.md</code></td><td>Regles globales</td></tr>
    </tbody>
  </table>
```

## Anti-patterns a eviter

| Anti-pattern | Pourquoi mal | Fix |
|---|---|---|
| Tout sur 1 slide | Surcharge cognitive | 1 idee = 1 slide |
| Code > 15 lignes | Illisible projete | Decouper en 2 slides ou faire screenshot |
| Pas de speaker notes | Formateur improvise | Coller les "Notes orales" de 07-slides-theorie.md |
| Animations trop rapides | Distraction | `transitionSpeed: 'default'` (pas 'fast') |
| Fond noir + texte fonce | Illisible | Toujours indigo sur white, ou white sur indigo |
| Polices non Adobe Typekit | DS Nopillo casse | Garder Futura PT, fallback Futura |
| Ratio texte > 70% | Trop dense | Ajouter visuels (icones, diagrammes) |
| Numeros de slide caches | Formateur perdu | `slideNumber: 'c/t'` ON |
| Slide 14-15 generiques | Methodo signature perdue | Design distinctif (encadre indigo 24px radius) |
| Pas d'export PDF teste | Imprimable casse | Tester `?print-pdf` AVANT le jour J |

## Sources

- [docs/reveal-js-5/02-installation.md](../reveal-js-5/02-installation.md) — Setup CDN
- [docs/reveal-js-5/03-markup-slides.md](../reveal-js-5/03-markup-slides.md) — Structure HTML
- [docs/reveal-js-5/04-configuration.md](../reveal-js-5/04-configuration.md) — Options Reveal.initialize
- [docs/reveal-js-5/06-themes.md](../reveal-js-5/06-themes.md) — Theming
- [docs/reveal-js-5/07-plugins.md](../reveal-js-5/07-plugins.md) — Plugins
- [docs/reveal-js-5/08-speaker-pdf.md](../reveal-js-5/08-speaker-pdf.md) — PDF export
- [docs/reveal-js-5/11-anti-patterns.md](../reveal-js-5/11-anti-patterns.md) — Erreurs reveal.js
- [docs/cours-formation-vibecoding-j1/07-slides-theorie.md](../cours-formation-vibecoding-j1/07-slides-theorie.md) — Contenu source
- [.claude/skills/apply-nopillo-ds/assets/tokens.css](../../.claude/skills/apply-nopillo-ds/assets/tokens.css) — Tokens DS Nopillo
- [.claude/skills/apply-nopillo-ds/assets/adobe-typekit.html](../../.claude/skills/apply-nopillo-ds/assets/adobe-typekit.html) — Adobe Typekit Futura PT
